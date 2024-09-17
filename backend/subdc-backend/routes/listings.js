const express = require("express");
const dotenv = require("dotenv");
const db = require("../db");
const { dcZipCodes } = require("../helpers/locationHelper");
const { getUserInfoFromJSONWebToken } = require("../helpers/jwtHelper");
const router = express.Router();

dotenv.config();

router.get("/listings", (req, res) => {
  const sql =
    "SELECT listing_id, title, apt_type, zip_code, image1, price FROM Listings";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json(results);
  });
});


router.get("/listing/:id", async (req, res) => {
  try {
    const { id: listing_id } = req.params;
    let user_id = null; 
    const authHeader = req.headers["authorization"];

    
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      if (token != null) {
        const userInfo = await getUserInfoFromJSONWebToken(token);
        if (userInfo && userInfo.user_id) {
          user_id = userInfo.user_id; 
        }
      }
    }


    if (!listing_id) {
      return res.status(400).json({ message: "Listing ID is required" });
    }

    let listingSql;
    let queryParams;

    if (user_id) {
      listingSql = `
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
      queryParams = [user_id, listing_id];
    } else {
      listingSql = `
        SELECT l.listing_id, l.user_id, l.title, l.description, l.apt_type, l.zip_code, l.price, l.availability_start, l.availability_end, l.image1, l.image2,
               0 AS isFavorite
        FROM Listings l
        WHERE l.listing_id = ?
      `;
      queryParams = [listing_id];
    }

    db.query(listingSql, queryParams, (err, result) => {
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
        user_id: user_id,
      };

      delete transformedListing.zip_code;

      res.status(200).json(transformedListing);
    });
  } catch (error) {
    console.error("Error handling request:", error.message);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});


module.exports = router;
