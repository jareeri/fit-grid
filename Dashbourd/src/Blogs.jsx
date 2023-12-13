import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    blog_autor: '',
    blog_img: '',
    blog_title: '',
    blog_subdescription: '',
    blog_description: '',
  });

  useEffect(() => {
    // Fetch data from your API using Axios
    axios.get('http://localhost:3000/Blog')
      .then(response => {
        // Update the state with the fetched data
        setBlogs(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  const handleSave = (blogData) => {
    // Send a request to update the blog data on the server
    axios.put(`http://localhost:3000/Blog/${blogData.id}`, blogData)
      .then(response => {
        // Handle success, e.g., show a success message
        console.log('Blog data updated successfully:', response.data);

        // Optionally, you can update the local state with the new data
        setBlogs(prevBlogs => prevBlogs.map(blog =>
          blog.id === blogData.id ? { ...blog, ...blogData } : blog
        ));
      })
      .catch(error => {
        // Handle error, e.g., show an error message
        console.error('Error updating blog data:', error);
      });
  };

  const handleDelete = (blogId) => {
    // Optimistically remove the blog from the local state
    setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== blogId));

    // Send a request to delete the blog from the server
    axios.delete(`http://localhost:3000/Blog/${blogId}`)
      .then(response => {
        // Handle success, e.g., show a success message
        console.log('Blog deleted successfully:', response.data);
      })
      .catch(error => {
        // Handle error, e.g., show an error message
        console.error('Error deleting blog:', error);

        // Roll back the state if the request fails
        axios.get('http://localhost:3000/Blog')
          .then(response => {
            // Update the state with the fetched data
            setBlogs(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      });
  };

  const handleInputChange = (blogId, field, value) => {
    // Update the local state with the changed input value
    setBlogs(prevBlogs =>
      prevBlogs.map(blog =>
        blog.id === blogId ? { ...blog, [field]: value } : blog
      )
    );
  };

  const handleAdd = () => {
    // Send a request to add the new blog to the server
    axios.post('http://localhost:3000/Blog', newBlog)
      .then(response => {
        // Handle success, e.g., show a success message
        console.log('New blog added successfully:', response.data);

        // Update the local state with the new data
        setBlogs(prevBlogs => [...prevBlogs, response.data]);

        // Clear the form fields after successful submission
        setNewBlog({
          blog_autor: '',
          blog_img: '',
          blog_title: '',
          blog_subdescription: '',
          blog_description: '',
        });
      })
      .catch(error => {
        // Handle error, e.g., show an error message
        console.error('Error adding new blog:', error);
      });
  };

  return (
    <div className="text-gray-900 bg-white w-full md:w-11/12 lg:w-3/4 xl:w-2/3 flex justify-end mt-44 ml-72">
      <div className="p-4 flex justify-center">
        {/* <h1 className="text-3xl font-bold mb-4">Blog Management</h1> */}
      </div>
      <div className="px-4 py-2 flex justify-center">
        <table className="w-full text-md bg-white shadow-md rounded mb-4">
          <thead className="bg-[#9DB2BF] text-white">
            <tr>
              <th className="py-2 px-4">Author</th>
              <th className="py-2 px-4">Image</th>
              <th className="py-2 px-4">Title</th>
              <th className="py-2 px-4">Subdescription</th>
              <th className="py-2 px-4">Description</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => (
              <tr
                key={index}
                className={`border-b hover:bg-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}
              >
                <td className="py-2 px-4">
                  <input
                    type="text"
                    value={blog.blog_autor}
                    className="w-full bg-transparent"
                    onChange={(e) => handleInputChange(blog.id, 'blog_autor', e.target.value)}
                  />
                </td>
                <td className="py-2 px-4">
                  <input
                    type="text"
                    value={blog.blog_img}
                    className="w-full bg-transparent"
                    onChange={(e) => handleInputChange(blog.id, 'blog_img', e.target.value)}
                  />
                </td>
                <td className="py-2 px-4">
                  <input
                    type="text"
                    value={blog.blog_title}
                    className="w-full bg-transparent"
                    onChange={(e) => handleInputChange(blog.id, 'blog_title', e.target.value)}
                  />
                </td>
                <td className="py-2 px-4">
                  <input
                    type="text"
                    value={blog.blog_subdescription}
                    className="w-full bg-transparent"
                    onChange={(e) => handleInputChange(blog.id, 'blog_subdescription', e.target.value)}
                  />
                </td>
                <td className="py-2 px-4">
                  <textarea
                    value={blog.blog_description}
                    className="w-full bg-transparent"
                    onChange={(e) => handleInputChange(blog.id, 'blog_description', e.target.value)}
                  />
                </td>
                <td className="py-2 px-4 flex justify-end">
                  <button
                    type="button"
                    className="mr-2 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleSave(blog)}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleDelete(blog.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td className="py-2 px-4">
                <input
                  type="text"
                  value={newBlog.blog_autor}
                  className="w-full bg-transparent"
                  placeholder="New Author"
                  onChange={(e) => setNewBlog({ ...newBlog, blog_autor: e.target.value })}
                />
              </td>
              <td className="py-2 px-4">
                <input
                  type="text"
                  value={newBlog.blog_img}
                  className="w-full bg-transparent"
                  placeholder="New Image"
                  onChange={(e) => setNewBlog({ ...newBlog, blog_img: e.target.value })}
                />
              </td>
              <td className="py-2 px-4">
                <input
                  type="text"
                  value={newBlog.blog_title}
                  className="w-full bg-transparent"
                  placeholder="New Title"
                  onChange={(e) => setNewBlog({ ...newBlog, blog_title: e.target.value })}
                />
              </td>
              <td className="py-2 px-4">
                <input
                  type="text"
                  value={newBlog.blog_subdescription}
                  className="w-full bg-transparent"
                  placeholder="New Subdescription"
                  onChange={(e) => setNewBlog({ ...newBlog, blog_subdescription: e.target.value })}
                />
              </td>
              <td className="py-2 px-4">
                <textarea
                  value={newBlog.blog_description}
                  className="w-full bg-transparent"
                  placeholder="New Description"
                  onChange={(e) => setNewBlog({ ...newBlog, blog_description: e.target.value })}
                />
              </td>
              <td className="py-2 px-4 flex justify-end">
                <button
                  type="button"
                  className="text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleAdd}
                >
                  Add
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Blogs;
