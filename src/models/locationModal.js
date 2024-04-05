// recordModel.js
const db = require('../../db');

function getAllRecords(callback) {
    db.query('SELECT * FROM location', callback);
}

function createRecord(recordData, callback) {
    db.query('INSERT INTO location SET ?', recordData, callback);
}

function updateRecord(id, recordData, callback) {
    db.query('UPDATE location SET ? WHERE id = ?', [recordData, id], callback);
}

function deleteRecord(id, callback) {
    db.query('DELETE FROM location WHERE id = ?', id, callback);
}

module.exports = {
    getAllRecords,
    createRecord,
    updateRecord,
    deleteRecord
};
