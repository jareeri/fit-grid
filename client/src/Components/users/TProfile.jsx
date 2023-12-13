import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Cookies, useCookies } from 'react-cookie';

const TProfile = () => {
  const [user, setUser] = useState({});
  const [formValues, setFormValues] = useState(
[]);
  const [cookie] = useCookies(["Authorization"]);
  const [photoName, setPhotoName] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const fileInputRef = useRef(null);
  console.log(formValues)

  useEffect(() => {
    if (cookie.token !== undefined) {
   
      axios.get(`http://localhost:8080/user-profiles`, {
        headers: { 'Authorization': cookie.token }
      })
        .then((response) => {
          setUser(response.data.userProfile);
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

  const handleCancel = () => {
    setFormValues(user); // Reset to the original values
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    if (!error) {
      // Create FormData object
      const formData = new FormData();
      // formData.append("user_id", formValues.user_id);
      formData.append("image", imageFile);

      formData.append("username_user", formValues.username );
      formData.append("bio", formValues.bio);
      formData.append("location", formValues.location);
      formData.append("website", formValues.website );

      console.log(formData)

      
      try {
        const response = await axios.put(
          "http://localhost:8080/updateUserProfileAndUser",
          formData,
          {
            headers: {
              Authorization: Cookies.get('token'),
              'Content-Type': 'multipart/form-data',  // Assuming you are sending form data
            },
          }
        );
        console.log('Response:', response.data);
      } catch (error) {
        console.error('Error updating user profile:', error);
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
                value={formValues.username || ""}
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
                value={formValues.bio || ""}
              />
            </div>

            <div className="flex flex-col justify-start">
              <label htmlFor="location" className="self-start p-2 text-gray-800">
                Location
              </label>
              <input
                className="w-full p-2 border rounded-md bg-gray-200"
                onChange={handleInputChange}
                name="location"
                value={formValues.location || ""}
              />
            </div>

            <div className="flex flex-col justify-start">
              <label htmlFor="website" className="self-start p-2 text-gray-800">
                Website
              </label>
              <input
                className="w-full p-2 border rounded-md bg-gray-200"
                onChange={handleInputChange}
                value={formValues.website || ""}
                name="website"
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              className="w-1/4 mr-3 p-2 bg-red-500 hover:bg-red-600 text-white rounded-xl"
              type="button"
              onClick={handleCancel}
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

export default TProfile
