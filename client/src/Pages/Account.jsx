import React, { useEffect, useState } from "react";
import axios from "axios";
import Profile from "../Components/users/Profile";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import PlanUserProfaile from "../Components/users/PlanUserProfaile";

const Account = () => {
  const [user, setUser] = useState([]);
  const [page, setPage] = useState("profile");
  const [photoPreview, setPhotoPreview] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const history = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/all_users")
      .then((response) => {
        setUser(response.data);
        setPhotoPreview(response.data.profile_image_name);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  function logout() {
    removeCookie('token');
    removeCookie('user_id');
    removeCookie('role_id');
    history("/");
  }

  const [isSideOpen, setIsSideOpen] = useState(true);
  const [position, setPosition] = useState("left-0");

  function openSideBar() {
    if (isSideOpen) {
      setPosition("-left-64");
    } else {
      setPosition("left-0");
    }
    setIsSideOpen(!isSideOpen);
  }

  return (
    <div className="flex flex-wrap mt-24">
      <div className="relative w-[260px] h-full">
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
              className="icon icon-tabler icon-tabler-adjustments"
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
          <aside className="flex flex-col w-64 h-auto px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
            <div className="w-auto h-12 flex justify-around items-center mx-6">
              <img
                className={`rounded-full w-1/4 ${
                  user.profile_image_name === null && "hidden"
                } border`}
                src={photoPreview}
                alt="Profile Picture"
              />
              <svg
                className={`"absolute w-12 h-12 text-gray-400 -left-1 rounded-full ${
                  user.profile_image_name === null ? "block" : "hidden"
                } border`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <h1 className="text-xl font-bold text-grey-600">
                {user.first_name} {user.last_name}
              </h1>
            </div>

            <br />
            <hr />
            <br />

            <div className="flex flex-col justify-between flex-1 mt-6">
              <nav className="-mx-3 space-y-6 ">
                <div className="space-y-3 ">
                  <label className="px-3 text-xs text-grey-700 uppercase dark:text-gray-400">
                    Manage Account
                  </label>

                  <button
                    className="w-full flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                    onClick={() => setPage("profile")}
                  >
                    <span className="mx-2 text-sm font-medium">Profile</span>
                  </button>
                  <button
                    className="w-full flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                    onClick={() => setPage("PlanUserProfaile")}
                  >
                    <span className="mx-2 text-sm font-medium">Training plan</span>
                  </button>
                </div>
                  
                <div className="space-y-3 ">
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
                        fill-rule="evenodd"
                        d="M12 2.25a.75.75 0 01.75.75v9a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM6.166 5.106a.75.75 0 010 1.06 8.25 8.25 0 1011.668 0 .75.75 0 111.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 011.06 0z"
                        clip-rule="evenodd"
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
      <div className={`${page === "profile" ? "block" : "hidden"} w-full`}>
        <Profile />
      </div>
      <div className={`${page === "PlanUserProfaile" ? "block" : "hidden"} w-full`}>
        <PlanUserProfaile />
      </div>
    </div>
  );
};

export default Account;
