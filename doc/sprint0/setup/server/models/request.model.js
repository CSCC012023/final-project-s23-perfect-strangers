const mongoose = require('mongoose');

const request = new mongoose.Schema({
    requester: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'Requester email address is required'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    requestee: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'Requestee email address is required'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    status: {
        type: String,
        required: [true, 'Status is required'],
        enum: {
            values: ['pending', 'accepted', 'rejected'],
            message: 'invalid status',
        },
        default: ['pending'],
    },
    event_id: {
        type: String,
        required: [true, 'Event is required'],
    }
})

const RequestModel = mongoose.model("requests", request);
module.exports = RequestModel;