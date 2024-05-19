const express = require('express');
const { body } = require('express-validator');
const { getRecords, createRecord, updateRecord, deleteRecord } = require('../controllers/internshipOpeningController');
const verifyToken = require('../JWT/auth');

const router = express.Router();

router.get('/find', verifyToken, async (req, res) => {
    try {
        await getRecords(req, res);
    } catch (error) {
        console.error("Error in getRecords:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get('/getInternshipRecord', async (req, res) => {
    try {
        await getRecords(req, res);
    } catch (error) {
        console.error("Error in getRecords:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/create', verifyToken, [
    body('designation').notEmpty(),
    body('opening').notEmpty(),
    body('location').notEmpty(),
    body('qualification').notEmpty(),
], async (req, res) => {
    try {
        await createRecord(req, res);
    } catch (error) {
        console.error("Error in createRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.put('/update/:id', verifyToken, async (req, res) => {
    try {
        await updateRecord(req, res);
    } catch (error) {
        console.error("Error in updateRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete('/delete/:id', verifyToken, async (req, res) => {
    try {
        await deleteRecord(req, res);
    } catch (error) {
        console.error("Error in deleteRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
