import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
      alert('Invalid credentials!');
    }
  };

  const goTo = (path) => navigate(path);

  return (
    <div className="container mt-4">
      {!isAuthenticated ? (
        <>
          <h2>Owner Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              className="form-control mb-2"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="form-control mb-2"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn btn-primary">Login</button>
          </form>
        </>
      ) : (
        <>
      <h2>Welcome, {username}!</h2>
      <div className="d-grid gap-2 mt-4">
        <button className="btn btn-success" onClick={() => goTo('/admin/add-book')}>
          ➕ Add Book
        </button>
        <button className="btn btn-danger" onClick={() => goTo('/admin/manage-books')}>
          🗑️ View/Delete Books
        </button>
        <button className="btn btn-secondary" onClick={() => goTo('/')}>
          🔙 Exit Dashboard
        </button>
      </div>
    </>
      )}
    </div>
  );
}

export default OwnerLogin;
