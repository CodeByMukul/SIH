import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
  
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
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
        placeholder="Discover new places..."
        className="pl-8 pr-4 py-2 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
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