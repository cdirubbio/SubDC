// userRoutes.js
const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.post("/api/user/info", userController.getUserInfo);

router.post("/api/user/listings", userController.getUserListings);

router.post("/api/user/favorites", userController.getUserFavorites);

router.post("/api/user/toggleFavorite", userController.toggleUserFavorite);

router.put("/api/user/info", userController.updateUserInfo);

router.post("/api/user/notifications", userController.getUserNotifications);

router.put("/api/user/notifications/remove", userController.removeNotification);

router.post("/api/user/reservation", userController.getReservation);

module.exports = router;