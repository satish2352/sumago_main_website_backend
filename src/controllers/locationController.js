// recordsController.js
const { validationResult } = require('express-validator');
const recordModel = require('../models/locationModal');

function getlocationRecords(req, res) {
    try {
        recordModel.getAllRecords((err, results) => {
            if (err) {
                console.error('Error fetching records:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            return res.status(200).json(results);
            
        });
    } catch (error) {
        console.error('Error in getlocationRecords:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

function createlocationRecord(req, res) {
    try {
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
    } catch (error) {
        console.error('Error in createlocationRecord:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

function updatelocationRecord(req, res) {
    try {
        const { id } = req.params;
        const recordData = req.body;
        recordModel.updateRecord(id, recordData, (err, result) => {
            if (err) {
                console.error('Error updating record:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.send('Record updated successfully');
        });
    } catch (error) {
        console.error('Error in updatelocationRecord:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

function deletelocationRecord(req, res) {
    try {
        const { id } = req.params;
        recordModel.deleteRecord(id, (err, result) => {
            if (err) {
                console.error('Error deleting record:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.send('Record deleted successfully');
        });
    } catch (error) {
        console.error('Error in deletelocationRecord:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getlocationRecords,
    createlocationRecord,
    updatelocationRecord,
    deletelocationRecord
};
