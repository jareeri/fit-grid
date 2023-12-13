import React from "react";
import { Link, useLocation } from "react-router-dom";
import FitGrid from "../../Images/FitGrid.png";

const Footer = () => {
  const user = null;
  const location = useLocation();

  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
      <div className="container mx-auto py-10 flex flex-col md:flex-row items-center md:items-start">
        {/* TW elements section */}
        <div className="md:pr-8 flex flex-col items-center md:items-start">
          <div>
            <img className="h-20" src={FitGrid} alt="CraftVine Logo" />
          </div>
          <p className="mt-4 text-center md:text-left">
            Your Home, Elevated. Discover modern and new furniture for a perfect blend of style and affordability.
          </p>
        </div>
        {/* Products section */}
        <div className="mt-8 md:mt-0">
          <h6 className="mb-4 font-semibold text-gray-700 dark:text-gray-300">
            Explore
          </h6>
          <p className="mb-4">
            <Link to='/' className="text-gray-600 dark:text-gray-200 hover:text-gray-800 dark:hover:text-gray-300">
              Home
            </Link>
          </p>
          <p className="mb-4">
            <Link to="/Trainers" className="text-gray-600 dark:text-gray-200 hover:text-gray-800 dark:hover:text-gray-300">
              Trainers
            </Link>
          </p>
        </div>
        {/* Useful links section */}
        <div className="mt-8 md:mt-0">
          <h6 className="mb-4 font-semibold text-gray-700 dark:text-gray-300">
            Useful links
          </h6>
          <p className="mb-4">
            <Link to={user !== null ? '/account' : '/login'} className="text-gray-600 dark:text-gray-200 hover:text-gray-800 dark:hover:text-gray-300">
              Account
            </Link>
          </p>
        </div>
        {/* Contact section */}
        <div className="mt-8 md:mt-0">
          <h6 className="mb-4 font-semibold text-gray-700 dark:text-gray-300">
            About Us
          </h6>
          <p className="mb-4">
            <Link to="/contact" className="text-gray-600 dark:text-gray-200 hover:text-gray-800 dark:hover:text-gray-300">
              Contact Us
            </Link>
          </p>
        </div>
      </div>

      {/* Copyright section */}
      <div className="bg-gray-800 dark:bg-gray-700 py-6 text-center text-white">
        <span>© 2023 Copyright:</span>
        <Link
          className="font-semibold ml-2 text-white hover:text-gray-300"
          to='/'
        >
          MA GYM
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
