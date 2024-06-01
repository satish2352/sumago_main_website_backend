const { validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs");
const recordModel = require("../models/abotmission");
const multer = require("multer");
const env = require("dotenv").config();

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
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

function getAllaboutmissionRecord(req, res) {
  try {
    recordModel.getAllaboutmission((err, results) => {
      if (err) {
        console.error("Error fetching records:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      const modifiedResults = results.map((item) => ({
        id: item.id,
        title: item.title,
        img: `${process.env.serverURL}${item.img}`,
      }));

      res.json(modifiedResults);
    });
  } catch (error) {
    console.error("Error in getAllaboutmissionRecord:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

function getaboutmissionRecord(req, res) {
  try {
    const title = req.query.title; // Extract title from query parameters
    recordModel.getaboutmission(title, (err, results) => {
      if (err) {
        console.error("Error fetching records:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      const modifiedResults = results.map((item) => ({
        id: item.id,
        title: item.title,
        img: `${process.env.serverURL}${item.img}`,
      }));

      res.json(modifiedResults);
    });
  } catch (error) {
    console.error("Error in getaboutmissionRecord:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

function createaboutmissionRecord(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const recordData = req.body;
    const imgFile = req.file;

    if (imgFile) {
      recordData.img = imgFile.originalname;
    }

    recordModel.createaboutmission(recordData, (err, result) => {
      if (err) {
        console.error("Error creating record:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.status(201).json({ message: "Record created successfully", result: recordData });
    });
  } catch (error) {
    console.error("Error in createaboutmissionRecord:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

function updateaboutmissionRecord(req, res) {
  try {
    const { id } = req.params;
    const recordData = req.body;

    if (req.file) {
      recordData.img = req.file.originalname;
    }

    recordModel.updateaboutmission(id, recordData, (err, result) => {
      if (err) {
        console.error("Error updating record:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json({ message: "Record updated successfully" });
    });
  } catch (error) {
    console.error("Error in updateaboutmissionRecord:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

function deleteaboutmissionRecord(req, res) {
  try {
    const { id } = req.params;
    recordModel.deleteaboutmission(id, (err, result) => {
      if (err) {
        console.error("Error deleting record:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.send("Record deleted successfully");
    });
  } catch (error) {
    console.error("Error in deleteaboutmissionRecord:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getaboutmissionRecord,
  createaboutmissionRecord,
  updateaboutmissionRecord,
  deleteaboutmissionRecord,
  getAllaboutmissionRecord,
  upload,
};
