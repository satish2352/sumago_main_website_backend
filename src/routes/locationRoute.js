// recordsRoutes.js
const express = require('express');
const { body } = require('express-validator');
const { getlocationRecords, createlocationRecord, updatelocationRecord, deletelocationRecord } = require('../controllers/locationController');

const router = express.Router();

router.get('/find', getlocationRecords);

router.post('/create', [
    body('address').notEmpty(),
    body('email').isEmail(),
    body('contact').notEmpty(),
    body('geolocation').notEmpty(),
], createlocationRecord);

router.put('/update/:id', updatelocationRecord);

router.delete('/delete/:id', deletelocationRecord);

module.exports = router;
