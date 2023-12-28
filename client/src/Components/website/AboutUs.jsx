import React from "react";
import { useEffect } from "react";
import Statestic from "../Landing/Statestic";

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#f5f5f5]  ">
      {/* component */}

      <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6  ">
        <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12 mt-24">
          <div className="md:5/12 lg:w-5/12 mt-20">
            <img
              id="immm"
              src="https://img.freepik.com/free-photo/black-white-photo-muscular-build-man-using-sports-chalk-while-before-lifting-barbell-weight-training-gym_637285-2505.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1703548800&semt=ais"
              alt="image"
              loading="lazy"
              width=""
              height=""
            />
          </div>
          <div className="md:7/12 lg:w-6/12 mt-20">
            <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
              {" "}
              About <span className="text-red-700">Us</span>
            </h2>
            <p className=" text-gray-600 text mt-20">
              FitGrid is not just a platform; it's your passport to a
              revolutionary online sports learning experience. We take pride in
              offering top-tier educational courses across a spectrum of sports
              disciplines, giving individuals the power to engage in exercises
              and elevate their skills from the comfort of their own space, at
              any time that suits them.
            </p>
            <p className="mt-4 text-gray-600">
              {" "}
              What sets FitGrid apart is our commitment to delivering
              high-quality content curated by experienced professionals in the
              field. Our platform boasts a diverse array of courses led by
              expert trainers, ensuring that participants receive the guidance
              they need to excel in their chosen sport.
            </p>
          </div>
        </div>
        <div className="">
          <Statestic />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;