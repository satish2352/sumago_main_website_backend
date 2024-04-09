// recordModel.js
const db = require('../../db');

function getAllQuote(callback) {
    db.query('SELECT * FROM quotes', callback);
}

function createQuote(recordData, callback) {
    recordData.created_at = new Date();
    db.query('INSERT INTO quotes SET ?', recordData, callback);
}

function updateQuote(id, recordData, callback) {
    db.query('UPDATE quotes SET ? WHERE id = ?', [recordData, id], callback);
}

function deleteQuote(id, callback) {
    db.query('DELETE FROM quotes WHERE id = ?', id, callback);
}

module.exports = {
    getAllQuote,
    createQuote,
    updateQuote,
    deleteQuote
};
