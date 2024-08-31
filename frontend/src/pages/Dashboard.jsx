import React, { useEffect, useState } from 'react';
import "../styles/Dashboard.css";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import ProfilePage from './raahiProfilePage';
const Dashboard = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [data, setData] = useState({});
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLuckyNumber = async () => {
      let axiosConfig = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      try {
        const response = await axios.get("http://localhost:3000/posts/", axiosConfig);
        setData(response.data);
        setPosts(response.data.posts); // Correctly setting posts here
        console.log(response.data.posts);
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
    };

    fetchLuckyNumber(); // Don't forget to call the function!

    if (token === "") {
      navigate("/");
      toast.warn("Please login first to access the dashboard");
    }
  }, [token]);

  return (
    <div>
      <h1>Dashboard</h1>


      <Link to="/logout" className="logout-button">Logout</Link>
      <div>
      {/* <article className="overflow-hidden rounded-lg shadow transition hover:shadow-lg">
  <img
    alt=""
    src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
    className="h-56 w-full object-cover"
  />

  <div className="bg-white p-4 sm:p-6">
    <time datetime="2022-10-10" className="block text-xs text-gray-500"> 10th Oct 2022 </time>

    <a href="#">
      <h3 className="mt-0.5 text-lg text-gray-900">How to position your furniture for positivity</h3>
    </a>

    <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae dolores, possimus
      pariatur animi temporibus nesciunt praesentium dolore sed nulla ipsum eveniet corporis quidem,
      mollitia itaque minus soluta, voluptates neque explicabo tempora nisi culpa eius atque
      dignissimos. Molestias explicabo corporis voluptatem?
    </p>
  </div>
</article> */}
<ProfilePage></ProfilePage>
{
        posts.map((post, index) => (
          <div key={index}>
            {post.caption}
          </div>
        ))
      }
      </div>
    </div>
    
  );
};

export default Dashboard;
