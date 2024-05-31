const express = require("express");
const { body } = require("express-validator");
const {
  gethometechnologiesRecord,
  createhometechnologiesRecord,
  updatehometechnologiesRecord,
  deletehometechnologiesRecord,
} = require("../controllers/hometechnoolgies");
const multer = require("multer");
const { upload } = require("../controllers/hometechnoolgies");
const verifyToken = require("../JWT/auth");

const router = express.Router();

router.get("/gethometechnologiesRecord", verifyToken, async (req, res) => {
  try {
    await gethometechnologiesRecord(req, res);
  } catch (error) {
    console.error("Error in gethometechnologiesRecord:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/gethometechnologies", async (req, res) => {
  try {
    await gethometechnologiesRecord(req, res);
  } catch (error) {
    console.error("Error in gethometechnologiesRecord:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post(
  "/createhometechnologiesRecord",

  upload.fields([{ name: "img", maxCount: 1 }]),
  [
    body("title").notEmpty().withMessage("title cannot be empty"),

  ],
  async (req, res) => {
    try {
      await createhometechnologiesRecord(req, res);
    } catch (error) {
      console.error("Error in createhometechnologiesRecord:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.put(
  "/updatehometechnologiesRecord/:id",
  verifyToken,
  upload.fields([{ name: "img", maxCount: 1 }]),
  async (req, res) => {
    try {
      await updatehometechnologiesRecord(req, res);
    } catch (error) {
      console.error("Error in updatehometechnologiesRecord:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.delete(
  "/deletehometechnologiesRecord/:id",
  verifyToken,
  async (req, res) => {
    try {
      await deletehometechnologiesRecord(req, res);
    } catch (error) {
      console.error("Error in deletehometechnologiesRecord:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;
