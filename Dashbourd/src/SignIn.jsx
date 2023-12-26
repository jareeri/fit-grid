import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import only once
import { useCookies } from 'react-cookie';
import Cookies from 'js-cookie';

const SignIn = () => {
  const navigate = useNavigate(); // Use it directly without alias
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }
  
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:8080/login', {
        usernameOrEmail: username,
        password: password,
      });
  
      // console.log('Response:', response);
  
      const token = response.data.accessToken;
      const user_id = response.data.Id;
      const role_id = response.data.userRole;
  
      // console.log('Token:', token);
  
      Cookies.set('token', token);
      Cookies.set('user_id', user_id);
      Cookies.set('role_id', role_id);
  
      setError('Sign-in successful');
      // console.log(role_id);
      if (role_id === "admin") {
        // console.log(role_id);
        alert('Sign-in successful');
        navigate('/Admin'); // Navigate to the Home route
      } else {
        alert('Not admin');
      }
      
      // console.log('Sign-in successful:', response.data);
    } catch (error) {
      console.error('Sign-in error:', error);
      setError('Sign-in failed. Username or password is invalid');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md max-w-md w-full">
        <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-800">Sign In</h2>
        <div>
          <input
            className="w-full p-3 border border-gray-300 rounded-md mt-4 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Username"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="w-full p-3 border border-gray-300 rounded-md mt-4 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <br/><br/>
        <button
          onClick={handleSignIn}
          className={`w-full p-3 bg-gradient-to-r from-red-700 to-red-800 text-white rounded-md mt-4 hover:opacity-90 ${loading && 'opacity-50 cursor-not-allowed'}`}
          disabled={loading}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
        
      </div>
    </div>
  );
}

export default SignIn;