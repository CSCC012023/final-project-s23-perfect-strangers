const router = require('express').Router();
let EmailAuthModel = require('../models/emailAuth.model');

router.route('/').post(
    (req, res) => {
        const newEmailAuth = new EmailAuthModel({
            email: req.body.email,
            password: req.body.password,
            username: req.body.username
        });

        newEmailAuth.save()
            .then(() => res.json({
                msg: 'user created'
            }))
            .catch(err => {
                if(err.keyValue !== undefined && err.keyValue.email !== undefined) res.json({
                    msg: 'email taken',
                    err: err
                });
                else res.json({
                    msg: 'username taken',
                    err: err
                });
            })
    }
)

module.exports = router;