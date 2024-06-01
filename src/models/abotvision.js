const db = require('../../db');

function getAllaboutvision(callback) {
    try {
        db.query('SELECT * FROM aboutvision', callback);
    } catch (error) {
        callback(error, null);
    }
}



function createaboutvision(recordData, callback) {
    try {
        db.query('INSERT INTO aboutvision SET ?', recordData, callback);
    } catch (error) {
        callback(error, null);
    }
}


function updateaboutvision(id, recordData, callback) {
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


function deleteaboutvision(id, callback) {
    try {
        db.query('DELETE FROM aboutvision WHERE id = ?', id, callback);
    } catch (error) {
        callback(error, null);
    }
}

module.exports = {
    createaboutvision,
    updateaboutvision,
    deleteaboutvision,
    getAllaboutvision 
};
