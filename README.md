# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager (for local development).
- Docker - [Download & Install Docker](https://www.docker.com/get-started) (for containerized deployment).
- Docker Compose - Usually included with Docker Desktop.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

### Running with Docker (Recommended)

1. **Create `.env` file** in the project root with the following variables:

```env
# Database Configuration
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=nodejs2025Q2-service

# Application Configuration
NODE_ENV=production
PORT=4000

# Docker Configuration
APP_PORT=4000

# JWT Authentication (Required)
JWT_SECRET=your-secret-key-for-access-tokens
JWT_REFRESH_SECRET=your-secret-key-for-refresh-tokens
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Logging Configuration (Optional)
LOG_LEVEL=INFO
LOG_FILE=logs/app.log
LOG_FILE_MAX_SIZE_KB=1024
```

2. **Start all services** (PostgreSQL database and application):

```bash
docker-compose up -d
```

This will:
- Build and start the PostgreSQL database container
- Build and start the application container
- Create a user-defined bridge network (`app-network`)
- Set up volumes for database persistence and logs

3. **View logs**:

```bash
# View all logs
docker-compose logs -f

# View only application logs
docker-compose logs -f app

# View only database logs
docker-compose logs -f postgres
```

4. **Stop services**:

```bash
docker-compose down
```

5. **Stop and remove volumes** (this will delete all database data):

```bash
docker-compose down -v
```

6. **Rebuild containers** (after code changes):

```bash
docker-compose up -d --build
```

After starting the containers, you can access:
- **API Base URL**: `http://localhost:4000`
- **Swagger/OpenAPI Documentation**: `http://localhost:4000/api`

**Note**: The containers are configured to automatically restart after crashes (`restart: unless-stopped`). Database files and logs are stored in Docker volumes, so data persists between container restarts.

### Running locally (without Docker)

1. **Create `.env` file** with database configuration:

```env
# Database Configuration
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=nodejs2025Q2-service

# Application Configuration
NODE_ENV=development
PORT=4000

# JWT Authentication (Required)
JWT_SECRET=your-secret-key-for-access-tokens
JWT_REFRESH_SECRET=your-secret-key-for-refresh-tokens
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Logging Configuration (Optional)
LOG_LEVEL=INFO
LOG_FILE=logs/app.log
LOG_FILE_MAX_SIZE_KB=1024
```

2. **Make sure PostgreSQL is running** locally on port 5432.

3. **Install dependencies and start**:

```bash
npm install
npm start
```

The application will start on port 4000 by default. You can configure the port by setting the `PORT` environment variable in the `.env` file.

After starting the app, you can access:
- **API Base URL**: `http://localhost:4000`
- **Swagger/OpenAPI Documentation**: `http://localhost:4000/api`

### Swagger Documentation

The Swagger documentation provides an interactive API testing interface where you can:
- View all available endpoints with detailed descriptions
- See request/response schemas and examples
- Test API endpoints directly from the browser
- Understand data validation rules and error responses

For more information about OpenAPI/Swagger, please visit https://swagger.io/.

## Testing

**Important**: Before running tests, make sure:
1. The application is running (either via Docker or locally)
2. PostgreSQL database is accessible
3. Environment variables are set (especially `JWT_SECRET` and `JWT_REFRESH_SECRET`)

### Setting up Local Environment for Testing

To run tests locally, you need to set up PostgreSQL database and configure the application:

#### Step 1: Install and Start PostgreSQL

**On macOS (using Homebrew):**
```bash
# Install PostgreSQL (if not already installed)
brew install postgresql@17

# Start PostgreSQL service
brew services start postgresql@17

# Verify PostgreSQL is running
pg_isready -h localhost -p 5432
```

#### Step 2: Create Database and User

```bash
# Connect to PostgreSQL as superuser
psql postgres

# Create user (if not exists)
CREATE USER postgres WITH PASSWORD 'postgres' SUPERUSER;

# Create database
CREATE DATABASE "nodejs2025Q2-service";

# Grant privileges (if needed)
ALTER DATABASE "nodejs2025Q2-service" OWNER TO postgres;

# Exit psql
\q
```

#### Step 3: Configure Environment Variables

Create or update `.env` file in the project root with the following:

```env
# Database Configuration
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=nodejs2025Q2-service

# Application Configuration
NODE_ENV=development
PORT=4000

# JWT Authentication (Required for tests)
JWT_SECRET=test-secret-key
JWT_REFRESH_SECRET=test-refresh-secret-key
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Logging Configuration (Optional)
LOG_LEVEL=INFO
LOG_FILE=logs/app.log
LOG_FILE_MAX_SIZE_KB=1024
```

#### Step 4: Install Dependencies and Run Migrations

```bash
# Install npm dependencies
npm install

# Run database migrations
npm run migration:run
```

#### Step 5: Start the Application

```bash
# Start the application in development mode
npm run start:dev
```

The application should be running on `http://localhost:4000`. Verify by visiting `http://localhost:4000` in your browser or running:

```bash
curl http://localhost:4000
```

#### Step 6: Run Tests

Once the application is running, open a new terminal window and run tests:

```bash
# Run tests with authorization
npm run test:auth
```

### Running Tests

After application is running, open a new terminal and enter:

**To run all tests without authorization:**
```bash
npm run test
```

**To run only one test suite:**
```bash
npm run test -- <path to suite>
```

**To run all tests with authorization:**
```bash
npm run test:auth
```

**To run only specific test suite with authorization:**
```bash
npm run test:auth -- <path to suite>
```

**To run refresh token tests:**
```bash
npm run test:refresh
```

### Test Environment Setup

For tests to work correctly, ensure your `.env` file includes the configuration shown in Step 3 above. The most important variables for tests are:

- `JWT_SECRET` and `JWT_REFRESH_SECRET` - must be set to valid secret keys
- `POSTGRES_HOST`, `POSTGRES_PORT`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB` - database connection settings

**Note**: Make sure the database is created and migrations are applied before running tests. See Step 4 above for migration commands.

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Docker Security Scanning

To scan Docker images for vulnerabilities using Docker Scout:

```bash
npm run docker:scout
```

This will build the application image and scan it for security vulnerabilities. Docker Scout is a free solution provided by Docker for vulnerability scanning.

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

### Docker Images

- [Postgres Docker Image](https://hub.docker.com/r/almazzzur/nodejs2025q2-service-postgres)
- [Application Docker Image](https://hub.docker.com/r/almazzzur/nodejs2025q2-service-app)
