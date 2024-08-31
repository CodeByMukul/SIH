import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
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

const ProfilePage = ({posts=[],user={},url='',urls=[]}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  // const posts = [
  //   {
  //     id: 1,
  //     content: 'Exploring the hidden gems of Rajasthan! #travel #adventure',
  //     image: '/api/placeholder/400/300',
  //     location: 'Jaipur, India',
  //     likes: 42,
  //     comments: 7,
  //     shares: 3,
  //   },
  //   // Add more posts as needed
  // ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
<Header></Header>

      {/* Main Content */}
      <main className="pt-16">
        {/* Profile Info */}
        <div className="container mx-auto px-4 py-6">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
              <img
                src={url}
                alt={user.name}
                className="w-32 h-32 rounded-full border-4 border-yellow-500 shadow-lg object-cover object-center"
              />
              <div className="mt-4 md:mt-0 flex-grow">
                <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                <p className="text-gray-400">@{user.username}</p>
                <p className="text-gray-300 mt-2">{user.bio}</p>
                <div className="flex flex-wrap items-center text-sm text-gray-400 space-x-4 mt-3">
                  <span className="flex items-center">
                    <Globe size={16} className="mr-1 text-yellow-500" />{' '}
                    {user.locationCount} countries
                  </span>
                  <span className="flex items-center">
                    <Camera size={16} className="mr-1 text-yellow-500" />{' '}
                    {//!posts.length ki jagah backend db me add krna h logic
                    posts.length} moments
                  </span>
                  <span className="flex items-center">
                    <Book size={16} className="mr-1 text-yellow-500" />{' '}
                    {user.followers} travel buddies
                  </span>
                  <span className="flex items-center">
                    <Calendar size={16} className="mr-1 text-yellow-500" /> Since{' '}
                    {user.joinedDate}
                  </span>
                </div>
              </div>
              <button className="mt-4 md:mt-0 bg-yellow-500 text-black px-6 py-2 rounded-full text-sm font-semibold hover:bg-yellow-600 transition duration-300">
                Follow Journey
              </button>
            </div>
          </div>
        </div>

        {/* Travel Achievements */}
        <div className="container mx-auto px-4 py-6">
          <div className="bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-yellow-500 mb-4">
              Travel Achievements
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-black rounded-lg p-4 text-center hover:bg-gray-700 transition-colors duration-200">
                <Globe className="mx-auto text-yellow-500 mb-2" size={24} />
                <p className="font-bold text-2xl text-white">
                  {user.locationCount}
                </p>
                <p className="text-sm text-gray-400">Countries Explored</p>
              </div>
              <div className="bg-black rounded-lg p-4 text-center hover:bg-gray-700 transition-colors duration-200">
                <Camera className="mx-auto text-yellow-500 mb-2" size={24} />
                <p className="font-bold text-2xl text-white">{posts.length}</p>
                <p className="text-sm text-gray-400">Moments Captured</p>
              </div>
              <div className="bg-black rounded-lg p-4 text-center hover:bg-gray-700 transition-colors duration-200">
                <Book className="mx-auto text-yellow-500 mb-2" size={24} />
                <p className="font-bold text-2xl text-white">
                  {user.followers}
                </p>
                <p className="text-sm text-gray-400">Travel Buddies</p>
              </div>
              <div className="bg-black rounded-lg p-4 text-center hover:bg-gray-700 transition-colors duration-200">
                <MapPin className="mx-auto text-yellow-500 mb-2" size={24} />
                <p className="font-bold text-2xl text-white">142</p>
                <p className="text-sm text-gray-400">Places Visited</p>
              </div>
            </div>
          </div>
        </div>

        {/* Travel Log */}
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6 text-white">Travel Log</h2>
          <div className="space-y-6">
            {posts.map((post,i) => (
              <div
                key={post.id}
                className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={urls[i]}
                  alt="Travel moment"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="flex items-center text-gray-400">
                      <MapPin size={16} className="mr-2 text-yellow-500" />
                      {post.location}
                    </span>
                    <span className="text-sm text-gray-500">2 days ago</span>
                  </div>
                  <p className="text-gray-300 mb-4" onClick={(e)=>handleClick(post)}>{post.caption}</p>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>❤️ {post.likes} travelers inspired</span>
                    <span>💬 {post.comments} shared experiences</span>
                    <span>🔁 {post.shares} adventures continued</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
