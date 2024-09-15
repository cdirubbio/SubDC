const multer = require("multer");
const express = require("express");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const db = require("../db");
const dotenv = require("dotenv");
const { S3Client } = require("@aws-sdk/client-s3");

const router = express.Router();
dotenv.config();

const s3 = new S3Client({
  region: "us-east-1",
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});

router.post(
  "/createListing",
  upload.fields([{ name: "image1" }, { name: "image2" }]),
  (req, res) => {
    const {
      user_id,
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

    const sql = `
      INSERT INTO Listings 
      (user_id, title, description, apt_type, price, address, zip_code, availability_start, availability_end, image1, image2) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
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
      ],
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        res
          .status(201)
          .json({ message: "Listing created", listingId: result.insertId });
      }
    );
  }
);

module.exports = router;
