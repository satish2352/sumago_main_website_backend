// recordModel.js
const db = require('../../db');

function getlifeCategoryDetails(category, callback) {
    db.query('SELECT * FROM lifeCategoryDetails WHERE category = ?', category, callback);
}

function createlifeCategoryDetails(recordData, callback) {
    db.query('INSERT INTO lifeCategoryDetails SET ?', recordData, callback);
}

function updatelifeCategoryDetails(id, recordData, callback) {
    db.query('UPDATE lifeCategoryDetails SET ? WHERE id = ?', [recordData, id], callback);
}

function deletelifeCategoryDetails(id, callback) {
    db.query('DELETE FROM lifeCategoryDetails WHERE id = ?', id, callback);
}

module.exports = {
    getlifeCategoryDetails,
    createlifeCategoryDetails,
    updatelifeCategoryDetails,
    deletelifeCategoryDetails
};
