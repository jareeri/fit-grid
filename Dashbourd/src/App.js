import React,{useState ,useEffect} from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./SignIn";
import Signup from "./Signup";
import Admain from "./Admain";

import Home from "./Home";


import axios from 'axios';
import Cookies from 'js-cookie';
// Set the Authorization header globally
axios.defaults.headers.common['Authorization'] = `${Cookies.get('token')}`;



function App() {
  const [type ,setType] =useState("")
  
  
useEffect(() => {
  try{

    axios
    .get("http://localhost:8080/api/admin-only")
    .then((response) => {
      console.log(response.data)  
      if (response.data.success == true) {
            setType('admin')
         }
    })
  //  const response = axios.get("http://localhost:8080/api/admin-only",)
  //   console.log(response)  
  // if (response.data) {
  //     setType('admin')
  //   }
  }

  catch(error){
    console.log("Error fetching user data:", error);
  };
}, []);
  return (
    <div className="App">
      <Router>
    
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/Admin" element={type == 'admin' ? <Admain /> : <Navigate to="/"/>} /> {/* Check this line */}
          <Route path="/" element={<SignIn />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
  
      </Router>
    </div>
  );
}

export default App;
