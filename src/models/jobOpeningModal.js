// recordModel.js
const db = require('../../db');

function getAllRecords(callback) {
    db.query('SELECT * FROM jobopening', callback);
}

function createRecord(recordData, callback) {
    db.query('INSERT INTO jobopening SET ?', recordData, callback);
}

function updateRecord(id, recordData, callback) {
    db.query('UPDATE jobopening SET ? WHERE id = ?', [recordData, id], callback);
}

function deleteRecord(id, callback) {
    db.query('DELETE FROM jobopening WHERE id = ?', id, callback);
}

module.exports = {
    getAllRecords,
    createRecord,
    updateRecord,
    deleteRecord
};
