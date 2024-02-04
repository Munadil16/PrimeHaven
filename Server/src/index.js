import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import express from "express";
import bcrypt from "bcrypt";
import env from "dotenv";
import pg from "pg";

env.config();
const app = express();
const port = process.env.PORT || 3000;
const saltRounds = 5;
const db = new pg.Client(process.env.PG_CONN);
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const authenticate = (req, res, next) => {
  const token = req.cookies.jwtToken;

  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        console.log("Token Verification Error: ", err);
        res.json({ isLoggedIn: false, username: "" });
      } else {
        req.user = decodedToken;
        next();
      }
    });
  } else {
    console.log("Token Not Found");
    res.json({ isLoggedIn: false, username: "" });
  }
};

app.post("/api/signup", async (req, res) => {
  try {
    const resp = await db.query("SELECT username FROM users");
    const users = resp.rows;
    const { email, username, password } = req.body;
    const user = users.find((user) => username === user.username);

    if (user?.username === undefined) {
      bcrypt.hash(password, saltRounds, async function (err, hash) {
        if (err) {
          console.log("Error in hashing: ", err);
        } else {
          await db.query("INSERT INTO users VALUES ($1, $2, $3, $4)", [
            resp.rowCount + 1,
            email,
            username,
            hash,
          ]);
        }
      });
      res.json({ userAvailable: true });
    } else {
      res.json({ userAvailable: false });
    }
  } catch (err) {
    console.log("Error in db query: ", err);
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const resp = await db.query(
      "SELECT username, password FROM users WHERE username = $1",
      [username]
    );

    if (resp.rowCount) {
      bcrypt.compare(password, resp.rows[0].password, (err, result) => {
        if (err) {
          console.log("Error in comparing: ", err);
        } else {
          if (result) {
            const token = jwt.sign(
              { name: username },
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: "3d" }
            );
            res.cookie("jwtToken", token, { maxAge: 1000 * 60 * 60 * 24 * 3 });
            res.json({ userFound: true });
          } else {
            res.json({ userFound: false });
          }
        }
      });
    } else {
      res.json({ userFound: false });
    }
  } catch (err) {
    console.log("Error in fetching user:", err);
  }
});

app.post("/api/logout", (req, res) => {
  res.clearCookie("jwtToken");
  res.sendStatus(200);
});

app.get("/api/logged-in", authenticate, (req, res) => {
  const username = req.user.name;
  res.json({ isLoggedIn: true, username });
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
