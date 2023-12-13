// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const BlogCard = ({ blog }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <div
//       className={`max-w-sm rounded overflow-hidden shadow-lg transition-transform duration-300 transform ${
//         isHovered ? "scale-105" : ""
//       }`}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <Link to={`/blog-details/${blog.id}`}>
//         <img
//           className="w-full h-40 object-cover"
//           src={blog.blog_img}
//           alt={blog.blog_title}
//         />
//       </Link>
//       <div className="px-6 py-4">
//         <Link to={`/blog-details/${blog.id}`}>
//           <div className="font-bold text-xl mb-2 text-gray-900 dark:text-white">
//             {blog.blog_title}
//           </div>
//         </Link>
//         <p className="text-sm text-gray-700 dark:text-gray-400">
//           {blog.blog_subdescription}
//         </p>
//       </div>
//       <div className="px-6 py-4">
//         <Link
//           to={`/blog-details/${blog.id}`}
//           className="inline-block bg-gradient-to-r bg-gray-800 text-white rounded-full px-3 py-1 text-sm font-semibold mr-2 hover:from-yellow-500 hover:to-orange-600"
//         >
//           Read More
//         </Link>
//       </div>
//     </div>
//   );
// };

// const Blogs = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const blogsPerPage = 6;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/getAllArticles");
//         setBlogs(response.data);
//       } catch (error) {
//         console.error("Error fetching data: ", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const indexOfLastBlog = currentPage * blogsPerPage;
//   const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
//   const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

//   const totalPages = Math.ceil(blogs.length / blogsPerPage);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen mt-24">
//       <h1 className="text-[#27374D] text-4xl mb-6 font-bold item-center justify-center text-center">
//         Our Blogs
//       </h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mx-4 my-4 w-10/12">
//         {currentBlogs.map((blog) => (
//           <BlogCard key={blog.id} blog={blog} />
//         ))}
//       </div>
//       <div className="col-span-full flex justify-center mt-4">
//         <button
//           className="mx-2 p-2 bg-gray-800 text-white hover:bg-gray-700 focus:outline-none rounded-full"
//           onClick={() => paginate(currentPage - 1)}
//           disabled={currentPage === 1}
//         >
//           Prev
//         </button>
//         {Array.from({ length: totalPages }).map((_, index) => (
//           <button
//             key={index + 1}
//             onClick={() => paginate(index + 1)}
//             className={`mx-2 p-2 bg-gray-800 text-white hover:bg-gray-700 focus:outline-none rounded-full ${
//               currentPage === index + 1 ? "bg-gray-800" : ""
//             }`}
//             style={{
//               width: "40px",
//               height: "40px",
//               borderRadius: "50%",
//             }}
//           >
//             {index + 1}
//           </button>
//         ))}
//         <button
//           className="mx-2 p-2 bg-gray-800 text-white hover:bg-gray-700 focus:outline-none rounded-full"
//           onClick={() => paginate(currentPage + 1)}
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Blogs;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`max-w-sm rounded overflow-hidden shadow-lg transition-transform duration-300 transform ${
        isHovered ? "scale-105" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/blog-details/${blog.id}`}>
        <img
          className="w-full h-40 object-cover"
          src={blog.articles_image}
          alt={blog.title}
        />
      </Link>
      <div className="px-6 py-4">
        <Link to={`/blog-details/${blog.id}`}>
          <div className="font-bold text-xl mb-2 text-gray-900 dark:text-white">
            {blog.title}
          </div>
        </Link>
        <p className="text-sm text-gray-700 dark:text-gray-400">
          {blog.content}
        </p>
      </div>
      <div className="px-6 py-4">
        <Link
          to={`/blog-details/${blog.id}`}
          className="inline-block bg-gradient-to-r hover:bg-gradient-to-r from-[#22092C] to-[#363636] text-white rounded-full px-3 py-1 text-sm font-semibold mr-2 "
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/getAllArticles");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen mt-24">
      <h1 className="text-[#27374D] text-4xl mb-6 font-bold item-center justify-center text-center">
        Our Blogs
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-4 my-4 w-10/12">
        {currentBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
      <div className="col-span-full flex justify-center mt-4">
        <button
          className="mx-2 p-2 bg-[#27374D] text-white hover:bg-[#526D82] focus:outline-none rounded-full"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-2 p-2 bg-[#27374D] text-white hover:bg-[#526D82] focus:outline-none rounded-full ${
              currentPage === index + 1 ? "bg-gray-800" : ""
            }`}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
            }}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="mx-2 p-2 bg-[#27374D] text-white hover:bg-[#526D82] focus:outline-none rounded-full"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Blogs;
