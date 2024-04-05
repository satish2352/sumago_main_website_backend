// recordModel.js
const db = require('../../db');

function getAllRecords(callback) {
    db.query('SELECT * FROM clientcount', callback);
}

function createRecord(recordData, callback) {
    db.query('INSERT INTO clientcount SET ?', recordData, callback);
}

function updateRecord(id, recordData, callback) {
    db.query('UPDATE clientcount SET ? WHERE id = ?', [recordData, id], callback);
}

function deleteRecord(id, callback) {
    db.query('DELETE FROM clientcount WHERE id = ?', id, callback);
}

module.exports = {
    getAllRecords,
    createRecord,
    updateRecord,
    deleteRecord
};
