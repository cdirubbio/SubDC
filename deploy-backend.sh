#!/bin/bash

git pull origin main
cd backend/subdc-backend
npm install
pm2 restart server
echo "Backend deployed to EC2"