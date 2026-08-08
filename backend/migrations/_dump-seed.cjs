// One-shot: read admin_users + users out of the current MySQL RDS and write
// a Postgres-compatible INSERT script to migrations/_seed.local.sql (gitignored).
// The content NEVER surfaces to the tool transcript — it's written to disk and
// then imported into Neon via `psql -f`. Delete both files after the migration
// is verified.
require("dotenv").config({
  path: require("path").join(__dirname, "..", ".env"),
});
const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "_seed.local.sql");

function esc(v) {
  if (v === null || v === undefined) return "NULL";
  if (typeof v === "number") return String(v);
  if (typeof v === "boolean") return v ? "TRUE" : "FALSE";
  if (v instanceof Date) return `'${v.toISOString()}'::timestamptz`;
  // strings: double up single quotes
  return `'${String(v).replace(/'/g, "''")}'`;
}

(async () => {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    ssl: { rejectUnauthorized: false },
  });

  const chunks = ["-- ForgeRealm seed export (MySQL RDS -> Neon Postgres)", ""];
  let totalRows = 0;

  for (const table of ["admin_users", "users"]) {
    const [rows] = await conn.query(`SELECT * FROM \`${table}\``);
    if (rows.length === 0) continue;
    chunks.push(`-- ${table} (${rows.length} rows)`);
    const cols = Object.keys(rows[0]);
    for (const row of rows) {
      // tinyint(1) columns come back as numbers; convert to booleans where the
      // Postgres schema declares BOOLEAN (users.email_verified only).
      if (table === "users" && "email_verified" in row) {
        row.email_verified = Boolean(row.email_verified);
      }
      const vals = cols.map((c) => esc(row[c])).join(", ");
      // OVERRIDING SYSTEM VALUE lets us keep the original MySQL primary keys
      // even though our Postgres identity columns are `GENERATED ALWAYS`.
      chunks.push(
        `INSERT INTO ${table} (${cols.join(", ")}) OVERRIDING SYSTEM VALUE VALUES (${vals});`,
      );
    }
    chunks.push("");
    totalRows += rows.length;
  }

  // Bump the sequences so the next INSERT doesn't collide with the highest id
  // we just imported. Postgres SERIAL sequences don't advance on manual
  // id-including inserts.
  chunks.push("-- Advance sequences past the imported ids");
  chunks.push(
    `SELECT setval(pg_get_serial_sequence('admin_users', 'id'), (SELECT COALESCE(MAX(id), 0) FROM admin_users));`,
  );
  chunks.push(
    `SELECT setval(pg_get_serial_sequence('users', 'id'), (SELECT COALESCE(MAX(id), 0) FROM users));`,
  );
  chunks.push("");

  fs.writeFileSync(OUT, chunks.join("\n"));
  console.log(`wrote ${totalRows} rows across 2 tables -> ${OUT}`);
  console.log("file size:", fs.statSync(OUT).size, "bytes");

  await conn.end();
})().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
