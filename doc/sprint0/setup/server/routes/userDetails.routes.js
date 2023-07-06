const router = require('express').Router();
let UserDetailsModel = require('../models/userDetails.model');

router.route('/').post(
    (req, res) => {
        const newUserDetails = new UserDetailsModel({
            email: req.body.email,
            age: req.body.age,
            gender: req.body.gender,
        })

        newUserDetails.save()
        .then(() => res.json({
            msg: 'user details added',
        }))
        .catch(err => res.json({
            msg: 'user details could not be added',
            err: err,
        }))
    }
);

module.exports = router;