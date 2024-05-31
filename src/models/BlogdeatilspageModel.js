const db = require('../../db');

function getBlogdetails(callback) {
    try {
        db.query('SELECT * FROM blogsdetails', callback);
    } catch (error) {
        callback(error, null);
    }
}
function getBlogdetailsById(id, callback) {
    try {
        db.query('SELECT * FROM blogsdetails WHERE id = ?', id, callback);
    } catch (error) {
        callback(error, null);
    }
}
function createBlogdetails(recordData, callback) {
    try {
        db.query('INSERT INTO blogsdetails SET ?', recordData, callback);
    } catch (error) {
        callback(error, null);
    }
}

function updateBlogdetails(id, recordData, callback) {
    if (Object.keys(recordData).length === 0) {
        return callback(new Error('No data provided to update'), null);
    }

    const fields = Object.keys(recordData).map(field => `${field} = ?`).join(', ');
    const values = Object.values(recordData);
    values.push(id);

    const query = `UPDATE blogsdetails SET ${fields} WHERE id = ?`;

    db.query(query, values, callback);
}

function deleteBlogdetails(id, callback) {
    try {
        db.query('DELETE FROM blogsdetails WHERE id = ?', id, callback);
    } catch (error) {
        callback(error, null);
    }
}

module.exports = {
    getBlogdetails,
    getBlogdetailsById,
    createBlogdetails,
    updateBlogdetails,
    deleteBlogdetails
};
