import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AchievementCard = ({ value, description }) => (
  <div className="flex flex-col justify-center items-center bg-gradient-to-r from-[#000000] to-[#484848] bg-[] p-6 md:p-8 h-[156px] w-[156px] md:w-[240px] md:h-[240px] rounded-full justify-self-center overflow-hidden transition-transform transform hover:scale-105 ease-in-out duration-300 shadow-lg">
    <div className="flex flex-row justify-center items-center">
      <p className="font-bold text-3xl sm:text-4xl lg:text-5xl leading-9 text-white ml-2">{value}</p>
    </div>
    <p className="font-medium text-base sm:text-lg leading-6 mt-3 md:mt-6 text-center text-white">{description}</p>
  </div>
);

const Statestic = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    AOS.init();
    // Make an Axios request to fetch data
    axios.get('http://localhost:3000/statestic')
      .then(response => {
        // Assuming your API response is an array of objects with 'value' and 'description' properties
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // The empty dependency array ensures that the effect runs only once when the component mounts

  return (
    <div>
      <section data-aos="fade-up" className="flex flex-col mt-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-5 lg:gap-y-0 gap-x-5 place-items-center w-full mx-auto max-w-7xl px-5">
          {data.map((item, index) => (
            <AchievementCard key={index} value={item.value} description={item.description} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Statestic;
