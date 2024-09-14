////////////////\\\\\\\\\\\\\\\\\\
// Helper Methods for JWT functionality
////////////////\\\\\\\\\\\\\\\\\\
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const db = require("./../db");
const { checkUsernameExists } = require("./loginHelper");

dotenv.config();

const generateJSONWebToken = (username) => {
  return jwt.sign({ username: username }, process.env.JWT_SECRET);
};

const getUsernameFromJSONWebToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.username;
  } catch (err) {
    console.error("Invalid JWT:", err);
    return null;
  }
};
const verifyJSONWebToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const username = decoded.username;
    const exists = await checkUsernameExists(username);
    return exists;
  } catch (err) {
    console.error("Error verifying JWT:", err);
    return false;
  }
};

const getUserIDFromJSONWebToken = async (token) => {
  try {
    const isValid = await verifyJSONWebToken(token);
    if (!isValid) {
      return false;
    }

    const username = getUsernameFromJSONWebToken(token);
    if (!username) {
      return false;
    }
    const sql = "SELECT user_id FROM Users WHERE username = ?";
    const result = await new Promise((resolve, reject) => {
      db.query(sql, [username], (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    if (result.length === 0) {
      return false;
    } else {
      return result[0].user_id;
    }
  } catch (error) {
    console.error("Error in getUserIDFromJSONWebToken:", error);
    return false;
  }
};

module.exports = {
  generateJSONWebToken,
  verifyJSONWebToken,
  getUserIDFromJSONWebToken,
};
