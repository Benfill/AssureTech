# AssureTech - Insurance Management System

## Project Overview
AssureTech is a modern, full-stack insurance management system that allows for complete management of clients and their insurance policies (auto, home, health) through intuitive user interfaces supported by REST APIs.

The system is built using a microservices architecture with a ReactJS frontend and Spring-based backend services.

## Architecture

### Backend Microservices
- **customer-service**: Client management
- **policy-service**: Insurance contract and claims management
- **gateway-service**: Single entry point API (Spring Cloud Gateway)
- **discovery-service**: Service discovery (Eureka)
- **config-service**: Centralized configuration
- **auth-service**: Authentication and user management (JWT)

### Frontend
- Single Page Application built with React.js
- Routing with React Router
- API integration with Axios

## Key Domain Models

### Customer Service
- **Client**: id, firstName, lastName, email, address, phone, userId

### Policy Service
- **Policy**: id, type (AUTO/HOME/HEALTH), effectiveDate, expirationDate, coverageAmount, clientId
- **Claim**: id, date, description, claimedAmount, reimbursedAmount, policyId

### Auth Service
- **User**: id, login, password, active, role
- **Role**: name (ADMIN, CLIENT)

## Features

### Customer Service
- Add a client
- List all clients
- Search client by ID
- Relational database

### Policy Service
- Create insurance policy
- File a claim
- View policy details
- List policies by client
- List claims by policy
- Relational database
- Communication with customer-service via OpenFeign

### Auth Service
- User registration
- Authentication (login/logout)
- JWT token management
- Role and permission management
- Relational or NoSQL database

### Frontend Features
- Client management
- Insurance policy management
- Claim filing and tracking
- Input forms with validation and error display
- User authentication and session management

## Technologies

### Backend
- Spring Boot
- Spring Data JPA
- Spring Cloud (Eureka, Config, Gateway)
- Spring Security with JWT
- OpenFeign for inter-service communication
- Docker
- Unit tests
- Layered architecture with design patterns (Repository, DTO, etc.)

### Frontend
- React.js
- React Router
- Axios
- Form validation
- UI Framework (Material-UI, Styled-components, or alternative)

## Project Links
- JIRA: [https://benfill.atlassian.net/jira/software/projects/AS/](https://benfill.atlassian.net/jira/software/projects/AS/)
- GitHub: [https://github.com/Benfill/AssureTech](https://github.com/Benfill/AssureTech)

## Getting Started

### Prerequisites
- Java 17+
- Node.js and npm
- Docker and Docker Compose
- Maven or Gradle

### Setup and Installation
1. Clone the repository:
   ```
   git clone https://github.com/Benfill/AssureTech.git
   cd AssureTech
   ```

2. Start the backend services:
   ```
   # Start services in order
   # 1. Config service
   cd config-service
   ./mvnw spring-boot:run

   # 2. Discovery service
   cd ../discovery-service
   ./mvnw spring-boot:run

   # 3. Auth service
   cd ../auth-service
   ./mvnw spring-boot:run

   # 4. Customer service
   cd ../customer-service
   ./mvnw spring-boot:run

   # 5. Policy service
   cd ../policy-service
   ./mvnw spring-boot:run

   # 6. Gateway service
   cd ../gateway-service
   ./mvnw spring-boot:run
   ```

   Alternatively, with Docker Compose:
   ```
   docker-compose up
   ```

3. Start the frontend application:
   ```
   cd frontend
   npm install
   npm start
   ```

### API Access
- Gateway API: http://localhost:8080
- Eureka Dashboard: http://localhost:8761
- Individual service endpoints can be accessed through the gateway

## Development Guidelines

### Backend Development
- Follow standard Spring Boot application structure
- Implement proper validation for all input data
- Use DTO pattern for data transfer between layers
- Document APIs using Swagger/OpenAPI
- Write unit tests for services and controllers

### Frontend Development
- Use functional components with hooks
- Implement proper form validation
- Use context API or Redux for state management
- Create reusable components
- Implement responsive design

## API Documentation
API documentation is available through Swagger UI after starting the services:
- Gateway Swagger UI: http://localhost:8080/swagger-ui.html

## License
This project is proprietary and confidential.
