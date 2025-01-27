const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username : {
    type : String,
    require : true,
    unique : true
  } , 
  email : {
    type : String,
    require : true,
    unique : true
  } , 
  password : {
    type : String
  }
})

const otpSchema = new mongoose.Schema({
  email : {
    type : String,
    require : true
  } , 
  otp : {
    type : Number
  } , 
  password : {
    type : String
  } , 
  createdAt : {
    type : Date,
    default : Date.now,
    expires : 120
  }
})

const User = mongoose.model("User",userSchema);
const OTP = mongoose.model("OTP" , otpSchema);

module.exports = {
  User , 
  OTP
}