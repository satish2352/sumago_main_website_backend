const express = require('express');
const { body } = require('express-validator');
const { getCultureCategoryRecords, createCultureCategoryRecord, updateCultureCategoryRecord, deleteCultureCategoryRecord } = require('../controllers/cultureCategoryController');

const router = express.Router();

router.get('/getCultureCategory', async (req, res) => {
    try {
        await getCultureCategoryRecords(req, res);
    } catch (error) {
        console.error("Error in getCultureCategoryRecords:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/createCultureCategory', [
    body('category').notEmpty().withMessage('Category cannot be empty'),
], async (req, res) => {
    try {
        await createCultureCategoryRecord(req, res);
    } catch (error) {
        console.error("Error in createCultureCategoryRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        await updateCultureCategoryRecord(req, res);
    } catch (error) {
        console.error("Error in updateCultureCategoryRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        await deleteCultureCategoryRecord(req, res);
    } catch (error) {
        console.error("Error in deleteCultureCategoryRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
