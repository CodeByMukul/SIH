import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import {
  Search,
  Home,
  Compass,
  Bell,
  User,
  MapPin,
  Calendar,
  Globe,
  Camera,
  Book,
  LogOut,
} from 'lucide-react'; // Import icons

export default function Header(){
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [users,setUsers]= useState([{}]);
    const [filter,setFilter]=useState("");
    const navigate=useNavigate();
    let timeout=null
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
    useEffect(() => {
        clearTimeout(timeout);
        setTimeout(() => {
          axios
            .get("http://localhost:3000/users/search/?filter=" + filter, {
              headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            })
            .then((res) => setUsers(res.data.user));
        }, 250);
      }, [filter]);
      function handleClick(username){
        navigate('/Dashboard?username='+username)
      }
return(
<header className="bg-black shadow-md fixed w-full z-10 top-0">
<div className="container mx-auto px-4 py-3 flex items-center justify-between">
  <h1 className="text-2xl font-bold">
    <span className="text-white">R</span>
    <span className="text-yellow-500">aa</span>
    <span className="text-white">hi</span>
  </h1>
  <div className="flex items-center space-x-4">
    {/* Search Bar */}
    <div className="relative">
      <input
        type="text"
        onChange={(e)=>{setFilter(e.target.value)}}
        placeholder="Discover new places..."
        className="pl-8 pr-4 py-2 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
      {
       filter?users.map((user)=>(
        <div className='z-10'>
            <img className="w-10 h-10 rounded-full" src={user.profile_pic} alt="Rounded avatar"></img>
            <a href="" onClick={(e)=>handleClick(user.username)}>{user.username}</a>
        </div>
       )):null
      }
          {/* <div class="py-1" role="none">
      <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-0">Account settings</a>
      <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-1">Support</a>
      <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-2">License</a>
      <form method="POST" action="#" role="none">
        <button type="submit" class="block w-full px-4 py-2 text-left text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-3">Sign out</button>
      </form>
    </div> */}
      <Search
        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={18}
      />
    </div>
    {/* Navbar Icons */}
    <Home className="text-white cursor-pointer hover:text-yellow-500 transition-colors duration-200" />
    <Compass className="text-white cursor-pointer hover:text-yellow-500 transition-colors duration-200" />
    <Bell className="text-white cursor-pointer hover:text-yellow-500 transition-colors duration-200" />
    {/* User Profile with Dropdown */}
    <div className="relative">
      <User
        className="text-white cursor-pointer hover:text-yellow-500 transition-colors duration-200"
        onClick={toggleDropdown}
      />
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-black border border-yellow-500 rounded-md shadow-lg py-1">
          <a
            href="#"
            className="block px-4 py-2 text-sm text-white hover:bg-gray-800"
          >
            Profile
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-white hover:bg-gray-800"
          >
            Settings
          </a>
        </div>
      )}
    </div>
    {/* Logout Icon Shifted to Right */}
    <Link to="/logout" className="logout-button">
    
    <LogOut className="text-white cursor-pointer hover:text-red-600 transition-colors duration-200 ml-4" /></Link>
  </div>
</div>
</header>)
}