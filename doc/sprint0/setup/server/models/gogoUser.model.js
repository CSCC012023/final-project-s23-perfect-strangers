const mongoose = require('mongoose');

const gogoUser = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'Username is required'],
    },
    profileImage: {
        data: Buffer,
        contentType: String,
    },
    description: {
        type: String,
    }
})

const GogoUserModel = mongoose.model("gogo-users", gogoUser);
module.exports = GogoUserModel;