import React from 'react';

const AboutUs = () => {
  return (
    <div className='bg-[#f5f5f5] py-16 '>
      <div className=' flex flex-col-reverse md:flex-row justify-center items-center mx-16 my-16 ml-32'>
        <div className='w-full md:w-1/2 p-8'>
          <h1 className='py-5 text-red-700 text-center text-3xl md:text-4xl font-bold'>
            About Us
          </h1>
          <p className='text-justify text-black'>
          FitGrid is not just a platform; it's your passport to a revolutionary online sports learning experience. We take pride in offering top-tier educational courses across a spectrum of sports disciplines, giving individuals the power to engage in exercises and elevate their skills from the comfort of their own space, at any time that suits them.

What sets FitGrid apart is our commitment to delivering high-quality content curated by experienced professionals in the field. Our platform boasts a diverse array of courses led by expert trainers, ensuring that participants receive the guidance they need to excel in their chosen sport. Whether you're a seasoned athlete looking to refine your technique or a beginner eager to dive into a new sport, FitGrid has something for everyone.

As a subscriber, you unlock a treasure trove of exclusive benefits. Gain access to innovative exercises that push the boundaries of traditional training, participate in advanced workshops that delve into the intricacies of each sport, and receive valuable nutrition tips to complement your fitness journey. We believe in a holistic approach to sports education, addressing not just the physical aspects but also the crucial role nutrition plays in achieving peak performance.

But FitGrid is more than just a repository of courses; it's a community. We foster an environment that encourages direct interaction with coaches and fellow sports enthusiasts. Imagine having a virtual support system cheering you on as you strive to reach your sports goals. Our platform goes beyond the screen, creating a dynamic and stimulating space for personal success.

Immerse yourself in the FitGrid experience, where convenience meets excellence.
          </p>
        </div>
        <div className='w-7/12 md:w-1/2 p-5'>
          <img
            className='object-cover rounded-md shadow-md'
            src="https://img.freepik.com/premium-photo/young-bodybuilder-posing-gym-camera-sporty-athletic-man-training-his-biceps-gym_116317-11289.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1699574400&semt=ais"
            alt="About us"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
