const express = require("express");
const dotenv = require("dotenv");
const db = require("../db");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const router = express.Router();
dotenv.config();

router.post("/verify-email", async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    let email;
    let decoded;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      if (token != null) {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
      } else {
        return res
          .status(400)
          .json({ message: "Email unsuccessfully verified" });
      }
    }
    if (!decoded) {
        return res.status(404).json({ message: "Email Verification Token not found" });
    }
    email = decoded.email;
    const sql =
      "UPDATE Users SET email_is_verified=true WHERE email = ?";
    db.query(sql, [email], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "Email Verified Successfully. Please log in now", email: email});
    });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
