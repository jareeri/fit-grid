// PlanPricing.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PlanPricing = () => {
  const [pricingItems, setPricingItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', price: 0, features: [] });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:3000/Pricing');
    console.log('Fetched data:', response.data);
    setPricingItems(response.data);
  } catch (error) {
    console.error('Error fetching data: ', error);
  }
};


const handleAdd = async () => {
  try {
    // Convert price to a number
    const newItemWithNumberPrice = { ...newItem, price: Number(newItem.price) };

    await axios.post('http://localhost:3000/Pricing', newItemWithNumberPrice);
    setNewItem({ name: '', price: 0, features: [] });
    fetchData();
  } catch (error) {
    console.error('Error adding pricing item: ', error);
  }
};


  const handleDelete = async (pricingItemId) => {
    try {
      await axios.patch(`http://localhost:3000/Pricing/${pricingItemId}`, { isDeleted: true });
      fetchData();
    } catch (error) {
      console.error('Error deleting pricing item: ', error);
    }
  };
  

  return (
    <div className="bg-gray-700 px-4 py-16 min-h-screen">
      <div
        aria-hidden="true"
        className="absolute inset-0 h-max w-full m-auto grid grid-cols-2 -space-x-52 opacity-20"
      >
        <div className="blur-[106px] h-56 bg-gradient-to-br to-purple-400 from-blue-700" />
        <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-indigo-600" />
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
        <div className="mb-10 space-y-4 px-6 md:px-0">
          <h2 className="text-center text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            Pricing
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {pricingItems.map((pricingItem) => (
            pricingItem.isdeleted !== 'true' && (
              <div
                key={pricingItem.id}
                className="flex flex-col items-center aspect-auto p-4 sm:p-8 border rounded-3xl bg-gray-800 border-gray-700 shadow-gray-600/10 shadow-none m-2 flex-1 max-w-md"
              >
                <h2 className="text-lg sm:text-xl font-medium text-white mb-2">
                  {pricingItem.name}
                </h2>
                <p className="text-lg sm:text-xl text-center mb-8 mt-4 text-gray-400">
                  <span className="text-3xl sm:text-4xl font-bold text-white">
                    ${pricingItem.price}
                  </span>{' '}
                  / Month
                </p>
                <ul className="list-none list-inside mb-6 text-center text-gray-300">
                  {pricingItem.features.map((feature, index) => (
                    <li key={index} className="font-bold text-orange-600">
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleDelete(pricingItem.id)}
                  className="lemonsqueezy-button relative flex h-9 w-full items-center justify-center px-4 before:absolute before:inset-0 before:rounded-full before:bg-white before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                >
                  <span className="relative text-sm font-semibold text-black">Delete</span>
                </button>
              </div>
            )
          ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <div className="flex flex-col items-center aspect-auto p-4 sm:p-8 border rounded-3xl bg-gray-800 border-gray-700 shadow-gray-600/10 shadow-none m-2 flex-1 max-w-md">
            <input
              type="text"
              placeholder="Item Name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="lemonsqueezy-input mb-4"
            />
            <input
              type="number"
              placeholder="Price"
              value={newItem.price}
              onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
              className="lemonsqueezy-input mb-4"
            />
            <input
              type="text"
              placeholder="Features (comma-separated)"
              value={newItem.features.join(',')}
              onChange={(e) =>
                setNewItem({ ...newItem, features: e.target.value.split(',') })
              }
              className="lemonsqueezy-input mb-4"
            />
            <button
              onClick={handleAdd}
              className="lemonsqueezy-button relative flex h-9 w-full items-center justify-center px-4 before:absolute before:inset-0 before:rounded-full before:bg-white before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
            >
              <span className="relative text-sm font-semibold text-black">Add Item</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanPricing;
