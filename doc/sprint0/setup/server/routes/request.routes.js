const router = require('express').Router();
let RequestModel = require('../models/request.model');

// POST REQUEST: create a request
router.route('/').post(
    (req, res) => {
        const newRequest = new RequestModel({
            requester: req.body.requester,
            requestee: req.body.requestee,
            status: 'pending',
            event_id: req.body.event_id
        })

        newRequest.save()
        .then(() => res.json({msg: 'request created'}))
        .catch(err => {
            res.json({msg: "request was not created", err: err})
        })
    }
)

// GET REQUEST: get a list of requests by who issued them
router.route('/by/:requester').get(
    (req, res) => {
        RequestModel.find({requester: req.params.requester})
        .then(r => res.json(r))
        .catch(err => res.json({err: err}))
    }
)

// GET REQUEST: get a list of requests by who received them
router.route('/for/:requestee').get(
    (req, res) => {
        RequestModel.find({requestee: req.params.requestee})
        .then(r => res.json(r))
        .catch(err => res.json({err: err}))
    }
)

// GET REQUEST: get a list of requests by event_id
router.route('/event/:event_id').get(
    (req, res) => {
        RequestModel.find({event_id: req.params.event_id})
        .then(r => res.json(r))
        .catch(err => res.json({err: err}))
    }
)

// GET REQUEST: get a list of requests based on a filter passed in the body
router.route('/search').get(
    (req, res) => {
        RequestModel.find(req.body.filter)
        .then(r => res.json(r))
        .catch(err => res.json({err: err}))
    }
)

module.exports = router;