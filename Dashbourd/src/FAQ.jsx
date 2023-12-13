import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FAQ = () => {
  const [faqs, setFAQs] = useState([]);
  const [newFAQ, setNewFAQ] = useState({ question: '', answer: '' });

  useEffect(() => {
    // Fetch FAQ data from your API using Axios
    axios.get('http://localhost:3000/faqData')
      .then(response => {
        // Update the state with the fetched data
        setFAQs(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  const handleSave = (faqData) => {
    // Send a request to update the FAQ data on the server
    axios.put(`http://localhost:3000/faqData/${faqData.id}`, faqData)
      .then(response => {
        // Handle success, e.g., show a success message
        console.log('FAQ data updated successfully:', response.data);

        // Optionally, you can update the local state with the new data
        setFAQs(prevFAQs => prevFAQs.map(faq =>
          faq.id === faqData.id ? { ...faq, ...faqData } : faq
        ));
      })
      .catch(error => {
        // Handle error, e.g., show an error message
        console.error('Error updating FAQ data:', error);
      });
  };

  const handleDelete = (faqId) => {
    // Optimistically remove the FAQ from the local state
    setFAQs(prevFAQs => prevFAQs.filter(faq => faq.id !== faqId));

    // Send a request to delete the FAQ from the server
    axios.delete(`http://localhost:3000/faqData/${faqId}`)
      .then(response => {
        // Handle success, e.g., show a success message
        console.log('FAQ deleted successfully:', response.data);
      })
      .catch(error => {
        // Handle error, e.g., show an error message
        console.error('Error deleting FAQ:', error);

        // Roll back the state if the request fails
        axios.get('http://localhost:3000/faqData')
          .then(response => {
            // Update the state with the fetched data
            setFAQs(response.data);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      });
  };

  const handleInputChange = (faqId, field, value) => {
    // Update the local state with the changed input value
    setFAQs(prevFAQs =>
      prevFAQs.map(faq =>
        faq.id === faqId ? { ...faq, [field]: value } : faq
      )
    );
  };

  const handleAdd = () => {
    // Send a request to add the new FAQ to the server
    axios.post('http://localhost:3000/faqData', newFAQ)
      .then(response => {
        // Handle success, e.g., show a success message
        console.log('New FAQ added successfully:', response.data);

        // Update the local state with the new data
        setFAQs(prevFAQs => [...prevFAQs, response.data]);

        // Clear the form fields after successful submission
        setNewFAQ({ question: '', answer: '' });
      })
      .catch(error => {
        // Handle error, e.g., show an error message
        console.error('Error adding new FAQ:', error);
      });
  };

  return (
    <div className="text-gray-900 bg-white w-full md:w-11/12 lg:w-3/4 xl:w-2/3 flex justify-end mt-44 ml-40">
      <div className="p-4 flex justify-center">
        {/* <h1 className="text-3xl font-bold mb-4">FAQ Management</h1> */}
      </div>
      <div className="px-3 py-4 flex justify-end">
        <table className="w-full text-md bg-white shadow-md rounded mb-4">
          <thead className="bg-[#9DB2BF] text-white">
            <tr>
              <th className="py-2 px-4">Question</th>
              <th className="py-2 px-4">Answer</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {faqs.map((faq, index) => (
              <tr
                key={index}
                className={`border-b hover:bg-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}
              >
                <td className="py-2 px-4">
                  <input
                    type="text"
                    value={faq.question}
                    className="w-full bg-transparent"
                    onChange={(e) => handleInputChange(faq.id, 'question', e.target.value)}
                  />
                </td>
                <td className="py-2 px-4">
                  <input
                    type="text"
                    value={faq.answer}
                    className="w-full bg-transparent"
                    onChange={(e) => handleInputChange(faq.id, 'answer', e.target.value)}
                  />
                </td>
                <td className="py-2 px-4 flex justify-end space-x-2">
                  <button
                    type="button"
                    className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleSave(faq)}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleDelete(faq.id)}
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
                  value={newFAQ.question}
                  className="w-full bg-transparent"
                  placeholder="New Question"
                  onChange={(e) => setNewFAQ({ ...newFAQ, question: e.target.value })}
                />
              </td>
              <td className="py-2 px-4">
                <input
                  type="text"
                  value={newFAQ.answer}
                  className="w-full bg-transparent"
                  placeholder="New Answer"
                  onChange={(e) => setNewFAQ({ ...newFAQ, answer: e.target.value })}
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

export default FAQ;
