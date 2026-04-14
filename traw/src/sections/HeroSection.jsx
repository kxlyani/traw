import { Link } from 'react-router-dom';
import './HeroSection.css';

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-layout">
        {/* Left: Text */}
        <div className="hero-text fade-up">
          <p className="section-label">Food Travel Platform</p>
          <h1 className="hero-heading display-heading">
            Eat Your Way<br />
            <em>Around The World</em>
          </h1>
          <p className="hero-sub">
            Discover cities through their food culture. From street-side noodle stalls
            in Hanoi to trattorie tucked in Roman alleys — your culinary atlas awaits.
          </p>
          <div className="hero-ctas">
            <Link to="/destinations" className="btn btn-saffron">
              Explore Destinations →
            </Link>
            <Link to="/articles" className="btn btn-outline">
              Read Stories
            </Link>
          </div>
          <div className="hero-stats">
            <div className="stat"><strong>120+</strong><span>Destinations</span></div>
            <div className="stat-divider"></div>
            <div className="stat"><strong>500+</strong><span>Dishes</span></div>
            <div className="stat-divider"></div>
            <div className="stat"><strong>1,200+</strong><span>Reviews</span></div>
          </div>
        </div>

        {/* Right: Mosaic */}
        <div className="hero-mosaic fade-up fade-up-delay-2">
          <div className="mosaic-cell cell-1">
            <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80" alt="Food spread" />
            <div className="mosaic-label">Tokyo · Japan</div>
          </div>
          <div className="mosaic-cell cell-2">
            <img src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&q=80" alt="Ramen" />
          </div>
          <div className="mosaic-cell cell-3">
            <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80" alt="Restaurant" />
          </div>
          <div className="mosaic-cell cell-4">
            <img src="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80" alt="Pizza" />
            <div className="mosaic-label">Naples · Italy</div>
          </div>
        </div>
      </div>

      {/* Ticker bar */}
      <div className="hero-ticker">
        {['Street Food', 'Ramen', 'Tacos', 'Biryani', 'Croissants', 'Pho', 'Sushi', 'Falafel', 'Pasta', 'Dim Sum'].map((item, i) => (
          <span key={i} className="ticker-item">✦ {item}</span>
        ))}
        {['Street Food', 'Ramen', 'Tacos', 'Biryani', 'Croissants', 'Pho', 'Sushi', 'Falafel', 'Pasta', 'Dim Sum'].map((item, i) => (
          <span key={`b${i}`} className="ticker-item">✦ {item}</span>
        ))}
      </div>
    </section>
  );
}
