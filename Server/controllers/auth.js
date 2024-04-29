import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";
import { db } from "../src/dbconfig.js";

const saltRounds = 5;

const signUp = async (req, res) => {
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
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const resp = await db.query(
      "SELECT email, password FROM users WHERE username = $1",
      [username]
    );

    if (resp.rowCount) {
      bcrypt.compare(password, resp.rows[0].password, (err, result) => {
        if (err) {
          console.log("Error in comparing: ", err);
        } else {
          if (result) {
            const token = jwt.sign(
              { name: username, email: resp.rows[0].email },
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
};

const loggedIn = (req, res) => {
  const { name, email } = req.user;
  res.json({ isLoggedIn: true, username: name, email });
};

const resetPassword = async (req, res) => {
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
};

const updatePassword = async (req, res) => {
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
};

const logout = (req, res) => {
  res.clearCookie("jwtToken");
  res.sendStatus(200);
};

export { signUp, login, loggedIn, resetPassword, updatePassword, logout };
