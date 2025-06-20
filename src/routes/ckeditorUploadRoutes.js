// routes/ckeditorUpload.route.ts (or .js if using JavaScript)
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '../../uploads/blogdetails');

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `ckeditor_${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/ckeditor', upload.single('upload'), (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ uploaded: false, error: { message: 'No file uploaded' } });
    }

    const imageUrl = `https://nodebackend.sumagoinfotech.com/uploads/blogdetails/${file.filename}`;

    res.status(201).json({
      uploaded: true,
      url: imageUrl,
    });
  } catch (err) {
    console.error('CKEditor upload error:', err);
    res.status(500).json({ uploaded: false, error: { message: 'Upload failed' } });
  }
});

module.exports = router;
