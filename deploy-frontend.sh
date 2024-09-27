#!/bin/bash
git pull origin main
cd frontend/react-app
npm install
npm run build
aws s3 rm s3://subdc.christiandirubbio.com --recursive
aws s3 cp ./build/ s3://subdc.christiandirubbio.com --recursive
echo "Frontend deployed to S3"

