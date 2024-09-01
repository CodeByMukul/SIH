import React, { useEffect, useState } from 'react';
import { Heart, MessageCircle, Bookmark, MapPin, Clock } from 'lucide-react';
import axios from 'axios';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(post.bookmarked);
    const navigate=useNavigate()
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <img src={post.media.url} alt={post.location} className="w-10 h-10 rounded-full mr-3" />
          <div>
            <h3 className="font-semibold">{post.username.username}</h3>
            <div className="flex items-center text-gray-500 text-sm">
              <Clock className="w-4 h-4 mr-1" />
              <span>{post.timeUploaded}</span>
              <MapPin className="w-4 h-4 ml-2 mr-1" />
              <span>{post.location}</span>
            </div>
          </div>
        </div>
        <p className="mb-2">{post.caption}</p>
        <p className="text-blue-500 text-sm mb-4">#{post.activity}</p>
        {/* <div className="flex flex-wrap -mx-1 mb-4">
          {post.photos.map((photo, index) => (
            <div key={index} className="w-1/2 px-1 mb-2">
              <img src={photo} alt={`Post photo ${index + 1}`} className="w-full h-48 object-cover rounded" />
            </div>
          ))}
        </div> */}
        <div className="flex items-center justify-between text-gray-500">
          <div className="flex items-center space-x-4">
            <button
              className={`flex items-center ${liked ? 'text-red-500' : ''}`}
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
            className={`${bookmarked ? 'text-yellow-500' : ''}`}
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
  }, []); // Include token as a dependency

  return (
    <div className="bg-gray-100 min-h-screen">
<Header></Header>
      <main className="max-w-2xl mx-auto px-4 py-8 mt-14">
        {posts.map((post) => (
            <a href={'http://localhost:5173/post?id='+post._id}  className='cursor-pointer'>
          <PostCard key={post.id} post={post} /></a>
        ))}
      </main>
    </div>
  );
};

export default FeedPage;
