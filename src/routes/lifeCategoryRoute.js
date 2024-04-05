// recordsRoutes.js
const express = require('express');
const { body } = require('express-validator');
const { getLifeCategoryRecords, createLifeCategoryRecord, updateLifeCategoryRecord, deleteLifeCategoryRecord } = require('../controllers/lifeCategoryController');

const router = express.Router();

router.get('/find', getLifeCategoryRecords);

router.post('/create', [
    body('category').notEmpty(),
], createLifeCategoryRecord);

router.put('/update/:id', updateLifeCategoryRecord);

router.delete('/delete/:id', deleteLifeCategoryRecord);

module.exports = router;
