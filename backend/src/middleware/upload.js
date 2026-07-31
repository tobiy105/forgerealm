const fs = require("fs");
const path = require("path");
const multer = require("multer");
const { ApiError } = require("../utils/errors");

const tempDir = path.join(__dirname, "../../uploads/products/temp");

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      await fs.promises.mkdir(tempDir, { recursive: true });
      cb(null, tempDir);
    } catch (err) {
      cb(err);
    }
  },
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, "-").toLowerCase();
    cb(null, `${Date.now()}-${safeName}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/webp"];
  if (!allowed.includes(file.mimetype)) {
    return cb(new ApiError(400, "Only JPG, PNG, and WEBP files are allowed"));
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;
