const express = require("express");
const dotenv = require("dotenv");
const db = require("../db");

const router = express.Router();
dotenv.config();

router.post('/user/favorites/add', (req, res) => {
    const { user_id, listing_id } = req.body;
    const sql = 'INSERT INTO Favorites (user_id, listing_id) VALUES (?, ?)'

    db.query(sql, [user_id, listing_id], (err, result) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
    res.status(201).json({ message: 'Favorite Added'});
    });
});

router.post('/user/favorite/remove', (req, res) => {
    const { user_id, listing_id } = req.body;
    const sql = 'DELETE FROM Favorites  WHERE user_id = ? AND listing_id = ?'

    db.query(sql, [user_id, listing_id], (err, result) => {
        if (err) {
            return res.status(500).json({error: err.message});
        }
    res.status(201).json({ message: 'Favorite Removed'});
    });
});

router.get("/user/:id/favorites", (req, res) => {
    const { id } = req.params;
    const sql =
      'SELECT l.listing_id, l.title, l.price, l.user_id FROM Listings l JOIN Favorites f ON l.listing_id = f.listing_id WHERE f.user_id = ?';
    db.query(sql, [id], (err, result) => {
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

