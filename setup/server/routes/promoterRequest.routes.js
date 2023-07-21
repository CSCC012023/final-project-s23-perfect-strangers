const router = require("express").Router();
let PromoterRequestModel = require("../models/promoterRequest.model");
let UserDetailsModel = require("../models/userDetails.model");

router.route("/event/:event_id").get((req, res) => {
  PromoterRequestModel.find({ event: req.params.event_id })
    .populate([
      "requestee"
    ])
    .then((r) => res.status(202).json(r))
    .catch((err) => res.json({ err: err }));
});

router.route("/").post(async (req, res) => {
  const requesteeEmail = req.body.requesteeEmail;

  const requestee = await UserDetailsModel.findOne({
    email: requesteeEmail,
  });

  PromoterRequestModel.findOne({
    requestee: requestee._id,
    event: req.body.event,
  }).then((ans) => {
    if (ans === null) {
      const newRequest = new PromoterRequestModel({
        requestee: requestee._id,
        status: "pending",
        event: req.body.event,
      });

      newRequest
        .save()
        .then((r) =>
          res.status(201).json({ msg: "request issued", request: r })
        )
        .catch((err) => {
          res.json({ msg: "request was not issued", err: err });
        });
    } else {
      res.json({ msg: "request already exists" });
    }
  });
});

module.exports = router;