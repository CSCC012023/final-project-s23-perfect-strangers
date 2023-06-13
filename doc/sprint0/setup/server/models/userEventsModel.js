const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
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
    }
});

const UserEventsModel = mongoose.model("userevents", eventSchema);
module.exports = UserEventsModel;