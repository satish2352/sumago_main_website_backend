// recordModel.js
const db = require('../../db');

function getAllRecords(callback) {
    db.query('SELECT * FROM lifecategory', callback);
}

function createRecord(recordData, callback) {
    db.query('INSERT INTO lifecategory SET ?', recordData, callback);
}

function updateRecord(id, recordData, callback) {
    db.query('UPDATE lifecategory SET ? WHERE id = ?', [recordData, id], callback);
}

function deleteRecord(id, callback) {
    db.query('DELETE FROM lifecategory WHERE id = ?', id, callback);
}

module.exports = {
    getAllRecords,
    createRecord,
    updateRecord,
    deleteRecord
};
