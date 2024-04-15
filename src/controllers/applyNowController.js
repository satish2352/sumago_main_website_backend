const { validationResult } = require("express-validator");
const recordModel = require("../models/applyNowModal");
const path = require("path");
const fs = require("fs")
const multer = require("multer");

function getApplyNowRecord(req, res) {
  try {
    recordModel.getApplyNow((err, results) => {
      if (err) {
        console.error("Error fetching records:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      console.log("results",results);
      const modifiedResults = results.map((item) => {
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

      res.json(modifiedResults);
    });
  } catch (error) {
    console.error("Error in getApplyNowRecord:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../../uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname
    );
  },
});

const upload = multer({ storage: storage });

function createApplyNowRecord(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const recordData = req.body;
    const cvFile = req.files["cv"][0];
    const coverLetterFile = req.files["cover_letter"][0];

    recordData.cv = cvFile.originalname;
    recordData.cover_letter = coverLetterFile.originalname;
    
    recordModel.createApplyNow(recordData, (err, result) => {
      if (err) {
        console.error("Error creating record:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.status(201).json({ message: "Record created successfully", result: recordData });
    });
  } catch (error) {
    console.error("Error in createApplyNowRecord:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

function updateApplyNowRecord(req, res) {
  try {
    const { id } = req.params;
    const recordData = req.body;
    recordModel.updateApplyNow(id, recordData, (err, result) => {
      if (err) {
        console.error("Error updating record:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.send("Record updated successfully");
    });
  } catch (error) {
    console.error("Error in updateApplyNowRecord:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

function deleteApplyNowRecord(req, res) {
  try {
    const { id } = req.params;
    recordModel.deleteApplyNow(id, (err, result) => {
      if (err) {
        console.error("Error deleting record:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.send("Record deleted successfully");
    });
  } catch (error) {
    console.error("Error in deleteApplyNowRecord:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getApplyNowRecord,
  createApplyNowRecord,
  updateApplyNowRecord,
  deleteApplyNowRecord,
  upload
};
