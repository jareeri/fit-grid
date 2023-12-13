import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'user',
  });

  useEffect(() => {
    // Fetch data from your API using Axios
    axios.get('http://localhost:3000/Users')
      .then(response => {
        // Update the state with the fetched data
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  const handleSave = (userData) => {
    // Send a request to update the user data on the server
    axios.put(`http://localhost:3000/Users/${userData.id}`, userData)
      .then(response => {
        // Handle success, e.g., show a success message
        console.log('User data updated successfully:', response.data);

        // Optionally, you can update the local state with the new data
        setUsers(prevUsers => prevUsers.map(user =>
          user.id === userData.id ? { ...user, ...userData } : user
        ));
      })
      .catch(error => {
        // Handle error, e.g., show an error message
        console.error('Error updating user data:', error);
      });
  };

  const handleDelete = (userId) => {
    // Optimistically remove the user from the local state
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));

    // Send a request to delete the user from the server
    axios.delete(`http://localhost:3000/Users/${userId}`)
      .then(response => {
        // Handle success, e.g., show a success message
        console.log('User deleted successfully:', response.data);
      })
      .catch(error => {
        // Handle error, e.g., show an error message
        console.error('Error deleting user:', error);

        // Roll back the state if the request fails
        axios.get('http://localhost:3000/Users')
          .then(response => {
            // Update the state with the fetched data
            setUsers(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      });
  };

  const handleInputChange = (userId, field, value) => {
    // Update the local state with the changed input value
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, [field]: value } : user
      )
    );
  };

  const handleAdd = () => {
    // Send a request to add the new user to the server
    axios.post('http://localhost:3000/Users', newUser)
      .then(response => {
        // Handle success, e.g., show a success message
        console.log('New user added successfully:', response.data);

        // Update the local state with the new data
        setUsers(prevUsers => [...prevUsers, response.data]);

        // Clear the form fields after successful submission
        setNewUser({
          name: '',
          email: '',
          role: 'user',
        });
      })
      .catch(error => {
        // Handle error, e.g., show an error message
        console.error('Error adding new user:', error);
      });
  };

  return (
    <div className="text-gray-900 bg-white w-full md:w-11/12 lg:w-3/4 xl:w-2/3 flex justify-end  ml-40">
      <div className="p-4 flex justify-center">
        {/* <h1 className="text-3xl font-bold mb-4">User Management</h1> */}
      </div>
      <div className="px-3 py-4 flex justify-end">
        <table className="w-full text-md bg-white shadow-md rounded mb-4">
          <thead className="bg-[#9DB2BF] text-white">
            <tr>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Role</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                className={`border-b hover:bg-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}
              >
                <td className="py-2 px-4">
                  <input
                    type="text"
                    value={user.name}
                    className="w-full bg-transparent"
                    onChange={(e) => handleInputChange(user.id, 'name', e.target.value)}
                  />
                </td>
                <td className="py-2 px-4">
                  <input
                    type="text"
                    value={user.email}
                    className="w-full bg-transparent"
                    onChange={(e) => handleInputChange(user.id, 'email', e.target.value)}
                  />
                </td>
                <td className="py-2 px-4">
                  <select
                    value={user.role}
                    className="bg-transparent"
                    onChange={(e) => handleInputChange(user.id, 'role', e.target.value)}
                  >
                    <option value="user">user</option>
                    <option value="trainer">trainer</option> {/* Changed from "admin" to "trainer" */}
                  </select>
                </td>
                <td className="py-2 px-4 flex justify-end space-x-2">
                  <button
                    type="button"
                    className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleSave(user)}
                  >
                    Save
                  </button>
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
            <tr>
              <td className="py-2 px-4">
                <input
                  type="text"
                  value={newUser.name}
                  className="w-full bg-transparent"
                  placeholder="New Name"
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
              </td>
              <td className="py-2 px-4">
                <input
                  type="text"
                  value={newUser.email}
                  className="w-full bg-transparent"
                  placeholder="New Email"
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
              </td>
              <td className="py-2 px-4">
                <select
                  value={newUser.role}
                  className="bg-transparent"
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                >
                  <option value="user">user</option>
                  <option value="trainer">trainer</option> {/* Changed from "admin" to "trainer" */}
                </select>
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

export default Users;
