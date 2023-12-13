import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Cookies from 'js-cookie';

const SignIn = () => {
  const history = useNavigate();
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

      // Log the entire response to inspect its structure
      console.log('Response:', response);

      const token = response.data.accessToken; // Make sure to access the correct property
      const user_id = response.data.Id; // Make sure to access the correct property
      const role_id = response.data.userRole; 
      console.log('Token:', token);

      Cookies.set('token', token);
      Cookies.set('user_id', user_id);
      Cookies.set('role_id', role_id);


      setError('Sign-in successful');
      history('/');
      alert('Sign-in successful'); // Adjust alert message based on your requirements
      console.log('Sign-in successful:', response.data);
    } catch (error) {
      console.error('Sign-in error:', error);

      // Adjust error message based on the structure of the error response
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
          className={`w-full p-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-md mt-4 hover:opacity-90 ${loading && 'opacity-50 cursor-not-allowed'}`}
          disabled={loading}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
        <br/><br/>
        <p className="text-center text-sm text-gray-700">
          Don't have an account yet?
          <a href="/Signup" className="font-semibold text-indigo-500 hover:underline focus:text-indigo-800 focus:outline-none">
            Sign up
          </a>.
        </p>
        <div className="mt-6">
          <a href='http://localhost:5000/auth/google' className="flex items-center justify-center bg-gray-200 p-3 rounded-md">
            <img
              className="w-6 h-6 mr-2"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              loading="lazy"
              alt="google logo"
            />
            <span>Login with Google</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
