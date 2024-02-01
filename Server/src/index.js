import bodyParser from "body-parser";
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

app.post("/api/signup", async (req, res) => {
  try {
    const result = await db.query("SELECT username FROM users");
    const users = result.rows;
    const { email, username, password } = req.body;
    const user = users.find((user) => username === user.username);

    if (user?.username === undefined) {
      bcrypt.hash(password, saltRounds, async function (err, hash) {
        if (err) {
          console.log(err);
        } else {
          await db.query("INSERT INTO users VALUES ($1, $2, $3, $4)", [
            result.rowCount + 1,
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
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
