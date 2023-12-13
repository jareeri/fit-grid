import React, { useEffect, useState } from "react";
import FitGrid from "./FitGrid.png";
import { Link, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [user, setUser] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);

  useEffect(() => {
    if (cookie.token !== undefined) {
      setUser(true);
    } else {
      setUser(false);
    }
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
          <Link to="/login" className={`${!user && "md:block"} hidden`}>
            <button className="bg-gray-800 hover:bg-[#89B9AD] rounded-full text-white h-10 px-4">
              Signin | Signup
            </button>
          </Link>
          <Link to={user.type === "trainer" ? "/AccountTrainers" : "/Account"}>
            <img
              className="rounded-full h-10 w-10 ml-3"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt="Profile"
            />
          </Link>
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
            <div className="relative mt-3 md:hidden">
              
            </div>
            <Link
              to="/login"
              className={`${
                user ? "hidden" : "md:hidden"
              } self-start`}
            >
              <button className="bg-teal-600 rounded-full text-white h-10  my-3 px-4">
                Signin|Signup
              </button>
            </Link>
          </div>
        
          
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
