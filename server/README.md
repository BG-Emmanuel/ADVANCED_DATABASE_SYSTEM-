# SmartBorderHub Backend (Node.js + Express + PostgreSQL)

## Setup Instructions

### 1. Install dependencies
```
cd server
npm install
```

### 2. Configure PostgreSQL
- Create a PostgreSQL database (e.g., `smartborderhub`).
- Create a user and set the credentials in `.env`.
- Example SQL:
  ```sql
  CREATE DATABASE smartborderhub;
  CREATE USER your_db_user WITH PASSWORD 'your_db_password';
  GRANT ALL PRIVILEGES ON DATABASE smartborderhub TO your_db_user;
  ```
- Edit `.env` with your credentials.

### 3. Initialize the Database Schema
```
npm run initdb
```
This runs the SQL script to create all tables and objects.

### 4. Start the API Server
```
npm run dev
```
The server runs on http://localhost:4000 by default.

### 5. Test the API
- Health check: [http://localhost:4000/api/health](http://localhost:4000/api/health)
- List tables: [http://localhost:4000/api/tables](http://localhost:4000/api/tables)

---

You can now build out CRUD endpoints for your app logic!
