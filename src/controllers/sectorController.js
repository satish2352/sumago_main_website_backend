// recordsController.js
const { validationResult } = require('express-validator');
const recordModel = require('../models/sectorModel');

function getsectorsRecords(req, res) {
    try {
        recordModel.getAllsectorsRecords((err, results) => {
            if (err) {
                console.error('Error fetching records:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.json(results);
        });
    } catch (error) {
        console.error('Error in getsectorsRecords:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

function createsectorsRecord(req, res) {
    try {
        const errors = validationResult(req);
        const recordData = req.body;
        recordModel.createsectorsRecord(recordData, (err, result) => {
            if (err) {
                console.error('Error creating record:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.status(201).json({ message: 'Record created successfully', result: recordData });
        });
    } catch (error) {
        console.error('Error in createsectorsRecord:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

function updatesectorsRecord(req, res) {
    try {
        const { id } = req.params;
        const recordData = req.body;
        recordModel.updatesectorsRecord(id, recordData, (err, result) => {
            if (err) {
                console.error('Error updating record:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.send('Record updated successfully');
        });
    } catch (error) {
        console.error('Error in updatesectorsRecord:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

function deletesectorsRecord(req, res) {
    try {
        const { id } = req.params;
        recordModel.deletesectorsRecord(id, (err, result) => {
            if (err) {
                console.error('Error deleting record:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.send('Record deleted successfully');
        });
    } catch (error) {
        console.error('Error in deletesectorsRecord:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getsectorsRecords,
    createsectorsRecord,
    updatesectorsRecord,
    deletesectorsRecord
};
