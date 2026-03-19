

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pool from "../src/db/pool.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runSQLScript() {
  const sqlPath = path.join(__dirname, "../db_init.sql");
  const sql = fs.readFileSync(sqlPath, "utf-8");
  try {
    await pool.query(sql);
    console.log("Database initialized successfully.");
  } catch (err) {
    console.error("Error initializing database:", err.message);
  } finally {
    await pool.end();
  }
}

runSQLScript();
