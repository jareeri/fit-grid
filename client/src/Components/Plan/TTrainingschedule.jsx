import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';

const Trainingschedule = () => {
  const [workoutData, setWorkoutData] = useState([]);
  const [newExercise, setNewExercise] = useState({
    name: '',
    repetitions: '',
    rest: '',
  });
  const { courseId } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8080/workouts/forTrainerAndUser/${courseId}`)
      .then(response => {
        setWorkoutData(response.data);
      })
      .catch(error => {
        console.error('Error fetching workout data:', error);
      });
  }, []);

  const handleSave = (exerciseData) => {
    axios.put(`http://localhost:8080/workouts/${exerciseData.id}/${courseId}`, exerciseData)
      .then(response => {
        // console.log('Exercise data updated successfully:', response.data);
        setWorkoutData(prevWorkoutData =>
          prevWorkoutData.map(exercise =>
            exercise.id === exerciseData.id ? { ...exercise, ...exerciseData } : exercise
          )
        );
      })
      .catch(error => {
        console.error('Error updating exercise data:', error);
      });
  };

  const handleDelete = (exerciseId) => {
    // console.log("abc",exerciseId);
    setWorkoutData(prevWorkoutData =>
      prevWorkoutData.filter(exercise => exercise.id !== exerciseId)
    );

    axios.delete(`http://localhost:8080/workouts/${exerciseId}`)
      .then(response => {
        console.log('Exercise deleted successfully:', response.data);
      })
      .catch(error => {
        console.error('Error deleting exercise:', error);
      });
  };

  const handleInputChange = (exerciseId, field, value) => {
    setWorkoutData(prevWorkoutData =>
      prevWorkoutData.map(exercise =>
        exercise.id === exerciseId ? { ...exercise, [field]: value } : exercise
      )
    );
  };

  const handleAddExercise = (user_id) => {
    axios.post(`http://localhost:8080/workouts/${courseId}`, newExercise)
      .then(response => {
        console.log('Exercise added successfully:', response.data);
        setWorkoutData(prevWorkoutData => [...prevWorkoutData, response.data]);
        setNewExercise({
          name: '',
          repetitions: '',
          rest: '',
        });
      })
      .catch(error => {
        console.error('Error adding exercise:', error);
      });
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg mx-auto my-8 max-w-screen-lg  ">
      <div className="p-6 ">
      <h2 className="text-3xl font-semibold mb-4 text-red-700">Workout Routine</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Exercise Name</th>
              <th className="py-2">Repetitions</th>
              <th className="py-2">Rest</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {workoutData.map((exercise, index) => (
              <tr
                key={index}
                className={` ${index % 2 === 0 ? '' : ''}`}
              >
                <td className="p-3 ">
                  <input
                    type="text"
                    value={exercise.name}
                    className="bg-transparent"
                    onChange={(e) => handleInputChange(exercise.id, 'name', e.target.value)}
                  />
                </td>
                <td className="p-3 ">
                  <input
                    type="text"
                    value={exercise.repetitions}
                    className="bg-transparent"
                    onChange={(e) => handleInputChange(exercise.id, 'repetitions', e.target.value)}
                  />
                </td>
                <td className="p-3 ">
                  <input
                    type="text"
                    value={exercise.rest}
                    className="bg-transparent"
                    onChange={(e) => handleInputChange(exercise.id, 'rest', e.target.value)}
                  />
                </td>
                <td className="">
                  <button
                    type="button"
                    className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
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
            <tr>
              <td className="p-3  ">
                <input
                  type="text"
                  placeholder='Exercise Name'
                  value={newExercise.name}
                  onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
                />
              </td>
              <td className="p-3 ">
                <input
                  type="text"
                  placeholder='Repetitions'
                  value={newExercise.repetitions}
                  onChange={(e) => setNewExercise({ ...newExercise, repetitions: e.target.value })}
                />
              </td>
              <td className="p-3 ">
                <input
                  type="text"
                  placeholder='Rest'
                  value={newExercise.rest}
                  onChange={(e) => setNewExercise({ ...newExercise, rest: e.target.value })}
                />
              </td>
              <td className=" ">
                <button
                  type="button"
                  className="text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleAddExercise}
                >
                  Add Exercise
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Trainingschedule;
