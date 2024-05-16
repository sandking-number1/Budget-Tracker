let mongoose = require("mongoose")

let fschema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        ref: "user",
        required: [true, "user_id is required"],
    },
    family_name:{
        type: String,
        required: [true, "family name is required"],
        unique: true
    }
}, {timestamps: true})


let Family = mongoose.model("family", fschema)
module.exports = Family