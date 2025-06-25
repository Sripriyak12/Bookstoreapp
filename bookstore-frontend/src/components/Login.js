import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/users/login', { username, password });
      const { id, role } = res.data;

      localStorage.setItem('userId', id);
      localStorage.setItem('role', role);

      alert('Login successful!');
      console.log("Login response:", res.data);
      localStorage.setItem('username', res.data.username);


      // Navigate based on role (optional)
      if (role === 'owner') {
        navigate('/owner/login');
      } else {
        navigate('/');
      }
    } catch (err) {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="container mt-4">
      <h2>🔐 User Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          className="form-control mb-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="form-control mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-primary">Login</button>
      </form>
      <p className="mt-3">
        New user? <Link to="/register">Register here</Link>
      </p>
    </div>
    
  );
}

export default Login;
