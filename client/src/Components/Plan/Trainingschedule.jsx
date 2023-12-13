import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Trainingschedule = () => {
  const [workoutData, setWorkoutData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/Workout');
        setWorkoutData(response.data);
      } catch (error) {
        console.error('Error fetching workout data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg max-w-screen-md mx-auto p-6 mt-8">
      <div>
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Workout Routine</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2 font-medium ">Exercise</th>
              <th className="py-2 ">Repetitions</th>
              <th className="py-2 ">Rest</th>
            </tr>
          </thead>
          <tbody>
            {workoutData &&
              workoutData.map((exercise, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-200' : ''}>
                  <td className="py-2 ">{exercise.name}</td>
                  <td className="py-2 ">{exercise.repetitions}</td>
                  <td className="py-2 ">{exercise.rest}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Trainingschedule;
