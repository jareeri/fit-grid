import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const BestTrainers = () => {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    const fetchTrainers = async () => {
      AOS.init();
      try {
        const response = await axios.get('http://localhost:8080/getAllTrainers');
        setTrainers(response.data.trainers);
      } catch (error) {
        console.error('Error fetching trainers: ', error);
      }
    };

    fetchTrainers();
  }, []);

  const firstFourTrainers = Array.isArray(trainers) ? trainers.slice(0, 4) : [];

  return (
    <section
      data-aos="fade-up"
      className="bg-black text-white py-20"
    >
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Meet Our Top Trainers</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mx-10">
          {firstFourTrainers.map((trainer) => (
            <div key={trainer.trainer_id} className="group">
              <Link to={`/trainers/${trainer.user_id}`}>
                <div className="relative overflow-hidden rounded-lg shadow-xl border-2 transition duration-300 transform hover:-translate-y-2 hover:shadow-2xl">
                  <img
                    className="object-cover w-full h-56 md:h-64 xl:h-80 rounded-t-lg"
                    src={trainer.profileimage}
                    alt="Trainer"
                  />
                  <div className="absolute inset-0 flex flex-col justify-center px-6 py-4 text-center transition-opacity duration-300 bg-[#f5f5f5] bg-opacity-80 opacity-0 group-hover:opacity-100">
                    <p className="mb-1 text-lg font-semibold text-red-700 group-hover:text-bg-black">
                      {trainer.username}
                    </p>
                    <p className="mb-1 text-sm text-red-700 group-hover:text-black">
                      Certification: {trainer.certification}
                    </p>
                    <p className="mb-1 text-sm text-red-700 group-hover:text-black">
                      Experience: {trainer.experience} years
                    </p>
                    {/* You can uncomment the following lines if you have a 'rating' property in your trainer object */}
                    {/* <p className="mb-4 text-xs text-gray-300 group-hover:text-gray-400">
                      Rating: {trainer.rating}
                    </p> */}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestTrainers;
