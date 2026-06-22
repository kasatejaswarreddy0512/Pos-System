Use this as your single root-level `README.md` file for both backend and frontend.

# POS System - Full Stack Application

This is a full stack Point of Sale system built using **Spring Boot** for the backend and **React** for the frontend. The application supports store management, branch management, employee management, category and product management, inventory, orders, refunds, and cashier shift reports.

## Tech Stack

### Backend

* Java
* Spring Boot
* Spring Security
* JWT Authentication
* Spring Data JPA
* Hibernate
* MySQL
* Maven

### Frontend

* React
* JavaScript
* Material UI
* React Router
* Axios
* Yup Validation
* Vite

## Features

* User authentication and authorization
* Role-based access control
* Store creation and management
* Branch creation and management
* Employee management
* Branch Manager and Branch Cashier assignment
* Category management
* Product management
* Inventory management by branch
* Order processing
* Refund handling
* Shift start and shift end
* Shift summary and print support
* Store Admin, Branch Manager, and Cashier workflows

## User Roles

The system supports the following roles:

```text
ROLE_STORE_ADMIN
ROLE_STORE_MANAGER
ROLE_BRANCH_MANAGER
ROLE_BRANCH_CASHIER
```

Each role has different access permissions based on business requirements.

## Project Structure

```text
POS-System
├── backend
│   └── Spring Boot application
│
├── frontend
│   └── React application
│
└── README.md
```

## Backend Project Structure

```text
src/main/java/com/ktsr
├── config
├── controller
├── domain
├── entity
├── exceptions
├── mapper
├── payload
├── repository
├── service
└── service/impl
```

## Frontend Project Structure

```text
src
├── api
├── components
├── constants
├── hooks
├── pages
├── services
├── utils
└── validations
```

## Database Setup

The backend uses MySQL.

Create the database:

```sql
CREATE DATABASE possystem;
```

Update backend database configuration in `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/possystem
spring.datasource.username=root
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

## Backend Setup

Go to the backend folder:

```bash
cd backend
```

Run the Spring Boot application:

```bash
mvn spring-boot:run
```

Backend will start on:

```text
http://localhost:8081
```

Build backend:

```bash
mvn clean install
```

## Frontend Setup

Go to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create `.env` file in the frontend root folder:

```env
VITE_API_BASE_URL=http://localhost:8081
```

Run frontend:

```bash
npm run dev
```

Frontend will start on:

```text
http://localhost:5173
```

Build frontend:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Authentication

Most backend APIs require JWT authentication.

Pass token in request header:

```text
Authorization: Bearer <jwt-token>
```

## Important Backend APIs

### Authentication

```text
POST /auth/signup
POST /auth/signin
```

### Store

```text
POST /api/store
GET /api/store
GET /api/store/{id}
PUT /api/store/{id}
DELETE /api/store/{id}
```

### Branch

```text
POST /api/branch
GET /api/branch/my-store
GET /api/branch/store/{storeId}
GET /api/branch/{id}
PUT /api/branch/{id}
DELETE /api/branch/{id}
```

### Employee

```text
POST /api/employee/store/{storeId}
POST /api/employee/branch/{branchId}
GET /api/employee/my-store
GET /api/employee/store/{storeId}
GET /api/employee/branch/{branchId}
PUT /api/employee/{id}
DELETE /api/employee/{id}
```

### Category

```text
POST /api/category
GET /api/category/my-store
GET /api/category/store/{storeId}
PUT /api/category/{id}
DELETE /api/category/{id}
```

### Shift Report

```text
POST /api/shift/start
POST /api/shift/end
GET /api/shift/current
```

## Main Frontend Pages

### Store Page

Used to create and manage stores.

### Branch Page

Used by Store Admin to create and manage store branches.

For Store Admin, branches are loaded using:

```text
GET /api/branch/my-store
```

### Employee Page

Used to create and manage Store Managers, Branch Managers, and Branch Cashiers.

For Branch Manager and Branch Cashier, the admin selects a branch name from the dropdown. The selected branch name sends its `branchId` to the backend.

Example employee payload:

```json
{
  "fullName": "Ram",
  "email": "ram@gmail.com",
  "phone": "9876543210",
  "password": "123456",
  "role": "ROLE_BRANCH_MANAGER",
  "storeId": 1,
  "branchId": 1
}
```

### Category Page

Used to create and manage product categories.

For Store Admin, categories are loaded using:

```text
GET /api/category/my-store
```

### Product Page

Used to create and manage products with category selection.

### Inventory Page

Used to manage stock by product and branch.

### Orders Page

Used for billing and order processing.

### Refund Page

Used to process and manage refunds.

### Shift Summary Page

Used by cashier to start shift, end shift, view sales summary, and print shift report.

## Important Business Rules

* Store Admin can manage only their own store data.
* Store Admin can create branches for their store.
* Store Admin can create Branch Managers and Branch Cashiers.
* Branch Manager must be assigned to a valid branch.
* Branch Cashier must also be assigned to a valid branch.
* Branch Manager updates both `user.branch_id` and `branch.manager_id`.
* Branch Cashier updates only `user.branch_id`.
* Frontend should not use hardcoded store IDs.
* For Store Admin pages, use `/my-store` APIs wherever backend can identify the store from the logged-in JWT user.

## Environment Variables

Frontend `.env`:

```env
VITE_API_BASE_URL=http://localhost:8081
```

Do not push `.env` files to GitHub.

Add this to `.gitignore`:

```text
.env
frontend/.env
```

## Git Commands

Check status:

```bash
git status
```

Add changes:

```bash
git add .
```

Commit changes:

```bash
git commit -m "Update POS system"
```

Push changes:

```bash
git push origin main
```

## Run Complete Application

Start backend first:

```bash
cd backend
mvn spring-boot:run
```

Start frontend:

```bash
cd frontend
npm install
npm run dev
```

Open frontend in browser:

```text
http://localhost:5173
```

## Author

POS System developed as part of a Java Full Stack project.
