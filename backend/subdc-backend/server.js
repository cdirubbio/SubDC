const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');
const listingsRoutes = require('./routes/listings');
const authRoutes = require('./routes/auth');
const test = require('./routes/test');
const favorites = require('./routes/favorites');
const userStuff = require('./routes/userStuff');
const verifyEmail = require('./routes/verify-email');
const createListing = require('./routes/createListing');
const webhook = require('./githubWebhook/webhook');

const db = require('./db');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

const githubWebhookServer = express();
const webhookServerPort = process.env.WEBHOOK_SERVER_PORT
githubWebhookServer.use(express.json());
// Middleware thingy
app.use(bodyParser.json());


app.use(cors({
  origin: ['http://localhost:3000', 
    // 'http://subdc.s3-website-us-east-1.amazonaws.com', 
    // 'http://subdc.christiandirubbio.com.s3-website-us-east-1.amazonaws.com',
    'http://subdc.christiandirubbio.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin']
}));

githubWebhookServer.use(cors());


// DB Connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL database');
});


app.use('/api', listingsRoutes);
app.use('/api', createListing);
app.use('/api', authRoutes);
app.use('/api', userStuff);
app.use('/api', favorites);
app.use('/api', verifyEmail);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend Server is running on http://localhost:${PORT}`);
});

githubWebhookServer.use('/api', webhook);

githubWebhookServer.listen(webhookServerPort, "0.0.0.0", () => {
  console.log(`GitHub Webhook Listener server is running on http://localhost:${webhookServerPort}`)
})
