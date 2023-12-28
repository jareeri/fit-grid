import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JoinTeam = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', email: '', why_join: '', experience: '', certificate: '' });

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
    axios.delete(`http://localhost:8080/join-requests/${userId}`, { deleted: true })
      .then(response => {
        console.log('User marked as deleted successfully:', response.data);
      })
      .catch(error => {
        console.error('Error marking user as deleted:', error);

        // Roll back the state if the request fails
        axios.get('http://localhost:8080/join-requests')
          .then(response => {
            setUsers(response.data.joinRequests);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      });
  };

  const handleUpgradeToTrainer = (user_id, userId) => {
    // Send a request to upgrade the user to a trainer on the server
    axios.post('http://localhost:8080/upgradeusertotrainer', { user_id })
      .then(response => {
        console.log('User upgraded to trainer successfully:', response.data);
        // You can update the state or perform additional actions if needed
        handleDelete(userId);
      })
      .catch(error => {
        console.error('Error upgrading user to trainer:', error);
      });
  };

  return (
    <div className="p-4 flex justify-center mt-8 ml-36">
      <table className="w-full sm:w-11/12 md:w-5/6 lg:w-4/5 xl:w-4/5 bg-white border border-gray-300">
        <thead className="bg-red-700 text-white">
          <tr>
            <th className="py-2 px-4">Username</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Why do you want to join</th>
            <th className="py-2 px-4">experience</th>
            <th className="py-2 px-4">certificate</th>
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
              <td className="py-2 px-4 ">
                <input
                  type="text"
                  value={user.why_join}
                  className="w-full bg-transparent"
                  readOnly
                />
              </td>
              <td className="py-2 px-4">
                <input
                  type="text"
                  value={user.experience}
                  className="w-full bg-transparent"
                  readOnly
                />
              </td>
              <td className="py-2 px-4">
                <textarea
                  value={user.certificate}
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
                <button
                  type="button"
                  className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => handleUpgradeToTrainer(user.user_id, user.id)}
                >
                  Upgrade to Trainer
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



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const JoinTeam = () => {
//   const [users, setUsers] = useState([]);
//   const [newUser, setNewUser] = useState({ username: '', email: '', why_join: '', experience: '', certificate: '' });

//   useEffect(() => {
//     axios.get('http://localhost:8080/join-requests')
//       .then(response => {
//         setUsers(response.data.joinRequests);
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   const handleDelete = (userId) => {
//     // Mark the user as deleted by updating the 'deleted' flag
//     setUsers(prevUsers => prevUsers.map(user =>
//       user.id === userId ? { ...user, deleted: true } : user
//     ));

//     // Send a request to update the 'deleted' flag on the server
//     axios.patch(`http://localhost:3000/Join/${userId}`, { deleted: true })
//       .then(response => {
//         console.log('User marked as deleted successfully:', response.data);
//       })
//       .catch(error => {
//         console.error('Error marking user as deleted:', error);

//         // Roll back the state if the request fails
//         axios.get('http://localhost:3000/Join')
//           .then(response => {
//             setUsers(response.data);
//           })
//           .catch(error => {
//             console.error('Error fetching data:', error);
//           });
//       });
//   };

//   return (
//     <div className="p-4 flex justify-center mt-8 ml-36">
//       <table className="w-full sm:w-11/12 md:w-5/6 lg:w-4/5 xl:w-4/5 bg-white border border-gray-300">
//         <thead className="bg-red-700 text-white">
//           <tr>
//             <th className="py-2 px-4">Username</th>
//             <th className="py-2 px-4">Email</th>
//             <th className="py-2 px-4">Why do you want to join</th>
//             <th className="py-2 px-4">experience</th>
//             <th className="py-2 px-4">certificate</th>
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
//                   readOnly
//                 />
//               </td>
//               <td className="py-2 px-4">
//                 <input
//                   type="text"
//                   value={user.email}
//                   className="w-full bg-transparent"
//                   readOnly
//                 />
//               </td>
//               <td className="py-2 px-4 ">
//                 <input
//                   type="text"
//                   value={user.why_join}
//                   className="w-full bg-transparent"
//                   readOnly
//                 />
//               </td>
//               <td className="py-2 px-4">
//                 <input
//                   type="text"
//                   value={user.experience}
//                   className="w-full bg-transparent"
//                   readOnly
//                 />
//               </td>
//               <td className="py-2 px-4">
//                 <textarea
//                   value={user.certificate}
//                   className="w-full bg-transparent"
//                   readOnly
//                 />
//               </td>
//               <td className="py-2 px-4 flex justify-end space-x-2">
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
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default JoinTeam;
