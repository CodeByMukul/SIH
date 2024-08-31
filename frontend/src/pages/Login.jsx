import React, { useEffect, useState } from "react";
import GoogleSvg from "../assets/icons8-google.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    let username = e.target.email.value;
    let password = e.target.password.value;

    if (username.length > 0 && password.length > 0) {
      const formData = {
        username,
        password,
      };
      try {
        const response = await axios.post(
          "http://localhost:3000/users/signin",
          formData
        );
        localStorage.setItem('token', response.data.token);
        toast.success("Login successful");
        navigate("/dashboard");
      } catch (err) {
        console.log(err);
        toast.error(err.message);
      }
    } else {
      toast.error("Please fill all inputs");
    }
  };

  useEffect(() => {
    if (token !== "") {
      toast.success("You are already logged in");
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Logo */}
        <h1 className="text-5xl font-bold text-white text-center mb-6">
          R<span className="text-yellow-500">aa</span>h<span className="text-white">i</span>
        </h1>
        
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Where did you go this time!</h2>
          <p className="text-gray-400 mb-8">Please enter your details</p>
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Email"
              name="email"
              className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              {showPassword ? (
                <FaEyeSlash
                  className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <FaEye
                  className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>

            <div className="flex justify-between items-center mt-4 text-gray-400">
              <div className="flex items-center">
                <input type="checkbox" id="remember-checkbox" className="mr-2" />
                <label htmlFor="remember-checkbox">Remember for 30 days</label>
              </div>
              <a href="#" className="text-yellow-500 hover:underline">Forgot password?</a>
            </div>
            
            <div className="space-y-4 mt-6">
              <button type="submit" className="w-full py-3 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-600 transition duration-300">
                Log In
              </button>
              <button type="button" className="w-full py-3 bg-white text-black flex items-center justify-center font-semibold rounded-md hover:bg-gray-100 transition duration-300">
                <img src={GoogleSvg} alt="Google icon" className="mr-2" />
                Log In with Google
              </button>
            </div>
          </form>
        </div>

        <p className="text-center text-gray-400 mt-6">
          Don't have an account? <Link to="/register" className="text-yellow-500 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
