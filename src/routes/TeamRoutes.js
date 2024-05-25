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
const verifyToken = require("../JWT/auth");

const router = express.Router();

router.get("/getteamRecord", verifyToken, async (req, res) => {
    try {
        await getteamRecord(req, res);
    } catch (error) {
        console.error("Error in getteamRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get("/getteam", async (req, res) => {
    try {
        await getteamRecord(req, res);
    } catch (error) {
        console.error("Error in getteamRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/createteamRecord', verifyToken,
    upload.fields([{ name: 'img', maxCount: 1 }]),
    [
        // body('id').notEmpty().withMessage('id cannot be empty'),
        body('name').notEmpty().withMessage('Name cannot be empty'),
        body('fullname').notEmpty().withMessage('fullName cannot be empty'),
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


router.put("/updateteamRecord/:id", verifyToken,
  upload.fields([{ name: 'img', maxCount: 1 }]), 
  async (req, res) => {
  try {
    await updateteamRecord(req, res);
  } catch (error) {
    console.error("Error in updateteamRecord:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/deleteteamRecord/:id", verifyToken, async (req, res) => {
    try {
        await deleteteamRecord(req, res);
    } catch (error) {
        console.error("Error in deleteteamRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
