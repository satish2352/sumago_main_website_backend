const db = require('../../db');

function gethometechnologies(callback) {
    try {
        db.query('SELECT * FROM hometechnologies', callback);
    } catch (error) {
        callback(error, null);
    }
}

function createhometechnologies(recordData, callback) {
    try {
        db.query('INSERT INTO hometechnologies SET ?', recordData, callback);
    } catch (error) {
        callback(error, null);
    }
}

function updatehometechnologies(id, recordData, callback) {
    if (Object.keys(recordData).length === 0) {
        return callback(new Error('No data provided to update'), null);
    }

    const fields = Object.keys(recordData).map(field => `${field} = ?`).join(', ');
    const values = Object.values(recordData);
    values.push(id);

    const query = `UPDATE hometechnologies SET ${fields} WHERE id = ?`;

    db.query(query, values, callback);
}

function deletehometechnologies(id, callback) {
    try {
        db.query('DELETE FROM hometechnologies WHERE id = ?', id, callback);
    } catch (error) {
        callback(error, null);
    }
}

module.exports = {
    gethometechnologies,
    createhometechnologies,
    updatehometechnologies,
    deletehometechnologies
};
