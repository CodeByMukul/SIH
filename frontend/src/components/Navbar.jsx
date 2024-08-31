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
      //   <div className="w-56 bg-white shadow-md ml-0 mr-5 h-full">
      //   <div className="p-4 text-lg">
      //     <h1 className="text-2xl font-bold mb-4">Raahi</h1>
      //     <nav>
      //       <a href="#" className="flex items-center py-2 text-gray-700 hover:bg-gray-200 rounded">
      //         <Home className="mr-2" /> Home
      //       </a>
      //       <a href="#" className="flex items-center py-2 text-gray-700 hover:bg-gray-200 rounded">
      //         <Compass className="mr-2" /> Explore
      //       </a>
      //       <a href="#" className="flex items-center py-2 text-gray-700 hover:bg-gray-200 rounded">
      //         <Bell className="mr-2" /> Notifications
      //       </a>
      //       <a href="#" className="flex items-center py-2 text-gray-700 hover:bg-gray-200 rounded">
      //         <User className="mr-2" /> Profile
      //       </a>
      //   <div className="border-t p-4 ">
      //     <div className="flex text-sm items-center justify-center">
      //       <img src={user.profilePicture} alt={user.name} className="w-10 h-10 rounded-full mr-3" />
      //       <div className>
      //         <p className="font-semibold">{user.name}</p>
      //         <p className=" text-gray-600"> <b>@</b>{user.username}</p>
      //       </div>
      //     </div>
      //   </div>
      //     </nav>
      //   </div>
      // </div>
      <div className="flex h-screen flex-col justify-between border-e bg-white">
  <div className="px-4 py-6">
    <span className="grid h-10 w-32 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
      Logo
    </span>

    <ul className="mt-6 space-y-1">
      <li>
        <a
          href="#"
          className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
        >
          General
        </a>
      </li>

      <li>
        <details className="group [&_summary::-webkit-details-marker]:hidden">
          <summary
            className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <span className="text-sm font-medium"> Teams </span>

            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </summary>

          <ul className="mt-2 space-y-1 px-4">
            <li>
              <a
                href="#"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Banned Users
              </a>
            </li>

            <li>
              <a
                href="#"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Calendar
              </a>
            </li>
          </ul>
        </details>
      </li>

      <li>
        <a
          href="#"
          className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        >
          Billing
        </a>
      </li>

      <li>
        <a
          href="#"
          className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        >
          Invoices
        </a>
      </li>

      <li>
        <details className="group [&_summary::-webkit-details-marker]:hidden">
          <summary
            className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <span className="text-sm font-medium"> Account </span>

            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </summary>

          <ul className="mt-2 space-y-1 px-4">
            <li>
              <a
                href="#"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Details
              </a>
            </li>

            <li>
              <a
                href="#"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Security
              </a>
            </li>

            <li>
              <form action="#">
                <button
                  type="submit"
                  className="w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-500 [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700"
                >
                  Logout
                </button>
              </form>
            </li>
          </ul>
        </details>
      </li>
    </ul>
  </div>

  <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
    <a href="#" className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
      <img
        alt=""
        src={user.profilePicture}
        className="size-10 rounded-full object-cover"
      />

      <div>
        <p className="text-xs">
          <strong className="block font-medium">{user.name}</strong>

          <span> {user.username} </span>
        </p>
      </div>
    </a>
  </div>
</div>
    )
}