// recordsController.js
const { validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs");
const recordModel = require("../models/BlogdeatilspageModel");
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

function getBlogdetailsRecord(req, res) {
  try {
    recordModel.getBlogdetails((err, results) => {
      if (err) {
        console.error("Error fetching records:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      const modifiedResults = results.map((item) => {
        // Add a new property called 'modified' with value true
        return {
          id: item.id,
          title:item.title,
          text:item.text,
          date:item.date,
          subtitle:item.subtitle,
          img: `${process.env.serverURL}${item.img}`,
        };
      });

      // Send the modified data as response
      res.json(modifiedResults);
    });
  } catch (error) {
    console.error("Error in getBlogdetailsRecord:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
function getBlogdetailsByIdRecord(req, res) {
  try {
    const { id } = req.params;
    recordModel.getBlogdetailsById(id, (err, result) => {
      if (err) {
        console.error(`Error fetching record with id ${id}:`, err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (!result) {
        return res.status(404).json({ error: `Record with id ${id} not found` });
      }
      const modifiedResults = result.map((item) => {
        // Add a new property called 'modified' with value true
        return {
          id: item.id,
          title:item.title,
          text:item.text,
          date:item.date,
          subtitle:item.subtitle,
          img: `${process.env.serverURL}${item.img}`,
        };
      });
      res.json(modifiedResults);
    });
  } catch (error) {
    console.error(`Error in getBlogdetailsByIdRecord for id ${id}:`, error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
function createBlogdetailsRecord(req, res) {
  try {
    const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }
    const recordData = req.body;
    const imgFile = req.files["img"][0]; // Uploaded CV file

    recordData.img = imgFile.originalname;
    recordModel.createBlogdetails(recordData, (err, result) => {
      if (err) {
        console.error("Error creating record:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res
        .status(201)
        .json({ message: "Record created successfully", result: recordData });
    });
  } catch (error) {
    console.error("Error in createBlogdetailsRecord:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

function updateBlogdetailsRecord(req, res) {
  try {
    const { id } = req.params;
    const recordData = req.body;

    if (req.files && req.files["img"]) {
      const imgFile = req.files["img"][0];
      recordData.img = imgFile.originalname;
    }

    recordModel.updateBlogdetails(id, recordData, (err, result) => {
      if (err) {
        console.error("Error updating record:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json({ message: "Record updated successfully" });
    });
  } catch (error) {
    console.error("Error in updateBlogdetailsRecord:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

function deleteBlogdetailsRecord(req, res) {
  try {
    const { id } = req.params;
    recordModel.deleteBlogdetails(id, (err, result) => {
      if (err) {
        console.error("Error deleting record:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.send("Record deleted successfully");
    });
  } catch (error) {
    console.error("Error in deleteBlogdetailsRecord:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getBlogdetailsRecord,
  createBlogdetailsRecord,
  updateBlogdetailsRecord,
  deleteBlogdetailsRecord,
  getBlogdetailsByIdRecord,
  upload,
};
