const mongoose = require("mongoose");

// let ChatModel = require("./chat.model");

const roomSchema = new mongoose.Schema({
    participants: {
        type: [String],
        required: true,
        unique: true,
        maxItems: 2
    },
    roomID:{
        type: String,
        required: true,
        unique: true,
    },
    chatHistory: {
        type: Array,
        default: [],
        required: true,
    },
});


// trk : { type : Array , "default" : [] }

const RoomModel = mongoose.model("chatrooms", roomSchema);
module.exports = RoomModel;
// module.exports = CgatModel;