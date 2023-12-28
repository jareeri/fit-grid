import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./SignIn";
import Admain from "./Admain";
import Home from "./Home";
import axios from 'axios';
import Cookies from 'js-cookie';

// Set the Authorization header globally
axios.defaults.headers.common['Authorization'] = `${Cookies.get('token')}`;

function App() {
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/admin-only");
        console.log(response.data);
        if (response.data.success === true) {
          setType('admin');
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
      } finally {
        // Set loading to false when the request is complete
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Render only when loading is complete
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/Admin" element={type === 'admin' ? <Admain /> : <Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
