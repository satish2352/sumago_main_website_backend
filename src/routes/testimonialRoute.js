const express = require("express");
const { body } = require("express-validator");
const {
  gettestimonialsRecord,
  createtestimonialsRecord,
  updatetestimonialsRecord,
  deletetestimonialsRecord,
} = require("../controllers/testimonialController");
const multer = require("multer");
const { upload } = require("../controllers/testimonialController");

const router = express.Router();

router.get("/find", async (req, res) => {
    try {
        await gettestimonialsRecord(req, res);
    } catch (error) {
        console.error("Error in gettestimonialsRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/create',
    upload.fields([{ name: 'img', maxCount: 1 }]),
    [
        body('name').notEmpty().withMessage('Name cannot be empty'),
        body('review').notEmpty().withMessage('Review cannot be empty'),
        body('designation').notEmpty().withMessage('Designation cannot be empty')
    ],
    async (req, res) => {
        try {
            await createtestimonialsRecord(req, res);
        } catch (error) {
            console.error("Error in createtestimonialsRecord:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
);


router.put("/update/:id", async (req, res) => {
    try {
        await updatetestimonialsRecord(req, res);
    } catch (error) {
        console.error("Error in updatetestimonialsRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        await deletetestimonialsRecord(req, res);
    } catch (error) {
        console.error("Error in deletetestimonialsRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
