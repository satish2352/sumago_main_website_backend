const express = require("express");
const { body } = require("express-validator");
const {
  gethomecardsRecord,
  createhomecardsRecord,
  updatehomecardsRecord,
  deletehomecardsRecord,
} = require("../controllers/homecardsController");
const multer = require("multer");
const { upload } = require("../controllers/homecardsController");
const verifyToken = require("../JWT/auth");

const router = express.Router();

router.get("/gethomecardsRecord", verifyToken, async (req, res) => {
  try {
    await gethomecardsRecord(req, res);
  } catch (error) {
    console.error("Error in gethomecardsRecord:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/gethomecards", async (req, res) => {
  try {
    await gethomecardsRecord(req, res);
  } catch (error) {
    console.error("Error in gethomecardsRecord:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post(
  "/createhomecardsRecord",
 
  upload.fields([{ name: "img", maxCount: 1 }]),
  [
    body("title").notEmpty().withMessage("title cannot be empty"),
  ],
  async (req, res) => {
    try {
      await createhomecardsRecord(req, res);
    } catch (error) {
      console.error("Error in createhomecardsRecord:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.put(
  "/updatehomecardsRecord/:id",
  verifyToken,
  upload.fields([{ name: "img", maxCount: 1 }]),
  async (req, res) => {
    try {
      await updatehomecardsRecord(req, res);
    } catch (error) {
      console.error("Error in updatehomecardsRecord:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.delete(
  "/deletehomecardsRecord/:id",
  verifyToken,
  async (req, res) => {
    try {
      await deletehomecardsRecord(req, res);
    } catch (error) {
      console.error("Error in deletehomecardsRecord:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;
