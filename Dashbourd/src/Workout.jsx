import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WorkoutPage = () => {
  const [exercises, setExercises] = useState([]);
  const [newExercise, setNewExercise] = useState({
    title: '',
    content: '',
    gif_url: '',
  });

  useEffect(() => {
    axios.get('http://localhost:3000/Exercises')
      .then(response => {
        setExercises(response.data
          );
      })
      .catch(error => {
        console.error('Error fetching workout data:', error);
      });
  }, []);

  const handleSave = (exerciseData) => {
    axios.put(`http://localhost:3000/Exercises/${exerciseData.id}`, exerciseData)
      .then(response => {
        console.log('Exercise data updated successfully:', response.data);
        setExercises(prevExercises =>
          prevExercises.map(exercise =>
            exercise.id === exerciseData.id ? { ...exercise, ...exerciseData } : exercise
          )
        );
      })
      .catch(error => {
        console.error('Error updating exercise data:', error);
      });
  };

  const handleDelete = (id) => {
    setExercises(prevExercises => prevExercises.filter(exercise => exercise.id !== id));
    axios.delete(`http://localhost:3000/Exercises/${id}`)
      .then(response => {
        console.log('Exercise deleted successfully:', response.data);
      })
      .catch(error => {
        console.error('Error deleting exercise:', error);

        axios.get('http://localhost:3000/Exercises')
          .then(response => {
            setExercises(response.data);
          })
          .catch(error => {
            console.error('Error fetching workout data:', error);
          });
      });
  };

  const handleInputChange = (exerciseId, field, value) => {
    setExercises(prevExercises =>
      prevExercises.map(exercise =>
        exercise.id === exerciseId ? { ...exercise, [field]: value } : exercise
      )
    );
  };

  const handleAdd = () => {
    axios.post('http://localhost:3000/Exercises', newExercise)
      .then(response => {
        console.log('New exercise added successfully:', response.data);
        setExercises(prevExercises => [...prevExercises, response.data]);
        setNewExercise({ title: '', content: '', gif_url: '' });
      })
      .catch(error => {
        console.error('Error adding new exercise:', error);
      });
  };

  return (
    <div className="text-gray-900 bg-white w-full md:w-11/12 lg:w-3/4 xl:w-2/3 flex justify-end mt-44 ml-40">
        <div className="p-4 flex justify-center">
        {/* <h1 className="text-3xl font-bold mb-4">Workout Management</h1> */}
      </div>
      <div className="px-4 py-2 flex justify-center">
        <table className="w-10/12 text-md bg-gray-100 shadow-md rounded mb-4">
          <thead className="bg-[#9DB2BF] text-white">
            <tr>
              <th className="py-2 px-4">Title</th>
              <th className="py-2 px-4">Description</th>
              <th className="py-2 px-4">GIF URL</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {exercises.map((exercise, index) => (
              <tr
                key={index}
                className={`border-b hover:bg-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}
              >
                <td className="py-2 px-4">
                  <input
                    type="text"
                    value={exercise.title}
                    className="w-full bg-transparent border-none"
                    onChange={(e) => handleInputChange(exercise.id, 'title', e.target.value)}
                  />
                </td>
                <td className="py-2 px-4">
                  <input
                    type="text"
                    value={exercise.content}
                    className="w-full bg-transparent border-none"
                    onChange={(e) => handleInputChange(exercise.id, 'content', e.target.value)}
                  />
                </td>
                <td className="py-2 px-4">
                  <input
                    type="text"
                    value={exercise.gif_url}
                    className="w-full bg-transparent border-none"
                    onChange={(e) => handleInputChange(exercise.id, 'gif_url', e.target.value)}
                  />
                </td>
                <td className="py-2 px-4 flex justify-end space-x-2">
                  <button
                    type="button"
                    className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleSave(exercise)}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleDelete(exercise.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            <tr className="border-b hover:bg-gray-200">
              <td className="py-2 px-4">
                <input
                  type="text"
                  value={newExercise.title}
                  className="w-full bg-transparent border-none"
                  placeholder="New Title"
                  onChange={(e) => setNewExercise({ ...newExercise, title: e.target.value })}
                />
              </td>
              <td className="py-2 px-4">
                <input
                  type="text"
                  value={newExercise.content}
                  className="w-full bg-transparent border-none"
                  placeholder="New Description"
                  onChange={(e) => setNewExercise({ ...newExercise, content: e.target.value })}
                />
              </td>
              <td className="py-2 px-4">
                <input
                  type="text"
                  value={newExercise.gif_url}
                  className="w-full bg-transparent border-none"
                  placeholder="New GIF URL"
                  onChange={(e) => setNewExercise({ ...newExercise, gif_url: e.target.value })}
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

export default WorkoutPage;
