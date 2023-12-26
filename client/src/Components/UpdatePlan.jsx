// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const UpdatePlan = ({ courseId, onClose }) => {
//   const [formData, setFormData] = useState({
//     Course_Name: "",
//     Course_Category: "",
//     Course_Duration: "",
//     Pricing: "",
//     Course_description: "",
//   });

//   useEffect(() => {
//     const fetchCourseData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/getplanbyid/${courseId}`);
//         setFormData(response.data);
//       } catch (error) {
//         console.error("Error fetching course data: ", error);
//       }
//     };

//     fetchCourseData();
//   }, [courseId]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.put(`http://localhost:8080/updatePlanById/${courseId}`, formData);
//       // Upon successful completion, close the form
//       onClose();
//     } catch (error) {
//       console.error("Error updating course: ", error);
//       // Handle the error as needed
//     }
//   };

//   const handleImageChange = (e) => {
//     setFormData((prevFormData) => ({ ...prevFormData, image: e.target.files[0] }));
//   };

//   return (
//     <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
//       <h2 className="text-2xl font-semibold mb-4 text-red-700 text-center col-span-2">Update Plan</h2>

//       <div className="mb-2">
//         <label className="block text-gray-700 text-xs font-bold mb-1" htmlFor="Course_Name">
//           Course Name
//         </label>
//         <input
//           type="text"
//           id="Course_Name"
//           name="Course_Name"
//           value={formData.Course_Name}
//           onChange={handleChange}
//           className="w-full p-1 border rounded text-xs"
//         />
//       </div>

//       <div className="mb-2">
//         <label className="block text-gray-700 text-xs font-bold mb-1" htmlFor="Course_Category">
//           Course Category
//         </label>
//         <input
//           type="text"
//           id="Course_Category"
//           name="Course_Category"
//           value={formData.Course_Category}
//           onChange={handleChange}
//           className="w-full p-1 border rounded text-xs"
//         />
//       </div>

//       <div className="mb-2">
//         <label className="block text-gray-700 text-xs font-bold mb-1" htmlFor="Course_Duration">
//           Course Duration
//         </label>
//         <input
//           type="text"
//           id="Course_Duration"
//           name="Course_Duration"
//           value={formData.Course_Duration}
//           onChange={handleChange}
//           className="w-full p-1 border rounded text-xs"
//         />
//       </div>

//       <div className="mb-2">
//         <label className="block text-gray-700 text-xs font-bold mb-1" htmlFor="Pricing">
//           Pricing
//         </label>
//         <input
//           type="text"
//           id="Pricing"
//           name="Pricing"
//           value={formData.Pricing}
//           onChange={handleChange}
//           className="w-full p-1 border rounded text-xs"
//         />
//       </div>

//       <div className="w-full mb-2">
//         <label className="block text-xs font-medium text-gray-600" htmlFor="Course_description">
//           Course Description
//         </label>
//         <textarea
//           id="Course_description"
//           name="Course_description"
//           value={formData.Course_description}
//           onChange={handleChange}
//           className="w-full p-1 border rounded h-20 text-xs" // Adjust the height as needed
//         />
//       </div>

//       <div className="w-full mb-2">
//         <label className="block mb-1 text-xs font-bold text-gray-600 text-center" htmlFor="image">
//           Image
//         </label>
//         <input
//           type="file"
//           id="image"
//           name="image"
//           accept="image/*"
//           onChange={handleImageChange}
//           className="w-full p-1 border rounded-md text-xs"
//         />
//       </div>

//       <div className="col-span-2 flex justify-center">
//         <button
//           type="submit"
//           className="bg-black text-white hover:bg-gray-800 p-1 rounded-md mt-2 cursor-pointer block w-30 text-md"
//         >
//           Update Course
//         </button>
//       </div>
//     </form>
//   );
// };

// export default UpdatePlan;


import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdatePlan = ({ courseId, onClose }) => {
  const [formData, setFormData] = useState({
    Course_Name: "",
    Course_Category: "",
    Course_Duration: "",
    Pricing: "",
    Course_description: "",
  });

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/updatePlanById/${courseId}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching course data: ", error);
      }
    };

    fetchCourseData();
  }, [courseId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8080/updatePlanById/${courseId}`, formData);
      // Upon successful completion, close the form
      onClose();
    } catch (error) {
      console.error("Error updating course: ", error);
      // Handle the error as needed
    }
  };

  const handleImageChange = (e) => {
    setFormData((prevFormData) => ({ ...prevFormData, image: e.target.files[0] }));
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
      <h2 className="text-2xl font-semibold mb-4 text-red-700 text-center col-span-2">Update Plan</h2>

      <div className="mb-2">
        <label className="block text-gray-700 text-xs font-bold mb-1" htmlFor="Course_Name">
          Course Name
        </label>
        <input
          type="text"
          id="Course_Name"
          name="Course_Name"
          value={formData.Course_Name}
          onChange={handleChange}
          className="w-full p-1 border rounded text-xs"
        />
      </div>

      <div className="mb-2">
        <label className="block text-gray-700 text-xs font-bold mb-1" htmlFor="Course_Category">
          Course Category
        </label>
        <input
          type="text"
          id="Course_Category"
          name="Course_Category"
          value={formData.Course_Category}
          onChange={handleChange}
          className="w-full p-1 border rounded text-xs"
        />
      </div>

      <div className="mb-2">
        <label className="block text-gray-700 text-xs font-bold mb-1" htmlFor="Course_Duration">
          Course Duration
        </label>
        <input
          type="text"
          id="Course_Duration"
          name="Course_Duration"
          value={formData.Course_Duration}
          onChange={handleChange}
          className="w-full p-1 border rounded text-xs"
        />
      </div>

      <div className="mb-2">
        <label className="block text-gray-700 text-xs font-bold mb-1" htmlFor="Pricing">
          Pricing
        </label>
        <input
          type="text"
          id="Pricing"
          name="Pricing"
          value={formData.Pricing}
          onChange={handleChange}
          className="w-full p-1 border rounded text-xs"
        />
      </div>

      <div className="w-full mb-2">
        <label className="block text-xs font-medium text-gray-600" htmlFor="Course_description">
          Course Description
        </label>
        <textarea
          id="Course_description"
          name="Course_description"
          value={formData.Course_description}
          onChange={handleChange}
          className="w-full p-1 border rounded h-20 text-xs" // Adjust the height as needed
        />
      </div>

      <div className="w-full mb-2">
        <label className="block mb-1 text-xs font-bold text-gray-600 text-center" htmlFor="image">
          Image
        </label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-1 border rounded-md text-xs"
        />
      </div>

      <div className="col-span-2 flex justify-center">
        <button
          type="submit"
          className="bg-black text-white hover:bg-gray-800 p-1 rounded-md mt-2 cursor-pointer block w-30 text-md"
        >
          Update Course
        </button>
      </div>
    </form>
  );
};

export default UpdatePlan;
