const router = require("express").Router();
let UserModel = require("../models/usersModel");

router.route("/").get((req, res) => {
  UserModel.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(401).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const username = req.body.username;

  const newUser = new UserModel({ name: name, age: age, username: username });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/biography").get(async (req, res) => {
  const username = req.query.username;

  const user = await UserModel.findOne({ username: username });
  res.send(user);
});

router.route("/setBiography").post(async (req, res) => {
  username = req.body.username;
  userBio = req.body.biography;
  try {
    let user = await UserModel.findOne({ username: username });
    user.biography = userBio;
    await user.save();
    res.send(user);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
