import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WorkoutPage = () => {
  const [exercises, setExercises] = useState([]);
  const [newExercise, setNewExercise] = useState({
    title: '',
    content: '',
    image: null,
  });

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get('http://localhost:8080/getAllExerciseImages');
        setExercises(response.data);
      } catch (error) {
        console.error('Error fetching exercises: ', error);
      }
    };

    fetchExercises();
  }, []);

  const handleSave = (exerciseData) => {
    const formData = new FormData();
    formData.append('title', exerciseData.title);
    formData.append('content', exerciseData.content);
  
    // Check if exerciseData.image is a File
    if (exerciseData.image instanceof File) {
      formData.append('image', exerciseData.image);
    }
  
    axios
      .put(`http://localhost:8080/updateExerciseImage/${exerciseData.id}`, formData)
      .then((response) => {
        console.log('Exercise data updated successfully:', response.data);
  
        // Update the state with the modified exercise data
        setExercises((prevExercises) =>
          prevExercises.map((exercise) =>
            exercise.id === exerciseData.id ? { ...exercise, ...exerciseData } : exercise
          )
        );
      })
      .catch((error) => {
        console.error('Error updating exercise data:', error);
      });
  };
  
  

  const handleDelete = (id) => {
    setExercises(prevExercises => prevExercises.filter(exercise => exercise.id !== id));
    axios.put(`http://localhost:8080/softDeleteExerciseImage/${id}`)
      .then(response => {
        console.log('Exercise deleted successfully:', response.data);
      })
      .catch(error => {
        console.error('Error deleting exercise:', error);

        axios.get('http://localhost:8080/getAllExerciseImages')
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

  const handleFileChange = (e) => {
    setNewExercise({ ...newExercise, image: e.target.files[0] });
  };

  const handleAdd = () => {
    const formData = new FormData();
    formData.append('title', newExercise.title);
    formData.append('content', newExercise.content);
    formData.append('image', newExercise.image);

    axios.post('http://localhost:8080/createExerciseImage', formData)
      .then(response => {
        console.log('New exercise added successfully:', response.data.message);
        setExercises(prevExercises => [...prevExercises, response.data.exerciseImage]);
        setNewExercise({ title: '', content: '', image: null });
      })
      .catch(error => {
        console.error('Error adding new exercise:', error);
      });
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex justify-center ml-20 items-center">
    <table className="w-9/12 h-5/6 bg-[#f5f5f5] my-6 md:ml-24 px-10 py-8 rounded-lg shadow-md">
      <thead className="bg-red-700 text-white "> {/* Use red-700 for the header background */}
          <tr>
            <th className="py-2 px-4">Title</th>
            <th className="py-2 px-4">Description</th>
            <th className="py-2 px-4">Image</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise, index) => (
            <tr
              key={index}
              className={`border-b hover:bg-gray-200 ${index % 2 === 0 ? 'bg-white' : ''}`}
            >
              <td className="py-2 px-4 text">
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
                <img src={exercise.gif_url} alt={exercise.title} className="max-h-20" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
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
                type="file"
                accept="image/*"
                onChange={handleFileChange}
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
  );
};

export default WorkoutPage;