import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Pricing from './Pricing';

const TrainerDetails = () => {
  const [trainer, setTrainer] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchTrainerDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/getTrainerById/${id}`);
        setTrainer(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trainer details: ', error);
        setLoading(false);
      }
    };

    fetchTrainerDetails();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-500 text-xl mt-4">Loading...</p>;
  }

  return (
    <div className="container mx-auto my-24 p-4 md:p-8 bg-gray-800 text-white rounded-md shadow-md">
      <div className="md:flex items-center justify-center mb-9">
        <div className="md:shrink-0 ml-8">
          <img
            className="h-64 w-full object-cover md:h-full md:w-64 rounded-md border-4 border-gray-500"
            src={trainer.profileimage}
            alt={`Image of ${trainer.username}`}
          />
        </div>
        <div className="md:ml-8 mt-4 md:mt-0">
          <h2 className="text-4xl font-extrabold hover:underline text-gray-500">
            Name: {trainer.username}
          </h2>
          <div className="uppercase tracking-wide text-lg font-semibold mt-2">
            Certification: {trainer.certification}
          </div>
          <p className="mt-2 text-gray-300 text-lg">
            Experience: {trainer.experience}
          </p>
        </div>
      </div>
      <Pricing />
      <div className="text-center py-2 mt-8">
        <Link
          to="/trainers"
          className="text-lg font-medium text-gray-500 hover:underline"
        >
          &larr; Back to Trainers
        </Link>
      </div>
    </div>
  );
};

export default TrainerDetails;
