import React, { useState } from 'react';
import axios from 'axios';

function BlogForm() {
  const [title, setTitle] = useState('');
  const [blogDescription, setBlogDescription] = useState('');
  const [image, setImage] = useState(null);

  const [isSuccess, setIsSuccess] = useState(false);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBlogDescriptionChange = (e) => {
    setBlogDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.set('title', title);
      formData.set('content', blogDescription);
      formData.set('image', image);

      const response = await axios.post('http://localhost:8080/createArticle', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Blog created:', response.data);
      setIsSuccess(true);
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  return (
    <div className="BlogForm bg-white p-8 rounded-lg ">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Create a New Blog</h2>

      {isSuccess && (
        <div className="mb-4 p-2 bg-green-200 text-green-800 rounded-md">
          Blog created successfully!
        </div>
      )}

      <form className="flex flex-wrap " onSubmit={handleSubmit}>
        <div className="mb-4 w-full ">
          <label htmlFor="title" className="block text-sm font-medium text-gray-600">
            Blog Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleTitleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4 w-full">
          <label htmlFor="image" className="block text-sm font-medium text-gray-600">
            Image URL:
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4 w-full">
          <label htmlFor="blogDescription" className="block text-sm font-medium text-gray-600">
            Blog Description:
          </label>
          <textarea
            id="blogDescription"
            name="blogDescription"
            value={blogDescription}
            onChange={handleBlogDescriptionChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="p-2 bg-gray-800 text-white rounded-md hover:bg-gray-600 focus:outline-none flex"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
}

export default BlogForm;
