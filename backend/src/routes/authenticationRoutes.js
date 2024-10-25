const express = require("express");
const authenticationController = require("../controllers/authenticationController");

const router = express.Router();

router.post("/api/register", authenticationController.register);

router.post("/api/login", authenticationController.login);

router.post("/api/jwt/auth", authenticationController.authenticateJWT);

router.post("/api/verify-email", authenticationController.verifyEmail);

module.exports = router;
