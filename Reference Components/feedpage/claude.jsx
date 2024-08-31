import React from 'react';
import { Home, Compass, Bell, User, Search, Heart, MessageCircle, Share2 } from 'lucide-react';

const RaahiInterface = () => {
  const trendingTopics = ['Travel', 'Adventure', 'Photography'];
  const suggestedUsers = [
    { name: 'John Doe', username: '@johndoe' },
    { name: 'Jane Smith', username: '@janesmith' },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gray-900 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">Raahi</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Raahi"
              className="bg-gray-800 rounded-full py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <nav className="flex space-x-4">
          <Home className="h-6 w-6" />
          <Compass className="h-6 w-6" />
          <Bell className="h-6 w-6" />
          <User className="h-6 w-6" />
        </nav>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white p-4 overflow-y-auto">
          <section className="mb-8">
            <h2 className="font-semibold mb-2">Trending</h2>
            <ul>
              {trendingTopics.map((topic, index) => (
                <li key={index} className="mb-2">
                  <a href="#" className="text-blue-500">#{topic}</a>
                </li>
              ))}
            </ul>
          </section>
          <section className="mb-8">
            <h2 className="font-semibold mb-2">Suggested</h2>
            <ul>
              {suggestedUsers.map((user, index) => (
                <li key={index} className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.username}</p>
                  </div>
                  <button className="text-blue-500">+</button>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="font-semibold mb-2">Your Profile</h2>
            <div className="flex items-center">
              <User className="h-8 w-8 mr-2" />
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-gray-500">@johndoe</p>
              </div>
            </div>
          </section>
        </aside>

        {/* Main feed */}
        <main className="flex-1 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <div className="flex items-center mb-4">
              <User className="h-10 w-10 mr-2" />
              <div>
                <p className="font-medium">Jane Smith</p>
                <p className="text-sm text-gray-500">@janesmith</p>
              </div>
            </div>
            <p className="mb-4">Exploring the hidden gems of Rajasthan! #travel #adventure</p>
            <div className="bg-gray-200 h-64 flex items-center justify-center rounded-lg mb-4">
              <img src="/api/placeholder/400/320" alt="Placeholder for post image" className="max-w-full max-h-full" />
            </div>
            <div className="flex space-x-4">
              <button className="flex items-center text-gray-500 hover:text-red-500">
                <Heart className="h-5 w-5 mr-1" />
                Like
              </button>
              <button className="flex items-center text-gray-500 hover:text-blue-500">
                <MessageCircle className="h-5 w-5 mr-1" />
                Comment
              </button>
              <button className="flex items-center text-gray-500 hover:text-green-500">
                <Share2 className="h-5 w-5 mr-1" />
                Share
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RaahiInterface;