const db = require('../../db');

function gettestimonials(callback) {
    try {
        db.query('SELECT * FROM testimonials', callback);
    } catch (error) {
        callback(error, null);
    }
}

function createtestimonials(recordData, callback) {
    try {
        db.query('INSERT INTO testimonials SET ?', recordData, callback);
    } catch (error) {
        callback(error, null);
    }
}

function updatetestimonials(id, recordData, callback) {
    try {
        db.query('UPDATE testimonials SET ? WHERE id = ?', [recordData, id], callback);
    } catch (error) {
        callback(error, null);
    }
}

function deletetestimonials(id, callback) {
    try {
        db.query('DELETE FROM testimonials WHERE id = ?', id, callback);
    } catch (error) {
        callback(error, null);
    }
}

module.exports = {
    gettestimonials,
    createtestimonials,
    updatetestimonials,
    deletetestimonials
};
