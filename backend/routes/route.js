const express = require("express");
const Signup = require("../middlewares/signup");
const SignupOtp = require("../middlewares/signup_otp.js");
const Signin = require("../middlewares/signin.js");
const jwt = require("jsonwebtoken");
const router = express.Router();
const {User} = require("../database/schema.js")
const zod = require("zod");
require("dotenv").config();

router.post("/signup" , Signup , (req,res) => {
  const token = req.token;
  res.cookie("token" , token );
  res.json({ 
    success : true,
    msg : "Otp sent successfully !"
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

router.post("/signin" , Signin , (req,res) => {
  const username = req.username;
  const email = req.email;

  const token = jwt.sign({
    username : username,
    email : email
  } , process.env.JWT_PASSWORD);

  res.cookie("token" , token);

  //console.log(req.cookies.token);

  res.json({
    success : true,
    msg : "User Signed in to the Dashboard !"
  })
})


module.exports = router;