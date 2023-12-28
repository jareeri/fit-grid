// Course.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import AddTrainingCoursePage from "../AddCourse";
import UpdatePlan from "../UpdatePlan";
import { useCookies } from "react-cookie";

const Course = ({ user_id }) => {
  const [cookie] = useCookies(["user_id"]);
  const [trainers, setTrainers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [updateTrainerId, setUpdateTrainerId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/getplansfortrainer/${cookie.user_id}`
        );
        setTrainers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [user_id]);

  const itemsPerPage = 6;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentTrainers = trainers || [];
  const totalPages = trainers ? Math.ceil(trainers.length / itemsPerPage) : 0;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleUpdate = (trainerId) => {
    setUpdateTrainerId(trainerId);
    setShowPopup(true);
  };

  const handleDelete = async (trainerId) => {
    try {
      await axios.put(`http://localhost:8080/softDeletePlanById/${trainerId}`);
      setDeleteMessage("Trainer deleted successfully.");

      const response = await axios.get(
        `http://localhost:8080/getplansfortrainer/${cookie.user_id}`
      );
      setTrainers(response.data);
    } catch (error) {
      console.error("Error deleting trainer: ", error);
      setDeleteMessage("Error deleting trainer. Please try again.");
    } finally {
      setTimeout(() => {
        setShowPopup(false);
        setDeleteMessage("");
      }, 3000);
    }
  };

  const handleAdd = () => {
    setShowPopup(true);
    setUpdateTrainerId(null);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="ml-10 lg:ml-44 my-10">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-[#27374D] text-4xl mb-6 font-bold text-center">
          plan
        </h1>
        {deleteMessage && <p className="text-green-500">{deleteMessage}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end justify-end">
          {currentTrainers.slice(startIndex, endIndex).map((trainer) => (
            <div
              key={trainer.id}
              className="bg-white rounded-md overflow-hidden shadow-lg  sm:w-[100%] md:w-[98%] lg:w-[100%]"
            >
              <Link to="#">
                <img
                  src={trainer.image}
                  alt=""
                  className="w-[20rem] h-40 object-cover"
                />
              </Link>
              <div className="p-4 w-[15rem]">
                <Link to="#">
                  <h5 className="w-[20rem] mb-2 text-xl font-bold text-gray-900 dark:text-white line-clamp-1">
                    {trainer.name}
                  </h5>
                </Link>
                <p className="w-[15rem] mb-3 text-sm text-gray-700 dark:text-gray-400 line-clamp-2">
                  Description: {trainer.description}
                </p>
                <div className="flex justify-center">
                <Link
                  to={`/TUserList/${trainer.id}`}
                  className="inline-block px-3 py-2 text-xs lg:text-xs md:text-xs font-bold text-white bg-gray-800 rounded-full hover:bg-gray-700 focus:outline-none"
                >
                  Read More
                </Link>
              
                <button
                  onClick={() => handleUpdate(trainer.id)}
                  className="inline-block px-3 py-2 text-xs lg:text-xs md:text-xs  font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none ml-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(trainer.id)}
                  className="inline-block px-3 py-2 text-xs lg:text-xs md:text-xs font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none ml-2"
                >
                  Delete
                </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button
            className={`mx-2 p-2 bg-black text-white hover:bg-red-700 focus:outline-none rounded-md ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-2 p-2 bg-red-700 text-white hover:bg-black focus:outline-none rounded-md ${
                currentPage === index + 1 ? "bg-gray-800" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            className={`mx-2 p-2 bg-black text-white hover:bg-red-700 focus:outline-none rounded-md ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>

        <button
          className="fixed bottom-8 right-8 p-4 bg-red-700 text-white rounded-full hover:bg-red-600 focus:outline-none"
          onClick={handleAdd}
        >
          Add Plan
        </button>

        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-gray-800 bg-opacity-50 transition-opacity"></div>
            <div className="z-10 w-full max-w-md mx-auto mt-8 p-4 bg-white rounded-md shadow-lg relative transform scale-100 transition-transform">
              {updateTrainerId ? (
                <UpdatePlan
                  trainerId={updateTrainerId}
                  onClose={() => setShowPopup(false)}
                />
              ) : (
                <AddTrainingCoursePage onClose={() => setShowPopup(false)} />
              )}
             
              <button
                className="mt-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-700 focus:outline-none mx-auto block"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
              
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Course;