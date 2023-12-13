import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateBlog = ({ onClose, blogData }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null, // Change to null as we'll be dealing with a file
  });

  useEffect(() => {
    // When blogData changes (when updating the form)
    if (blogData) {
      setFormData({
        title: blogData.title || "",
        content: blogData.content || "",
        image: null, // Clear the image when loading new data
      });
    }
  }, [blogData]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      // Handle file upload separately
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Use FormData to handle file uploads
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("content", formData.content);
      formDataToSend.append("image", formData.image);

      // Send data to update the blog
      await axios.put(`http://localhost:8080/updateArticle/${blogData.id}`, formDataToSend);

      // Upon successful completion, close the form
      onClose();
    } catch (error) {
      console.error("Error updating blog: ", error);
      // Handle the error as needed
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
          Blog Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
          Blog Image
        </label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
          Blog Content
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white hover:bg-blue-800 p-2 rounded-md mt-4 cursor-pointer mx-auto block"
        >
          Update Blog
        </button>
      </div>
    </form>
  );
};

export default UpdateBlog;
