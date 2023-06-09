# Simple JWT Implementation with Node, Express, Mongoose, and EJS

This repository contains a simple implementation of JSON Web Tokens (JWT) authentication using Node.js, Express.js, Mongoose, and EJS (Embedded JavaScript). The application demonstrates how to integrate JWT for user authentication and authorization in a web application.

## Features
- **User Registration**: Allows users to register with their email and password, which are securely stored in the database.
- **User Login**: Provides a login functionality that verifies the user's credentials and generates a JWT upon successful authentication.
- **Protected Routes**: Implements middleware to protect certain routes that require authentication, ensuring only authorized users can access them.
- **Token Validation**: Validates and verifies the JWT for each protected request, ensuring the user's authentication and authorization.
- **EJS Templating**: Utilizes EJS templates to render dynamic content and display user-specific data in the views.

## Usage
1. Clone the repository using the following command:
2. Install the necessary dependencies by running the following command in the project directory: 
    npm install
4. Set up a local MongoDB database or configure the connection to an existing MongoDB database by updating the database connection settings in the appropriate configuration file.

4. Start the Node.js server by running the following command: 
    nodemon run dev
6. Access the application in a web browser using the provided URL (e.g., http://localhost:3000).

6. Register a new user account and log in to explore the protected routes.

## Contributing
Contributions to this project are welcome! If you have suggestions for improvements, additional features, or bug fixes, please feel free to open an issue or submit a pull request.

## License
This project is licensed under the [MIT License](LICENSE).

