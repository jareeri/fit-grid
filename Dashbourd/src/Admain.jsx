import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Contactus from "./Contactus";
import Courses from "./Courses";  // Corrected import
import Blogs from "./Blogs";
import Users from "./Users";
import Dashboard from "./Dashboard";
import Category from "./Category";
import WorkoutPage from "./Workout";
import FAQ from "./FAQ";
import JoinOurTeam from "./JoinOurTeam";
import fit from "./Images/fit.png";



const Admain = () => {
  const [user, setUser] = useState([]);
  const [page, setPage] = useState("Dashboard");
  const [photoPreview, setPhotoPreview] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8080/api/admin-only")
  //     .then((response) => {
  //       setUser(response.data);
  //       // console.log(response.data);
  //       if (response.data.success) {
  //         navigate("/home");
  //       }
  //       // setPhotoPreview(response.data.profile_image_name);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching user data:", error);
  //     });
  // }, []);

 
  const [isSideOpen, setIsSideOpen] = useState(true);
  const [position, setPosition] = useState("left-0");

  function logout() {
    removeCookie("token");
    removeCookie("role_id");
    removeCookie("user_id");
    navigate("/");
  }

  function openSideBar() {
    if (isSideOpen) {
      setPosition("-left-64");
    } else {
      setPosition("left-0");
    }
    setIsSideOpen(!isSideOpen);
  }

  
  return (
    <div className="flex h-full bg-[#f5f5f5] overflow-x-hidden">
      {/* sidebar */}
      <div className="w-[260px] h-full fixed ">
        <div
          className={`peer absolute top-0 border ${position} lg:left-0 h-full w-full object-cover transition-all delay-100 duration-1000`}
        >
          <button
            aria-label="toggle sidebar"
            id="openSideBar"
            className={`${
              isSideOpen ? "hidden" : "flex"
            } lg:hidden h-10 w-10 bg-gray-600 absolute right-0 mt-16 -mr-10 items-center shadow rounded-tr rounded-br justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 rounded focus:ring-gray-800`}
            onClick={openSideBar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-adjustments "
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#FFFFFF"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z"></path>
              <circle cx="6" cy="10" r="2"></circle>
              <line x1="6" y1="4" x2="6" y2="8"></line>
              <line x1="6" y1="12" x2="6" y2="20"></line>
              <circle cx="12" cy="16" r="2"></circle>
              <line x1="12" y1="4" x2="12" y2="14"></line>
              <line x1="12" y1="18" x2="12" y2="20"></line>
              <circle cx="18" cy="7" r="2"></circle>
              <line x1="18" y1="4" x2="18" y2="5"></line>
              <line x1="18" y1="9" x2="18" y2="20"></line>
            </svg>
          </button>
          <button
            aria-label="Close sidebar"
            id="closeSideBar"
            className={`${
              isSideOpen ? "block" : "hidden"
            } lg:hidden h-10 w-10 bg-grey-600 absolute right-0 mt-16 -mr-10 flex items-center shadow rounded-tr rounded-br justify-center cursor-pointer text-white`}
            onClick={openSideBar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-x"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z"></path>
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <aside className="flex flex-col w-64  px-5 py-8  bg-black   ">
  <div className="flex flex-col justify-between flex-1 ">
  <img src={fit} className="mr-3 flex  items-center h-32 w-32 ml-10 " alt="CraftVine Logo" />

    <nav className="-mx-3 space-y-6">
      <div className="space-y-3 ">
    
      

        <label className="px-3 transition-colors flex justify-center duration-300 transform rounded-lg text-grey-700 uppercase text-white ">
          Manage Account
        </label>
   
        <button
          className={`w-full flex items-center px-3 py-2 text-white transition-colors duration-300 transform rounded-lg dark:text-gray-200  ${
            page === "Dashboard" && "bg-red-700 dark:bg-red-800 dark:text-gray-200 text-gray-700"
          } hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700`}
          onClick={() => setPage("Dashboard")}
        >
          <span className="mx-2 text-sm font-medium">Dashboard</span>
        </button>

        <button
          className={`w-full flex items-center px-3 py-2 text-white transition-colors duration-300 transform rounded-lg dark:text-gray-200 ${
            page === "Users" && "bg-red-700 dark:bg-red-800 dark:text-gray-200 text-gray-700"
          } hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700`}
          onClick={() => setPage("Users")}
        >
          <span className="mx-2 text-sm font-medium">Users</span>
        </button>

        <button
          className={`w-full flex items-center px-3 py-2 text-white transition-colors duration-300 transform rounded-lg dark:text-gray-200 ${
            page === "Blogs" && "bg-red-700 dark:bg-red-800 dark:text-gray-200 text-gray-700"
          } hover:bg-red-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700`}
          onClick={() => setPage("Blogs")}
        >
          <span className="mx-2 text-sm font-medium">Blogs</span>
        </button>
        <button
          className={`w-full flex items-center px-3 py-2 text-white transition-colors duration-300 transform rounded-lg dark:text-gray-200 ${
            page === "Courses" && "bg-red-700 dark:bg-red-800 dark:text-gray-200 text-gray-700"
          } hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700`}
          onClick={() => setPage("Courses")}
        >
          <span className="mx-2 text-sm font-medium">Plan</span>
        </button>

        <button
          className={`w-full flex items-center px-3 py-2 text-white transition-colors duration-300 transform rounded-lg dark:text-gray-200 ${
            page === "Contactus" && "bg-red-700 dark:bg-red-800 dark:text-gray-200 text-gray-700"
          } hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700`}
          onClick={() => setPage("Contactus")}
        >
          <span className="mx-2 text-sm font-medium">Contactus</span>
        </button>

          <button
          className={`w-full flex items-center px-3 py-2 text-white transition-colors duration-300 transform rounded-lg dark:text-gray-200 ${
            page === "Category" && "bg-red-700 dark:bg-redred-800 dark:text-gray-200 text-gray-700"
          } hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700`}
          onClick={() => setPage("Category")}
        >
          <span className="mx-2 text-sm font-medium">Category</span>
        </button>

        <button
          className={`w-full flex items-center px-3 py-2 text-white transition-colors duration-300 transform rounded-lg dark:text-gray-200 ${
            page === "WorkoutPage" && "bg-red-700 dark:bg-red-800 dark:text-gray-200 text-gray-700"
          } hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700`}
          onClick={() => setPage("WorkoutPage")}
        >
          <span className="mx-2 text-sm font-medium">Workout</span>
        </button>
        <button
          className={`w-full flex items-center px-3 py-2 text-white transition-colors duration-300 transform rounded-lg dark:text-gray-200 ${
            page === "FAQ" && "bg-red-700 dark:bg-red-800 dark:text-gray-200 text-gray-700"
          } hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700`}
          onClick={() => setPage("FAQ")}
        >
          <span className="mx-2 text-sm font-medium">FAQ</span>
        </button>
        <button
          className={`w-full flex items-center px-3 py-2 text-white transition-colors duration-300 transform rounded-lg dark:text-gray-200 ${
            page === "JoinOurTeam" && "bg-red-700 dark:bg-red-800 dark:text-gray-200 text-gray-700"
          } hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700`}
          onClick={() => setPage("JoinOurTeam")}
        >
          <span className="mx-2 text-sm font-medium">Join Trainer</span>
        </button>
      </div>

      <div className="space-y-3">
        <button
          className="flex items-center px-3 py-2 text-white transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
          onClick={logout}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="mx-2 text-sm font-medium">Log Out</span>
        </button>
        
      </div>
      
    </nav>
  </div>
</aside>
        </div>
      </div>
      {/* content */}
      <div className="flex justify-end flex-1  w-10/12 ml-24">
        <div className={`${page === "Dashboard" ? "block" : "hidden"} w-full`}>
          <Dashboard />
        </div>

        <div className={`${page === "Users" ? "block" : "hidden"} w-full`}>
          <Users />
        </div>

        <div className={`${page === "Blogs" ? "block" : "hidden"} w-full`}>
          <Blogs />
        </div>

        <div className={`${page === "Courses" ? "block" : "hidden"} w-full`}>
          <Courses />
        </div>

        <div className={`${page === "Contactus" ? "block" : "hidden"} w-full`}>
          <Contactus />
        </div>

        <div className={`${page === "Category" ? "block" : "hidden"} w-full`}>
        <Category/>
        </div>
        <div className={`${page === "WorkoutPage" ? "block" : "hidden"} w-full`}>
          <WorkoutPage/>
        </div>
        <div className={`${page === "FAQ" ? "block" : "hidden"} w-full`}>
        <FAQ/>
        </div>
        <div className={`${page === "JoinOurTeam" ? "block" : "hidden"} w-full`}>
        <JoinOurTeam/>
        </div>
      </div>
    </div>
  );
};

export default Admain;