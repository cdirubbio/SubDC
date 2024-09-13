const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');

const listingsRoutes = require('./routes/listings');
const authRoutes = require('./routes/auth');
const test = require('./routes/test');
const favorites = require('./routes/favorites');
const userListings = require('./routes/userListings');

const db = require('./db');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware thingy
app.use(bodyParser.json());
app.use(cors());


// DB Connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL database');
});

app.use('/api', listingsRoutes);
app.use('/api', authRoutes);
app.use('/api', userListings);
app.use('/api', favorites);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend Server is running on http://localhost:${PORT}`);
});