// One-liner runner: apply a .sql file to whatever DATABASE_URL points at.
// Usage: node migrations/apply.cjs 001_init.sql
//
// Splits the file into statements the naive way (";" that aren't inside
// single-quoted strings or plpgsql $$ blocks). Enough for the schema and
// seed files we ship — do NOT feed it hand-written dump files with random
// procedural code.
require("dotenv").config({
  path: require("path").join(__dirname, "..", ".env"),
});
const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

const file = process.argv[2];
if (!file) {
  console.error("usage: node apply.cjs <sql-file>");
  process.exit(1);
}
const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL missing in backend/.env");
  process.exit(1);
}

const sql = fs.readFileSync(path.resolve(__dirname, file), "utf8");

(async () => {
  const client = new Client({
    connectionString: url,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();
  try {
    // The pg driver accepts multi-statement strings when you don't pass
    // params. Neon supports this on regular queries.
    await client.query(sql);
    console.log(`applied ${file}`);
  } finally {
    await client.end();
  }
})().catch((err) => {
  console.error("apply failed:", err.message);
  process.exit(1);
});
