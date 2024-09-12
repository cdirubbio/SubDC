const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

const router = express.Router();


dotenv.config();


const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});


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

const dcZipCodes = {
  "20001": "Shaw",
  "20002": "Capitol Hill",
  "20003": "Capitol Hill",
  "20004": "Downtown",
  "20005": "Logan Circle",
  "20006": "Foggy Bottom",
  "20007": "Georgetown",
  "20008": "Cleveland Park",
  "20009": "Adams Morgan",
  "20010": "Columbia Heights",
  "20011": "Petworth",
  "20012": "Brightwood",
  "20015": "Chevy Chase",
  "20016": "American University Park",
  "20017": "Brookland",
  "20018": "Arlington",
  "20019": "Deanwood",
  "20020": "Anacostia",
  "20024": "Southwest Waterfront",
  "20032": "Washington Heights",
  "20036": "Dupont Circle",
  "20037": "West End",
  "20052": "Foggy Bottom",
  "20059": "Howard University",
  "20064": "University of the District of Columbia",
  "20090": "Washington National Cathedral"
};
