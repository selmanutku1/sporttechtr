import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StartupsSection } from './components/StartupsSection';
import { NewsSection } from './components/NewsSection';
import { AboutSection } from './components/AboutSection';
import { SupportersSection } from './components/SupportersSection';
import { EventsSection } from './components/EventsSection';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';

import { StartupDetailModal } from './components/StartupDetailModal';
import { NewsDetailModal } from './components/NewsDetailModal';
import { StartupSubmitModal } from './components/StartupSubmitModal';
import { PartnerModal } from './components/PartnerModal';
import { SearchModal } from './components/SearchModal';
import { AdminAuthModal } from './components/AdminAuthModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { useLanguage } from './context/LanguageContext';

import { Startup, NewsArticle, StartupCategory, Supporter } from './types';
import { 
  getApprovedStartups, 
  getPendingSubmissions, 
  addPendingSubmission, 
  approveSubmission, 
  rejectSubmission, 
  deleteApprovedStartup,
  updateApprovedStartup,
  PendingStartupSubmission
} from './services/startupManagement';
import {
  getApprovedSupporters,
  getPendingPartners,
  addPendingPartner,
  approvePartner,
  rejectPartner,
  updateApprovedSupporter,
  deleteApprovedSupporter,
  PendingPartnerSubmission
} from './services/partnerManagement';
import {
  getNewsletterSubscribers,
  addNewsletterSubscriber,
  deleteNewsletterSubscriber,
  NewsletterSubscriber
} from './services/newsletterManagement';
import {
  getNewsArticles,
  addNewsArticle,
  updateNewsArticle,
  deleteNewsArticle,
  toggleFeaturedArticle
} from './services/newsManagement';
import { generateSitemapXml } from './utils/sitemap';

export const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useLanguage();

  // Navigation & Filter States
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedCategory, setSelectedCategory] = useState<StartupCategory>('all');

  // Startups State (Dynamic with LocalStorage Persistence)
  const [approvedStartups, setApprovedStartups] = useState<Startup[]>(() => getApprovedStartups());
  const [pendingSubmissions, setPendingSubmissions] = useState<PendingStartupSubmission[]>([]);

  // Partners & Supporters State (Dynamic with LocalStorage Persistence)
  const [approvedSupporters, setApprovedSupporters] = useState<Supporter[]>([]);
  const [pendingPartners, setPendingPartners] = useState<PendingPartnerSubmission[]>([]);

  // Newsletter Subscribers State
  const [newsletterSubscribers, setNewsletterSubscribers] = useState<NewsletterSubscriber[]>([]);

  // News Articles State
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>(() => getNewsArticles());

  // Modal States - Synchronously resolve direct URL path parameters on first render (supports both clean paths and hash fallbacks)
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(() => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    let id = '';
    
    if (path.startsWith('/startup/')) {
      id = decodeURIComponent(path.split('/startup/')[1].split('?')[0].split('#')[0]);
    } else if (hash.startsWith('#/startup/')) {
      id = decodeURIComponent(hash.split('#/startup/')[1].split('?')[0]);
    } else if (hash.startsWith('#startup/')) {
      id = decodeURIComponent(hash.split('#startup/')[1].split('?')[0]);
    }

    if (id) {
      const allStartups = getApprovedStartups();
      return allStartups.find(s => s.id === id) || null;
    }
    return null;
  });

  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(() => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    let id = '';
    
    if (path.startsWith('/news/')) {
      id = decodeURIComponent(path.split('/news/')[1].split('?')[0].split('#')[0]);
    } else if (hash.startsWith('#/news/')) {
      id = decodeURIComponent(hash.split('#/news/')[1].split('?')[0]);
    } else if (hash.startsWith('#news/')) {
      id = decodeURIComponent(hash.split('#news/')[1].split('?')[0]);
    }

    if (id) {
      const allArticles = getNewsArticles();
      return allArticles.find(a => a.id === id) || null;
    }
    return null;
  });

  const [isStartupSubmitOpen, setIsStartupSubmitOpen] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // Admin Portal States (Passcode 2026)
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Load all data from storage on mount
  useEffect(() => {
    // Handle hash to path redirect for old links
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      if (hash.startsWith('/')) {
        navigate(hash, { replace: true });
      }
    }

    setApprovedStartups(getApprovedStartups());
    setPendingSubmissions(getPendingSubmissions());
    setApprovedSupporters(getApprovedSupporters());
    setPendingPartners(getPendingPartners());
    setNewsletterSubscribers(getNewsletterSubscribers());
    const articles = getNewsArticles();
    setNewsArticles(articles);

    // Initial routing based on URL
    const path = location.pathname;
    if (path.startsWith('/news/')) {
      const id = decodeURIComponent(path.split('/news/')[1].split('?')[0].split('#')[0]);
      const article = articles.find(a => a.id === id);
      if (article) setSelectedArticle(article);
    } else if (path.startsWith('/startup/')) {
      const id = decodeURIComponent(path.split('/startup/')[1].split('?')[0].split('#')[0]);
      const allStartups = getApprovedStartups();
      const startup = allStartups.find(s => s.id === id);
      if (startup) setSelectedStartup(startup);
    } else if (path.startsWith('/section/')) {
      const section = path.split('/section/')[1];
      setTimeout(() => scrollToSection(section), 500);
    }
  }, []);

  // Listen for URL changes (back/forward buttons)
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') {
      setSelectedArticle(null);
      setSelectedStartup(null);
    } else if (path.startsWith('/news/')) {
      const id = decodeURIComponent(path.split('/news/')[1].split('?')[0].split('#')[0]);
      if (selectedArticle?.id !== id) {
        const article = newsArticles.find(a => a.id === id);
        if (article) {
          setSelectedArticle(article);
        }
      }
    } else if (path.startsWith('/startup/')) {
      const id = decodeURIComponent(path.split('/startup/')[1].split('?')[0].split('#')[0]);
      if (selectedStartup?.id !== id) {
        const startup = approvedStartups.find(s => s.id === id);
        if (startup) {
          setSelectedStartup(startup);
        }
      }
    }
  }, [location.pathname, newsArticles, approvedStartups, selectedArticle, selectedStartup]);

  // Dynamically update document title and description based on selected item, current path, and selected language
  useEffect(() => {
    let title = "";
    let description = "";

    if (selectedArticle) {
      if (language === 'tr') {
        title = `${selectedArticle.title} - Sektörel Haber | SportTech Türkiye`;
        description = selectedArticle.excerpt || selectedArticle.title;
      } else if (language === 'ar') {
        title = `${selectedArticle.title} - أخبار الصناعة | سبورت تيك تركيا`;
        description = selectedArticle.excerpt || selectedArticle.title;
      } else {
        title = `${selectedArticle.title} - Industry News | SportTech Turkey`;
        description = selectedArticle.excerpt || selectedArticle.title;
      }
    } else if (selectedStartup) {
      if (language === 'tr') {
        title = `${selectedStartup.name} - Girişim Profili | SportTech Türkiye`;
        description = selectedStartup.tagLine ? `${selectedStartup.tagLine} - ${selectedStartup.description}` : selectedStartup.description;
      } else if (language === 'ar') {
        title = `${selectedStartup.name} - ملف تعريف الشركة | سبورت تيك تركيا`;
        description = selectedStartup.tagLine ? `${selectedStartup.tagLine} - ${selectedStartup.description}` : selectedStartup.description;
      } else {
        title = `${selectedStartup.name} - Startup Profile | SportTech Turkey`;
        description = selectedStartup.tagLine ? `${selectedStartup.tagLine} - ${selectedStartup.description}` : selectedStartup.description;
      }
    } else {
      // Check active section or path
      const path = location.pathname;
      if (path.includes('/section/startups')) {
        if (language === 'tr') {
          title = "Girişimler Dizini | SportTech Türkiye";
          description = "Türkiye'nin ve bölgenin öncü spor teknolojisi girişimleri kataloğu. Performans, yapay zeka, giyilebilir cihazlar ve yönetim yazılımları.";
        } else if (language === 'ar') {
          title = "دليل الشركات الناشئة | سبورت تيك تركيا";
          description = "كتالوج الشركات الناشئة الرائدة في تكنولوجيا الرياضة في تركيا والمنطقة. الأداء والذكاء الاصطناعي والأجهزة القابلة للارتداء.";
        } else {
          title = "Startups Directory | SportTech Turkey";
          description = "The pioneering directory of sports technology startups in Turkey and its region. AI, wearables, venues, and performance.";
        }
      } else if (path.includes('/section/news')) {
        if (language === 'tr') {
          title = "Sektörel Haberler & Analizler | SportTech Türkiye";
          description = "Spor teknolojileri dünyasındaki son gelişmeler, yatırım turları, ürün lansmanları ve pazar raporları.";
        } else if (language === 'ar') {
          title = "أخبار الصناعة والتحليلات | سبورت تيك تركيا";
          description = "آخر التطورات في عالم التكنولوجيا الرياضية، جولات الاستثمار، إطلاق المنتجات وتحليلات السوق.";
        } else {
          title = "Industry News & Market Insights | SportTech Turkey";
          description = "Latest developments, product launches, venture capital funding rounds, and in-depth market analyses in sports tech.";
        }
      } else if (path.includes('/section/about')) {
        if (language === 'tr') {
          title = "Hakkımızda | SportTech Türkiye";
          description = "SportTech Türkiye, ülkemizdeki spor teknolojisi ekosistemini bir araya getiren, büyüten ve dünyaya açan bağımsız bir platformdur.";
        } else if (language === 'ar') {
          title = "من نحن | سبورت تيك تركيا";
          description = "منصة مستقلة تجمع وتنمي وتعرض منظومة التكنولوجيا الرياضية في تركيا للعالم.";
        } else {
          title = "About Us | SportTech Turkey";
          description = "SportTech Turkey is an independent platform that unites, scales, and accelerates our nation's sports tech ecosystem globally.";
        }
      } else if (path.includes('/section/supporters')) {
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
      } else if (path.includes('/section/events')) {
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
        // Main Home view or other
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

    document.title = title;

    // Dynamically find or fallback create the meta description tag
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Dynamically find or fallback create the canonical link tag
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    // Standardize URL by removing trailing slash if present (except for root homepage)
    const cleanPathname = location.pathname.endsWith('/') && location.pathname !== '/'
      ? location.pathname.slice(0, -1)
      : location.pathname;
    const canonicalUrl = `${window.location.origin}${cleanPathname}`;
    canonicalLink.setAttribute('href', canonicalUrl);

    // Dynamically find or fallback create the sitemap link tag
    let sitemapLink = document.querySelector('link[rel="sitemap"]');
    if (!sitemapLink) {
      sitemapLink = document.createElement('link');
      sitemapLink.setAttribute('rel', 'sitemap');
      sitemapLink.setAttribute('type', 'application/xml');
      sitemapLink.setAttribute('title', 'Sitemap');
      document.head.appendChild(sitemapLink);
    }
    sitemapLink.setAttribute('href', `${window.location.origin}/sitemap.xml`);

    // Generate sitemap XML string client-side for dynamic verification
    const sitemapXmlString = generateSitemapXml(approvedStartups, newsArticles, window.location.origin);

    // SEO Diagnostic Logging Utility
    console.log(
      `%c🔍 [SEO Diagnostics] Route/State Changed %c\n` +
      `%-15s: %s\n` +
      `%-15s: %s\n` +
      `%-15s: %s\n` +
      `%-15s: %s\n` +
      `%-15s: %d characters (URLs: %d)`,
      'background: #0f172a; color: #38bdf8; font-weight: bold; padding: 4px 8px; border-radius: 6px;',
      'color: inherit;',
      'Language', language.toUpperCase(),
      'Title', title,
      'Description', description,
      'Canonical', canonicalUrl,
      'Sitemap XML', sitemapXmlString.length, (sitemapXmlString.match(/<url>/g) || []).length
    );
  }, [selectedArticle, selectedStartup, location.pathname, language, approvedStartups, newsArticles]);

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    setActiveSection(id);
    navigate(`/section/${id}`, { replace: true });
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // --- Startup Handlers ---
  const handleUserStartupSubmit = (formData: any) => {
    addPendingSubmission(formData);
    setPendingSubmissions(getPendingSubmissions());
  };

  const handleApproveStartup = (id: string) => {
    try {
      const { updatedPending } = approveSubmission(id);
      setApprovedStartups(getApprovedStartups());
      setPendingSubmissions(updatedPending);
    } catch (e) {
      console.error(e);
    }
  };

  const handleRejectStartup = (id: string) => {
    const updated = rejectSubmission(id);
    setPendingSubmissions(updated);
  };

  const handleDeleteApprovedStartup = (id: string) => {
    const updated = deleteApprovedStartup(id);
    setApprovedStartups(updated);
  };

  const handleUpdateApprovedStartup = (updatedStartup: Startup) => {
    const updated = updateApprovedStartup(updatedStartup);
    setApprovedStartups(updated);
  };

  // --- Partner Handlers ---
  const handleUserPartnerSubmit = (formData: any) => {
    addPendingPartner(formData);
    setPendingPartners(getPendingPartners());
  };

  const handleApprovePartner = (id: string, customDetails?: Partial<Supporter>) => {
    try {
      const { updatedPending } = approvePartner(id, customDetails);
      setApprovedSupporters(getApprovedSupporters());
      setPendingPartners(updatedPending);
    } catch (e) {
      console.error(e);
    }
  };

  const handleRejectPartner = (id: string) => {
    const updated = rejectPartner(id);
    setPendingPartners(updated);
  };

  const handleDeleteApprovedPartner = (id: string) => {
    const updated = deleteApprovedSupporter(id);
    setApprovedSupporters(updated);
  };

  const handleUpdateApprovedPartner = (updatedPartner: Supporter) => {
    const updated = updateApprovedSupporter(updatedPartner);
    setApprovedSupporters(updated);
  };

  // --- Newsletter Handlers ---
  const handleUserNewsletterSubscribe = (email: string) => {
    addNewsletterSubscriber(email);
    setNewsletterSubscribers(getNewsletterSubscribers());
  };

  const handleDeleteNewsletterSubscriber = (id: string) => {
    const updated = deleteNewsletterSubscriber(id);
    setNewsletterSubscribers(updated);
  };

  // --- News Handlers ---
  const handleAddNewsArticle = (articleData: Partial<NewsArticle>) => {
    addNewsArticle(articleData);
    setNewsArticles(getNewsArticles());
  };

  const handleUpdateNewsArticle = (updatedArticle: NewsArticle) => {
    const updated = updateNewsArticle(updatedArticle);
    setNewsArticles(updated);
  };

  const handleDeleteNewsArticle = (id: string) => {
    const updated = deleteNewsArticle(id);
    setNewsArticles(updated);
  };

  const handleToggleFeaturedNewsArticle = (id: string) => {
    const updated = toggleFeaturedArticle(id);
    setNewsArticles(updated);
  };

  // --- Admin Portal Handlers ---
  const handleOpenAdmin = () => {
    if (isAdminLoggedIn) {
      setIsAdminDashboardOpen(true);
    } else {
      setIsAdminAuthOpen(true);
    }
  };

  const handleSuccessfulAuth = () => {
    setIsAdminLoggedIn(true);
    setIsAdminAuthOpen(false);
    setIsAdminDashboardOpen(true);
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setIsAdminDashboardOpen(false);
  };

  const isStartupRoute = location.pathname.startsWith('/startup/');
  const isNewsRoute = location.pathname.startsWith('/news/');

  if (isStartupRoute) {
    if (selectedStartup) {
      return (
        <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900 animate-in fade-in duration-200">
          <StartupDetailModal
            startup={selectedStartup}
            onClose={() => {
              setSelectedStartup(null);
              navigate('/');
            }}
            onSelectArticle={(article) => {
              setSelectedStartup(null);
              setSelectedArticle(article);
              navigate(`/news/${article.id}`);
            }}
            articles={newsArticles}
          />
        </div>
      );
    } else {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center font-sans p-6">
          <div className="text-center max-w-md">
            <h2 className="text-3xl font-bold font-display text-emerald-400 mb-4">Girişim Bulunamadı</h2>
            <p className="text-slate-400 mb-8">Aradığınız girişim ekosistemimizde bulunmuyor veya pasif durumda olabilir.</p>
            <button 
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-emerald-500 text-slate-950 rounded-xl font-semibold hover:bg-emerald-400 transition-colors"
            >
              Ana Sayfaya Dön
            </button>
          </div>
        </div>
      );
    }
  }

  if (isNewsRoute) {
    if (selectedArticle) {
      return (
        <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900 animate-in fade-in duration-200">
          <NewsDetailModal
            article={selectedArticle}
            onClose={() => {
              setSelectedArticle(null);
              navigate('/');
            }}
            onSelectStartup={(startup) => {
              setSelectedArticle(null);
              setSelectedStartup(startup);
              navigate(`/startup/${startup.id}`);
            }}
            onSelectArticle={(article) => {
              setSelectedArticle(article);
              navigate(`/news/${article.id}`);
            }}
            articles={newsArticles}
          />
        </div>
      );
    } else {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center font-sans p-6">
          <div className="text-center max-w-md">
            <h2 className="text-3xl font-bold font-display text-emerald-400 mb-4">Haber Bulunamadı</h2>
            <p className="text-slate-400 mb-8">Aradığınız haber içeriği sistemimizde mevcut değil veya henüz yayınlanmamış olabilir.</p>
            <button 
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-emerald-500 text-slate-950 rounded-xl font-semibold hover:bg-emerald-400 transition-colors"
            >
              Ana Sayfaya Dön
            </button>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Sticky Header with SportTech Türkiye Brand & Nav */}
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenStartupSubmit={() => setIsStartupSubmitOpen(true)}
        onOpenSearch={() => setIsSearchModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* 1. Hero Section */}
        <Hero
          onExploreStartups={() => scrollToSection('startups')}
          onOpenStartupSubmit={() => setIsStartupSubmitOpen(true)}
          onExploreNews={() => scrollToSection('news')}
          onSelectStartupCategory={(cat) => {
            setSelectedCategory(cat);
            scrollToSection('startups');
          }}
        />

        {/* 2. Startups Directory Section (Girişimler) */}
        <StartupsSection
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onSelectStartup={(startup) => {
            setSelectedStartup(startup);
            navigate(`/startup/${startup.id}`);
          }}
          onOpenStartupSubmit={() => setIsStartupSubmitOpen(true)}
          startupsList={approvedStartups}
        />

        {/* 3. News, Reports & Insights Section (Haberler) */}
        <NewsSection
          onSelectArticle={(article) => {
            setSelectedArticle(article);
            navigate(`/news/${article.id}`);
          }}
          articles={newsArticles}
        />

        {/* 4. About Us & Ecosystem Pillars (Hakkımızda) */}
        <AboutSection
          onExploreStartups={() => scrollToSection('startups')}
          onOpenStartupSubmit={() => setIsStartupSubmitOpen(true)}
        />

        {/* 5. Supporters & Ecosystem Partners (Destekleyiciler) */}
        <SupportersSection
          onOpenPartnerModal={() => setIsPartnerModalOpen(true)}
          supportersList={approvedSupporters}
        />

        {/* 6. Summits, Hackathons & Demo Days (Etkinlikler) */}
        <EventsSection />

        {/* 7. Weekly Newsletter Subscription */}
        <NewsletterSection 
          onSubscribe={handleUserNewsletterSubscribe}
        />

      </main>

      {/* Corporate Footer with 'provided by sporsepeti' and admin access on Sport Tech Türkiye */}
      <Footer
        onNavigate={scrollToSection}
        onOpenStartupSubmit={() => setIsStartupSubmitOpen(true)}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Modals & Dialogs (Full-Page Editorial Experience) */}
      <StartupDetailModal
        startup={selectedStartup}
        onClose={() => {
          setSelectedStartup(null);
          navigate('/');
        }}
        onSelectArticle={(article) => {
          setSelectedStartup(null);
          setSelectedArticle(article);
          navigate(`/news/${article.id}`);
        }}
        articles={newsArticles}
      />

      <NewsDetailModal
        article={selectedArticle}
        onClose={() => {
          setSelectedArticle(null);
          navigate('/');
        }}
        onSelectStartup={(startup) => {
          setSelectedArticle(null);
          setSelectedStartup(startup);
          navigate(`/startup/${startup.id}`);
        }}
        onSelectArticle={(article) => {
          setSelectedArticle(article);
          navigate(`/news/${article.id}`);
        }}
        articles={newsArticles}
      />

      <StartupSubmitModal
        isOpen={isStartupSubmitOpen}
        onClose={() => setIsStartupSubmitOpen(false)}
        onSuccessAdd={handleUserStartupSubmit}
      />

      <PartnerModal
        isOpen={isPartnerModalOpen}
        onClose={() => setIsPartnerModalOpen(false)}
        onSuccessSubmit={handleUserPartnerSubmit}
      />

      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectStartup={(s) => {
          setSelectedStartup(s);
          navigate(`/startup/${s.id}`);
          setIsSearchModalOpen(false);
        }}
        onSelectArticle={(a) => {
          setSelectedArticle(a);
          navigate(`/news/${a.id}`);
          setIsSearchModalOpen(false);
        }}
        startups={approvedStartups}
        articles={newsArticles}
        supporters={approvedSupporters}
      />

      {/* Admin Auth Modal (Code: 2026) */}
      <AdminAuthModal
        isOpen={isAdminAuthOpen}
        onClose={() => setIsAdminAuthOpen(false)}
        onSuccessAuth={handleSuccessfulAuth}
      />

      {/* Full-Screen Admin Dashboard Modal */}
      <AdminDashboardModal
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
        onLogout={handleAdminLogout}
        // Startup Props
        pendingSubmissions={pendingSubmissions}
        approvedStartups={approvedStartups}
        onApproveStartup={handleApproveStartup}
        onRejectStartup={handleRejectStartup}
        onDeleteApprovedStartup={handleDeleteApprovedStartup}
        onUpdateApprovedStartup={handleUpdateApprovedStartup}
        onViewStartupDetail={(s) => {
          setSelectedStartup(s);
          navigate(`/startup/${s.id}`);
        }}
        // Partner Props
        pendingPartners={pendingPartners}
        approvedSupporters={approvedSupporters}
        onApprovePartner={handleApprovePartner}
        onRejectPartner={handleRejectPartner}
        onDeleteApprovedPartner={handleDeleteApprovedPartner}
        onUpdateApprovedPartner={handleUpdateApprovedPartner}
        // Newsletter Props
        newsletterSubscribers={newsletterSubscribers}
        onDeleteNewsletterSubscriber={handleDeleteNewsletterSubscriber}
        onAddNewsletterSubscriber={handleUserNewsletterSubscribe}
        // News Props
        newsArticles={newsArticles}
        onAddNewsArticle={handleAddNewsArticle}
        onUpdateNewsArticle={handleUpdateNewsArticle}
        onDeleteNewsArticle={handleDeleteNewsArticle}
        onToggleFeaturedNewsArticle={handleToggleFeaturedNewsArticle}
        onViewNewsArticleDetail={(a) => {
          setSelectedArticle(a);
          navigate(`/news/${a.id}`);
        }}
      />

    </div>
  );
};
export default App;
