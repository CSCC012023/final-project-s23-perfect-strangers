const router = require('express').Router();
let EmailAuthModel = require('../models/emailAuth.model');

router.route('/').post((req, res) => {
    const { email, password } = req.body;
  
    // Find the user by email and password
    EmailAuthModel.findOne({ email: email, password: password })
      .then((user) => {
        if (user) {
          // Login successful
          res.json({ user: user });
        } else {
          // Invalid credentials
          res.json({ err: 'Invalid email or password' });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ err: 'Internal server error' });
      });
  });

module.exports = router;