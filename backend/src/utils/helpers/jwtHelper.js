////////////////\\\\\\\\\\\\\\\\\\
// Helper Methods for JWT functionality
////////////////\\\\\\\\\\\\\\\\\\
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const db = require("../../database/db");
const { checkUsernameExists } = require("./loginHelper");

dotenv.config();

const getUserInfoFromJSONWebToken = async (token) => {
  try {
    if (!token) {
      console.warn("no jwt found");
      return null;
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userInfo = decoded.user_id;
    const exists = await checkUsernameExists(userInfo.username);

    if (exists) {
      return userInfo;
    }
    return null;
  } catch (err) {
    console.error("Invalid or expired JWT:");
    return null;
  }
};

const generateJSONWebToken = (user_id, username, email) => {
  return jwt.sign(
    { 
        user_id: user_id,
        username: username,
        email: email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

module.exports = {
  generateJSONWebToken,
  getUserInfoFromJSONWebToken,
};
