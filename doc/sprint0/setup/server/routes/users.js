const router = require("express").Router();
let UserModel = require("../models/usersModel");

router.route("/users").get((req, res) => {
  UserModel.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(401).json("Error: " + err));
});

router.route("/users").post((req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const username = req.body.username;

  const newUser = new UserModel({ name: name, age: age, username: username });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Get a single user by userId
router.route("/users/:id").get(async (req, res) => {
  try {
    const post = await UserModel.findOne({ _id: req.params.id });
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "User does not exist" });
  }
});

// Get a user with their biography
// Querying the cluster by username
router.route("/biography/:username").get(async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.params.username });
    console.log(req.params.username);
    res.send(user);
  } catch {
    res.status(404);
    res.send({ error: "User does not exist" });
  }
});

// Post a user with their biography
router.route("/biography").post(async (req, res) => {
  username = req.body.username;
  userBio = req.body.biography;
  try {
    let user = await UserModel.findOne({ username: username });
    user.biography = userBio;
    await user.save();
    res.send(user);
  } catch (err) {
    res.status(404);
    res.send(err);
  }
});

module.exports = router;
