const db = require('../../db');

function getblogcategory(callback) {
    try {
        db.query('SELECT * FROM blogcategory', callback);
    } catch (error) {
        callback(error, null);
    }
}

// function createblogcategory(recordData, callback) {
//     try {
//         db.query('INSERT INTO blogcategory SET ?', recordData, callback);
//     } catch (error) {
//         callback(error, null);
//     }
// }

// function updateblogcategory(id, recordData, callback) {
//     if (Object.keys(recordData).length === 0) {
//         return callback(new Error('No data provided to update'), null);
//     }

//     const fields = Object.keys(recordData).map(field => `${field} = ?`).join(', ');
//     const values = Object.values(recordData);
//     values.push(id);

//     const query = `UPDATE blogcategory SET ${fields} WHERE id = ?`;

//     db.query(query, values, callback);
// }

// function deleteblogcategory(id, callback) {
//     try {
//         db.query('DELETE FROM blogcategory WHERE id = ?', id, callback);
//     } catch (error) {
//         callback(error, null);
//     }
// }

module.exports = {
    getblogcategory,
    // createblogcategory,
    // updateblogcategory,
    // deleteblogcategory
};
