const express = require("express");
const { body } = require("express-validator");
const {
  getaboutmissionRecord,
  createaboutmissionRecord,
  updateaboutmissionRecord,
  deleteaboutmissionRecord,
} = require("../controllers/aboutmission");
const multer = require("multer");
const { upload } = require("../controllers/aboutmission");
const verifyToken = require("../JWT/auth");

const router = express.Router();

router.get("/find_all", verifyToken, async (req, res) => {
  try {
    await getaboutmissionRecord(req, res);
  } catch (error) {
    console.error("Error in getaboutmissionRecord:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/find", async (req, res) => {
  try {
    await getaboutmissionRecord(req, res);
  } catch (error) {
    console.error("Error in getaboutmissionRecord:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post(
  "/create",
  verifyToken,
  upload.fields([{ name: "img", maxCount: 1 }]),
  [
    body("title").notEmpty().withMessage("title cannot be empty")
  ],
  async (req, res) => {
    try {
      await createaboutmissionRecord(req, res);
    } catch (error) {
      console.error("Error in createaboutmissionRecord:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.put(
  "/update/:id",
  verifyToken,
  upload.fields([{ name: "img", maxCount: 1 }]),
  async (req, res) => {
    try {
      await updateaboutmissionRecord(req, res);
    } catch (error) {
      console.error("Error in updateaboutmissionRecord:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.delete(
  "/delete/:id",
  verifyToken,
  async (req, res) => {
    try {
      await deleteaboutmissionRecord(req, res);
    } catch (error) {
      console.error("Error in deleteaboutmissionRecord:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;
