require("dotenv").config();
const jwt = require("jsonwebtoken");
const {OTP} = require("../database/schema.js")

const SignupOtp = async (req,res,next) => {
  try{
    const token = req.headers.token;
    const obj = jwt.verify(token , process.env.OTP_JWT_PASSWORD);
    const email = obj.email;
    const username = obj.username;
    const otp = req.body.otp;
    const otp_ans = await OTP.findOne({
      email : email
    })
    if(otp == otp_ans?.otp){
      req.username = username;
      req.email = email;
      req.password =  otp_ans?.password;
      next();
    }else{
      res.json({
        token: token,
        success : false,
        msg : "OTP mismatched !"
      })
      return;
    }
  }catch(err){
    console.log(err);
    res.json({
      success : false,
      msg : "Internal Problem !"
    })
  }
}

module.exports = SignupOtp;