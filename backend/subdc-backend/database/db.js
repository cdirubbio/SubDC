const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

let db;

function handleDisconnect() {
  db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  db.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      setTimeout(handleDisconnect, 2000);
    } else {
      console.log('Connected to MySQL database');
    }
  });

  db.on('error', (err) => {
    console.error('MySQL error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log('Connection lost. Reconnecting...');
      handleDisconnect(); 
    } else {
      throw err;
    }
  });
}

handleDisconnect();

module.exports = db;
