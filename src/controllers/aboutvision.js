const { validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs");
const recordModel = require("../models/abotvision");
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
    cb(
      null,
      // file.fieldname + "_" + Date.now() + path.extname(file.originalname)
      file.originalname
    );
  },
});

const upload = multer({ storage: storage });

function getAllaboutvisionRecord(req, res) {
  try {
    recordModel.getAllaboutvision((err, results) => {
      if (err) {
        console.error("Error fetching records:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      const modifiedResults = results.map((item) => {
        return {
          id: item.id,
          title: item.title,
          img: `${process.env.serverURL}${item.img}`,
        };
      });

      res.json(modifiedResults);
    });
  } catch (error) {
    console.error("Error in getAllaboutvisionRecord:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

function getaboutvisionRecord(req, res) {
  try {
    const title = req.query.title; // Extract title from query parameters
    recordModel.getAllaboutvision(title, (err, results) => {
      if (err) {
        console.error("Error fetching records:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      const modifiedResults = results.map((item) => {
        // Add a new property called 'modified' with value true
        return {
          id: item.id,
          title: item.title,
          img: `${process.env.serverURL}${item.img}`,
        };
      });

      // Send the modified data as response
      res.json(modifiedResults);
    });
  } catch (error) {
    console.error("Error in getaboutvisionRecord:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

function createaboutvisionRecord(req, res) {
  try {
    const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }
    const recordData = req.body;
    const imgFile = req.files["img"][0]; // Uploaded CV file

    recordData.img = imgFile.originalname;
    recordModel.createaboutvision(recordData, (err, result) => {
      if (err) {
        console.error("Error creating record:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res
        .status(201)
        .json({ message: "Record created successfully", result: recordData });
    });
  } catch (error) {
    console.error("Error in createaboutvisionRecord:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}



function updateaboutvisionRecord(req, res) {
  try {
    const { id } = req.params;
    const recordData = req.body;

    if (req.file) {
      recordData.img = req.file.originalname;
    }

    recordModel.updateaboutvision(id, recordData, (err, result) => {
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


function deleteaboutvisionRecord(req, res) {
  try {
    const { id } = req.params;
    recordModel.deleteaboutvision(id, (err, result) => {
      if (err) {
        console.error("Error deleting record:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.send("Record deleted successfully");
    });
  } catch (error) {
    console.error("Error in deleteaboutvisionRecord:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getaboutvisionRecord,
  createaboutvisionRecord,
  updateaboutvisionRecord,
  deleteaboutvisionRecord,
  getAllaboutvisionRecord,
  upload,
};
