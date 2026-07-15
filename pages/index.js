import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function checkStore(e) {
    e.preventDefault();
    setLoading(true); setError(null); setResult(null);
    try {
      const res = await fetch('/api/check-store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ storeUrl: url }),
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else setResult(data);
    } catch { setError('Something went wrong.'); }
    setLoading(false);
  }

  const scoreColor = result ? (result.score >= 70 ? '#00E5A0' : result.score >= 40 ? '#FFB800' : '#FF4D4D') : '#00E5A0';

  return (
    <div className="wrapper">
      <nav className="nav">
        <div className="nav-inner">
          <div className="nav-logo">Agent<span>Rank</span></div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="https://apps.shopify.com/agentrank" className="nav-cta">Install App</a>
          </div>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-left">
          <div className="hero-badge">● Live AI Shopping Tracker</div>
          <h1>Is ChatGPT <span>recommending</span> your store?</h1>
          <p className="hero-sub">Shopify auto-enrolled 2M+ stores in AI shopping. But most are invisible to ChatGPT and Perplexity due to missing structured data. Find out your AI Visibility Score instantly.</p>
          
          <form onSubmit={checkStore} className="checker-form">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://your-store.myshopify.com"
              required
              className="checker-input"
            />
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Analyzing...' : 'Scan Store'}
            </button>
          </form>

          {error && <div className="error-banner">{error}</div>}
        </div>

        <div className="hero-right">
          <div className="mock-dashboard">
            <div className="mock-header">
              <div>
                <div className="mock-title">Overall AI Visibility</div>
                <div className="mock-score">41<span style={{fontSize: '20px', color: '#5C5F66'}}>/100</span></div>
              </              <div className="mock-title">Needs Work</div>
            </div>
            <div className="mock-progress"><span></span></div>
            <div className="mock-list">
              <div className="mock-item"><div className="mock-dot"></div> Missing Review Schema (aggregateRating)</div>
              <div className="mock-item"><div className="mock-dot"></div> Missing Shipping Details markup</div>
              <div className="mock-item"><div className="mock-dot"></div> Vague Product Title detected</div>
            </div>
          </div>
        </div>
      </header>

      {result && (
        <section style={{maxWidth: '1200px', margin: '0 auto', padding: '0 24px 80px'}}>
          <div className="results-container">
            <div className="score-display">
              <div className="score-circle" style={{ color: scoreColor, borderColor: scoreColor }}>
                {result.score}
              </div>
              <div className="score-label">Your AI Visibility Score</div>
            </div>

            <div className="issues-grid">
              {result.issues.length > 0 && (
                <div className="issues-list">
                  <h3>Critical Issues Detected</h3>
                  {result.issues.slice(0, 4).map((issue, i) => (
                    <div key={i} className="issue-card">
                      <div className="issue-header">
                        <span className="icon-x">✗</span>
                        <span>{issue.label}</span>
                        <span className="points-lost">-{issue.points} pts</span>
                      </div>
                      <div className="issue-fix">{issue.fix}</div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="cta-box">
                <h3>Fix Everything Automatically</h3>
                <p>Install AgentRank to auto-generate perfect JSON-LD schema, track Perplexity citations, and beat your competitors in AI search.</p>
                <a href="https://apps.shopify.com/agentrank" className="btn-primary large">Install AgentRank — Free</a>
                <div className="trust-badge">✓ Free Plan Available</div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section id="features" className="section">
        <div className="section-header">
          <span className="section-tag">Platform</span>
          <h2>Everything you need for AI visibility.</h2>
          <p>Stop guessing if AI can see your store. Audit, fix, and track your presence in generative search.</p>
        </div>
        
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
            </div>
            <h3>AI Visibility Score</h3>
            <p>Every product gets a 0-100 score based on what ChatGPT, Perplexity, and Gemini look for. Find out instantly which products are invisible.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            </div>
            <h3>One-Click Auto-Fix</h3>
            <p>Don't know JSON-LD schema? No problem. AgentRank generates and injects perfect structured data into your theme automatically.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            </div>
            <h3>Live Citation Tracking</h3>
            <p>Every day, we query Perplexity's API to see if your products appear in AI recommendations. Watch your visibility rate climb.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <h3>Competitor Benchmarking</h3>
            <p>Add up to 3 competitors. See their AI Visibility Score side-by-side with yours. Find out exactly what schema they have that you don't.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            </div>
            <h3>Visibility Drop Alerts</h3>
            <p>If your AI visibility drops, you need to know immediately. Get instant email alerts so you can fix issues before they cost you sales.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
            </div>
            <h3>Agency White-Label</h3>
            <p>Manage unlimited client stores from one dashboard. Pro plan includes white-label reports for your agency branding.</p>
          </div>
        </div>
      </section>

      <section className="section" style={{background: 'var(--bg-2)'}}>
        <div className="section-header">
          <span className="section-tag">Process</span>
          <h2>From invisible to recommended in 3 steps.</h2>
        </div>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">01</div>
            <h3>Install & Audit</h3>
            <p>Install AgentRank from the Shopify App Store. We instantly scan your products and give you your AI Visibility Score.</p>
          </div>
          <div className="step-card">
            <div className="step-number">02</div>
            <h3>One-Click Fix</h3>
            <p>Click "Fix All". AgentRank automatically writes the correct JSON-LD schema for reviews, shipping, and prices into your store.</p>
          </div>
          <div className="step-card">
            <div className="step-number">03</div>
            <h3>Track Citations</h3>
            <p>Watch your daily citation rate. See your products start appearing in ChatGPT and Perplexity recommendations.</p>
          </div>
        </div>
      </section>

      <section id="pricing" className="section">
        <div className="section-header">
          <span className="section-tag">Pricing</span>
          <h2>Simple, scalable pricing.</h2>
          <p>Start free. Upgrade when you realize how much AI traffic you're missing.</p>
        </div>
        <div className="pricing-grid">
          <div className="pricing-card">
            <h3>Free</h3>
            <div className="price">$0</div>
            <div className="price-period">Forever Free</div>
            <ul className="pricing-features">
              <li>Full AI Visibility Score</li>
              <li>Audit of all schema issues</li>
              <li>Manual fix instructions</li>
              <li>Works on any Shopify plan</li>
            </ul>
            <a href="https://apps.shopify.com/agentrank" className="btn-secondary">Get Started</a>
          </div>
          <div className="pricing-card featured">
            <h3>Growth</h3>
            <div className="price">$149<span style={{fontSize: '16px', color: '#5C5F66'}}>/mo</span></div>
            <div className="price-period">14-day free trial</div>
            <ul className="pricing-features">
              <li>Everything in Free</li>
              <li>One-click auto-fix engine</li>
              <li>Daily Perplexity citation tracking</li>
              <li>3 Competitor benchmarks</li>
              <li>Visibility drop alerts</li>
            </ul>
            <a href="https://apps.shopify.com/agentrank" className="btn-primary">Start Free Trial</a>
          </div>
          <div className="pricing-card">
            <h3>Pro / Agency</h3>
            <div className="price">$399<span style={{fontSize: '16px', color: '#5C5F66'}}>/mo</span></div>
            <div className="price-period">14-day free trial</div>
            <ul className="pricing-features">
              <li>Everything in Growth</li>
              <li>ChatGPT + Gemini tracking</li>
              <li>Multi-store management</li>
              <li>White-label reports</li>
              <li>API access</li>
            </ul>
            <a href="https://apps.shopify.com/agentrank" className="btn-secondary">Start Free Trial</a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <div className="nav-logo">Agent<span>Rank</span></div>
          <div className="footer-links">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="mailto:press@agentrank.io">Press</a>
          </div>
          <div className="footer-copy">© {new Date().getFullYear()} AgentRank · Vancouver, BC</div>
        </div>
      </footer>
    </div>
  );
}
