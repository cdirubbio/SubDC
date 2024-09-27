#!/bin/bash

git pull origin main
cd frontend/react-app
npm install
npm run build
aws s3 sync ./build/ s3://subdc.christiandirubbio.com --delete
echo "Frontend deployed to S3"

