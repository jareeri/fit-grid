import React from "react";
import notFound from "../../Images/404.png";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className="flex flex-col gap-8 justify-center items-center">
        <div className="w-80">
          <img src={notFound} />
        </div>
        <div className="flex flex-col justify-center items-center gap-3">
          <h1 className="text-6xl text-teal-600 font-bold">404</h1>
          <h3 className="text-gray-800 font-bold text-2xl">
            Oops, Page Not Found
          </h3>
          <p className="text-gray-800">
            We suggest you go to Home page while we fix the problem!!
          </p>
          <Link to="/" className="w-full md:w-auto">
            <button className="w-full md:w-auto border rounded-full py-3 px-10 text-center bg-teal-600 text-white hover:bg-teal-700 focus:outline-none">
              Go Back!
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
