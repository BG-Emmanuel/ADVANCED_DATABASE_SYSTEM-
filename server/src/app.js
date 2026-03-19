import express from "express";
import healthRouter from "./routes/health.js";
import tablesRouter from "./routes/tables.js";

const app = express();
app.use(express.json());

app.use("/api/health", healthRouter);
app.use("/api/tables", tablesRouter);

export default app;
