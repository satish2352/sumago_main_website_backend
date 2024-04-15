const db = require('../../db');

function getApplyNow(callback) {
    try {
        db.query('SELECT * FROM applynow', callback);
    } catch (error) {
        callback(error, null);
    }
}

function createApplyNow(recordData, callback) {
    try {
        db.query('INSERT INTO applynow SET ?', recordData, callback);
    } catch (error) {
        callback(error, null);
    }
}

function updateApplyNow(id, recordData, callback) {
    try {
        db.query('UPDATE applynow SET ? WHERE id = ?', [recordData, id], callback);
    } catch (error) {
        callback(error, null);
    }
}

function deleteApplyNow(id, callback) {
    try {
        db.query('DELETE FROM applynow WHERE id = ?', id, callback);
    } catch (error) {
        callback(error, null);
    }
}

module.exports = {
    getApplyNow,
    createApplyNow,
    updateApplyNow,
    deleteApplyNow
};
