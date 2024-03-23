
## README
# Introduction
 - This is a RESTful API built using TypeScript, NestJS framework, MongoDB, and RabbitMQ. The API provides endpoints for user management, fetching user data from an external API, and handling user avatars.

# Prerequisites
- TypeScript 3.4 and above
- NestJS Framework (refer to NestJS Documentation)
- MongoDB 4.4 and above
- RabbitMQ 3.7 and above
- Installation
- Clone the repository:

# Unzip the file

# Install dependencies:


1. cd <project_folder>
2. npm install
# Configuration
 - Make sure you have MongoDB and RabbitMQ running on your local machine or provide appropriate connection strings in the configuration file (config.env).

## Usage

# Endpoints
1. POST /api/users

   - Description: Create a new user entry in the database.
   - Upon creation, send a dummy email and RabbitMQ event.
   - No consumer is needed for email and RabbitMQ events.
   - GET /api/user/{userId}

* Description: Retrieve user data from an external API (https://reqres.in/api/users/{userId}) and return it in JSON representation.

2. GET /api/user/{userId}

Retrieves data from https://reqres.in/api/users/{userId} and returns a user in JSON representation.

3. GET /api/user/{userId}/avatar

* Description: Retrieve user avatar.
* On the first request, save the image as a plain file stored in MongoDB with user ID and hash. Return its base64-encoded representation.
* On subsequent requests, return the previously saved file in base64-encoded representation retrieved from the database.

4. DELETE /api/user/{userId}/avatar

* Description: Remove the user avatar file from the file system storage and remove the stored entry from the database.

# Running the Application
- To run the application, execute the following command:

   * npm run start

- The application will start on the configured port (default: 3000).

## Testing

   * npx jest

# Contributing
Contributions are welcome! Please feel free to submit issues and pull requests.
## License

Nest is [MIT licensed](LICENSE).

That's it! You're now ready to start using and exploring our NestJS application. If you have any questions or encounter any issues, please don't hesitate to reach out to us.

Happy coding! 🚀