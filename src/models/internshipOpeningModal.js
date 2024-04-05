// recordModel.js
const db = require('../../db');

function getAllRecords(callback) {
    db.query('SELECT * FROM internshipopening', callback);
}

function createRecord(recordData, callback) {
    db.query('INSERT INTO internshipopening SET ?', recordData, callback);
}

function updateRecord(id, recordData, callback) {
    db.query('UPDATE internshipopening SET ? WHERE id = ?', [recordData, id], callback);
}

function deleteRecord(id, callback) {
    db.query('DELETE FROM internshipopening WHERE id = ?', id, callback);
}

module.exports = {
    getAllRecords,
    createRecord,
    updateRecord,
    deleteRecord
};
