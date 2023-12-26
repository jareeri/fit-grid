import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Params } from "react-router-dom";

const TUserList = () => {
  const [users, setUsers] = useState([]);
  const {id} =  useParams();
  // console.log(id);
  useEffect(() => {
    // Fetch user data when the component mounts
    axios
      .get(`http://localhost:8080/subscribers/plan/${id}`)
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleViewDetails = (userId) => {
    // Fetch details for the selected user
    axios
      .get(`http://localhost:8080/subscribers/${userId}`)
      .then((response) => {
        setSelectedUserDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });

    // Set the selected user ID
    setSelectedUserId(userId);
  };


  return (
    <div>
      <div className=" rounded-lg overflow-hidden  mx-auto my-8 max-w-screen-md">
        <div className="flex items-center justify-between pb-6">
          <div>
            <h2 className="font-semibold text-gray-700">User Accounts</h2>
            <span className="text-xs text-gray-500">
              View accounts of registered users
            </span>
          </div>
          <div className="flex items-center justify-between">
            {/* Your additional buttons or components can go here */}
          </div>
        </div>
        <div className="overflow-y-hidden rounded-lg border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-red-700 text-left text-xs font-semibold uppercase tracking-widest text-white">
                  <th className="px-5 py-3">ID</th>
                  <th className="px-5 py-3">Full Name</th>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3">Created at</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="text-gray-500">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-5 py-3">{user.user_id}</td>
                    <td className="px-5 py-3">{user.username}</td>
                    <td className="px-5 py-3">{user.email}</td>
                    <td className="px-5 py-3">
                      {user.created_at?.split("T")[0]}
                    </td>
                    <td className="px-5 py-3">
                      <Link
                        to={`/Tcourse-details/${user.user_id}`}
                        className="bg-red-700 text-white px-3 py-1 rounded"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col items-center border-t bg-white px-5 py-5 sm:flex-row sm:justify-between">
            <span className="text-xs text-gray-600 sm:text-sm">
              {" "}
              Showing 1 to 5 of {users.length} Entries{" "}
            </span>
            <div className="mt-2 inline-flex sm:mt-0">
              <button className="mr-2 h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">
                Prev
              </button>
              <button className="h-12 w-12 rounded-full border text-sm font-semibold text-gray-600 transition duration-150 hover:bg-gray-100">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TUserList;