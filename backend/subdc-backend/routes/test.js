const express = require("express");
const dotenv = require("dotenv");
const db = require("../db");

const {getUserIDFromJSONWebToken} = require('./../helpers/jwtHelper');

const router = express.Router();
dotenv.config();


router.get('/test/users', (req, res) => {
  const sql = 'SELECT user_id, username, password, email FROM Users';
  
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

module.exports = router;