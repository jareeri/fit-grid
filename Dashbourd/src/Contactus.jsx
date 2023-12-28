// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const ContactUs = () => {
//   const [submissions, setSubmissions] = useState([]);
//   const [newSubmission, setNewSubmission] = useState({ name: '', email: '', message: '' });

//   useEffect(() => {
//     // Fetch data from your API using Axios
//     axios.get('http://localhost:3000/contactus')
//       .then(response => {
//         // Update the state with the fetched data
//         setSubmissions(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, []); // Empty dependency array ensures the effect runs only once on component mount

//   const handleSave = (submissionData) => {
//     // Send a request to update the submission data on the server
//     axios.put(`http://localhost:3000/contactus/${submissionData.id}`, submissionData)
//       .then(response => {
//         // Handle success, e.g., show a success message
//         console.log('Submission data updated successfully:', response.data);

//         // Optionally, you can update the local state with the new data
//         setSubmissions(prevSubmissions => prevSubmissions.map(submission =>
//           submission.id === submissionData.id ? { ...submission, ...submissionData } : submission
//         ));
//       })
//       .catch(error => {
//         // Handle error, e.g., show an error message
//         console.error('Error updating submission data:', error);
//       });
//   };

//   const handleDelete = (submissionId) => {
//     // Optimistically remove the submission from the local state
//     setSubmissions(prevSubmissions => prevSubmissions.filter(submission => submission.id !== submissionId));

//     // Send a request to delete the submission from the server
//     axios.delete(`http://localhost:3000/contactus/${submissionId}`)
//       .then(response => {
//         // Handle success, e.g., show a success message
//         console.log('Submission deleted successfully:', response.data);
//       })
//       .catch(error => {
//         // Handle error, e.g., show an error message
//         console.error('Error deleting submission:', error);

//         // Roll back the state if the request fails
//         axios.get('http://localhost:3000/contactus')
//           .then(response => {
//             // Update the state with the fetched data
//             setSubmissions(response.data);
//           })
//           .catch(error => {
//             console.error('Error fetching data:', error);
//           });
//       });
//   };

//   const handleInputChange = (submissionId, field, value) => {
//     // Update the local state with the changed input value
//     setSubmissions(prevSubmissions =>
//       prevSubmissions.map(submission =>
//         submission.id === submissionId ? { ...submission, [field]: value } : submission
//       )
//     );
//   };

//   const handleAdd = () => {
//     // Send a request to add the new submission to the server
//     axios.post('http://localhost:3000/contactus', newSubmission)
//       .then(response => {
//         // Handle success, e.g., show a success message
//         console.log('New submission added successfully:', response.data);

//         // Update the local state with the new data
//         setSubmissions(prevSubmissions => [...prevSubmissions, response.data]);

//         // Clear the form fields after successful submission
//         setNewSubmission({ name: '', email: '', message: '' });
//       })
//       .catch(error => {
//         // Handle error, e.g., show an error message
//         console.error('Error adding new submission:', error);
//       });
//   };

//   return (
//     <div className="p-4 flex justify-center mt-28 ml-36">
//     <table className="w-full sm:w-11/12 md:w-5/6 lg:w-4/5 xl:w-4/5 bg-white border border-gray-300">
//       <thead className="bg-red-700 text-white">
//             <tr>
//               <th className="py-2 px-4">Name</th>
//               <th className="py-2 px-4">Email</th>
//               <th className="py-2 px-4">Message</th>
//               <th className="py-2 px-4">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {submissions.map((submission, index) => (
//               <tr
//                 key={index}
//                 className={`border-b hover:bg-gray-100 ${index % 2 === 0 ? 'bg-white' : ''}`}
//               >
//                 <td className="py-2 px-4">
//                   <input
//                     type="text"
//                     value={submission.name}
//                     className="w-full bg-transparent"
//                     onChange={(e) => handleInputChange(submission.id, 'name', e.target.value)}
//                   />
//                 </td>
//                 <td className="py-2 px-4">
//                   <input
//                     type="text"
//                     value={submission.email}
//                     className="w-full bg-transparent"
//                     onChange={(e) => handleInputChange(submission.id, 'email', e.target.value)}
//                   />
//                 </td>
//                 <td className="py-2 px-4">
//                   <textarea
//                     value={submission.message}
//                     className="w-full bg-transparent"
//                     onChange={(e) => handleInputChange(submission.id, 'message', e.target.value)}
//                   />
//                 </td>
//                 <td className="py-2 px-4 flex justify-end space-x-2">
//                   <button
//                     type="button"
//                     className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
//                     onClick={() => handleSave(submission)}
//                   >
//                     Save
//                   </button>
//                   <button
//                     type="button"
//                     className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
//                     onClick={() => handleDelete(submission.id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             <tr>
//               <td className="py-2 px-4">
//                 <input
//                   type="text"
//                   value={newSubmission.name}
//                   className="w-full bg-transparent"
//                   placeholder="New Name"
//                   onChange={(e) => setNewSubmission({ ...newSubmission, name: e.target.value })}
//                 />
//               </td>
//               <td className="py-2 px-4">
//                 <input
//                   type="text"
//                   value={newSubmission.email}
//                   className="w-full bg-transparent"
//                   placeholder="New Email"
//                   onChange={(e) => setNewSubmission({ ...newSubmission, email: e.target.value })}
//                 />
//               </td>
//               <td className="py-2 px-4">
//                 <textarea
//                   value={newSubmission.message}
//                   className="w-full bg-transparent"
//                   placeholder="New Message"
//                   onChange={(e) => setNewSubmission({ ...newSubmission, message: e.target.value })}
//                 />
//               </td>
//               <td className="py-2 px-4 flex justify-end">
//                 <button
//                   type="button"
//                   className="text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
//                   onClick={handleAdd}
//                 >
//                   Add
//                 </button>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//   );
// };

// export default ContactUs;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContactUs = () => {
  const [submissions, setSubmissions] = useState([]);
  const [newSubmission, setNewSubmission] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    axios.get('http://localhost:8080/contact-messages')
      .then(response => {
        setSubmissions(response.data.contactMessages);
        console.log(response.data.contactMessages);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDelete = (submissionId) => {
    setSubmissions(prevSubmissions => prevSubmissions.filter(submission => submission.id !== submissionId));

    axios.delete(`http://localhost:8080/contact-messages/${submissionId}`)
      .then(response => {
        console.log('Submission deleted successfully:', response.data);
      })
      .catch(error => {
        console.error('Error deleting submission:', error);
      });
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex justify-center items-center">
      <div className="overflow-auto rounded-lg shadow w-full sm:max-w-3xl my-12 mx-4 sm:mx-8">
        <table className="w-full bg-[#f5f5f5] table-auto">
      <thead className="bg-red-700 text-white "> {/* Use red-700 for the header background */}
          <tr>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Message</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission, index) => (
            <tr
              key={index}
              className={`border-b hover:bg-gray-100 ${index % 2 === 0 ? 'bg-white' : ''}`}
            >
              <td className="py-2 px-4 text-center">{submission.contact_name}</td>
              <td className="py-2 px-4 text-center">{submission.contact_email}</td>
              <td className="py-2 px-4 text-center">{submission.message}</td>
              <td className="py-2 px-4 flex justify-end space-x-2">
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
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default ContactUs;
