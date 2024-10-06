const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const cors = require("cors");
const listingsRoutes = require("./routes/listings");
const authRoutes = require("./routes/auth");
const test = require("./routes/test");
const favorites = require("./routes/favorites");
const userStuff = require("./routes/userStuff");
const verifyEmail = require("./routes/verify-email");
const createListing = require("./routes/createListing");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
app.use(bodyParser.json());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://subdc.co",
      "http://subdc.co"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Origin",
    ],
  })
);

app.use("/api", listingsRoutes);
app.use("/api", createListing);
app.use("/api", authRoutes);
app.use("/api", userStuff);
app.use("/api", favorites);
app.use("/api", verifyEmail);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend Server is running on http://localhost:${PORT}`);
});
