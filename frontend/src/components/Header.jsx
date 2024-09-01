import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Search,
  Home,
  Compass,
  Bell,
  User,
  LogOut,
} from 'lucide-react';

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const searchDropdownRef = useRef(null);
  const navigate = useNavigate();

  // Function to toggle the user dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Fetch users based on filter with debounce
  useEffect(() => {
    if (filter.trim() === "") {
      setUsers([]);
      return;
    }

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const newTimeout = setTimeout(() => {
      axios
        .get(`http://localhost:3000/users/search/?filter=${filter}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => setUsers(res.data.user))
        .catch((error) => console.error("Error fetching users:", error));
    }, 300);

    setDebounceTimeout(newTimeout);

    return () => clearTimeout(newTimeout);
  }, [filter]);

  function handleClick(username) {
    navigate(`/Dashboard?username=${username}`); // Redirect to the user's profile
    setFilter(""); // Clear the search input
    navigate(0)
  }

  // Hide dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchDropdownRef.current && !searchDropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // Close the dropdown
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function handleClickTitle(){
    navigate('/dashboard')
    navigate(0)
  }

  return (
    <header className="bg-black shadow-md fixed w-full z-10 top-0">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
    
        <h1 className="text-2xl font-bold cursor-pointer" onClick={handleClickTitle}>
          <span className="text-white">R</span>
          <span className="text-yellow-500">aa</span>
          <span className="text-white">hi</span>
        </h1>
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div
            className="relative"
            ref={searchDropdownRef}
          >
            <input
              type="text"
              onChange={(e) => {
                setFilter(e.target.value);
              }}
              placeholder="Discover"
              className="pl-8 pr-4 py-2 rounded-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              aria-label="Search"
            />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />

            {filter && users.length > 0 && (
              <div className="absolute mt-2 w-full bg-black border border-yellow-500 rounded-md shadow-lg z-10">
                {users.map((user, index) => (
                  <div
                    key={user.username}
                    className="flex items-center p-2 cursor-pointer hover:bg-gray-800"
                    onClick={() => handleClick(user.username)}
                  >
                    <img className="w-10 h-10 rounded-full" src={user.pfp} alt="Avatar" />
                    <span className="ml-2 text-white">{user.username}</span>
                    {/* Add divider between options */}
                    {index < users.length - 1 && <hr className="my-2 border-gray-700" />}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Navbar Icons */}
          <Home className="text-white cursor-pointer hover:text-yellow-500 transition-colors duration-200" onClick={()=>navigate('/home')}/>
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
                  className="block px-4 py-2 text-sm text-white hover:bg-gray-800"
                  href='http://localhost:5173/dashboard'
                >
                  Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-white hover:bg-gray-800"
                >
                  Settings
                </a>
                <hr className="my-1 border-gray-700" />
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-white hover:bg-gray-800"
                >
                  Sign Out
                </a>
              </div>
            )}
          </div>

          {/* Logout Icon Shifted to Right */}
          <Link to="/logout" className="logout-button">
            <LogOut className="text-white cursor-pointer hover:text-red-600 transition-colors duration-200 ml-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
