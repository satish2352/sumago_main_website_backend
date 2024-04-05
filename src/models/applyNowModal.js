// recordModel.js
const db = require('../../db');

function getApplyNow(callback) {
    db.query('SELECT * FROM applynow', callback);
}

function createApplyNow(recordData, callback) {
    db.query('INSERT INTO applynow SET ?', recordData, callback);
}

function updateApplyNow(id, recordData, callback) {
    db.query('UPDATE applynow SET ? WHERE id = ?', [recordData, id], callback);
}

function deleteApplyNow(id, callback) {
    db.query('DELETE FROM applynow WHERE id = ?', id, callback);
}

module.exports = {
    getApplyNow,
    createApplyNow,
    updateApplyNow,
    deleteApplyNow
};
