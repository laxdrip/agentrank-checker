import * as cheerio from 'cheerio';

const USER_AGENT = 'AgentRank-Checker/1.0 (+https://agentrank.io)';

async function fetchPage(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': USER_AGENT, 'Accept': 'text/html' },
    signal: AbortSignal.timeout(10000),
    redirect: 'follow'
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.text();
}

function extractSchemas(html) {
  const $ = cheerio.load(html);
  const schemas = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    try {
      const parsed = JSON.parse($(el).html());
      if (Array.isArray(parsed)) parsed.forEach(i => i && schemas.push(i));
      else if (parsed?.['@graph']) parsed['@graph'].forEach(i => schemas.push(i));
      else schemas.push(parsed);
    } catch {}
  });
  return schemas;
}

function findProductLinks(html, baseUrl) {
  const $ = cheerio.load(html);
  const links = new Set();
  $('a[href*="/products/"]').each((_, el) => {
    let href = $(el).attr('href');
    if (!href) return;
    if (href.startsWith('/')) href = new URL(href, baseUrl).href;
    try {
      if (new URL(href).hostname === new URL(baseUrl).hostname) links.add(href);
    } catch {}
  });
  return Array.from(links).slice(0, 3);
}

export async function analyzeStore(storeUrl) {
  let homepageHtml;
  try { homepageHtml = await fetchPage(storeUrl); }
  catch { return { error: 'Could not reach that store.' }; }

  const homepageSchemas = extractSchemas(homepageHtml);
  const productLinks = findProductLinks(homepageHtml, storeUrl);
  
  const productPages = await Promise.allSettled(
    productLinks.map(async (url) => {
      const html = await fetchPage(url);
      return { url, title: cheerio.load(html)('title').text(), schemas: extractSchemas(html) };
    })
  );

  return {
    schemas: homepageSchemas,
    productPages: productPages.filter(r => r.status === 'fulfilled').map(r => r.value)
  };
}
