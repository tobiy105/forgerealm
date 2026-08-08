const express = require("express");
const rateLimit = require("express-rate-limit");
const { submitEnquiry } = require("../controllers/enquiry.controller");

const router = express.Router();

// Loose limit — a small shop, but a scannable barcode + public form still
// needs a floor. 5 enquiries per IP per 10 minutes is comfortable for a real
// customer filling in a form slowly and hard for a bot to spam.
const enquiryLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many enquiries from this IP. Please try again in a bit.",
  },
});

router.post("/", enquiryLimiter, submitEnquiry);

module.exports = router;
