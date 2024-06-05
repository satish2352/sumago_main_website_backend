const express = require('express');
const { body } = require('express-validator');
const { getRecords, createRecord, updateRecord, deleteRecord } = require('../controllers/contactInfoController');
const verifyToken = require('../JWT/auth');

const router = express.Router();

router.get('/getContactInfo', verifyToken, async (req, res) => {
    await getRecords(req, res);
});

router.post('/createContactInfo', verifyToken, [
    body('phone1').notEmpty().withMessage('Phone1 is required'),
    body('phone2').notEmpty().withMessage('Phone2 is required'),
    body('phone3').notEmpty().withMessage('Phone3 is required'),
    body('email').isEmail().withMessage('Valid email is required'),
], async (req, res) => {
    await createRecord(req, res);
});

router.put('/updateContactInfo/:id', verifyToken, async (req, res) => {
    await updateRecord(req, res);
});

router.delete('/deleteContactInfo/:id', verifyToken, async (req, res) => {
    await deleteRecord(req, res);
});

module.exports = router;
