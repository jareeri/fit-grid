// Blog.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import UpdateBlog from "../UpdateBlog";
import BlogForm from "../BlogForm";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [updateBlogData, setUpdateBlogData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/articles/trainer");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastBlog = currentPage * 6;
  const indexOfFirstBlog = indexOfLastBlog - 6;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const totalPages = Math.ceil(blogs.length / 6);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleUpdate = (blogId) => {
    const blogToUpdate = blogs.find((blog) => blog.id === blogId);
    setUpdateBlogData(blogToUpdate);
    setShowPopup(true);
  };

  const handleDelete = async (blogId) => {
    try {
      // Send a PATCH request to update the status for soft delete
      await axios.put(`http://localhost:8080/softDeleteArticle/${blogId}`, { isdeleted: 'true' });
      const response = await axios.get("http://localhost:8080/articles/trainer");
      setBlogs(response.data);
    } catch (error) {
      console.error('Error soft deleting blog:', error);
    }
  };

  const handleAdd = () => {
    setUpdateBlogData(null);
    setShowPopup(true);
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="ml-10 lg:ml-44 my-10">
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <h1 className="text-gray-800 text-4xl mb-6 font-bold text-center">My Blog</h1>
        {/* Display delete confirmation message */}
        {deleteMessage && <p className="text-green-500">{deleteMessage}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end justify-end">
  {currentBlogs.map((blog) => (
    blog.isdeleted !== 'true' && (
      <div key={blog.id} className="bg-white rounded-md overflow-hidden shadow-lg  sm:w-[100%] md:w-[98%] lg:w-[100%]">
        <Link to="#">
          <img src={blog.articles_image} alt="" className="w-[20rem] h-40 object-cover" />
        </Link>
        <div className="p-4">
          <Link to="#">
            <h5 className="mb-2 text-xl font-bold text-gray-900 dark:text-white w-[15rem] line-clamp-1">
              {blog.title}
            </h5>
          </Link>
          <p className="mb-3 text-sm text-gray-700 dark:text-gray-400 w-[15rem] line-clamp-2">
            {blog.content}
          </p>
          <p className="mb-3 text-sm text-gray-700 dark:text-gray-400">
            Published by: {blog.username}
          </p>
          <p className="mb-3 text-sm text-gray-700 dark:text-gray-400">
            Published at: {blog.published_at}
          </p>
          <div className="flex justify-center">
          <Link
  to={`/blog-details/${blog.id}`}
  className="inline-block px-3 py-2 text-xs lg:text-xs md:text-xs font-bold text-white bg-gray-800 rounded-full hover:bg-gray-700 focus:outline-none"
>
  Read More
</Link>

<button
  onClick={() => handleUpdate(blog.id)}
  className="inline-block px-3 py-2 text-xs lg:text-xs md:text-xs  font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none ml-2"
>
  Update
</button>

<button
  onClick={() => handleDelete(blog.id)}
  className="inline-block px-3 py-2 text-xs lg:text-xs md:text-xs font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none ml-2"
>
  Delete
</button>

        </div>
        </div>
      </div>
    )
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
            className={`mx-2 p-2 bg-red-700 text-white hover:bg-black focus:outline-none rounded-md ${
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

        {/* Add Button to Trigger Popup */}
        <button
          className="fixed bottom-8 right-8 p-4 bg-red-700 text-white rounded-full hover:bg-red-600 focus:outline-none"
          onClick={handleAdd}
        >
          Add Blog
        </button>

        {/* Popup */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-800 bg-opacity-50"></div>
          <div className="z-10 w-full max-w-md mx-auto mt-8 p-4 bg-white rounded-md shadow-lg relative">
              {/* Display the content of BlogForm or UpdateBlogForm based on updateBlogData */}
              {updateBlogData ? (
                <UpdateBlog
                  onClose={() => setShowPopup(false)}
                  blogData={updateBlogData}
                />
              ) : (
                <BlogForm onClose={() => setShowPopup(false)} />
              )}

              {/* Add a close button */}
              <button
                className="p-3 bg-red-500 text-white rounded-full hover:bg-red-700 focus:outline-none mx-auto block"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;