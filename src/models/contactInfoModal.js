const db = require('../../db');

function getAllRecords(callback) {
    db.query('SELECT * FROM contactinfoset', callback);
}

function createRecord(recordData, callback) {
    db.query('INSERT INTO contactinfoset SET ?', recordData, callback);
}

function updateRecord(id, recordData, callback) {
    db.query('UPDATE contactinfoset SET ? WHERE id = ?', [recordData, id], callback);
}

function deleteRecord(id, callback) {
    db.query('DELETE FROM contactinfoset WHERE id = ?', id, callback);
}

module.exports = {
    getAllRecords,
    createRecord,
    updateRecord,
    deleteRecord
};
