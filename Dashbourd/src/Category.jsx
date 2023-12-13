import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Category = () => {
  const [submissions, setSubmissions] = useState([]);
  const [newSubmission, setNewSubmission] = useState({ image: '', category: '' });

  useEffect(() => {
    // Fetch data from your API using Axios
    axios.get('http://localhost:3000/category')
      .then(response => {
        // Update the state with the fetched data
        setSubmissions(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  const handleSave = (submissionData) => {
    // Send a request to update the submission data on the server
    axios.put(`http://localhost:3000/category/${submissionData.id}`, submissionData)
      .then(response => {
        // Handle success, e.g., show a success message
        console.log('Submission data updated successfully:', response.data);

        // Optionally, you can update the local state with the new data
        setSubmissions(prevSubmissions => prevSubmissions.map(submission =>
          submission.id === submissionData.id ? { ...submission, ...submissionData } : submission
        ));
      })
      .catch(error => {
        // Handle error, e.g., show an error message
        console.error('Error updating submission data:', error);
      });
  };

  const handleDelete = (submissionId) => {
    // Optimistically remove the submission from the local state
    setSubmissions(prevSubmissions => prevSubmissions.filter(submission => submission.id !== submissionId));

    // Send a request to delete the submission from the server
    axios.delete(`http://localhost:3000/category/${submissionId}`)
      .then(response => {
        // Handle success, e.g., show a success message
        console.log('Submission deleted successfully:', response.data);
      })
      .catch(error => {
        // Handle error, e.g., show an error message
        console.error('Error deleting submission:', error);

        // Roll back the state if the request fails
        axios.get('http://localhost:3000/category')
          .then(response => {
            // Update the state with the fetched data
            setSubmissions(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      });
  };

  const handleInputChange = (submissionId, field, value) => {
    // Update the local state with the changed input value
    setSubmissions(prevSubmissions =>
      prevSubmissions.map(submission =>
        submission.id === submissionId ? { ...submission, [field]: value } : submission
      )
    );
  };

  const handleAdd = () => {
    // Send a request to add the new submission to the server
    axios.post('http://localhost:3000/category', newSubmission)
      .then(response => {
        // Handle success, e.g., show a success message
        console.log('New category added successfully:', response.data);

        // Update the local state with the new data
        setSubmissions(prevSubmissions => [...prevSubmissions, response.data]);

        // Clear the form fields after successful submission
        setNewSubmission({ image: '', category: '' });
      })
      .catch(error => {
        // Handle error, e.g., show an error message
        console.error('Error adding new category:', error);
      });
  };

  return (
    <div className="text-gray-900 bg-white w-full md:w-11/12 lg:w-3/4 xl:w-2/3 flex justify-end mt-44 ml-40">
      <div className="p-4 flex justify-center">
        {/* <h1 className="text-3xl font-bold mb-4">Category Management</h1> */}
      </div>
      <div className="px-3 py-4 flex justify-end">
        <table className="w-full text-md bg-white shadow-md rounded mb-4">
          <thead className="bg-[#9DB2BF] text-white">
            <tr>
              <th className="py-2 px-4">Image</th>
              <th className="py-2 px-4">Category</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission, index) => (
              <tr
                key={index}
                className={`border-b hover:bg-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}
              >
                <td className="py-2 px-4">
                  <input
                    type="text"
                    value={submission.image}
                    className="w-full bg-transparent"
                    onChange={(e) => handleInputChange(submission.id, 'image', e.target.value)}
                  />
                </td>
                <td className="py-2 px-4">
                  <input
                    type="text"
                    value={submission.category}
                    className="w-full bg-transparent"
                    onChange={(e) => handleInputChange(submission.id, 'category', e.target.value)}
                  />
                </td>
                <td className="py-2 px-4 flex justify-end space-x-2">
                  <button
                    type="button"
                    className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleSave(submission)}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleDelete(submission.id)}
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
                  value={newSubmission.image}
                  className="w-full bg-transparent"
                  placeholder="New Image"
                  onChange={(e) => setNewSubmission({ ...newSubmission, image: e.target.value })}
                />
              </td>
              <td className="py-2 px-4">
                <input
                  type="text"
                  value={newSubmission.category}
                  className="w-full bg-transparent"
                  placeholder="New Category"
                  onChange={(e) => setNewSubmission({ ...newSubmission, category: e.target.value })}
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

export default Category;
