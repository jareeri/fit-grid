import React from 'react'

const AboutUs = () => {
  return (
    <div>
      <div className='flex flex-col-reverse gap-4 md:flex-row justify-center items-center'>
        <div className='w-1/2 p-8'>
            <h1 className='py-5 text-gray-600 text-center text-2xl md:text-4xl'>About Us</h1>
            <p className='text-start'>FitGrid is a website that offers a unique online sports learning experience. The website aims to provide high-quality educational courses in various fields of sports, enabling individuals to practice physical exercises and develop their sports skills at any time and from anywhere. FitGrid features a wide range of courses and professional trainers, which contribute to motivating and supporting participants to achieve their sports goals.

Subscribers benefit from FitGrid content that gives them access to innovative exercises, advanced workshops, and useful nutrition tips. Direct interaction with coaches and other sports community makes it possible to stimulate the spirit and enjoy the stimulation of personal successes.

Take advantage of FitGrid and immerse yourself in a unique experience to enhance your fitness and achieve your sports goals at any time that suits you.</p>
        </div>
        <div className='w-1/2 p-5'>
            <img className='object-cover' src="https://img.freepik.com/premium-photo/young-bodybuilder-posing-gym-camera-sporty-athletic-man-training-his-biceps-gym_116317-11289.jpg?size=626&ext=jpg&ga=GA1.1.1826414947.1699574400&semt=ais" alt="About us" />
        </div>
      </div>
    </div>
  )
}

export default AboutUs