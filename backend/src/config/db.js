const mysql = require("mysql2/promise");

const config = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  database: process.env.DB_NAME || "forgerealm",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Only send a password if one is provided; otherwise connect without a password.
if (process.env.DB_PASS !== undefined && process.env.DB_PASS !== "") {
  config.password = process.env.DB_PASS;
}

const pool = mysql.createPool(config);

module.exports = pool;
