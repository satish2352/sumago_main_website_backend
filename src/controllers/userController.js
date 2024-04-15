const userModel = require('../models/userModel');

function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    userModel.getUserByEmail(email, (err, results) => {
      if (err) {
        console.error('Error in loginUser:', err); // Log the error
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        if (results.length === 0) {
          res.status(401).json({ message: 'User not found' });
        } else {
          const user = results[0];
          if (user.password === password) {
            res.status(200).json({ message: 'Login successful' });
          } else {
            res.status(401).json({ message: 'Incorrect password' });
          }
        }
      }
    });
  } catch (error) {
    console.error('Error in loginUser:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = {
  loginUser
};
