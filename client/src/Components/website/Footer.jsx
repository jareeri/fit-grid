import React from "react";
import { Link, useLocation } from "react-router-dom";
import fit from "../../Images/fit.png";

const Footer = () => {
  const user = null;
  const location = useLocation();

  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }

  return (
    <footer className="bg-black dark:bg-black text-white dark:text-white z-50">
      <div className="container mx-auto py-10 flex flex-wrap items-center justify-around">
        {/* Logo and description section */}
        <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 pr-4 mb-8 md:mb-0">
          <Link to="/" className="flex items-center ">
            <img src={fit} className="mr-3 h-20" alt="CraftVine Logo" />
          </Link>
          <p className="text-center md:text-left">
            
Transform Your Body. Explore top-notch fitness gear for the perfect balance of style and affordability. 
          </p>
        </div>
        {/* Navigation sections */}
        <div className="w-full md:w-1/2 lg:w-1/4 xl:w-1/6 mb-8 md:mb-0">
          <h6 className="mb-4 font-semibold">Explore</h6>
          <p className="mb-4">
            <Link to='/' className="hover:text-gray-300">
              Home
            </Link>
          </p>
          <p className="mb-4">
            <Link to="/Trainers" className="hover:text-gray-300">
              Trainers
            </Link>
          </p>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/4 xl:w-1/6 mb-8 md:mb-0">
          <h6 className="mb-4 font-semibold">Useful links</h6>
          <p className="mb-4">
            <Link to={user !== null ? '/account' : '/login'} className="hover:text-gray-300">
              Account
            </Link>
          </p>
          <p className="mb-4">
            <Link to="/Privacypolicypage" className="hover:text-gray-300">
              Privacy policy
            </Link>
          </p>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/4 xl:w-1/6 mb-8 md:mb-0">
          <h6 className="mb-4 font-semibold">About Us</h6>
          <p className="mb-4">
            <Link to="/contact" className="hover:text-gray-300">
              Contact Us
            </Link>
          </p>
          <p>
            <Link to="/AboutUs" className="hover:text-gray-300">
              About Us
            </Link>
          </p>
        </div>
      </div>
      {/* Copyright section */}
      <div className="bg-black dark:bg-black py-6 text-center text-white">
        <span>© 2023 Copyright:</span>
        <Link className="font-semibold ml-2 text-red-700 hover:text-red-500" to='/'>
          FitGrid
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
