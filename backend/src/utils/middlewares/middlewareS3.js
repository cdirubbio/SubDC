////////////////\\\\\\\\\\\\\\\\\\
// Middlewares for S3 and Multer
////////////////\\\\\\\\\\\\\\\\\\
const multer = require("multer");
const multerS3 = require("multer-s3");
const dotenv = require("dotenv");
const { S3Client, DeleteObjectsCommand } = require("@aws-sdk/client-s3");

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

 module.exports = {
    s3, upload
  };