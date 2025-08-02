import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaUserPlus } from 'react-icons/fa';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/users/register', { username, password, role: 'user' });
      alert('✅ Registration successful! You can now log in.');
      navigate('/login');
    } catch (err) {
      alert('❌ Registration failed. Username might already be taken.');
    }
  };

  return (
    <div className="d-flex justify-content-center bg-light p-4">
      <div
        className="card shadow p-3"
        style={{
          width: '320px',
          borderRadius: '12px',
        }}
      >
        <div className="text-center mb-3">
          <FaUserPlus size={35} className="text-success" />
          <h5 className="mt-2 mb-1">Create Account</h5>
          <small className="text-muted">Join our bookstore</small>
        </div>

        <form onSubmit={handleRegister}>
          <div className="input-group mb-2">
            <span className="input-group-text bg-success text-white">
              <FaUser />
            </span>
            <input
              type="text"
              placeholder="Username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text bg-success text-white">
              <FaLock />
            </span>
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-success w-100 btn-sm">Register</button>
        </form>

        <p className="text-center mt-2 mb-0" style={{ fontSize: '0.9rem' }}>
          Already have an account?{' '}
          <span
            className="text-success"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/login')}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
