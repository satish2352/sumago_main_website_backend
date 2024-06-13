const express = require("express");
const { body } = require("express-validator");
const {
  getsectorsRecord,
  createsectorsRecord,
  updatesectorsRecord,
  deletesectorsRecord,
} = require("../controllers/SectorsController");
const multer = require("multer");
const { upload } = require("../controllers/SectorsController");
const verifyToken = require("../JWT/auth");

const router = express.Router();

router.get("/getsectorsRecord", verifyToken, async (req, res) => {
    try {
        await getsectorsRecord(req, res);
    } catch (error) {
        console.error("Error in getsectorsRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/getsectors", async (req, res) => {
    try {
        await getsectorsRecord(req, res);
    } catch (error) {
        console.error("Error in getsectorsRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/createsectorsRecord', verifyToken,
    upload.fields([{ name: 'img', maxCount: 1 }]),
    [
        // body('id').notEmpty().withMessage('id cannot be empty'),
        body('title').notEmpty().withMessage('Name cannot be empty'),
        body('url')
    ],
    async (req, res) => {
        try {
            await createsectorsRecord(req, res);
        } catch (error) {
            console.error("Error in createsectorsRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);


router.put("/updatesectorsRecord/:id", verifyToken,
  upload.fields([{ name: 'img', maxCount: 1 }]), 
  async (req, res) => {
  try {
    await updatesectorsRecord(req, res);
  } catch (error) {
    console.error("Error in updatesectorsRecord:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/deletesectorsRecord/:id", verifyToken, async (req, res) => {
    try {
        await deletesectorsRecord(req, res);
    } catch (error) {
        console.error("Error in deletesectorsRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
