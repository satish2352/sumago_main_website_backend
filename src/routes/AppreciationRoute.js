const express = require("express");
const { body } = require("express-validator");
const {
  getAppreciationRecord,
  createAppreciationRecord,
  updateAppreciationRecord,
  deleteAppreciationRecord,
} = require("../controllers/AppreciationController");
const multer = require("multer");
const { upload } = require("../controllers/AppreciationController");

const router = express.Router();

router.get("/getAppreciationRecord", async (req, res) => {
    try {
        await getAppreciationRecord(req, res);
    } catch (error) {
        console.error("Error in getAppreciationRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/createAppreciationRecord',
    upload.fields([{ name: 'img', maxCount: 1 }]),
    [
        body('name').notEmpty().withMessage('Name cannot be empty'),
        body('designation').notEmpty().withMessage('Designation cannot be empty')
    ],
    async (req, res) => {
        try {
            await createAppreciationRecord(req, res);
        } catch (error) {
            console.error("Error in createAppreciationRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);


router.put("/updateAppreciationRecord/:id", async (req, res) => {
    try {
        await updateAppreciationRecord(req, res);
    } catch (error) {
        console.error("Error in updateAppreciationRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete("/deleteAppreciationRecord/:id", async (req, res) => {
    try {
        await deleteAppreciationRecord(req, res);
    } catch (error) {
        console.error("Error in deleteAppreciationRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
