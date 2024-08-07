// recordsController.js
const { validationResult } = require("express-validator");
const recordModel = require("../models/BroucherFormModal");

function getRecords(req, res) {
  try {
    recordModel.getAllRecords((err, results) => {
      if (err) {
        console.error("Error fetching records:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json(results);
    });
  } catch (error) {
    console.error("Error in getRecords:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

function createRecord(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const recordData = req.body;
    
    recordModel.createRecord(recordData, (err, result) => {
      if (err) {
        console.error("Error creating record:", err);

        // Check for duplicate entry errors
        if (err.code === 'ER_DUP_ENTRY') {
          if (err.message.includes('email')) {
            return res.status(409).json({ error: "Email already exists" });
          } else if (err.message.includes('phone')) {
            return res.status(409).json({ error: "Phone number already exists" });
          } else {
            return res.status(409).json({ error: "Duplicate entry" });
          }
        }
        
        return res.status(500).json({ error: "Internal Server Error" });
      }

      res.status(201).json({ message: "Record created successfully", result: recordData });
    });
  } catch (error) {
    console.error("Error in createRecord:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

function updateRecord(req, res) {
  try {
    const { id } = req.params;
    const recordData = req.body;
    recordModel.updateRecord(id, recordData, (err, result) => {
        console.log("err",err);
        console.log("result",result);
      if (err) {
        console.error("Error updating record:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.send("Record updated successfully");
    });
  } catch (error) {
    console.error("Error in updateRecord:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

function deleteRecord(req, res) {
  try {
    const { id } = req.params;
    recordModel.deleteRecord(id, (err, result) => {
      if (err) {
        console.error("Error deleting record:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.send("Record deleted successfully");
    });
  } catch (error) {
    console.error("Error in deleteRecord:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getRecords,
  createRecord,
  updateRecord,
  deleteRecord,
};
