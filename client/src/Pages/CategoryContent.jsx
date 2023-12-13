import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CategoryContent = () => {
  const [trainers, setTrainers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const trainersPerPage = 12;

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/Card');
        setTrainers(response.data);
      } catch (error) {
        console.error('Error fetching trainers: ', error);
      }
    };

    fetchTrainers();
  }, []);

  const indexOfLastTrainer = currentPage * trainersPerPage;
  const indexOfFirstTrainer = indexOfLastTrainer - trainersPerPage;
  const currentTrainers = trainers.slice(indexOfFirstTrainer, indexOfLastTrainer);

  // Local filtering based on the selected category
  const filteredTrainers =
    selectedCategory === 'All'
      ? currentTrainers
      : currentTrainers.filter(
          (trainer) => trainer.category && trainer.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  // Filter trainers based on search term
  const searchedTrainers = filteredTrainers.filter(
    (trainer) => trainer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(searchedTrainers.length / trainersPerPage);

  const handlePageChange = (pageNumber) => {
    // Ensure the page number is within a valid range
    const newPage = Math.max(1, Math.min(pageNumber, totalPages));
    setCurrentPage(newPage);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-center flex-wrap mb-4 space-x-4">
        {/* Search Input */}
        <div>
          <div className="relative text-gray-600 focus-within:text-gray-400">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <path d="M21 21l-5.2-5.2"></path>
                  <circle cx="10" cy="10" r="8"></circle>
                </svg>
              </button>
            </span>
            <input
              type="search"
              id="search"
              className="py-2 pl-10 text-sm text-white bg-gray-200 rounded-md focus:outline-none focus:bg-white focus:text-gray-900"
              placeholder="Search trainers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mx-28 my-28">
        {searchedTrainers.map((trainer) => (
          <div key={trainer.id} className="bg-white overflow-hidden rounded-lg shadow-md">
            <Link to={`/trainers/${trainer.id}`}>
              <img
                className="w-full h-56 object-cover"
                src={trainer.image}
                alt={trainer.title}
              />
            </Link>
            <div className="p-4">
              <p className="text-lg font-bold text-gray-800">{trainer.name}</p>
              <p className="mt-1 text-sm text-gray-600">{trainer.category}</p>
              <p className="mt-2 text-sm text-gray-700">{trainer.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          className={`mx-2 p-2 bg-gray-800 text-white hover:bg-gray-700 focus:outline-none rounded-full ${
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
            className={`mx-2 p-2 bg-gray-800 text-white hover:bg-gray-700 focus:outline-none rounded-full ${
              currentPage === index + 1 ? 'bg-gray-800' : ''
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          className={`mx-2 p-2 bg-gray-800 text-white hover:bg-gray-700 focus:outline-none rounded-full ${
            currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CategoryContent;
