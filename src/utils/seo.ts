import { Startup, NewsArticle } from '../types';

export interface SeoMetadata {
  title: string;
  description: string;
  image: string;
  url: string;
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
  // Normalize pathname: remove trailing slash except root
  const cleanPath = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname;
  const url = `${origin}${cleanPath}`;
  
  let title = '';
  let description = '';
  let image = `${origin}/og-image.png`;

  // Matches for paths
  const newsMatch = cleanPath.match(/\/news\/([^/?#]+)/);
  const startupMatch = cleanPath.match(/\/startup\/([^/?#]+)/);

  // 1. Dynamic Startup Detail page
  if (selectedStartup || startupMatch) {
    const startup = selectedStartup || (startupMatch ? startups.find(s => s.id === startupMatch[1]) : null);
    if (startup) {
      title = `${startup.name} | SportTech Türkiye`;
      description = startup.tagLine || startup.description.substring(0, 160);
      image = startup.logo.startsWith('http') ? startup.logo : `${origin}${startup.logo}`;
    }
  } 
  // 2. Dynamic News Detail page
  else if (selectedArticle || newsMatch) {
    const article = selectedArticle || (newsMatch ? newsArticles.find(a => a.id === newsMatch[1]) : null);
    if (article) {
      title = `${article.title} | SportTech Türkiye`;
      description = article.excerpt || article.content[0].substring(0, 160);
      image = article.coverImage.startsWith('http') ? article.coverImage : `${origin}${article.coverImage}`;
    }
  }

  // 3. Static Pages & Sections
  if (!title) {
    if (cleanPath.includes('/section/startups')) {
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
    } else if (cleanPath.includes('/section/news')) {
      if (language === 'tr') {
        title = "Sektörel Haberler & Analizler | SportTech Türkiye";
        description = "Spor ve teknolojinin kesişimindeki en son gelişmeler, yeni ürün lansmanları, yatırım turları ve derinlemesine pazar analizleri.";
      } else if (language === 'ar') {
        title = "أخبار القطاع والتحليلات | سبورت تيك تركيا";
        description = "آخر التطورات والابتكارات وجولات الاستثمار والتحليلات العميقة في تقاطع الرياضة والتكنولوجيا.";
      } else {
        title = "Industry News & Market Insights | SportTech Turkey";
        description = "Latest developments, product launches, venture capital funding rounds, and in-depth market analyses in sports tech.";
      }
    } else if (cleanPath.includes('/section/about')) {
      if (language === 'tr') {
        title = "Hakkımızda | SportTech Türkiye";
        description = "SportTech Türkiye, ülkemizdeki spor teknolojisi ekosistemini bir araya getiren, büyüyen ve dünyaya açan bağımsız bir platformdur.";
      } else if (language === 'ar') {
        title = "من نحن | سبورت تيك تركيا";
        description = "منصة مستقلة تجمع وتنمي وتعرض منظومة التكنولوجيا الرياضية في تركيا للعالم.";
      } else {
        title = "About Us | SportTech Turkey";
        description = "SportTech Turkey is an independent platform that unites, scales, and accelerates our nation's sports tech ecosystem globally.";
      }
    } else if (cleanPath.includes('/section/supporters')) {
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
    } else if (cleanPath.includes('/section/events')) {
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
