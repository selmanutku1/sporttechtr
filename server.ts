import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

// We import the data to use for OG tags
// Note: In a real production build, these might be loaded differently, 
// but for this environment, importing them directly works with tsx.
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
    app.use(vite.middlewares);
  }

  // Middleware to inject OG tags
  app.use(async (req, res, next) => {
    const url = req.url;
    
    // Check if it's a startup or news route
    let title = 'SportTech Türkiye | Spor Teknolojileri Ekosistemi';
    let description = "Türkiye'nin ve bölgenin en kapsamlı spor teknolojileri, akıllı antrenman ve performans analizi çözümleri.";
    let image = 'https://sporttech.com.tr/og-image.png';

    if (url.startsWith('/startup/')) {
      const id = url.split('/startup/')[1].split('?')[0];
      const startup = STARTUPS.find(s => s.id === id);
      if (startup) {
        title = `${startup.name} | SportTech Türkiye`;
        description = startup.tagLine || startup.description.substring(0, 160);
        image = startup.logo.startsWith('http') ? startup.logo : `https://sporttech.com.tr${startup.logo}`;
      }
    } else if (url.startsWith('/news/')) {
      const id = url.split('/news/')[1].split('?')[0];
      const article = NEWS_ARTICLES.find(a => a.id === id);
      if (article) {
        title = `${article.title} | SportTech Türkiye`;
        description = article.excerpt || article.content[0].substring(0, 160);
        image = article.coverImage.startsWith('http') ? article.coverImage : `https://sporttech.com.tr${article.coverImage}`;
      }
    }

    // Only intercept for the main HTML request
    if (req.method === 'GET' && (req.headers.accept?.includes('text/html') || !path.extname(url))) {
      try {
        let template = fs.readFileSync(
          path.resolve(__dirname, process.env.NODE_ENV === 'production' ? 'dist/index.html' : 'index.html'),
          'utf-8'
        );

        if (vite && process.env.NODE_ENV !== 'production') {
          template = await vite.transformIndexHtml(url, template);
        }

        const fullUrl = `https://sporttech.com.tr${url}`;

        // Replace OG tags with more robust regex
        const html = template
          .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
          .replace(/<meta property="og:title" content=".*?"\s*\/?>/, `<meta property="og:title" content="${title}" />`)
          .replace(/<meta property="og:description" content=".*?"\s*\/?>/, `<meta property="og:description" content="${description}" />`)
          .replace(/<meta property="og:image" content=".*?"\s*\/?>/, `<meta property="og:image" content="${image}" />`)
          .replace(/<meta property="og:url" content=".*?"\s*\/?>/, `<meta property="og:url" content="${fullUrl}" />`)
          .replace(/<meta name="description" content=".*?"\s*\/?>/, `<meta name="description" content="${description}" />`)
          .replace(/<meta property="twitter:title" content=".*?"\s*\/?>/, `<meta property="twitter:title" content="${title}" />`)
          .replace(/<meta property="twitter:description" content=".*?"\s*\/?>/, `<meta property="twitter:description" content="${description}" />`)
          .replace(/<meta property="twitter:image" content=".*?"\s*\/?>/, `<meta property="twitter:image" content="${image}" />`)
          .replace(/<meta property="twitter:url" content=".*?"\s*\/?>/, `<meta property="twitter:url" content="${fullUrl}" />`);

        return res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
      } catch (e) {
        if (vite) vite.ssrFixStacktrace(e);
        console.error(e);
        res.status(500).end(e instanceof Error ? e.message : String(e));
      }
    }

    next();
  });

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist'), { index: false }));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
