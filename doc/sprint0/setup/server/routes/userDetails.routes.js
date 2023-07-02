const router = require("express").Router();
let UserDetailsModel = require("../models/userDetails.model");

router.route("/").post((req, res) => {
  const newUserDetails = new UserDetailsModel({
    email: req.body.email,
    username: req.body.username,
    age: req.body.age,
    gender: req.body.gender,
  });

  newUserDetails
    .save()
    .then(() =>
      res.json({
        msg: "user details added",
      })
    )
    .catch((err) =>
      res.json({
        msg: "user details could not be added",
        err: err,
      })
    );
});

// Get a user with their biography
// Querying the cluster by username
router.route("/biography/:useremail").get(async (req, res) => {
  try {
    const user = await UserDetailsModel.findOne({ email: req.params.useremail });
    res.send(user);
  } catch {
    res.status(404);
    res.send({ error: "User does not exist" });
  }
});

// Post a user with their biography
router.route("/biography").post(async (req, res) => {
  const useremail = req.body.useremail;
  const userBio = req.body.biography;
  try {
    let user = await UserDetailsModel.findOne({ email: useremail });
    user.biography = userBio;
    await user.save();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(404);
    res.send(err);
  }
});

module.exports = router;
