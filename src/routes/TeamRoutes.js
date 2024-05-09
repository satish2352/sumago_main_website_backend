const express = require("express");
const { body } = require("express-validator");
const {
  getteamRecord,
  createteamRecord,
  updateteamRecord,
  deleteteamRecord,
} = require("../controllers/TeamController");
const multer = require("multer");
const { upload } = require("../controllers/TeamController");

const router = express.Router();

router.get("/getteamRecord", async (req, res) => {
    try {
        await getteamRecord(req, res);
    } catch (error) {
        console.error("Error in getteamRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/createteamRecord',
    upload.fields([{ name: 'img', maxCount: 1 }]),
    [
        body('name').notEmpty().withMessage('Name cannot be empty'),
        body('designation').notEmpty().withMessage('Designation cannot be empty')
    ],
    async (req, res) => {
        try {
            await createteamRecord(req, res);
        } catch (error) {
            console.error("Error in createteamRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);


router.put("/updateteamRecord/:id", async (req, res) => {
    try {
        await updateteamRecord(req, res);
    } catch (error) {
        console.error("Error in updateteamRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete("/deleteteamRecord/:id", async (req, res) => {
    try {
        await deleteteamRecord(req, res);
    } catch (error) {
        console.error("Error in deleteteamRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
