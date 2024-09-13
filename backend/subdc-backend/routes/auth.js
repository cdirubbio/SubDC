const express = require("express");
const dotenv = require("dotenv");
const db = require("../db");
const { checkUsernameNotExist, checkEmailNotExist } = require("../helpers/registerHelper");
const { checkUsernameExists } = require("./../helpers/loginHelper")

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password, first_name, last_name, phone_number } =
    req.body;
  try {    
    await checkUsernameNotExist(username);
    await checkEmailNotExist(email);

    const sql = "INSERT INTO Users (username, email, password, first_name, last_name, phone_number) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [username, email, password, first_name, last_name, phone_number], 
        (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message }); 
        }
        res.status(201).json({ message: "User registered successfully", userId: result.insertId,}); 
      }
    );
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
    const { username, password} = req.body;
    try {    
      await checkUsernameExists(username);
  
      const sql = "SELECT user_id, password FROM Users WHERE username = ?";

      db.query(sql, [username], (err, result) => {
          if (err) {
            return res.status(500).json({ error: err.message }); 
          }
          if (result.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
          }
          const user = result[0];
          if (password != user.password) {
            return res.status(401).json({ message: 'Invalid Username or Password' });
          }
          res.status(200).json({ message: 'Login successful', userId: user.user_id });
        }
      );
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  });

module.exports = router;
