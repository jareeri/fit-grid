import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router';


const Dietaryschedule = () => {
  const [nutritionData, setNutritionData] = useState([]);
  const [newNutritionItem, setNewNutritionItem] = useState({
    nutrient: "",
    amount: "",
    daily_value: "",
  });

  const { courseId } = useParams();
  // console.log(courseId);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/getNutritionDataForUser"
      );
      setNutritionData(response.data);
    } catch (error) {
      console.error("Error fetching nutrition data:", error);
    }
  };

  const handleSave = async (item) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/nutrition/${item.id}`,
        item
      );
      console.log("Nutrition data updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating nutrition data:", error);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      // Optimistically remove the item from the local state
      setNutritionData((prevNutritionData) =>
        prevNutritionData.filter((item) => item.id !== itemId)
      );

      // Send a request to delete the item from the server
      const response = await axios.delete(
        `http://localhost:8080/nutrition/${itemId}`
      );
      console.log("Nutrition item deleted successfully:", response.data);
    } catch (error) {
      console.error("Error deleting nutrition item:", error);

      // Roll back the state if the request fails
      fetchData();
    }
  };

  const handleInputChange = (itemId, field, value) => {
    // Update the local state with the changed input value
    setNutritionData((prevNutritionData) =>
      prevNutritionData.map((item) =>
        item.id === itemId ? { ...item, [field]: value } : item
      )
    );
  };

  // const handleAddNutritionItem = async (user_id) => {
  //   try {
  //     const response = await axios.post(`http://localhost:8080/nutrition/${user_id}`, newNutritionItem);
  //     console.log('Nutrition item added successfully:', response.data);
  //     setNutritionData((prevNutritionData) => [...prevNutritionData, response.data]);
  //     setNewNutritionItem({
  //       nutrient: '',
  //       amount: '',
  //       daily_value: '',
  //     });
  //   } catch (error) {
  //     console.error('Error adding nutrition item:', error);
  //   }
  // };

  const handleAddNutritionItem = async () => {
    // const { courseId } = useParams();
    try {
      // console.log(courseId);
      const response = await axios.post(`http://localhost:8080/nutrition/${courseId}`, newNutritionItem);
      console.log('Nutrition item added successfully:', response.data);
      setNutritionData((prevNutritionData) => [...prevNutritionData, response.data]);
      setNewNutritionItem({
        nutrient: '',
        amount: '',
        daily_value: '',
      });
    } catch (error) {
      console.error('Error adding nutrition item:', error);
    }
  };

  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg mx-auto my-8 max-w-screen-md">
      <div className="p-6">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">
          Bodybuilder's Nutrition Facts
        </h2>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Nutrient</th>
              <th className="py-2">Amount</th>
              <th className="py-2">% Daily Value</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {nutritionData.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? "" : ""}>
                <td className="py-2">
                  <input
                    type="text"
                    value={item.nutrient}
                    onChange={(e) =>
                      handleInputChange(item.id, "nutrient", e.target.value)
                    }
                  />
                </td>
                <td className="py-2">
                  <input
                    type="text"
                    value={item.amount}
                    onChange={(e) =>
                      handleInputChange(item.id, "amount", e.target.value)
                    }
                  />
                </td>
                <td className="py-2">
                  <input
                    type="text"
                    value={item.daily_value}
                    onChange={(e) =>
                      handleInputChange(item.id, "daily_value", e.target.value)
                    }
                  />
                </td>
                <td className="py-2">
                  <button
                    className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleSave(item)}
                  >
                    Save
                  </button>
                  <button
                    className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td className="py-2">
                <input
                  type="text"
                  value={newNutritionItem.nutrient}
                  onChange={(e) =>
                    setNewNutritionItem({
                      ...newNutritionItem,
                      nutrient: e.target.value,
                    })
                  }
                />
              </td>
              <td className="py-2">
                <input
                  type="text"
                  value={newNutritionItem.amount}
                  onChange={(e) =>
                    setNewNutritionItem({
                      ...newNutritionItem,
                      amount: e.target.value,
                    })
                  }
                />
              </td>
              <td className="py-2">
                <input
                  type="text"
                  value={newNutritionItem.daily_value}
                  onChange={(e) =>
                    setNewNutritionItem({
                      ...newNutritionItem,
                      daily_value: e.target.value,
                    })
                  }
                />
              </td>
              <td className="py-2">
                <button
                  className="text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleAddNutritionItem}
                >
                  Add Nutrition Item
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dietaryschedule;
