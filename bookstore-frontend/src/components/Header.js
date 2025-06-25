import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const username = localStorage.getItem('username');
  const isLoggedIn = localStorage.getItem('userId') !== null;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // or remove specific items if preferred
    navigate('/login');
    window.location.reload(); // refresh to update Header state
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">📚 BookStore</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto align-items-center">
          {isLoggedIn && (
            <>
              <li className="nav-item text-white me-3">
                👋 Hi, <strong>{username}</strong>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-light" onClick={handleLogout}>
                  🔓 Logout
                </button>
              </li>
            </>
          )}
          {!isLoggedIn && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">👤 User Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/owner/login">🔐 Admin Login</Link>
              </li>
            </>
          )}
          <li className="nav-item">
            <Link className="nav-link" to="/cart">🛒 Cart</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/orders">📦 Orders</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
