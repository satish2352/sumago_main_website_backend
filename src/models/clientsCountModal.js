// recordModel.js
const db = require('../../db');

function getAllRecords(callback) {
    db.query('SELECT * FROM clientCount', callback);
}

function createRecord(recordData, callback) {
    db.query('INSERT INTO clientCount SET ?', recordData, callback);
}

function updateRecord(id, recordData, callback) {
    db.query('UPDATE clientCount SET ? WHERE id = ?', [recordData, id], callback);
}

function deleteRecord(id, callback) {
    db.query('DELETE FROM clientCount WHERE id = ?', id, callback);
}

module.exports = {
    getAllRecords,
    createRecord,
    updateRecord,
    deleteRecord
};
