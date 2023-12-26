// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Blogs = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [newBlog, setNewBlog] = useState({
//     articles_image: '',
//     title: '',
//     content: '',
//   });

//   useEffect(() => {
//     axios.get('http://localhost:8080/getAllArticles')
//       .then(response => {
//         setBlogs(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   const handleSave = (blogData) => {
//     axios.put(`http://localhost:8080/updateArticle/${blogData.id}`, blogData)
//       .then(response => {
//         console.log('Blog data updated successfully:', response.data);
//         setBlogs(prevBlogs => prevBlogs.map(blog =>
//           blog.id === blogData.id ? { ...blog, ...blogData } : blog
//         ));
//       })
//       .catch(error => {
//         console.error('Error updating blog data:', error);
//       });
//   };

//   const handleDelete = (blogId) => {
//     setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== blogId));

//     axios.put(`http://localhost:8080/softDeleteArticle/${blogId}`)
//       .then(response => {
//         console.log('Blog deleted successfully:', response.data);
//       })
//       .catch(error => {
//         console.error('Error deleting blog:', error);
//         axios.get('http://localhost:8080/getAllArticles')
//           .then(response => {
//             setBlogs(response.data);
//           })
//           .catch(error => {
//             console.error('Error fetching data:', error);
//           });
//       });
//   };

//   const handleInputChange = (blogId, field, value) => {
//     setBlogs(prevBlogs =>
//       prevBlogs.map(blog =>
//         blog.id === blogId ? { ...blog, [field]: value } : blog
//       )
//     );
//   };

//   const handleFileChange = (e, blogId) => {
//     const selectedFile = e.target.files[0];
//     setBlogs(prevBlogs =>
//       prevBlogs.map(blog =>
//         blog.id === blogId ? { ...blog, articles_image: selectedFile } : blog
//       )
//     );
//   };

//   const handleAdd = () => {
//     axios.post('http://localhost:8080/createArticle', newBlog)
//       .then(response => {
//         console.log('New blog added successfully:', response.data);
//         setBlogs(prevBlogs => [...prevBlogs, response.data]);
//         setNewBlog({
         
//           articles_image: '',
//           title: '',
//           content: '',
//         });
//       })
//       .catch(error => {
//         console.error('Error adding new blog:', error);
//       });
//   };

//   return (
//     <div className="p-4 flex justify-center mt-8 ml-36">
//       <table className="w-full sm:w-11/12 md:w-5/6 lg:w-4/5 xl:w-4/5 bg-white border border-gray-300">
   
//         <thead className="bg-red-700 text-white">
//           <tr>
        
//             <th className="py-2 px-4">Image</th>
//             <th className="py-2 px-4">Title</th>
//             <th className="py-2 px-4">Content</th>
//             <th className="py-2 px-4">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {blogs.map((blog, index) => (
//             <tr
//               key={index}
//               className={`border-b hover:bg-gray-100 ${index % 2 === 0 ? 'bg-white' : ''}`}
//             >
         
//               <td className="py-2 px-4">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => handleFileChange(e, blog.id)}
//                 />
//               </td>
//               <td className="py-2 px-4">
//                 <input
//                   type="text"
//                   value={blog.title}
//                   className="w-full bg-transparent"
//                   onChange={(e) => handleInputChange(blog.id, 'title', e.target.value)}
//                 />
//               </td>
           
//               <td className="py-2 px-4">
//                 <textarea
//                   value={blog.content}
//                   className="w-full bg-transparent"
//                   onChange={(e) => handleInputChange(blog.id, 'content', e.target.value)}
//                 />
//               </td>
//               <td className="py-2 px-4 flex justify-end">
//                 <button
//                   type="button"
//                   className="mr-2 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
//                   onClick={() => handleSave(blog)}
//                 >
//                   Save
//                 </button>
//                 <button
//                   type="button"
//                   className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
//                   onClick={() => handleDelete(blog.id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//           <tr>
         
//             <td className="py-2 px-4">
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => setNewBlog({ ...newBlog, articles_image: e.target.files[0] })}
//               />
//             </td>
//             <td className="py-2 px-4">
//               <input
//                 type="text"
//                 value={newBlog.title}
//                 className="w-full bg-transparent"
//                 placeholder="New Title"
//                 onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
//               />
//             </td>
        
//             <td className="py-2 px-4">
//               <textarea
//                 value={newBlog.content}
//                 className="w-full bg-transparent"
//                 placeholder="New Description"
//                 onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
//               />
//             </td>
//             <td className="py-2 px-4 flex justify-end">
//               <button
//                 type="button"
//                 className="text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
//                 onClick={handleAdd}
//               >
//                 Add
//               </button>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Blogs;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/getAllArticles')
      .then(response => {
        setBlogs(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDelete = (blogId) => {
    setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== blogId));

    axios.put(`http://localhost:8080/softDeleteArticle/${blogId}`)
      .then(response => {
        console.log('Blog deleted successfully:', response.data);
      })
      .catch(error => {
        console.error('Error deleting blog:', error);
        axios.get('http://localhost:8080/getAllArticles')
          .then(response => {
            setBlogs(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      });
  };

  const handleFileChange = (e, blogId) => {
    const selectedFile = e.target.files[0];
    setBlogs(prevBlogs =>
      prevBlogs.map(blog =>
        blog.id === blogId ? { ...blog, articles_image: selectedFile } : blog
      )
    );
  };

  const handleInputChange = (blogId, field, value) => {
    setBlogs(prevBlogs =>
      prevBlogs.map(blog =>
        blog.id === blogId ? { ...blog, [field]: value } : blog
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex justify-center ml-20 items-center">
    <table className="w-9/12 h-5/6 bg-[#f5f5f5] my-6 md:ml-24 px-10 py-8 rounded-lg shadow-md">
      <thead className="bg-red-700 text-white "> {/* Use red-700 for the header background */}
          <tr>
            <th className="py-2 px-4 ">Image</th>
            <th className="py-2 px-4">Title</th>
            <th className="py-2 px-4">Content</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog, index) => (
            <tr
              key={index}
              className={`border-b hover:bg-gray-100 ${index % 2 === 0 ? 'bg-white' : ''}`}
            >
              <td className="py-2 px-4 flex justify-center">
                {/* Set max-width and max-height for the image */}
                <img
                  src={blog.articles_image}
                  alt="Blog Image"
                  style={{ maxWidth: '100px', maxHeight: '100px' }}
                />
              </td>
     <td className="py-2 px-4 text-center max-w-[100px] overflow-hidden whitespace-nowrap">
  {blog.title}
</td>
<td className="py-2 px-4 text-center max-w-[200px] overflow-hidden whitespace-nowrap">
  {blog.content}
</td>

              <td className="py-2 px-4 flex justify-end">
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
        </tbody>
      </table>
    </div>
  );
};

export default Blogs;
