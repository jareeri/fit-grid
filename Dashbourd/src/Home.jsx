import React from 'react'
import Admain from './Admain'
import { useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate()

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8080/api/admin-only")
  //     .then((response) => {
  //       console.log(response.data.success);
  //       if (response.data.success) {
  //         navigate("/home");
  //       }
  //       else {navigate("/signin");
  //     }
  //       // setPhotoPreview(response.data.profile_image_name);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching user data:", error);
  //     });
  // }, []);
  return (
    <div>
      <Admain/>
   
    </div>
  )
}

export default Home
