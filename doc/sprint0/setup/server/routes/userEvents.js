const router = require("express").Router();
const { model } = require("mongoose");
let UserEventsModel = require("../models/userEventsModel");

router.get('/', (req, res) => {
    UserEventsModel.find()
            .then(userEvents => res.json(userEvents))
            .catch(err => res.status(401).json('Error: ' + err));
});

module.exports = router;