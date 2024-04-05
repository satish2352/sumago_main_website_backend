// recordModel.js
const db = require('../../db');

function getlifeCategoryDetails(category, callback) {
    db.query('SELECT * FROM lifecategorydetails WHERE category = ?', category, callback);
}

function createlifeCategoryDetails(recordData, callback) {
    db.query('INSERT INTO lifecategorydetails SET ?', recordData, callback);
}

function updatelifeCategoryDetails(id, recordData, callback) {
    db.query('UPDATE lifecategorydetails SET ? WHERE id = ?', [recordData, id], callback);
}

function deletelifeCategoryDetails(id, callback) {
    db.query('DELETE FROM lifecategorydetails WHERE id = ?', id, callback);
}

module.exports = {
    getlifeCategoryDetails,
    createlifeCategoryDetails,
    updatelifeCategoryDetails,
    deletelifeCategoryDetails
};
