const { validationResult } = require('express-validator');
const recordModel = require('../models/applyNowModal');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Specify the directory where files will be stored


function getApplyNowRecord(req, res) {
    recordModel.getApplyNow((err, results) => {
        if (err) {
            console.error('Error fetching records:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(results);
    });
}

function createApplyNowRecord(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const recordData = req.body;
    const cvFile = req.files['cv'][0]; // Uploaded CV file
    const coverLetterFile = req.files['cover_letter'][0]; // Uploaded cover letter file

    // Assuming 'cv' and 'cover_letter' are the fields in the applyNow table to store file names
    recordData.cv = cvFile.filename;
    recordData.cover_letter = coverLetterFile.filename;

    recordModel.createApplyNow(recordData, (err, result) => {
        if (err) {
            console.error('Error creating record:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(201).json({ message: 'Record created successfully', result: recordData });
    });
}

function updateApplyNowRecord(req, res) {
    const { id } = req.params;
    const recordData = req.body;
    recordModel.updateApplyNow(id, recordData, (err, result) => {
        if (err) {
            console.error('Error updating record:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.send('Record updated successfully');
    });
}

function deleteApplyNowRecord(req, res) {
    const { id } = req.params;
    recordModel.deleteApplyNow(id, (err, result) => {
        if (err) {
            console.error('Error deleting record:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.send('Record deleted successfully');
    });
}

module.exports = {
    getApplyNowRecord,
    createApplyNowRecord,
    updateApplyNowRecord,
    deleteApplyNowRecord
};
