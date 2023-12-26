

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const BlogCard = ({ blog }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <div
//       className={`max-w-sm rounded overflow-hidden shadow-lg transition-transform duration-300 transform bg-white ${
//         isHovered ? "scale-105" : ""
//       }`}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <Link to={`/blog-details/${blog.id}`}>
//         <img
//           className="w-full h-40 object-cover"
//           src={blog.articles_image}
//           alt={blog.title}
//         />
//       </Link>
//       <div className="px-6 py-4">
//         <Link to={`/blog-details/${blog.id}`}>
//           <div className="font-bold text-xl mb-2 text-black dark:text-black">
//             {blog.title}
//           </div>
//         </Link>
//         <p className="text-sm text-black dark:text-black">
//           {blog.content}
//         </p>
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
//     <div className="flex flex-col items-center justify-center min-h-screen  ">
//       <h1 className="text-black text-4xl mb-6 font-bold item-center justify-center text-center">
//         Our Blogs
//       </h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-4 my-4 w-10/12 text-white">
//         {currentBlogs.map((blog) => (
//           <BlogCard key={blog.id} blog={blog} />
//         ))}
//       </div>
//       <div className="col-span-full flex justify-center mt-4">
//         <button
//           className="mx-2 p-2 bg-red-700 text-white hover:bg-black focus:outline-none rounded-full"
//           onClick={() => paginate(currentPage - 1)}
//           disabled={currentPage === 1}
//         >
//           Prev
//         </button>
//         {Array.from({ length: totalPages }).map((_, index) => (
//           <button
//             key={index + 1}
//             onClick={() => paginate(index + 1)}
//             className={`mx-2 p-2 bg-red-700 text-white hover:bg-black focus:outline-none rounded-full ${
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
//           className="mx-2 p-2 bg-red-700 text-white hover:bg-black focus:outline-none rounded-full"
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
  return (
    <div className="mx-10 ">
 <div className="bg-black w-full my-4 ">
      <Link to={`/blog-details/${blog.id}`}>
        <img className="w-full h-56 object-cover" src={blog.articles_image} alt={blog.title} />
      </Link>
      <div className="p-4">
        <Link to={`/blog-details/${blog.id}`}>
          <div className="font-bold text-xl mb-2 text-white dark:white-black hover:text-red-700">
            {blog.title}
          </div>
        </Link>
        <p className="text-sm text-white dark:text-white line-clamp-2">
  {blog.content}
</p>
      </div>
    </div>
    </div>
  );
};


const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 4; // Display 4 cards per row
  const totalBlogs = blogs.length;

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

  const totalPages = Math.ceil(totalBlogs / blogsPerPage);
  const maxSlideIndex = totalPages - 1;
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === maxSlideIndex ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? maxSlideIndex : prevSlide - 1));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(intervalId); // Cleanup function to clear the interval on component unmount
  }, [currentSlide]); // Add currentSlide as a dependency to re-run the effect when the slide changes

  const startBlogIndex = currentSlide * blogsPerPage;
  const endBlogIndex = startBlogIndex + blogsPerPage;
  const currentBlogs = blogs.slice(startBlogIndex, endBlogIndex);

  return (
    <div className="  bg-black">
      <h1 className="text-4xl font-bold text-center mb-8 text-white py-6 dark:text-gray-200">
        Our Blogs
      </h1>
      <div className="relative grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentBlogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
        <button
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full "
          onClick={prevSlide}
        >
          {/* SVG for Previous Slide */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full"
          onClick={nextSlide}
        >
          {/* SVG for Next Slide */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
      <div className="flex justify-center py-14">
      <Link
        to="/AllBlog"
        className="text-md flex justify-center items-center w-32 gap-x-2 rounded-lg bg-red-700  py-4 font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
      >
        View All
      </Link>
    </div>
    </div>
  );
};

export default Blogs;
