import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserShield, FaLock, FaSignInAlt, FaPlus, FaBook, FaArrowLeft } from 'react-icons/fa';

function OwnerLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'sripriya' && password === '4453') {
      setIsAuthenticated(true);
    } else {
      alert('❌ Invalid credentials!');
    }
  };

  const goTo = (path) => navigate(path);

  return (
    <div className="d-flex justify-content-center bg-light p-4">
      {!isAuthenticated ? (
        <div
          className="card shadow p-4"
          style={{
            width: '320px',
            borderRadius: '12px',
          }}
        >
          <div className="text-center mb-3">
            <FaUserShield size={40} className="text-primary" />
            <h5 className="mt-2 mb-1">Owner Login</h5>
            <small className="text-muted">Access the admin dashboard</small>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group mb-2">
              <span className="input-group-text bg-primary text-white">
                <FaUserShield />
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
              <span className="input-group-text bg-primary text-white">
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

            <button className="btn btn-primary w-100">
              <FaSignInAlt className="me-2" /> Login
            </button>
          </form>
        </div>
      ) : (
        <div
          className="card shadow p-4 text-center"
          style={{
            width: '320px',
            borderRadius: '12px',
          }}
        >
          <h5 className="mb-3">✅ Welcome, {username}!</h5>
          <div className="d-grid gap-2">
            <button className="btn btn-success" onClick={() => goTo('/admin/add-book')}>
              <FaPlus className="me-2" /> Add Book
            </button>
            <button className="btn btn-danger" onClick={() => goTo('/admin/manage-books')}>
              <FaBook className="me-2" /> View/Delete Books
            </button>
            <button className="btn btn-secondary" onClick={() => goTo('/')}>
              <FaArrowLeft className="me-2" /> Exit Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OwnerLogin;
