import React from 'react';

const AboutHome = () => {
  return (
    <div className="max-w-screen-xl mx-4 sm:mx-8 lg:mx-16">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 p-5 md:p-8">
          <div className="image object-cover text-center">
            <img
              src="https://images.fineartamerica.com/images/artworkimages/medium/3/work-hard-workout-motivation-gym-health-fitness-thomas-larch-transparent.png"
              alt="Fitness"
              className="w-full h-auto object-center object-cover mx-auto"
            />
          </div>
        </div>
        <div className="md:w-1/2 p-5">
          <div className="text">
            <span className="text-gray-500 border-b-2 border-red-600 uppercase">
              About us
            </span>
            <h2 className="my-4 font-bold text-lg sm:text-xl md:text-3xl">
              About <span className="text-red-600">Our Company</span>
            </h2>
            <p className="text-gray-700 text-sm md:text-base lg:text-lg xl:text-xl">
              "FitGrid offers a unique online sports learning experience with high-quality courses in various fields. Practice exercises, develop skills anytime, anywhere with diverse courses and professional trainers. Get motivated, achieve sports goals with innovative exercises, workshops, and nutrition tips. Direct interaction with coaches and a supportive community for personal success. Immerse yourself in FitGrid for a flexible fitness journey."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutHome;
