const express = require("express");
const { body } = require("express-validator");
const {
  gettestimonialsRecord,
  createtestimonialsRecord,
  updatetestimonialsRecord,
  deletetestimonialsRecord,
} = require("../controllers/testimonialController");
const multer = require("multer");
const { upload } = require("../controllers/testimonialController"); // Specify the directory where files will be stored

const router = express.Router();

router.get("/find", gettestimonialsRecord);

router.post('/create',
    upload.fields([{ name: 'img', maxCount: 1 }]),
    [
        body('name').notEmpty().withMessage('name cannot be empty'),
        body('review').notEmpty().withMessage('review cannot be empty'),
        body('designation').notEmpty().withMessage('designation cannot be empty')
    ],
    createtestimonialsRecord);


router.put("/update/:id", updatetestimonialsRecord);

router.delete("/delete/:id", deletetestimonialsRecord);

module.exports = router;
