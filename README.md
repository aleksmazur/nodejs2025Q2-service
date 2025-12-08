# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

The application will start on port 4000 by default. You can configure the port by setting the `PORT` environment variable in the `.env` file:

```
PORT=4000
```

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

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
