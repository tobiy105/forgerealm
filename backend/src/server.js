const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");

const localEnv = path.join(__dirname, "..", ".env.local");
const defaultEnv = path.join(__dirname, "..", ".env");
dotenv.config({ path: fs.existsSync(localEnv) ? localEnv : defaultEnv });
const app = require("./app");
const pool = require("./config/db");

const PORT = parseInt(process.env.PORT, 10) || 8080;
const HOST = "0.0.0.0";

// start once DB is ready
async function start() {
  try {
    await pool.query("SELECT 1");
    console.log("Database connected");
    app.listen(PORT, HOST, () => {
      console.log(`ForgeRealm API listening on ${HOST}:${PORT}`);
    });
  } catch (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  }
}

// never exit silently
process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection:", err);
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err);
});

start();
