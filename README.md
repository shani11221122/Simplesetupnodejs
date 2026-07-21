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
│   ├── comment.js       # NEW — Nested comment logic
│   ├── crud.js          # User management CRUD logic
│   └── post.js          # NEW — Post CRUD + filtering + sorting + pagination
├── middleware/
│   ├── auth.js          # JWT Verification middleware
│   ├── logger.js        # Request logger (Method, URL, Response time)
│   ├── role.js          # Role-Based Access Control filters
│   ├── validate.js      # Input validation middleware
│   └── errorhandler.js  # Centralized error handling
├── models/
│   ├── comment.js       # NEW — Comment schema (text, post, author)
│   ├── post.js          # NEW — Post schema (title, content, status, author)
│   └── user.js          # Mongoose schema for User and roles
├── routes/
│   ├── crudroutes.js    # Express Router definitions
│   └── postroutes.js    # NEW — Post routes + nested comment routes
├── utils/
│   └── response.js      # Standardized success/error response helpers
├── .env                 # Port and secrets configuration
├── .gitignore           # Ignored files for VCS
├── app.js               # Express application configuration and bootstrapping
├── package.json         # Scripts, dependencies, metadata
├── seed.js              # NEW — Seeds DB with 5 users, 35 posts, 40 comments
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

## 🌱 Seeding Sample Data

To populate the database with sample data for testing pagination and filtering:

```bash
npm run seed
```

This creates:
* 5 users (`user1@example.com` is `admin`, rest are `user`) — password: `password123`
* 35 posts with random authors and random status (`draft`/`active`/`archived`)
* 40 comments with random posts and authors

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
| **POST** | `/crud/createuser` | ~~`user`~~ → **`admin`** | Create a new user record | `{ "name": "Jane", "email": "jane@example.com", "password": "pass123", "role": "user" }` |
| **GET** | `/crud/getallusers` | `user`, `admin` | Retrieve all users from DB | *None* |
| **GET** | `/crud/getuserbyid/:id` | `user`, `admin` | Fetch user details by ID | *Path Parameter: `:id`* |
| **PUT** | `/crud/updateuser/:id` | `admin` | Update user properties | `{ "name": "Jane Mod" }` (supports partial updates) |
| **DELETE** | `/crud/deleteuser/:id` | `admin` | Remove user record from DB | *Path Parameter: `:id`* |

### 📝 Post Endpoints (Authentication Required for write operations)

| Method | Endpoint | Allowed Roles | Description | Body/Params |
|---|---|---|---|---|
| POST | `/posts` | Any authenticated | Create a new post | `{ "title": "...", "content": "...", "status": "active" }` |
| GET | `/posts` | Public | Get all posts (filter/sort/paginate) | Query params below |
| GET | `/posts/:id` | Public | Get single post by ID | Path param `:id` |
| PUT | `/posts/:id` | Any authenticated | Update a post | `{ "title": "..." }` |
| DELETE | `/posts/:id` | `admin` only | Delete a post | Path param `:id` |

### 💬 Comment Endpoints (Nested under Posts)

| Method | Endpoint | Allowed Roles | Description | Body/Params |
|---|---|---|---|---|
| POST | `/posts/:postId/comments` | Any authenticated | Add comment to a post | `{ "text": "..." }` |
| GET | `/posts/:postId/comments` | Public | Get all comments for a post (paginated) | Query params below |
| DELETE | `/posts/:postId/comments/:commentId` | Any authenticated | Delete a comment | Path param `:commentId` |

### 🔍 Query Parameters (Filtering, Sorting, Pagination)

These parameters apply to `GET /posts` to filter, sort, and paginate the result set:

| Param | Example | Description |
|---|---|---|
| `status` | `?status=active` | Filter posts by status (`draft`, `active`, `archived`) |
| `sortBy` | `?sortBy=createdAt` | Field to sort by (default: `createdAt`) |
| `order` | `?order=asc` | `asc` or `desc` (default: `desc`) |
| `page` | `?page=2` | Page number (default: `1`) |
| `limit` | `?limit=10` | Records per page (default: `10`) |

**Example Combined Request:**
```http
GET /posts?status=active&sortBy=createdAt&order=desc&page=1&limit=5
```

**Example Response Shape:**
```json
{
  "success": true,
  "data": {
    "posts": [ ... ],
    "pagination": {
      "totalPosts": 23,
      "currentPage": 1,
      "totalPages": 5,
      "limit": 5
    }
  }
}
```

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

## 🔗 Data Relationships

* `User` → has many → `Post` (via `Post.author`)
* `Post` → has many → `Comment` (via `Comment.post`)
* `User` → has many → `Comment` (via `Comment.author`)

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