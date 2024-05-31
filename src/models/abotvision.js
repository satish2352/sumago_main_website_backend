const db = require('../../db');

function getAllaboutvision(callback) {
    try {
        db.query('SELECT * FROM aboutvision', callback);
    } catch (error) {
        callback(error, null);
    }
}

function getaboutvision(title, callback) {
    try {
        db.query('SELECT * FROM aboutvision WHERE title = ?', title, callback);
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
    try {
        db.query('UPDATE aboutvision SET ? WHERE id = ?', [recordData, id], callback);
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
    getaboutvision,
    createaboutvision,
    updateaboutvision,
    deleteaboutvision,
    getAllaboutvision 
};
