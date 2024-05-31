const db = require('../../db');

function getAllaboutmission(callback) {
    try {
        db.query('SELECT * FROM aboutmission', callback);
    } catch (error) {
        callback(error, null);
    }
}

function getaboutmission(title, callback) {
    try {
        db.query('SELECT * FROM aboutmission WHERE title = ?', title, callback);
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
    try {
        db.query('UPDATE aboutmission SET ? WHERE id = ?', [recordData, id], callback);
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
    getaboutmission,
    createaboutmission,
    updateaboutmission,
    deleteaboutmission,
    getAllaboutmission 
};
