// recordsRoutes.js
const express = require('express');
const { body } = require('express-validator');
const { getRecords, createRecord, updateRecord, deleteRecord } = require('../controllers/jobOpeningController');

const router = express.Router();

router.get('/find', getRecords);

router.post('/create', [
    body('designation').notEmpty(),
    body('opening').notEmpty(),
    body('location').notEmpty(),
    body('qualification').notEmpty(),
], createRecord);

router.put('/update/:id', updateRecord);

router.delete('/delete/:id', deleteRecord);

module.exports = router;
