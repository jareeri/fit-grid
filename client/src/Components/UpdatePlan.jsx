// UpdateCourseForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdatePlan = ({ courseId, onClose }) => {
  const [formData, setFormData] = useState({
    Course_Name: "",
    Course_Category: "",
    Course_Duration: "",
    Pricing: "",
    Course_description: "",
    // ... Add other fields as needed
  });

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/Corse/${courseId}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching course data: ", error);
      }
    };

    fetchCourseData();
  }, [courseId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3000/Corse/${courseId}`, formData);
      // Upon successful completion, close the form
      onClose();
    } catch (error) {
      console.error("Error updating course: ", error);
      // Handle the error as needed
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Course_Name">
          Course Name
        </label>
        <input
          type="text"
          id="Course_Name"
          name="Course_Name"
          value={formData.Course_Name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Course_Category">
          Course Category
        </label>
        <input
          type="text"
          id="Course_Category"
          name="Course_Category"
          value={formData.Course_Category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Course_Duration">
          Course Duration
        </label>
        <input
          type="text"
          id="Course_Duration"
          name="Course_Duration"
          value={formData.Course_Duration}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Pricing">
          Pricing
        </label>
        <input
          type="text"
          id="Pricing"
          name="Pricing"
          value={formData.Pricing}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Course_description">
          Course Description
        </label>
        <textarea
          id="Course_description"
          name="Course_description"
          value={formData.Course_description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      {/* Add other fields as needed */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white hover:bg-blue-800 p-2 rounded-md mt-4 cursor-pointer mx-auto block"
        >
          Update Course
        </button>
      </div>
    </form>
  );
};

export default UpdatePlan;
