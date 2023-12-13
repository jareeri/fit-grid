import React, { useState } from 'react';
import axios from 'axios';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/contact', formData);

      // Handle the response as needed (e.g., show success message)
      console.log('Contact form submitted successfully:', response.data);
    } catch (error) {
      // Handle errors (e.g., show error message)
      console.error('Error submitting contact form:', error);
    }
  };

  return (
    <div>
      <section className="body-font relative bg-[#9DB2BF] text-gray-300">
        <div className="container mx-auto px-5 py-24">
          <div className="mb-12 flex w-full flex-col text-center">
            <h1 className="title-font mb-4 text-2xl font-medium text-white sm:text-3xl">
              Contact Us
            </h1>
            <p className="mx-auto text-white leading-relaxed lg:w-2/3">
              Feel free to reach out to us! Whether you have a question, feedback, or
              a collaboration proposal, we'd love to hear from you.
            </p>
          </div>
          <div className="mx-auto md:w-2/3 lg:w-1/2">
            <div className="-m-2 flex flex-wrap">
              {/* form */}
              <div className="w-1/2 p-2">
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="peer w-full rounded border border-gray-250 bg-[#DDE6ED] bg-opacity-40 py-1 px-3 text-base leading-8 text-white placeholder-transparent outline-none transition-colors duration-200 ease-in-out  "
                    placeholder="Name"
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-3 -top-6 bg-transparent text-sm leading-7  text-white transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2  peer-placeholder-shown:text-base peer-placeholder-shown:text-bg-[#DDE6ED] peer-focus:left-3 peer-focus:-top-6 peer-focus:text-sm "
                  >
                    Name
                  </label>
                </div>
              </div>
              <div className="w-1/2 p-2">
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="peer w-full rounded border border-gray-250 bg-[#DDE6ED] bg-opacity-40 py-1 px-3 text-base leading-8 text-white placeholder-transparent outline-none transition-colors duration-200 ease-in-out  "
                    placeholder="Email"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-3 -top-6 bg-transparent text-sm leading-7 text-white transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2  peer-placeholder-shown:text-base peer-placeholder-shown:text-bg-[#DDE6ED] peer-focus:left-3 peer-focus:-top-6 peer-focus:text-sm"
                  >
                    Email
                  </label>
                </div>
              </div>
              <div className="mt-4 w-full p-2">
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="peer h-32 w-full resize-none rounded border border-gray-250 bg-[#DDE6ED] bg-opacity-40 py-1 px-3 text-base leading-6 text-white placeholder-transparent outline-none transition-colors duration-200 ease-in-out   "
                    placeholder="Message"
                    defaultValue={""}
                  />
                  <label
                    htmlFor="message"
                    className="absolute left-3 -top-6 bg-transparent text-sm leading-7 text-white transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2  peer-placeholder-shown:text-base peer-placeholder-shown:text-bg-[#DDE6ED] peer-focus:left-3 peer-focus:-top-6 peer-focus:text-sm"
                  >
                    Message
                  </label>
                </div>
              </div>
              <div className="w-full p-2">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full p-2 bg-[#526D82] hover:bg-gray-600 text-white rounded-3xl mt-4 "
                >
                  Submit
                </button>
              </div>
              {/* footer */}
              <div className="mt-8 w-full border-t border-[#27374D] p-2 pt-8 text-center">
                <a className="text-white">example@email.com</a>
                <p className="my-5 leading-normal"></p>
                <span className="inline-flex">cd 
                  <a className="text-white">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                    </svg>
                  </a>
                  <a className="ml-4 text-white">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                    </svg>
                  </a>
                  <a className="ml-4 text-white">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                    >
                      <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
                    </svg>
                  </a>
                  <a className="ml-4 text-white">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                    </svg>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
