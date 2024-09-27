git pull origin main
chmod +x deploy.sh
cd backend/subdc-backend
npm install --no-optional
pm2 restart server
echo "Backend deployed to EC2"

cd ../../frontend/react-app
npm install-clean --omit=optional
npm run build
aws s3 rm s3://subdc.christiandirubbio.com --recursive
aws s3 cp ./build/ s3://subdc.christiandirubbio.com --recursive
echo "Frontend deployed to S3"

