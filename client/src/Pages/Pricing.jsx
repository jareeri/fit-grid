import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';

const Pricing = () => {
  const { id } = useParams();
  const [pricingData, setPricingData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/getplansfortrainer/${id}`);
        const data = Array.isArray(response.data) ? response.data : [response.data];
        setPricingData(data);
      } catch (error) {
        console.error('Error fetching pricing data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleBuyNow = (item) => {
    const queryParams = queryString.stringify({ name: item.name, price: item.price });
    window.location.href = `/payment?${queryParams}`;
  };

  return (
    <div className="min-w-screen min-h-screen bg-gradient-to-r from-blak-500 via-gray-500 to-gray-500 px-5 py-5">
      <div className="w-full mx-auto bg-white px-5 py-10 text-gray-800 mb-10 rounded-md shadow-lg">
        <div className="text-center max-w-xl mx-auto">
          <h1 className="text-4xl mb-6 font-bold text-gray-500">Discover Our Plans</h1>
          <p className="text-lg mb-10 text-gray-600">
            Select a plan that suits your requirements. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <div className="max-w-4xl mx-auto md:flex">
          {pricingData.slice(0, 3).map((item, index) => (
            <div key={index} className="w-full md:w-1/3 md:max-w-none bg-white px-8 md:px-10 py-8 md:py-10 mb-3 mx-auto md:my-6 rounded-md shadow-lg">
              <div className="w-full flex-grow">
                <h2 className="text-center font-bold uppercase mb-4 text-gray-500">{item.name}</h2>
                <h3 className="text-center font-bold text-4xl mb-5 text-gray-500">${item.price}</h3>
                <p className="text-sm px-5 mb-8 text-gray-600">{item.description}</p>
              </div>
              <div className="w-full">
                <button onClick={() => handleBuyNow(item)} className="font-bold bg-gray-500 text-white rounded-full mt-4 hover:bg-gray-700 px-8 py-2 transition-colors w-full">
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
