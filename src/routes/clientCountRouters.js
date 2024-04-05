// recordsRoutes.js
const express = require('express');
const { body } = require('express-validator');
const { getRecords, createRecord, updateRecord, deleteRecord } = require('../controllers/clientsCountController');

const router = express.Router();

router.get('/find', getRecords);

router.post('/create', [
    body('counter').notEmpty(),
    body('name').notEmpty(),
], createRecord);

router.put('/update/:id', updateRecord);

router.delete('/delete/:id', deleteRecord);

module.exports = router;
