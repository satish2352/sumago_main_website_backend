const express = require("express");
const { body } = require("express-validator");
const {
  getBlogdetailsRecord,
  createBlogdetailsRecord,
  updateBlogdetailsRecord,
  deleteBlogdetailsRecord,
  getBlogdetailsByIdRecord
} = require("../controllers/BlogdeailpageControllar");
const multer = require("multer");
const { upload } = require("../controllers/BlogdeailpageControllar");
const verifyToken = require("../JWT/auth");

const router = express.Router();

router.get("/getBlogdetailsRecord", verifyToken, async (req, res) => {
  try {
    await getBlogdetailsRecord(req, res);
  } catch (error) {
    console.error("Error in getBlogdetailsRecord:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/getBlogdetails", async (req, res) => {
  try {
    await getBlogdetailsRecord(req, res);
  } catch (error) {
    console.error("Error in getBlogdetailsRecord:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/getBlogdetails/:id", async (req, res) => {
  try {
    const { id } = req.params;
    req.params.id = id;
    await getBlogdetailsByIdRecord(req, res);
  } catch (error) {
    console.error(`Error in getBlogdetailsByIdRecord: ${error}`);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.post(
  "/createBlogdetailsRecord",
 
  upload.fields([{ name: "img", maxCount: 1 }]),
  [
    body("title").notEmpty().withMessage("title cannot be empty"),
    body("text").notEmpty().withMessage("text cannot be empty"),
    body("subtitle").notEmpty().withMessage("subtitle cannot be empty"),
    body("date").notEmpty().withMessage("date cannot be empty"),


  ],
  async (req, res) => {
    try {
      await createBlogdetailsRecord(req, res);
    } catch (error) {
      console.error("Error in createBlogdetailsRecord:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.put(
  "/updateBlogdetailsRecord/:id",
  verifyToken,
  upload.fields([{ name: "img", maxCount: 1 }]),
  async (req, res) => {
    try {
      await updateBlogdetailsRecord(req, res);
    } catch (error) {
      console.error("Error in updateBlogdetailsRecord:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.delete(
  "/deleteBlogdetailsRecord/:id",
  verifyToken,
  async (req, res) => {
    try {
      await deleteBlogdetailsRecord(req, res);
    } catch (error) {
      console.error("Error in deleteBlogdetailsRecord:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;
