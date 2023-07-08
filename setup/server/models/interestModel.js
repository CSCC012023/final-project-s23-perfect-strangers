const mongoose = require("mongoose");

const interestSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
  },
  interestList: {
    type: [String],
    required: true,
  },
});

const InterestModel = mongoose.model("interestmodels", interestSchema);
module.exports = InterestModel;
