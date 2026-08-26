import express from 'express';
import path from 'path';
import fs from 'fs';

import { STARTUPS } from '../src/data/startups';
import { NEWS_ARTICLES } from '../src/data/news';
import { getSeoMetadata } from '../src/utils/seo';

const rootDir = process.cwd();
const app = express();

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
    
    const forwardedProto = req.headers['x-forwarded-proto'];
    const protocol = (Array.isArray(forwardedProto) ? forwardedProto[0] : forwardedProto) || req.protocol || 'https';
    
    const baseUrl = `${protocol}://${host}`;

    // Detect language from query parameter, cookies, headers, or default 'tr'
    const langParam = req.query.lang;
    const language = typeof langParam === 'string' && ['tr', 'en-US', 'en-GB', 'ar'].includes(langParam)
      ? langParam
      : 'tr';

    // Retrieve centralized SEO metadata
    const metadata = getSeoMetadata(url, language, STARTUPS, NEWS_ARTICLES, baseUrl);

    const indexPath = path.resolve(rootDir, 'dist/index.html');
    const backupIndexPath = path.resolve(rootDir, 'index.html');
    const finalIndexPath = fs.existsSync(indexPath) ? indexPath : backupIndexPath;

    if (!fs.existsSync(finalIndexPath)) {
      return res.status(404).send('index.html not found');
    }

    let template = fs.readFileSync(finalIndexPath, 'utf-8');

    const headContent = `
    <title>${metadata.title}</title>
    <meta name="description" content="${metadata.description}" />
    <meta property="og:title" content="${metadata.title}" />
    <meta property="og:description" content="${metadata.description}" />
    <meta property="og:image" content="${metadata.image}" />
    <meta property="og:url" content="${metadata.url}" />
    <meta property="og:type" content="website" />
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:title" content="${metadata.title}" />
    <meta property="twitter:description" content="${metadata.description}" />
    <meta property="twitter:image" content="${metadata.image}" />
    <meta property="twitter:url" content="${metadata.url}" />
`;

    let html = template
      .replace(/<title>.*?<\/title>/i, '')
      .replace(/<meta[^>]+(?:property|name)=["\']og:(title|description|image|url|type)["\'][^>]*\/?>/gi, '')
      .replace(/<meta[^>]+name=["\']description["\'][^>]*\/?>/gi, '')
      .replace(/<meta[^>]+(?:property|name)=["\']twitter:(title|description|image|url|card)["\'][^>]*\/?>/gi, '');

    html = html.replace('<head>', `<head>${headContent}`);

    return res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  } catch (e) {
    console.error(e);
    res.status(500).end(e instanceof Error ? e.message : String(e));
  }
});

export default app;
