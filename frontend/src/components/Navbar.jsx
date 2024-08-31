import { User, MapPin, Calendar, Image, Home, Compass, Bell } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import "../styles/Dashboard.css";
export default  function Navbar(){
    const [user,setUser]=useState({});
  const [token, setToken] = useState(localStorage.getItem("token") || "");

    useEffect(()=>{
        const fetchLuckyNumber = async () => {
            let axiosConfig = {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            };
      
            try {
              const response = await axios.get("http://localhost:3000/users/user/navbarinfosecretroute",axiosConfig);
              console.log(response,"hihih")
                setUser(response.data)
            } catch (error) {
              toast.error(error.message);
              console.log(error);
            }
          };
      
          fetchLuckyNumber();
    },[])
    return(
        <div className="w-56 bg-white shadow-md ml-0 mr-5 h-full">
        <div className="p-4 text-lg">
          <h1 className="text-2xl font-bold mb-4">Raahi</h1>
          <nav>
            <a href="#" className="flex items-center py-2 text-gray-700 hover:bg-gray-200 rounded">
              <Home className="mr-2" /> Home
            </a>
            <a href="#" className="flex items-center py-2 text-gray-700 hover:bg-gray-200 rounded">
              <Compass className="mr-2" /> Explore
            </a>
            <a href="#" className="flex items-center py-2 text-gray-700 hover:bg-gray-200 rounded">
              <Bell className="mr-2" /> Notifications
            </a>
            <a href="#" className="flex items-center py-2 text-gray-700 hover:bg-gray-200 rounded">
              <User className="mr-2" /> Profile
            </a>
        <div className="border-t p-4 ">
          <div className="flex text-sm items-center justify-center">
            <img src={user.profilePicture} alt={user.name} className="w-10 h-10 rounded-full mr-3" />
            <div className>
              <p className="font-semibold">{user.name}</p>
              <p className=" text-gray-600"> <b>@</b>{user.username}</p>
            </div>
          </div>
        </div>
          </nav>
        </div>
      </div>
    )
}