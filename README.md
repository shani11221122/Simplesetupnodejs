# 🚀 Express & Mongoose RBAC CRUD API

A modern, lightweight REST API server built with **Express.js**, integrated with **MongoDB (via Mongoose)**, featuring custom **JWT Authentication**, **Role-Based Access Control (RBAC)**, input validation, centralized error handling, custom query logging middleware, and fully configured for serverless deployment on **Vercel**.

---

## ⚡ Tech Stack

*   **Runtime:** [Node.js](https://nodejs.org/) (ES Modules)
*   **Web Framework:** [Express.js](https://expressjs.com/) (Next-generation Routing)
*   **Database ODM:** [Mongoose](https://mongoosejs.com/) (MongoDB Schema Validation)
*   **Security:** [JSON Web Tokens (JWT)](https://jwt.io/) & [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)
*   **Hosting:** [Vercel](https://vercel.com/) (Serverless Ready)

---

## 📁 Directory Structure Breakdown

```text
Firstweek/
├── controllers/
│   ├── auth.js          # Authentication business logic (Register & Login)
│   └── crud.js          # User management CRUD logic
├── middleware/
│   ├── auth.js          # JWT Verification middleware
│   ├── logger.js        # Request logger (Method, URL, Response time)
│   ├── role.js          # Role-Based Access Control filters
│   ├── validate.js      # Input validation middleware
│   └── errorhandler.js  # Centralized error handling
├── models/
│   └── user.js          # Mongoose schema for User and roles
├── routes/
│   └── crudroutes.js    # Express Router definitions
├── utils/
│   └── response.js      # Standardized success/error response helpers
├── .env                 # Port and secrets configuration
├── .gitignore           # Ignored files for VCS
├── app.js               # Express application configuration and bootstrapping
├── package.json         # Scripts, dependencies, metadata
└── vercel.json          # Deployment parameters for Vercel functions
```

---

## 🛠️ Step-by-Step Installation & Local Setup

### 1. Pre-requisites
Make sure you have [Node.js](https://nodejs.org/) (v18+) and [MongoDB](https://www.mongodb.com/) installed locally.

### 2. Install Dependencies
Clone the repository, navigate to the project directory, and execute:
```bash
npm install
```

### 3. Environment Setup
Create a new file named `.env` in the root of the project:
```env
PORT=3000
JWT_SECRET=your_super_secret_jwt_key
# Recommended database connection variable (Required if connecting to MongoDB)
MONGODB_URI=mongodb://localhost:27017/firstweek
```

### 4. Running the Project
*   **Start server in development mode (with Hot Reloading via Nodemon):**
    ```bash
    npm run dev
    ```
*   **Start server in production mode:**
    ```bash
    npm start
    ```

---

## 🔌 API Documentation & Route Reference

All routes except authentication endpoints require a JWT token passed in the `Authorization` header:

```http
Authorization: Bearer <your_jwt_token>
```

### 🔐 Authentication Endpoints

| Method | Endpoint | Description | Request Body Payload |
|---|---|---|---|
| POST | `/crud/register` | Register a new user account | `{ "name": "John Doe", "email": "john@example.com", "password": "password123" }` |
| POST | `/crud/login` | Login to retrieve JWT Token | `{ "email": "john@example.com", "password": "password123" }` |

### 👤 User Operations (Authentication Required)

| Method | Endpoint | Allowed Roles | Description | Request Parameters & Body |
|---|---|---|---|---|
| **POST** | `/crud/createuser` | `user` | Create a new user record | `{ "name": "Jane", "email": "jane@example.com", "password": "pass123", "role": "user" }` |
| **GET** | `/crud/getallusers` | `user`, `admin` | Retrieve all users from DB | *None* |
| **GET** | `/crud/getuserbyid/:id` | `user`, `admin` | Fetch user details by ID | *Path Parameter: `:id`* |
| **PUT** | `/crud/updateuser/:id` | `admin` | Update user properties | `{ "name": "Jane Mod" }` (supports partial updates) |
| **DELETE** | `/crud/deleteuser/:id` | `admin` | Remove user record from DB | *Path Parameter: `:id`* |

---

##  Standard Response Format

Every response from this API follows one consistent shape, so the client always knows what to expect.

**Success:**
```json
{
  "success": true,
  "data": { "_id": "...", "name": "Jane", "email": "jane@example.com", "role": "user" }
}
```

**Error:**
```json
{
  "success": false,
  "error": "A valid email is required"
}
```

---

## 🛡️ Input Validation & Error Handling

This API validates every incoming request and never crashes or leaks internal stack traces to the client. Below are **5 example bad requests** and their expected error responses.

### 1. Missing / Invalid Required Fields (Register)

**Request:**
```http
POST /crud/register
Content-Type: application/json

{ "email": "test@example.com" }
```

**Response — `400 Bad Request`:**
```json
{
  "success": false,
  "error": "Name must be a string with at least 2 characters"
}
```

### 2. Invalid Email Format

**Request:**
```http
POST /crud/register
Content-Type: application/json

{ "name": "John Doe", "email": "not-an-email", "password": "password123" }
```

**Response — `400 Bad Request`:**
```json
{
  "success": false,
  "error": "A valid email is required"
}
```

### 3. Password Too Short

**Request:**
```http
POST /crud/register
Content-Type: application/json

{ "name": "John Doe", "email": "john@example.com", "password": "123" }
```

**Response — `400 Bad Request`:**
```json
{
  "success": false,
  "error": "Password must be at least 6 characters"
}
```

### 4. Duplicate Email (Unique Constraint)

**Request:**
```http
POST /crud/register
Content-Type: application/json

{ "name": "John Doe", "email": "john@example.com", "password": "password123" }
```
*(where `john@example.com` already exists in the database)*

**Response — `400 Bad Request`:**
```json
{
  "success": false,
  "error": "User already exists"
}
```

### 5. Invalid MongoDB ObjectId

**Request:**
```http
GET /crud/getuserbyid/abc123
Authorization: Bearer <valid_token>
```

**Response — `400 Bad Request`:**
```json
{
  "success": false,
  "error": "Invalid _id: abc123"
}
```

### 6. Malformed JSON Body

**Request:**
```http
POST /crud/login
Content-Type: application/json

{ "email": "john@example.com", "password": }
```

**Response — `400 Bad Request`:**
```json
{
  "success": false,
  "error": "Malformed JSON in request body"
}
```

### 7. Invalid Role Value on Update

**Request:**
```http
PUT /crud/updateuser/650f1a2b3c4d5e6f7a8b9c0d
Authorization: Bearer <valid_admin_token>
Content-Type: application/json

{ "role": "superadmin" }
```

**Response — `400 Bad Request`:**
```json
{
  "success": false,
  "error": "`superadmin` is not a valid enum value for path `role`."
}
```

---

## ⚙️ Middleware Overview

### 📝 Performance Logger
`middleware/logger.js` hooks into the Express response pipeline using `res.on('finish')` to calculate the turnaround time for each route processing operation in milliseconds:
```text
GET /crud/getallusers - 4ms
```

### 🛡️ Authentication Shield
`middleware/auth.js` intercepts incoming protected resources, extracts the signature from the `Bearer` scheme under the authorization header, and verifies its token.

### 🔑 Authorization Guard
`middleware/role.js` processes token payloads and filters request routing, verifying if the user has an allowed role (e.g., `user` or `admin`) before serving private endpoints.

### 🧪 Input Validator
`middleware/validate.js` checks incoming request bodies for required fields, correct types, and length limits (e.g., password minimum length, valid email format) **before** the request reaches the controller.

### 🚨 Centralized Error Handler
`middleware/errorhandler.js` is the single place where every error in the app ends up (via `next(error)`). It maps Mongoose `CastError`, `ValidationError`, MongoDB duplicate-key errors, and malformed JSON into clean, consistent, client-safe responses — and never leaks stack traces.

---

## ☁️ Deploying to Vercel

The repository holds a `vercel.json` routing configuration that encapsulates the Express execution scope within serverless handlers.

1.  **Global CLI Install:**
    ```bash
    npm i -g vercel
    ```
2.  **Login & Deploy:**
    ```bash
    vercel
    ```
3.  **Deploy to Production:**
    ```bash
    vercel --prod
    ```