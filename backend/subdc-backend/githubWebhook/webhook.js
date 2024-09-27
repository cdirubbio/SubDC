const express = require('express');
const crypto = require('crypto');
const { exec } = require('child_process');

const express = require("express");
const dotenv = require("dotenv");

const router = express.Router();


function verifySignature(req, res, next) {
    const sig = req.headers['x-hub-signature-256'];
    const hmac = crypto.createHmac('sha256', process.env.WEBHOOK_SECRET);
    const digest = 'sha256=' + hmac.update(JSON.stringify(req.body)).digest('hex');
    if (sig === digest) {
      return next();
    } else {
      return res.status(401).send('Invalid signature');
    }
  }
  
  app.post('/github-webhook', verifySignature, (req, res) => {
    const { ref } = req.body;
  
    if (ref === 'refs/heads/main') {
      exec('./../../../deploy-frontend.sh', (err, stdout, stderr) => {
        if (err) {
          console.error(`Error deploying frontend: ${stderr}`);
          return res.status(500).send('Error deploying frontend');
        }
        console.log(`Frontend deployed: ${stdout}`);
      });

      exec('./../../../deploy-backend.sh', (err, stdout, stderr) => {
        if (err) {
          console.error(`Error deploying backend: ${stderr}`);
          return res.status(500).send('Error deploying backend');
        }
        console.log(`Backend deployed: ${stdout}`);
      });
  
      res.status(200).send('Deployments triggered');
    } else {
      res.status(200).send('Not on main branch');
    }
  });
  

module.exports = router;
