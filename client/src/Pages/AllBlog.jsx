import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const blogsPerPage = 12;

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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page when the search query changes
  };

  const handlePageChange = (pageNumber) => {
    paginate(pageNumber);
  };

  // Filter blogs based on the search query
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section>
      <div
        style={{
          background:
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://timelinecovers.pro/facebook-cover/download/gym-one-more-facebook-cover.jpg",
          backgroundSize: "cover",
        }}
        className="py-52 px-1 pt-64 md:px-8 text-center relative text-white font-bold text-2xl md:text-3xl overflow-auto"
      >
        <h1 className="pb-4 ">Search for Blog</h1>
        <div className="w-11/12 md:w-3/4 lg:max-w-3xl m-auto">
          <div className="relative z-30 text-base text-black">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Keyword"
              className="mt-2 shadow-md focus:outline-none rounded-2xl py-3 px-6 block w-full "
            />  
            <div className="text-left absolute top-10 rounded-t-none rounded-b-2xl shadow bg-white divide-y w-full max-h-40 overflow-auto"></div>
          </div>
        </div>
      </div>
      <div className="mx-20 my-20 bg-white">
        <div className="container mx-auto my-8 p-4 bg-white text-black">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog).map((blog) => (
              <div key={blog.id} className="bg-white w-full my-4 rounded overflow-hidden shadow-lg">
                <Link to={`/blog-details/${blog.id}`}>
                  <img className="w-full h-56 object-cover" src={blog.articles_image} alt={blog.title} />
                </Link>
                <div className="p-4">
                  <Link to={`/blog-details/${blog.id}`}>
                    <div className="font-bold text-xl mb-2 text-red-700 dark:text-red-700 hover:text-red-400">
                      {blog.title}
                    </div>
                  </Link>
                  <p className="text-sm text-black dark:text-black line-clamp-2">
                    {blog.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <button
              className={`mx-2 p-2 bg-black text-white hover:bg-red-700 focus:outline-none rounded-md ${
                currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-2 p-2 bg-black text-white hover:bg-red-700 focus:outline-none rounded-md ${
                  currentPage === index + 1 ? 'bg-gray-800' : ''
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              className={`mx-2 p-2 bg-black text-white hover:bg-red-700 focus:outline-none rounded-md ${
                currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllBlog;
