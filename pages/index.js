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

  const scoreColor = result ? (result.score >= 70 ? '#10B981' : result.score >= 40 ? '#F59E0B' : '#EF4444') : '#06B6D4';

  return (
    <div className="container">
      <nav className="nav">
        <div className="nav-inner">
          <div className="nav-logo">Agent<span>Rank</span></div>
          <div className="nav-links">
            <a href="https://apps.shopify.com/agentrank" className="nav-cta">Install App</a>
          </div>
        </div>
      </nav>

      <div className="hero">
        <div className="hero-badge">
          <span className="pulse-dot"></span> 2M+ Shopify stores auto-enrolled in AI Shopping
        </div>
        <h1>Is ChatGPT recommending<br />your store?</h1>
        <p className="hero-sub">Find out if AI shopping assistants can find your products. Get your AI Visibility Score in 10 seconds.</p>

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
            {loading ? 'Analyzing Store...' : 'Check My Score →'}
          </button>
        </form>

        {error && <div className="error-banner">{error}</div>}

        {result && (
          <div className="results-container">
            <div className="score-display">
              <div className="score-circle" style={{ color: scoreColor, borderColor: scoreColor, boxShadow: `0 0 40px ${scoreColor}40` }}>
                {result.score}
              </div>
              <div className="score-label">AI Visibility Score / 100</div>
            </div>

            <div className="issues-grid">
              {result.issues.length > 0 && (
                <div className="issues-list">
                  <h3>Critical Issues Hurting You</h3>
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
                <div className="trust-badge">✓ Free Plan Available ✓ No Credit Card Required</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
