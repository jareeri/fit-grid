import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    Course_Name: '',
    Course_Category: '',
    Course_Duration: '',
    Pricing: '',
    Course_description: '',
  });

  useEffect(() => {
    // Fetch data from your API using Axios
    axios.get('http://localhost:3000/Corse')
      .then(response => {
        // Update the state with the fetched data
        setCourses(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  const handleSave = (courseData) => {
    // Send a request to update the course data on the server
    axios.put(`http://localhost:3000/Corse/${courseData.id}`, courseData)
      .then(response => {
        // Handle success, e.g., show a success message
        console.log('Course data updated successfully:', response.data);

        // Optionally, you can update the local state with the new data
        setCourses(prevCourses => prevCourses.map(course =>
          course.id === courseData.id ? { ...course, ...courseData } : course
        ));
      })
      .catch(error => {
        // Handle error, e.g., show an error message
        console.error('Error updating course data:', error);
      });
  };

  const handleDelete = (courseId) => {
    // Optimistically remove the course from the local state
    setCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));

    // Send a request to delete the course from the server
    axios.delete(`http://localhost:3000/Corse/${courseId}`)
      .then(response => {
        // Handle success, e.g., show a success message
        console.log('Course deleted successfully:', response.data);
      })
      .catch(error => {
        // Handle error, e.g., show an error message
        console.error('Error deleting course:', error);

        // Roll back the state if the request fails
        axios.get('http://localhost:3000/Corse')
          .then(response => {
            // Update the state with the fetched data
            setCourses(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      });
  };

  const handleInputChange = (courseId, field, value) => {
    // Update the local state with the changed input value
    setCourses(prevCourses =>
      prevCourses.map(course =>
        course.id === courseId ? { ...course, [field]: value } : course
      )
    );
  };

  const handleAdd = () => {
    // Send a request to add the new course to the server
    axios.post('http://localhost:3000/Corse', newCourse)
      .then(response => {
        // Handle success, e.g., show a success message
        console.log('New course added successfully:', response.data);

        // Update the local state with the new data
        setCourses(prevCourses => [...prevCourses, response.data]);

        // Clear the form fields after successful submission
        setNewCourse({
          Course_Name: '',
          Course_Category: '',
          Course_Duration: '',
          Pricing: '',
          Course_description: '',
        });
      })
      .catch(error => {
        // Handle error, e.g., show an error message
        console.error('Error adding new course:', error);
      });
  };

  return (
    <div className="text-gray-900 bg-white w-full md:w-11/12 lg:w-3/4 xl:w-2/3 flex justify-end mt-44 ml-72">
      {/* <div className="p-4 flex justify-center">
        <h1 className="text-3xl font-bold mb-4">Course Management</h1>
      </div> */}
      <div className="px-4 py-2 flex justify-center">
        <table className="w-full text-md bg-white shadow-md rounded mb-4">
          <thead className="bg-[#9DB2BF] text-white">
            <tr>
              <th className="py-2 px-4">Course Name</th>
              <th className="py-2 px-4">Course Category</th>
              <th className="py-2 px-4">Course Duration</th>
              <th className="py-2 px-4">Pricing</th>
              <th className="py-2 px-4">Course Description</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr
                key={index}
                className={`border-b hover:bg-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}
              >
                <td className="py-2 px-4">
                  <input
                    type="text"
                    value={course.Course_Name}
                    className="w-full bg-transparent"
                    onChange={(e) => handleInputChange(course.id, 'Course_Name', e.target.value)}
                  />
                </td>
                <td className="py-2 px-4">
                  <input
                    type="text"
                    value={course.Course_Category}
                    className="w-full bg-transparent"
                    onChange={(e) => handleInputChange(course.id, 'Course_Category', e.target.value)}
                  />
                </td>
                <td className="py-2 px-4">
                  <input
                    type="text"
                    value={course.Course_Duration}
                    className="w-full bg-transparent"
                    onChange={(e) => handleInputChange(course.id, 'Course_Duration', e.target.value)}
                  />
                </td>
                <td className="py-2 px-4">
                  <input
                    type="text"
                    value={course.Pricing}
                    className="w-full bg-transparent"
                    onChange={(e) => handleInputChange(course.id, 'Pricing', e.target.value)}
                  />
                </td>
                <td className="py-2 px-4">
                  <textarea
                    value={course.Course_description}
                    className="w-full bg-transparent"
                    onChange={(e) => handleInputChange(course.id, 'Course_description', e.target.value)}
                  />
                </td>
                <td className="py-2 px-4 flex justify-end">
                  <button
                    type="button"
                    className="mr-2 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleSave(course)}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleDelete(course.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            <tr className="border-b hover:bg-gray-100">
              <td className="py-2 px-4">
                <input
                  type="text"
                  value={newCourse.Course_Name}
                  className="w-full bg-transparent"
                  placeholder="New Course Name"
                  onChange={(e) => setNewCourse({ ...newCourse, Course_Name: e.target.value })}
                />
              </td>
              <td className="py-2 px-4">
                <input
                  type="text"
                  value={newCourse.Course_Category}
                  className="w-full bg-transparent"
                  placeholder="New Course Category"
                  onChange={(e) => setNewCourse({ ...newCourse, Course_Category: e.target.value })}
                />
              </td>
              <td className="py-2 px-4">
                <input
                  type="text"
                  value={newCourse.Course_Duration}
                  className="w-full bg-transparent"
                  placeholder="New Course Duration"
                  onChange={(e) => setNewCourse({ ...newCourse, Course_Duration: e.target.value })}
                />
              </td>
              <td className="py-2 px-4">
                <input
                  type="text"
                  value={newCourse.Pricing}
                  className="w-full bg-transparent"
                  placeholder="New Pricing"
                  onChange={(e) => setNewCourse({ ...newCourse, Pricing: e.target.value })}
                />
              </td>
              <td className="py-2 px-4">
                <textarea
                  value={newCourse.Course_description}
                  className="w-full bg-transparent"
                  placeholder="New Course Description"
                  onChange={(e) => setNewCourse({ ...newCourse, Course_description: e.target.value })}
                />
              </td>
              <td className="py-2 px-4 flex justify-end">
                <button
                  type="button"
                  className="text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleAdd}
                >
                  Add
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Courses;
