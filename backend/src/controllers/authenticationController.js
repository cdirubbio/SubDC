const authentication = require("../models/authenticationModel");
const { generateJSONWebToken, getUserInfoFromJSONWebToken } = require("../utils/helpers/jwtHelper");
const { checkUsernameNotExist, checkEmailNotExist, sendVerificationEmail, verifyStudentEmail } = require("../utils/helpers/registerHelper");
const { checkUsernameExists } = require("../utils/helpers/loginHelper");
const jwt = require('jsonwebtoken');
module.exports = {
  register: async (req, res) => {
    const { username, email, password, first_name, last_name, phone_number } =
      req.body;
    try {
      if (!verifyStudentEmail(email)) {
        return res
          .status(401)
          .json({ message: "Not Authorized to sign up without student email" });
      }
      await checkUsernameNotExist(username);
      await checkEmailNotExist(email);

      const result = await authentication.registerUser({
        username,
        email,
        password,
        first_name,
        last_name,
        phone_number,
      });

      sendVerificationEmail(email);
      res.status(201).json({
        message:
          "User registered successfully, please now verify email address",
        userId: result.insertId,
      });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  },
  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      await checkUsernameExists(username);


      const user = await authentication.getUserByUsername(username);

      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      if (password !== user.password) {
        return res
          .status(401)
          .json({ success: "false", message: "Not authenticated" });
      }

    
      if (!user.email_is_verified) {
        return res
          .status(400)
          .json({ success: "false", message: "Email is not verified" });
      }


      const token = generateJSONWebToken({
        user_id: user.user_id,
        username: user.username,
        email: user.email,
      });


      res.status(200).json({
        success: "true",
        token: token,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  authenticateJWT: async (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    try {
      const userInfo = await getUserInfoFromJSONWebToken(token);
      if (userInfo) {
        res.status(200).json({ user_id: userInfo.user_id, validated: "true" });
      } else {
        res.status(401).json({ message: "Invalid token or user not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
  verifyEmail: async (req, res) => {
    try {
      const authHeader = req.headers["authorization"];
      let decoded;

      if (authHeader) {
        const token = authHeader.split(" ")[1];
        if (token) {
          decoded = jwt.verify(token, "Phoebe");
        } else {
          return res
            .status(400)
            .json({ message: "Invalid verification token" });
        }
      } else {
        return res
          .status(400)
          .json({ message: "Authorization header missing" });
      }

      if (!decoded || !decoded.email) {
        return res
          .status(404)
          .json({ message: "Email verification token not found or invalid" });
      }

      const email = decoded.email;

      const result = await authentication.verifyEmailInDatabase(email);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      res
        .status(200)
        .json({
          message: "Email verified successfully. Please log in now.",
          email,
        });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  },
};
