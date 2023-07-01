const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    creator: {
        type: String,
        //type: mongoose.Schema.Types.ObjectId,
        //ref: 'users',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: false,
    },
    location: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: false,
    },
    description: {
        type: String,
        required: true,
    },
    ticketLink: {
        type: String,
        required: false,
    },
    onMe: {
        type: Boolean,
        required: false,
    }
});

const UserEventsModel = mongoose.model("userevents", eventSchema);
module.exports = UserEventsModel;