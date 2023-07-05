const router = require("express").Router();
let UserDetailsModel = require("../models/userDetails.model");
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
  }
});

const upload = multer({storage: storage});

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

router.route("/image/:useremail").get(async (req, res) => {
  try {
    const user = await UserDetailsModel.findOne({ email: req.params.useremail });
    res.send(user);
  } catch {
    res.status(404);
    res.send({ error: "User does not exist" });
  }
});

router.route("/image").post(upload.single("profilePic"), async(req, res) => {
  const userPic = {
    data: fs.readFileSync(
      path.join(__dirname + "/uploads/" + req.file.filename)
    ),
    contentType: "image/png",
  };
  const useremail = req.body.useremail;

  try{
    let user = await UserDetailsModel.findOne({ email: useremail });
    user.image = userPic;
    await user.save();
    res.send(user);
  } catch (err) {
    console.log(err);
    res.status(404);
    res.send(err);
  }
});

module.exports = router;
