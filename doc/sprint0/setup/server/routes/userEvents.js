const router = require("express").Router();
let UserEventsModel = require("../models/userEventsModel");

router.get('/userevents', (req, res) => {
    UserEventsModel.find()
            .then(userEvents => res.json(userEvents))
            .catch(err => res.status(401).json('Error: ' + err));
});

router.post('/userevents', (req, res) => {
    const creator = req.body.creator;
    const title = req.body.title;
    const date = req.body.date;
    const location = req.body.location;
    const price = req.body.price;
    const description = req.body.description;
    const ticketLink = req.body.ticketLink;
    const onMe = req.body.onMe;

    const newEvent = new UserEventsModel({creator: creator, title: title, date: date, location: location, price: price, description: description, ticketLink: ticketLink, onMe: onMe});

    newEvent.save()
        .then(() => res.json('User Event added!'))
        .catch(err => res.status(400).json("Couldn't create user: " + err));

});

module.exports = router;