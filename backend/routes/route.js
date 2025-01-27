const express = require("express");
const Signup = require("../middlewares/signup");
const SignupOtp = require("../middlewares/signup_otp.js");
const jwt = require("jsonwebtoken");
const router = express.Router();
const {User} = require("../database/schema.js")
const zod = require("zod");

router.post("/signup" , Signup , (req,res) => {
  const token = req.token;
  res.json({
    token : token , 
    success : true
  })
})

router.post("/signup/otp" , SignupOtp ,  async (req,res) => {
  const username = req.username;
  const email = req.email;
  const password = req.password;

  try{
    await User.create({
      username : username,
      password : password,
      email : email
    })
  
    res.json({
      success : true,
      msg : "User Created Successfully !"
    })
  }catch(err){
    console.log(err);
    res.json({
      success : false,
      msg : "Internal Error !"
    })
  }
})
module.exports = router;