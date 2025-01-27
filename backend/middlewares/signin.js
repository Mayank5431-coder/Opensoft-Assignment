const {User} = require("../database/schema.js")
const zod = require("zod");
const bcrypt = require("bcrypt");

const emailSchema = zod.string().max(100);
const passwordSchema = zod.string().max(200);

const Signin = async (req , res , next) => {
    const email = req.body.email;
    const password = req.body.password;
    if(!email || !password){
      res.json({
        success : false,
        msg : "Provide the details !"
      })
      return;
    }
    const emailParse = emailSchema.safeParse(email);
    const passwordParse = passwordSchema.safeParse(password);
    if(!emailParse.success || !passwordParse.success){
      res.json({
        success : false,
        msg : "Please provide valid credentials !"
      })
      return;
    }
    try{
      const user = await User.findOne({
        email : email
      }) 
      if(user){
        req.username = user.username;
        req.email = email;
        const passkey = user?.password;
        const ans = bcrypt.compare(password,passkey);
        if(!ans){
          res.json({
            msg : "Wrong Password !",
            success : false
          })
          return;
        }
        next();
      }else{
        res.json({
          success : false,
          msg : "User Doesn't exists !"
        })
      }
    }catch(err){
      res.json({
        success : false,
        msg : "Server Error !"
      })
    }
}

module.exports = Signin;