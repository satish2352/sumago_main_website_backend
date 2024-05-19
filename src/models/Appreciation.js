const db = require('../../db');

function getAppreciation(callback) {
    try {
        db.query('SELECT * FROM appreciation', callback);
    } catch (error) {
        callback(error, null);
    }
}

function createAppreciation(recordData, callback) {
    try {
        db.query('INSERT INTO appreciation SET ?', recordData, callback);
    } catch (error) {
        callback(error, null);
    }
}

function updateAppreciation(id, recordData, callback) {
    try {
        db.query('UPDATE appreciation SET ? WHERE id = ?', [recordData, id], callback);
    } catch (error) {
        callback(error, null);
    }
}

function deleteAppreciation(id, callback) {
    try {
        db.query('DELETE FROM appreciation WHERE id = ?', id, callback);
    } catch (error) {
        callback(error, null);
    }
}

module.exports = {
    getAppreciation,
    createAppreciation,
    updateAppreciation,
    deleteAppreciation
};
