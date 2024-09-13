const express = require('express');
const dotenv = require('dotenv');
const db = require('../db')
const { dcZipCodes } = require('../helpers/locationHelper');
const router = express.Router();


dotenv.config();


router.get('/listings', (req, res) => {
  const sql = 'SELECT listing_id, title, apt_type, zip_code, price FROM Listings';
  
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

router.get('/listing/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT listing_id, user_id, title, description, apt_type, zip_code, price, availability_start, availability_end FROM Listings WHERE listing_id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    if (result.length === 0) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    const listing = result[0];
    const location = dcZipCodes[listing.zip_code] || 'Unknown Location';

    
    const transformedListing = {
      ...listing,
      location,  
    };

    delete transformedListing.zip_code;

    res.json(transformedListing);
  });
});



router.post('/createListing', (req, res) => {
  const { user_id, title, description, apt_type, price, address, zip_code, availability_start, availability_end } = req.body;
  const sql = 'INSERT INTO Listings (user_id, title, description, apt_type, price, address, zip_code, availability_start, availability_end) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  
  db.query(sql, [user_id, title, description, apt_type, price, address, zip_code, availability_start, availability_end], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.status(201).json({ message: 'Listing created', listingId: result.insertId });
  });
});

module.exports = router;

