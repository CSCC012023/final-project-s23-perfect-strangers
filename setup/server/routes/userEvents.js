const router = require("express").Router();
let UserEventsModel = require("../models/userEventsModel");

router.get("/userevents", (req, res) => {
  UserEventsModel.find()
    .then((userEvents) => res.json(userEvents))
    .catch((err) => res.status(401).json("Error: " + err));
});

router.post("/userevents", (req, res) => {
  const creator = req.body.creator;
  const title = req.body.title;
  const date = req.body.date;
  const location = req.body.location;
  const price = req.body.price;
  const description = req.body.description;
  const ticketLink = req.body.ticketLink;
  const onMe = req.body.onMe;
  const tags = req.body.tags;

  const newEvent = new UserEventsModel({
    creator: creator,
    title: title,
    date: date,
    location: location,
    price: price,
    description: description,
    ticketLink: ticketLink,
    onMe: onMe,
    tags: tags
  });

  newEvent
    .save()
    .then(() => res.json("User Event added!"))
    .catch((err) => res.status(400).json("Couldn't create user: " + err));
});

// this one was messing with the :email one, not sure why. It isn't used
// router.route("/userevents/:eventID").get(async (req, res) => {
//     const userEventDoc = await UserEventsModel.find({
//       eventID: req.params.eventID,
//     });
//     res.send(userEventDoc);
// });
router.route("/userevents/:email").get(async (req, res) => {
  console.log(req.params.email);
  const userEventDoc = await UserEventsModel.find({
    creator: req.params.email,
  });
  // console.log(userEventDoc);
  res.send(userEventDoc);
});

router.route("/myevent/:creator").get(async (req, res) => {
    try {
      const event = await UserEventsModel.find({
        creator: req.params.creator,
      });
      res.send(event);
    } catch {
      res.status(404);
      res.send({ error: "Event does not exist" });
    }
});


/* 
  - DEV-CGP-9
  - Get list of events
  - Retrieved events should match all tags given in query array
*/
router.route("/tags/userevents").post( async (req, res) => {
  const queryTags = req.body.queryTags;
  try {
      const event = await UserEventsModel.find({ tags: { $all: queryTags} });
      res.send(event);
  } catch {
      res.status(404);
      res.send({ error: "No events found matching query tags" });
  }
});
module.exports = router;
