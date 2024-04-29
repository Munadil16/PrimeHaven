import express from "express";
import env from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import authRoute from "../routes/auth.js";
import statesRoute from "../routes/states.js";
import propertiesRoute from "../routes/properties.js";
import paymentRoute from "../routes/payment.js";

env.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", authRoute);
app.use("/api/states", statesRoute);
app.use("/api/p", propertiesRoute);
app.use("/api/pay", paymentRoute);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
