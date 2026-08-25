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

export const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation & Filter States
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedCategory, setSelectedCategory] = useState<StartupCategory>('all');

  // Startups State (Dynamic with LocalStorage Persistence)
  const [approvedStartups, setApprovedStartups] = useState<Startup[]>([]);
  const [pendingSubmissions, setPendingSubmissions] = useState<PendingStartupSubmission[]>([]);

  // Partners & Supporters State (Dynamic with LocalStorage Persistence)
  const [approvedSupporters, setApprovedSupporters] = useState<Supporter[]>([]);
  const [pendingPartners, setPendingPartners] = useState<PendingPartnerSubmission[]>([]);

  // Newsletter Subscribers State
  const [newsletterSubscribers, setNewsletterSubscribers] = useState<NewsletterSubscriber[]>([]);

  // News Articles State
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);

  // Modal States
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isStartupSubmitOpen, setIsStartupSubmitOpen] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // Admin Portal States (Passcode 2026)
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Load all data from storage on mount
  useEffect(() => {
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
      const id = path.split('/news/')[1];
      const article = articles.find(a => a.id === id);
      if (article) setSelectedArticle(article);
    } else if (path.startsWith('/startup/')) {
      const id = path.split('/startup/')[1];
      // We need startups to find it, but they might not be loaded yet in state
      // but they are loaded in local variable above or via getApprovedStartups
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
      document.title = 'SportTech Türkiye | Spor Teknolojileri & Performans Sistemleri';
    } else if (path.startsWith('/news/')) {
      const id = path.split('/news/')[1];
      if (selectedArticle?.id !== id) {
        const article = newsArticles.find(a => a.id === id);
        if (article) {
          setSelectedArticle(article);
          document.title = `${article.title} | SportTech Türkiye`;
        }
      } else if (selectedArticle) {
        document.title = `${selectedArticle.title} | SportTech Türkiye`;
      }
    } else if (path.startsWith('/startup/')) {
      const id = path.split('/startup/')[1];
      if (selectedStartup?.id !== id) {
        const startup = approvedStartups.find(s => s.id === id);
        if (startup) {
          setSelectedStartup(startup);
          document.title = `${startup.name} - Girişim Analizi | SportTech Türkiye`;
        }
      } else if (selectedStartup) {
        document.title = `${selectedStartup.name} - Girişim Analizi | SportTech Türkiye`;
      }
    } else if (path.startsWith('/section/')) {
      const section = path.split('/section/')[1];
      document.title = `SportTech Türkiye | ${section.charAt(0).toUpperCase() + section.slice(1)}`;
    }
  }, [location.pathname, newsArticles, approvedStartups, selectedArticle, selectedStartup]);

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
