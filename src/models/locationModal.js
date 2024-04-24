const db = require('../../db');

function getAllRecords(callback) {
    try {
        db.query('SELECT * FROM location', callback);
        next()
    } catch (error) {
        callback(error, null);
    }
}

function createRecord(recordData, callback) {
    try {
        db.query('INSERT INTO location SET ?', recordData, callback);
    } catch (error) {
        callback(error, null);
    }
}

function updateRecord(id, recordData, callback) {
    try {
        db.query('UPDATE location SET ? WHERE id = ?', [recordData, id], callback);
    } catch (error) {
        callback(error, null);
    }
}

function deleteRecord(id, callback) {
    try {
        db.query('DELETE FROM location WHERE id = ?', id, callback);
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
