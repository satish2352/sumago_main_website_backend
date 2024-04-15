const express = require('express');
const { body } = require('express-validator');
const { getlocationRecords, createlocationRecord, updatelocationRecord, deletelocationRecord } = require('../controllers/locationController');

const router = express.Router();

router.get('/find', async (req, res) => {
    try {
        await getlocationRecords(req, res);
    } catch (error) {
        console.error("Error in getlocationRecords:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/create', [
    body('address').notEmpty().withMessage('Address cannot be empty'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('contact').notEmpty().withMessage('Contact cannot be empty'),
    body('geolocation').notEmpty().withMessage('Geolocation cannot be empty'),
], async (req, res) => {
    try {
        await createlocationRecord(req, res);
    } catch (error) {
        console.error("Error in createlocationRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        await updatelocationRecord(req, res);
    } catch (error) {
        console.error("Error in updatelocationRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        await deletelocationRecord(req, res);
    } catch (error) {
        console.error("Error in deletelocationRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
