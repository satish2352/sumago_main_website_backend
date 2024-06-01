const db = require('../../db');

function getAllaboutmission(callback) {
    try {
        db.query('SELECT * FROM aboutmission', callback);
    } catch (error) {
        callback(error, null);
    }
}


function createaboutmission(recordData, callback) {
    try {
        db.query('INSERT INTO aboutmission SET ?', recordData, callback);
    } catch (error) {
        callback(error, null);
    }
}

function updateaboutmission(id, recordData, callback) {
    if (Object.keys(recordData).length === 0) {
        return callback(new Error('No data provided to update'), null);
    }

    const fields = Object.keys(recordData).map(field => `${field} = ?`).join(', ');
    const values = Object.values(recordData);
    values.push(id);

    const query = `UPDATE aboutmission SET ${fields} WHERE id = ?`;

    try {
        db.query(query, values, callback);
    } catch (error) {
        callback(error, null);
    }
}

function deleteaboutmission(id, callback) {
    try {
        db.query('DELETE FROM aboutmission WHERE id = ?', id, callback);
    } catch (error) {
        callback(error, null);
    }
}

module.exports = {
    createaboutmission,
    updateaboutmission,
    deleteaboutmission,
    getAllaboutmission
};
