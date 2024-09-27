const express = require("express");
const { exec } = require("child_process");
const dotenv = require("dotenv");

const router = express.Router();

dotenv.config();

router.post("/github-webhook", (req, res) => {
  const { ref } = req.body;
  console.log("Webhook payload:", req.body);

  if (ref === "refs/heads/main") {
    exec("/home/ec2-user/subdc/deploy.sh", (err, stdout, stderr) => {
      if (err) {
        console.error(`Error deploying : ${stderr}`);
        return res.status(500).send("Error deploying ");
      }
      console.log(`Frontend and Backenddeployed: ${stdout}`);
    });
    res.status(200).send("Deployments triggered");
  } else {
    res.status(200).send("Not on main branch");
  }
});

module.exports = router;
