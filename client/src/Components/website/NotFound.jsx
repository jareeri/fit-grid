import React from "react";
import fit from "../../Images/fit.png";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#f5f5f5]">
      <div className="w-80">
        <img src={fit} alt="404 Image" />
      </div>
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-6xl text-red-700 font-bold">404</h1>
        <h3 className="text-gray-800 font-bold text-2xl">Oops, Page Not Found</h3>
        <p className="text-gray-800">
          We suggest you go to the Home page while we fix the problem!!
        </p>
        <Link to="/" className="w-full md:w-auto">
          <button className="w-full md:w-auto border rounded-full py-3 px-10 text-center bg-red-700 text-white hover:bg-red-500 focus:outline-none">
            Go Back!
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
