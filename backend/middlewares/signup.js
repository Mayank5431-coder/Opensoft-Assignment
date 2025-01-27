const { User , OTP} = require("../database/schema.js");
const otpGenerator = require("../otpGenerator.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();
const zod = require("zod");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  secure: false,
  port: 587,
  auth: {
    user: process.env.USEREMAIL,
    pass: process.env.PASSWORD
  }
})


const usernameSchema = zod.string().min(5).max(100);
const passwordSchema = zod.string().min(10).max(100);
const emailSchema = zod.string().email().max(100);

async function Signup( req , res , next){
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    if (!username || !password || !email) {
      return res.status(400).json({ 
        msg: "Credentials are missing!",
        success : false
      });
    }
    const usercheck = usernameSchema.safeParse(username);
    const passwordcheck = passwordSchema.safeParse(password);
    const emailcheck = emailSchema.safeParse(email);

    if (!usercheck.success || !passwordcheck.success || !emailcheck.success) {
      return res.status(400).json({
         msg: "User credentials invalid!",
        success : false
       });
    }

    try{
      const user = await User.findOne({
        username : username
      })
  
      if(user){
        res.json({
          login : true,
          success : false,
          msg : "Username Already exists !"
        })
        return;
      }
  
      const user1 = await User.findOne({
        email : email
      })
  
      if(user1){
        res.json({
          login : true,
          success : false,
          msg : "Email Already registered !"
        })
        return;
      }
  
      const otp_string = otpGenerator();
      const otp = parseInt(otp_string);
  
  
      const passkey = await bcrypt.hash(password , 10);
      const token = jwt.sign({
        username : username,
        email : email                                   
      } , process.env.OTP_JWT_PASSWORD)
  
      await OTP.create({
        email : email , 
        otp : otp , 
        password : passkey
      })

      const mailOptions = {
        from: process.env.USEREMAIL,
        to: email,
        subject: 'Verification OTP',
        text: 'OTP ' + otp
      }
    
      transporter.sendMail(mailOptions,(error,info) => {
        if(error){
          console.log(error);
        }else{
          console.log("Email sent : " + info.response);
        }
      })
  
      req.token = token;  
      next();
    }catch(err){
      console.log(err);
      res.json({
        msg : "Server Down !"
      })
      return;
    }
}

module.exports = Signup;