const User = require("../models/user");
let expressAsync = require("express-async-handler")

let registerUser = expressAsync(async(req, res) => {
  let {name, email, password} = req?.body
  let user_exist = await User.findOne({email: req.body.email})
  if(user_exist){
      throw new Error("User already exist")
  }
  try{
      let user = await User.create({name: name, email: email, password: password, family_name: "No family name"})
      res.status(200).json(user)
  }
  catch(err){
      res.json(err)
  }
})

let fetchUser = expressAsync(async(req, res) => {
  try{
      let users = await User.find({})
      res.json(users)
  }
  catch(error){
      res.json(error)
  }
})

let loginUser = expressAsync(async(req, res) => {
  let {email, password} = req?.body
  let found = await User.findOne({email})

  if(found && (await found?.isPasswordMatch(password))){
      res.json({
          id: found._id,
          name: found.name,
          email: found.email,
          family_name: found.family_name
      })
  }
  else{
      throw new Error("Invalid credentials")
  }
})
module.exports = {registerUser, fetchUser, loginUser}