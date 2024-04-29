import express from "express";
import { storage, upload } from "../middlewares/multerStorage.js";
import {
  showProperties,
  sellProperty,
  profile,
} from "../controllers/properties.js";

const router = express.Router();

router.get("/properties", showProperties);

router.post("/sell-property", upload.single("image"), sellProperty);

router.post("/profile", profile);

export default router;
