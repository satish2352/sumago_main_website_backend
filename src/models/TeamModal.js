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
    if (Object.keys(recordData).length === 0) {
        return callback(new Error('No data provided to update'), null);
    }

    const query = 'UPDATE team SET ? WHERE id = ?';
    db.query(query, [recordData, id], callback);
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
