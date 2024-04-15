const express = require("express");
const { body } = require("express-validator");
const multer = require("multer");
const {
  getlifeCategoryDetailsRecord,
  createlifeCategoryDetailsRecord,
  updatelifeCategoryDetailsRecord,
  deletelifeCategoryDetailsRecord,
  getAllLifeCategoryDetailsRecord 
} = require("../controllers/lifeCategoryDetailsController");
const { upload } = require("../controllers/lifeCategoryDetailsController");

const router = express.Router();

router.get("/find_all", async (req, res) => {
    try {
        await getAllLifeCategoryDetailsRecord(req, res);
    } catch (error) {
        console.error("Error in getAllLifeCategoryDetailsRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/find", async (req, res) => {
    try {
        await getlifeCategoryDetailsRecord(req, res);
    } catch (error) {
        console.error("Error in getlifeCategoryDetailsRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/create',
    upload.fields([{ name: 'img', maxCount: 1 }]),
    [
        body('category').notEmpty().withMessage('Category cannot be empty')
    ],
    async (req, res) => {
        try {
            await createlifeCategoryDetailsRecord(req, res);
        } catch (error) {
            console.error("Error in createlifeCategoryDetailsRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);

router.put("/update/:id", async (req, res) => {
    try {
        await updatelifeCategoryDetailsRecord(req, res);
    } catch (error) {
        console.error("Error in updatelifeCategoryDetailsRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        await deletelifeCategoryDetailsRecord(req, res);
    } catch (error) {
        console.error("Error in deletelifeCategoryDetailsRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
