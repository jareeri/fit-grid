import React, { useState } from 'react';
import axios from 'axios';

const AddTrainingCoursePage = () => {
  const [Course_Name, setCourse_Name] = useState('');
  const [Course_Category, setCourse_Category] = useState('');
  const [Course_Duration, setCourse_Duration] = useState('');
  const [Pricing, setPricing] = useState('');
  const [Course_description, setCourse_description] = useState('');

  const Category = ['Fitness', 'Grossfit', 'Cardio', 'Body Building'];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send data to the server using axios
      const response = await axios.post('http://localhost:3000/Corse', {
        Course_Name,
        Course_Category,
        Course_Duration,
        Pricing,
        Course_description
      });

      // You can perform further processing here as needed

      console.log('Training course data sent:', response.data);
    } catch (error) {
      console.error('An error occurred while sending data:', error.message);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded shadow-md">
        <label className="block mb-2 text-sm font-bold text-gray-600" htmlFor="Course_Name">
          Course Name:
        </label>
        <input
          type="text"
          id="Course_Name"
          name="Course_Name"
          value={Course_Name}
          onChange={(e) => setCourse_Name(e.target.value)}
          required
          className="w-full p-2 border rounded-md"
        />

        <label className="block mb-2 text-sm font-bold text-gray-600" htmlFor="Course_Category">
          Course Category:
        </label>
        <select
          id="Course_Category"
          name="Course_Category"
          value={Course_Category}
          onChange={(e) => setCourse_Category(e.target.value)}
          required
          className="w-full p-2 border rounded-md"
        >
          <option value="" disabled>Select a Category</option>
          {Category.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <label className="block mb-2 text-sm font-bold text-gray-600" htmlFor="Course_Duration">
          Course Duration (in days):
        </label>
        <input
          type="number"
          id="Course_Duration"
          name="Course_Duration"
          value={Course_Duration}
          onChange={(e) => setCourse_Duration(e.target.value)}
          required
          className="w-full p-2 border rounded-md"
        />

        <label className="block mb-2 text-sm font-bold text-gray-600" htmlFor="Pricing">
          Pricing:
        </label>
        <input
          type="number"
          id="Pricing"
          name="Pricing"
          value={Pricing}
          onChange={(e) => setPricing(e.target.value)}
          required
          className="w-full p-2 border rounded-md"
        />

        <label className="block mb-2 text-sm font-bold text-gray-600" htmlFor="Course_description">
          Course Description:
        </label>
        <textarea
          id="Course_description"
          name="Course_description"
          value={Course_description}
          onChange={(e) => setCourse_description(e.target.value)}
          required
          className="w-full p-2 border rounded-md"
        />

        <button
          type="submit"
          className="bg-gray-800 text-white hover:bg-gray-600 p-2 rounded-md mt-4 cursor-pointer mx-auto block"
        >
          Add Training Course
        </button>
      </form>
    </div>
  );
};

export default AddTrainingCoursePage;
