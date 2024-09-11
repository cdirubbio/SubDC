const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const listingsRoutes = require('./routes/listings');
const cors = require('cors')

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware thingy
app.use(bodyParser.json());
app.use(cors());

// DB connection Parameters
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});
// DB Connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL database');
});

app.use('/api', listingsRoutes);

app.listen(PORT, () => {
  console.log(`Backend Server is running on http://localhost:${PORT}`);
});