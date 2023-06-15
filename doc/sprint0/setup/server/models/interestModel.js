const mongoose = require('mongoose');

const interestSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 2
    },
    interestList: {
        type: [String],
        required: true,
    },
});


const InterestModel = mongoose.model("InterestModel", interestSchema);
module.exports = InterestModel;
