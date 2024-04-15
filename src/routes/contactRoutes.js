const express = require('express');
const { body } = require('express-validator');
const { getRecords, createRecord, updateRecord, deleteRecord } = require('../controllers/contactController');

const router = express.Router();

router.get('/records', async (req, res) => {
    try {
        await getRecords(req, res);
    } catch (error) {
        console.error("Error in getRecords:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/records', [
    body('name').notEmpty().withMessage('Name cannot be empty'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('message').notEmpty().withMessage('Message cannot be empty'),
    body('phone').notEmpty().withMessage('Phone cannot be empty').isLength({ min: 10, max: 10 }).withMessage('Phone must be 10 digits long'),
    body('website').notEmpty().withMessage('Website cannot be empty')
], async (req, res) => {
    try {
        await createRecord(req, res);
    } catch (error) {
        console.error("Error in createRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.put('/records/:id', async (req, res) => {
    try {
        await updateRecord(req, res);
    } catch (error) {
        console.error("Error in updateRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete('/records/:id', async (req, res) => {
    try {
        await deleteRecord(req, res);
    } catch (error) {
        console.error("Error in deleteRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
