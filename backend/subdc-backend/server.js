const https = require("https");
const fs = require("fs");
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

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/subdc.co/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/subdc.co/cert.pem'),
};

app.use(bodyParser.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://subdc.co",
      "https://www.subdc.co"
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


https.createServer(options, app).listen(443, "0.0.0.0", () => {
  console.log(`Backend Server is running on https://localhost:443`);
});

const http = require("http");
http.createServer((req, res) => {
  res.writeHead(301, { "Location": "https://" + req.headers["host"] + req.url });
  res.end();
}).listen(80, "0.0.0.0", () => {
  console.log(`HTTP server is redirecting traffic to HTTPS`);
});
