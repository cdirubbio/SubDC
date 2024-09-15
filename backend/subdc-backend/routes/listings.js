const express = require("express");
const dotenv = require("dotenv");
const db = require("../db");
const { dcZipCodes } = require("../helpers/locationHelper");
const router = express.Router();

dotenv.config();

router.get("/listings", (req, res) => {
  const sql =
    "SELECT listing_id, title, apt_type, zip_code, image1, price FROM Listings";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});


router.post("/listing", (req, res) => {
  const { user_id, listing_id } = req.body;

  const listingSql = `
    SELECT l.listing_id, l.user_id, l.title, l.description, l.apt_type, l.zip_code, l.price, l.availability_start, l.availability_end, l.image1, l.image2,
           IFNULL(f.isFavorite, 0) AS isFavorite
    FROM Listings l
    LEFT JOIN (
      SELECT listing_id, 1 AS isFavorite
      FROM Favorites
      WHERE user_id = ?
    ) f ON l.listing_id = f.listing_id
    WHERE l.listing_id = ?
  `;

  db.query(listingSql, [user_id, listing_id], (err, result) => {
    if (err) {
      console.error("Database query error:", err.message);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Listing not found" });
    }

    const listing = result[0];
    const location = dcZipCodes[listing.zip_code] || "Unknown Location";

    const transformedListing = {
      ...listing,
      location,
      isFavorite: Boolean(listing.isFavorite),
    };

    delete transformedListing.zip_code;

    res.status(200).json(transformedListing);
  });
});


module.exports = router;
