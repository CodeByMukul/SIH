import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Logout.css";

const Logout = () => {
  const [countdown, setCountdown] = useState(3); // State for countdown
  const navigate = useNavigate();

  useEffect(() => {
    // Remove token from localStorage
    localStorage.removeItem("token");

    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          clearInterval(timer); // Clear interval when countdown reaches 1
          navigate("/"); // Redirect to landing page
        }
        return prevCountdown - 1;
      });
    }, 1000);

    // Cleanup function to clear interval if component unmounts
    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-4">
          R<span className="text-yellow-500">aa</span>h<span className="text-white">i</span>
        </h1>
        <h1 className="text-4xl font-bold mb-4">Logout Successful!</h1>
        <p className="text-lg text-gray-400">
          You will be redirected to the landing page in {countdown} second{countdown > 1 ? 's' : ''}...
        </p>
      </div>
    </div>
  );
};

export default Logout;
