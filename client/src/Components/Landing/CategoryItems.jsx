import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CategoryItems = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    axios
      .get("http://localhost:8080/plans/getAllCategories")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  // Calculate the index of the last item in the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  // Calculate the index of the first item in the current page
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Get the current items to display
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 my-20">
      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 w-full">
        {currentItems.map((item, index) => (
          <Link to={`/category/${item.title}`} key={index}>
            <div className="relative overflow-hidden transition duration-300 transform rounded shadow-lg lg:hover:-translate-y-2 hover:shadow-2xl h-[20rem]">
              <img
                className="object-cover w-full h-[20rem]"
                src={item.image}
                alt={`Product Image ${index + 1}`}
              />
              <div className="absolute inset-0 flex flex-col justify-start px-5 py-4 text-start transition-opacity duration-300">
                <p className="font-bold text-white text-1xl">{item.category}</p>
                <div className="flex items-center justify-center space-x-3">
                  {/* Additional content here */}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`px-3 py-2 mx-1 rounded-md focus:outline-none ${
              currentPage === index + 1 ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-600'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryItems;
