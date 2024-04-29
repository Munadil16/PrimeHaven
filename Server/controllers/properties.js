import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import { db } from "../src/dbconfig.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const showProperties = async (req, res) => {
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
};

const sellProperty = async (req, res) => {
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
      path.join(__dirname, "..", "src", "uploads/" + req.file.originalname),
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
};

const profile = async (req, res) => {
  try {
    const propsBought = await db.query(
      "SELECT * FROM sold_properties WHERE sold_to = $1",
      [req.body.user]
    );

    const propsSelling = await db.query(
      "SELECT * FROM properties WHERE owner = $1",
      [req.body.user]
    );

    res.json({
      propsBought: propsBought.rows,
      propsSelling: propsSelling.rows,
    });
  } catch (err) {
    console.log("Error fetching properties for Profile: ", err);
  }
};

export { showProperties, sellProperty, profile };
