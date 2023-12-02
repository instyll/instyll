import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { executeQuery } from './db.js'; // You need to create a file for database operations

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Perform authentication check
    const query = `SELECT * FROM UserCredentials WHERE Username = '${username}' AND HashedPassword = '${password}'`;
    const result = await executeQuery(query);

    if (result.length > 0) {
      // Authentication successful
        navigate('/app');
    } else {
      // Authentication failed
      alert('Invalid username or password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;