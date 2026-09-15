# School Registry API

A professional RESTful API for managing core school operations, including students, teachers, classes, subjects, academic sessions, enrollments, user accounts, authentication, and role-based authorization.

The project is built with a layered backend architecture designed to keep business logic, HTTP handling, validation, database access, and security concerns separated and maintainable.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Zod
- JWT
- bcrypt
- dotenv
- Nodemon

## Core Features

### Authentication

- JWT-based authentication
- Secure password hashing with bcrypt
- Login endpoint
- Protected routes
- Current authenticated user endpoint
- Account activation/deactivation
- Authentication error handling

### Authorization

The API uses role-based access control.

Current roles:

- `admin`
- `teacher`

Administrators have access to management operations, while teachers have access to permitted academic resources.

Authorization is implemented separately from authentication so that identity verification and permission checks remain independent concerns.

### Student Management

- Create students
- Retrieve students
- Retrieve an individual student
- Update students
- Delete students
- Unique admission numbers
- Guardian information
- Input validation

### Teacher Management

- Teacher records
- Employee IDs
- Contact information
- Teacher account management
- Account activation/deactivation

### Academic Sessions

- Create academic sessions
- Track session start and end dates
- Maintain an active academic session
- Prevent multiple active sessions

### Class Management

- Create classes
- Assign classes to academic sessions
- Assign class teachers
- Prevent duplicate class/session combinations

### Subject Management

- Create subjects
- Unique subject codes
- Subject descriptions

### Class-Subject Management

- Assign subjects to classes
- Assign teachers to subjects
- Mark subjects as compulsory
- Configure periods per week
- Prevent duplicate class/subject assignments

### Enrollment Management

- Enroll students into classes
- Associate enrollment with an academic session
- Prevent duplicate student enrollment within the same academic session
- Track enrollment status

Supported enrollment statuses:

```text
active
completed
withdrawn
```

## Architecture

The application follows a layered architecture:

```text
Request
   ↓
Route
   ↓
Middleware
   ↓
Controller
   ↓
Service
   ↓
Model
   ↓
MongoDB
```

### Project Structure

```text
school-api/
│
├── src/
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   │
│   ├── middlewares/
│   │
│   ├── models/
│   │
│   ├── routes/
│   │
│   ├── services/
│   │
│   ├── validators/
│   │
│   ├── utils/
│   │   ├── ApiError.js
│   │   ├── asyncHandler.js
│   │   ├── password.js
│   │   └── token.js
│   │
│   ├── app.js
│   └── server.js
│
├── scripts/
│   └── create-admin.js
│
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Why the project uses a layered architecture

The goal is to give every layer a clear responsibility.

### Routes

Routes define the HTTP endpoints and middleware pipeline.

### Controllers

Controllers handle HTTP concerns such as request data and response formatting.

### Services

Services contain business logic and database operations.

### Models

Models define MongoDB document structure and database constraints using Mongoose.

### Validators

Validators protect the application from invalid input before it reaches business logic.

### Middleware

Middleware handles cross-cutting concerns such as:

- Authentication
- Authorization
- Validation
- Error handling
- 404 handling

## API Versioning

The API is versioned under:

```text
/api/v1
```

Example:

```text
GET /api/v1/students
```

This provides a foundation for introducing future API versions without immediately breaking existing clients.

## Authentication

Authentication uses JSON Web Tokens.

After successful login, the API returns an access token.

Example:

```http
Authorization: Bearer <access-token>
```

Protected requests must include the token in the `Authorization` header.

## User Roles

### Admin

Administrators can perform management operations such as:

- Managing users
- Creating teacher accounts
- Managing students
- Managing classes
- Managing subjects
- Managing teachers
- Managing academic sessions
- Managing enrollments

### Teacher

Teachers can access permitted academic resources and authenticated user functionality.

More granular resource-level authorization can be introduced as the application grows.

## API Endpoints

### Authentication

```text
POST /api/v1/auth/login
```

### Current User

```text
GET /api/v1/users/me
```

### User Management

```text
GET   /api/v1/users
POST  /api/v1/users/teachers
PATCH /api/v1/users/:id/status
```

### Academic Sessions

```text
GET    /api/v1/academic-sessions
GET    /api/v1/academic-sessions/:id
POST   /api/v1/academic-sessions
PATCH  /api/v1/academic-sessions/:id
DELETE /api/v1/academic-sessions/:id
```

### Classes

```text
GET    /api/v1/classes
GET    /api/v1/classes/:id
POST   /api/v1/classes
PATCH  /api/v1/classes/:id
DELETE /api/v1/classes/:id
```

### Teachers

```text
GET    /api/v1/teachers
GET    /api/v1/teachers/:id
POST   /api/v1/teachers
PATCH  /api/v1/teachers/:id
DELETE /api/v1/teachers/:id
```

### Subjects

```text
GET    /api/v1/subjects
GET    /api/v1/subjects/:id
POST   /api/v1/subjects
PATCH  /api/v1/subjects/:id
DELETE /api/v1/subjects/:id
```

### Class Subjects

```text
GET    /api/v1/class-subjects
GET    /api/v1/class-subjects/:id
POST   /api/v1/class-subjects
PATCH  /api/v1/class-subjects/:id
DELETE /api/v1/class-subjects/:id
```

### Students

```text
GET    /api/v1/students
GET    /api/v1/students/:id
POST   /api/v1/students
PATCH  /api/v1/students/:id
DELETE /api/v1/students/:id
```

### Enrollments

```text
GET   /api/v1/enrollments
GET   /api/v1/enrollments/:id
POST  /api/v1/enrollments
PATCH /api/v1/enrollments/:id
```

### Health Check

```text
GET /api/v1/health
```

## Environment Variables

Create a `.env` file in the project root.

Example:

```env
NODE_ENV=development
PORT=5000

MONGODB_URI=your_mongodb_atlas_connection_string

JWT_SECRET=your_long_random_secret
JWT_EXPIRES_IN=1d

ADMIN_FIRST_NAME=System
ADMIN_LAST_NAME=Administrator
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=replace_with_a_strong_password
```

Never commit the `.env` file to Git.

The repository includes `.env.example` as a template.

## Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Enter the project directory:

```bash
cd school-api
```

Install dependencies:

```bash
npm install
```

Configure the environment variables in `.env`.

Make sure MongoDB Atlas is configured and the connection string is valid.

## Creating the First Administrator

The first administrator is created through a controlled bootstrap script rather than a public endpoint.

Run:

```bash
npm run create:admin
```

This creates the initial administrator account using the administrator environment variables.

After the initial setup, administrators can manage teacher accounts through the protected API.

## Running the Application

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

The default server runs on:

```text
http://localhost:5000
```

Health check:

```text
http://localhost:5000/api/v1/health
```

## Error Handling

The API uses centralized error handling.

Responses follow a consistent structure.

Example:

```json
{
  "success": false,
  "message": "Student not found"
}
```

Common status codes include:

```text
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
409 Conflict
500 Internal Server Error
```

## Validation

Request validation is handled with Zod before requests reach business logic.

This provides:

- Consistent validation
- Clear error messages
- Separation of validation from business logic
- Protection against malformed input

## Database Design

The application uses Mongoose schemas with constraints and indexes to enforce data integrity.

Examples include:

- Unique student admission numbers
- Unique teacher employee IDs
- Unique subject codes
- Unique academic session names
- Unique class/session combinations
- Unique class/subject combinations
- Unique student/session enrollments
- Only one active academic session

## Security Considerations

Current security mechanisms include:

- Password hashing with bcrypt
- JWT authentication
- Protected routes
- Role-based authorization
- Environment-based secrets
- Request validation
- Password hash exclusion from normal user queries
- Centralized authentication and authorization handling
- Account activation/deactivation

Additional security hardening is planned as part of the project's production-readiness work.

## Development Roadmap

### Completed

- Project foundation
- MongoDB connection
- Domain models
- REST API architecture
- CRUD operations
- Request validation
- Error handling
- Authentication
- JWT authorization foundation
- Role-based access control
- User account management foundation

### Planned

- Pagination
- Filtering
- Search
- Sorting
- Advanced authorization
- Security hardening
- Automated testing
- API documentation with OpenAPI/Swagger
- Structured logging
- Graceful shutdown
- Production configuration
- Deployment

## Project Goals

This project is designed to demonstrate practical backend engineering principles including:

- REST API design
- Clean architecture
- Separation of concerns
- Database modeling
- Authentication
- Authorization
- Input validation
- Error handling
- Security
- Maintainable code organization

## Author

**Emmanuel Ikwuagwu**

Backend Developer

GitHub:

```text
<https://github.com/DevEkpereamaka-cloud>
```
