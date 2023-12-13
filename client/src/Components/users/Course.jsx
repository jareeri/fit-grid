// Course.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import AddTrainingCoursePage from "../AddCourse";
import UpdatePlan from "../UpdatePlan";

const Course = ({ user_id }) => {
  const [trainers, setTrainers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [updateTrainerId, setUpdateTrainerId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/getplansfortrainer/${user_id}`);
        setTrainers(response.data.trainers);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [user_id]);

  const indexOfLastTrainer = currentPage * 6;
  const indexOfFirstTrainer = indexOfLastTrainer - 6;
  const currentTrainers = trainers.slice(indexOfFirstTrainer, indexOfLastTrainer);

  const totalPages = Math.ceil(trainers.length / 6);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleUpdate = (trainerId) => {
    setUpdateTrainerId(trainerId);
    setShowPopup(true);
  };

  const handleDelete = async (trainerId) => {
    try {
      await axios.put(`http://localhost:8080/softDeletePlanById/${trainerId}`);
      setDeleteMessage("Trainer deleted successfully.");

      const response = await axios.get(`http://localhost:8080/getplansfortrainer/${user_id}`);
      setTrainers(response.data.trainers);
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

  return (
    <div className="ml-44 my-16">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-[#27374D] text-4xl mb-6 font-bold text-center">Trainers</h1>
        {deleteMessage && <p className="text-green-500">{deleteMessage}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-4 my-4 items-end justify-end">
          {currentTrainers.map((trainer) => (
            <div key={trainer.id} className="bg-white rounded-md overflow-hidden shadow-lg w-[20rem]">
              <Link to="#">
                <img src={trainer.image} alt="" className="w-full h-40 object-cover" />
              </Link>
              <div className="p-4 w-[20rem]">
                <Link to="#">
                  <h5 className="w-[20rem] mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    {trainer.name}
                  </h5>
                </Link>
                <p className="w-[20rem] mb-3 text-sm text-gray-700 dark:text-gray-400">
                  Description: {trainer.description}
                </p>
                {/* Display other trainer properties */}
                <Link
                  to={`/Tcourse-details/${trainer.id}`}
                  className="inline-block px-4 py-2 text-sm font-bold text-white bg-gray-800 rounded-full hover:bg-gray-700 focus:outline-none"
                >
                  Read More
                </Link>
                <button
                  onClick={() => handleUpdate(trainer.id)}
                  className="inline-block px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none ml-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(trainer.id)}
                  className="inline-block px-4 py-2 text-sm font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none ml-2"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-full flex justify-center mt-4">
          <button
            className="mx-2 p-2 bg-gray-800 text-white hover:bg-gray-700 focus:outline-none rounded-full"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`mx-2 p-2 bg-gray-800 text-white hover:bg-gray-700 focus:outline-none rounded-full ${
                currentPage === number ? "bg-gray-800" : ""
              }`}
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            >
              {number}
            </button>
          ))}
          <button
            className="mx-2 p-2 bg-gray-800 text-white hover:bg-gray-700 focus:outline-none rounded-full"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>

        <button
          className="fixed bottom-8 right-8 p-4 bg-gray-900 text-white rounded-full hover:bg-gray-600 focus:outline-none"
          onClick={handleAdd}
        >
          Add Trainer
        </button>

        {showPopup && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-md shadow-lg">
              {updateTrainerId ? (
                <UpdatePlan trainerId={updateTrainerId} onClose={() => setShowPopup(false)} />
              ) : (
                <AddTrainingCoursePage onClose={() => setShowPopup(false)} />
              )}
              <button
                className="mt-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-700 focus:outline-none"
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
