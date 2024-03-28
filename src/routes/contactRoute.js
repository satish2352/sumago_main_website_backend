const contactController = require("../controllers/contactController");
const express = require("express");
// const { body } = require("express-validator");
const router = express();

// router.post(
//   "/add",
//   [
//     // Validation middleware for each field
//     body("name").trim().isLength({ min: 1 }).withMessage("Name is required"),
//     body("email").trim().isEmail().withMessage("Invalid email"),
//     body("phone").trim().isLength({ min: 1 }).withMessage("Phone is required"),
//     body("website")
//       .trim()
//       .isLength({ min: 1 })
//       .withMessage("Website is required"),
//     body("message")
//       .trim()
//       .isLength({ min: 1 })
//       .withMessage("Message is required"),
//   ],
//   contactController.contactRegistration
// );

router.post("/add", contactController.contactRegistration);
module.exports = router;
