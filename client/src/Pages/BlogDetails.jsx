import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const BlogDetails = () => {
  const [blog, setBlog] = useState({});
  const [relatedPosts, setRelatedPosts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/getArticleById/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchBlog();
  }, [id]);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/getAllArticles");
        const filteredRelatedPosts = response.data.slice(-3);
        setRelatedPosts(filteredRelatedPosts);
      } catch (error) {
        console.error("Error fetching related posts: ", error);
      }
    };

    fetchRelatedPosts();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16 relative">
      <div
        className="bg-cover bg-center text-center overflow-hidden"
        style={{
          minHeight: 500,
          backgroundImage: `url("${blog.articles_image}")`,
        }}
        title={blog.blog_title}
      ></div>
      <div className="max-w-3xl mx-auto">
        <div className="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
          <div className="bg-white relative top-0 -mt-32 p-5 sm:p-10">
            <h1 className="text-gray-900 font-bold text-3xl mb-2">{blog.title}</h1>
            <p className="text-gray-700 text-xs mt-2">
              Author:{" "}
              <a
                href="#"
                className="text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out"
              >
                {blog.username}
              </a>
            </p>
            <div className="max-w-4xl mx-auto text-lg text-gray-700 mt-4 rounded text-start">
              <p className="mt-2 leading-relaxed">{blog.content}</p>
            </div>
          </div>
        </div>
      </div>

      
      <br />
      <br />
      <>
        <Link
          to="/blogs"
          className="inline-block text-sm px-4 py-2 leading-none border rounded-md text-gray-800 border-gray-800 hover:border-transparent hover:text-white hover:bg-gray-800"
        >
          &larr; Back to blogs
        </Link>
      </>
      <br />
      <br />
    </div>
  );
};

export default BlogDetails;
