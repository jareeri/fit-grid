import React, { useEffect, useState } from "react";
import FitGrid from "../../Images/FitGrid.png";
import { Link, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [user, setUser] = useState(null); // Updated initialization
  const [cookie] = useCookies(["token", "role_id"]);
  const [role, setRole] = useState(false);

  useEffect(() => {
    setUser(cookie.user_id);
    setRole(cookie.role_id);
  }, [cookie]);

  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpened(!isMenuOpened);
  };

  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-white">
      <nav className="max-w-screen h-[6rem] flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center">
          <img src={FitGrid} className="mr-3 h-20" alt="CraftVine Logo" />
        </Link>
        <div className="flex md:order-2">
          {user ? (
            <>
              {role === "trainer" ? (
                <Link to="/AccountTrainers">
                  <img
                    className="rounded-full h-10 w-10 ml-3"
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    alt="Profile"
                  />
                </Link>
              ) : (
                <Link to="/Account">
                  <img
                    className="rounded-full h-10 w-10 ml-3"
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    alt="Profile"
                  />
                </Link>
              )}
            </>
          ) : (
            <Link to="/login">
              <button className="bg-gray-800 hover:bg-[#89B9AD] rounded-full text-white h-10 px-4">
                Signin | Signup
              </button>
            </Link>
          )}
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="block text-gray-800 hover:text-[#89B9AD] focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between ${
            isMenuOpened ? "block" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
        >
          <div className="flex justify-between">
            <div className="relative mt-3 md:hidden"></div>
            {(!user || !role) && (
              <Link to="/login" className="md:hidden self-start">
                <button className="bg-teal-600 rounded-full text-white h-10 my-3 px-4">
                  Signin|Signup
                </button>
              </Link>
            )}
          </div>
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/"
                className="block py-2 pl-3 pr-4 text-white bg-grey-600 rounded md:bg-transparent md:text-gray-600 md:p-0 md:dark:text-blue-500"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#89B9AD] md:p-0 md:dark:hover:text-[#89B9AD] dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/trainers"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Trainers
              </Link>
            </li>
            <li>
              <Link
                to="/Exercises"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Workout
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
