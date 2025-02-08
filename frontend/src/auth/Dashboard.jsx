import { useEffect, useState } from "react";
import Cart from "./Cart";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard(){
  const [user,setUser] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(!token){
      navigate("/signin");
    }
  },[])

  useEffect(()=>{
    axios.get("http://localhost:9000/api/v1/users").then((response)=>{
      setUser(response.data.users);
    })
  },[])

  function logout(){
    localStorage.removeItem("token");
    navigate("/signin");
  }

  return(
    <div>
      <div className="flex justify-between items-center w-full bg-gray-600 h-16">
        <div className="text-white text-2xl pl-10">
          Admin Dashboard
        </div>
        <div className="text-white text-2xl pr-16">
          <button onClick={logout} className="border-2 pl-2 pr-2 rounded-2xl p-1 hover:bg-gray-500">Logout</button>
        </div>
      </div>
      <div className="flex flex-col items-center bg-gray-300 h-screen w-full">
        {user.map((u)=>{
          return <Cart username={u.username} email={u.email}/>
        })}
      </div>
    </div>
  ) 
}