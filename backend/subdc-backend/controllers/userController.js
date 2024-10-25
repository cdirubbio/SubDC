const user = require("../models/userModel");
const { getUserInfoFromJSONWebToken } = require("../utils/helpers/jwtHelper");
const { dcZipCodes } = require("../utils/helpers/locationHelper");

module.exports = {
  getUserInfo: async (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    try {
      const userInfo = await getUserInfoFromJSONWebToken(token);
      const user_id = userInfo.user_id;

      if (!user_id) {
        return res.status(401).json({ message: "Invalid User ID" });
      }

      console.log(user_id);

      
      const result = await user.queryUserInfo(user_id);

      return res.status(200).json(result);
    } catch (err) {
      console.error(err);
      return res
        .status(500).json({ message: "Error fetching user info", error: err });
    }
  },
  getUserListings: async (req, res) => {
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
      user.queryUserListings(user_id).then((result) => {
        const transformedListings = result.map((listing) => {
          const location = dcZipCodes[listing.zip_code] || "Unknown Location";
          const transformedListing = {
            ...listing,
            location,
          };
          delete transformedListing.zip_code;
          return transformedListing;
        });
        res.status(200).json(transformedListings);
      });
    } catch (err) {
      console.error(err);
    }
  },
  getUserFavorites: async (req, res) => {
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
      user.queryUserFavorites(user_id).then((result) => {
        const transformedListings = result.map((listing) => {
          const location = dcZipCodes[listing.zip_code] || "Unknown Location";
          const transformedListing = {
            ...listing,
            location,
          };
          delete transformedListing.zip_code;
          return transformedListing;
        });
        res.status(200).json(transformedListings);
      });
    } catch (err) {
      console.error(err);
    }
  },
  toggleUserFavorite: async (req, res) => {
    try {
      const userInfo = await getUserInfoFromJSONWebToken(token);
      const user_id = userInfo.user_id;
      if (!user_id) {
        return res.status(401).json({ message: "Invalid User ID" });
      }
      const { listing_id } = req.body;

      if (!listing_id) {
        return res.status(401).json({ message: "Invalid Listing ID" });
      }
      user.updateUserFavorite(user_id, listing_id).then((result) => {
        res.status(200).json(result);
      });
    } catch (err) {
      console.error(err);
    }
  },
  updateUserInfo: async (req, res) => {
    const authHeader = req.headers["authorization"];
    const { username, first_name, last_name, phone_number } = req.body;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    try {
      const userInfo = await getUserInfoFromJSONWebToken(token);
      const user_id = userInfo.user_id;
      if (!user_id) {
        return res.status(401).json({ message: "Invalid User ID" });
      }

      const result = await user.updateUserInfo(
        user_id,
        username,
        first_name,
        last_name,
        phone_number
      );
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "User not found or no changes made" });
      }
      res.json({ success: "true" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getUserNotifications: async (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    try {
      const userInfo = await getUserInfoFromJSONWebToken(token);
      const user_id = userInfo.user_id;
      if (!user_id) {
        return res.status(401).json({ message: "Invalid User ID" });
      }

      const notifications = await user.getUserNotifications(user_id);
      res.status(200).json({ notifications });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
  removeNotification: async (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const { notification_id } = req.body;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    try {
      const userInfo = await getUserInfoFromJSONWebToken(token);
      const user_id = userInfo.user_id;
      if (!user_id) {
        return res.status(401).json({ message: "Invalid User ID" });
      }

      const result = await user.removeNotification(notification_id);
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Notification not found or no change made" });
      }
      res.json({ success: "true" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
