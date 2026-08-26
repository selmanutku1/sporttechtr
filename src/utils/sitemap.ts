import { Startup, NewsArticle } from '../types';

/**
 * Dynamically generates a sitemap.xml string based on static routes, approved startups, and active news articles.
 * @param approvedStartups Array of approved startups
 * @param newsArticles Array of news articles
 * @param origin The base URL of the website
 */
export function generateSitemapXml(
  approvedStartups: Startup[],
  newsArticles: NewsArticle[],
  origin: string = 'https://sporttech.com.tr'
): string {
  const currentDate = new Date().toISOString().split('T')[0];

  const staticPages = [
    { path: '', priority: '1.0', changefreq: 'daily' },
    { path: 'section/startups', priority: '0.8', changefreq: 'weekly' },
    { path: 'section/news', priority: '0.8', changefreq: 'weekly' },
    { path: 'section/about', priority: '0.8', changefreq: 'weekly' },
    { path: 'section/supporters', priority: '0.8', changefreq: 'weekly' },
    { path: 'section/events', priority: '0.8', changefreq: 'weekly' },
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // 1. Static Pages
  staticPages.forEach(p => {
    const urlPath = p.path ? `/${p.path}` : '';
    xml += `  <url>\n`;
    xml += `    <loc>${origin}${urlPath}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${p.changefreq}</changefreq>\n`;
    xml += `    <priority>${p.priority}</priority>\n`;
    xml += `  </url>\n`;
  });

  // 2. Approved Startups
  approvedStartups.forEach(startup => {
    xml += `  <url>\n`;
    xml += `    <loc>${origin}/startup/${startup.id}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += `  </url>\n`;
  });

  // 3. Active News Articles
  newsArticles
    .filter(article => article.status !== 'passive')
    .forEach(article => {
      xml += `  <url>\n`;
      xml += `    <loc>${origin}/news/${article.id}</loc>\n`;
      xml += `    <lastmod>${currentDate}</lastmod>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.7</priority>\n`;
      xml += `  </url>\n`;
    });

  xml += `</urlset>\n`;
  return xml;
}
