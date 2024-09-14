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

router.post("/userInfo", async (req, res) => {
  const { user_id } = req.body;
  try {   

    const sql = "SELECT username,first_name, last_name, email, phone_number FROM Users WHERE user_id = ?";

    db.query(sql, [user_id], (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message }); 
        }
        if (result.length === 0) {
          return res.status(401).json({ message: 'Invalid User ID' });
        }
        const user = result[0];
        res.status(200).json({ user });
      }
    );
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
});

module.exports = router;
