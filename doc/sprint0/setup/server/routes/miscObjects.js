const router = require('express').Router();
let MiscObjectModel = require('../models/miscObjectModel');

const makeid = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

router.route('/objects').get((req, res) => {
    MiscObjectModel.find()
            .then(objects => res.json(objects))
            .catch(err => res.status(410).json('Error: ' + err));
});

router.route('/objects').post((req, res) => {
    const name = makeid(20);

    const newMiscObject = new MiscObjectModel({name: name, embed: []});

    newMiscObject.save()
        .then(() => res.json('miscObject added!'))
        .catch(err => res.status(411).json('Error: ' + err));

});

router.route('/objects/:id').post((req, res) => {
    MiscObjectModel.findById(req.params.id)
        .then(miscObject => {
            miscObject.embed = [...miscObject.embed, {name: makeid(10)}];
            return res.json(miscObject);
        })
        .catch(err => res.status(412).json('Error: ' + err));
});

module.exports = router;