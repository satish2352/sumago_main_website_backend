// recordsController.js
const { validationResult } = require('express-validator');
const recordModel = require('../models/quoteModal');

function getQuoteRecord(req, res) {
    recordModel.getAllQuote((err, results) => {
        if (err) {
            console.error('Error fetching records:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(results);
    });
}

function createQuoteRecord(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const recordData = req.body;
    recordModel.createQuote(recordData, (err, result) => {
        if (err) {
            console.error('Error creating record:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(201).json({ message: 'Record created successfully', result: recordData });
    });
}

function updateQuoteRecord(req, res) {
    const { id } = req.params;
    const recordData = req.body;
    recordModel.updateQuote(id, recordData, (err, result) => {
        if (err) {
            console.error('Error updating record:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.send('Record updated successfully');
    });
}

function deleteQuoteRecord(req, res) {
    const { id } = req.params;
    recordModel.deleteQuote(id, (err, result) => {
        if (err) {
            console.error('Error deleting record:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.send('Record deleted successfully');
    });
}

module.exports = {
    getQuoteRecord,
    createQuoteRecord,
    updateQuoteRecord,
    deleteQuoteRecord
};
