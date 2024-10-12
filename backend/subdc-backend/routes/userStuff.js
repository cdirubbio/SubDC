const express = require("express");
const dotenv = require("dotenv");
const db = require("../db");
const { dcZipCodes } = require("../helpers/locationHelper");
const {
  getUserInfoFromJSONWebToken,
  generateJSONWebToken,
} = require("../helpers/jwtHelper");

const router = express.Router();
dotenv.config();

router.post("/user/listings", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const userInfo = await getUserInfoFromJSONWebToken(token);
    const user_id = userInfo.user_id;
    if (user_id == null) {
      return res.status(401).json({ message: "Invalid User ID" });
    }
    const sql =
      "SELECT listing_id, title, price, image1, image2, zip_code FROM Listings WHERE user_id = ?";

    db.query(sql, [user_id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "User has no listings" });
      }
      const transformedListings = result.map((listing) => {
        const location = dcZipCodes[listing.zip_code] || "Unknown Location";
        const transformedListing = {
          ...listing,
          location,
        };
        delete transformedListing.zip_code;
        return transformedListing;
      });

      return res.status(200).json(transformedListings);
    });
  } catch (err) {
    console.error(err);
  }
});

router.post("/userInfo", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const userInfo = await getUserInfoFromJSONWebToken(token);
    const user_id = userInfo.user_id;
    if (user_id == null) {
      return res.status(401).json({ message: "Invalid User ID" });
    }
    const sql =
      "SELECT user_id, username,first_name, last_name, email, phone_number FROM Users WHERE user_id = ?";

    db.query(sql, [user_id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.length === 0) {
        return res.status(401).json({ message: "Invalid User ID" });
      }
      const user = result[0];
      res.status(200).json({ user });
    });
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
});

router.put("/userInfo", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const { username, first_name, last_name, phone_number } = req.body;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const userInfo = await getUserInfoFromJSONWebToken(token);
    const user_id = userInfo.user_id;
    if (user_id == null) {
      return res.status(401).json({ message: "Invalid User ID" });
    }
    const sql =
      "UPDATE Users SET username = ?,  first_name = ?, last_name = ?, phone_number = ? WHERE user_id = ?;";
    db.query(
      sql,
      [username, first_name, last_name, phone_number, user_id],
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
          return res
            .status(404)
            .json({ message: "User not found or no changes made" });
        }
        res.json({ success: "true" });
      }
    );
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.post("/userNotifications", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const userInfo = await getUserInfoFromJSONWebToken(token);
    const user_id = userInfo.user_id;
    if (user_id == null) {
      return res.status(401).json({ message: "Invalid User ID" });
    }

    const sql = `
  SELECT UserNotifications.notification_id, UserNotifications.listing_id, UserNotifications.user_id, Users.username, 
         UserNotifications.listing_action, UserNotifications.created_at, Listings.title, Listings.listing_id
  FROM UserNotifications
  JOIN Listings ON UserNotifications.listing_id = Listings.listing_id
  JOIN Users ON UserNotifications.user_id = Users.user_id
  WHERE UserNotifications.owner_user_id = ? 
  AND UserNotifications.visible = true`;

    db.query(sql, [user_id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.status(200).json({ notifications: result });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/userNotifications/remove", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const { notification_id } = req.body;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const userInfo = await getUserInfoFromJSONWebToken(token);
    const user_id = userInfo.user_id;
    if (user_id == null) {
      return res.status(401).json({ message: "Invalid User ID" });
    }
    const sql =
      "UPDATE UserNotifications SET visible = false WHERE notification_id= ?;";
    db.query(sql, [notification_id], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Notification not found or no change made" });
      }
      res.json({ success: "true" });
    });
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
