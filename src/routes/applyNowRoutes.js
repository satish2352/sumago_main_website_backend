const express = require('express');
const { body } = require('express-validator');
const { getApplyNowRecord, createApplyNowRecord, updateApplyNowRecord, deleteApplyNowRecord } = require('../controllers/applyNowController');
const multer = require('multer');
// const upload = multer({ dest: 'uploads/' }); // Specify the directory where files will be stored
const { upload } = require("../controllers/applyNowController");
const router = express.Router();

router.get('/find', getApplyNowRecord);

router.post('/create', 
    upload.fields([{ name: 'cv', maxCount: 1 }, { name: 'cover_letter', maxCount: 1 }]), 
    [
        body('applicationType').notEmpty(),
        body('name').notEmpty().withMessage('name cannot be empty'),
        body('title').notEmpty().withMessage('title cannot be empty'),
        body('email').isEmail().withMessage('Email cannot be empty'),
        body('confmEmail').notEmpty().withMessage('Confirm Email cannot be empty').custom((value, { req }) => {
            if (value !== req.body.email) {
                throw new Error('Emails do not match');
            }
            return true;
        }),
        body('phone').notEmpty().withMessage('Phone cannot be empty').isLength({ min: 10, max: 10 }).withMessage('Phone must be 10 digits long'),
        body('address').notEmpty().withMessage('Address cannot be empty')
    ], 
    createApplyNowRecord);

router.put('/update/:id', updateApplyNowRecord);

router.delete('/delete/:id', deleteApplyNowRecord);

module.exports = router;
