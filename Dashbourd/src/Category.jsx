import React, { useEffect, useState } from "react";
import axios from "axios";

const Category = () => {
  const [submissions, setSubmissions] = useState([]);
  const [newSubmission, setNewSubmission] = useState({
    image: null,
    category_name: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/categories")
      .then((response) => {
        setSubmissions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSave = (submissionData) => {
    const formData = new FormData();

    // Check if a new image is available in the state
    if (newSubmission.image) {
      formData.append("image", newSubmission.image);
    }

    formData.append("category_name", submissionData.category_name);

    axios
      .put(
        `http://localhost:8080/categories/${submissionData.category_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log("Submission data updated successfully:", response.data);
        setSubmissions((prevSubmissions) =>
          prevSubmissions.map((submission) =>
            submission.category_id === submissionData.category_id
              ? { ...submission, ...response.data }
              : submission
          )
        );
      })
      .catch((error) => {
        console.error("Error updating submission data:", error);
      });
  };

  const handleDelete = (submissionId) => {
    setSubmissions((prevSubmissions) =>
      prevSubmissions.filter(
        (submission) => submission.category_id !== submissionId
      )
    );
    console.log(submissions);
    axios
      .delete(`http://localhost:8080/categories/${submissionId}`)
      .then((response) => {
        console.log("Submission deleted successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error deleting submission:", error);
        axios
          .get("http://localhost:8080/categories")
          .then((response) => {
            setSubmissions(response.data);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      });
  };

  const handleInputChange = (submissionId, field, value) => {
    setSubmissions((prevSubmissions) =>
      prevSubmissions.map((submission) =>
        submission.id === submissionId
          ? { ...submission, [field]: value }
          : submission
      )
    );
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log("Selected File:", selectedFile);

    setNewSubmission((prevSubmission) => ({
      ...prevSubmission,
      image: selectedFile,
    }));
  };

  const handleAdd = () => {
    const formData = new FormData();
    formData.append("image", newSubmission.image);
    formData.append("category_name", newSubmission.category_name);

    axios
      .post("http://localhost:8080/categories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("New category added successfully:", response.data);
        setSubmissions((prevSubmissions) => [
          ...prevSubmissions,
          response.data,
        ]);
        setNewSubmission({ image: null, category_name: "" });
      })
      .catch((error) => {
        console.error("Error adding new category:", error);
      });
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex justify-center items-center">
      <div className="overflow-auto rounded-lg shadow w-full sm:max-w-3xl my-12 mx-4 sm:mx-8">
        <table className="w-full bg-[#f5f5f5] table-auto">
        <thead className="bg-red-700 text-white justify-center">
          {" "}
          {/* Use red-700 for the header background */}
          <tr>
            <th className="py-2 px-4 justify-start">Image</th>
            <th className="py-2 px-4 justify-start">Category</th>
            <th className="py-2 px-4 justify-start">Actions</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission, index) => (
            <tr
              key={index}
              className={`border-b hover:bg-gray-100 justify-center ${
                index % 2 === 0 ? "bg-white" : ""
              }`}
            >
              <td className="py-2 px-4">
                <img
                  src={submission.category_image_url}
                  alt="Blog Image"
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, submission.id)}
                />
              </td>
              <td className="py-2 px-4 justify-center">
                <input
                  type="text"
                  value={submission.category_name}
                  className="w-full bg-transparent justify-center"
                  onChange={(e) =>
                    handleInputChange(submission.id, "category", e.target.value)
                  }
                />
              </td>
              <td className="py-2 px-4 flex justify-end space-x-2 justify-center">
                <button
                  type="button"
                  className="text-sm bg-blue-500 justify-center hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => handleSave(submission)}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="text-sm bg-red-500 justify-center hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => handleDelete(submission.category_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          <tr className="border-b hover:bg-gray-100 justify-center">
            <td className="py-2 px-4">
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setNewSubmission({
                    ...newSubmission,
                    image: e.target.files[0],
                  })
                }
              />
            </td>
            <td className="py-2 px-4 justify-center">
              <input
                type="text"
                value={newSubmission.category}
                className="w-full bg-transparent justify-center"
                placeholder="New Category"
                onChange={(e) =>
                  setNewSubmission({
                    ...newSubmission,
                    category_name: e.target.value,
                  })
                }
              />
            </td>
            <td className="py-2 px-4 flex justify-end justify-center">
              <button
                type="button"
                className="text-sm bg-green-500 justify-center hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
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

export default Category;
