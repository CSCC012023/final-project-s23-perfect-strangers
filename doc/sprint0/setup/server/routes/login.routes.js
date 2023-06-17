const router = require("express").Router();
let EmailAuthModel = require("../models/emailAuth.model");
const jwt = require("jsonwebtoken");

router.route("/").post(async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email and password
  const emailAuth = await EmailAuthModel.findOne({
    email: email,
    password: password,
  });
  if (emailAuth) {
    // Login successful
    try {
      const token = jwt.sign({ id: emailAuth._id }, "shhhhh", {
        expiresIn: "2h",
      });
      console.log("User Saved " + token);
      emailAuth.token = token;
      await emailAuth.save(); // Save the user with the updated token
      res.json({ user: emailAuth });
    } catch (error) {
      throw new Error("Failed to generate token");
    }
  } else {
    // Invalid credentials
    res.json({ err: "Invalid email or password" });
  }
});

router.route("/").get((req, res) => {
  try {
    if (req.headers && req.headers.authorization) {
      const authorization = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(authorization, "shhhhh");
      const userId = decoded.id;

      EmailAuthModel.findOne({ _id: userId }).then(function (user) {
        res.json({ user: user });
      });
    }
  } catch (e) {
    return res.status(401).send("unauthorized");
  }
});

module.exports = router;
