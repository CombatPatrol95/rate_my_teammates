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

### H2 Database (Development)

H2 is configured by default for local development. It provides an in-memory database that is automatically created when the application starts. You can access the H2 console at http://localhost:8080/api/h2-console.

### PostgreSQL (Production)

For production, the application should be configured to use PostgreSQL:

#### PostgreSQL Setup

1. Install PostgreSQL on your server or use a cloud-based PostgreSQL service
2. Create a new database:
   ```sql
   CREATE DATABASE ratemyteammates;
   ```
3. Create a user with appropriate privileges:
   ```sql
   CREATE USER ratemyteammatesuser WITH ENCRYPTED PASSWORD 'your_secure_password';
   GRANT ALL PRIVILEGES ON DATABASE ratemyteammates TO ratemyteammatesuser;
   ```

#### Using the Database Initialization Scripts

For convenience, database initialization scripts are provided in the `scripts` directory:

- On Linux/Mac:
  ```bash
  cd backend/scripts
  chmod +x initialize-postgres.sh
  ./initialize-postgres.sh
  ```

- On Windows:
  ```bash
  cd backend\scripts
  initialize-postgres.bat
  ```

These scripts will:
1. Create the database and user
2. Initialize the schema
3. Optionally seed the database with sample data

Note: You may need to modify the default values in the scripts to match your environment.

#### Application Configuration

1. Set the active profile to 'prod' when deploying to production:
   ```
   -Dspring.profiles.active=prod
   ```

2. Configure environment variables for database connection:
   ```
   DB_HOST=your-database-host
   DB_PORT=5432
   DB_NAME=ratemyteammates
   DB_USERNAME=ratemyteammatesuser
   DB_PASSWORD=your_secure_password
   JWT_SECRET=your_secure_jwt_secret_key
   ```

3. Initialize the database schema:
   - For first-time setup, set `spring.sql.init.mode=always` to run the schema.sql script
   - After the schema is created, change back to `spring.sql.init.mode=never`

#### Database Schema Migration

When moving from H2 to PostgreSQL:

1. The schema.sql script in src/main/resources provides the table definitions
2. The data.sql script contains sample data that can be used to seed the database
3. For production, consider using a proper migration tool like Flyway or Liquibase

#### Sample Data Initialization

To initialize the database with sample data for testing or development:

1. Use the data.sql script in src/main/resources
2. Set `spring.sql.init.mode=always` temporarily to run the script
3. Change back to `spring.sql.init.mode=never` after initialization

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