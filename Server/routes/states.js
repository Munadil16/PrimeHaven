import express from "express";
import { showStates } from "../controllers/states.js";

const router = express.Router();

router.get("/", showStates);

export default router;
