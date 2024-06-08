# SYMBOL CHALLENGE

## Introduction

This code solve a code challenge

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

## Database setup

This project uses MySQL. You can use Docker to quickly set up a MySQL instance.

1. Stop and remove any running containers:

```bash
docker-compose down
```

2. Remove any existing Docker volumes to ensure a clean setup:

```bash
docker volume rm $(docker volume ls -q)
```

3. Start the MySQL container:

```bash
docker-compose up -d
```

4. Access the MySQL instance:

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

### API Endpoints

Get Stock

- URL: /api/stock
- Method: GET
- Description: Retrieve name symbol and current price.

```plaintext
    GET http://localhost:3000/api/stock
```

Get Logs

- URL: /api/logs
- Method: GET
- Description: Retrieve all logs from the database.

```plaintext
    GET http://localhost:3000/api/logs
```

## Troubleshooting

If you encounter any issues, make sure to check the following:

- Ensure that Docker is running and the MySQL container is up.
- Verify the environment variables are correctly set.
- Check the application logs for any errors.