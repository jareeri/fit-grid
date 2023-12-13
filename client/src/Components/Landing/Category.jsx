// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// const Category = () => {
//   const [data, setData] = useState([]);
//   const [visibleItems, setVisibleItems] = useState(4);

//   useEffect(() => {
//     AOS.init();
//     axios
//       .get('http://localhost:3000/category')
//       .then((response) => {
//         setData(response.data);
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   }, []);

//   return (
//     <div data-aos="fade-up" className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
//       <h1 className="text-[#22092C] text-4xl mb-6 font-bold text-center">Explore Categories</h1>
//       <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 w-full">
//         {data.slice(0, visibleItems).map((item, index) => (
//           <Link to={`/category/${item.id}`} key={index}>
//             <div className="relative overflow-hidden transition duration-300 transform rounded shadow-lg lg:hover:-translate-y-2 hover:shadow-2xl h-[20rem]">
//               <img
//                 className="object-cover w-full h-full rounded-t-md"
//                 src={item.image}
//                 alt={`Category Image ${index + 1}`}
//               />
//               <div className="absolute inset-0 flex flex-col justify-end px-5 py-4 text-start transition-opacity duration-300 bg-gradient-to-t from-black to-transparent">
//                 <p className="font-bold text-white text-2xl mb-2">{item.category}</p>
//                 <div className="flex items-center justify-between text-gray-300">
//                   <span>Explore Now</span>
               
//                 </div>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//       <Link to="/CategoryItems">
//         <button className="p-3  bg-gradient-to-r from-[#22092C] to-[#363636] text-white rounded-xl mt-6 hover:opacity-80 transition-all duration-300">
//           Explore More Categories
//         </button>
//       </Link>
//     </div>
//   );
// };

// export default Category;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Category = () => {
  const [data, setData] = useState([]);
  const [visibleItems, setVisibleItems] = useState(4);

  useEffect(() => {
    AOS.init();
    axios
      .get('http://localhost:8080/plans/getAllCategories')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      // console.log(response.data);
  }, []);

  return (
    <div data-aos="fade-up" className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <h1 className="text-[#22092C] text-4xl mb-6 font-bold text-center">Explore Categories</h1>
      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 w-full">
        {data.slice(0, visibleItems).map((item, index) => (
          <Link to={`/category/${item.id}`} key={index}>
            <div className="relative overflow-hidden transition duration-300 transform rounded shadow-lg lg:hover:-translate-y-2 hover:shadow-2xl h-[20rem]">
              <img
                className="object-cover w-full h-full rounded-t-md"
                src={item.image}
                alt={`Category Image ${index + 1}`}
              />
              <div className="absolute inset-0 flex flex-col justify-end px-5 py-4 text-start transition-opacity duration-300 bg-gradient-to-t from-black to-transparent">
                <p className="font-bold text-white text-2xl mb-2">{item.category}</p>
                <div className="flex items-center justify-between text-gray-300">
                  <span>Explore Now</span>
               
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Link to="/CategoryItems">
        <button className="p-3  bg-gradient-to-r from-[#22092C] to-[#363636] text-white rounded-xl mt-6 hover:opacity-80 transition-all duration-300">
          Explore More Categories
        </button>
      </Link>
    </div>
  );
};

export default Category;
