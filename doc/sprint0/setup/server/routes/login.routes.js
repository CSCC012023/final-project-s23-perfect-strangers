const router = require('express').Router();
let EmailAuthModel = require('../models/emailAuth.model');
const jwt = require('jsonwebtoken');

router.route('/').post((req, res) => {
    const { email, password } = req.body;
  
    // Find the user by email and password
    EmailAuthModel.findOne({ email: email, password: password })
      .then((user) => {
        if (user) {
          // Login successful
          res.json({ user: user });
          try {
            const token = jwt.sign({ id: user._id }, "shhhhh", { expiresIn: "2h" });
            console.log(token);
            user.token = token;
            return user.save(); // Save the user with the updated token
          } catch (error) {
            throw new Error('Failed to generate token');
          }
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

router.route('/').get((req, res) => {
  if (req.headers && req.headers.authorization) {
    var authorization = req.headers.authorization.split(' ')[1],
            decoded;
        try {
            decoded = jwt.verify(authorization, "shhhhh");
        } catch (e) {
            return res.status(401).send('unauthorized');
        }

        var userId = decoded.id;

        EmailAuthModel.findOne({_id: userId}).then(function(user){
          res.json({ user: user });
      });
  }
});

module.exports = router;