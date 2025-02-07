import axios from "axios";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(){
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  async function signin_(){
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if(email === "" || email === null || password === "" || password === null){
      alert("All fields required !");
      return;
    }

    const body = {
      email : email,
      password : password
    }

      try{
        const response = await axios.post("http://localhost:9000/api/v1/signin",body);
      if(response.data.success){
        const token = response.data.token;
        localStorage.setItem("token",token);
        navigate("/Dashboard");
      }else{
        alert("User Doesn't Exists !");
      }
    }catch(err){
      alert("Internal Problem Please Try again !");
      navigate("/signin");
    }
  }
  return (
    <div className="bg-black flex justify-center items-center h-screen w-full">
      <div className="bg-white flex flex-col rounded-4xl p-6">
        <div className="text-center text-2xl mb-4">Signup</div>
        <input
          ref={emailRef}
          type="email"
          placeholder="Enter Your Email"
          className="w-96 p-2 m-2"
        />
        <input
          ref={passwordRef}
          type="password"
          placeholder="Enter Your Password"
          className="w-96 p-2 m-2"
        />
        <button
          onClick={signin_}
          className="w-96 p-2 m-2 bg-blue-500 rounded-4xl hover:bg-blue-400"
        >
          Submit
        </button>
      </div>
    </div>
  );
}