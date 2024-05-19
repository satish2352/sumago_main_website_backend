const express = require('express');
const { body } = require('express-validator');
const { getLifeCategoryRecords, createLifeCategoryRecord, updateLifeCategoryRecord, deleteLifeCategoryRecord } = require('../controllers/lifeCategoryController');
const verifyToken = require('../JWT/auth');

const router = express.Router();

router.get('/find', verifyToken, async (req, res) => {
    try {
        await getLifeCategoryRecords(req, res);
    } catch (error) {
        console.error("Error in getLifeCategoryRecords:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get('/getLifeCategory', async (req, res) => {
    try {
        await getLifeCategoryRecords(req, res);
    } catch (error) {
        console.error("Error in getLifeCategoryRecords:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/create', verifyToken, [
    body('category').notEmpty().withMessage('Category cannot be empty'),
], async (req, res) => {
    try {
        await createLifeCategoryRecord(req, res);
    } catch (error) {
        console.error("Error in createLifeCategoryRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.put('/update/:id', verifyToken, async (req, res) => {
    try {
        await updateLifeCategoryRecord(req, res);
    } catch (error) {
        console.error("Error in updateLifeCategoryRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete('/delete/:id', verifyToken, async (req, res) => {
    try {
        await deleteLifeCategoryRecord(req, res);
    } catch (error) {
        console.error("Error in deleteLifeCategoryRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
