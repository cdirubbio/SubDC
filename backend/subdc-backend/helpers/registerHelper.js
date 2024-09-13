////////////////\\\\\\\\\\\\\\\\\\
// Helper Methods for /api/register
////////////////\\\\\\\\\\\\\\\\\\
const db = require('../db');
const checkUsernameNotExist = (username) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT user_id FROM Users WHERE username = ?';
  
      db.query(sql, [username], (err, result) => {
        if (err) {
          reject({ status: 500, message: err.message }); 
        } else if (result.length !== 0) {
          reject({ status: 409, message: 'Username already exists' }); 
        } else {
          resolve(); 
        }
      });
    });
  };

  const checkEmailNotExist = (email) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT user_id FROM Users WHERE email = ?';
  
      db.query(sql, [email], (err, result) => {
        if (err) {
          reject({ status: 500, message: err.message });
        } else if (result.length !== 0) {
          reject({ status: 409, message: 'Email already exists' }); 
        } else {
          resolve();
        }
      });
    });
  };

module.exports = { checkUsernameNotExist, checkEmailNotExist };