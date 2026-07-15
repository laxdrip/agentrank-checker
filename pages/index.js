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
    <div className="wrapper">
      <nav className="nav">
        <div className="nav-inner">
          <div className="nav-logo">Agent<span>Rank</span></div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
            <a href="https://apps.shopify.com/agentrank" className="nav-cta">Install App</a>
          </div>
        </div>
      </nav>

      {/* DEEP LAYER 1: HERO + CHECKER */}
      <header className="hero">
        <div className="hero-badge">
          <span className="pulse-dot"></span> 2M+ Shopify stores auto-enrolled in AI Shopping
        </div>
        <h1>Is ChatGPT recommending<br />your store?</h1>
        <p className="hero-sub">Find out if AI shopping assistants can find your products. Get your AI Visibility Score in 10 seconds. No account needed.</p>

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
      </header>

      {/* DEEP LAYER 2: SOCIAL PROOF */}
      <section className="social-proof">
        <p>Trusted by modern Shopify merchants tracking their AI visibility</p>
        <div className="stats-grid">
          <div className="stat-item"><h4>2M+</h4><span>Stores Affected</span></div>
          <div className="stat-item"><h4>31/100</h4><span>Avg Store Score</span></div>
          <div className="stat-item"><h4>3.5x</h4><span>More AI Traffic</span></div>
          <div className="stat-item"><h4>100%</h4><span>Automated Fixes</span></div>
        </div>
      </section>

      {/* DEEP LAYER 3: DEEP FEATURE GRID */}
      <section id="features" className="features-section">
        <div className="section-header">
          <h2>Everything you need for AI Shopping Visibility</h2>
          <p>Stop guessing if AI can see your store. Audit, fix, and track your visibility in one platform.</p>
        </div>
        
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>AI Visibility Score</h3>
            <p>Every product gets a 0-100 score based on the exact signals ChatGPT, Perplexity, and Gemini look for. Find out instantly which products are invisible to AI.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>One-Click Auto-Fix</h3>
            <p>Don't know how to code JSON-LD schema? No problem. AgentRank generates and injects perfect structured data into your theme automatically.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📡</div>
            <h3>Live Citation Tracking</h3>
            <p>Every day, we query Perplexity's Sonar API to see if your products actually appear in AI recommendations. Watch your visibility rate climb.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Competitor Benchmarking</h3>
            <p>Add up to 3 competitors. See their AI Visibility Score side-by-side with yours. Find out exactly what schema they have that you don't.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔔</div>
            <h3>Visibility Drop Alerts</h3>
            <p>If your AI visibility drops, you need to know immediately. Get instant email alerts so you can fix issues before they cost you sales.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🏢</div>
            <h3>Agency White-Label</h3>
            <p>Manage unlimited client stores from one dashboard. Pro plan includes white-label reports for your agency branding.</p>
          </div>
        </div>
      </section>

      {/* DEEP LAYER 4: HOW IT WORKS */}
      <section className="how-it-works">
        <div className="section-header">
          <h2>From Invisible to Recommended in 3 Steps</h2>
        </div>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Install & Audit</h3>
            <p>Install AgentRank from the Shopify App Store. We instantly scan your products and give you your AI Visibility Score.</p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h3>One-Click Fix</h3>
            <p>Click "Fix All". AgentRank automatically writes the correct JSON-LD schema for reviews, shipping, and prices into your store.</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Track Citations</h3>
            <p>Watch your daily citation rate. See your products start appearing in ChatGPT and Perplexity recommendations.</p>
          </div>
        </div>
      </section>

      {/* DEEP LAYER 5: PRICING */}
      <section id="pricing" className="pricing-section">
        <div className="section-header">
          <h2>Pricing that scales with your AI growth</h2>
          <p>Start free. Upgrade when you realize how much AI traffic you're missing.</p>
        </div>
        <div className="pricing-grid">
          <div className="pricing-card">
            <h3>Free</h3>
            <div className="price">$0</div>
            <div className="price-period">Forever Free</div>
            <ul className="pricing-features">
              <li>✓ Full AI Visibility Score</li>
              <li>✓ Audit of all schema issues</li>
              <li>✓ Manual fix instructions</li>
              <li>✓ Works on any Shopify plan</li>
            </ul>
            <a href="https://apps.shopify.com/agentrank" className="btn-secondary">Get Started</a>
          </div>
          <div className="pricing-card featured">
            <div className="popular-badge">Most Popular</div>
            <h3>Growth</h3>
            <div className="price">$149<span style={{fontSize: '20px', color: '#94A3B8'}}>/mo</span></div>
            <div className="price-period">14-day free trial</div>
            <ul className="pricing-features">
              <li>✓ Everything in Free</li>
              <li>✓ One-click auto-fix engine</li>
              <li>✓ Daily Perplexity citation tracking</li>
              <li>✓ 3 Competitor benchmarks</li>
              <li>✓ Visibility drop alerts</li>
            </ul>
            <a href="https://apps.shopify.com/agentrank" className="btn-primary">Start Free Trial</a>
          </div>
          <div className="pricing-card">
            <h3>Pro / Agency</h3>
            <div className="price">$399<span style={{fontSize: '20px', color: '#94A3B8'}}>/mo</span></div>
            <div className="price-period">14-day free trial</div>
            <ul className="pricing-features">
              <li>✓ Everything in Growth</li>
              <li>✓ ChatGPT + Gemini tracking</li>
              <li>✓ Multi-store management</li>
              <li>✓ White-label reports</li>
              <li>✓ API access</li>
            </ul>
            <a href="https://apps.shopify.com/agentrank" className="btn-secondary">Start Free Trial</a>
          </div>
        </div>
      </section>

      {/* DEEP LAYER 6: FAQ */}
      <section id="faq" className="faq-section">
        <div className="section-header">
          <h2>Frequently Asked Questions</h2>
        </div>
        <div className="faq-grid">
          <div className="faq-item">
            <h4>What is AI Shopping Visibility?</h4>
            <p>When someone asks ChatGPT or Perplexity to recommend a product, the AI reads hidden code (JSON-LD schema) on your website. If your code is missing or broken, the AI ignores your store and recommends your competitor instead.</p>
          </div>
          <div className="faq-item">
            <h4>Do I need to know how to code?</h4>
            <p>No. AgentRank's auto-fix engine writes the complex JSON-LD code for you and injects it directly into your Shopify theme with one click. No developers required.</p>
          </div>
          <div className="faq-item">
            <h4>How does citation tracking work?</h4>
            <p>Every day, AgentRank asks Perplexity's Sonar AI questions related to your product categories. We check if your store is mentioned in the AI's answer or cited as a source. We then chart your visibility rate over time.</p>
          </div>
          <div className="faq-item">
            <h4>Is this just another SEO app?</h4>
            <p>No. Traditional SEO is for Google. AgentRank is GEO (Generative Engine Optimization) built specifically for ChatGPT, Perplexity, and Gemini. The signals AI uses to recommend products are different than what Google looks for.</p>
          </div>
        </div>
      </section>

      {/* DEEP LAYER 7: FINAL CTA */}
      <section className="final-cta">
        <h2>Stop losing AI shopping sales to competitors.</h2>
        <p>Find out exactly what AI bots see when they look at your store.</p>
        <a href="https://apps.shopify.com/agentrank" className="btn-primary large">Install AgentRank on Shopify — Free</a>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <div className="nav-logo">Agent<span>Rank</span></div>
          <div className="footer-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="mailto:press@agentrank.io">Press Inquiries</a>
          </div>
          <div>© {new Date().getFullYear()} AgentRank · Built by 15-year-old founders in Vancouver, BC</div>
        </div>
      </footer>
    </div>
  );
}
