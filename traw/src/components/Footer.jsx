import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-mark">✦</span>
              <span>Saveur Atlas</span>
            </div>
            <p className="footer-tagline">
              Explore the world through the lens of food. Every destination has a story told in flavors.
            </p>
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            <Link to="/destinations">Destinations</Link>
            <Link to="/dishes">Dishes</Link>
            <Link to="/articles">Stories</Link>
          </div>
          <div className="footer-col">
            <h4>Account</h4>
            <Link to="/login">Sign In</Link>
            <Link to="/register">Join Free</Link>
            <Link to="/dashboard">My Collection</Link>
          </div>
          <div className="footer-col">
            <h4>Platform</h4>
            <a href="#">About</a>
            <a href="#">For Writers</a>
            <a href="#">Contact</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 Saveur Atlas. All rights reserved.</span>
          <span>Built for curious eaters.</span>
        </div>
      </div>
    </footer>
  );
}
