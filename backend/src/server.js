const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const cors = require("cors");
const listingRoutes = require("./routes/listingRoutes");
const userRoutes = require("./routes/userRoutes");
const authenticationRoutes = require("./routes/authenticationRoutes");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://subdc-test.s3-website-us-east-1.amazonaws.com",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Origin",
    ],
  })
);

app.use("/", userRoutes);
app.use("/", listingRoutes);
app.use("/", authenticationRoutes);
app.get("/", (req, res) => {
  console.log("Default Route Hit");
  res.send("Welcome to SubDC Backend!");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend Server is running on http://localhost:${PORT}`);
});
