const express = require('express');
const { body } = require('express-validator');
const { getsectorsRecords, createsectorsRecord, updatesectorsRecord, deletesectorsRecord } = require('../controllers/sectorController');
const verifyToken = require('../JWT/auth');

const router = express.Router();

router.get('/getsectors', verifyToken, async (req, res) => {
    try {
        await getsectorsRecords(req, res);
    } catch (error) {
        console.error("Error in getsectorsRecords:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get('/getsectorsRecord', async (req, res) => {
    try {
        await getsectorsRecords(req, res);
    } catch (error) {
        console.error("Error in getsectorsRecords:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/createsectors', [
    body('title').notEmpty().withMessage('Category cannot be empty'),
], async (req, res) => {
    try {
        await createsectorsRecord(req, res);
    } catch (error) {
        console.error("Error in createsectorsRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.put('/update/:id', verifyToken, async (req, res) => {
    try {
        await updatesectorsRecord(req, res);
    } catch (error) {
        console.error("Error in updatesectorsRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete('/delete/:id', verifyToken, async (req, res) => {
    try {
        await deletesectorsRecord(req, res);
    } catch (error) {
        console.error("Error in deletesectorsRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
