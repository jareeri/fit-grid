// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const JoinTeam = () => {
//   const [users, setUsers] = useState([]);
//   const [newUser, setNewUser] = useState({ username: '', email: '', phone: '', city: '', area: '' });

//   useEffect(() => {
//     // Fetch user data from your API using Axios
//     axios.get('http://localhost:3000/Join')
//       .then(response => {
//         // Update the state with the fetched data
//         setUsers(response.data);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, []); // Empty dependency array ensures the effect runs only once on component mount

//   const handleSave = (userData) => {
//     // Send a request to update the user data on the server
//     axios.put(`http://localhost:3000/Join/${userData.id}`, userData)
//       .then(response => {
//         // Handle success, e.g., show a success message
//         console.log('User data updated successfully:', response.data);

//         // Optionally, you can update the local state with the new data
//         setUsers(prevUsers => prevUsers.map(user =>
//           user.id === userData.id ? { ...user, ...userData } : user
//         ));
//       })
//       .catch(error => {
//         // Handle error, e.g., show an error message
//         console.error('Error updating user data:', error);
//       });
//   };

//   const handleDelete = (userId) => {
//     // Optimistically remove the user from the local state
//     setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));

//     // Send a request to delete the user from the server
//     axios.delete(`http://localhost:3000/Join/${userId}`)
//       .then(response => {
//         // Handle success, e.g., show a success message
//         console.log('User deleted successfully:', response.data);
//       })
//       .catch(error => {
//         // Handle error, e.g., show an error message
//         console.error('Error deleting user:', error);

//         // Roll back the state if the request fails
//         axios.get('http://localhost:3000/Join')
//           .then(response => {
//             // Update the state with the fetched data
//             setUsers(response.data);
//           })
//           .catch(error => {
//             console.error('Error fetching data:', error);
//           });
//       });
//   };

//   const handleInputChange = (userId, field, value) => {
//     // Update the local state with the changed input value
//     setUsers(prevUsers =>
//       prevUsers.map(user =>
//         user.id === userId ? { ...user, [field]: value } : user
//       )
//     );
//   };

//   const handleAdd = () => {
//     // Send a request to add the new user to the server
//     axios.post('http://localhost:3000/Join', newUser)
//       .then(response => {
//         // Handle success, e.g., show a success message
//         console.log('New user added successfully:', response.data);

//         // Update the local state with the new data
//         setUsers(prevUsers => [...prevUsers, response.data]);

//         // Clear the form fields after successful submission
//         setNewUser({ username: '', email: '', phone: '', city: '', area: '' });
//       })
//       .catch(error => {
//         // Handle error, e.g., show an error message
//         console.error('Error adding new user:', error);
//       });
//   };

//   return (
//     <div className="p-4 flex justify-center mt-8 ml-36">
//     <table className="w-full sm:w-11/12 md:w-5/6 lg:w-4/5 xl:w-4/5 bg-white border border-gray-300">
//         <thead className="bg-red-700 text-white">
//           <tr>
//             <th className="py-2 px-4">Username</th>
//             <th className="py-2 px-4">Email</th>
//             <th className="py-2 px-4">Phone</th>
//             <th className="py-2 px-4">City</th>
//             <th className="py-2 px-4">Area</th>
//             <th className="py-2 px-4">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user, index) => (
//             <tr
//               key={index}
//               className={`border-b hover:bg-gray-100 ${index % 2 === 0 ? 'bg-white' : ''}`}
//             >
//               <td className="py-2 px-4">
//                 <input
//                   type="text"
//                   value={user.username}
//                   className="w-full bg-transparent"
//                   onChange={(e) => handleInputChange(user.id, 'username', e.target.value)}
//                 />
//               </td>
//               <td className="py-2 px-4">
//                 <input
//                   type="text"
//                   value={user.email}
//                   className="w-full bg-transparent"
//                   onChange={(e) => handleInputChange(user.id, 'email', e.target.value)}
//                 />
//               </td>
//               <td className="py-2 px-4">
//                 <input
//                   type="text"
//                   value={user.phone}
//                   className="w-full bg-transparent"
//                   onChange={(e) => handleInputChange(user.id, 'phone', e.target.value)}
//                 />
//               </td>
//               <td className="py-2 px-4">
//                 <input
//                   type="text"
//                   value={user.city}
//                   className="w-full bg-transparent"
//                   onChange={(e) => handleInputChange(user.id, 'city', e.target.value)}
//                 />
//               </td>
//               <td className="py-2 px-4">
//                 <textarea
//                   value={user.area}
//                   className="w-full bg-transparent"
//                   onChange={(e) => handleInputChange(user.id, 'area', e.target.value)}
//                 />
//               </td>
//               <td className="py-2 px-4 flex justify-end space-x-2">
//                 <button
//                   type="button"
//                   className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
//                   onClick={() => handleSave(user)}
//                 >
//                   Save
//                 </button>
//                 <button
//                   type="button"
//                   className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
//                   onClick={() => handleDelete(user.id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//           <tr className="border-b hover:bg-gray-100">
//             <td className="py-2 px-4">
//               <input
//                 type="text"
//                 value={newUser.username}
//                 className="w-full bg-transparent"
//                 placeholder="New Username"
//                 onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
//               />
//             </td>
//             <td className="py-2 px-4">
//               <input
//                 type="text"
//                 value={newUser.email}
//                 className="w-full bg-transparent"
//                 placeholder="New Email"
//                 onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
//               />
//             </td>
//             <td className="py-2 px-4">
//               <input
//                 type="text"
//                 value={newUser.phone}
//                 className="w-full bg-transparent"
//                 placeholder="New Phone"
//                 onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
//               />
//             </td>
//             <td className="py-2 px-4">
//               <input
//                 type="text"
//                 value={newUser.city}
//                 className="w-full bg-transparent"
//                 placeholder="New City"
//                 onChange={(e) => setNewUser({ ...newUser, city: e.target.value })}
//               />
//             </td>
//             <td className="py-2 px-4">
//               <textarea
//                 value={newUser.area}
//                 className="w-full bg-transparent"
//                 placeholder="New Area"
//                 onChange={(e) => setNewUser({ ...newUser, area: e.target.value })}
//               />
//             </td>
//             <td className="py-2 px-4 flex justify-end">
//               <button
//                 type="button"
//                 className="text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
//                 onClick={handleAdd}
//               >
//                 Add
//               </button>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default JoinTeam;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JoinTeam = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '', phone: '', city: '', area: '' });

  useEffect(() => {
    axios.get('http://localhost:8080/join-requests')
      .then(response => {
        setUsers(response.data.joinRequests);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDelete = (userId) => {
    // Mark the user as deleted by updating the 'deleted' flag
    setUsers(prevUsers => prevUsers.map(user =>
      user.id === userId ? { ...user, deleted: true } : user
    ));

    // Send a request to update the 'deleted' flag on the server
    axios.patch(`http://localhost:3000/Join/${userId}`, { deleted: true })
      .then(response => {
        console.log('User marked as deleted successfully:', response.data);
      })
      .catch(error => {
        console.error('Error marking user as deleted:', error);

        // Roll back the state if the request fails
        axios.get('http://localhost:3000/Join')
          .then(response => {
            setUsers(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      });
  };

  return (
    <div className="p-4 flex justify-center mt-8 ml-36">
      <table className="w-full sm:w-11/12 md:w-5/6 lg:w-4/5 xl:w-4/5 bg-white border border-gray-300">
        <thead className="bg-red-700 text-white">
          <tr>
            <th className="py-2 px-4">Username</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Phone</th>
            <th className="py-2 px-4">City</th>
            <th className="py-2 px-4">Area</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={index}
              className={`border-b hover:bg-gray-100 ${index % 2 === 0 ? 'bg-white' : ''}`}
            >
              <td className="py-2 px-4">
                <input
                  type="text"
                  value={user.username}
                  className="w-full bg-transparent"
                  readOnly
                />
              </td>
              <td className="py-2 px-4">
                <input
                  type="text"
                  value={user.email}
                  className="w-full bg-transparent"
                  readOnly
                />
              </td>
              <td className="py-2 px-4">
                <input
                  type="text"
                  value={user.phone}
                  className="w-full bg-transparent"
                  readOnly
                />
              </td>
              <td className="py-2 px-4">
                <input
                  type="text"
                  value={user.city}
                  className="w-full bg-transparent"
                  readOnly
                />
              </td>
              <td className="py-2 px-4">
                <textarea
                  value={user.area}
                  className="w-full bg-transparent"
                  readOnly
                />
              </td>
              <td className="py-2 px-4 flex justify-end space-x-2">
                <button
                  type="button"
                  className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JoinTeam;
