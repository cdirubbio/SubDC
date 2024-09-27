#!/bin/bash

git pull origin main
cd frontend/react-app
npm run build
aws s3 sync ./build/ s3://subdc --delete
echo "Frontend deployed to S3"
