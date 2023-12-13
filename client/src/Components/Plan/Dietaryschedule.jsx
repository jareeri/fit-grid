import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dietaryschedule = () => {
  const [nutritionData, setNutritionData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/Nutrition');
        setNutritionData(response.data);
      } catch (error) {
        console.error('Error fetching nutrition data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg mx-auto my-8 max-w-screen-md">
      <div className="p-6">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">Bodybuilder's Nutrition Facts</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Nutrient</th>
              <th className="py-2">Amount</th>
              <th className="py-2">% Daily Value</th>
            </tr>
          </thead>
          <tbody>
            {nutritionData &&
              nutritionData.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-200' : ''}>
                  <td className="py-2">{item.nutrient}</td>
                  <td className="py-2">{item.amount}</td>
                  <td className="py-2">{item.dailyValue}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dietaryschedule;
