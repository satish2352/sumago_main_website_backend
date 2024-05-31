const express = require("express");
const { body } = require("express-validator");
const {
  getofferedservicesRecord,
  createofferedservicesRecord,
  updateofferedservicesRecord,
  deleteofferedservicesRecord,
} = require("../controllers/offeredservicesControllar");
const multer = require("multer");
const { upload } = require("../controllers/offeredservicesControllar");
const verifyToken = require("../JWT/auth");

const router = express.Router();

router.get("/getofferedservicesRecord", verifyToken, async (req, res) => {
  try {
    await getofferedservicesRecord(req, res);
  } catch (error) {
    console.error("Error in getofferedservicesRecord:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/getofferedservices", async (req, res) => {
  try {
    await getofferedservicesRecord(req, res);
  } catch (error) {
    console.error("Error in getofferedservicesRecord:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post(
  "/createofferedservicesRecord",

  upload.fields([{ name: "img", maxCount: 1 }]),
  [
    body("title").notEmpty().withMessage("title cannot be empty"),
    body("text").notEmpty().withMessage("text cannot be empty"),

  ],
  async (req, res) => {
    try {
      await createofferedservicesRecord(req, res);
    } catch (error) {
      console.error("Error in createofferedservicesRecord:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.put(
  "/updateofferedservicesRecord/:id",
  verifyToken,
  upload.fields([{ name: "img", maxCount: 1 }]),
  async (req, res) => {
    try {
      await updateofferedservicesRecord(req, res);
    } catch (error) {
      console.error("Error in updateofferedservicesRecord:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.delete(
  "/deleteofferedservicesRecord/:id",
  verifyToken,
  async (req, res) => {
    try {
      await deleteofferedservicesRecord(req, res);
    } catch (error) {
      console.error("Error in deleteofferedservicesRecord:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;
