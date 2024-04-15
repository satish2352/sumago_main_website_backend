const db = require('../../db');

function getAllQuote(callback) {
    try {
        db.query('SELECT * FROM quotes', callback);
    } catch (error) {
        callback(error, null);
    }
}

function createQuote(recordData, callback) {
    try {
        recordData.created_at = new Date();
        db.query('INSERT INTO quotes SET ?', recordData, callback);
    } catch (error) {
        callback(error, null);
    }
}

function updateQuote(id, recordData, callback) {
    try {
        db.query('UPDATE quotes SET ? WHERE id = ?', [recordData, id], callback);
    } catch (error) {
        callback(error, null);
    }
}

function deleteQuote(id, callback) {
    try {
        db.query('DELETE FROM quotes WHERE id = ?', id, callback);
    } catch (error) {
        callback(error, null);
    }
}

module.exports = {
    getAllQuote,
    createQuote,
    updateQuote,
    deleteQuote
};
