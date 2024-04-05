// recordsRoutes.js
const express = require('express');
const { body } = require('express-validator');
const { getRecords, createRecord, updateRecord, deleteRecord } = require('../controllers/contactController');

const router = express.Router();

router.get('/records', getRecords);

router.post('/records', [
    body('name').notEmpty().withMessage('Name cannot be empty'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('message').notEmpty().withMessage('message cannot be empty'),
    body('phone').notEmpty().withMessage('Phone cannot be empty').isLength({ min: 10, max: 10 }).withMessage('Phone must be 10 digits long'),
    body('website').notEmpty().notEmpty().withMessage('Website cannot be empty')
], createRecord);

router.put('/records/:id', updateRecord);

router.delete('/records/:id', deleteRecord);

module.exports = router;
