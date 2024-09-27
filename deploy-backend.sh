#!/bin/bash

git pull origin main
cd backend/subdc-backend
npm install --no-optional

pm2 restart server
echo "Backend deployed to EC2"