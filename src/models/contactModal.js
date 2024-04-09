// recordModel.js
const db = require('../../db');

function getAllRecords(callback) {
    db.query('SELECT * FROM contact', callback);
}

function createRecord(recordData, callback) {
    recordData.created_at = new Date();
    db.query('INSERT INTO contact SET ?', recordData, callback);
}

function updateRecord(id, recordData, callback) {
    db.query('UPDATE contact SET ? WHERE id = ?', [recordData, id], callback);
}

function deleteRecord(id, callback) {
    db.query('DELETE FROM contact WHERE id = ?', id, callback);
}

module.exports = {
    getAllRecords,
    createRecord,
    updateRecord,
    deleteRecord
};
