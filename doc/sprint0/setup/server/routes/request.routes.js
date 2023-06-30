const router = require('express').Router();
let RequestModel = require('../models/request.model');

// POST REQUEST: create a request
/* 
    //example usage

    Axios.post("http://localhost:5000/requests/", {
        requester: requester@mail.com
        requestee: requestee@mail.com
        event_id: rand_event_id
    })
    .then(res => {
        // do stuff...
    })
*/
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
/* 
    //example usage

    Axios.get("http://localhost:5000/requests/by/requester@mail.com", {})
    .then(res => {
        // do stuff...
    })
*/
router.route('/by/:requester').get(
    (req, res) => {
        RequestModel.find({requester: req.params.requester})
        .then(r => res.json(r))
        .catch(err => res.json({err: err}))
    }
)



// GET REQUEST: get a list of requests by who received them
/* 
    //example usage

    Axios.get("http://localhost:5000/requests/for/requestee@mail.com", {})
    .then(res => {
        // do stuff...
    })
*/
router.route('/for/:requestee').get(
    (req, res) => {
        RequestModel.find({requestee: req.params.requestee})
        .then(r => res.json(r))
        .catch(err => res.json({err: err}))
    }
)



// GET REQUEST: get a list of requests by event_id
/* 
    //example usage

    Axios.get("http://localhost:5000/requests/event/rand_event_id", {})
    .then(res => {
        // do stuff...
    })
*/
router.route('/event/:event_id').get(
    (req, res) => {
        RequestModel.find({event_id: req.params.event_id})
        .then(r => res.json(r))
        .catch(err => res.json({err: err}))
    }
)



// GET REQUEST: get a list of requests based on a filter passed in the body
/* 
    //example usage

    Axios.get("http://localhost:5000/requests/search", {
        requester: requester@mail.com
        requestee: requestss@mail.com
        event_id: rand_email_id
    }).then(res => {
        // do stuff...
    })

    // all filters are optional, here's another example

    Axios.get("http://localhost:5000/requests/search", {
        requester: requester@mail.com
    }).then(res => {
        // do stuff...
    })
*/
router.route('/search').get(
    (req, res) => {
        RequestModel.find(req.body)
        .then(r => res.json(r))
        .catch(err => res.json({err: err}))
    }
)

module.exports = router;