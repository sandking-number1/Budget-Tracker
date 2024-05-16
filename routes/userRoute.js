let express = require('express')
const { registerUser, fetchUser, loginUser } = require('../controllers/userCont')

let userRoute = express.Router()
userRoute.post("/register", registerUser)
userRoute.post("/login", loginUser)
userRoute.post("/", fetchUser)


module.exports = userRoute