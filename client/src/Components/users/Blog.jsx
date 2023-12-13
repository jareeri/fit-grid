// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

// import UpdateBlog from "../UpdateBlog";
// import BlogForm from "../BlogForm";

// import { useCookies } from "react-cookie";


// const Blog = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showPopup, setShowPopup] = useState(false);
//   const [deleteMessage, setDeleteMessage] = useState("");
//   const [updateBlogData, setUpdateBlogData] = useState(null);
//   const navigate = useNavigate();
//   const [cookie] = useCookies(["token", "role_id"]);
//   const user_id = cookie.user_id;
//   console.log(user_id);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/articles/for-trainer/${user_id}`);
//         setBlogs(response.data);
//       } catch (error) {
//         console.error("Error fetching data: ", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const indexOfLastBlog = currentPage * 6;
//   const indexOfFirstBlog = indexOfLastBlog - 6;
//   const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

//   const totalPages = Math.ceil(blogs.length / 6);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const handleUpdate = (blogId) => {
//     const blogToUpdate = blogs.find((blog) => blog.id === blogId);
//     setUpdateBlogData(blogToUpdate);
//     setShowPopup(true);
//   };

//   const handleDelete = async (blogId) => {
//     try {
//       // Send a PATCH request to update the status for soft delete
//       await axios.put(`http://localhost:8080/getArticleById/${blogId}`, { isdeleted: 'true' });
//       const response = await axios.get("http://localhost:8080/getArticleById/");
//       setBlogs(response.data);
//     } catch (error) {
//       console.error('Error soft deleting blog:', error);
//     }
//   };

//   const handleAdd = () => {
//     setUpdateBlogData(null);
//     setShowPopup(true);
//   };

//   return (
//     <div className="ml-44 my-16">
//       <div className="flex flex-col items-center justify-center min-h-screen ">
//         <h1 className="text-gray-800 text-4xl mb-6 font-bold text-center">My Blog</h1>
//         {/* Display delete confirmation message */}
//         {deleteMessage && <p className="text-green-500">{deleteMessage}</p>}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-4 my-4 items-end justify-end ">
//           {currentBlogs.map((blog) => (
//             blog.isdeleted !== 'true' && (
//               <div key={blog.id} className="bg-white rounded-md overflow-hidden shadow-lg w-[20rem]">
//                 <Link to="#">
//                   <img src={blog.articles_image} alt="" className="w-full h-40 object-cover" />
//                 </Link>
//                 <div className="p-4 w-[20rem]">
//                   <Link to="#">
//                     <h5 className="w-[20rem] mb-2 text-xl font-bold text-gray-900 dark:text-white">
//                       {blog.title}
//                     </h5>
//                   </Link>
//                   <p className="w-[20rem] mb-3 text-sm text-gray-700 dark:text-gray-400">
//                     {blog.content}
//                   </p>
//                   <p className="w-[20rem] mb-3 text-sm text-gray-700 dark:text-gray-400">
//                     Published by: {blog.username}
//                   </p>
//                   <p className="w-[20rem] mb-3 text-sm text-gray-700 dark:text-gray-400">
//                     Published at: {blog.published_at}
//                   </p>
//                   <Link
//                     to={`/blog-details/${blog.id}`}
//                     className="inline-block px-4 py-2 text-sm font-bold text-white bg-gray-800 rounded-full hover:bg-gray-700 focus:outline-none"
//                   >
//                     Read More
//                   </Link>

//                   <button
//                     onClick={() => handleUpdate(blog.id)}
//                     className="inline-block px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none ml-2"
//                   >
//                     Update
//                   </button>

//                   <button
//                     onClick={() => handleDelete(blog.id)}
//                     className="inline-block px-4 py-2 text-sm font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none ml-2"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             )
//           ))}
//         </div>
//         <div className="col-span-full flex justify-center mt-4">
//           <button
//             className="mx-2 p-2 bg-gray-800 text-white hover:bg-gray-700 focus:outline-none rounded-full"
//             onClick={() => paginate(currentPage - 1)}
//             disabled={currentPage === 1}
//           >
//             Prev
//           </button>
//           {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
//             <button
//               key={number}
//               onClick={() => paginate(number)}
//               className={`mx-2 p-2 bg-gray-800 text-white hover:bg-gray-700 focus:outline-none rounded-full ${
//                 currentPage === number ? "bg-gray-800" : ""
//               }`}
//               style={{ width: "40px", height: "40px", borderRadius: "50%" }}
//             >
//               {number}
//             </button>
//           ))}
//           <button
//             className="mx-2 p-2 bg-gray-800 text-white hover:bg-gray-700 focus:outline-none rounded-full"
//             onClick={() => paginate(currentPage + 1)}
//             disabled={currentPage === totalPages}
//           >
//             Next
//           </button>
//         </div>

//         {/* Add Button to Trigger Popup */}
//         <button
//           className="fixed bottom-8 right-8 p-4 bg-gray-900 text-white rounded-full hover:bg-gray-600 focus:outline-none"
//           onClick={handleAdd}
//         >
//           Add Blog
//         </button>

//         {/* Popup */}
//         {showPopup && (
//           <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//             <div className="bg-white p-8 rounded-md shadow-lg">
//               {/* Display the content of BlogForm or UpdateBlogForm based on updateBlogData */}
//               {updateBlogData ? (
//                 <UpdateBlog
//                   onClose={() => setShowPopup(false)}
//                   blogData={updateBlogData}
//                 />
//               ) : (
//                 <BlogForm onClose={() => setShowPopup(false)} />
//               )}

//               {/* Add a close button */}
//               <button
//                 className="p-3 bg-red-500 text-white rounded-full hover:bg-red-700 focus:outline-none mt-4"
//                 onClick={() => setShowPopup(false)}
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Blog;

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

  return (
    <div className="ml-44 my-16">
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <h1 className="text-gray-800 text-4xl mb-6 font-bold text-center">My Blog</h1>
        {/* Display delete confirmation message */}
        {deleteMessage && <p className="text-green-500">{deleteMessage}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-4 my-4 items-end justify-end ">
          {currentBlogs.map((blog) => (
            blog.isdeleted !== 'true' && (
              <div key={blog.id} className="bg-white rounded-md overflow-hidden shadow-lg w-[20rem]">
                <Link to="#">
                  <img src={blog.articles_image} alt="" className="w-full h-40 object-cover" />
                </Link>
                <div className="p-4 w-[20rem]">
                  <Link to="#">
                    <h5 className="w-[20rem] mb-2 text-xl font-bold text-gray-900 dark:text-white">
                      {blog.title}
                    </h5>
                  </Link>
                  <p className="w-[20rem] mb-3 text-sm text-gray-700 dark:text-gray-400">
                    {blog.content}
                  </p>
                  <p className="w-[20rem] mb-3 text-sm text-gray-700 dark:text-gray-400">
                    Published by: {blog.username}
                  </p>
                  <p className="w-[20rem] mb-3 text-sm text-gray-700 dark:text-gray-400">
                    Published at: {blog.published_at}
                  </p>
                  <Link
                    to={`/blog-details/${blog.id}`}
                    className="inline-block px-4 py-2 text-sm font-bold text-white bg-gray-800 rounded-full hover:bg-gray-700 focus:outline-none"
                  >
                    Read More
                  </Link>

                  <button
                    onClick={() => handleUpdate(blog.id)}
                    className="inline-block px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none ml-2"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="inline-block px-4 py-2 text-sm font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none ml-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          ))}
        </div>
        <div className="col-span-full flex justify-center mt-4">
          <button
            className="mx-2 p-2 bg-gray-800 text-white hover:bg-gray-700 focus:outline-none rounded-full"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`mx-2 p-2 bg-gray-800 text-white hover:bg-gray-700 focus:outline-none rounded-full ${
                currentPage === number ? "bg-gray-800" : ""
              }`}
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            >
              {number}
            </button>
          ))}
          <button
            className="mx-2 p-2 bg-gray-800 text-white hover:bg-gray-700 focus:outline-none rounded-full"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>

        {/* Add Button to Trigger Popup */}
        <button
          className="fixed bottom-8 right-8 p-4 bg-gray-900 text-white rounded-full hover:bg-gray-600 focus:outline-none"
          onClick={handleAdd}
        >
          Add Blog
        </button>

        {/* Popup */}
        {showPopup && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-white p-8 rounded-md shadow-lg">
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
                className="p-3 bg-red-500 text-white rounded-full hover:bg-red-700 focus:outline-none mt-4"
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