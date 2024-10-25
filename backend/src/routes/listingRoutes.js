const express = require("express");
const router = express.Router();

const { upload } = require("./../utils/middlewares/middlewareS3");

const listingController = require("../controllers/listingController");


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
