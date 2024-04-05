// recordModel.js
const db = require('../../db');

function gettestimonials(category, callback) {
    db.query('SELECT * FROM testimonials', callback);
}

function createtestimonials(recordData, callback) {
    db.query('INSERT INTO testimonials SET ?', recordData, callback);
}

function updatetestimonials(id, recordData, callback) {
    db.query('UPDATE testimonials SET ? WHERE id = ?', [recordData, id], callback);
}

function deletetestimonials(id, callback) {
    db.query('DELETE FROM testimonials WHERE id = ?', id, callback);
}

module.exports = {
    gettestimonials,
    createtestimonials,
    updatetestimonials,
    deletetestimonials
};
