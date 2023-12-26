import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Calculator = () => {
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmiResult, setBmiResult] = useState(null);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    AOS.init();
  }, []);

  const tableItems = [
    { name: '18-25', email: 'Normal Weight' },
    { name: '25-30', email: 'Overweight' },
    { name: '30-40', email: 'Obesity' },
    { name: '40-above', email: 'Morbid Obesity' },
  ];

  const calculateBMI = () => {
    const numericHeight = parseFloat(height);
    const numericWeight = parseFloat(weight);

    if (isNaN(numericHeight) || isNaN(numericWeight) || numericHeight <= 0 || numericWeight <= 0) {
      setError('Please enter valid positive values for height and weight.');
      return;
    }

    setError('');

    const bmi = (numericWeight / ((numericHeight / 100) ** 2)).toFixed(2);
    setBmiResult(bmi);

    const bmiStatus = getStatus(bmi);
    setStatus(bmiStatus);

    setShowResult(true);
  };

  const getStatus = (bmi) => {
    if (bmi < 18.5) return 'Underweight';
    else if (bmi >= 18.5 && bmi < 25) return 'Normal Weight';
    else if (bmi >= 25 && bmi < 30) return 'Overweight';
    else if (bmi >= 30 && bmi < 40) return 'Obesity';
    else return 'Morbid Obesity';
  };

  const resetCalculator = () => {
    setGender('');
    setHeight('');
    setWeight('');
    setBmiResult(null);
    setStatus('');
    setError('');
    setShowResult(false);
  };

  return (
    <section data-aos="fade-up" className="calculator-section bg-[#f5f5f5] py-24 mx-10 text-black">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full md:w-1/2 md:pr-8 mb-8 md:mb-0">
          <h1 className="text-2xl font-bold text-center md:text-left mb-4">BMI CALCULATOR</h1>
          <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
            <div className="mb-4 md:w-1/2">
              <label className="block text-sm font-bold mb-2" htmlFor="height">
                Height (cm)
              </label>
              <input
                className="input-field w-full px-4 py-2 border rounded-md focus:outline-none focus:border-red-500"
                id="height"
                type="number"
                placeholder="e.g., 169"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <div className="mb-4 md:w-1/2">
              <label className="block text-sm font-bold mb-2" htmlFor="weight">
                Weight (kg)
              </label>
              <input
                className="input-field w-full px-4 py-2 border rounded-md focus:outline-none focus:border-red-500"
                id="weight"
                type="number"
                placeholder="e.g., 68"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-center md:justify-start mb-6">
            <button
              className="p-3 bg-gradient-to-r rounded-xl bg-red-700 hover:bg-black transition-all duration-300 text-white mr-4"
              type="button"
              onClick={calculateBMI}
            >
              CALCULATE IT
            </button>
            <button
              className="p-3 bg-gradient-to-r rounded-xl bg-red-700 hover:bg-black transition-all duration-300 text-white"
              type="button"
              onClick={resetCalculator}
            >
              RESET IT
            </button>
          </div>
          {showResult && bmiResult !== null && (
            <div className="result-container text-center text-gray-800">
              <p className="mb-2">
                Your BMI is <span className="font-bold">{bmiResult}</span>.
              </p>
              <p>
                You are <span className="font-bold">{status}</span>.
              </p>
            </div>
          )}
        </div>
        <div className="w-full md:w-1/2 md:pl-8">
          <h3 className="text-2xl font-bold text-center md:text-left mb-4">BODY MASS INDEX</h3>
          <div className="shadow-sm border rounded-lg overflow-x-auto">
            <table className="w-full table-auto text-sm text-center bg-white">
              <thead className="bg-red-700 text-white font-medium border-b">
                <tr>
                  <th className="py-2 px-4">BMI</th>
                  <th className="py-2 px-4">CLASSIFICATION</th>
                </tr>
              </thead>
              <tbody className="text-black divide-y">
                {tableItems.map((item, idx) => (
                  <tr key={idx} className="divide-x">
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2">{item.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;


// import React, { useState, useEffect } from 'react';
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// const Calculator = () => {
//   const [height, setHeight] = useState('');
//   const [weight, setWeight] = useState('');
//   const [bmiResult, setBmiResult] = useState(null);
//   const [status, setStatus] = useState('');
//   const [error, setError] = useState('');
//   const [showResult, setShowResult] = useState(false);

//   useEffect(() => {
//     AOS.init();
//   }, []);

//   const tableItems = [
//     { name: '18-25', email: 'Normal Weight' },
//     { name: '25-30', email: 'Overweight' },
//     { name: '30-40', email: 'Obesity' },
//     { name: '40-above', email: 'Morbid Obesity' },
//   ];

//   const calculateBMI = () => {
//     const numericHeight = parseFloat(height);
//     const numericWeight = parseFloat(weight);

//     if (isNaN(numericHeight) || isNaN(numericWeight) || numericHeight <= 0 || numericWeight <= 0) {
//       setError('Please enter valid positive values for height and weight.');
//       return;
//     }

//     setError('');

//     const bmi = (numericWeight / ((numericHeight / 100) ** 2)).toFixed(2);
//     setBmiResult(bmi);

//     const bmiStatus = getStatus(bmi);
//     setStatus(bmiStatus);

//     setShowResult(true);
//   };

//   const getStatus = (bmi) => {
//     if (bmi < 18.5) return 'Underweight';
//     else if (bmi >= 18.5 && bmi < 25) return 'Normal Weight';
//     else if (bmi >= 25 && bmi < 30) return 'Overweight';
//     else if (bmi >= 30 && bmi < 40) return 'Obesity';
//     else return 'Morbid Obesity';
//   };

//   return (
//     <section data-aos="fade-up" className="calculator-section flex items-center justify-center min-h-screen bg-black">
//       <div className="container w-10/12 mx-auto p-8 bg-black shadow-lg rounded-lg flex flex-col items-center justify-center">
//         <h1 className="text-3xl font-bold mb-6 text-center text-white">BMI CALCULATOR</h1>
//         <form className="bg-white p-6 rounded-md w-10/12">
//           {error && <p className="text-red-500 mb-4">{error}</p>}
//           <div className="mb-4">
//             <label className="block text-sm font-bold mb-2" htmlFor="height">
//               Height (cm)
//             </label>
//             <input
//               className="input-field w-full bg-[#f5f5f5]"
//               id="height"
//               type="number"
//               placeholder="e.g., 169"
//               value={height}
//               onChange={(e) => setHeight(e.target.value)}
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block text-sm font-bold mb-2" htmlFor="weight">
//               Weight (kg)
//             </label>
//             <input
//               className="input-field w-full bg-[#f5f5f5]"
//               id="weight"
//               type="number"
//               placeholder="e.g., 68"
//               value={weight}
//               onChange={(e) => setWeight(e.target.value)}
//             />
//           </div>
//           <div className="flex justify-center">
//             <button
//               className="p-3 bg-gradient-to-r  rounded-xl mt-2 hover:bg-black bg-red-700 transition-all duration-300 text-white"
//               type="button"
//               onClick={calculateBMI}
//             >
//               Calculate
//             </button>
//           </div>
//           {showResult && bmiResult !== null && (
//             <div className="result-container mt-5 text-center text-gray-800">
//               <p className="mb-2">
//                 Your BMI is <span className="font-bold">{bmiResult}</span>.
//               </p>
//               <p>
//                 You are <span className="font-bold">{status}</span>.
//               </p>
//             </div>
//           )}
//         </form>
//         <div className="mt-8 w-8/12">
//           <h3 className="text-xl font-bold text-white mb-4 text-center">BODY MASS INDEX</h3>
//           <div className="shadow-sm border rounded-lg overflow-x-auto">
//             <table className="w-full table-auto text-sm text-left">
//               <thead className="bg-red-700 text-black font-medium border-b">
//                 <tr>
//                   <th className="py-2 px-4 text-center">BMI</th>
//                   <th className="py-2 px-4 text-center">CLASSIFICATION</th>
//                 </tr>
//               </thead>
//               <tbody className="text-black bg-white divide-y">
//                 {tableItems.map((item, idx) => (
//                   <tr key={idx} className="divide-x">
//                     <td className="px-4 py-2 text-center">{item.name}</td>
//                     <td className="px-4 py-2 text-center">{item.email}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Calculator;
