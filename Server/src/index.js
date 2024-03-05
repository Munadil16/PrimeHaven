import { fileURLToPath } from "url";
import path, { dirname } from "path";
import fs from "fs";
import express from "express";
import pg from "pg";
import env from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from "multer";

import sendEmail from "../utils/sendEmail.js";
import { states } from "../utils/states.js";

env.config();
const app = express();
const port = process.env.PORT || 3000;
const saltRounds = 5;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname + "/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

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

app.get("/api/logged-in", authenticate, (req, res) => {
  const username = req.user.name;
  res.json({ isLoggedIn: true, username });
});

app.post("/api/reset-password", async (req, res) => {
  try {
    const resp = await db.query("SELECT * FROM users WHERE email = $1", [
      req.body.email,
    ]);

    if (resp.rowCount) {
      sendEmail(resp.rows[0]);
      res.json({ emailFound: true });
    } else {
      res.json({ emailFound: false });
    }
  } catch (err) {
    console.log("Error while fetching data for reset-password: ", err);
  }
});

app.put("/api/update-password", async (req, res) => {
  try {
    const { email, password } = req.body;
    bcrypt.hash(password, saltRounds, async function (err, hash) {
      if (err) {
        console.log("Error in hashing: ", err);
      } else {
        await db.query("UPDATE users SET password = $1 WHERE email = $2", [
          hash,
          email,
        ]);
      }
    });
    res.json({ passwordUpdated: true });
  } catch (err) {
    console.log("Error while updating password: ", err);
  }
});

app.post("/api/logout", (req, res) => {
  res.clearCookie("jwtToken");
  res.sendStatus(200);
});

app.get("/api/states", (req, res) => {
  res.json(states);
});

app.get("/api/properties", async (req, res) => {
  let sqlQuery = "SELECT * FROM properties WHERE TRUE";
  const { search, type, place } = req.query;
  const queryParams = [];
  let paramIndex = 1;

  if (search) {
    sqlQuery += ` AND title ILIKE $${paramIndex++}`;
    queryParams.push(`%${search}%`);
  }

  if (type !== "All") {
    sqlQuery += ` AND propertytype = $${paramIndex++}`;
    queryParams.push(type);
  }

  if (place !== "All") {
    sqlQuery += ` AND state = $${paramIndex++}`;
    queryParams.push(place);
  }

  try {
    const resp = await db.query(sqlQuery, queryParams);
    res.json(resp.rows);
  } catch (err) {
    console.error("Error while fetching properties: ", err);
  }
});

app.post("/api/sell-property", upload.single("image"), async (req, res) => {
  try {
    const { owner, type, place, price, title, desc } = req.body;
    const fileBuffer = fs.readFileSync(req.file.path);
    const base64Image = `data:${req.file.mimetype};base64,${fileBuffer.toString(
      "base64"
    )}`;
    const resp = await db.query("SELECT id FROM properties");

    await db.query(
      "INSERT INTO properties VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      [resp.rowCount + 1, owner, base64Image, type, place, price, title, desc]
    );

    fs.unlink(
      path.join(__dirname + "/uploads/" + req.file.originalname),
      (err) => {
        if (err) {
          console.log("Error while unlinking file: ", err);
        }
      }
    );
    res.json({ insertedProperty: true });
  } catch (err) {
    console.log("Error while inserting new property: ", err);
    res.json({ insertedProperty: false });
  }
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
