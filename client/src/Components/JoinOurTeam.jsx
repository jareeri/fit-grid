import React, { useState } from 'react';
import axios from 'axios';

const JoinOurTeam = () => {
  const jordanGovernorates = [
    'Amman',
    'Irbid',
    'Zarqa',
    'Ajloun',
    'Jerash',
    'Mafraq',
    'Balqa',
    'Madaba',
    'Karak',
    'Tafilah',
    'Maan',
    'Aqaba',
  ];

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    city: '',
    area: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request using Axios
      const response = await axios.post('http://localhost:3000/Join', formData);

      // Handle the response as needed
      console.log('Server Response:', response.data);

      // Optionally, you can reset the form or navigate to another page after a successful submission
      // resetForm();
    } catch (error) {
      // Handle errors
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen mt-24 bg-[#f5f5f5]">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-red-700">Join Our Team</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="grid-username">
            Username
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="grid-username"
            type="text"
            placeholder="YourUsername"
            onChange={handleChange}
          />
          <p className="text-red-500 text-xs italic">Please fill out this field.</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="grid-email">
            Email
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="grid-email"
            type="email"
            placeholder="example@example.com"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="grid-phone">
            Phone
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="grid-phone"
            type="tel"
            placeholder="555-555-5555"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="grid-city">
            City
          </label>
          <div className="relative">
            <select
              className="block appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="grid-city"
              onChange={handleChange}
            >
              {jordanGovernorates.map((governorate, index) => (
                <option key={index}>{governorate}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="grid-area">
            Text
          </label>
          <textarea
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="grid-area"
            placeholder="Your Area"
            rows="4"
            onChange={handleChange}
          ></textarea>
        </div>
<div className='flex justify-center'>
        <button
          className="bg-red-700 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Join Now
        </button>
        </div>
      </form>
    </div>
  );
};

export default JoinOurTeam;
