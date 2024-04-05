const express = require("express");
const { body } = require("express-validator");
const {
  getlifeCategoryDetailsRecord,
  createlifeCategoryDetailsRecord,
  updatelifeCategoryDetailsRecord,
  deletelifeCategoryDetailsRecord,
} = require("../controllers/lifeCategoryDetailsController");
const multer = require("multer");
const { upload } = require("../controllers/lifeCategoryDetailsController"); // Specify the directory where files will be stored

const router = express.Router();

router.get("/find", getlifeCategoryDetailsRecord);

router.post('/create',
    upload.fields([{ name: 'img', maxCount: 1 }]),
    [
        body('category').notEmpty().withMessage('category cannot be empty')
    ],
    createlifeCategoryDetailsRecord);


router.put("/update/:id", updatelifeCategoryDetailsRecord);

router.delete("/delete/:id", deletelifeCategoryDetailsRecord);

module.exports = router;
