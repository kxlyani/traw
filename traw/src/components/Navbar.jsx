import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <span className="logo-mark">✦</span>
          <span className="logo-text">Saveur Atlas</span>
        </Link>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <NavLink to="/destinations" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Destinations
          </NavLink>
          <NavLink to="/articles" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Stories
          </NavLink>
          <NavLink to="/dishes" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Dishes
          </NavLink>
        </div>

        <div className="navbar-actions">
          {user ? (
            <div className="user-menu" onMouseLeave={() => setDropdownOpen(false)}>
              <button
                className="user-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="user-avatar">{user.username?.[0]?.toUpperCase()}</span>
                <span className="user-name">{user.username}</span>
                <span className="chevron">▾</span>
              </button>
              {dropdownOpen && (
                <div className="user-dropdown">
                  <Link to="/dashboard" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                    ✦ My Collection
                  </Link>
                  <button className="dropdown-item danger" onClick={handleLogout}>
                    ↩ Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-btns">
              <Link to="/login" className="btn btn-outline btn-sm">Sign In</Link>
              <Link to="/register" className="btn btn-saffron btn-sm">Join Free</Link>
            </div>
          )}

          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
