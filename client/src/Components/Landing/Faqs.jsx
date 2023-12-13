import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Faqs = () => {
  const [questionStates, setQuestionStates] = useState({});
  const [faqData, setFaqData] = useState([]);

  useEffect(() => {
    AOS.init();

    // Fetch FAQ data using Axios
    axios
      .get('http://localhost:8080/faqs')
      .then((response) => {
        const initialQuestionStates = {};
        console.log(response.data);
        response.data.forEach((faq, index) => {
          initialQuestionStates[`question${index + 1}`] = 'closed';
        });

        setFaqData(response.data);
        setQuestionStates(initialQuestionStates);
      })
      .catch((error) => {
        console.error('Error fetching FAQ data:', error);
      });
  }, []); // Empty dependency array to run the effect only once on component mount

  const toggleAnswer = (questionId) => {
    setQuestionStates((prevStates) => ({
      ...prevStates,
      [questionId]: prevStates[questionId] === 'closed' ? 'open' : 'closed',
    }));
  };

  return (
    <section data-aos="fade-up" className="py-10 bg-white sm:py-16 lg:py-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 w-10/12">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-[#27374D] sm:text-4xl lg:text-5xl">
            Explore Common Questions
          </h2>
        </div>
        <div className="max-w-full mx-auto mt-8 space-y-4 md:mt-16">
          {faqData.map((faq, index) => (
            <div
              key={`question${index + 1}`}
              className="bg-white border border-gray-200 shadow-lg rounded-md overflow-hidden transition-transform duration-300 transform hover:scale-105"
            >
              <button
                type="button"
                id={`question${index + 1}`}
                data-state={questionStates[`question${index + 1}`]}
                onClick={() => toggleAnswer(`question${index + 1}`)}
                className="flex items-center justify-between w-full px-4 py-5 sm:p-6 focus:outline-none"
              >
                <span className="flex text-lg font-semibold text-black">{faq.question}</span>
                <svg
                  id={`arrow${index + 1}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-400 transition-transform duration-200 transform"
                  style={{
                    transform:
                      questionStates[`question${index + 1}`] === 'open' ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                id={`answer${index + 1}`}
                style={{
                  display: questionStates[`question${index + 1}`] === 'open' ? 'block' : 'none',
                }}
                className="px-4 pb-5 sm:px-6 sm:pb-6"
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-600 textbase mt-9">
          Still have questions?
          <span className="cursor-pointer font-medium text-tertiary transition-all duration-200 hover:text-tertiary focus:text-tertiary hover:underline">
            <Link to="/contact" className="text-neutral-600 dark:text-neutral-200">
              Contact our support
            </Link>
          </span>
        </p>
      </div>
    </section>
  );
};

export default Faqs;
