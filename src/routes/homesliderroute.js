const express = require("express");
const { body } = require("express-validator");
const {
  gethomesliderRecord,
  createhomesliderRecord,
  updatehomesliderRecord,
  deletehomesliderRecord,
} = require("../controllers/homeslidercontrollar");
const multer = require("multer");
const { upload } = require("../controllers/homeslidercontrollar");
const verifyToken = require("../JWT/auth");

const router = express.Router();

router.get("/gethomesliderrecords", verifyToken, async (req, res) => {
  try {
    await gethomesliderRecord(req, res);
  } catch (error) {
    console.error("Error in gethomesliderRecord:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/gethomeslider", async (req, res) => {
  try {
    await gethomesliderRecord(req, res);
  } catch (error) {
    console.error("Error in gethomesliderRecord:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post(
  "/createhomeslider",
  verifyToken,
  upload.fields([{ name: "img", maxCount: 1 }]),
  [
    body("title").notEmpty().withMessage("title cannot be empty"),
    body("text").notEmpty().withMessage("text cannot be empty"),
  ],
  async (req, res) => {
    try {
      await createhomesliderRecord(req, res);
    } catch (error) {
      console.error("Error in createhomesliderRecord:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.put(
  "/updatehomeslider/:id",
  verifyToken,
  upload.fields([{ name: "img", maxCount: 1 }]),
  async (req, res) => {
    try {
      await updatehomesliderRecord(req, res);
    } catch (error) {
      console.error("Error in updatehomesliderRecord:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.delete(
  "/deletehomesliderRecord/:id",
  verifyToken,
  async (req, res) => {
    try {
      await deletehomesliderRecord(req, res);
    } catch (error) {
      console.error("Error in deletehomesliderRecord:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;
