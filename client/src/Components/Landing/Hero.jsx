import React, { useEffect, useState } from "react";
// import Hero1 from "../../Images/Hero1.webp";
import AOS from "aos";
import "aos/dist/aos.css";
const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(1);

  
  const changeSlide = (slideNumber) => {
    setCurrentSlide(slideNumber);
  };
  useEffect(() => {  AOS.init();
    const slideTimer = setTimeout(() => {
      const nextSlide = currentSlide === 4 ? 1 : currentSlide + 1;
      setCurrentSlide(nextSlide);
    }, 5000);
    return () => clearTimeout(slideTimer);
  }, [currentSlide]);

  return (
    <header className="bg-white dark:bg-gray-800 mt-24">
      <div data-aos="fade-up" className=" w-full flex flex-col md:flex-row md:items-center ">
        <div className="flex flex-col items-center w-full h-50">
          <div className="relative w-full md:order-2">
            {/* items */}
            {currentSlide === 1 && (
              /* <!-- Item 1 --> */
              <div
                className="w-full h-[500px] bg-cover bg-[50%] bg-[url('https://getwallpapers.com/wallpaper/full/d/1/9/200249.jpg')]"
                data-carousel-item=""
              >
                <div className="w-full h-full absolute top-0 bottom-0 right-0 left-0 bg-[#3f3f3f5c] flex flex-col justify-center items-center">
                  <div className="m-3 w-2/3">
                    
                 
                  </div>
                </div>
              </div>
            )}
            {currentSlide === 2 && (
              /* <!-- Item 2 --> */
              <div
                className="w-full h-[500px] bg-cover bg-[50%] bg-[url('https://wallpaperboat.com/wp-content/uploads/2019/06/workout-motivation-02.jpg')]"
                data-carousel-item=""
              >
                <div className="w-full h-full absolute top-0 bottom-0 right-0 left-0 bg-[#3f3f3f5c] flex flex-col justify-center items-center">
                  <div className="m-3 w-2/3">
                    
                 
                  </div>
                </div>
              </div>
            )}
            {currentSlide === 3 && (
              /* <!-- Item 3 --> */
              <div
                className="w-full h-[500px] bg-cover bg-[50%] bg-[url('https://e0.pxfuel.com/wallpapers/556/431/desktop-wallpaper-never-give-up-background-give-don-t-give-up.jpg')]"
                data-carousel-item=""
              >
                <div className="w-full h-full absolute top-0 bottom-0 right-0 left-0 flex flex-col justify-center items-center md:items-end">
                  <div className="bg-[#0538385c] flex flex-col justify-center items-center mx-16 md:mx-24 rounded-xl">
                   
                  </div>
                </div>
              </div>
            )}
            {currentSlide === 4 && (
              /* <!-- Item 4 --> */
              <div
                className="w-full h-[500px] bg-cover bg-[50%] bg-[url('https://wallpaper.dog/large/10697553.jpg')]"
                data-carousel-item=""
              >
                <div className="w-full h-full absolute top-0 bottom-0 right-0 left-0 bg-[#3f3f3f5c] flex flex-col justify-center items-center">
                 
                </div>
              </div>
            )}
            {/* buttons */}
            {/* Previous button */}
            <button
              type="button"
              className={`${
                currentSlide !== 1 ? `text-white` : `text-black`
              } absolute top-1/2 left-0 transform -translate-y-1/2 mx-6 p-2 md:p-4`}
              data-carousel-prev=""
              onClick={() =>
                changeSlide(currentSlide === 1 ? 4 : currentSlide - 1)
              }
            >
              <span className="flex items-center">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 md:w-16 md:h-16"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                  ></path>
                </svg>
              </span>
            </button>

            {/* Next button */}
            <button
              type="button"
              className={`${
                currentSlide !== 1 ? `text-white` : `text-black`
              } absolute top-1/2 right-0 transform -translate-y-1/2 mx-6 p-2 md:p-4`}
              data-carousel-next=""
              onClick={() =>
                changeSlide(currentSlide === 4 ? 1 : currentSlide + 1)
              }
            >
              <span className="flex items-center">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 md:w-16 md:h-16"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;