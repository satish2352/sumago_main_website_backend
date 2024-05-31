const db = require('../../db');

function getofferedservices(callback) {
    try {
        db.query('SELECT * FROM offeredservices', callback);
    } catch (error) {
        callback(error, null);
    }
}

function createofferedservices(recordData, callback) {
    try {
        db.query('INSERT INTO offeredservices SET ?', recordData, callback);
    } catch (error) {
        callback(error, null);
    }
}

function updateofferedservices(id, recordData, callback) {
    if (Object.keys(recordData).length === 0) {
        return callback(new Error('No data provided to update'), null);
    }

    const fields = Object.keys(recordData).map(field => `${field} = ?`).join(', ');
    const values = Object.values(recordData);
    values.push(id);

    const query = `UPDATE offeredservices SET ${fields} WHERE id = ?`;

    db.query(query, values, callback);
}

function deleteofferedservices(id, callback) {
    try {
        db.query('DELETE FROM offeredservices WHERE id = ?', id, callback);
    } catch (error) {
        callback(error, null);
    }
}

module.exports = {
    getofferedservices,
    createofferedservices,
    updateofferedservices,
    deleteofferedservices
};
