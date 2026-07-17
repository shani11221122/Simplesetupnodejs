# Express CRUD API Server

A modern, light-weight Express.js RESTful API application implementing complete CRUD operations, user management with in-memory persistence, and a custom response-time logger middleware. This project is configured to run locally or deploy seamlessly as serverless functions on [Vercel](https://vercel.com).

---

## 🚀 Features

*   **RESTful CRUD Operations**: Create, read, update, and delete mock user data.
*   **Custom Middleware Logger**: Automatically monitors incoming HTTP method, URL, and tracks request-to-response duration in milliseconds.
*   **Zero-Downtime Health Check**: Simple, scalable `/` index response for monitoring and uptime analysis.
*   **Vercel Integration**: Ready-to-go `vercel.json` config routes request traffic to the Express app context wrapper.

---

## 📁 Directory Structure

```text
Firstweek/
├── controllers/
│   └── crud.js           # User business logic (CRUD handlers)
├── middleware/
│   └── logger.js         # Custom response-time profiling middleware
├── routes/
│   └── crudroutes.js     # User routing and route mappings
├── .env                  # Local environment configuration variables
├── .gitignore            # Version control exclusions
├── app.js                # Core entrypoint, app instantiation & exports
├── package.json          # Dependency mappings, commands & script definitions
└── vercel.json           # Vercel Serverless routing config
```

---

## 🛠️ Getting Started & Local Setup

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org) (v18+ recommended) installed on your system.

### 2. Installation
Clone the repository and install all npm dependencies:
```bash
npm install
```

### 3. Environment Allocation
Create a `.env` file in the root directory:
```env
PORT=3000
```

### 4. Running the Server
Choose a script command depending on your local context:
*   **Production / Standard Run**:
    ```bash
    npm start
    ```
*   **Developer Live Reload Mode**:
    ```bash
    npm run dev
    ```

The application will start and output its state link (e.g., `http://localhost:3000`).

---

## 🔌 API Documentation

### 💻 Base Endpoint & Health Check
*   **Endpoint**: `GET /`
*   **Response**: `200 OK`
*   **Format**:
    ```json
    { "status": "OK" }
    ```

### 👤 User CRUD Endpoints
All user management routes are nested under the `/crud` namespace:

| Method | Endpoint | Description | Request Body Parameters |
|:---|:---|:---|:---|
| **POST** | `/crud/createuser` | Register a new user | `{ "name": "Name", "email": "user@example.com", "password": "securepassword" }` |
| **GET** | `/crud/getallusers` | Retrieve list of all users | *None* |
| **GET** | `/crud/getuserbyid/:id` | Fetch details of a user by ID | *Path parameter: `:id`* |
| **PUT** | `/crud/updateuser/:id` | Update properties of an existing user | `{ "name": "New Name", "email": "newemail@example.com", "password": "newpassword" }` (All optional) |
| **DELETE** | `/crud/deleteuser/:id` | Delete user record from store | *Path Parameter: `:id`* |

---

## ☁️ Deployment on Vercel

This app includes a native configuration file (`vercel.json`) that directs all incoming requests to our unified Express router wrapper inside `app.js`.

### Single-Command CLI Deployment:
1. Ensure the [Vercel CLI](https://vercel.com/cli) is installed nationally:
   ```bash
   npm i -g vercel
   ```
2. Log in and deploy with a simple keystroke inside the workspace:
   ```bash
   vercel
   ```
3. After confirming settings, deploy to production:
   ```bash
   vercel --prod
   ```

### Dashboard Git Integration:
1. Push this project to GitHub/GitLab/Bitbucket.
2. Visit your [Vercel Dashboard](https://vercel.com) and click **"New Project"**.
3. Import the repository and leave the framework configuration as **Other** (Vercel automatically parses `vercel.json`).
4. (Optional) Provide the environment variables such as `PORT` under the Environment Variables toggle.
5. Click **"Deploy"**. Enjoy your production deployment!
