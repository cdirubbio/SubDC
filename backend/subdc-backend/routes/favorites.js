const express = require("express");
const dotenv = require("dotenv");
const db = require("../db");

const router = express.Router();
dotenv.config();

router.post('/user/toggleFavorite', (req, res) => {
  const { user_id, listing_id } = req.body;

  const checkFavoriteSql = 'SELECT * FROM Favorites WHERE user_id = ? AND listing_id = ?';
  const addFavoriteSql = 'INSERT INTO Favorites (user_id, listing_id) VALUES (?, ?)';
  const removeFavoriteSql = 'DELETE FROM Favorites WHERE user_id = ? AND listing_id = ?';

  db.query(checkFavoriteSql, [user_id, listing_id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      if (result.length > 0) {
          db.query(removeFavoriteSql, [user_id, listing_id], (err) => {
              if (err) return res.status(500).json({ error: err.message });
              return res.json({ isFavorite: false });
          });
      } else {
          db.query(addFavoriteSql, [user_id, listing_id], (err) => {
              if (err) return res.status(500).json({ error: err.message });
              return res.json({ isFavorite: true });
          });
      }
  });
});

router.post("/user/favorites", (req, res) => {
  const { user_id } = req.body;
  const sql =
    "SELECT l.listing_id, l.title, l.price, l.user_id, l.image1 FROM Listings l JOIN Favorites f ON l.listing_id = f.listing_id WHERE f.user_id = ?";
  db.query(sql, [user_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "User has no Favorites." });
    }
    res.json(result);
  });
});



module.exports = router;
