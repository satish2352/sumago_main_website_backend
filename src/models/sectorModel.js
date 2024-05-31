const db = require('../../db');

function getAllsectorsRecords(callback) {
    try {
        db.query('SELECT * FROM sectors', callback);
    } catch (error) {
        callback(error, null);
    }
}

function createsectorsRecord(recordData, callback) {
    try {
        db.query('INSERT INTO sectors SET ?', recordData, callback);
    } catch (error) {
        callback(error, null);
    }
}

function updatesectorsRecord(id, recordData, callback) {
    try {
        db.query('UPDATE sectors SET ? WHERE id = ?', [recordData, id], callback);
    } catch (error) {
        callback(error, null);
    }
}

function deletesectorsRecord(id, callback) {
    try {
        db.query('DELETE FROM culturecategory WHERE id = ?', id, callback);
    } catch (error) {
        callback(error, null);
    }
}

module.exports = {
    getAllsectorsRecords,
    createsectorsRecord,
    updatesectorsRecord,
    deletesectorsRecord
};
