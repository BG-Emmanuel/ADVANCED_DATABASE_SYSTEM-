import { Pool } from "pg";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

// Robustly resolve .env path (try /server/.env and project root)
const localEnvPath = path.resolve(process.cwd(), "../.env");
const rootEnvPath = path.resolve(process.cwd(), "../../.env");
if (fs.existsSync(localEnvPath)) {
	dotenv.config({ path: localEnvPath });
} else if (fs.existsSync(rootEnvPath)) {
	dotenv.config({ path: rootEnvPath });
} else {
	dotenv.config(); // fallback
}

// Debug: Log env vars if password error persists
// console.log('PGUSER:', process.env.PGUSER, 'PGPASSWORD:', process.env.PGPASSWORD, typeof process.env.PGPASSWORD);

// Ensure PGPASSWORD is a string
if (process.env.PGPASSWORD && typeof process.env.PGPASSWORD !== 'string') {
	process.env.PGPASSWORD = String(process.env.PGPASSWORD);
}

const pool = new Pool({
	host: process.env.PGHOST,
	user: process.env.PGUSER,
	password: process.env.PGPASSWORD,
	database: process.env.PGDATABASE,
	port: process.env.PGPORT ? parseInt(process.env.PGPORT, 10) : 5432,
});

export default pool;
