const { dcZipCodes } = require("../utils/helpers/locationHelper");
const listing = require("../models/listingModel");
const dotenv = require("dotenv");
const { getUserInfoFromJSONWebToken } = require("../utils/helpers/jwtHelper");
const { s3, upload } = require("../utils/middlewares/middlewareS3");

dotenv.config();

module.exports = {
  getAllListings: async (req, res) => {
    listing.queryAllListings().then((result) => {
      const transformedListings = result.map((listing) => {
        const location = dcZipCodes[listing.zip_code] || "Unknown Location";
        const transformedListing = {
          ...listing,
          location,
        };
        return transformedListing;
      });
      res.status(200).json(transformedListings);
    });
  },
  getListingInfo: async (req, res) => {
    const { id: listing_id } = req.params;
    let user_id = null;
    const authHeader = req.headers["authorization"];
    try {
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
      listing.queryListingInfo(listing_id, user_id).then((result) => {
        const location = dcZipCodes[result.zip_code] || "Unknown Location";

        const transformedListing = {
          ...result,
          location,
          isFavorite: Boolean(result.isFavorite),
          user_id: user_id,
        };
        delete transformedListing.zip_code;

        res.status(200).json(transformedListing);
      });
    } catch (err) {
      console.error(err);
    }
  },
  createListing: async (req, res) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    try {
      const userInfo = await getUserInfoFromJSONWebToken(token);
      const user_id = userInfo.user_id;

      const {
        title,
        description,
        apt_type,
        price,
        address,
        zip_code,
        availability_start,
        availability_end,
      } = req.body;

      const image1Url = req.files["image1"]
        ? req.files["image1"][0].location
        : null;
      const image2Url = req.files["image2"]
        ? req.files["image2"][0].location
        : null;

      const newListing = {
        user_id,
        title,
        description,
        apt_type,
        price,
        address,
        zip_code,
        availability_start,
        availability_end,
        image1Url,
        image2Url,
      };

      const result = await listing.createListing(newListing);

      res
        .status(201)
        .json({ message: "Listing created", listingId: result.insertId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
  updateListing: async (req, res) => {
    try {
      const { id: listing_id } = req.params;
      const {
        title,
        description,
        apt_type,
        price,
        availability_start,
        availability_end,
      } = req.body;

      const authHeader = req.headers["authorization"];
      if (!authHeader || !listing_id) {
        return res
          .status(400)
          .json({ message: "Authorization and Listing ID are required" });
      }

      const token = authHeader.split(" ")[1];
      const userInfo = await getUserInfoFromJSONWebToken(token);
      if (!userInfo || !userInfo.user_id) {
        return res.status(400).json({ message: "JWT translation error" });
      }
      const user_id = userInfo.user_id;

      const listingOwner = await listing.getListingOwner(listing_id);
      if (!listingOwner) {
        return res.status(404).json({ message: "Listing not found" });
      }

      if (user_id !== listingOwner.user_id) {
        return res
          .status(403)
          .json({ message: "You are not authorized to update this listing" });
      }

      const formattedStart = new Date(availability_start)
        .toISOString()
        .split("T")[0];
      const formattedEnd = new Date(availability_end)
        .toISOString()
        .split("T")[0];

      // Update the listing in the model
      const result = await listing.updateListing(
        listing_id,
        title,
        description,
        apt_type,
        price,
        formattedStart,
        formattedEnd
      );

      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Listing not found or no changes made" });
      }

      res.status(200).json({ message: "Listing updated successfully!" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  deleteListing: async (req, res) => {
    try {
      const { id: listing_id } = req.params;
      const authHeader = req.headers["authorization"];

      if (!authHeader || !listing_id) {
        return res
          .status(400)
          .json({ message: "Authorization and Listing ID are required" });
      }

      const token = authHeader.split(" ")[1];
      const userInfo = await getUserInfoFromJSONWebToken(token);
      if (!userInfo || !userInfo.user_id) {
        return res.status(400).json({ message: "JWT translation error" });
      }
      const user_id = userInfo.user_id;
      console.log("userid: " + user_id);
      console.log("listingid: " + listing_id);

      const listingData = await listing.getListingOwnerAndImages(listing_id);
      if (!listingData) {
        return res.status(404).json({ message: "Listing not found" });
      }

      if (user_id !== listingData.user_id) {
        return res
          .status(403)
          .json({ message: "You are not authorized to delete this listing" });
      }

      const deleteParams = {
        Bucket: process.env.S3_BUCKET_NAME,
        Delete: {
          Objects: [
            {
              Key: listingData.image1
                ? listingData.image1.split("/").pop()
                : null,
            },
            {
              Key: listingData.image2
                ? listingData.image2.split("/").pop()
                : null,
            },
          ].filter((obj) => obj.Key),
        },
      };

      console.log(deleteParams.Delete.Objects);

      const command = new DeleteObjectsCommand(deleteParams);

      const s3DeleteResult = await s3.send(command);
      console.log("S3 Delete Result:", s3DeleteResult);

      const result = await listing.deleteListing(listing_id);
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Listing not found or no changes made" });
      }

      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  },
};
