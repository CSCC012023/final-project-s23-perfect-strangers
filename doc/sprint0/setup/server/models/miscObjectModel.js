const mongoose = require("mongoose");

const embeddedObjectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

const miscObjectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    embed: [embeddedObjectSchema]
})

const MiscObjectModel = mongoose.model("misc-objects", miscObjectSchema);
module.exports = MiscObjectModel;