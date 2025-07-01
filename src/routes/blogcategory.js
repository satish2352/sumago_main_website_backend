const express = require("express");
const { body } = require("express-validator");
const {
  getblogcategoryRecord,

} = require("../controllers/blogcategory");
const multer = require("multer");
const { upload } = require("../controllers/blogcategory");
const verifyToken = require("../JWT/auth");

const router = express.Router();

router.get("/find_all", async (req, res) => {
  try {
    await getblogcategoryRecord(req, res);
  } catch (error) {
    console.error("Error in getblogcategoryRecord:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
