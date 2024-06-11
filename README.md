# SYMBOL CHALLENGE

## Introduction

This project provides a backend service for fetching stock prices from different providers and logging them in a MySQL database. I improved the service by giving it a better structure in general, I also added the names of the providers to use on the switch, I even used interfaces to manipulate the responses of the providers and also as an extra detail I used Docker for easy configuration and deployment of the database.

# IMPORTANT!
First at all you need to create one user to get log in and use /stock and /logs endpoints, more information about /create-user and /login endpoints below

## NEW FEATURES:

- Added jwt token to use it on /stock and /logs routes
- Added two new post routes: /create-user and /login
- Added new user table (using init.sql script) and relationated with logs.
- Added Postman environment!

I included the postman file to quickly make requests once the service is up.

## Prerequisites

Make sure you have the following installed:

- Docker
- Docker Compose
- Node.js
- npm

## Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/vcomero/symbols-backend.git
cd symbols-backend
npm install
```

## Database Setup

This project uses MySQL. You can use Docker to quickly set up a MySQL instance.

### Using Docker

1. **Stop and remove any running containers:**

   ```bash
   docker-compose down
   ```

2. **Identify the volume name:**

   List all Docker volumes to find the correct one:

   ```bash
   docker volume ls
   ```

3. **Remove the specific Docker volume:**

   Replace `<volume_name>` with the actual name of the volume used by your project. For example, if your volume is named `symbols-backend_db_data`, you would use:

   ```bash
   docker volume rm symbols-backend_db_data
   ```

4. **Start the MySQL container:**

   ```bash
   docker-compose up -d
   ```

5. **Access the MySQL instance:**

   ```bash
   docker exec -it db mysql -ubasic_user -pbasic_password blend_long_challenge
   ```

## Environment Variables

Make sure to set the following environment variables in a .env file in the root directory of your project:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=basic_user
DB_PASSWORD=basic_password
DB_NAME=blend_long_challenge
JWT_SECRET=my_jwt_secret
```

## Building the Project

Compile the TypeScript project to JavaScript:

```bash
npm run build
```

## Running the Project

Start the server:

```bash
npm start
```

## Development Mode

For development with hot reloading:

```bash
npm run dev
```

## Authentication Endpoints

### User Registration

- URL: /api/create-user
- Metho: POST
- Body:

```json
{
  "name": "Monkey D Luffy",
  "email": "thounsandsunny@ship.com",
  "password": "123456"
}
```

- Description: This endpoint allows the registration of a new user. The request body must include the user's name, email, and password.

### User Login

- URL: /api/login
- Method: POST
- Request Body:
```json
{
  "email": "thounsandsunny@ship.com",
  "password": "123456"
}
```
- Description: This endpoint allows users to log in. The request body must include the user's email and password.

### API Endpoints

Get Stock

- URL: /api/stock
- Method: GET
- Query Parameters:
  - symbol (string): The stock symbol to fetch.
  - provider (string): The provider to fetch the stock price from (e.g., "polygon").
- Description: Fetches the stock price for the given symbol from the specified provider and logs it in the database.

```plaintext
    GET http://localhost:3000/api/stock
```

Get Logs

- URL: /api/logs
- Method: GET
- Query Parameters:
  - limit (number): The number of logs to retrieve.
- Description: Retrieves logs from the database.

```plaintext
    GET http://localhost:3000/api/logs
```

## Troubleshooting

If you encounter any issues, make sure to check the following:

- Ensure that Docker is running and the MySQL container is up.
- Verify the environment variables are correctly set.
- Check the application logs for any errors.

## Contact

For any questions or issues, please contact vcoromero@gmail.com or create an issue in the repository.
