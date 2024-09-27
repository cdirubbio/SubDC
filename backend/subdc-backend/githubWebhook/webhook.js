const express = require('express');
const { exec } = require('child_process');
const dotenv = require("dotenv");

const router = express.Router();

dotenv.config();

  
  router.post('/github-webhook', (req, res) => {
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
