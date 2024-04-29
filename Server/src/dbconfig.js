import pg from "pg";
import env from "dotenv";
env.config();

const db = new pg.Client(process.env.PG_CONN);

db.connect()
  .then(() => {
    console.log("Connected to PostgreSQL database");
  })
  .catch((err) => {
    console.error("Error connecting to PostgreSQL database:", err);
  });

export { db };
