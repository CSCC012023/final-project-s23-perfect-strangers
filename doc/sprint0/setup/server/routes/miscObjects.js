const router = require('express').Router();
let MiscObjectModel = require('../models/miscObjectModel');

router.route('/').get((req, res) => {
    MiscObjectModel.find()
            .then(objects => res.json(objects))
            .catch(err => res.status(410).json('Error: ' + err));
});

router.route('/').post((req, res) => {
    const name = req.body.name;

    const newMiscObject = new MiscObjectModel({name: name, embed: []});

    newMiscObject.save()
        .then(() => res.json(newMiscObject))
        .catch(err => res.status(411).json('Error: ' + err));

});

router.route('/update/:id').post((req, res) => {
    MiscObjectModel.findById(req.params.id)
        .then(miscObject => {
            miscObject.embed = [...miscObject.embed, {name: makeid(10)}];
            miscObject.save()
                .then(() => res.json(miscObject))
                .catch(err => res.status(413).json('Error: ' + err));
        })
        .catch(err => res.status(412).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    MiscObjectModel.findByIdAndDelete(req.params.id)
        .then(() => res.json('object deleted'))
        .catch(err => res.status(414).json('Error: ' + err));
})

module.exports = router;