import { analyzeStore } from '../../lib/storeFetcher';
import { calculateScoreFromSchema } from '../../lib/scorer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { storeUrl } = req.body;
  if (!storeUrl) return res.status(400).json({ error: 'Please provide a store URL.' });

  let url = storeUrl.trim();
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }

  try {
    const analysis = await analyzeStore(url);
    if (analysis.error) return res.status(200).json({ error: analysis.error });
    const scoring = calculateScoreFromSchema(analysis.schemas, analysis.productPages);
    res.status(200).json(scoring);
  } catch (err) {
    res.status(200).json({ error: 'Could not fetch that store. Make sure the URL is correct.' });
  }
}
