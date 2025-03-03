const express = require('express');
const { body } = require('express-validator');
const { getQuoteRecord, createQuoteRecord, updateQuoteRecord, deleteQuoteRecord } = require('../controllers/quoteController');
const verifyToken = require('../JWT/auth');

const router = express.Router();

router.get('/find', async (req, res) => {
    try {
        await getQuoteRecord(req, res);
    } catch (error) {
        console.error("Error in getQuoteRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
router.get('/getQuote', verifyToken, async (req, res) => {
    try {
        await getQuoteRecord(req, res);
    } catch (error) {
        console.error("Error in getQuoteRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/create', [
    body('name').notEmpty().withMessage('Name cannot be empty'),
    body('phone').notEmpty().withMessage('Phone cannot be empty'),
    body('email').isEmail().withMessage('Invalid email format'),
    // body('services').notEmpty().withMessage('Service cannot be empty'),
    body('other_service').optional().isString().withMessage('Other service must be a string'),
    body('address').notEmpty().withMessage('Address cannot be empty'),
    // body('comment').notEmpty().withMessage('Comment cannot be empty')
], async (req, res) => {
    try {
        await createQuoteRecord(req, res);
    } catch (error) {
        console.error("Error in createQuoteRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


router.put('/update/:id', verifyToken, async (req, res) => {
    try {
        await updateQuoteRecord(req, res);
    } catch (error) {
        console.error("Error in updateQuoteRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.delete('/delete/:id', verifyToken, async (req, res) => {
    try {
        await deleteQuoteRecord(req, res);
    } catch (error) {
        console.error("Error in deleteQuoteRecord:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
