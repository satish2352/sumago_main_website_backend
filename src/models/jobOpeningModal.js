const db = require('../../db');

function getAllRecords(callback) {
    try {
        db.query('SELECT * FROM jobopening', callback);
    } catch (error) {
        callback(error, null);
    }
}

function createRecord(recordData, callback) {
    try {
        db.query('INSERT INTO jobopening SET ?', recordData, callback);
    } catch (error) {
        callback(error, null);
    }
}

function updateRecord(id, recordData, callback) {
    try {
        db.query('UPDATE jobopening SET ? WHERE id = ?', [recordData, id], callback);
    } catch (error) {
        callback(error, null);
    }
}

function deleteRecord(id, callback) {
    try {
        db.query('DELETE FROM jobopening WHERE id = ?', id, callback);
    } catch (error) {
        callback(error, null);
    }
}

module.exports = {
    getAllRecords,
    createRecord,
    updateRecord,
    deleteRecord
};
