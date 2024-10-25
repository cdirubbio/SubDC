////////////////\\\\\\\\\\\\\\\\\\
// Middlewares for S3 and Multer
////////////////\\\\\\\\\\\\\\\\\\
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

export default { s3, upload };