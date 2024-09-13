////////////////\\\\\\\\\\\\\\\\\\
// Helper Methods for /api/login
////////////////\\\\\\\\\\\\\\\\\\
const db = require('../db');

const checkUsernameExists = (username) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT user_id FROM Users WHERE username = ?';
  
      db.query(sql, [username], (err, result) => {
        if (err) {
          reject({ status: 500, message: err.message }); 
        } else if (result.length === 0) {
          reject({ status: 404, message: 'Username does not exist' }); 
        } else {
          resolve(); 
        }
      });
    });
  };
  
module.exports = { checkUsernameExists };
