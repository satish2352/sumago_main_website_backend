const db = require('../../db');

function getwhysumago(callback) {
    try {
        db.query('SELECT * FROM whysumago', callback);
    } catch (error) {
        callback(error, null);
    }
}

function createwhysumago(recordData, callback) {
    try {
        db.query('INSERT INTO whysumago SET ?', recordData, callback);
    } catch (error) {
        callback(error, null);
    }
}

function updatewhysumago(id, recordData, callback) {
    if (Object.keys(recordData).length === 0) {
        return callback(new Error('No data provided to update'), null);
    }

    const fields = Object.keys(recordData).map(field => `${field} = ?`).join(', ');
    const values = Object.values(recordData);
    values.push(id);

    const query = `UPDATE whysumago SET ${fields} WHERE id = ?`;

    db.query(query, values, callback);
}

function deletewhysumago(id, callback) {
    try {
        db.query('DELETE FROM whysumago WHERE id = ?', id, callback);
    } catch (error) {
        callback(error, null);
    }
}

module.exports = {
    getwhysumago,
    createwhysumago,
    updatewhysumago,
    deletewhysumago
};
