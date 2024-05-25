const db = require('../../db');

function gethomeslider(callback) {
    try {
        db.query('SELECT * FROM homeslider', callback);
    } catch (error) {
        callback(error, null);
    }
}

function createhomeslider(recordData, callback) {
    try {
        db.query('INSERT INTO homeslider SET ?', recordData, callback);
    } catch (error) {
        callback(error, null);
    }
}

function updatehomeslider(id, recordData, callback) {
    if (Object.keys(recordData).length === 0) {
        return callback(new Error('No data provided to update'), null);
    }

    const fields = Object.keys(recordData).map(field => `${field} = ?`).join(', ');
    const values = Object.values(recordData);
    values.push(id);

    const query = `UPDATE homeslider SET ${fields} WHERE id = ?`;

    db.query(query, values, callback);
}

function deletehomeslider(id, callback) {
    try {
        db.query('DELETE FROM homeslider WHERE id = ?', id, callback);
    } catch (error) {
        callback(error, null);
    }
}

module.exports = {
    gethomeslider,
    createhomeslider,
    updatehomeslider,
    deletehomeslider
};
