import React from 'react';
import { Search, Home, Compass, Bell, User, MapPin, Calendar, Globe, Camera, Book } from 'lucide-react';

const ProfilePage = () => {
  const user = {
    username: 'johndoe',
    name: 'John Doe',
    bio: 'Passionate traveler and photographer',
    locationCount: 25,
    joinedDate: 'January 2020',
    followers: 1234,
    following: 567,
    posts: 89,
    profilePhoto: '/api/placeholder/150/150',
  };

  const posts = [
    { 
      id: 1, 
      content: 'Exploring the hidden gems of Rajasthan! #travel #adventure', 
      image: '/api/placeholder/400/300',
      location: 'Jaipur, India',
      likes: 42,
      comments: 7,
      shares: 3
    },
    // Add more posts as needed
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md fixed w-full z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-600">Raahi</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Discover new places..." 
                className="pl-8 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <Home className="text-gray-600 cursor-pointer" />
            <Compass className="text-gray-600 cursor-pointer" />
            <Bell className="text-gray-600 cursor-pointer" />
            <User className="text-gray-600 cursor-pointer" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        {/* Profile Info */}
        <div className="container mx-auto px-4 py-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
              <img src={user.profilePhoto} alt={user.name} className="w-32 h-32 rounded-full border-4 border-blue-100 shadow-lg" />
              <div className="mt-4 md:mt-0 flex-grow">
                <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
                <p className="text-gray-600">@{user.username}</p>
                <p className="text-gray-700 mt-2">{user.bio}</p>
                <div className="flex flex-wrap items-center text-sm text-gray-600 space-x-4 mt-3">
                  <span className="flex items-center"><Globe size={16} className="mr-1" /> {user.locationCount} countries</span>
                  <span className="flex items-center"><Camera size={16} className="mr-1" /> {user.posts} moments</span>
                  <span className="flex items-center"><Book size={16} className="mr-1" /> {user.followers} travel buddies</span>
                  <span className="flex items-center"><Calendar size={16} className="mr-1" /> Since {user.joinedDate}</span>
                </div>
              </div>
              <button className="mt-4 md:mt-0 bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-blue-600 transition duration-300">
                Follow Journey
              </button>
            </div>
          </div>
        </div>

        {/* Travel Achievements */}
        <div className="container mx-auto px-4 py-6">
          <div className="bg-blue-50 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Travel Achievements</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 text-center">
                <Globe className="mx-auto text-blue-500 mb-2" size={24} />
                <p className="font-bold text-2xl text-gray-800">{user.locationCount}</p>
                <p className="text-sm text-gray-600">Countries Explored</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <Camera className="mx-auto text-blue-500 mb-2" size={24} />
                <p className="font-bold text-2xl text-gray-800">{user.posts}</p>
                <p className="text-sm text-gray-600">Moments Captured</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <Book className="mx-auto text-blue-500 mb-2" size={24} />
                <p className="font-bold text-2xl text-gray-800">{user.followers}</p>
                <p className="text-sm text-gray-600">Travel Buddies</p>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <MapPin className="mx-auto text-blue-500 mb-2" size={24} />
                <p className="font-bold text-2xl text-gray-800">142</p>
                <p className="text-sm text-gray-600">Places Visited</p>
              </div>
            </div>
          </div>
        </div>

        {/* Travel Log */}
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Travel Log</h2>
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={post.image} alt="Travel moment" className="w-full h-64 object-cover" />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="flex items-center text-gray-600">
                      <MapPin size={16} className="mr-2" />
                      {post.location}
                    </span>
                    <span className="text-sm text-gray-500">2 days ago</span>
                  </div>
                  <p className="text-gray-800 mb-4">{post.content}</p>
                  <div className="flex items-center justify-between text-sm text-gray-600">
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
