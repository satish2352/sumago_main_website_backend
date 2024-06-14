const express = require('express');
const { body } = require('express-validator');
const { getRecords, createRecord, updateRecord, deleteRecord } = require('../controllers/contactInfoController');
const verifyToken = require('../JWT/auth');

const router = express.Router();

router.get('/getrecords', async (req, res) => {
    try {
        await getRecords(req, res);
    } catch (error) {
        console.error("Error in getRecords:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get('/getContactRecords', verifyToken, async (req, res) => {
    try {
        await getRecords(req, res);
    } catch (error) {
        console.error("Error in getRecords:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.post('/records', [
    body('phone1').notEmpty().withMessage('Name cannot be empty'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('phone2').notEmpty().withMessage('Message cannot be empty'),
    body('phone3').notEmpty().withMessage('Phone cannot be empty'),
    body('phone4').notEmpty().withMessage('Phone cannot be empty')
], async (req, res) => {
    try {
        await createRecord(req, res);
    } catch (error) {
        console.error("Error in createRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.put('/records/:id', verifyToken, async (req, res) => {
    try {
        await updateRecord(req, res);
    } catch (error) {
        console.error("Error in updateRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete('/records/:id', verifyToken, async (req, res) => {
    try {
        await deleteRecord(req, res);
    } catch (error) {
        console.error("Error in deleteRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
