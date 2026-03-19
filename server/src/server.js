import app from "./app.js";
import dotenv from "dotenv";
import path from "path";

// Load environment variables from root .env
const envPath = path.resolve(process.cwd(), "../../.env");
dotenv.config({ path: envPath });

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
