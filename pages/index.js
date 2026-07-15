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

  const scoreColor = result ? (result.score >= 70 ? '#10B981' : result.score >= 40 ? '#F59E0B' : '#EF4444') : '#fff';

  return (
    <div className="container">
      <nav className="nav">
        <div className="nav-inner">
          <div className="nav-logo">Agent<span>Rank</span></div>
          <div className="nav-links">
            <a href="https://apps.shopify.com/agentrank" className="nav-cta">Install Free</a>
          </div>
        </div>
      </nav>

      <div className="hero">
        <div className="hero-badge">2M+ Shopify stores enrolled in AI shopping</div>
        <h1>Is ChatGPT recommending<br />your store?</h1>
        <p>Find out if AI shopping assistants can find your products. Free. Takes 10 seconds.</p>

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
            {loading ? 'Checking...' : 'Check Free →'}
          </button>
        </form>

        {error && <div style={{ marginTop: 16, color: '#F87171' }}>{error}</div>}

        {result && (
          <div className="results">
            <div className="score-display">
              <div className="score-circle" style={{ color: scoreColor, borderColor: scoreColor }}>
                {result.score}
              </div>
              <div style={{ color: 'var(--muted)', marginTop: 10, fontSize: 13 }}>AI Visibility Score / 100</div>
            </div>

            {result.issues.length > 0 && (
              <>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 15, marginBottom: 12 }}>Issues Hurting Your AI Visibility</h3>
                {result.issues.map((issue, i) => (
                  <div key={i} className="issue-card">
                    <div className="issue-header">
                      <span style={{ color: 'var(--red)' }}>✗</span>
                      <span>{issue.label}</span>
                      <span style={{ marginLeft: 'auto', color: 'var(--dim)', fontSize: 12 }}>-{issue.points} pts</span>
                    </div>
                    <div className="issue-fix">{issue.fix}</div>
                  </div>
                ))}
              </>
            )}

            <div className="cta-box">
              <div style={{ color: 'var(--accent)', fontWeight: 600, marginBottom: 10 }}>
                Fix all {result.issues.length} issues automatically
              </div>
              <a href="https://apps.shopify.com/agentrank" className="btn-primary" style={{ display: 'inline-block' }}>
                Install AgentRank — Free on Shopify
              </a>
            </div>
          </div>
        )}
      </div>

      <footer className="footer">
        <div>© {new Date().getFullYear()} AgentRank · Built in Vancouver, BC</div>
      </footer>
    </div>
  );
}
