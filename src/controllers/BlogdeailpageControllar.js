// recordsController.js
const { validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs");
const recordModel = require("../models/BlogdeatilspageModel");
const multer = require("multer");
const env = require("dotenv").config();



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
          title: item.title,
          text: item.text,
          date: item.date,
          subtitle: item.subtitle,
          category: item.category,
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
          title: item.title,
          text: item.text,
          date: item.date,
          subtitle: item.subtitle,
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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../../uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const originalName = file.originalname;
    const sanitized = originalName
      .toLowerCase()
      .replace(/\s+/g, '-')         // Replace spaces with -
      .replace(/[^\w.-]+/g, '')     // Remove non-alphanumeric except dot and dash
      .replace(/-+/g, '-');         // Collapse multiple dashes
    const timestamp = Date.now();
    cb(null, `${timestamp}-${sanitized}`);
  },
});

const upload = multer({ storage: storage });

// Process base64 images embedded in HTML
function processBase64Images(htmlContent) {
  return htmlContent.replace(
    /<img[^>]+src=["'](data:image\/(png|jpeg|jpg|gif);base64,([^"']+))["'][^>]*>/g,
    (match, fullData, ext, base64Data) => {
      try {
        const buffer = Buffer.from(base64Data, "base64");
        const filename = `image_${Date.now()}.${ext}`;
        const filePath = path.join(__dirname, "../../uploads/blogdetails", filename);
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
        fs.writeFileSync(filePath, buffer);
        return `<div style="text-align: center;">
          <img src="${process.env.SERVER_PATH}uploads/blogdetails/${filename}" alt="blog image" width="50%" height="auto"/>
        </div>`;
      } catch (error) {
        console.error("Error processing base64 image:", error);
        return match;
      }
    }
  );
}

async function createBlogdetailsRecord(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const recordData = req.body;

  // Featured image
  const imgFile = req.files?.img?.[0];
  recordData.img = imgFile ? `/${imgFile.filename}` : null;

  // Process base64 images
  recordData.text = recordData.text ? processBase64Images(recordData.text) : '';
  recordData.subtitle = recordData.subtitle ? processBase64Images(recordData.subtitle) : '';

  recordModel.createBlogdetails(recordData, (err, result) => {
    if (err) {
      console.error("Error creating record:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.status(201).json({ message: "Record created successfully", result: recordData });
  });
}
function updateBlogdetailsRecord(req, res) {
  try {
    const { id } = req.params;
    const recordData = req.body;

    if (req.files && req.files["img"]) {
      const imgFile = req.files["img"][0];
      recordData.img = imgFile.filename; // Use sanitized filename from multer
    }

    // Optional: If you're supporting embedded images in text/subtitle again
    if (recordData.text) {
      recordData.text = processBase64Images(recordData.text);
    }
    if (recordData.subtitle) {
      recordData.subtitle = processBase64Images(recordData.subtitle);
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
