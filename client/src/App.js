// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import { AuthProvider } from './Context/AuthContext';
// import "./App.css";
// import Home from "./Pages/Home";
// import Footer from "./Components/website/Footer";
// import Navbar from "./Components/website/Navbar";
// import NotFound from "./Components/website/NotFound";
// import Account from "./Pages/Account";
// import SignIn from "./Pages/SignIn";
// import Signup from "./Pages/Signup";
// import AccountTrainers from "./Pages/AccountTrainers";
// import About from "./Pages/About";
// import ContactUs from "./Pages/ContactUs";
// import Blogs from "./Pages/Blogs";
// import BlogDetails from "./Pages/BlogDetails";

// import CategoryContent from "./Pages/CategoryContent";

// import ProductSection from "./Pages/Detail";
// import Trainers from "./Pages/Trainers";
// import TrainerDetails from "./Pages/TrainerDetails";
// import Category from "./Components/Landing/Category";
// import Pricing from "./Pages/Pricing";
// import Payment from "./Pages/Payment";
// import Course from "./Components/users/Course";
// import Exercises from "./Pages/Exercises";

// import Blog from "./Components/users/Blog";
// import CourseDetails from "./Pages/CourseDetails";
// import CategoryItems from "./Components/Landing/CategoryItems";
// import TCourseDetails from "./Pages/TCourseDetails";


// import axios from 'axios';
// import Cookies from 'js-cookie';
// import JoinOurTeam from "./Components/JoinOurTeam";
// import AllBlog from "./Pages/AllBlog";
// import Privacypolicypage from "./Pages/Privacypolicypage";
// // Set the Authorization header globally
// axios.defaults.headers.common['Authorization'] = `${Cookies.get('token')}`;


// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <Navbar />
//         <div className="h-full">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<SignIn />} />
//             <Route path="/signup" element={<Signup />} />
//             <Route exact path="/blogs" element={<Blogs />} />
//             <Route path="/blog-details/:id" element={<BlogDetails />} />
//             <Route path="/account" element={<Account />} />
//             <Route path="/AccountTrainers" element={<AccountTrainers/>} />
//             <Route path="/account" element={<Blog />} />
//             <Route path="*" element={<NotFound />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/contact" element={<ContactUs />} />
//             <Route path="/category/:title" element={<CategoryContent />} />
//             <Route path="/" exact element={<Pricing />} />
//             <Route path="/payment" element={<Payment />} />
//             <Route path="/AllBlog" element={<AllBlog/>} />
//             <Route path="/trainers/:id" element={<TrainerDetails />} />
//             <Route path="/trainers" element={<Trainers />} />
//             <Route path="/Course" element={<Course />} />
//             <Route path="/Exercises" element={<Exercises />} />
//             <Route path="/product/:id" element={<ProductSection />} />
//             <Route path="/JoinOurTeam" element={<JoinOurTeam/>} />
//             <Route path="/CategoryItems"  element={<CategoryItems/>} />
//             <Route path="/Privacypolicypage" element={<Privacypolicypage/>} />
//             <Route
//               path="/course-details/:courseId"
//               element={<CourseDetails />}
//             />
//             <Route
//               path="/Tcourse-details/:courseId"
//               element={<TCourseDetails/>}
//             />
//           </Routes>
//         </div>
//         <Footer />
//       </Router>
     
   
      
//     </div>
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';

import Home from "./Pages/Home";
import Footer from "./Components/website/Footer";
import Navbar from "./Components/website/Navbar";
import NotFound from "./Components/website/NotFound";
import Account from "./Pages/Account";
import SignIn from "./Pages/SignIn";
import Signup from "./Pages/Signup";
import AccountTrainers from "./Pages/AccountTrainers";
import About from "./Pages/About";
import ContactUs from "./Pages/ContactUs";
import Blogs from "./Pages/Blogs";
import BlogDetails from "./Pages/BlogDetails";
import CategoryContent from "./Pages/CategoryContent";
import ProductSection from "./Pages/Detail";
import Trainers from "./Pages/Trainers";
import TrainerDetails from "./Pages/TrainerDetails";
import Category from "./Components/Landing/Category";
import Pricing from "./Pages/Pricing";
import Payment from "./Pages/Payment";
import Course from "./Components/users/Course";
import Exercises from "./Pages/Exercises";
import Blog from "./Components/users/Blog";
import CourseDetails from "./Pages/CourseDetails";
import CategoryItems from "./Components/Landing/CategoryItems";
import TCourseDetails from "./Pages/TCourseDetails";
import JoinOurTeam from "./Components/JoinOurTeam";
import AllBlog from "./Pages/AllBlog";
import Privacypolicypage from "./Pages/Privacypolicypage";
import TUserList from "./Components/Plan/TUserList";

// Set the Authorization header globally
axios.defaults.headers.common['Authorization'] = `${Cookies.get('token')}`;

const ProtectedRouteWrapper = ({ element: Component, ...rest }) => {
  // Add your authentication logic or context
  const isAuthenticated = Cookies.get('token') !== undefined; // Example logic

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="h-full">
          <Routes>
            <Route path="/login" element={<SignIn />} />
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route exact path="/blogs" element={<Blogs />} />
            <Route path="/blog-details/:id" element={<BlogDetails />} />

            {/* Use wrapper component for protected routes */}
            <Route
              path="/account/*"
              element={<ProtectedRouteWrapper element={Account} />}
            />
            <Route
              path="/AccountTrainers/*"
              element={<ProtectedRouteWrapper element={AccountTrainers} />}
            />

            {/* ... other protected routes */}
            
            
            <Route path="*" element={<NotFound />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/category/:title" element={<CategoryContent />} />
            <Route path="/" exact element={<Pricing />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/AllBlog" element={<AllBlog />} />
            <Route path="/trainers/:id" element={<TrainerDetails />} />
            <Route path="/trainers" element={<Trainers />} />
            <Route path="/Course" element={<Course />} />
            <Route path="/Exercises" element={<Exercises />} />
            <Route path="/product/:id" element={<ProductSection />} />
            <Route path="/JoinOurTeam" element={<JoinOurTeam />} />
            <Route path="/CategoryItems" element={<CategoryItems />} />
            <Route path="/Privacypolicypage" element={<Privacypolicypage />} />
            <Route path="/course-details/:courseId" element={<CourseDetails />} />
            <Route path="/Tcourse-details/:courseId" element={<TCourseDetails />} />
            <Route path="/TUserList/:id" element={<TUserList/>} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
