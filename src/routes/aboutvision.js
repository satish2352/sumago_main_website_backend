const express = require("express");
const { body } = require("express-validator");
const multer = require("multer");
const {
  getaboutvisionRecord,
  createaboutvisionRecord,
  updateaboutvisionRecord,
  deleteaboutvisionRecord,
  getAllaboutvisionRecord 
} = require("../controllers/aboutvision");
const { upload } = require("../controllers/aboutvision");
const verifyToken = require("../JWT/auth");

const router = express.Router();

router.get("/find_all", verifyToken, async (req, res) => {
    try {
        await getAllaboutvisionRecord(req, res);
    } catch (error) {
        console.error("Error in getAllaboutvisionRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/find", verifyToken, async (req, res) => {
    try {
        await getaboutvisionRecord(req, res);
    } catch (error) {
        console.error("Error in getaboutvisionRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/getAllaboutvisionRecord", async (req, res) => {
    try {
        await getAllaboutvisionRecord(req, res);
    } catch (error) {
        console.error("Error in getAllaboutvisionRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/getaboutvisionRecord", async (req, res) => {
    try {
        await getaboutvisionRecord(req, res);
    } catch (error) {
        console.error("Error in getaboutvisionRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/create',
    upload.fields([{ name: 'img', maxCount: 1 }]),
    [
        body('title').notEmpty().withMessage('title cannot be empty')
    ],
    async (req, res) => {
        try {
            await createaboutvisionRecord(req, res);
        } catch (error) {
            console.error("Error in createaboutvisionRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);

router.put("/update/:id", verifyToken, async (req, res) => {
    try {
        await updateaboutvisionRecord(req, res);
    } catch (error) {
        console.error("Error in updateaboutvisionRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete("/delete/:id", verifyToken, async (req, res) => {
    try {
        await deleteaboutvisionRecord(req, res);
    } catch (error) {
        console.error("Error in deleteaboutvisionRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
