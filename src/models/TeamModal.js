const db = require('../../db');

function getteam(callback) {
    try {
        db.query('SELECT * FROM team', callback);
    } catch (error) {
        callback(error, null);
    }
}

function createteam(recordData, callback) {
    try {
        db.query('INSERT INTO team SET ?', recordData, callback);
    } catch (error) {
        callback(error, null);
    }
}

function updateteam(id, recordData, callback) {
    try {
        db.query('UPDATE team SET ? WHERE id = ?', [recordData, id], callback);
    } catch (error) {
        callback(error, null);
    }
}

function deleteteam(id, callback) {
    try {
        db.query('DELETE FROM team WHERE id = ?', id, callback);
    } catch (error) {
        callback(error, null);
    }
}

module.exports = {
    getteam,
    createteam,
    updateteam,
    deleteteam
};
