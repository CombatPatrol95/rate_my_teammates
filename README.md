# Rate My Teammates

A web application for students to rate their teammates' participation in group projects.

## Project Structure

This project is organized into two main components:

### Frontend (React.js)

The frontend is built with React.js and includes:
- User interface for submitting teammate ratings
- Public board to view approved ratings
- Admin dashboard for managing rating submissions
- Authentication for admin users

Technologies used:
- React 18
- React Router 6
- Bootstrap 5
- Axios for API integration

### Backend (Spring Boot)

The backend is built with Spring Boot and provides:
- RESTful API endpoints
- JWT-based authentication
- Data persistence using JPA
- Business logic for the application

Technologies used:
- Java 17
- Spring Boot 3
- Spring Security with JWT
- Spring Data JPA
- H2 Database (for development)

## Getting Started

### Prerequisites
- Node.js and npm (for frontend)
- Java 17 or higher (for backend)
- Maven (for backend)

### Running the Frontend
```bash
cd frontend
npm install
npm start
```

The frontend will be available at http://localhost:3000

### Running the Backend
```bash
cd backend
mvn spring-boot:run
```

The backend API will be available at http://localhost:8080/api

## Default Admin Account
For development purposes, a default admin account is created:
- Username: admin
- Password: admin123
