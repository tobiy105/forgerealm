const express = require("express");
const { getUsers } = require("../controllers/users.controller");
const { requireAdmin } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/", requireAdmin, getUsers);

module.exports = router;
