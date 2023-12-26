import React from 'react';
import Users from './Users';
import Blogs from './Blogs';
import Courses from './Courses';
import ContactUs from './Contactus';
import Statistics from './Statistics';
import Category from './Category';
import WorkoutPage from './Workout';
import FAQ from './FAQ';
import JoinOurTeam from './JoinOurTeam';

const Dashboard = () => {
  return (
    <div className="text-gray-700 body-font overflow-x-hidden">

<Statistics/>
      <div className="container  flex-col justify-center  mb-32">
      <h1 className="text-[#22092C] text-4xl ml-32 font-bold text-center  ">Manegment Users</h1>
        <Users />
        <hr className="my-8" />
        <h1 className="text-[#22092C] text-4xl ml-32 font-bold text-center">Manegment Blogs</h1>
        <Blogs />
        <hr className="my-8" />
        <h1 className="text-[#22092C] text-4xl ml-32 font-bold text-center">Manegment Plans</h1>
        <Courses />
        <hr className="my-8" />
        <h1 className="text-[#22092C] text-4xl ml-32 font-bold text-center">Manegment Contact Us</h1>
        <ContactUs />
        <hr className="my-8" />
        <h1 className="text-[#22092C] text-4xl ml-32 font-bold text-center">Manegment Categories</h1>
        <Category/>
        <hr className="my-8" />
        <h1 className="text-[#22092C] text-4xl ml-32 font-bold text-center">Manegment Workout</h1>
        <WorkoutPage/>
        <hr className="my-8" />
        <h1 className="text-[#22092C] text-4xl ml-32 font-bold text-center">Manegment FAQ</h1>
        <FAQ/>
        <hr className="my-8" />
        <h1 className="text-[#22092C] text-4xl ml-32 font-bold text-center">Manegment Join Team</h1>
        <JoinOurTeam/>
      </div>
    </div>
  );
};

export default Dashboard;
