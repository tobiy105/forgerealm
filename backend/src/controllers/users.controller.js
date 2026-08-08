const pool = require("../config/db");
const { asyncHandler } = require("../utils/errors");

const getUsers = asyncHandler(async (req, res) => {
  const [rows] = await pool.query(
    "SELECT id, username, email, role, created_at FROM users ORDER BY created_at DESC",
  );
  res.json(rows);
});

module.exports = { getUsers };
