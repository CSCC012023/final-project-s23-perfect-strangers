const router = require('express').Router();
let EmailAuthModel = require('../models/emailAuth.model');
const sendEmail = require("../utils/sendAuthEmail");

router.route('/').post(             // post request used for signup
    (req, res) => {
        const newEmailAuth = new EmailAuthModel({       // create a new document with EmailAuthModel
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
        });

        newEmailAuth.save()             // save the document
            .then(() => res.json({      // if successful, send success message
                msg: 'user created'
            }))
            .catch(err => {             // if not, then send an error message 
                                        // (dont use status, we don't want to escape from the program)
                res.json({ msg: 'email taken', err: err});
            })
        
        const url =  "verification email here"//`${process.env.BASE_URL}emailAuth/${newEmailAuth._id}/verify`;
        sendEmail(newEmailAuth.email, "GOGO Verification Email", url);
    }
)

// Email verification WIP:
// router.get("/:id/verify"), async(req, res) => {
//     try{
//         const user = await EmailAuthModel.findOne({_id:req.params.id});
//         if (!user) return res.status(400).send({msg: "invalid link"});

//         await EmailAuthModel.updateOne({_id: user._id, verify: true});
        
//         res.status(200).send({msg: "Email verified successfully"})
//     }catch(err){
//         res.status(200).send({msg: "Email verify failed"})
//     }
// }

module.exports = router;