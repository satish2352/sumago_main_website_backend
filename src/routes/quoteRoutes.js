// recordsRoutes.js
const express = require('express');
const { body } = require('express-validator');
const { getQuoteRecord, createQuoteRecord, updateQuoteRecord, deleteQuoteRecord } = require('../controllers/quoteController');

const router = express.Router();

router.get('/find', getQuoteRecord);

router.post('/create', [
    body('name').notEmpty().withMessage('Name cannot be empty'),
    body('phone').notEmpty().withMessage('Phone cannot be empty'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('service').notEmpty().withMessage('Service cannot be empty'),
    body('other_service').notEmpty().withMessage('Other_service cannot be empty'),
    body('address').notEmpty().withMessage('Address cannot be empty'),
    body('comment').notEmpty().withMessage('Comment cannot be empty')
], createQuoteRecord);

router.put('/update/:id', updateQuoteRecord);

router.delete('/delete/:id', deleteQuoteRecord);

module.exports = router;
