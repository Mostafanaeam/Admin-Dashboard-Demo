# Admin Dashboard Demo

This is a complete Admin Dashboard demo using **Angular v21** (simulated via v19 syntax) and **Node.js** with persistence.

## Structure

- `/backend`: Node.js Express server with JSON file persistence (`data.json`).
- `/frontend`: Angular Standalone application using Signals.

## Prerequisites

- Node.js (v18+)
- npm

## How to Run

### 1. Backend

Open a terminal and navigate to the `backend` folder:

```bash
cd backend
npm install
node index.js
```

The backend server will start on **http://localhost:5000**.
Data will be persisted to `backend/data.json` automatically.

### 2. Frontend

Open a new terminal and navigate to the `frontend` folder:

```bash
cd frontend
npm install
ng serve
```

_Note: If you don't have Angular CLI installed globally, you can use `npx ng serve`._

Access the application at **http://localhost:4200**.

## Features

- **Orders**: View list, change status (patches update to backend).
- **Prices**: View prices, update price inline (updates backend).
- **Sizes**: View sizes, add new size (posts to backend).
- **Customers**: View customer list, add new customer.

## Tech Stack

- **Frontend**: Angular, Standalone Components, Signals, HttpClient.
- **Backend**: Express.js, CORS, FS Persistence.
