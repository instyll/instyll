import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { executeQuery } from './db.js'; // You need to create a file for database operations
import { useSelector, useDispatch } from 'react-redux';
import './Login.css';
import './App.css';
import { setSelectedImage } from './imageSlice.js';
import { setSelectedUser } from './userSlice.js';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const location = useLocation();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogin = async () => {
    // Perform authentication check
    const query = `SELECT * FROM UserCredentials WHERE Username = '${username}' AND HashedPassword = '${password}'`;
    const result = await executeQuery(query);

    if (result.length > 0) {
      // Authentication successful
        // commit to redux
        dispatch(setSelectedUser(username));
        navigate('/app');
    } else {
      // Authentication failed
      alert('Invalid username or password');
    }
  };

  return (
    <div className='loginContainer'>
    <div className='loginWrapper'>
      <h2 className='loginHeader'>Welcome Back</h2>
      <form>
          <input type="text" 
          className='loginUsernameField'
          value={username} 
          placeholder='Username'
          onChange={(e) => setUsername(e.target.value)} />
        <br />
          <input type="password" 
          className='loginPasswordField'
          value={password} 
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)} />
        <br />
        <div className='passwordRecoverFieldContainer'>
        <p className='passwordRecoverField'>
            Recover Password
        </p>
        </div>
        <button type="button" className='loginActionButton' onClick={handleLogin}>
          Sign In
        </button>
        <div className='signUpRedirectContainer'>
            <p className='signUpRedirect'>New User? <span className='signUpRedirectLink'>Create Account</span></p>
        </div>
      </form>
      </div>
    </div>
  );
};

export default Login;