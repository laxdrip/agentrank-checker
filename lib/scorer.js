const SCORING_RULES = [
  { key: 'productSchema', points: 15, label: 'Product structured data present', fix: 'Add JSON-LD with @type: Product to your pages' },
  { key: 'aggregateRating', points: 20, label: 'Review schema (aggregateRating)', fix: 'Add aggregateRating with ratingValue and reviewCount' },
  { key: 'offers', points: 15, label: 'Price and availability in schema', fix: 'Add offers with price and availability' },
  { key: 'titleQuality', points: 10, label: 'Descriptive product title', fix: 'Rename to include: who its for, what it does' },
  { key: 'description', points: 10, label: 'Detailed description (200+ chars)', fix: 'Write a longer description' },
  { key: 'brand', points: 8, label: 'Brand information in schema', fix: 'Add brand.name field to schema' },
  { key: 'gtin', points: 8, label: 'Product barcode (GTIN)', fix: 'Add barcodes to product variants' },
  { key: 'shipping', points: 7, label: 'Shipping details markup', fix: 'Add OfferShippingDetails' },
  { key: 'images', points: 5, label: 'Multiple product images (3+)', fix: 'Add at least 3 photos' },
  { key: 'faqSchema', points: 2, label: 'FAQ schema present', fix: 'Add FAQPage schema' },
];

export function calculateScoreFromSchema(schemas = [], productPages = []) {
  const allSchemas = [...schemas, ...productPages.flatMap(p => p.schemas || [])];
  const productSchema = allSchemas.find(s => s['@type'] === 'Product');
  const checks = {};
  const issues = [];
  const passed = [];

  checks.productSchema = !!productSchema;
  checks.aggregateRating = !!(productSchema?.aggregateRating?.ratingValue && productSchema?.aggregateRating?.reviewCount);
  checks.offers = !!(productSchema?.offers?.price && productSchema?.offers?.availability);
  const title = productSchema?.name || productPages[0]?.title || '';
  checks.titleQuality = title.split(' ').length >= 5 && title.length >= 30;
  const desc = productSchema?.description || '';
  checks.description = desc.length >= 200;
  checks.brand = !!productSchema?.brand?.name;
  checks.gtin = !!(productSchema?.gtin || productSchema?.mpn || productSchema?.sku);
  checks.shipping = !!(productSchema?.offers?.shippingDetails || productSchema?.shippingDetails);
  const imgCount = Array.isArray(productSchema?.image) ? productSchema.image.length : (productSchema?.image ? 1 : 0);
  checks.images = imgCount >= 3;
  checks.faqSchema = allSchemas.some(s => s['@type'] === 'FAQPage');

  let score = 0;
  SCORING_RULES.forEach(rule => {
    if (checks[rule.key]) { score += rule.points; passed.push({ label: rule.label, points: rule.points }); }
    else { issues.push({ label: rule.label, points: rule.points, fix: rule.fix }); }
  });

  return { score: Math.max(0, Math.min(100, score)), issues: issues.sort((a,b) => b.points - a.points), passed, hasProductSchema: checks.productSchema };
}
