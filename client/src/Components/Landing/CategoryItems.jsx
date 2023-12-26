import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CategoryItems = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    axios
      .get("http://localhost:8080/categories")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    // Ensure the page number is within a valid range
    const newPage = Math.max(1, Math.min(pageNumber, totalPages));
    setCurrentPage(newPage);
  };
  return (
    <div className='contenar py-20 bg-[#f5f5f5] '>
    <div className="px-4 py-20 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20  ">
      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 w-full">
        {currentItems.map((item, index) => (
          <Link to={`/category/${item.category_name}`} >
            <div key={index} className="relative overflow-hidden transition duration-300 transform rounded shadow-lg lg:hover:-translate-y-2 hover:shadow-2xl h-[20rem]">
              <img
                className="object-cover w-full h-[20rem]"
                src={item.category_image_url}
                alt={`Product Image ${index + 1}`}
              />
              <div className="absolute inset-0 flex flex-col justify-start px-5 py-4 text-start transition-opacity duration-300">
                <p className="font-bold text-white text-1xl">{item.category_name}</p>
                <div className="flex items-center justify-center space-x-3">
                  {/* Additional content here */}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-8 ">
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
              currentPage === index + 1 ? 'bg-black' : ''
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
  );
};

export default CategoryItems;
