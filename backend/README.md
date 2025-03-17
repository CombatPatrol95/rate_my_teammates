# Rate My Teammates Backend

This is the backend for the Rate My Teammates application, built with Spring Boot and Java 17.

## Features

- User authentication with JWT tokens
- Admin and User roles
- Teammate rating submission and approval flow
- RESTful API for frontend integration

## API Endpoints

### Authentication
- `POST /api/login` - Authenticate user and get JWT token

### Ratings
- `POST /api/user-submitted-data` - Submit a new teammate rating
- `GET /api/approved-data` - Get all approved ratings
- `GET /api/admin/pending-ratings` - (Admin only) Get pending ratings
- `PUT /api/admin/approve-rating/{id}` - (Admin only) Approve a rating
- `DELETE /api/admin/reject-rating/{id}` - (Admin only) Reject a rating

## Database

The application uses an H2 in-memory database for development. In production, it should be configured to use a persistent database.

## Getting Started

### Prerequisites
- Java 17 or higher
- Maven

### Running the application

```bash
mvn spring-boot:run
```

The application will start on http://localhost:8080/api

## Default Admin Account

For development purposes, a default admin account is created:
- Username: admin
- Password: admin123

This account should be removed or changed in production. 