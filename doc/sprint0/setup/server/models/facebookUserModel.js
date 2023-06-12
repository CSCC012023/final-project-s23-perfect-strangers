const mongoose = require('mongoose');

const fbUserSchema = new mongoose.Schema({
    accountId:{
        type: String,
        required: true
    },
    provider: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 2
    }
});

const FBUserModel = mongoose.model("facebookUserModel", fbUserSchema);
module.exports = FBUserModel;
