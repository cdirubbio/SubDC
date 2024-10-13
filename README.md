# SubDC

SubDC is a web application designed to simplify the process of subleasing for students in Washington DC. Built using modern web technologies, it allows users to list their apartments, search for available listings, and manage their subleases.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and session management (switching from JWT local storage to HTTP-only cookies soon)
- Search and filter apartment listings by location
- Add, edit, and delete apartment listings
- Favorite and unfavorite listings
- User notifications for interactions
- Responsive design for mobile and desktop
- Automated CI/CD pipeline with GitHub Webhooks
- SSL encryption using Let’s Encrypt
- Integrated AWS services (S3, SES, Secrets Manager, EC2, Aurora Serverless DB)

## Tech Stack

### Frontend
- React.js
- Playwright for Frontend testing

### Backend
- Node.js with Express
- MariaDB
- JWT (to be replaced with HTTP-only cookies)

### Infrastructure
- AWS S3 for static file hosting
- AWS EC2 for backend hosting
- AWS Aurora Serverless (MariaDB)
- AWS Secrets Manager for secure credentials
- Docker for containerization (soon)
- Let's Encrypt for SSL

### Other Tools
- PM2 for process management
- GitHub Webhooks for automated deployment

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/cdirubbio/subdc.git
    cd subdc
    ```

2. Install dependencies:

    ```bash
    # For the frontend
    cd frontend
    npm install

    # For the backend
    cd ../backend
    npm install
    ```

3. Configure environment variables as described below.

4. Build the frontend:

    ```bash
    npm run build
    ```

5. Or start the backend server locally:

    ```bash
    npm start
    ```

## Environment Variables

The application requires the following environment variables:

```bash
# Backend
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=subdc
PORT=8080

WEBHOOK_SECRET=your_webhook_secret

JWT_SECRET=your_jwt_secret
S3_BUCKET_NAME="subdc-listing-images"

EMAIL=your_email
EMAIL_PASSWORD=your_email_app_password

FRONTEND_URL=https://subdc.co
# Frontend
REACT_APP_API_URL=your_backend_api_url
```

## Usage

### Frontend:
The React app is served from an S3 bucket with static website hosting enabled.  
Navigate to the domain (e.g., [subdc.co](https://subdc.co)) to access the app.

### Backend:
The Node.js backend is hosted on EC2 and serves the API endpoints for the frontend.

### Deployment:
The CI/CD pipeline triggers on push to the `main` and`test` branches, deploying the frontend to the respective S3 bucket and the backend to the respective EC2 servers.

## API Endpoints

### Authentication
- `POST /api/auth/login`: User login
- `POST /api/auth/register`: User registration
- `POST /api/verify-email`: User email verification endpoint
- `POST /api/jwt/auth`: Verify user's JWT is proper


### Listings
- `POST /api/createListing`: Create a new listing
- `GET /api/listings`: Fetch all listings: For /Explore page
- `POST /api/listing/:id`: Fetch details for a specific listing
- `PUT /api/listing/:id`: Update details for a specific listing
- `DELETE /api/listing/:id`: Delete a listing

### User Information
- `POST /api/user/listings`: Fetch all listings of a specific user
- `POST /api/userInfo`: Fetch user's details: For /Account page
- `PUT /api/userInfo`: Update user's details: For /Account page

### Favorites
- `POST /api/user/toggleFavorite`: Toggle favorite for a listing
- `POST /api/user/favorites`: Fetch all favorites of a specific user

### Notifications
- `POST /api/userNotifications`: Fetch user's details: For /Account page
- `POST /api/userNotifications/remove`: Hide notification

## Contributing

Feel free to contribute to this project by submitting issues or pull requests. For major changes, please open an issue to discuss what you would like to change.