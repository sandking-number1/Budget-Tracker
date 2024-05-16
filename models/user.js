let mongoose = require("mongoose")
let bcrypt = require("bcryptjs")

let uschema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, "Please add a name"]
    },
    email:{
        type: String,
        required:[true, "Please add an email"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "Please add a password"],
    },
    family_name:{
        type: String,
        required:[false, "Please add a family name"]
    }
}, {timestamps: true})

uschema.pre("save", async function(next){
    if(!this.isModified("password")){
        next()
    }
    let hide = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, hide)
})

uschema.methods.isPasswordMatch = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}
let User = mongoose.model("user", uschema)
module.exports = User