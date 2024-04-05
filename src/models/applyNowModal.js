// recordModel.js
const db = require('../../db');

function getApplyNow(callback) {
    db.query('SELECT * FROM applyNow', callback);
}

function createApplyNow(recordData, callback) {
    db.query('INSERT INTO applyNow SET ?', recordData, callback);
}

function updateApplyNow(id, recordData, callback) {
    db.query('UPDATE applyNow SET ? WHERE id = ?', [recordData, id], callback);
}

function deleteApplyNow(id, callback) {
    db.query('DELETE FROM applyNow WHERE id = ?', id, callback);
}

module.exports = {
    getApplyNow,
    createApplyNow,
    updateApplyNow,
    deleteApplyNow
};
