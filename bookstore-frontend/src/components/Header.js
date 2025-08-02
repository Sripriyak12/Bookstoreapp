import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const username = localStorage.getItem('username');
  const isLoggedIn = localStorage.getItem('userId') !== null;
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
    window.location.reload();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = searchTerm.trim();
    if (trimmed !== '') {
      navigate(`/search?q=${encodeURIComponent(trimmed)}`);
      setSearchTerm('');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid px-4">
        <div className="d-flex flex-column">
          <Link className="navbar-brand fw-bold mb-0" to="/">📚 BookStore</Link>
          <small className="text-light ms-1" style={{ fontSize: '0.75rem' }}>Your one-stop shop for great reads</small>
        </div>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <form className="d-flex search-bar" onSubmit={handleSearch}>
            <div className="input-group">
              <input
                type="text"
                className="form-control search-input"
                placeholder="Search books by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="input-group-text bg-light" onClick={handleSearch} style={{ cursor: 'pointer' }}>
                🔍
              </span>
            </div>
          </form>



          <ul className="navbar-nav ms-auto d-flex align-items-center gap-3">
            {isLoggedIn && (
              <>
                <li className="nav-item text-white">
                  👋 Hi, <strong>{username}</strong>
                </li>
                <li className="nav-item">
                  <button className="btn btn-sm btn-outline-light" onClick={handleLogout}>
                    🔓 Logout
                  </button>
                </li>
              </>
            )}
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="btn btn-sm btn-outline-light" to="/login">👤 User Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-sm btn-outline-light" to="/owner/login">🔐 Admin Login</Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <Link className="nav-link text-white" to="/cart">🛒 Cart</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/orders">📦 Orders</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
