const express = require("express");
const dotenv = require("dotenv");
const db = require("../db");

const router = express.Router();
dotenv.config();

router.get("/user/:id/listings", (req, res) => {
  const { id } = req.params;
  const sql =
    "SELECT listing_id, title, price, zip_code FROM Listings WHERE user_id = ?  ";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "User has no listings" });
    }
    res.json(result);
  });
});


module.exports = router;
