import Stripe from "stripe";
import { db } from "../src/dbconfig.js";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

const newPayment = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: req.body.name,
            },
            unit_amount: req.body.price * 100,
          },
          quantity: 1,
        },
      ],
      payment_method_types: ["card"],
      mode: "payment",
      success_url: "http://localhost:5173/payment-success",
      cancel_url: "http://localhost:5173/payment-cancel",
    });
    res.json({ id: session.id });
  } catch (err) {
    console.log("Stripe Payment Error: ", err);
  }
};

const paymentSuccess = async (req, res) => {
  try {
    const resp = await db.query("SELECT * FROM properties WHERE id = $1", [
      req.body.id,
    ]);

    const fetchTotalSoldProperties = await db.query(
      "SELECT id FROM sold_properties"
    );

    const { owner, propimage, propertytype, state, price, title, description } =
      resp.rows[0];

    await db.query(
      "INSERT INTO sold_properties VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)",
      [
        fetchTotalSoldProperties.rowCount + 1,
        owner,
        propimage,
        propertytype,
        state,
        price,
        title,
        description,
        req.body.sold_to,
      ]
    );

    await db.query("DELETE FROM properties WHERE id = $1", [req.body.id]);

    res.json({ isInsertedIntoSoldProperty: true });
  } catch (err) {
    console.log("Error while inserting property into sold_properties: ", err);
  }
};

export { newPayment, paymentSuccess };
