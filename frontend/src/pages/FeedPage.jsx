import React, { useEffect, useState } from 'react';
import { Heart, MessageCircle, Bookmark, MapPin, Clock } from 'lucide-react';
import axios from 'axios';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(post.bookmarked);
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white rounded-lg shadow-lg overflow-hidden mb-6 transition-transform transform hover:scale-105">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <img src={post.username.profile_pic.url} alt={post.location} className="w-12 h-12 rounded-full mr-4" />
          <div>
            <h3 className="font-semibold text-yellow-400">{post.username.username}</h3>
            <div className="flex items-center text-gray-400 text-sm">
              <Clock className="w-4 h-4 mr-1" />
              <span>{post.timeUploaded}</span>
              <MapPin className="w-4 h-4 ml-2 mr-1" />
              <span>{post.location}</span>
            </div>
          </div>
        </div>
        <p className="mb-2">{post.caption}</p>
        <p className="text-yellow-500 text-sm mb-4">#{post.activity}</p>
        <img src={post.media.url} alt="Post" className="w-full h-64 object-cover rounded-lg mb-4" />
        <div className="flex items-center justify-between text-gray-400">
          <div className="flex items-center space-x-4">
            <button
              className={`flex items-center ${liked ? 'text-yellow-400' : ''}`}
              onClick={() => setLiked(!liked)}
            >
              <Heart className="w-5 h-5 mr-1" fill={liked ? 'currentColor' : 'none'} />
              <span>{liked ? post.likes + 1 : post.likes}</span>
            </button>
            <button className="flex items-center">
              <MessageCircle className="w-5 h-5 mr-1" />
              <span>{post.comments}</span>
            </button>
          </div>
          <button
            className={`${bookmarked ? 'text-yellow-400' : ''}`}
            onClick={() => setBookmarked(!bookmarked)}
          >
            <Bookmark className="w-5 h-5" fill={bookmarked ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
    </div>
  );
};

const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token") || "";
  const navigate = useNavigate();

  useEffect(() => {
    async function getPost() {
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const res = await axios.get("http://localhost:3000/posts/", axiosConfig);
        console.log(res.data);
        setPosts(res.data.posts);
      } catch (e) {
        console.log(e.message);
      }
    }
    getPost();
  }, [token]);

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-8 mt-14">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </main>
    </div>
  );
};

export default FeedPage;
