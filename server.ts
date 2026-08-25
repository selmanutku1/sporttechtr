import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

import { STARTUPS } from './src/data/startups';
import { NEWS_ARTICLES } from './src/data/news';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  let vite: any;
  if (process.env.NODE_ENV !== 'production') {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    // Mount Vite middleware first so it can serve client scripts, assets and hot-module reloads correctly
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    const resolvedDist = fs.existsSync(distPath) ? distPath : __dirname;
    app.use(express.static(resolvedDist, { index: false }));
  }

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
      
      const host = req.get('host') || 'sporttech.com.tr';
      const protocol = req.headers['x-forwarded-proto'] || req.protocol || 'https';
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
        ? path.resolve(__dirname, 'dist/index.html')
        : path.resolve(__dirname, 'index.html');

      const finalIndexPath = fs.existsSync(indexPath) ? indexPath : path.resolve(__dirname, 'index.html');

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
        .replace(/<meta[^>]+property=["\']og:(title|description|image|url|type)["\'][^>]*\/?>/gi, '')
        .replace(/<meta[^>]+name=["\']description["\'][^>]*\/?>/gi, '')
        .replace(/<meta[^>]+property=["\']twitter:(title|description|image|url|card)["\'][^>]*\/?>/gi, '');

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
