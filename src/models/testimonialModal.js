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
    if (Object.keys(recordData).length === 0) {
        return callback(new Error('No data provided to update'), null);
    }

    const query = 'UPDATE testimonials SET ? WHERE id = ?';
    db.query(query, [recordData, id], callback);
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
