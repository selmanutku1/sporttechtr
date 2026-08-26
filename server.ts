import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

import { STARTUPS } from './src/data/startups';
import { NEWS_ARTICLES } from './src/data/news';
import { getSeoMetadata } from './src/utils/seo';

const rootDir = process.cwd();

async function startServer() {
  const app = express();
  const PORT = 3000;

  let vite: any;
  if (process.env.NODE_ENV !== 'production') {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    // Mount Vite middleware first so it can serve client scripts, assets and hot-module reloads correctly
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(rootDir, 'dist');
    app.use(express.static(distPath, { index: false }));
  }

  // Dynamic XML Sitemap Generator Route
  app.get('/sitemap.xml', (req, res) => {
    const forwardedHost = req.headers['x-forwarded-host'];
    const host = (Array.isArray(forwardedHost) ? forwardedHost[0] : forwardedHost) || req.get('host') || 'sporttech.com.tr';
    const forwardedProto = req.headers['x-forwarded-proto'];
    const protocol = (Array.isArray(forwardedProto) ? forwardedProto[0] : forwardedProto) || req.protocol || 'https';
    const baseUrl = `${protocol}://${host}`;

    const currentDate = new Date().toISOString().split('T')[0];

    // Main section/index pages
    const staticPages = [
      { path: '', priority: '1.0', changefreq: 'daily' },
      { path: 'section/startups', priority: '0.8', changefreq: 'weekly' },
      { path: 'section/news', priority: '0.8', changefreq: 'weekly' },
      { path: 'section/about', priority: '0.8', changefreq: 'weekly' },
      { path: 'section/supporters', priority: '0.8', changefreq: 'weekly' },
      { path: 'section/events', priority: '0.8', changefreq: 'weekly' },
    ];

    let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    sitemapXml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // 1. Static Pages
    staticPages.forEach(p => {
      const urlPath = p.path ? `/${p.path}` : '';
      sitemapXml += `  <url>\n`;
      sitemapXml += `    <loc>${baseUrl}${urlPath}</loc>\n`;
      sitemapXml += `    <lastmod>${currentDate}</lastmod>\n`;
      sitemapXml += `    <changefreq>${p.changefreq}</changefreq>\n`;
      sitemapXml += `    <priority>${p.priority}</priority>\n`;
      sitemapXml += `  </url>\n`;
    });

    // 2. Dynamic Approved Startups
    STARTUPS.forEach(startup => {
      sitemapXml += `  <url>\n`;
      sitemapXml += `    <loc>${baseUrl}/startup/${startup.id}</loc>\n`;
      sitemapXml += `    <lastmod>${currentDate}</lastmod>\n`;
      sitemapXml += `    <changefreq>monthly</changefreq>\n`;
      sitemapXml += `    <priority>0.7</priority>\n`;
      sitemapXml += `  </url>\n`;
    });

    // 3. Dynamic Active News Articles
    NEWS_ARTICLES.filter(a => a.status !== 'passive').forEach(article => {
      sitemapXml += `  <url>\n`;
      sitemapXml += `    <loc>${baseUrl}/news/${article.id}</loc>\n`;
      sitemapXml += `    <lastmod>${currentDate}</lastmod>\n`;
      sitemapXml += `    <changefreq>monthly</changefreq>\n`;
      sitemapXml += `    <priority>0.7</priority>\n`;
      sitemapXml += `  </url>\n`;
    });

    sitemapXml += `</urlset>\n`;

    res.header('Content-Type', 'application/xml');
    res.status(200).send(sitemapXml);
  });

  // Catch-all route to serve index.html with dynamically injected SEO/OG tags
  app.get('*', async (req, res, next) => {
    const url = req.originalUrl || req.url;
    
    // Ignore requests for files with extensions (just in case they fall through)
    if (path.extname(url)) {
      return next();
    }

    try {
      const forwardedHost = req.headers['x-forwarded-host'];
      const host = (Array.isArray(forwardedHost) ? forwardedHost[0] : forwardedHost) || req.get('host') || 'sporttech.com.tr';
      
      // Auto-detect localhost vs remote domains, defaulting to secure https for production
      const isLocal = host.includes('localhost') || host.includes('127.0.0.1') || host.includes(':3000');
      const protocol = isLocal ? 'http' : 'https';
      
      const baseUrl = `${protocol}://${host}`;

      // Detect language from query parameter, cookies, headers, or default 'tr'
      const langParam = req.query.lang;
      const language = typeof langParam === 'string' && ['tr', 'en-US', 'en-GB', 'ar'].includes(langParam)
        ? langParam
        : 'tr';

      // Retrieve centralized SEO metadata
      const metadata = getSeoMetadata(url, language, STARTUPS, NEWS_ARTICLES, baseUrl);

      const escapeHtmlAttr = (unsafe: string) => {
        return unsafe
          .replace(/&/g, '&amp;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
      };

      const escapedTitle = escapeHtmlAttr(metadata.title);
      const escapedDesc = escapeHtmlAttr(metadata.description);
      const escapedImage = escapeHtmlAttr(metadata.image);
      const escapedUrl = escapeHtmlAttr(metadata.url);

      const indexPath = process.env.NODE_ENV === 'production'
        ? path.resolve(rootDir, 'dist/index.html')
        : path.resolve(rootDir, 'index.html');

      const finalIndexPath = fs.existsSync(indexPath) ? indexPath : path.resolve(rootDir, 'index.html');

      if (!fs.existsSync(finalIndexPath)) {
        return res.status(404).send('index.html not found');
      }

      let template = fs.readFileSync(finalIndexPath, 'utf-8');

      if (vite && process.env.NODE_ENV !== 'production') {
        template = await vite.transformIndexHtml(url, template);
      }

      const headContent = `
    <title>${escapedTitle}</title>
    <meta name="description" content="${escapedDesc}" />
    <meta property="og:title" content="${escapedTitle}" />
    <meta property="og:description" content="${escapedDesc}" />
    <meta property="og:image" content="${escapedImage}" />
    <meta property="og:url" content="${escapedUrl}" />
    <meta property="og:type" content="website" />
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:title" content="${escapedTitle}" />
    <meta property="twitter:description" content="${escapedDesc}" />
    <meta property="twitter:image" content="${escapedImage}" />
    <meta property="twitter:url" content="${escapedUrl}" />
`;

      let html = template
        .replace(/<title>.*?<\/title>/i, '')
        .replace(/<meta[^>]+(?:property|name)=["\']og:(title|description|image|url|type)["\'][^>]*\/?>/gi, '')
        .replace(/<meta[^>]+name=["\']description["\'][^>]*\/?>/gi, '')
        .replace(/<meta[^>]+(?:property|name)=["\']twitter:(title|description|image|url|card)["\'][^>]*\/?>/gi, '');

      html = html.replace('<head>', `<head>${headContent}`);

      return res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      if (vite) vite.ssrFixStacktrace(e);
      console.error(e);
      res.status(500).end(e instanceof Error ? e.message : String(e));
    }
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
