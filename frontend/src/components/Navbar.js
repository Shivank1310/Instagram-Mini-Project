import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <h2>Instagram Clone</h2>
        </Link>
        
        {isLoggedIn ? (
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/create-post" className="nav-link">Create Post</Link>
            <Link to={`/profile/${localStorage.getItem('userId')}`} className="nav-link">
              Profile
            </Link>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        ) : (
          <div className="nav-links">
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link">Signup</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;