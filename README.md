# EatStreet

EatStreet is a full-stack food ordering application.  It contains three main packages:

- **backend** – Express REST API with MongoDB. Handles user authentication, orders, and food management.
- **frontend** – Customer facing React application built with Vite. Allows browsing the menu and placing orders.
- **admin** – Admin dashboard (also React) for managing menu items and viewing orders.

### Project Structure

```
./backend   Node.js/Express server
./frontend  Client application
./admin     Admin portal
```

The repository also contains image assets used by the client and admin in `food del assets`.

### Getting Started

1. Install dependencies for each package:

```bash
cd backend && npm install
cd ../frontend && npm install
cd ../admin && npm install
```

2. Configure environment variables for the backend (create `.env` in `backend/`):

```
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<secret-key>
```

3. Launch the development servers in separate terminals:

```bash
# start API
cd backend && npm run server

# start frontend
cd frontend && npm run dev

# start admin portal
cd admin && npm run dev
```

Both the frontend and admin apps will connect to the API running on port `4000` by default.

### Features

- User registration and login with JWT authentication
- Browse menu items and add them to a cart
- Place orders and check past orders
- Admin panel to add/remove menu items and update order status

This repository provides a simple template for experimenting with a MERN‑based food delivery system.

## Detailed Overview

### Backend (Express + MongoDB)
The backend lives in `backend/` and exposes REST endpoints on port `4000`.
Key files and folders:

- `server.js` – starts the Express server and registers the routes.
- `config/db.js` – connects to MongoDB using `MONGODB_URI`.
- `routes/` – route definitions for food, users, carts and orders.
- `controllers/` – request handlers implementing business logic.
- `models/` – Mongoose schemas for users, orders and food items.
- `middleware/auth.js` – JWT authentication middleware.
- `uploads/` – stores food images uploaded by the admin.

The backend requires a `.env` file with `MONGODB_URI` and `JWT_SECRET` values.

### Frontend (React + Vite)
Located in `frontend/`, this app allows customers to browse the menu and place orders. Development runs on port `5173` and communicates with the API at `http://localhost:4000`.

### Admin Dashboard
The admin portal under `admin/` is a Vite React app for managing menu items and viewing incoming orders.

### Assets
Common images used by both UIs reside in the `food del assets/` directory and are imported as needed during the build.

