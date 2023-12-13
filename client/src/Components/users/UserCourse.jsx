import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";


const UserCourse = () => {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/Corse");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastCourse = currentPage * 6;
  const indexOfFirstCourse = indexOfLastCourse - 6;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const totalPages = Math.ceil(courses.length / 6);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);



  return (
    <div className="ml-44 my-16">
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <h1 className="text-gray-800 text-4xl mb-6 font-bold text-center">My Courses</h1>
        {deleteMessage && <p className="text-green-500">{deleteMessage}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-4 my-4 items-end justify-end">
          {currentCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-md overflow-hidden shadow-lg w-[20rem]">
              <Link to="#">
                <img src={course.course_img} alt="" className="w-full h-40 object-cover" />
              </Link>
              <div className="p-4 w-[20rem]">
                <Link to="#">
                  <h5 className="w-[20rem] mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    {course.Course_Name}
                  </h5>
                </Link>
                <p className="w-[20rem] mb-3 text-sm text-gray-700 dark:text-gray-400">
                  {course.Course_description}
                </p>
                <Link
                  to={`/course-details/${course.id}`}
                  className="inline-block px-4 py-2 text-sm font-bold text-white bg-gray-800 rounded-full hover:bg-gray-700 focus:outline-none"
                >
                  Read More
                </Link>
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
      </div>
    </div>
  );
};

export default UserCourse;
