const router = require('express').Router();
let EmailAuthModel = require('../models/emailAuth.model');
const jwt = require('jsonwebtoken');

router.route('/').post(             // post request used for signup
    (req, res) => {
        const newEmailAuth = new EmailAuthModel({       // create a new document with EmailAuthModel
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
        });

        newEmailAuth.save()             // save the document
            .then(() => res.json({      // if successful, send success message
                msg: 'user created',
                token: jwt.sign({id: newEmailAuth._id}, "shhhhh", {expiresIn: "2h"})
            }))
            .catch(err => {             // if not, then send an error message 
                                        // (dont use status, we don't want to escape from the program)
                if(err.keyValue !== undefined && err.keyValue.email !== undefined)
                res.json({
                    msg: 'email taken',
                    err: err
                });
                else res.json({
                    msg: 'username taken',
                    err: err
                });
            })
        
        if(newEmailAuth.msg === 'user created'){
            const token = jwt.sign({id: newEmailAuth._id}, "shhhhh", {expiresIn: "2h"});
            user.token = token;
        }
    }
)


module.exports = router;