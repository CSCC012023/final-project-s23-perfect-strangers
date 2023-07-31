const router = require("express").Router();
let PromoterRequestModel = require("../models/promoterRequest.model");
let UserDetailsModel = require("../models/userDetails.model");
let PromoterInviteModel = require("../models/promoterInvite.model");

router.route("/event/:event_id").get(async (req, res) => {
  try {
    var promoterRequests = await PromoterRequestModel.find({
      event: req.params.event_id,
    })
      .populate(["requestee"])
      .lean();

    const transformedRequests = await Promise.all(
      promoterRequests.map(async (pReq) => {
        if (pReq.status === "accepted") {
          const acceptedInvites = await PromoterInviteModel.countDocuments({
            promoter: pReq.requestee._id,
            status: "accepted",
            event: req.params.event_id,
          });
          return { ...pReq, numAcceptedInvites: acceptedInvites };
        } else {
          return pReq;
        }
      })
    );
    console.log(transformedRequests);
    res.send(transformedRequests);
  } catch (e) {
    res.status(500).json({ msg: "request was not issued", err: e });
  }
  //console.log(promoterRequests);
});

router.route("/").post(async (req, res) => {
  const requesteeEmail = req.body.requesteeEmail;

  const requestee = await UserDetailsModel.findOne({
    email: requesteeEmail,
  });
  if (!requestee) {
    res.status(404).json({ msg: "User email not found" });
    return;
  }

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
          res.status(200).json({ msg: "request issued", request: r })
        )
        .catch((err) => {
          res.status(404).json({ msg: "request was not issued", err: err });
        });
    } else {
      res.status(409).json({ msg: "request already exists" });
    }
  });
});

module.exports = router;
