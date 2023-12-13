// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { useCookies } from 'react-cookie';

// const Profile = () => {
//   const [user, setUser] = useState({});
//   const [formValues, setFormValues] = useState({});
//   const [cookie] = useCookies(["token"]);
//   const [photoName, setPhotoName] = useState(null);
//   const [photoPreview, setPhotoPreview] = useState(null);
//   const [imageFile, setImageFile] = useState(null);
//   const [error, setError] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const fileInputRef = useRef(null);

//   useEffect(() => {
//     if (cookie.token !== undefined) {
//       axios.get(`http://localhost:8080/updateUser`, {
//         headers: { 'token': cookie.token }
//       })
//         .then((response) => {
//           setUser(response.data);
//           setFormValues(response.data);
//         })
//         .catch((error) => {
//           console.error("Error:", error);
//         });
//     } else {
//       setUser(false);
//     }
//   }, [cookie.token]);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setImageFile(file);
//     if (file) {
//       setPhotoName(file.name);

//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setPhotoPreview(e.target.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSelectPhoto = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };

//   const handleInputChange = (e) => {
//     setFormValues({ ...formValues, [e.target.name]: e.target.value });
//   };

//   const handleSaveChanges = async (e) => {
//     e.preventDefault();
//     if (!error) {
//       const updatedUser = {
//         id: user.user_id,
//         username: formValues.username || user.username,
//         email: formValues.email || user.email,
//         phone: formValues.phone || user.phone,
//         profile_image_name: imageFile ? imageFile.name : user.profile_image_name,
//       };

//       try {
//         const response = await axios.put(
//           `http://localhost:5000/updateuser`,
//           updatedUser,
//           {
//             headers: { 'token': cookie.token },
//           }
//         );
//         console.log(response.data);
//         setSuccessMessage("Profile updated successfully!");
//       } catch (error) {
//         console.error("Error updating Information", error);
//         setSuccessMessage("");
//         setError("Error updating information. Please try again.");
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white flex justify-center ml-20 items-center">
//       <div className="w-9/12 h-5/6 bg-white my-6 md:ml-24 px-10 py-8 rounded-lg shadow-md">
//         <form>
//           <div className="flex justify-center">
//             <div className="col-span-6 ml-2 sm:col-span-4 md:mr-3">
//               <input
//                 type="file"
//                 className="hidden"
//                 ref={fileInputRef}
//                 onChange={handleFileChange}
//               />
//               <div className="text-center">
//                 <div className="mt-2">
//                   <span
//                     className="block w-40 h-40 rounded-full m-auto shadow"
//                     style={{
//                       backgroundSize: "cover",
//                       backgroundRepeat: "no-repeat",
//                       backgroundPosition: "center center",
//                       backgroundImage: `url('${
//                         photoPreview !== null
//                           ? photoPreview
//                           : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
//                       }')`,
//                     }}
//                   />
//                 </div>
//                 <button
//                   type="button"
//                   className="inline-flex items-center px-4 py-2 bg-indigo-500 border border-indigo-500 rounded-md font-semibold text-xs text-white uppercase tracking-widest shadow-sm hover:bg-indigo-600 focus-outline-none focus-border-indigo-400 focus-shadow-outline-indigo active-text-gray-800 active-bg-gray-50 transition ease-in-out duration-150 mt-2 ml-3"
//                   onClick={handleSelectPhoto}
//                 >
//                   Select New Photo
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="mt-8 space-y-6">
//             <div className="flex flex-col justify-start">
//               <label htmlFor="username" className="self-start p-2 text-gray-800">
//                 Username
//               </label>
//               <input
//                 className="w-full mb-3 p-2 border rounded-md bg-gray-200"
//                 onChange={handleInputChange}
//                 placeholder={user.username}
//                 type="text"
//                 name="username"
//               />
//             </div>

//             <div className="flex flex-col justify-start">
//               <label htmlFor="email" className="self-start p-2 text-gray-800">
//                 Email
//               </label>
//               <input
//                 className="w-full p-2 border rounded-md bg-gray-200"
//                 onChange={handleInputChange}
//                 placeholder={user.email}
//                 type="email"
//                 name="email"
//               />
//             </div>

//             <div className="flex flex-col justify-start">
//               <label htmlFor="phone" className="self-start p-2 text-gray-800">
//                 Phone
//               </label>
//               <input
//                 className="w-full p-2 border rounded-md bg-gray-200"
//                 onChange={handleInputChange}
//                 type="tel"
//                 id="phone"
//                 name="phone"
//                 placeholder={user.phone}
//               />
//             </div>
//           </div>

//           <div className="flex justify-end mt-6">
//             <button
//               className="w-1/4 mr-3 p-2 bg-red-500 hover:bg-red-600 text-white rounded-xl"
//               type="button"
//             >
//               Cancel
//             </button>
//             <button
//               className="w-auto py-2 px-3 bg-indigo-700 text-white rounded-xl"
//               onClick={handleSaveChanges}
//             >
//               Save Changes
//             </button>
//           </div>

//           {successMessage && (
//             <p className="text-green-600 mt-2">{successMessage}</p>
//           )}
//           {error && (
//             <p className="text-red-600 mt-2">{error}</p>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Profile;


import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useCookies } from 'react-cookie';

const Profile = () => {
  const [user, setUser] = useState({});
  const [formValues, setFormValues] = useState({});
  const [cookie] = useCookies(["token"]);
  const [photoName, setPhotoName] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (cookie.token !== undefined) {
      axios.get(`http://localhost:8080/user-profiles`, {
        headers: { 'Authorization': cookie.token }
      }) 
        .then((response) => {
          setUser(response.data.userProfile);
          console.log(response.data.userProfile)
          setFormValues(response.data.userProfile);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setUser(false);
    }
  }, [cookie.token]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setPhotoName(file.name);

      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPhoto = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };


      
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    if (!error) {
      const updatedUser = {
        username: formValues.username || user.username,
        bio: formValues.bio || user.bio,
        location: formValues.location || user.location,
        website: formValues.website || user.website,
        fileUrl: imageFile || user.fileUrl
      };

      console.log(user);
      console.log(updatedUser)
  
      try {
        const response = await axios.put(
          `http://localhost:8080/updateUserProfileAndUser/${user.user_id}`,
          updatedUser,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': cookie.token,
            },
          }
        );
  
        console.log("Server Response:", response.data);
        setSuccessMessage("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating Information", error);
        setSuccessMessage("");
        setError("Error updating information. Please try again.");
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-white flex justify-center ml-20 items-center">
      <div className="w-9/12 h-5/6 bg-white my-6 md:ml-24 px-10 py-8 rounded-lg shadow-md">
        <form>
          <div className="flex justify-center">
            <div className="col-span-6 ml-2 sm:col-span-4 md:mr-3">
              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <div className="text-center">
                <div className="mt-2">
                  <span
                    className="block w-40 h-40 rounded-full m-auto shadow"
                    style={{
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center center",
                      backgroundImage: `url('${
                        photoPreview !== null
                          ? photoPreview
                          : user.profileimage
                      }')`,
                    }}
                  />
                </div>
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 bg-indigo-500 border border-indigo-500 rounded-md font-semibold text-xs text-white uppercase tracking-widest shadow-sm hover:bg-indigo-600 focus-outline-none focus-border-indigo-400 focus-shadow-outline-indigo active-text-gray-800 active-bg-gray-50 transition ease-in-out duration-150 mt-2 ml-3"
                  onClick={handleSelectPhoto}
                >
                  Select New Photo
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <div className="flex flex-col justify-start">
              <label htmlFor="username" className="self-start p-2 text-gray-800">
                Username
              </label>
              <input
                className="w-full mb-3 p-2 border rounded-md bg-gray-200"
                onChange={handleInputChange}
                type="text"
                name="username"
                value={formValues.username}
              />
            </div>

            <div className="flex flex-col justify-start">
              <label htmlFor="bio" className="self-start p-2 text-gray-800">
                Bio
              </label>
              <textarea
                className="w-full mb-3 p-2 border rounded-md bg-gray-200"
                onChange={handleInputChange}
                placeholder={user.bio}
                name="bio"
                value={formValues.bio}
              />
            </div>

            <div className="flex flex-col justify-start">
              <label htmlFor="location" className="self-start p-2 text-gray-800">
                Location
              </label>3
              <input
                className="w-full p-2 border rounded-md bg-gray-200"
                onChange={handleInputChange}
                name="location"
                value={formValues.location}
              />
            </div>

            <div className="flex flex-col justify-start">
              <label htmlFor="website" className="self-start p-2 text-gray-800">
                Website
              </label>
              <input
                className="w-full p-2 border rounded-md bg-gray-200"
                onChange={handleInputChange}
                value={formValues.website}
                name="website"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              className="w-1/4 mr-3 p-2 bg-red-500 hover:bg-red-600 text-white rounded-xl"
              type="button"
            >
              Cancel
            </button>
            <button
              className="w-auto py-2 px-3 bg-indigo-700 text-white rounded-xl"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
          </div>

          {successMessage && (
            <p className="text-green-600 mt-2">{successMessage}</p>
          )}
          {error && (
            <p className="text-red-600 mt-2">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;
