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

const Admain = () => {
  const [user, setUser] = useState([]);
  const [page, setPage] = useState("Dashboard");
  const [photoPreview, setPhotoPreview] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  // Adding state for sidebar functionality
  const [isSideOpen, setIsSideOpen] = useState(true);

  useEffect(() => {
    // Fetch user data
    axios
      .get("http://localhost:5000/user")
      .then((response) => {
        setUser(response.data);
        setPhotoPreview(response.data.profile_image_name);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

    // If the user is not authenticated, redirect to login
    if (!cookies.token) {
      navigate("/SignIn");
    }
  }, [cookies.token, navigate]);

  // ... rest of your component

  function logout() {
    removeCookie("token");
    navigate("/SignIn");
  }

  return (
    <div className="flex h-full ">
      {/* sidebar */}
      <div
        className={`fixed w-64 h-full bg-white border-r overflow-y-auto ${
          isSideOpen ? "left-0" : "-left-64"
        }`}
      >
        <button
          aria-label="toggle sidebar"
          className={`${
            isSideOpen ? "hidden" : "flex"
          } lg:hidden h-10 w-10 bg-gray-600 absolute right-0 mt-16 -mr-10 items-center shadow rounded-tr rounded-br justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 rounded focus:ring-gray-800`}
          onClick={() => setIsSideOpen(!isSideOpen)}
        >
          {/* ... icon */}
        </button>
        <button
          aria-label="Close sidebar"
          className={`${
            isSideOpen ? "block" : "hidden"
          } lg:hidden h-10 w-10 bg-grey-600 absolute right-0 mt-16 -mr-10 flex items-center shadow rounded-tr rounded-br justify-center cursor-pointer text-white`}
          onClick={() => setIsSideOpen(!isSideOpen)}
        >
          {/* ... icon */}
        </button>
        <br></br><br></br>
        <aside className="flex flex-col w-64 h-auto px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav className="-mx-3 space-y-6">
              <div className="space-y-3">
                <label className="px-3 text-xs text-grey-700 uppercase dark:text-gray-400">
                  Manage Account
                </label>
                <button
                  className={`w-full flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 ${
                    page === "Dashboard" && "bg-gray-100 dark:bg-gray-800 dark:text-gray-200 text-gray-700"
                  } hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700`}
                  onClick={() => setPage("Dashboard")}
                >
                  <span className="mx-2 text-sm font-medium">Dashboard</span>
                </button>

                <button
                  className={`w-full flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 ${
                    page === "Users" && "bg-gray-100 dark:bg-gray-800 dark:text-gray-200 text-gray-700"
                  } hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700`}
                  onClick={() => setPage("Users")}
                >
                  <span className="mx-2 text-sm font-medium">Users</span>
                </button>

                <button
                  className={`w-full flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 ${
                    page === "Blogs" && "bg-gray-100 dark:bg-gray-800 dark:text-gray-200 text-gray-700"
                  } hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700`}
                  onClick={() => setPage("Blogs")}
                >
                  <span className="mx-2 text-sm font-medium">Blogs</span>
                </button>
                <button
                  className={`w-full flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 ${
                    page === "Courses" && "bg-gray-100 dark:bg-gray-800 dark:text-gray-200 text-gray-700"
                  } hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700`}
                  onClick={() => setPage("Courses")}
                >
                  <span className="mx-2 text-sm font-medium">Plan</span>
                </button>

                <button
                  className={`w-full flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 ${
                    page === "Contactus" && "bg-gray-100 dark:bg-gray-800 dark:text-gray-200 text-gray-700"
                  } hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700`}
                  onClick={() => setPage("Contactus")}
                >
                  <span className="mx-2 text-sm font-medium">Contactus</span>
                </button>

                  <button
                  className={`w-full flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 ${
                    page === "Category" && "bg-gray-100 dark:bg-gray-800 dark:text-gray-200 text-gray-700"
                  } hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700`}
                  onClick={() => setPage("Category")}
                >
                  <span className="mx-2 text-sm font-medium">Category</span>
                </button>

                <button
                  className={`w-full flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 ${
                    page === "WorkoutPage" && "bg-gray-100 dark:bg-gray-800 dark:text-gray-200 text-gray-700"
                  } hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700`}
                  onClick={() => setPage("WorkoutPage")}
                >
                  <span className="mx-2 text-sm font-medium">Workout</span>
                </button>
                <button
                  className={`w-full flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 ${
                    page === "FAQ" && "bg-gray-100 dark:bg-gray-800 dark:text-gray-200 text-gray-700"
                  } hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700`}
                  onClick={() => setPage("FAQ")}
                >
                  <span className="mx-2 text-sm font-medium">FAQ</span>
                </button>
              </div>

              <div className="space-y-3">
                <button
                  className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
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

      {/* content */}
      <div className="flex-1">
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
      </div>
    </div>
  );
};

export default Admain;
