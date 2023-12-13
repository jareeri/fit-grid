// import React from 'react';

// const Payment = () => {
//   return (
//     <div className='mx-20 mt-20'>
//       <>
//         {/* component */}
//         <style
//           dangerouslySetInnerHTML={{
//             __html:
//               "@import url(https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css);",
//           }}
//         />
//         <style
//           dangerouslySetInnerHTML={{
//             __html:
//               "\n/*\nmodule.exports = {\n    plugins: [require('@tailwindcss/forms'),]\n};\n*/\n.form-radio {\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none;\n  -webkit-print-color-adjust: exact;\n          color-adjust: exact;\n  display: inline-block;\n  vertical-align: middle;\n  background-origin: border-box;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  flex-shrink: 0;\n  border-radius: 100%;\n  border-width: 2px;\n}\n\n.form-radio:checked {\n  background-image: url(\"data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e\");\n  border-color: transparent;\n  background-color: currentColor;\n  background-size: 100% 100%;\n  background-position: center;\n  background-repeat: no-repeat;\n}\n\n@media not print {\n  .form-radio::-ms-check {\n    border-width: 1px;\n    color: transparent;\n    background: inherit;\n    border-color: inherit;\n    border-radius: inherit;\n  }\n}\n\n.form-radio:focus {\n  outline: none;\n}\n\n.form-select {\n  background-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23a0aec0'%3e%3cpath d='M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z'/%3e%3c/svg%3e\");\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none;\n  -webkit-print-color-adjust: exact;\n          color-adjust: exact;\n  background-repeat: no-repeat;\n  padding-top: 0.5rem;\n  padding-right: 2.5rem;\n  padding-bottom: 0.5rem;\n  padding-left: 0.75rem;\n  font-size: 1rem;\n  line-height: 1.5;\n  background-position: right 0.5rem center;\n  background-size: 1.5em 1.5em;\n}\n\n.form-select::-ms-expand {\n  color: #a0aec0;\n  border: none;\n}\n\n@media not print {\n  .form-select::-ms-expand {\n    display: none;\n  }\n}\n\n@media print and (-ms-high-contrast: active), print and (-ms-high-contrast: none) {\n  .form-select {\n    padding-right: 0.75rem;\n  }\n}\n",
//           }}
//         />
//         <div className="min-w-screen min-h-screen bg-white flex items-center justify-center px-5 pb-10 pt-16 ">
//           <div
//             className="w-full mx-auto rounded-lg bg-gray-100 shadow-lg p-5 text-gray-700"
//             style={{ maxWidth: 600 }}
//           >
//             <div className="w-full pt-1 pb-5">
//               <div className="bg-gray-500 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
//                 <i className="mdi mdi-credit-card-outline text-3xl" />
//               </div>
//             </div>
//             <div className="mb-10">
//               <h1 className="text-center font-bold text-xl uppercase">
//                 Secure payment info
//               </h1>
//             </div>
//             <div className="mb-3 flex -mx-2">
//               <div className="px-2">
//                 <label
//                   htmlFor="type1"
//                   className="flex items-center cursor-pointer"
//                 >
//                   <input
//                     type="radio"
//                     className="form-radio h-5 w-5 text-gray-500"
//                     name="type"
//                     id="type1"
//                     defaultChecked=""
//                   />
//                   <img
//                     src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png"
//                     className="h-8 ml-3"
//                   />
//                 </label>
//               </div>
//               <div className="px-2">
//                 <label
//                   htmlFor="type2"
//                   className="flex items-center cursor-pointer"
//                 >
//                   <input
//                     type="radio"
//                     className="form-radio h-5 w-5 text-gray-500"
//                     name="type"
//                     id="type2"
//                   />
//                   <img
//                     src="https://www.sketchappsources.com/resources/source-image/PayPalCard.png"
//                     className="h-8 ml-3"
//                   />
//                 </label>
//               </div>
//             </div>
//             <div className="mb-3">
//               <label className="font-bold text-sm mb-2 ml-1">Name on card</label>
//               <div>
//                 <input
//                   className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-gray-500 transition-colors"
//                   placeholder="John Smith"
//                   type="text"
//                 />
//               </div>
//             </div>
//             <div className="mb-3">
//               <label className="font-bold text-sm mb-2 ml-1">Card number</label>
//               <div>
//                 <input
//                   className="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-gray-500 transition-colors"
//                   placeholder="0000 0000 0000 0000"
//                   type="text"
//                 />
//               </div>
//             </div>
//             <div className="mb-3 -mx-2 flex items-end">
//               <div className="px-2 w-1/2">
//                 <label className="font-bold text-sm mb-2 ml-1">
//                   Expiration date
//                 </label>
//                 <div>
//                   <select className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-gray-500 transition-colors cursor-pointer">
//                     <option value={1}>01 - January</option>
//                     <option value={2}>02 - February</option>
//                     <option value={3}>03 - March</option>
//                     <option value={4}>04 - April</option>
//                     <option value={5}>05 - May</option>
//                     <option value={6}>06 - June</option>
//                     <option value={7}>07 - July</option>
//                     <option value={8}>08 - August</option>
//                     <option value={9}>09 - September</option>
//                     <option value={10}>10 - October</option>
//                     <option value={11}>11 - November</option>
//                     <option value={12}>12 - December</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="px-2 w-1/2">
//                 <select className="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-gray-500 transition-colors cursor-pointer">
//                   <option value={2020}>2020</option>
//                   <option value={2021}>2021</option>
//                   <option value={2022}>2022</option>
//                   <option value={2023}>2023</option>
//                   <option value={2024}>2024</option>
//                   <option value={2025}>2025</option>
//                   <option value={2026}>2026</option>
//                   <option value={2027}>2027</option>
//                   <option value={2028}>2028</option>
//                   <option value={2029}>2029</option>
//                 </select>
//               </div>
//             </div>
//             <div className="mb-10">
//               <label className="font-bold text-sm mb-2 ml-1">Security code</label>
//               <div>
//                 <input
//                   className="w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-gray-500 transition-colors"
//                   placeholder="000"
//                   type="text"
//                 />
//               </div>
//             </div>
//             <div>
//               <button className="block w-full max-w-xs mx-auto bg-gray-500 hover:bg-gray-700 focus:bg-gray-700 text-white rounded-lg px-3 py-3 font-semibold">
//                 <i className="mdi mdi-lock-outline mr-1" /> PAY NOW
//               </button>
//             </div>
//           </div>
//         </div>
//         {/* BUY ME A BEER AND HELP SUPPORT OPEN-SOURCE RESOURCES */}
//         <div className="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
//           <div>
//             <a
//               title="Buy me a beer"
//               href="https://www.buymeacoffee.com/scottwindon"
//               target="_blank"
//               className="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12"
//             >
//               <img
//                 className="object-cover object-center w-full h-full rounded-full"
//                 src="https://i.pinimg.com/originals/60/fd/e8/60fde811b6be57094e0abc69d9c2622a.jpg"
//               />
//             </a>
//           </div>
//         </div>
//       </>
//     </div>
//   );
// };

// export default Payment;
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, ElementsConsumer } from '@stripe/react-stripe-js';
import CheckoutForm from '../Components/CheckoutForm';

const stripePromise = loadStripe('pk_test_51OGMaCINwTlfmR0PZyo9YlqAB6mi7YaJwfnoFzLVzuzyEG0HCLNE7mh4z8cYZEbSDamclDnAUTD5JLtXzW2GGWM700GEwHgs0E');

const Payment = () => {
  return (
    <div className='mx-20 mt-20'>
      {/* Styles for radio buttons and select inputs */}
      <style
        dangerouslySetInnerHTML={{
          __html:
            "@import url(https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css);",
        }}
      />
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n.form-radio { /* ... */ }\n.form-radio:checked { /* ... */ }\n/* Add other styles as needed */\n",
        }}
      />

      {/* Payment form */}
      <div className='min-w-screen min-h-screen bg-white flex items-center justify-center px-5 pb-10 pt-16 '>
        <div
          className='w-full mx-auto rounded-lg bg-gray-100 shadow-lg p-5 text-gray-700'
          style={{ maxWidth: 600 }}
        >
         
          {/* Payment form elements */}
          <Elements stripe={stripePromise}>
            <ElementsConsumer>
              {({ stripe, elements }) => (
                <CheckoutForm stripe={stripe} elements={elements} />
              )}
            </ElementsConsumer>
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;

