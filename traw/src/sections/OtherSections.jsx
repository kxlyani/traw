import './OtherSections.css';

/* ── Feature Section ──────────────────────────────────────────────────────── */
export function FeatureSection() {
  const features = [
    { icon: '🗺', title: 'Destination Guides', desc: 'Curated city guides built around food culture, markets, and must-eat spots.' },
    { icon: '🍜', title: 'Dish Discovery', desc: 'Explore iconic dishes with origin stories, ingredients, and where to find them.' },
    { icon: '📝', title: 'Editorial Stories', desc: 'Long-form travel writing from food journalists around the world.' },
    { icon: '⭐', title: 'Community Reviews', desc: 'Real experiences from travelers who ate their way through every destination.' },
  ];

  return (
    <section className="feature-section">
      <div className="container">
        <div className="feature-inner">
          <div className="feature-left">
            <p className="section-label">Why Saveur Atlas</p>
            <h2 className="display-heading feature-heading">
              Everything You Need<br />
              <em>To Eat Well Abroad</em>
            </h2>
            <p className="feature-desc">
              We believe the best way to understand a culture is through its food.
              Saveur Atlas connects curious travelers with authentic culinary experiences.
            </p>
          </div>
          <div className="feature-grid">
            {features.map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Map Section ──────────────────────────────────────────────────────────── */
export function MapSection() {
  const pins = [
    { city: 'Tokyo', x: 80, y: 38 },
    { city: 'Mumbai', x: 60, y: 44 },
    { city: 'Istanbul', x: 52, y: 36 },
    { city: 'Naples', x: 48, y: 35 },
    { city: 'Mexico City', x: 20, y: 46 },
    { city: 'Hanoi', x: 72, y: 46 },
    { city: 'Cairo', x: 53, y: 43 },
    { city: 'Lima', x: 23, y: 60 },
    { city: 'NYC', x: 25, y: 36 },
    { city: 'Bangkok', x: 72, y: 48 },
  ];

  return (
    <section className="map-section">
      <div className="container">
        <div className="map-header">
          <p className="section-label">World Food Map</p>
          <h2 className="display-heading map-heading">Where Will You <em>Eat Next?</em></h2>
        </div>
        <div className="map-wrap">
          <div className="map-bg">
            {/* Simple SVG world outline placeholder */}
            <svg viewBox="0 0 100 60" className="world-svg" aria-hidden="true">
              {/* Simplified continent shapes */}
              <rect x="15" y="28" width="18" height="14" rx="2" fill="rgba(255,255,255,0.08)" />
              <rect x="18" y="42" width="12" height="16" rx="2" fill="rgba(255,255,255,0.08)" />
              <rect x="44" y="26" width="14" height="18" rx="2" fill="rgba(255,255,255,0.08)" />
              <rect x="49" y="38" width="9" height="16" rx="2" fill="rgba(255,255,255,0.08)" />
              <rect x="58" y="22" width="30" height="20" rx="2" fill="rgba(255,255,255,0.08)" />
              <rect x="65" y="42" width="18" height="12" rx="2" fill="rgba(255,255,255,0.08)" />
              <rect x="82" y="30" width="14" height="18" rx="2" fill="rgba(255,255,255,0.08)" />
            </svg>
            {pins.map((pin, i) => (
              <div
                key={i}
                className="map-pin"
                style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                title={pin.city}
              >
                <div className="pin-dot"></div>
                <div className="pin-label">{pin.city}</div>
              </div>
            ))}
          </div>
          <div className="map-legend">
            <p className="section-label">Active Destinations</p>
            <p className="legend-count">120+ cities across 60 countries</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Experience Section ───────────────────────────────────────────────────── */
export function ExperienceSection() {
  const experiences = [
    {
      tag: 'Japan',
      title: 'A Week Eating Through Tokyo\'s Hidden Ramen Alleys',
      desc: 'From 18-hour tonkotsu broths in Shinjuku basements to vending machine ramen in Akihabara.',
      img: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=600&q=80',
      color: 'var(--sky)',
    },
    {
      tag: 'Italy',
      title: 'The Naples Pizza Pilgrimage: Ranking the Top 10 Pizzerias',
      desc: 'We ate at every legendary pizzeria in Naples so you know exactly where to go.',
      img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80',
      color: 'var(--terracotta)',
    },
    {
      tag: 'India',
      title: 'Mumbai Street Food Guide: 24 Hours, 12 Stalls',
      desc: 'Vada pav for breakfast, bhel puri at Chowpatty, and biryani at midnight.',
      img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80',
      color: 'var(--sage)',
    },
  ];

  return (
    <section className="experience-section">
      <div className="container">
        <p className="section-label">Featured Journeys</p>
        <h2 className="display-heading exp-heading">
          Food Journeys That<br /><em>Stayed With Us</em>
        </h2>
        <div className="exp-list">
          {experiences.map((exp, i) => (
            <div key={i} className="exp-item" style={{ '--accent': exp.color }}>
              <div className="exp-img-wrap">
                <img src={exp.img} alt={exp.title} />
                <div className="exp-tag">{exp.tag}</div>
              </div>
              <div className="exp-content">
                <h3>{exp.title}</h3>
                <p>{exp.desc}</p>
                <a href="#" className="exp-link">Read Story →</a>
              </div>
              <div className="exp-number">0{i + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Community Section ────────────────────────────────────────────────────── */
export function CommunitySection() {
  const quotes = [
    { text: 'Found the best bowl of pho I\'ve ever had because of this guide. The Hanoi section is incredibly detailed.', author: 'Sarah K.', location: 'London' },
    { text: 'Used Saveur Atlas for my entire Italy trip. The Naples recommendations were spot on — I ate like a local.', author: 'Marco T.', location: 'Chicago' },
    { text: 'Finally a travel site that takes food seriously. The dish origin stories are genuinely fascinating.', author: 'Priya M.', location: 'Singapore' },
  ];

  return (
    <section className="community-section">
      <div className="container">
        <div className="community-inner">
          <div className="community-left">
            <p className="section-label">Community</p>
            <h2 className="display-heading community-heading">
              Travelers Who Ate<br /><em>Their Way Through</em>
            </h2>
            <p className="community-desc">
              Join thousands of food-focused travelers sharing reviews, tips, and discoveries from every corner of the world.
            </p>
          </div>
          <div className="community-quotes">
            {quotes.map((q, i) => (
              <blockquote key={i} className="community-quote">
                <p>"{q.text}"</p>
                <footer>
                  <strong>{q.author}</strong> · {q.location}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Newsletter Section ───────────────────────────────────────────────────── */
export function NewsletterSection() {
  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-inner">
          <div className="newsletter-text">
            <p className="section-label" style={{ color: 'var(--saffron)' }}>Stay Hungry</p>
            <h2 className="display-heading nl-heading">
              The Weekly<br /><em>Food Dispatch</em>
            </h2>
            <p>New destinations, dishes, and stories — delivered every Thursday.</p>
          </div>
          <form className="newsletter-form" onSubmit={e => e.preventDefault()}>
            <div className="nl-input-group">
              <input
                type="email"
                placeholder="your@email.com"
                className="nl-input"
              />
              <button className="btn btn-saffron" type="submit">Subscribe →</button>
            </div>
            <p className="nl-note">No spam. Unsubscribe anytime.</p>
          </form>
        </div>
      </div>
    </section>
  );
}
