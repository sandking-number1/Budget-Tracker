let mongoose = require("mongoose")

let gschema = new mongoose.Schema({
    user_id: {
        type: String,
        required: [true, "user_id is required"],
    },
    date: {
        type: Date,
        required: [true, "Date is required"]
    },
    category: {
        type: String,
        requires: [true, "Category is required"],
      },
    description: {
        type: String,
        required: [true, "Description is required"],
        unique: true
      },  
    amount: {
        type: Number,
        required: [true, "Amount is required"]
    }
},
    {
        timestamps: true,
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        }
    })

let goal = mongoose.model("goal", gschema)
module.exports = goal