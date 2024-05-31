const db = require('../../db');

function gethomecards(callback) {
    try {
        db.query('SELECT * FROM sectors', callback);
    } catch (error) {
        callback(error, null);
    }
}

function createhomecards(recordData, callback) {
    try {
        db.query('INSERT INTO sectors SET ?', recordData, callback);
    } catch (error) {
        callback(error, null);
    }
}

function updatehomecards(id, recordData, callback) {
    if (Object.keys(recordData).length === 0) {
        return callback(new Error('No data provided to update'), null);
    }

    const fields = Object.keys(recordData).map(field => `${field} = ?`).join(', ');
    const values = Object.values(recordData);
    values.push(id);

    const query = `UPDATE sectors SET ${fields} WHERE id = ?`;

    db.query(query, values, callback);
}

function deletehomecards(id, callback) {
    try {
        db.query('DELETE FROM sectors WHERE id = ?', id, callback);
    } catch (error) {
        callback(error, null);
    }
}

module.exports = {
    gethomecards,
    createhomecards,
    updatehomecards,
    deletehomecards
};
