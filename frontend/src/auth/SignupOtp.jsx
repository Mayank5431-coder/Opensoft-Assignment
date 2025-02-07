import { useRef } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import Cookies from 'js-cookie';

export default function SignupOtp(){
  const navigate = useNavigate();
  const otpRef = useRef(null);
  const backendcall = async () => {
    const token = localStorage?.getItem("token");
    console.log("tag")
    console.log(token);
    if(!token){
      alert("Token Expired Singup again !");
      navigate("/signup");
      return;
    }
    if(otpRef === "" || otpRef == null){
      alert("Please Enter the otp !");
      return;
    }
    console.log(otpRef.current);
    const body = {
      otp : otpRef.current.value
    }
    console.log(otpRef.current.value);
    try{
      const response = await axios.post("http://localhost:9000/api/v1/signup/otp" , 
        body ,
        {
          headers : {
            token : token
          }
        }
      )
        if(response.data.success){
        alert(response.data.msg);
        navigate("/signin");
        }else{
        alert(response.data.msg);
        navigate("/signup");
      }  
    }catch(err){
      console.log(err);
      alert("Internal Server Problem");
      navigate("/signup");
    }             
  }
  return(
      <div className="flex justify-center items-center w-full h-screen bg-black">
        <div className="bg-white p-4 rounded-3xl">
          OTP = <input ref={otpRef} type="text" placeholder="write Otp here" className="w-72 h-10 border-2"/>
          <button className="bg-blue-500 p-2 m-2 w-32 rounded-3xl hover:bg-blue-400" onClick={backendcall}>Submit</button>
        </div>
      </div>
    ) 
}