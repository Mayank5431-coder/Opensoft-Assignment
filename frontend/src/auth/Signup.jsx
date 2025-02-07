import {  useRef  } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Signup(){
  const navigate = useNavigate();
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const signup_ = async () => {
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!username || !email || !password) {
      alert("Please enter all credentials!");
      return;
    }

    const body = {
      username,
      email,
      password,
    };

    try {
      const response = await axios.post("http://localhost:9000/api/v1/signup", body);
      if (response.data.success) {
        console.log(response);
        const token = response.data.token;
        localStorage.setItem("token",token);
        console.log(token);
        alert("OTP has been sent to your email!");
        navigate("/signup/otp");
      } else {
        alert(response.data.msg || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-black flex justify-center items-center h-screen w-full">
      <div className="bg-white flex flex-col rounded-4xl p-6">
        <div className="text-center text-2xl mb-4">Signup</div>
        <input
          ref={usernameRef}
          type="text"
          placeholder="Enter Your Username"
          className="w-96 p-2 m-2"
        />
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
          onClick={signup_}
          className="w-96 p-2 m-2 bg-blue-500 rounded-4xl hover:bg-blue-400"
        >
          Submit
        </button>
      </div>
    </div>
  );
}