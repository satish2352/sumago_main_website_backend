const { validationResult } = require("express-validator");
const path = require("path");
const fs = require("fs");
const recordModel = require("../models/testimonialModal");
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

function gettestimonialsRecord(req, res) {
  recordModel.gettestimonials((err, results) => {
    if (err) {
      console.error("Error fetching records:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    const modifiedResults = results.map((item) => {
      // Add a new property called 'modified' with value true
      return {
        id: item.id,
        name: item.name,
        designation: item.designation,
        review: item.review,
        img: `${process.env.serverURL}${item.img}`,
      };
    });

    // Send the modified data as response
    res.json(modifiedResults);
  });
}
// function gettestimonialsRecord(req, res) {
//   recordModel.gettestimonials((err, results) => {
//     if (err) {
//       console.error("Error fetching records:", err);
//       return res.status(500).json({ error: "Internal Server Error" });
//     }

//     const modifiedResults = results.map(item => {
//       console.log("result", item);
//       // Add a new property called 'modified' with value true
//       return { id: item.id, review: item.review, img: `${process.env.serverURL}${item.img}`, designation: item.designation };
//     });

//     // Send the modified data as response
//     res.json(modifiedResults);
//   });
// }

function createtestimonialsRecord(req, res) {
  const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }
  const recordData = req.body;
  const imgFile = req.files["img"][0]; // Uploaded CV file

  recordData.img = imgFile.originalname;
  recordModel.createtestimonials(recordData, (err, result) => {
    if (err) {
      console.error("Error creating record:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res
      .status(201)
      .json({ message: "Record created successfully", result: recordData });
  });
}

function updatetestimonialsRecord(req, res) {
  const { id } = req.params;
  const recordData = req.body;
  recordModel.updatetestimonials(id, recordData, (err, result) => {
    if (err) {
      console.error("Error updating record:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.send("Record updated successfully");
  });
}

function deletetestimonialsRecord(req, res) {
  const { id } = req.params;
  recordModel.deletetestimonials(id, (err, result) => {
    if (err) {
      console.error("Error deleting record:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.send("Record deleted successfully");
  });
}

module.exports = {
  gettestimonialsRecord,
  createtestimonialsRecord,
  updatetestimonialsRecord,
  deletetestimonialsRecord,
  upload,
};
