const express = require("express");
const router = express.Router();
const { S3Client } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");

const listingController = require("../controllers/listingController");

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

router.get("/api/listings", listingController.getAllListings);

router.get("/api/listing/:id", listingController.getListingInfo);

router.post(
  "/api/listing/create",
  upload.fields([{ name: "image1" }, { name: "image2" }]),
  listingController.createListing
);

router.put("/api/listing/:id", listingController.updateListing);

router.delete("/api/listing/:id", listingController.deleteListing);

module.exports = router;
