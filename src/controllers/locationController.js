// recordsController.js
const { validationResult } = require('express-validator');
const recordModel = require('../models/locationModal');

function getlocationRecords(req, res) {
    recordModel.getAllRecords((err, results) => {
        if (err) {
            console.error('Error fetching records:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(results);
    });
}

function createlocationRecord(req, res) {
    const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }

    const recordData = req.body;
    recordModel.createRecord(recordData, (err, result) => {
        if (err) {
            console.error('Error creating record:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(201).json({ message: 'Record created successfully', result: recordData });
    });
}

function updatelocationRecord(req, res) {
    const { id } = req.params;
    const recordData = req.body;
    recordModel.updateRecord(id, recordData, (err, result) => {
        if (err) {
            console.error('Error updating record:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.send('Record updated successfully');
    });
}

function deletelocationRecord(req, res) {
    const { id } = req.params;
    recordModel.deleteRecord(id, (err, result) => {
        if (err) {
            console.error('Error deleting record:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.send('Record deleted successfully');
    });
}

module.exports = {
    getlocationRecords,
    createlocationRecord,
    updatelocationRecord,
    deletelocationRecord
};