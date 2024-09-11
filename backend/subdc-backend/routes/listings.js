const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// GET all listings
router.get('/listings', (req, res) => {
  const sql = 'SELECT * FROM listings';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// GET a specific listing by ID
router.get('/listing/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM listings WHERE listing_id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    res.json(result[0]);
  });
});

// POST a new listing
router.post('/listings', (req, res) => {
  const { listingTitle, listingAddress, listingPrice, description, userOfListing, availability_start, availability_end } = req.body;
  const sql = 'INSERT INTO listings (listingTitle, listingAddress, listingPrice, description, userOfListing, availability_start, availability_end) VALUES (?, ?, ?, ?, ?, ?, ?)';
  
  db.query(sql, [listingTitle, listingAddress, listingPrice, description, userOfListing, availability_start, availability_end], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Listing created', listingId: result.insertId });
  });
});

module.exports = router;