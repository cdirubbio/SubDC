const express = require("express");
const dotenv = require("dotenv");
const db = require("../db");
const { dcZipCodes } = require("../helpers/locationHelper");
const { getUserInfoFromJSONWebToken } = require("../helpers/jwtHelper");
const { S3Client, DeleteObjectsCommand } = require("@aws-sdk/client-s3");
const router = express.Router();

const s3 = new S3Client({
  region: "us-east-1",
});

dotenv.config();
router.get("/listings", (req, res) => {
  const sql =
    "SELECT listing_id, title, apt_type, zip_code, image1, image2, price FROM Listings WHERE reserved_by IS NULL";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const transformedListings = results.map((listing) => {
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
});




router.get("/listing/:id", async (req, res) => {
  try {
    const { id: listing_id } = req.params;
    let user_id = null;
    const authHeader = req.headers["authorization"];

    if (authHeader) {
      const token = authHeader.split(" ")[1];
      if (token != null) {
        const userInfo = await getUserInfoFromJSONWebToken(token);
        if (userInfo && userInfo.user_id) {
          user_id = userInfo.user_id;
        }
      }
    }

    if (!listing_id) {
      return res.status(400).json({ message: "Listing ID is required" });
    }

    let listingSql;
    let queryParams;

    if (user_id) {
      listingSql = `
        SELECT l.listing_id, l.user_id AS listing_user_id, l.title, l.description, l.apt_type, l.zip_code, l.price, l.availability_start, l.availability_end, l.reserved_by, l.image1, l.image2,
               IFNULL(f.isFavorite, 0) AS isFavorite
        FROM Listings l
        LEFT JOIN (
          SELECT listing_id, 1 AS isFavorite
          FROM Favorites
          WHERE user_id = ?
        ) f ON l.listing_id = f.listing_id
        WHERE l.listing_id = ?
      `;
      queryParams = [user_id, listing_id];
    } else {
      listingSql = `
        SELECT l.listing_id, l.user_id AS listing_user_id, l.title, l.description, l.apt_type, l.zip_code, l.price, l.availability_start, l.availability_end, l.image1, l.image2,
               0 AS isFavorite
        FROM Listings l
        WHERE l.listing_id = ?
      `;
      queryParams = [listing_id];
    }

    db.query(listingSql, queryParams, (err, result) => {
      if (err) {
        console.error("Database query error:", err.message);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: "Listing not found" });
      }

      const listing = result[0];
      if (user_id) {
        if (
          listing.reserved_by &&
          listing.reserved_by !== user_id &&
          listing.user_id !== user_id
        ) {
          return res.status(403).json({
            message: "You do not have permission to view this listing",
          });
        }
      }

      const location = dcZipCodes[listing.zip_code] || "Unknown Location";

      const transformedListing = {
        ...listing,
        location,
        isFavorite: Boolean(listing.isFavorite),
        user_id: user_id,
      };

      delete transformedListing.zip_code;

      res.status(200).json(transformedListing);
    });
  } catch (error) {
    console.error("Error handling request:", error.message);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

router.put("/listing/:id", async (req, res) => {
  try {
    const { id: listing_id } = req.params;
    let token;
    const {
      title,
      description,
      apt_type,
      price,
      availability_start,
      availability_end,
    } = req.body;
    const authHeader = req.headers["authorization"];
    if (authHeader) {
      token = authHeader.split(" ")[1];
    }
    if (!listing_id) {
      return res.status(400).json({ message: "Listing ID is required" });
    }
    if (!authHeader) {
      return res.status(400).json({ message: "Authorization is required" });
    }
    if (!token) {
      return res.status(400).json({ message: "JWT is required" });
    }
    const userInfo = await getUserInfoFromJSONWebToken(token);
    if (!userInfo || !userInfo.user_id) {
      return res.status(400).json({ message: "JWT translation error" });
    }
    const user_id = userInfo.user_id;

    const ownerSql = "SELECT user_id FROM Listings WHERE listing_id = ?";
    db.query(ownerSql, listing_id, (err, result) => {
      if (err) {
        console.log("poop");
        return res.status(500).json({ error: err.message });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Listing not found" });
      }
      const listingOwnerId = result[0].user_id;
      console.log(listingOwnerId);
      if (user_id !== listingOwnerId) {
        return res
          .status(403)
          .json({ message: "You are not authorized to update this listing" });
      }
    });
    const formattedStart = new Date(availability_start)
      .toISOString()
      .split("T")[0];
    const formattedEnd = new Date(availability_end).toISOString().split("T")[0];

    const sql =
      "UPDATE Listings SET title = ?, description = ?, apt_type = ?, price = ?, availability_start = ?, availability_end = ? WHERE listing_id = ?;";
    db.query(
      sql,
      [
        title,
        description,
        apt_type,
        price,
        formattedStart,
        formattedEnd,
        listing_id,
      ],
      (err, result) => {
        if (err) {
          console.log("SQL Error:", err.message);
          console.log(
            title,
            description,
            apt_type,
            price,
            availability_start,
            availability_end,
            listing_id
          );
          return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
          return res
            .status(404)
            .json({ message: "Listing not found or no changes made" });
        }
        return res
          .status(200)
          .json({ message: "Listing updated successfully!" });
      }
    );
  } catch (error) {
    console.log(error);
  }
});

router.delete("/listing/:id", async (req, res) => {
  try {
    const { id: listing_id } = req.params;
    const authHeader = req.headers["authorization"];
    if (!listing_id) {
      return res.status(400).json({ message: "Listing ID is required" });
    }
    if (!authHeader) {
      return res.status(400).json({ message: "Authorization is required" });
    }

    const token = authHeader.split(" ")[1];
    const userInfo = await getUserInfoFromJSONWebToken(token);
    if (!userInfo || !userInfo.user_id) {
      return res.status(400).json({ message: "JWT translation error" });
    }
    const user_id = userInfo.user_id;

    const ownerSql = "SELECT user_id FROM Listings WHERE listing_id = ?";
    db.query(ownerSql, listing_id, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Listing not found" });
      }
      const listingOwnerId = result[0].user_id;

      if (user_id !== listingOwnerId) {
        return res
          .status(403)
          .json({ message: "You are not authorized to delete this listing" });
      }

      const imageUrlSql =
        "SELECT image1, image2 FROM Listings WHERE listing_id = ?";
      db.query(imageUrlSql, listing_id, (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
          return res.status(404).json({ message: "Listing not found" });
        }
        const image1 = result[0].image1;
        const image2 = result[0].image2;

        const deleteParams = {
          Bucket: process.env.S3_BUCKET_NAME,
          Delete: {
            Objects: [
              { Key: image1.split("/").pop() },
              { Key: image2.split("/").pop() },
            ],
          },
        };

        const command = new DeleteObjectsCommand(deleteParams);
        s3.send(command)
          .then((data) => {
            console.log("Images deleted from S3:", data);

            const sql = "DELETE FROM Listings WHERE listing_id = ?";
            db.query(sql, [listing_id], (err, result) => {
              if (err) {
                return res.status(500).json({ error: err.message });
              }
              if (result.affectedRows === 0) {
                return res
                  .status(404)
                  .json({ message: "Listing not found or no changes made" });
              }
              return res.json({ success: "true" });
            });
          })
          .catch((err) => {
            console.error("Error deleting images from S3:", err);
            return res
              .status(500)
              .json({ error: "Failed to delete images from S3" });
          });
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
