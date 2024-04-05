// recordModel.js
const db = require('../../db');

function getAllRecords(callback) {
    db.query('SELECT * FROM jobOpening', callback);
}

function createRecord(recordData, callback) {
    db.query('INSERT INTO jobOpening SET ?', recordData, callback);
}

function updateRecord(id, recordData, callback) {
    db.query('UPDATE jobOpening SET ? WHERE id = ?', [recordData, id], callback);
}

function deleteRecord(id, callback) {
    db.query('DELETE FROM jobOpening WHERE id = ?', id, callback);
}

module.exports = {
    getAllRecords,
    createRecord,
    updateRecord,
    deleteRecord
};
