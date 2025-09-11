Live Link : https://pixienestbuildwell.com


#Contributors: 
Front end: Ashutosh sharan srivastava
Back end: Abhijeet yadav

# Real Estate Marketplace

This is a full-stack web application for a real estate marketplace. It allows users to browse property listings, inquire about properties, and for administrators to manage the platform. The project is built with a Node.js backend and a React frontend.

## Features

*   **User Authentication**: Secure user registration and login with JWT.
*   **Property Listings**: View all properties with details, including images, price, and location.
*   **Search and Filter**: Search for properties based on keywords and filter by various criteria.
*   **Enquiry System**: Users can make inquiries about properties they are interested in.
*   **Admin Dashboard**: A dedicated dashboard for administrators to manage users, properties, and inquiries.
*   **Broker Dashboard**: A dashboard for brokers to manage their properties and view inquiries.
*   **Responsive Design**: The application is designed to work on various devices and screen sizes.

## Tech Stack

**Backend:**

*   **Node.js**: JavaScript runtime for the server.
*   **Express.js**: Web framework for Node.js.
*   **MongoDB**: NoSQL database for storing data.
*   **Mongoose**: ODM for MongoDB.
*   **JWT**: For user authentication.
*   **Bcryptjs**: For password hashing.
*   **Multer**: For handling file uploads.
*   **Nodemailer**: For sending emails.

**Frontend:**

*   **React**: JavaScript library for building user interfaces.
*   **Vite**: Frontend build tool.
*   **React Router**: For routing in the React application.
*   **Zustand**: State management library.
*   **Axios**: For making HTTP requests to the backend.
*   **Tailwind CSS**: Utility-first CSS framework for styling.
*   **Framer Motion**: For animations.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js and npm
*   MongoDB

### Backend Setup

1.  Navigate to the `api` directory:
    ```sh
    cd api
    ```
2.  Install NPM packages:
    ```sh
    npm install
    ```
3.  Create a `.env` file in the `api` directory and add the following variables:
    ```
    PORT=5000
    MONGO_URI=<your_mongodb_connection_string>
    NODE_ENV=development
    JWT_SECRET=<your_jwt_secret>
    EMAIL_HOST=<your_email_host>
    EMAIL_PORT=<your_email_port>
    EMAIL_USER=<your_email_user>
    EMAIL_PASS=<your_email_password>
    EMAIL_FROM=<your_email_from>
    FRONTEND_URL=http://localhost:3000
    ```
4.  Start the backend server:
    ```sh
    npm start
    ```

### Frontend Setup

1.  Navigate to the `my-app` directory:
    ```sh
    cd my-app
    ```
2.  Install NPM packages:
    ```sh
    npm install
    ```
3.  Create a `.env` file in the `my-app` directory and add the following variable:
    ```
    VITE_BASE_URL=http://localhost:5000/api
    ```
4.  Start the frontend development server:
    ```sh
    npm run dev
    ```

## API Endpoints

The backend API provides the following endpoints:

*   `POST /api/auth/register`: Register a new user.
*   `POST /api/auth/login`: Log in a user.
*   `GET /api/properties`: Get all properties.
*   `GET /api/properties/:id`: Get a single property by ID.
*   `POST /api/properties`: Create a new property (admin/broker only).
*   `PUT /api/properties/:id`: Update a property (admin/broker only).
*   `DELETE /api/properties/:id`: Delete a property (admin/broker only).
*   `GET /api/users`: Get all users (admin only).
*   `DELETE /api/users/:id`: Delete a user (admin only).
*   `POST /api/enquiries`: Create a new enquiry.
*   `GET /api/enquiries`: Get all enquiries (admin only).
*   `POST /api/contact`: Submit a contact form.
*   `POST /api/broker-applications`: Apply to become a broker.
*   `GET /api/broker-applications`: Get all broker applications (admin only).
*   `GET /api/brokers/properties`: Get properties for the logged-in broker.

## Project Structure

The project is organized into two main directories: `api` for the backend and `my-app` for the frontend.

### Backend (`api`)

```
/api
|-- config/
|   `-- db.js           # MongoDB connection configuration
|-- controllers/        # Request handlers for routes
|-- data/               # Seed data
|-- middleware/         # Custom middleware (auth, error handling, etc.)
|-- models/             # Mongoose models for database collections
|-- node_modules/       # Node.js dependencies
|-- routes/             # API route definitions
|-- uploads/            # Directory for uploaded files
|-- utils/              # Utility functions
|-- .env                # Environment variables
|-- package.json        # Project metadata and dependencies
`-- server.js           # Main entry point for the backend server
```

### Frontend (`my-app`)

```
/my-app
|-- public/             # Static assets
|-- src/
|   |-- api/            # Functions for making API calls to the backend
|   |-- assets/         # Images, fonts, and other assets
|   |-- components/     # Reusable React components
|   |-- data/           # Frontend-specific data
|   |-- hooks/          # Custom React hooks
|   |-- pages/          # Page components corresponding to routes
|   |-- store/          # State management (Zustand)
|   |-- styles/         # CSS and styling files
|   |-- App.jsx         # Main application component with routing
|   |-- index.css       # Global CSS styles
|   `-- main.jsx        # Entry point for the React application
|-- .env                # Environment variables for the frontend
|-- index.html          # Main HTML file
|-- package.json        # Project metadata and dependencies
`-- vite.config.js      # Vite configuration
```
