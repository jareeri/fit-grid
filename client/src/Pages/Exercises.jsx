// export default Exercises;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const exercisesPerPage = 12;

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get('http://localhost:8080/getAllExerciseImages');
        setExercises(response.data);
      } catch (error) {
        console.error('Error fetching exercises: ', error);
      }
    };

    fetchExercises();
  }, []);

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);

  // Local filtering based on the selected category
  const filteredExercises =
    selectedCategory === 'All'
      ? currentExercises
      : currentExercises.filter(
          (exercise) => exercise.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  // Filter exercises based on search term
  const searchedExercises = filteredExercises.filter(
    (exercise) => exercise.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(searchedExercises.length / exercisesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const categories = ['All', 'Cardio', 'Strength', 'Flexibility', 'Balance'];

  return (
    
    <div className=" px-24 py-28 bg-[#f5f5f5]">
    <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div className="mb-4 md:mb-0 md:flex items-center space-x-4 ">
          <label htmlFor="category" className="text-gray-800 font-bold">
            Category:
          </label>
          <select
            id="category"
            className="p-2 border border-gray-300 rounded-md"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="md:flex items-center space-x-4">
          <label htmlFor="search" className="text-gray-800 font-bold">
            Search:
          </label>
          <div className="relative text-gray-600 focus-within:text-gray-400">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                {/* Your search icon SVG */}
              </button>
            </span>
            <input
              type="search"
              id="search"
              className="py-2 pl-10 text-sm text-gray-900 bg-white rounded-md focus:outline-none focus:bg-white focus:text-gray-900"
              placeholder="Search trainers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-[#f5f5f5]" >
        {searchedExercises.map((exercise) => (
          <div key={exercise.id} className="overflow-hidden rounded shadow-lg hover:shadow-xl">
            <img
              className="w-full h-56 md:h-64 xl:h-80 object-cover"
              src={exercise.gif_url}
              alt={exercise.title}
            />
            <div className="p-4">
              <p className="text-lg font-bold text-gray-800">{exercise.title}</p>
              <p className="mt-1 text-sm text-gray-600">{exercise.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
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
              currentPage === index + 1 ? 'bg-gray-800' : ''
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
  );
};

export default Exercises;