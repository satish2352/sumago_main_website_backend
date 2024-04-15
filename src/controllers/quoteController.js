// recordsController.js
const { validationResult } = require('express-validator');
const recordModel = require('../models/quoteModal');

function getQuoteRecord(req, res) {
    try {
        recordModel.getAllQuote((err, results) => {
            if (err) {
                console.error('Error fetching records:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.json(results);
        });
    } catch (error) {
        console.error('Error in getQuoteRecord:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

function createQuoteRecord(req, res) {
    try {
        const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        // }

        const recordData = req.body;
        recordModel.createQuote(recordData, (err, result) => {
            if (err) {
                console.error('Error creating record:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.status(201).json({ message: 'Record created successfully', result: recordData });
        });
    } catch (error) {
        console.error('Error in createQuoteRecord:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

function updateQuoteRecord(req, res) {
    try {
        const { id } = req.params;
        const recordData = req.body;
        recordModel.updateQuote(id, recordData, (err, result) => {
            if (err) {
                console.error('Error updating record:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.send('Record updated successfully');
        });
    } catch (error) {
        console.error('Error in updateQuoteRecord:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

function deleteQuoteRecord(req, res) {
    try {
        const { id } = req.params;
        recordModel.deleteQuote(id, (err, result) => {
            if (err) {
                console.error('Error deleting record:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            res.send('Record deleted successfully');
        });
    } catch (error) {
        console.error('Error in deleteQuoteRecord:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getQuoteRecord,
    createQuoteRecord,
    updateQuoteRecord,
    deleteQuoteRecord
};
