import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const history = useNavigate();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateField = (value, validationFunction, errorMessage, errorArray) => {
    if (!validationFunction(value)) {
      errorArray.push(errorMessage);
      return false;
    } else {
      return true;
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    const validationErrors = [];
    
    const isEmailValid = validateField(email, validateEmail, 'Please enter a valid email.', validationErrors);
    const isPasswordValid = validateField(
      password,
      validatePassword,
      `Password must contain at least one lowercase letter, one uppercase letter, 
      one digit, one special character (@#$%^&!), and be between 6 and 30 characters in length.`,
      validationErrors
    );
    const isUsernameValid = validateField(
      username,
      validateUsername,
      'Username must be between 3 and 20 characters in length.',
      validationErrors
    );

    if (password !== confirmPassword) {
      validationErrors.push("Passwords don't match.");
    }

    if (validationErrors.length > 0) {
      setError(validationErrors.join(' '));
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/register', {
        email,
        username,
        password,
      });

      console.log(response.status);
      if (response.status === 201) {
        alert('Sign Up successful! Please check your email for verification.');
        history('/login');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError('Email or username is already taken. Please use different credentials.');
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.(com|net)$/.test(email);
  };

  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&!])[A-Za-z\d@#$%^&!]{6,30}$/;
    return passwordPattern.test(password);
  };

  const validateUsername = (username) => {
    return /^[A-Za-z0-9]{3,20}$/.test(username);
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 mt-16">
      <div className="bg-white p-8 rounded-md shadow-md max-w-md w-full">
        <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-800">Sign Up</h2>
        <div>
          <input
            className="w-full p-3 border border-gray-300 rounded-md mt-4 focus:outline-none focus:ring focus:border-blue-300"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            type="text"
            required
          />
          <input
            className="w-full p-3 border border-gray-300 rounded-md mt-4 focus:outline-none focus:ring focus:border-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
          />
          <input
            className="w-full p-3 border border-gray-300 rounded-md mt-4 focus:outline-none focus:ring focus:border-blue-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            required
          />
          <input
            className="w-full p-3 border border-gray-300 rounded-md mt-4 focus:outline-none focus:ring focus:border-blue-300"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            type={showPassword ? 'text' : 'password'}
            required
          />
          <div className="flex items-center mt-2">
            <input
              className="mr-2"
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={toggleShowPassword}
            />
            <label htmlFor="showPassword">Show Password</label>
          </div>
          <button
            className={`w-full p-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-md mt-4 hover:opacity-90 ${
              loading && 'opacity-50 cursor-not-allowed'
            }`}
            onClick={handleSignUp}
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <button className="text-center text-sm text-gray-700 mt-6">
            Already have an account?{' '}
            <a
              href="/login"
              className="font-semibold text-indigo-500 hover:underline focus:text-indigo-800 focus:outline-none"
            >
              Log in
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
