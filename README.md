# SubDC

SubDC is a web application built with React.js on the frontend, Node.js with Express on the backend, and hosted on Amazon Web Services (AWS). Below is an overview of its architecture, design, and development process.

## Frontend

The frontend is built using React functional components to simplify UI creation. Components such as `ListingCards`, `Header`, `Footer`, and others were designed to compartmentalize the user interface. The initial iteration of the app used Tailwind CSS for styling, but it was later transitioned to Vanilla CSS for greater customization. All UI elements were created from scratch without relying on pre-built component libraries, ensuring a unique and cohesive design.

## Backend

The backend is written in JavaScript using Node.js and Express, following the **Model-View-Controller (MVC)** paradigm. This design pattern separates the API into three components:

- **Controllers**: Handle user interactions and coordinate between models and views.
- **Models**: Interact with the database to perform operations such as creating, reading, updating, and deleting data.
- **Views**: (Not utilized in SubDC) Typically provide server-side rendered content.

SubDC's backend includes the following models and controllers:
- **Authentication**: Manages user registration, login, email verification, and authentication middleware.
- **Listings**: Handles creating, reading, updating, and deleting listings, including image uploads to AWS S3.
- **Users**: Supports user info management, notifications, and favorites functionality.

### Highlights
1. **Email Verification**: Uses the `nodemailer` library and a SubDC email address to send verification emails containing JSON Web Tokens (JWTs).
2. **Image Uploads**: Integrates AWS S3 using the `multer` library. Images are uploaded to the `subdc-listing-images` bucket, and their URLs are stored in the database.
3. **Authentication Middleware**: Ensures only authorized users can access reserved listings.

## Infrastructure

### Hosting and Architecture
SubDC's infrastructure evolved over several iterations, leveraging AWS services for scalability, reliability, and cost efficiency:
- **Frontend Hosting**: The React app is built and hosted in an Amazon S3 bucket with static website hosting enabled.
- **Backend Hosting**: The backend is containerized using Docker and deployed to AWS Elastic Kubernetes Service (EKS), providing high availability with multiple nodes across availability zones.
- **Database**: SubDC uses Aurora Serverless MySQL, which dynamically scales based on demand.

### Production Environment
- **URL**: Users access SubDC via [https://subdc.co](https://subdc.co), which uses a CNAME record pointing to an AWS CloudFront distribution.
- **CloudFront**: Provides a Content Delivery Network (CDN) to cache and serve content from edge locations for faster load times.
- **Kubernetes**: Hosts backend API pods, ensuring high availability and scalability.
- **HTTPS**: Managed by AWS Certificate Manager (ACM) with an ingress resource enforcing secure HTTPS connections.

### CI/CD Pipeline
SubDC uses a robust **Continuous Integration and Continuous Deployment (CI/CD)** pipeline:
1. Triggered by a push to the `main` branch on GitHub via a Webhook.
2. **Frontend Deployment**:
   - Clones the repository and builds the React app (`npm build`).
   - Deploys the build folder to the S3 bucket.
3. **Backend Deployment**:
   - Builds a Docker container from the `Dockerfile` and pushes it to AWS Elastic Container Registry (ECR).
   - Updates the Kubernetes cluster with the new container image.
4. **Environment Variables**: Injected from AWS Secrets Manager into the Kubernetes cluster.

If any step fails, the pipeline rolls back to the last successfully running version of the application.

### Test Environment
The test environment mirrors production but with reduced compute power and a smaller database to minimize costs. It allows developers to validate new features before deploying them to production.

### Additional Components
- **Amazon Certificate Manager (ACM)**: Manages TLS certificates for secure HTTPS connections.
- **Amazon CloudFormation**: Automates infrastructure provisioning using Infrastructure as Code (IaC) practices, following GitOps standards.

## API Endpoints

### Authentication
- **`POST /api/register`**: Register a new user.
- **`POST /api/login`**: Authenticate user and initiate a session.
- **`POST /api/jwt/auth`**: Validate a user's JSON Web Token (JWT).
- **`POST /api/verify-email`**: Verify a user's email address.

### Listings
- **`GET /api/listings`**: Retrieve all listings, used for the Explore page.
- **`GET /api/listing/:id`**: Get details of a specific listing by its ID.
- **`POST /api/listing/create`**: Create a new listing with image upload support.
- **`PUT /api/listing/:id`**: Update details of a specific listing.
- **`DELETE /api/listing/:id`**: Delete a specific listing.
- **`POST /api/listing/reserve`**: Toggle reservation status for a listing.

### User Information
- **`POST /api/user/info`**: Fetch user details for the Account page.
- **`PUT /api/user/info`**: Update user details on the Account page.
- **`POST /api/user/listings`**: Retrieve all listings created by a specific user.
- **`POST /api/user/reservation`**: Retrieve reservation details for a user.

### Favorites
- **`POST /api/user/favorites`**: Retrieve all favorited listings for a user.
- **`POST /api/user/toggleFavorite`**: Add or remove a listing from the user's favorites.

### Notifications
- **`POST /api/user/notifications`**: Retrieve user notifications.
- **`PUT /api/user/notifications/remove`**: Mark a notification as hidden.
## Contributing

Feel free to contribute to this project by submitting issues or pull requests. For major changes, please open an issue to discuss what you would like to change.