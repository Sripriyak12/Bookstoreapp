import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';

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
      localStorage.setItem('username', res.data.username);

      alert('✅ Login successful!');
      role === 'owner' ? navigate('/owner/login') : navigate('/');
    } catch (err) {
      alert('❌ Invalid username or password. Please try again.');
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-start pt-5"
      style={{ minHeight: '100vh', background: '#f0f2f5' }}
    >

      <div className="card p-4 shadow-lg rounded" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center mb-4">🔐 User Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label"><FaUser className="me-2" />Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label"><FaLock className="me-2" />Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>

        <div className="text-center mt-3">
          <span>New user? </span>
          <Link to="/register" className="text-decoration-none">Register here</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
