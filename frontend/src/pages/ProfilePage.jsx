import { User, MapPin, Calendar, Image, Home, Compass, Bell } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import "../styles/Dashboard.css";
import Navbar from '../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const ProfilePage = ({
  username= 'johndoe',
  name= 'John Doe',
  bio= 'Passionate traveler and photographer',
  locationCount= 25,
  joinedDate= 'January 2020',
  followers= 1234,
  following= 567,
  postss= 89,
  profilePhoto= "https://w7.pngwing.com/pngs/215/58/png-transparent-computer-icons-google-account-scalable-graphics-computer-file-my-account-icon-rim-123rf-symbol-thumbnail.png",
}) => {
  // Mock data - replace with actual data in a real application
  const user = {
    username,
    name,
    bio,
    locationCount,
    joinedDate,
    followers,
    following,
    postss,
    profilePhoto
  };

  const posts = [
    { 
      id: 1, 
      content: 'Exploring the hidden gems of Rajasthan! #travel #adventure', 
      image: '/api/placeholder/400/300',
      likes: 42,
      comments: 7,
      shares: 3
    },
    // Add more posts as needed
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 m-0">
      {/* Side Panel */}
    <Navbar></Navbar>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center mb-4">
            <img src={user.profilePhoto} alt={user.name} className="w-24 h-24 rounded-full mr-6" />
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-gray-600">@{user.username}</p>
              <p className="mt-2">{user.bio}</p>
            </div>
          </div>
          <div className="flex justify-between text-center">
            <div>
              <p className="font-bold">{user.posts}</p>
              <p className="text-gray-600">Posts</p>
            </div>
            <div>
              <p className="font-bold">{user.followers}</p>
              <p className="text-gray-600">Followers</p>
            </div>
            <div>
              <p className="font-bold">{user.following}</p>
              <p className="text-gray-600">Following</p>
            </div>
            <div>
              <p className="font-bold">{user.locationCount}</p>
              <p className="text-gray-600">Locations</p>
            </div>
          </div>
          <div className="mt-4 flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Joined {user.joinedDate}</span>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md">
              <div className="p-4 border-b">
                <div className="flex items-center">
                  <img src={user.profilePhoto} alt={user.name} className="w-10 h-10 rounded-full mr-3" />
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-600">@{user.username}</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="mb-4">{post.content}</p>
                <img src={post.image} alt="Post" className="w-full rounded-lg mb-4" />
                <div className="flex justify-between text-gray-600">
                  <span>❤️ {post.likes}</span>
                  <span>💬 {post.comments}</span>
                  <span>🔁 {post.shares}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;