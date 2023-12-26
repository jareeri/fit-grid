import React, { useState } from 'react';
import axios from 'axios';

// Extracted Input Component for Reusability
const InputField = ({ label, type, id, name, value, onChange, required }) => (
  <div className="mb-4 w-full">
    <label htmlFor={id} className="block text-sm font-medium text-gray-600">
      {label}:
    </label>
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-red-700"
    />
  </div>
);

function BlogForm() {
  const [formData, setFormData] = useState({
    title: '',
    blogDescription: '',
    image: null,
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { title, blogDescription, image } = formData;

      const pp = new FormData();
      pp.append('title', title);
      pp.append('content', blogDescription);
      pp.append('image', image);

      const response = await axios.post('http://localhost:8080/createArticle', pp, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Blog created:', response.data);
      setIsSuccess(true);
    } catch (error) {
      console.error('Error creating blog:', error);
      setError('Error creating blog. Please try again.'); // Provide user-friendly error message
    }
  };

  return (
    <div className="BlogForm bg-white p-8 rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 text-red-700 text-center">Create a New Blog</h2>

      {isSuccess && (
        <div className="mb-4 p-2 bg-green-200 text-green-800 rounded-md">
          Blog created successfully!
        </div>
      )}

      {error && (
        <div className="mb-4 p-2 bg-red-200 text-red-800 rounded-md">
          {error}
        </div>
      )}

      <form className="flex flex-wrap" onSubmit={handleSubmit}>
        {/* Course Name, Category, and Duration in the same row */}
        <InputField
          label="Blog Title"
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        {/* Price, Image, and Features in the same row */}
        <InputField
          label="Image URL"
          type="file"
          id="image"
          name="image"
          onChange={handleImageChange}
          required
        />

        <InputField
          label="Blog Description"
          type="textarea"
          id="blogDescription"
          name="blogDescription"
          value={formData.blogDescription}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="bg-black text-white hover:bg-gray-800 p-2 rounded-md mt-4 cursor-pointer mx-auto block"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
}

export default BlogForm;