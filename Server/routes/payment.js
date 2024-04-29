import express from "express";
import { newPayment, paymentSuccess } from "../controllers/payment.js";

const router = express.Router();

router.post("/payment", newPayment);

router.post("/payment-success", paymentSuccess);

export default router;
