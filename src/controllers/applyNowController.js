const { validationResult } = require("express-validator");
const recordModel = require("../models/applyNowModal");
const path = require("path");
const fs = require("fs")
const multer = require("multer");
// const upload = multer({ dest: 'uploads/' }); // Specify the directory where files will be stored

function getApplyNowRecord(req, res) {
  recordModel.getApplyNow((err, results) => {
    if (err) {
      console.error("Error fetching records:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    console.log("results",results);
    const modifiedResults = results.map((item) => {
      // Add a new property called 'modified' with value true
      return {
        id: item.id,
        name: item.name,
        title: item.title,
        email: item.email,
        confmEmail: item.confmEmail,
        phone: item.phone,
        address: item.address,
        applicationType: item.applicationType,
        cv: `${process.env.serverURL}${item.cv}`,
        cover_letter: `${process.env.serverURL}${item.cover_letter}`,
      };
    });

    // Send the modified data as response
    res.json(modifiedResults);
  });
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../../uploads");
    // Check if the upload directory exists, if not, create it
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    console.log("file_______", file);
    cb(
      null,
      // file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      file.originalname
    );
  },
});

const upload = multer({ storage: storage });
function createApplyNowRecord(req, res) {
  const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }

  const recordData = req.body;
  const cvFile = req.files["cv"][0]; // Uploaded CV file
  const coverLetterFile = req.files["cover_letter"][0]; // Uploaded cover letter file

  // Assuming 'cv' and 'cover_letter' are the fields in the applyNow table to store file names
  recordData.cv = cvFile.originalname;
  recordData.cover_letter = coverLetterFile.originalname;
  recordModel.createApplyNow(recordData, (err, result) => {
    if (err) {
      console.error("Error creating record:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res
      .status(201)
      .json({ message: "Record created successfully", result: recordData });
  });
}

function updateApplyNowRecord(req, res) {
  const { id } = req.params;
  const recordData = req.body;
  recordModel.updateApplyNow(id, recordData, (err, result) => {
    if (err) {
      console.error("Error updating record:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.send("Record updated successfully");
  });
}

function deleteApplyNowRecord(req, res) {
  const { id } = req.params;
  recordModel.deleteApplyNow(id, (err, result) => {
    if (err) {
      console.error("Error deleting record:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.send("Record deleted successfully");
  });
}

module.exports = {
  getApplyNowRecord,
  createApplyNowRecord,
  updateApplyNowRecord,
  deleteApplyNowRecord,
  upload
};
