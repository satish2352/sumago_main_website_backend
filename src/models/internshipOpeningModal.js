// recordModel.js
const db = require('../../db');

function getAllRecords(callback) {
    db.query('SELECT * FROM internshipOpening', callback);
}

function createRecord(recordData, callback) {
    db.query('INSERT INTO internshipOpening SET ?', recordData, callback);
}

function updateRecord(id, recordData, callback) {
    db.query('UPDATE internshipOpening SET ? WHERE id = ?', [recordData, id], callback);
}

function deleteRecord(id, callback) {
    db.query('DELETE FROM internshipOpening WHERE id = ?', id, callback);
}

module.exports = {
    getAllRecords,
    createRecord,
    updateRecord,
    deleteRecord
};
