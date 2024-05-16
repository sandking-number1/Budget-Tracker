let mongoose = require("mongoose")

let eschema = new mongoose.Schema({
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
      },  
    amount: {
        type: Number,
        required: [true, "Amount is required"]
    },
    payment_method: {
        type: String,
        required: [true, "PaymentMethod is required"]
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

let expense = mongoose.model("expense", eschema)
module.exports = expense