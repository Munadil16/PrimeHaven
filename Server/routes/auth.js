import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import {
  signUp,
  login,
  loggedIn,
  resetPassword,
  updatePassword,
  logout,
} from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", signUp);

router.post("/login", login);

router.get("/logged-in", authenticate, loggedIn);

router.post("/reset-password", resetPassword);

router.put("/update-password", updatePassword);

router.post("/logout", logout);

export default router;
