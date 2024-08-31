import React, { useEffect ,useState} from 'react';
import '../styles/index.css'; // Ensure this includes Futura font import
import Header from '../components/Header';
import { useSearchParams } from 'react-router-dom';
function RaahiInterface() {
    const [searchParams]=useSearchParams();
    const [data,setData]=useState({})
    const id=searchParams.get("id")
    useEffect(()=>{
        if(id){
        async function getPost(){
            let axiosConfig = {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              };
        
              try {
                const res=await axios.get("http://localhost:3000/users/user",axiosConfig);
                console.log(res)}
                catch(e){
                    console.log(e.message);
                }
        }}
    },[]);
  return (
    <div className="min-h-screen flex flex-col bg-black p-6">
        
<Header></Header>
      {/* Main Content Section */}
      <div className="flex-grow flex items-center justify-center">
        <article className="max-w-6xl w-full bg-black rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col sm:flex-row border border-yellow-500">
          {/* Left Image Section */}
          <div className="sm:w-1/2">
            <img
              alt="Furniture arrangement"
              src={data.media}
              className="h-72 w-full object-cover sm:h-full"
            />
          </div>

          {/* Right Text Section */}
          <div className="p-8 sm:w-1/2 flex flex-col justify-between text-white font-futura">
            <div>
              <time dateTime="2022-10-10" className="block text-base text-yellow-400">
                {data.uploadTime}
              </time>

              <a href="#" className="block mt-4">
                <h3 className="text-xl font-semibold text-white">
                  How to position your furniture for positivity
                </h3>
              </a>

              <p className="mt-4 text-lg text-white">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae dolores, possimus
                pariatur animi temporibus nesciunt praesentium dolore sed nulla ipsum eveniet corporis
                quidem, mollitia itaque minus soluta, voluptates neque explicabo tempora nisi culpa eius
                atque dignissimos. Molestias explicabo corporis voluptatem?
              </p>
            </div>

            {/* Comments Section */}
            <div className="mt-8">
              <h4 className="text-lg font-medium text-yellow-500 mb-4">Comments</h4>
              <ul className="space-y-6">
                <li className="bg-black border border-yellow-500 p-4 rounded-lg">
                  <p className="text-base text-white">
                    <span className="font-bold text-yellow-500">John Doe:</span> Great article! I found the tips very useful.
                  </p>
                </li>
                <li className="bg-black border border-yellow-500 p-4 rounded-lg">
                  <p className="text-base text-white">
                    <span className="font-bold text-yellow-500">Jane Smith:</span> Thanks for sharing this!
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

export default RaahiInterface;
