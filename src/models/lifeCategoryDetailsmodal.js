const db = require('../../db');

function getAllLifeCategoryDetails(callback) {
    try {
        db.query('SELECT * FROM lifecategorydetails', callback);
    } catch (error) {
        callback(error, null);
    }
}

function getlifeCategoryDetails(category, callback) {
    try {
        db.query('SELECT * FROM lifecategorydetails WHERE category = ?', category, callback);
    } catch (error) {
        callback(error, null);
    }
}

function createlifeCategoryDetails(recordData, callback) {
    try {
        db.query('INSERT INTO lifecategorydetails SET ?', recordData, callback);
    } catch (error) {
        callback(error, null);
    }
}

function updatelifeCategoryDetails(id, recordData, callback) {
    try {
        db.query('UPDATE lifecategorydetails SET ? WHERE id = ?', [recordData, id], callback);
    } catch (error) {
        callback(error, null);
    }
}

function deletelifeCategoryDetails(id, callback) {
    try {
        db.query('DELETE FROM lifecategorydetails WHERE id = ?', id, callback);
    } catch (error) {
        callback(error, null);
    }
}

module.exports = {
    getlifeCategoryDetails,
    createlifeCategoryDetails,
    updatelifeCategoryDetails,
    deletelifeCategoryDetails,
    getAllLifeCategoryDetails 
};
