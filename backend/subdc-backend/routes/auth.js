const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const db = require("../db");
const {checkUsernameNotExist, checkEmailNotExist,} = require("../helpers/registerHelper");
const { checkUsernameExists } = require("./../helpers/loginHelper");
const { generateJSONWebToken, getUserInfoFromJSONWebToken } = require("./../helpers/jwtHelper");

dotenv.config();

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password, first_name, last_name, phone_number } =
    req.body;
  try {
    await checkUsernameNotExist(username);
    await checkEmailNotExist(email);

    const sql =
      "INSERT INTO Users (username, email, password, first_name, last_name, phone_number, is_verified) VALUES (?, ?, ?, ?, ?, ?, false)";
    db.query(
      sql,
      [username, email, password, first_name, last_name, phone_number],
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res
          .status(201)
          .json({
            message: "User registered successfully, please now verify email address",
            userId: result.insertId,
          });
      }
    );
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    await checkUsernameExists(username);

    const sql =
      "SELECT user_id, username, email, password FROM Users WHERE username = ?";

    db.query(sql, [username], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const user = result[0];
      if (password != user.password) {
        return res
          .status(401)
          .json({ success: "false", message: "Not authenticated" });
      }
      res.status(200).json({
        success: "true",
        token: generateJSONWebToken({
          user_id: user.user_id,
          username: user.username,
          email: user.email,
        }),
      });
    });
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
});

router.post("/jwt/auth", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const userInfo = await getUserInfoFromJSONWebToken(token);
    if (userInfo != null) {
      res.status(200).json({ user_id: userInfo.user_id, validated: 'true' });
    } else {
      res.status(401).json({ message: "Invalid token or user not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
