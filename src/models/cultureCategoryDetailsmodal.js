const db = require('../../db');

function getAllCultureCategoryDetails(callback) {
    try {
        db.query('SELECT * FROM culturecategorydetails', callback);
    } catch (error) {
        callback(error, null);
    }
}

function getCultureCategoryDetails(category, callback) {
    try {
        db.query('SELECT * FROM culturecategorydetails WHERE category = ?', category, callback);
    } catch (error) {
        callback(error, null);
    }
}

function createCultureCategoryDetails(recordData, callback) {
    try {
        db.query('INSERT INTO culturecategorydetails SET ?', recordData, callback);
    } catch (error) {
        callback(error, null);
    }
}

function updateCultureCategoryDetails(id, recordData, callback) {
    try {
        db.query('UPDATE culturecategorydetails SET ? WHERE id = ?', [recordData, id], callback);
    } catch (error) {
        callback(error, null);
    }
}

function deleteCultureCategoryDetails(id, callback) {
    try {
        db.query('DELETE FROM culturecategorydetails WHERE id = ?', id, callback);
    } catch (error) {
        callback(error, null);
    }
}

module.exports = {
    getCultureCategoryDetails,
    createCultureCategoryDetails,
    updateCultureCategoryDetails,
    deleteCultureCategoryDetails,
    getAllCultureCategoryDetails 
};
