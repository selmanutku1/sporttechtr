import express from 'express';
import path from 'path';
import fs from 'fs';
import https from 'https';
import { GoogleGenAI } from '@google/genai';

import { STARTUPS } from '../src/data/startups';
import { NEWS_ARTICLES } from '../src/data/news';
import { getSeoMetadata } from '../src/utils/seo';
import { 
  search_sporsepeti, 
  search_legislation, 
  verify_document, 
  list_sources, 
  search_global_sportstech,
  aiFunctionDeclarations 
} from '../src/services/aiTools';

// Initialize Gemini SDK with telemetry header as instructed
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

const rootDir = process.cwd();
const app = express();

// JSON Body Parser for API requests
app.use(express.json());

// Dynamic Open Graph Image PNG Proxy Route for Social Media Crawlers
app.get('/api/og-image/:type/:id.png', async (req, res) => {
  try {
    const { type, id } = req.params;
    let targetImage = '';

    if (type === 'startup') {
      const startup = STARTUPS.find(s => s.id.toLowerCase() === id.toLowerCase());
      if (startup) {
        targetImage = startup.coverImage || startup.logo;
      }
    } else if (type === 'news') {
      const article = NEWS_ARTICLES.find(a => a.id.toLowerCase() === id.toLowerCase() || a.slug?.toLowerCase() === id.toLowerCase());
      if (article) {
        targetImage = article.coverImage;
      }
    }

    // Fallback if no specific image is found
    if (!targetImage) {
      targetImage = '/og-image.png';
    }

    // If it's a relative path, make it absolute or stream local file if it's already a raster image
    const isRelative = !targetImage.startsWith('http');
    const filename = isRelative ? targetImage.replace(/^\//, '') : '';
    const extension = filename.split('.').pop()?.toLowerCase() || '';

    if (isRelative && ['png', 'jpg', 'jpeg', 'webp'].includes(extension)) {
      // Serve local static file directly for local raster images
      const filePath = path.resolve(rootDir, `public/${filename}`);
      const finalFilePath = fs.existsSync(filePath) ? filePath : path.resolve(rootDir, filename);
      if (fs.existsSync(finalFilePath)) {
        res.setHeader('Content-Type', `image/${extension === 'jpg' ? 'jpeg' : extension}`);
        res.setHeader('Cache-Control', 'public, max-age=86400');
        return fs.createReadStream(finalFilePath).pipe(res);
      }
    }

    // Get host and protocol for SVG conversion proxy
    const forwardedHost = req.headers['x-forwarded-host'];
    const host = (Array.isArray(forwardedHost) ? forwardedHost[0] : forwardedHost) || req.get('host') || 'sporttech.com.tr';
    const isLocal = host.includes('localhost') || host.includes('127.0.0.1') || host.includes(':3000');
    const protocol = isLocal ? 'http' : 'https';

    // For SVGs, proxy via weserv.nl to get high-quality PNG
    let imageUrlToConvert = targetImage;
    if (isRelative) {
      // If it's local SVG, point weserv.nl to our public absolute URL
      imageUrlToConvert = `${protocol}://${host}/${filename}`;
    }

    // Clean protocol prefix for weserv
    const cleanUrl = imageUrlToConvert.replace(/^https?:\/\//i, '');
    const useSsl = imageUrlToConvert.startsWith('https') ? 'ssl:' : '';
    const proxyUrl = `https://images.weserv.nl/?url=${useSsl}${cleanUrl}&output=png`;

    const request = https.get(proxyUrl, (proxyRes) => {
      if (proxyRes.statusCode === 200) {
        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Cache-Control', 'public, max-age=86400');
        proxyRes.pipe(res);
      } else {
        // Serve fallback og-image.png
        const fallbackPath = path.resolve(rootDir, 'public/og-image.png');
        const finalFallbackPath = fs.existsSync(fallbackPath) ? fallbackPath : path.resolve(rootDir, 'og-image.png');
        if (fs.existsSync(finalFallbackPath)) {
          res.setHeader('Content-Type', 'image/png');
          fs.createReadStream(finalFallbackPath).pipe(res);
        } else {
          res.status(500).send('Error');
        }
      }
    });

    request.on('error', (err) => {
      console.error('OG Image proxy fetch failed:', err);
      // Serve fallback og-image.png
      const fallbackPath = path.resolve(rootDir, 'public/og-image.png');
      const finalFallbackPath = fs.existsSync(fallbackPath) ? fallbackPath : path.resolve(rootDir, 'og-image.png');
      if (fs.existsSync(finalFallbackPath)) {
        res.setHeader('Content-Type', 'image/png');
        fs.createReadStream(finalFallbackPath).pipe(res);
      } else {
        res.status(500).send('Error');
      }
    });

  } catch (e) {
    console.error('OG Image endpoint failed:', e);
    // Serve fallback og-image.png
    const fallbackPath = path.resolve(rootDir, 'public/og-image.png');
    const finalFallbackPath = fs.existsSync(fallbackPath) ? fallbackPath : path.resolve(rootDir, 'og-image.png');
    if (fs.existsSync(finalFallbackPath)) {
      res.setHeader('Content-Type', 'image/png');
      fs.createReadStream(finalFallbackPath).pipe(res);
    } else {
      res.status(500).send('Error');
    }
  }
});

// Sport Tech AI Conversation Endpoint with Custom Tool Calling
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { message, history = [] } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message parameter is required.' });
    }

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'MY_GEMINI_API_KEY') {
      return res.status(500).json({
        error: 'Sistem Yapılandırma Hatası',
        details: 'GEMINI_API_KEY ortam değişkeni tanımlanmamış veya varsayılan değerde bırakılmış. Lütfen barındırma platformunun (Vercel, Render, Cloud Run, vb.) yönetim panelinden "Environment Variables" kısmına geçerli bir "GEMINI_API_KEY" ekleyip projeyi tekrar dağıtın (redeploy).'
      });
    }

    const systemInstruction = 
      "Sen Türkiye'nin öncü spor teknolojileri ekosistemi portalı olan 'SportTech Türkiye'nin yapay zeka asistanı 'Sport Tech AI'sın. " +
      "Kullanıcılara spor teknolojileri, portalımızdaki girişimler (startups), spor haberleri, sağlıklı yaşam ve egzersiz (Sporsepeti Spor Kütüphanesi aracılığıyla), " +
      "Türkiye spor mevzuatı (lisans, tescil, transfer, kulüp tescilleri vb.) ve dünya çapındaki küresel spor teknolojileri haberleri/trendleri (Sports Business Journal / SportTechie, SportsPro Media, HYPE Sports Innovation, SportsTechX, Leaders in Sport, TechCrunch vb.) konularında uzmanlaşmış, profesyonel, son derece kibar ve güvenilir Türkçe yanıtlar sunmalısın. " +
      "Eğer kullanıcı sağlıklı yaşam, egzersiz, antrenman ya da beslenme gibi genel sağlık konularında soru sorarsa 'search_sporsepeti' fonksiyonunu çağırarak arama yapmalısın. " +
      "Eğer kullanıcı spor hukuku, kulüp dernekleşmesi, lisans çıkarma, tescil, transfer şartları ya da federasyon talimatları gibi spor mevzuatı hakkında soru sorarsa " +
      "mutlaka 'search_legislation' fonksiyonu ile arama yapmalı ve bulduğun resmi kaynak maddelerini referans göstererek açıklamalısın. " +
      "Eğer kullanıcı dünyadaki spor teknolojileri, küresel spor girişimleri (startups), küresel yatırımlar, akıllı stadyum inovasyonları, giyilebilir cihazlar ya da uluslararası spor iş dünyası haberleri hakkında soru sorarsa " +
      "mutlaka 'search_global_sportstech' fonksiyonunu çağırarak aramalı ve gelen küresel trendleri/web sitelerini (SportTechie, SportsPro Media vb.) kaynak göstererek Türkçe açıklamalarla sunmalısın. " +
      "Gerekirse 'list_sources' ile hangi kaynakların tescilli olduğunu gösterebilir ve 'verify_document' ile kanunun canlı/güncel halini teyit edebilirsin. " +
      "Daima çok profesyonel, dost canlısı bir tonda konuş. Sorularda doğrudan arama sonuçlarını harmanla ve kullanıcılara aktar.";

    // Initialize the contents array for the request
    const contents = [...history, { role: 'user', parts: [{ text: message }] }];

    // Make the initial call to Gemini
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
      config: {
        systemInstruction,
        tools: [{ functionDeclarations: aiFunctionDeclarations }]
      }
    });

    const functionCalls = response.functionCalls;
    
    // If the model wants to call one or more tools, we execute them and send back the results
    if (functionCalls && functionCalls.length > 0) {
      // Prepare contents for the second turn: add the model's function call message
      const modelContent = response.candidates?.[0]?.content;
      if (modelContent) {
        contents.push(modelContent);
      }

      const functionResponsesParts = [];
      
      for (const call of functionCalls) {
        let result = '';
        const args: any = call.args || {};
        
        if (call.name === 'search_sporsepeti') {
          result = search_sporsepeti(args.query, args.kategori);
        } else if (call.name === 'search_legislation') {
          result = search_legislation(args.query, args.kaynak_filtresi);
        } else if (call.name === 'search_global_sportstech') {
          result = search_global_sportstech(args.query);
        } else if (call.name === 'verify_document') {
          result = verify_document(args.url);
        } else if (call.name === 'list_sources') {
          result = list_sources();
        }

        functionResponsesParts.push({
          functionResponse: {
            name: call.name,
            response: { result }
          }
        });
      }

      // Add the tool execution response to the contents
      contents.push({
        role: 'tool',
        parts: functionResponsesParts
      });

      // Query Gemini again with the tool outputs to obtain the final user-facing response
      const finalResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents,
        config: {
          systemInstruction,
          tools: [{ functionDeclarations: aiFunctionDeclarations }]
        }
      });

      return res.json({ text: finalResponse.text || 'Üzgünüm, şu an yanıt üretemiyorum.' });
    }

    return res.json({ text: response.text || 'Üzgünüm, şu an yanıt üretemiyorum.' });

  } catch (error: any) {
    console.error('Sport Tech AI Error:', error);
    return res.status(500).json({ 
      error: 'Yapay zeka asistanı şu anda yanıt veremiyor. Lütfen daha sonra tekrar deneyiniz.',
      details: error?.message || String(error)
    });
  }
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

    const indexPath = path.resolve(rootDir, 'dist/index.html');
    const backupIndexPath = path.resolve(rootDir, 'index.html');
    const finalIndexPath = fs.existsSync(indexPath) ? indexPath : backupIndexPath;

    if (!fs.existsSync(finalIndexPath)) {
      return res.status(404).send('index.html not found');
    }

    let template = fs.readFileSync(finalIndexPath, 'utf-8');

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
    console.error(e);
    res.status(500).end(e instanceof Error ? e.message : String(e));
  }
});

export default app;
