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
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=nodejs2025Q2-service
NODE_ENV=development
PORT=4000
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

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

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
