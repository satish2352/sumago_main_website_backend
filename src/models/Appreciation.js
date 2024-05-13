const db = require('../../db');

function getAppreciation(callback) {
    try {
        db.query('SELECT * FROM Appreciation', callback);
    } catch (error) {
        callback(error, null);
    }
}

function createAppreciation(recordData, callback) {
    try {
        db.query('INSERT INTO Appreciation SET ?', recordData, callback);
    } catch (error) {
        callback(error, null);
    }
}

function updateAppreciation(id, recordData, callback) {
    try {
        db.query('UPDATE Appreciation SET ? WHERE id = ?', [recordData, id], callback);
    } catch (error) {
        callback(error, null);
    }
}

function deleteAppreciation(id, callback) {
    try {
        db.query('DELETE FROM Appreciation WHERE id = ?', id, callback);
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
