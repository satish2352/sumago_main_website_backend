// recordModel.js
const db = require('../../db');

function getAllRecords(callback) {
    db.query('SELECT * FROM lifeCategory', callback);
}

function createRecord(recordData, callback) {
    db.query('INSERT INTO lifeCategory SET ?', recordData, callback);
}

function updateRecord(id, recordData, callback) {
    db.query('UPDATE lifeCategory SET ? WHERE id = ?', [recordData, id], callback);
}

function deleteRecord(id, callback) {
    db.query('DELETE FROM lifeCategory WHERE id = ?', id, callback);
}

module.exports = {
    getAllRecords,
    createRecord,
    updateRecord,
    deleteRecord
};
