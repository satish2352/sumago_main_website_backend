const applyNowController = require("../controllers/applyNowController");
const express = require("express");
const router = express();
const multer = require("multer");

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });
  
  const upload = multer({ storage: storage });

// Use the upload middleware for multiple files before calling the applyNow function
router.post("/apply", upload.fields([{ name: 'cv', maxCount: 1 }, { name: 'cover_letter', maxCount: 1 }]), applyNowController.applyNow);

module.exports = router;
