import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Ensure useNavigate is imported

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    gender: '',
    bio: '',
    profilePic: null,
  });

  const navigate = useNavigate(); // Initialize the navigate function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({ ...prevData, profilePic: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataObj = new FormData();
    formDataObj.append('username', formData.username);
    formDataObj.append('firstName', formData.firstName);
    formDataObj.append('lastName', formData.lastName);
    formDataObj.append('password', formData.password);
    formDataObj.append('gender', formData.gender);
    formDataObj.append('bio', formData.bio);

    try {
      const response = await axios.post('http://localhost:3000/users/signup', formDataObj, );
      
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard'); // Redirect to the dashboard
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Join Raahi</h2>
        <p className="text-center text-gray-600 mb-8">Connect with fellow travelers around the world</p>
        
        <form onSubmit={handleSubmit} className="space-y-4" >
          <div className="flex space-x-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-1/2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-1/2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <input
            type="text"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          
          <div className="flex items-center justify-center w-full">
            <label htmlFor="profile_pic" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Camera className="w-8 h-8 mb-4 text-gray-500" />
                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500">PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
              <input id="profile_pic" type="file" onChange={handleFileChange} className="hidden" />
            </label>
          </div>
          
          <textarea
            name="bio"
            placeholder="Tell us about yourself and your travels..."
            value={formData.bio}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          ></textarea>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Sign Up
          </button>
        </form>
        
        <p className="text-center text-gray-600 mt-6">
          Already have an account? <a href="#" onClick={navigate('/')} className="text-blue-600 hover:underline">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
