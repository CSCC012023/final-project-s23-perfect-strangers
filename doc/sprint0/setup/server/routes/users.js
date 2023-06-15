const router = require('express').Router();
let UserModel = require('../models/usersModel');

router.route('/').get((req, res) => {
    UserModel.find()
            .then(users => res.json(users))
            .catch(err => res.status(401).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const username = req.body.username;

    const newUser = new UserModel({name: name, age: age, username: username});

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));

});

module.exports = router;