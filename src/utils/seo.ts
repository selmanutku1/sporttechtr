import { Startup, NewsArticle } from '../types';

export interface SeoMetadata {
  title: string;
  description: string;
  image: string;
  url: string;
}

/**
 * Helper to ensure a valid raster Open Graph image (since LinkedIn, FB, Twitter do not support SVGs)
 */
function getRasterImage(imagePath: string | undefined, origin: string): string {
  if (!imagePath) {
    return `${origin}/og-image.png`;
  }
  
  const absoluteUrl = imagePath.startsWith('http') 
    ? imagePath 
    : `${origin}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;

  // If it's an SVG, dynamically convert it to a raster PNG using the secure, fast weserv.nl proxy
  if (absoluteUrl.toLowerCase().endsWith('.svg')) {
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return `${origin}/og-image.png`;
    }
    const cleanUrl = absoluteUrl.replace(/^https?:\/\//i, '');
    const protocol = absoluteUrl.startsWith('https') ? 'ssl:' : '';
    return `https://images.weserv.nl/?url=${protocol}${cleanUrl}&output=png`;
  }

  return absoluteUrl;
}

/**
 * Returns centralized SEO metadata based on path, language, and current list data
 */
export function getSeoMetadata(
  pathname: string,
  language: string,
  startups: Startup[],
  newsArticles: NewsArticle[],
  origin: string = 'https://sporttech.com.tr',
  selectedStartup?: Startup | null,
  selectedArticle?: NewsArticle | null
): SeoMetadata {
  // Normalize pathname: extract path without query strings or hash parameters
  const cleanPath = pathname.split('?')[0].split('#')[0];
  const normalizedPath = cleanPath.endsWith('/') && cleanPath !== '/' ? cleanPath.slice(0, -1) : cleanPath;
  const url = `${origin}${normalizedPath}`;
  
  let title = '';
  let description = '';
  let image = `${origin}/og-image.png`;

  // Matches for paths
  const newsMatch = normalizedPath.match(/\/news\/([^/?#]+)/);
  const startupMatch = normalizedPath.match(/\/startup\/([^/?#]+)/);

  // 1. Dynamic Startup Detail page
  if (selectedStartup || startupMatch) {
    const rawId = decodeURIComponent(startupMatch ? startupMatch[1] : '').toLowerCase();
    const startup = selectedStartup || startups.find(s => 
      s.id.toLowerCase() === rawId || 
      s.name.toLowerCase() === rawId ||
      s.id.toLowerCase().includes(rawId) ||
      rawId.includes(s.id.toLowerCase())
    );
    if (startup) {
      title = `${startup.name} | SportTech Türkiye`;
      description = startup.description || startup.tagLine;
      if (description.length > 165) {
        description = description.substring(0, 162) + '...';
      }
      image = getRasterImage(startup.coverImage || startup.logo, origin);
    }
  } 
  // 2. Dynamic News Detail page
  else if (selectedArticle || newsMatch) {
    const rawId = decodeURIComponent(newsMatch ? newsMatch[1] : '').toLowerCase();
    const article = selectedArticle || newsArticles.find(a => 
      a.id.toLowerCase() === rawId || 
      a.slug?.toLowerCase() === rawId ||
      a.id.toLowerCase().includes(rawId) ||
      rawId.includes(a.id.toLowerCase()) ||
      a.slug?.toLowerCase().includes(rawId) ||
      rawId.includes(a.slug?.toLowerCase() || '')
    );
    if (article) {
      title = `${article.title} | SportTech Türkiye`;
      description = article.excerpt || article.content[0].substring(0, 160);
      image = getRasterImage(article.coverImage, origin);
    }
  }

  // 3. Static Pages & Sections
  if (!title) {
    if (normalizedPath.includes('/section/startups')) {
      if (language === 'tr') {
        title = "Girişimler & Teknolojiler | SportTech Türkiye";
        description = "Spor teknolojileri ekosistemindeki akıllı antrenman, performans analizi, giyilebilir teknoloji ve yönetim yazılımları sunan lider girişimler.";
      } else if (language === 'ar') {
        title = "الشركات الناشئة والتقنيات | سبورت تيك تركيا";
        description = "الشركات التركية الرائدة التي تقدم حلولاً في مجالات التدريب الذكي، تحليل الأداء، التكنولوجيا القابلة للارتداء وإدارة الرياضة.";
      } else {
        title = "Startups & Technologies | SportTech Turkey";
        description = "The database of innovative startups shaping the future of sport technologies: smart coaching, wearable devices, and sports analytics.";
      }
    } else if (normalizedPath.includes('/section/news')) {
      if (language === 'tr') {
        title = "Sektörel Haberler & Analizler | SportTech Türkiye";
        description = "Spor ve teknolojinin kesişimindeki en son gelişmeler, yeni ürün lansmanları, yatırım turları ve derinlemesine pazar analizleri.";
      } else if (language === 'ar') {
        title = "أخبار القطاع والتحليلات | سبورت تيك تركيا";
        description = "آخر التطورات والابتكارات وجولات الاستثمار والتحليلات العميقة in تقاطع الرياضة والتكنولوجيا.";
      } else {
        title = "Industry News & Market Insights | SportTech Turkey";
        description = "Latest developments, product launches, venture capital funding rounds, and in-depth market analyses in sports tech.";
      }
    } else if (normalizedPath.includes('/section/about')) {
      if (language === 'tr') {
        title = "Hakkımızda | SportTech Türkiye";
        description = "SportTech Türkiye, ülkemizdeki spor teknolojisi ekosistemini bir araya getiren, büyüyen ve dünyaya açan bağımsız bir platformdur.";
      } else if (language === 'ar') {
        title = "من نحن | سبورت تيك تركيا";
        description = "منصة مستقلة تجمع وتنمي وتعرض منظومة التكنولوجيا الرياضية في تركيا للعالم.";
      } else {
        title = "About Us | SportTech Turkey";
        description = "About Us | SportTech Turkey";
      }
    } else if (normalizedPath.includes('/section/supporters')) {
      if (language === 'tr') {
        title = "Ekosistem Destekleyicileri & Partnerler | SportTech Türkiye";
        description = "Platformumuzun gelişimine, girişimlerin büyümesine ve spor kültürünün dijitalleşmesine katkı sağlayan lider kurumlar.";
      } else if (language === 'ar') {
        title = "الشركات الداعمة والشراكات | سبورت تيك تركيا";
        description = "المؤسسات والمنظمات التي تساهم في تطوير وتوسيع الشركات الناشئة ورقمنة الرياضة.";
      } else {
        title = "Ecosystem Supporters & Partners | SportTech Turkey";
        description = "Leading institutions and corporate partners contributing to the scale-up and digitalization of the sports tech ecosystem.";
      }
    } else if (normalizedPath.includes('/section/events')) {
      if (language === 'tr') {
        title = "Etkinlikler & Programlar | SportTech Türkiye";
        description = "Yaklaşan spor teknolojisi zirveleri, hackathonlar, yatırımcı buluşmaları ve girişim hızlandırma programları.";
      } else if (language === 'ar') {
        title = "الفعاليات والبرامج | سبورت تيك تركيا";
        description = "مؤتمرات التكنولوجيا الرياضية القادمة، والهاكاثونات، ولقاءات المستثمرين، وبرامج تسريع الشركات الناشئة.";
      } else {
        title = "Events, Summits & Acceleration Programs | SportTech Turkey";
        description = "Upcoming summits, hackathons, demo days, and incubator/accelerator programs in sports tech.";
      }
    } else {
      // Main Home view or fallback
      if (language === 'tr') {
        title = "SportTech Türkiye | Spor Teknolojileri & Performans Sistemleri";
        description = "Türkiye'nin ilk ve lider spor teknolojileri platformu. Atletik performans analiz cihazları, kuvvet platformları ve akıllı antrenman çözümleri.";
      } else if (language === 'ar') {
        title = "سبورت تيك تركيا | تكنولوجيا الرياضة وأنظمة الأداء الذكية";
        description = "المنصة الرائدة في تكنولوجيا الرياضة، وأنظمة الأداء الذكية، وحلول الرياضة الرقمية في تركيا والمنطقة.";
      } else {
        title = "SportTech Turkey | Sports Technologies & Performance Systems";
        description = "The premier independent sports technology ecosystem hub of Turkey and its region. Spotlighting elite athletic tech, analytics, and software.";
      }
    }
  }

  return { title, description, image, url };
}

/**
 * Updates DOM head tags dynamically for client-side routing
 */
export function updateSeoTags(metadata: SeoMetadata): void {
  if (typeof document === 'undefined') return;

  // Title
  document.title = metadata.title;

  // Helper function to update meta tags
  const updateMeta = (nameOrProperty: string, content: string, isProperty = false): void => {
    const selector = isProperty ? `meta[property="${nameOrProperty}"]` : `meta[name="${nameOrProperty}"]`;
    let element = document.querySelector(selector);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(isProperty ? 'property' : 'name', nameOrProperty);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  // Meta Description
  updateMeta('description', metadata.description);

  // Open Graph Tags
  updateMeta('og:title', metadata.title, true);
  updateMeta('og:description', metadata.description, true);
  updateMeta('og:image', metadata.image, true);
  updateMeta('og:url', metadata.url, true);
  updateMeta('og:type', 'website', true);

  // Twitter Tags
  updateMeta('twitter:card', 'summary_large_image', false);
  updateMeta('twitter:title', metadata.title, false);
  updateMeta('twitter:description', metadata.description, false);
  updateMeta('twitter:image', metadata.image, false);
  updateMeta('twitter:url', metadata.url, false);

  // Canonical Tag
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', metadata.url);
}
