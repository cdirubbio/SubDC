const express = require("express");
const dotenv = require("dotenv");
const db = require("../db");
const { dcZipCodes } = require("../helpers/locationHelper");
const { getUserInfoFromJSONWebToken } = require("../helpers/jwtHelper");

const router = express.Router();
dotenv.config();

router.post("/user/toggleFavorite", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const userInfo = await getUserInfoFromJSONWebToken(token);
    const user_id = userInfo.user_id;
    const { listing_id } = req.body;

    const getOwnerSql = "SELECT user_id FROM Listings WHERE listing_id = ?";
    const checkFavoriteSql =
      "SELECT * FROM Favorites WHERE user_id = ? AND listing_id = ?";
    const addFavoriteSql =
      "INSERT INTO Favorites (user_id, listing_id) VALUES (?, ?)";
    const removeFavoriteSql =
      "DELETE FROM Favorites WHERE user_id = ? AND listing_id = ?";
    const addNotificationSql = `INSERT INTO UserNotifications (owner_user_id, user_id, listing_id, listing_action, visible) 
       VALUES (?, ?, ?, 'favorite', true)`;
    const unfavNotificationSql = `INSERT INTO UserNotifications (owner_user_id, user_id, listing_id, listing_action, visible) 
        VALUES (?, ?, ?, 'unfavorite', true)`;

    db.query(getOwnerSql, [listing_id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "Listing not found" });
      }

      const owner_user_id = result[0].user_id;

      db.query(checkFavoriteSql, [user_id, listing_id], (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        if (result.length > 0) {
          db.query(removeFavoriteSql, [user_id, listing_id], (err) => {
            if (err) return res.status(500).json({ error: err.message });

            db.query(
              unfavNotificationSql,
              [owner_user_id, user_id, listing_id],
              (err) => {
                if (err) return res.status(500).json({ error: err.message });
                return res.json({ isFavorite: false });
              }
            );
          });
        } else {
          db.query(addFavoriteSql, [user_id, listing_id], (err) => {
            if (err) return res.status(500).json({ error: err.message });

            db.query(
              addNotificationSql,
              [owner_user_id, user_id, listing_id],
              (err) => {
                if (err) return res.status(500).json({ error: err.message });

                return res.json({ isFavorite: true });
              }
            );
          });
        }
      });
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/user/favorites", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const userInfo = await getUserInfoFromJSONWebToken(token);
    const user_id = userInfo.user_id;
    const sql = `
      SELECT l.listing_id, l.title, l.price, l.user_id, l.image1, l.image2, l.reserved_by, l.zip_code
      FROM Listings l
      JOIN Favorites f ON l.listing_id = f.listing_id
      WHERE f.user_id = ?
      AND (l.reserved_by IS NULL OR l.reserved_by = ?)
    `;
    db.query(sql, [user_id, user_id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "User has no Favorites." });
      }
      const transformedListings = result.map((listing) => {
        const location = dcZipCodes[listing.zip_code] || "Unknown Location";
        const transformedListing = {
          ...listing,
          location,
        };
        delete transformedListing.zip_code;
        return transformedListing;
      });

      return res.status(200).json(transformedListings);
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
