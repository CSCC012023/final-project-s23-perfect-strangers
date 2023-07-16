const router = require("express").Router();
const EmailAuthModel = require("../models/emailAuth.model");
const BusinessDetailsModel = require("../models/businessDetails.model");

router.route("/create").post((req, res) => {
    newEmailAuth = new EmailAuthModel({
        email: req.body.email,
        password: req.body.password,
        username: req.body.businessName,
        isBusiness: true,
    });
    newEmailAuth
        .save()
        .then(() => {
            // email authorization is saved
            newBusiness = new BusinessDetailsModel({
                email: req.body.email,
                businessName: req.body.businessName,
            });
            newBusiness
                .save()
                .then(() =>
                    res.json({ msg: "business created", business: newBusiness })
                ) // business info saved
                .catch(err => res.json({ err: err })); // business info not saved
        })
        .catch(err => res.json({ err: err })); // email authorization not saved
});

module.exports = router;
