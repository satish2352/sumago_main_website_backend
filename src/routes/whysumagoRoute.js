const express = require("express");
const { body } = require("express-validator");
const {
  getwhysumagoRecord,
  createwhysumagoRecord,
  updatewhysumagoRecord,
  deletewhysumagoRecord,
} = require("../controllers/whysumagoControllar");
const multer = require("multer");
const { upload } = require("../controllers/whysumagoControllar");
const verifyToken = require("../JWT/auth");

const router = express.Router();

router.get("/getwhysumagoRecord", verifyToken, async (req, res) => {
  try {
    await getwhysumagoRecord(req, res);
  } catch (error) {
    console.error("Error in getwhysumagoRecord:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/getwhysumago", async (req, res) => {
  try {
    await getwhysumagoRecord(req, res);
  } catch (error) {
    console.error("Error in getwhysumagoRecord:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post(
  "/createwhysumagoRecord",

  upload.fields([{ name: "img", maxCount: 1 }]),
  [
    body("title").notEmpty().withMessage("title cannot be empty"),
    body("text").notEmpty().withMessage("text cannot be empty"),

  ],
  async (req, res) => {
    try {
      await createwhysumagoRecord(req, res);
    } catch (error) {
      console.error("Error in createwhysumagoRecord:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.put(
  "/updatewhysumagoRecord/:id",
  verifyToken,
  upload.fields([{ name: "img", maxCount: 1 }]),
  async (req, res) => {
    try {
      await updatewhysumagoRecord(req, res);
    } catch (error) {
      console.error("Error in updatewhysumagoRecord:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.delete(
  "/deletewhysumagoRecord/:id",
  verifyToken,
  async (req, res) => {
    try {
      await deletewhysumagoRecord(req, res);
    } catch (error) {
      console.error("Error in deletewhysumagoRecord:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;
