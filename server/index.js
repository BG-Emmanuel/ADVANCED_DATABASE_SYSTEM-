import express from "express";
import dotenv from "dotenv";
import { Pool } from "pg";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// PostgreSQL pool
const pool = new Pool();

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "API is running" });
});

// Example: Get all tables in the database
app.get("/api/tables", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
