import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css';

/* ── LoginPage ────────────────────────────────────────────────────────────── */
export function LoginPage() {
  const { login } = useAuth();
  const navigate  = useNavigate();
  const [form, setForm]   = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      await login(form);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-visual">
        <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80" alt="" />
        <div className="auth-visual-overlay">
          <p className="auth-visual-quote">
            "Tell me what you eat, and I'll tell you who you are."
          </p>
          <span className="auth-visual-attr">— Brillat-Savarin</span>
        </div>
      </div>

      <div className="auth-form-panel">
        <div className="auth-form-inner">
          <Link to="/" className="auth-logo">
            <span>✦</span> Saveur Atlas
          </Link>
          <h1 className="auth-heading">Welcome back</h1>
          <p className="auth-sub">Sign in to access your saved destinations and reviews.</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Username or email</label>
              <input
                type="text"
                placeholder="username or email"
                value={form.username}
                onChange={e => setForm({ ...form, username: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
            {error && <p className="auth-error">{error}</p>}
            <button className="btn btn-saffron auth-submit" type="submit" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign In →'}
            </button>
          </form>

          <p className="auth-switch">
            New here? <Link to="/register">Create a free account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── RegisterPage ─────────────────────────────────────────────────────────── */
export function RegisterPage() {
  const { register } = useAuth();
  const navigate     = useNavigate();
  const [form, setForm]   = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      await register(form);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  if (success) return (
    <div className="auth-page">
      <div className="auth-visual">
        <img src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=80" alt="" />
      </div>
      <div className="auth-form-panel">
        <div className="auth-form-inner">
          <div className="success-state">
            <div className="success-icon">✦</div>
            <h2>Check your email!</h2>
            <p>We've sent a verification link to <strong>{form.email}</strong>. Verify your email to start exploring.</p>
            <Link to="/login" className="btn btn-saffron" style={{ marginTop: 'var(--sp-xl)' }}>
              Go to Sign In →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="auth-page">
      <div className="auth-visual">
        <img src="https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=80" alt="" />
        <div className="auth-visual-overlay">
          <p className="auth-visual-quote">
            "One cannot think well, love well, sleep well, if one has not dined well."
          </p>
          <span className="auth-visual-attr">— Virginia Woolf</span>
        </div>
      </div>

      <div className="auth-form-panel">
        <div className="auth-form-inner">
          <Link to="/" className="auth-logo">
            <span>✦</span> Saveur Atlas
          </Link>
          <h1 className="auth-heading">Join free</h1>
          <p className="auth-sub">Start saving destinations and sharing your food stories.</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                placeholder="hungry_traveler"
                value={form.username}
                onChange={e => setForm({ ...form, username: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
            {error && <p className="auth-error">{error}</p>}
            <button className="btn btn-saffron auth-submit" type="submit" disabled={loading}>
              {loading ? 'Creating account…' : 'Create Account →'}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
