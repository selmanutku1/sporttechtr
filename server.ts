import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

import { STARTUPS } from './src/data/startups';
import { NEWS_ARTICLES } from './src/data/news';

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
      let title = 'SportTech Türkiye | Spor Teknolojileri Ekosistemi';
      let description = "Türkiye'nin ve bölgenin en kapsamlı spor teknolojileri, akıllı antrenman ve performans analizi çözümleri.";
      
      const forwardedHost = req.headers['x-forwarded-host'];
      const host = (Array.isArray(forwardedHost) ? forwardedHost[0] : forwardedHost) || req.get('host') || 'sporttech.com.tr';
      
      const forwardedProto = req.headers['x-forwarded-proto'];
      const protocol = (Array.isArray(forwardedProto) ? forwardedProto[0] : forwardedProto) || req.protocol || 'https';
      
      const baseUrl = `${protocol}://${host}`;
      let image = `${baseUrl}/og-image.png`;

      const newsMatch = url.match(/\/news\/([^/?#]+)/);
      const startupMatch = url.match(/\/startup\/([^/?#]+)/);

      if (startupMatch) {
        const id = startupMatch[1];
        const startup = STARTUPS.find(s => s.id === id);
        if (startup) {
          title = `${startup.name} | SportTech Türkiye`;
          description = startup.tagLine || startup.description.substring(0, 160);
          image = startup.logo.startsWith('http') ? startup.logo : `${baseUrl}${startup.logo}`;
        }
      } else if (newsMatch) {
        const id = newsMatch[1];
        const article = NEWS_ARTICLES.find(a => a.id === id);
        if (article) {
          title = `${article.title} | SportTech Türkiye`;
          description = article.excerpt || article.content[0].substring(0, 160);
          image = article.coverImage.startsWith('http') ? article.coverImage : `${baseUrl}${article.coverImage}`;
        }
      }

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

      const fullUrl = `${baseUrl}${url}`;

      const headContent = `
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:url" content="${fullUrl}" />
    <meta property="og:type" content="website" />
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:title" content="${title}" />
    <meta property="twitter:description" content="${description}" />
    <meta property="twitter:image" content="${image}" />
    <meta property="twitter:url" content="${fullUrl}" />
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
