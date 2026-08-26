import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  ExternalLink, 
  Globe, 
  Mail, 
  MapPin, 
  Building2, 
  Clock, 
  Rocket, 
  Search, 
  X, 
  Sparkles,
  Eye,
  LogOut,
  Edit3,
  PlusCircle,
  BarChart3,
  TrendingUp,
  Check,
  Send,
  AlertCircle,
  FileCheck,
  Cpu,
  Zap,
  ArrowLeft,
  Handshake,
  Users,
  Copy,
  Download,
  Phone,
  UserCheck,
  Newspaper,
  Calendar,
  Tag,
  Sun,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PendingStartupSubmission, createDirectStartup } from '../services/startupManagement';
import { Startup, Supporter, SupporterType, NewsArticle, NewsCategory } from '../types';
import { 
  PendingPartnerSubmission, 
  PARTNER_TYPE_NAMES 
} from '../services/partnerManagement';
import { NewsletterSubscriber } from '../services/newsletterManagement';
import { NEWS_CATEGORIES } from '../services/newsManagement';
import { BrandIcon } from './BrandLogo';
import { StartupEditModal } from './StartupEditModal';
import { PartnerEditModal } from './PartnerEditModal';
import { NewsEditModal } from './NewsEditModal';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  // Startup Props
  pendingSubmissions: PendingStartupSubmission[];
  approvedStartups: Startup[];
  onApproveStartup: (id: string) => void;
  onRejectStartup: (id: string) => void;
  onDeleteApprovedStartup: (id: string) => void;
  onUpdateApprovedStartup: (updatedStartup: Startup) => void;
  onViewStartupDetail?: (startup: Startup) => void;
  // Partner Props
  pendingPartners: PendingPartnerSubmission[];
  approvedSupporters: Supporter[];
  onApprovePartner: (id: string, customDetails?: Partial<Supporter>) => void;
  onRejectPartner: (id: string) => void;
  onDeleteApprovedPartner: (id: string) => void;
  onUpdateApprovedPartner: (updatedPartner: Supporter) => void;
  onAddDirectPartner?: (partner: Supporter) => void;
  // News & Articles Props
  newsArticles: NewsArticle[];
  onAddNewsArticle: (article: Partial<NewsArticle>) => void;
  onUpdateNewsArticle: (updatedArticle: NewsArticle) => void;
  onDeleteNewsArticle: (id: string) => void;
  onToggleFeaturedNewsArticle: (id: string) => void;
  onViewNewsArticleDetail?: (article: NewsArticle) => void;
  // Newsletter Props
  newsletterSubscribers: NewsletterSubscriber[];
  onDeleteNewsletterSubscriber: (id: string) => void;
  onAddNewsletterSubscriber: (email: string) => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  onLogout,
  pendingSubmissions,
  approvedStartups,
  onApproveStartup,
  onRejectStartup,
  onDeleteApprovedStartup,
  onUpdateApprovedStartup,
  onViewStartupDetail,
  pendingPartners,
  approvedSupporters,
  onApprovePartner,
  onRejectPartner,
  onDeleteApprovedPartner,
  onUpdateApprovedPartner,
  newsArticles,
  onAddNewsArticle,
  onUpdateNewsArticle,
  onDeleteNewsArticle,
  onToggleFeaturedNewsArticle,
  onViewNewsArticleDetail,
  newsletterSubscribers,
  onDeleteNewsletterSubscriber,
  onAddNewsletterSubscriber
}) => {
  // Navigation Tabs: 'submissions' | 'startups' | 'partners' | 'news' | 'newsletter' | 'stats'
  const [activeTab, setActiveTab] = useState<'submissions' | 'startups' | 'partners' | 'news' | 'newsletter' | 'stats'>('submissions');
  const [partnerSubTab, setPartnerSubTab] = useState<'pending' | 'approved'>('pending');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Mobile View State (for tabs with list/detail view)
  const [mobileViewMode, setMobileViewMode] = useState<'list' | 'detail'>('list');

  // Selected items & Modals
  const [selectedSubmission, setSelectedSubmission] = useState<PendingStartupSubmission | null>(
    pendingSubmissions.length > 0 ? pendingSubmissions[0] : null
  );
  const [selectedPartnerSubmission, setSelectedPartnerSubmission] = useState<PendingPartnerSubmission | null>(
    pendingPartners.length > 0 ? pendingPartners[0] : null
  );

  // Startup Edit Modal state
  const [editingStartup, setEditingStartup] = useState<Startup | null>(null);
  const [isStartupEditModalOpen, setIsStartupEditModalOpen] = useState(false);

  // Partner Edit Modal state
  const [editingPartnerSubmission, setEditingPartnerSubmission] = useState<PendingPartnerSubmission | null>(null);
  const [editingLiveSupporter, setEditingLiveSupporter] = useState<Supporter | null>(null);
  const [isPartnerEditModalOpen, setIsPartnerEditModalOpen] = useState(false);
  const [isPartnerApprovalMode, setIsPartnerApprovalMode] = useState(false);

  // News Edit Modal state
  const [editingNewsArticle, setEditingNewsArticle] = useState<NewsArticle | null>(null);
  const [isNewsEditModalOpen, setIsNewsEditModalOpen] = useState(false);
  const [selectedNewsCategoryFilter, setSelectedNewsCategoryFilter] = useState<string>('all');

  // Newsletter Direct Add
  const [manualEmail, setManualEmail] = useState('');
  const [isCopiedEmails, setIsCopiedEmails] = useState(false);
  const [isPartnerReviewMode, setIsPartnerReviewMode] = useState(false);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);


  if (!isOpen) return null;

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  // --- STARTUP ACTIONS ---
  const handleApproveStartup = (id: string, name: string) => {
    onApproveStartup(id);
    if (selectedSubmission?.id === id) {
      const remaining = pendingSubmissions.filter(s => s.id !== id);
      setSelectedSubmission(remaining.length > 0 ? remaining[0] : null);
    }
    showNotification(`"${name}" girişimi başarıyla onaylandı ve dizinde yayına alındı!`, 'success');
  };

  const handleRejectStartup = (id: string, name: string) => {
    if (window.confirm(`"${name}" başvurusunu reddetmek istediğinize emin misiniz?`)) {
      onRejectStartup(id);
      if (selectedSubmission?.id === id) {
        const remaining = pendingSubmissions.filter(s => s.id !== id);
        setSelectedSubmission(remaining.length > 0 ? remaining[0] : null);
      }
      showNotification(`"${name}" başvurusu reddedildi.`, 'error');
    }
  };

  const handleDeleteStartup = (id: string, name: string) => {
    if (window.confirm(`"${name}" girişimini dizinden kalıcı olarak kaldırmak istediğinize emin misiniz?`)) {
      onDeleteApprovedStartup(id);
      showNotification(`"${name}" girişimi dizinden kaldırıldı.`);
    }
  };

  const handleOpenStartupEdit = (startup: Startup) => {
    setEditingStartup(startup);
    setIsStartupEditModalOpen(true);
  };

  const handleCreateNewStartupDirect = () => {
    const brandNew = createDirectStartup({
      name: 'Yeni Spor Girişimi ' + (approvedStartups.length + 1),
      tagLine: 'Yapay Zeka Destekli Spor Teknolojisi Çözümü',
      category: 'ai_analytics',
      stage: 'Seed',
      location: 'İstanbul',
      website: 'https://sporttech.com.tr',
      teamSize: '3-5 Kişi',
      description: 'Yenilikçi spor teknolojisi ürünü ve analitik platformu.',
      founders: [{ name: 'Girişimci Ekip', role: 'Kurucu' }],
      techStack: ['AI', 'React', 'Cloud API']
    });
    showNotification(`Yeni girişim taslağı oluşturuldu. Şimdi detayları düzenleyebilirsiniz.`, 'success');
    handleOpenStartupEdit(brandNew);
  };

  // --- PARTNER ACTIONS ---
  const handleOpenPartnerApprovalModal = (submission: PendingPartnerSubmission) => {
    setEditingPartnerSubmission(submission);
    setEditingLiveSupporter(null);
    setIsPartnerApprovalMode(true);
    setIsPartnerEditModalOpen(true);
  };

  const handleQuickApprovePartner = (submission: PendingPartnerSubmission) => {
    onApprovePartner(submission.id);
    if (selectedPartnerSubmission?.id === submission.id) {
      const remaining = pendingPartners.filter(p => p.id !== submission.id);
      setSelectedPartnerSubmission(remaining.length > 0 ? remaining[0] : null);
    }
    showNotification(`"${submission.orgName}" partnerlik başvurusu onaylandı ve ana sayfadaki Destekleyiciler & Partnerler alanında yayına alındı!`, 'success');
  };

  const handleRejectPartner = (id: string, name: string) => {
    if (window.confirm(`"${name}" partnerlik başvurusunu reddetmek istediğinize emin misiniz?`)) {
      onRejectPartner(id);
      if (selectedPartnerSubmission?.id === id) {
        const remaining = pendingPartners.filter(p => p.id !== id);
        setSelectedPartnerSubmission(remaining.length > 0 ? remaining[0] : null);
      }
      showNotification(`"${name}" partnerlik başvurusu reddedildi.`, 'error');
    }
  };

  const handleOpenLivePartnerEdit = (supporter: Supporter) => {
    setEditingLiveSupporter(supporter);
    setEditingPartnerSubmission(null);
    setIsPartnerApprovalMode(false);
    setIsPartnerEditModalOpen(true);
  };

  const handleDeleteLivePartner = (id: string, name: string) => {
    if (window.confirm(`"${name}" partnerini yayından kaldırmak istediğinize emin misiniz?`)) {
      onDeleteApprovedPartner(id);
      showNotification(`"${name}" partneri yayından kaldırıldı.`);
    }
  };

  const handleOpenLivePartnerCreate = () => {
    setEditingLiveSupporter(null);
    setEditingPartnerSubmission(null);
    setIsPartnerApprovalMode(false);
    setIsPartnerEditModalOpen(true);
  };

  // --- NEWSLETTER ACTIONS ---
  const handleCopyAllEmails = () => {
    if (newsletterSubscribers.length === 0) return;
    const emailsList = newsletterSubscribers.map(s => s.email).join(', ');
    navigator.clipboard.writeText(emailsList);
    setIsCopiedEmails(true);
    showNotification(`${newsletterSubscribers.length} bülten abonesinin e-posta adresi panoya kopyalandı!`, 'success');
    setTimeout(() => {
      setIsCopiedEmails(false);
    }, 3000);
  };

  const handleManualAddSubscriber = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualEmail || !manualEmail.includes('@')) return;
    onAddNewsletterSubscriber(manualEmail);
    setManualEmail('');
    showNotification(`"${manualEmail}" bülten listesine başarıyla eklendi!`, 'success');
  };

  // --- NEWS & ARTICLES ACTIONS ---
  const handleOpenNewsCreate = () => {
    setEditingNewsArticle(null);
    setIsNewsEditModalOpen(true);
  };

  const handleOpenNewsEdit = (article: NewsArticle) => {
    setEditingNewsArticle(article);
    setIsNewsEditModalOpen(true);
  };

  const handleDeleteNews = (id: string, title: string) => {
    if (window.confirm(`"${title}" haberini silmek istediğinize emin misiniz?`)) {
      onDeleteNewsArticle(id);
      showNotification(`"${title}" haberi yayından kaldırıldı.`);
    }
  };

  const handleToggleFeaturedNews = (id: string, currentStatus: boolean, title: string) => {
    onToggleFeaturedNewsArticle(id);
    showNotification(
      !currentStatus 
        ? `"${title}" manşet ve öne çıkan rapor olarak ayarlandı!`
        : `"${title}" manşetten kaldırıldı.`
    );
  };

  // Filtered lists
  const filteredStartupSubmissions = pendingSubmissions.filter(sub =>
    sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.tagLine.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredApprovedStartups = approvedStartups.filter(st =>
    st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    st.tagLine.toLowerCase().includes(searchQuery.toLowerCase()) ||
    st.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    st.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPendingPartners = pendingPartners.filter(p =>
    p.orgName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredApprovedSupporters = approvedSupporters.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredNewsArticles = newsArticles.filter(a => {
    const matchesSearch = 
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCat = selectedNewsCategoryFilter === 'all' || a.category === selectedNewsCategoryFilter;

    return matchesSearch && matchesCat;
  });

  const filteredNewsletterSubscribers = newsletterSubscribers.filter(sub =>
    sub.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.source.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className={`fixed inset-0 z-[100] flex flex-col font-sans select-none overflow-hidden transition-colors duration-300 ${
        theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-900'
      }`}
    >
      
      {/* 1. Top Unified Admin Header Bar */}
      <header className={`h-16 px-4 sm:px-6 backdrop-blur-md border-b flex items-center justify-between shrink-0 z-20 transition-colors ${
        theme === 'dark' 
          ? 'bg-slate-900/90 border-slate-800/80' 
          : 'bg-white/90 border-slate-200'
      }`}>
        
        {/* Left Brand Lockup */}
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 flex items-center justify-center rounded-xl border p-1 shadow-sm transition-colors ${
            theme === 'dark' ? 'bg-slate-800 border-slate-700/80' : 'bg-slate-50 border-slate-200'
          }`}>
            <BrandIcon className="w-full h-full" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className={`text-base sm:text-lg font-bold font-display tracking-tight transition-colors ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                SPORT TECH TÜRKİYE
              </h1>
              <span className={`px-2 py-0.5 rounded-full border text-[10px] font-mono font-bold transition-colors ${
                theme === 'dark' 
                  ? 'bg-blue-500/20 border-blue-400/30 text-blue-300' 
                  : 'bg-blue-50 text-blue-600 border-blue-200'
              }`}>
                YÖNETİM PANELİ
              </span>
            </div>
            <p className={`text-[11px] hidden sm:block transition-colors ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
            }`}>
              Girişim Onayı, Partnerlik Masası & Bülten Yönetimi
            </p>
          </div>
        </div>

        {/* Center Navigation Tabs */}
        <nav className={`hidden lg:flex items-center gap-1.5 p-1 rounded-2xl border transition-colors ${
          theme === 'dark' ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          
          {/* Tab 1: Submissions */}
          <button
            onClick={() => { setActiveTab('submissions'); setSearchQuery(''); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'submissions'
                ? theme === 'dark' ? 'bg-slate-100 text-slate-900' : 'bg-white text-slate-900 shadow-sm'
                : theme === 'dark' ? 'text-slate-400 hover:text-white hover:bg-slate-800/60' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Başvurular</span>
            {pendingSubmissions.length > 0 && (
              <span className={`px-1.5 py-0.2 rounded-full text-white text-[10px] font-mono font-bold ${
                theme === 'dark' ? 'bg-blue-500' : 'bg-blue-600'
              }`}>
                {pendingSubmissions.length}
              </span>
            )}
          </button>

          {/* Tab 2: Startups */}
          <button
            onClick={() => { setActiveTab('startups'); setSearchQuery(''); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'startups'
                ? theme === 'dark' ? 'bg-slate-100 text-slate-900' : 'bg-white text-slate-900 shadow-sm'
                : theme === 'dark' ? 'text-slate-400 hover:text-white hover:bg-slate-800/60' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <Rocket className="w-3.5 h-3.5" />
            <span>Girişimler</span>
          </button>

          {/* Tab 3: Partners & Supporters */}
          <button
            onClick={() => { setActiveTab('partners'); setSearchQuery(''); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'partners'
                ? theme === 'dark' ? 'bg-slate-100 text-slate-900' : 'bg-white text-slate-900 shadow-sm'
                : theme === 'dark' ? 'text-slate-400 hover:text-white hover:bg-slate-800/60' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <Handshake className="w-3.5 h-3.5" />
            <span>Partnerler</span>
          </button>

          {/* Tab 4: News & Insights */}
          <button
            onClick={() => { setActiveTab('news'); setSearchQuery(''); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'news'
                ? theme === 'dark' ? 'bg-slate-100 text-slate-900' : 'bg-white text-slate-900 shadow-sm'
                : theme === 'dark' ? 'text-slate-400 hover:text-white hover:bg-slate-800/60' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <Newspaper className="w-3.5 h-3.5" />
            <span>Haberler</span>
          </button>

          {/* Tab 5: Newsletter Subscribers */}
          <button
            onClick={() => { setActiveTab('newsletter'); setSearchQuery(''); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'newsletter'
                ? theme === 'dark' ? 'bg-slate-100 text-slate-900' : 'bg-white text-slate-900 shadow-sm'
                : theme === 'dark' ? 'text-slate-400 hover:text-white hover:bg-slate-800/60' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Bülten</span>
          </button>

          {/* Tab 6: Stats */}
          <button
            onClick={() => { setActiveTab('stats'); setSearchQuery(''); }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'stats'
                ? theme === 'dark' ? 'bg-slate-100 text-slate-900' : 'bg-white text-slate-900 shadow-sm'
                : theme === 'dark' ? 'text-slate-400 hover:text-white hover:bg-slate-800/60' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Veriler</span>
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
            className={`w-9 h-9 flex items-center justify-center rounded-xl border transition-all cursor-pointer ${
              theme === 'dark' 
                ? 'bg-slate-800 border-slate-700 text-yellow-400 hover:bg-slate-700' 
                : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
            }`}
            title={theme === 'dark' ? 'Aydınlık Moda Geç' : 'Karanlık Moda Geç'}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={onClose}
            className={`px-3.5 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer ${
              theme === 'dark' 
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700' 
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
            }`}
            title="Kullanıcı Görünümüne Dön"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Siteye Dön</span>
          </button>

          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              theme === 'dark' 
                ? 'bg-red-950/50 hover:bg-red-900/70 text-red-300 border-red-800/50' 
                : 'bg-red-50 hover:bg-red-100 text-red-600 border-red-100'
            }`}
            title="Oturumu Kapat"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Çıkış</span>
          </button>
        </div>

      </header>

      {/* Mobile Tab Strip */}
      <div className={`lg:hidden flex items-center overflow-x-auto p-2 text-xs gap-1.5 no-scrollbar border-b transition-colors ${
        theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
      }`}>
        <button
          onClick={() => { setActiveTab('submissions'); setMobileViewMode('list'); }}
          className={`py-1.5 px-3 rounded-lg font-bold shrink-0 flex items-center gap-1 transition-colors ${
            activeTab === 'submissions' 
              ? theme === 'dark' ? 'bg-slate-100 text-slate-900' : 'bg-white text-slate-900 shadow-sm'
              : theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          <span>Başvurular</span>
        </button>
        
        <button
          onClick={() => { setActiveTab('startups'); setMobileViewMode('list'); }}
          className={`py-1.5 px-3 rounded-lg font-bold shrink-0 flex items-center gap-1 transition-colors ${
            activeTab === 'startups' 
              ? theme === 'dark' ? 'bg-slate-100 text-slate-900' : 'bg-white text-slate-900 shadow-sm'
              : theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          <span>Girişimler</span>
        </button>

        <button
          onClick={() => { setActiveTab('partners'); setMobileViewMode('list'); }}
          className={`py-1.5 px-3 rounded-lg font-bold shrink-0 flex items-center gap-1 transition-colors ${
            activeTab === 'partners' 
              ? theme === 'dark' ? 'bg-slate-100 text-slate-900' : 'bg-white text-slate-900 shadow-sm'
              : theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          <span>Partnerler</span>
        </button>

        <button
          onClick={() => setActiveTab('news')}
          className={`py-1.5 px-3 rounded-lg font-bold shrink-0 flex items-center gap-1 transition-colors ${
            activeTab === 'news' 
              ? theme === 'dark' ? 'bg-slate-100 text-slate-900' : 'bg-white text-slate-900 shadow-sm'
              : theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          <span>Haberler</span>
        </button>

        <button
          onClick={() => setActiveTab('newsletter')}
          className={`py-1.5 px-3 rounded-lg font-bold shrink-0 flex items-center gap-1 transition-colors ${
            activeTab === 'newsletter' 
              ? theme === 'dark' ? 'bg-slate-100 text-slate-900' : 'bg-white text-slate-900 shadow-sm'
              : theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          <span>Bülten</span>
        </button>

        <button
          onClick={() => setActiveTab('stats')}
          className={`py-1.5 px-3 rounded-lg font-bold shrink-0 flex items-center gap-1 transition-colors ${
            activeTab === 'stats' 
              ? theme === 'dark' ? 'bg-slate-100 text-slate-900' : 'bg-white text-slate-900 shadow-sm'
              : theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          <span>Veriler</span>
        </button>
      </div>

      {/* Action Notification Alert */}
      {notification && (
        <div className={`px-6 py-2 flex items-center justify-between text-xs font-bold shrink-0 animate-in slide-in-from-top-2 border-b ${
          notification.type === 'success' 
            ? 'bg-slate-100 text-slate-900 border-slate-200' 
            : 'bg-red-50 text-red-900 border-red-100'
        }`}>
          <div className="flex items-center gap-2 uppercase tracking-widest">
            {notification.message}
          </div>
          <button onClick={() => setNotification(null)} className="opacity-50 hover:opacity-100">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Full-Screen Layout Body */}
      <div className={`flex-1 flex overflow-hidden transition-colors ${
        theme === 'dark' ? 'bg-slate-950' : 'bg-slate-50'
      }`}>
        
        {/* ========================================================================= */}
        {/* TAB 1: STARTUP SUBMISSIONS REVIEW */}
        {/* ========================================================================= */}
        {activeTab === 'submissions' && (
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
            
            {/* Left Column: List */}
            <div className={`w-full lg:w-96 lg:min-w-[380px] border-r flex flex-col overflow-hidden transition-colors ${
              theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            } ${
              mobileViewMode === 'detail' ? 'hidden lg:flex' : 'flex'
            }`}>
              
              {/* Header */}
              <div className={`p-5 border-b space-y-4 transition-colors ${
                theme === 'dark' ? 'border-slate-800' : 'border-slate-100'
              }`}>
                <div className="flex items-center justify-between">
                  <h2 className={`text-xs font-bold uppercase tracking-widest ${
                    theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
                  }`}>Gelen Başvurular</h2>
                  <span className={`text-[10px] font-bold ${
                    theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
                  }`}>{filteredStartupSubmissions.length} ADET</span>
                </div>
                <div className="relative">
                  <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${
                    theme === 'dark' ? 'text-slate-600' : 'text-slate-400'
                  }`} />
                  <input
                    type="text"
                    placeholder="Girişim ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-9 pr-3 py-2 rounded-xl text-xs transition-all focus:outline-none ${
                      theme === 'dark' 
                        ? 'bg-slate-900 border border-slate-800 text-white placeholder-slate-700' 
                        : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-400'
                    }`}
                  />
                </div>
              </div>

              {/* Scrollable List */}
              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {filteredStartupSubmissions.length === 0 ? (
                  <div className={`py-20 text-center text-xs uppercase tracking-widest ${
                    theme === 'dark' ? 'text-slate-700' : 'text-slate-400'
                  }`}>Başvuru bulunamadı</div>
                ) : (
                  filteredStartupSubmissions.map((sub) => {
                    const isSelected = selectedSubmission?.id === sub.id;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => {
                          setSelectedSubmission(sub);
                          setMobileViewMode('detail');
                        }}
                        className={`w-full text-left p-4 rounded-2xl transition-all ${
                          isSelected 
                            ? theme === 'dark' ? 'bg-slate-100 text-slate-900' : 'bg-blue-50 text-blue-900 shadow-xs' 
                            : theme === 'dark' ? 'bg-transparent text-slate-400 hover:bg-slate-900' : 'bg-transparent text-slate-500 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-sm font-bold ${
                            isSelected 
                              ? theme === 'dark' ? 'text-slate-900' : 'text-blue-900' 
                              : theme === 'dark' ? 'text-white' : 'text-slate-900'
                          }`}>{sub.name}</span>
                          <span className={`text-[9px] font-bold uppercase tracking-widest ${
                            isSelected 
                              ? theme === 'dark' ? 'text-slate-500' : 'text-blue-600' 
                              : theme === 'dark' ? 'text-slate-600' : 'text-slate-400'
                          }`}>{sub.submittedAt}</span>
                        </div>
                        <p className={`text-[11px] line-clamp-1 ${
                          isSelected 
                            ? theme === 'dark' ? 'text-slate-600' : 'text-blue-700/70' 
                            : theme === 'dark' ? 'text-slate-500' : 'text-slate-500'
                        }`}>{sub.tagLine}</p>
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* Right Column: Detail */}
            <div className={`flex-1 overflow-y-auto transition-colors ${
              theme === 'dark' ? 'bg-slate-950' : 'bg-white'
            } ${
              mobileViewMode === 'list' ? 'hidden lg:flex' : 'flex'
            }`}>
              {selectedSubmission ? (
                <div className="p-6 sm:p-12 lg:p-20 max-w-4xl mx-auto w-full space-y-12 animate-in fade-in duration-300">
                  
                  {/* Mobile Back Button */}
                  <button onClick={() => setMobileViewMode('list')} className={`lg:hidden flex items-center gap-2 font-bold text-xs mb-8 ${
                    theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
                  }`}>
                    <ArrowLeft className="w-4 h-4" />
                    <span>Listeye Dön</span>
                  </button>

                  <div className="space-y-3">
                    <h2 className={`text-4xl font-bold tracking-tighter transition-colors ${
                      theme === 'dark' ? 'text-white' : 'text-slate-900'
                    }`}>{selectedSubmission.name}</h2>
                    <p className={`text-lg font-medium transition-colors ${
                      theme === 'dark' ? 'text-slate-500' : 'text-slate-500'
                    }`}>{selectedSubmission.tagLine}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="space-y-4">
                      <h3 className={`text-[10px] font-bold uppercase tracking-widest border-b pb-3 transition-colors ${
                        theme === 'dark' ? 'text-slate-600 border-slate-900' : 'text-slate-400 border-slate-100'
                      }`}>Kurucu</h3>
                      <div className="space-y-1">
                        <p className={`text-sm font-bold transition-colors ${
                          theme === 'dark' ? 'text-white' : 'text-slate-900'
                        }`}>{selectedSubmission.founderName}</p>
                        <p className="text-xs text-slate-500">{selectedSubmission.email}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className={`text-[10px] font-bold uppercase tracking-widest border-b pb-3 transition-colors ${
                        theme === 'dark' ? 'text-slate-600 border-slate-900' : 'text-slate-400 border-slate-100'
                      }`}>Aşama / Konum</h3>
                      <div className="space-y-1">
                        <p className={`text-sm font-bold transition-colors ${
                          theme === 'dark' ? 'text-white' : 'text-slate-900'
                        }`}>{selectedSubmission.stage}</p>
                        <p className="text-xs text-slate-500">{selectedSubmission.location}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className={`text-[10px] font-bold uppercase tracking-widest border-b pb-3 transition-colors ${
                        theme === 'dark' ? 'text-slate-600 border-slate-900' : 'text-slate-400 border-slate-100'
                      }`}>Kategori</h3>
                      <p className={`text-sm font-bold uppercase tracking-wider transition-colors ${
                        theme === 'dark' ? 'text-white' : 'text-slate-900'
                      }`}>{selectedSubmission.categoryName}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className={`text-[10px] font-bold uppercase tracking-widest border-b pb-3 transition-colors ${
                      theme === 'dark' ? 'text-slate-600 border-slate-900' : 'text-slate-400 border-slate-100'
                    }`}>Detaylı Açıklama</h3>
                    <p className={`text-sm leading-relaxed max-w-2xl transition-colors ${
                      theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                    }`}>{selectedSubmission.description}</p>
                  </div>

                    <div className="pt-10 flex items-center gap-4">
                    <button
                      onClick={() => handleApproveStartup(selectedSubmission.id, selectedSubmission.name)}
                      className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${
                        theme === 'dark' ? 'bg-slate-100 hover:bg-white text-slate-900' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200'
                      }`}
                    >
                      Onayla ve Yayınla
                    </button>
                    <button
                      onClick={() => handleRejectStartup(selectedSubmission.id, selectedSubmission.name)}
                      className={`px-8 py-3 rounded-xl border font-bold text-sm transition-all flex items-center gap-2 ${
                        theme === 'dark' 
                          ? 'bg-slate-900 border-slate-800 text-slate-500 hover:text-red-400 hover:border-red-900/40' 
                          : 'bg-white border-slate-200 text-slate-500 hover:text-red-600 hover:bg-red-50'
                      }`}
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Reddet & Sil</span>
                    </button>
                  </div>

                </div>
              ) : (
                <div className={`flex-1 flex items-center justify-center text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${
                  theme === 'dark' ? 'text-slate-800' : 'text-slate-200'
                }`}>İncelemek için seçim yapın</div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: APPROVED STARTUPS & EDITING */}
        {/* ========================================================================= */}
        {activeTab === 'startups' && (
          <div className="flex-1 flex flex-col overflow-hidden p-4 sm:p-6 lg:p-8">
            
            {/* Top Toolbar */}
            <div className={`border rounded-3xl p-4 sm:p-5 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 shrink-0 shadow-lg transition-colors ${
              theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
            }`}>
              
              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors ${
                  theme === 'dark' ? 'bg-blue-500/20 border border-blue-500/30 text-blue-400' : 'bg-blue-50 border border-blue-100 text-blue-600'
                }`}>
                  <Rocket className="w-5 h-5" />
                </div>
                <div>
                  <h2 className={`text-base font-bold font-display transition-colors ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                    Yayındaki Girişimler & Düzenleme Masası
                  </h2>
                  <p className={`text-xs transition-colors ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    Toplam <strong>{approvedStartups.length}</strong> onaylı girişim dizinde listeleniyor
                  </p>
                </div>
              </div>

              {/* Search & Direct Add Button */}
              <div className="flex items-center gap-3 w-full md:w-auto flex-wrap">
                <div className="relative flex-1 sm:w-64">
                  <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-400'
                  }`} />
                  <input
                    type="text"
                    placeholder="Girişim adı veya teknoloji ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-8.5 pr-3 py-2 rounded-xl text-xs transition-all focus:outline-none ${
                      theme === 'dark' 
                        ? 'bg-slate-950 border border-slate-700 text-white placeholder-slate-400 focus:border-blue-500 shadow-inner' 
                        : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-500'
                    }`}
                  />
                </div>

                <button
                  onClick={handleCreateNewStartupDirect}
                  className={`px-4 py-2 rounded-xl text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all active:scale-95 shrink-0 cursor-pointer ${
                    theme === 'dark' ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Yeni Girişim Ekle</span>
                </button>
              </div>

            </div>

            {/* Startups Grid */}
            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredApprovedStartups.map((st) => (
                  <div
                    key={st.id}
                    className={`border rounded-3xl p-5 shadow-md transition-all flex flex-col justify-between ${
                      theme === 'dark' ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-lg'
                    }`}
                  >
                    <div className="space-y-3">
                      
                      {/* Card Header */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={st.logo}
                            alt={st.name}
                            className={`w-11 h-11 rounded-2xl object-contain border p-1 bg-white shrink-0 transition-colors ${
                              theme === 'dark' ? 'border-slate-700' : 'border-slate-100'
                            }`}
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h3 className={`text-sm font-bold transition-colors ${
                                theme === 'dark' ? 'text-white' : 'text-slate-900'
                              }`}>{st.name}</h3>
                              {st.isFeatured && (
                                <span className={`px-1.5 py-0.2 rounded-md border text-[9px] font-bold transition-colors ${
                                  theme === 'dark' ? 'bg-amber-500/20 border-amber-500/30 text-amber-300' : 'bg-amber-50 border-amber-100 text-amber-600'
                                }`}>
                                  VİTRİN
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-blue-400 font-semibold block mt-0.5">
                              {st.categoryName}
                            </span>
                          </div>
                        </div>

                        <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold transition-colors ${
                          theme === 'dark' ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-50 text-slate-500 border-slate-200'
                        }`}>
                          {st.stage}
                        </span>
                      </div>

                      {/* Tagline */}
                      <p className={`text-xs line-clamp-2 leading-relaxed transition-colors ${
                        theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                      }`}>
                        {st.tagLine}
                      </p>

                      {/* Meta pills */}
                      <div className={`flex flex-wrap items-center gap-2 text-[10px] pt-2 border-t transition-colors ${
                        theme === 'dark' ? 'text-slate-400 border-slate-800' : 'text-slate-400 border-slate-50'
                      }`}>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-500" />
                          <span>{st.location}</span>
                        </span>
                        <span>•</span>
                        <span>{st.teamSize}</span>
                        <span>•</span>
                        <span>{st.fundingRaised}</span>
                      </div>

                    </div>

                    {/* Card Actions (Düzenle & Sil) */}
                    <div className={`pt-4 mt-4 border-t flex items-center justify-between gap-2 transition-colors ${
                      theme === 'dark' ? 'border-slate-800/80' : 'border-slate-50'
                    }`}>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenStartupEdit(st)}
                          className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                            theme === 'dark' 
                              ? 'bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border-blue-500/30' 
                              : 'bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white border-blue-100'
                          }`}
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Düzenle</span>
                        </button>

                        {onViewStartupDetail && (
                          <button
                            onClick={() => {
                              onClose();
                              onViewStartupDetail(st);
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                              theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
                            }`}
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Önizle</span>
                          </button>
                        )}
                      </div>

                      <button
                        onClick={() => handleDeleteStartup(st.id, st.name)}
                        className={`p-1.5 rounded-xl border transition-colors cursor-pointer ${
                          theme === 'dark' ? 'bg-slate-800 hover:bg-red-950 text-slate-400 hover:text-red-400 border-slate-700' : 'bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 border-slate-100'
                        }`}
                        title="Dizinden Kaldır"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: PARTNERS & ECOSYSTEM SUPPORTERS */}
        {/* ========================================================================= */}
        {activeTab === 'partners' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-8">
            
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <h2 className={`text-lg font-bold transition-colors ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>Partner & Destekçiler</h2>
                <p className={`text-xs mt-0.5 transition-colors ${
                  theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
                }`}>Ekosistemdeki onaylı {approvedSupporters.length} kurum</p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setIsPartnerReviewMode(!isPartnerReviewMode)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    isPartnerReviewMode 
                      ? theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white shadow-md shadow-blue-100' 
                      : theme === 'dark' ? 'bg-slate-900 text-slate-400 hover:bg-slate-800' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {isPartnerReviewMode ? 'Listeye Dön' : `Başvurular (${pendingPartners.length})`}
                </button>
                <button
                  onClick={handleOpenLivePartnerCreate}
                  className={`px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-all ${
                    theme === 'dark' ? 'bg-slate-100 hover:bg-white text-slate-900' : 'bg-white border border-slate-200 text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  Yeni Partner
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {(isPartnerReviewMode ? (pendingPartners as any[]) : (approvedSupporters as any[])).map((item) => (
                <div key={item.id} className={`border rounded-2xl p-6 group transition-all ${
                  theme === 'dark' ? 'bg-slate-900/30 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-lg'
                }`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center transition-all ${
                      theme === 'dark' ? 'grayscale-[0.5] group-hover:grayscale-0' : 'border border-slate-100'
                    }`}>
                       <Building2 className="w-6 h-6 text-slate-900" />
                    </div>
                      <div className="flex items-center gap-2">
                      {isPartnerReviewMode ? (
                        <>
                          <button onClick={() => handleQuickApprovePartner(item)} className="text-blue-400 hover:text-blue-600" title="Onayla"><CheckCircle2 className="w-4 h-4" /></button>
                          <button onClick={() => handleRejectPartner(item.id, item.orgName)} className="text-slate-500 hover:text-red-400" title="Reddet & Sil"><Trash2 className="w-4 h-4" /></button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => handleOpenLivePartnerEdit(item)} className="text-slate-500 hover:text-slate-900" title="Düzenle"><Edit3 className="w-4 h-4" /></button>
                          <button onClick={() => handleDeleteLivePartner(item.id, item.name)} className="text-slate-500 hover:text-red-400 transition-colors" title="Kaldır"><Trash2 className="w-4 h-4" /></button>
                        </>
                      )}
                    </div>
                  </div>
                  <h3 className={`text-sm font-bold transition-colors ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>{isPartnerReviewMode ? item.orgName : item.name}</h3>
                  <p className={`text-xs mt-1 transition-colors ${
                    theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
                  }`}>{isPartnerReviewMode ? item.orgTypeName : item.role}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: NEWSLETTER SUBSCRIBERS MANAGEMENT (BÜLTEN ABONELERİ) */}
        {/* ========================================================================= */}
        {activeTab === 'newsletter' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-8">
            
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <h2 className={`text-lg font-bold transition-colors ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>Bülten Aboneleri</h2>
                <p className={`text-xs mt-0.5 transition-colors ${
                  theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
                }`}>{newsletterSubscribers.length} aktif kullanıcı</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative w-64">
                  <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${
                    theme === 'dark' ? 'text-slate-600' : 'text-slate-400'
                  }`} />
                  <input
                    type="text"
                    placeholder="E-posta ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-9 pr-3 py-2 rounded-xl text-xs transition-all focus:outline-none ${
                      theme === 'dark' 
                        ? 'bg-slate-900 border border-slate-800 text-white placeholder-slate-700' 
                        : 'bg-white border border-slate-200 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                </div>
                <button
                  onClick={handleCopyAllEmails}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                    theme === 'dark' ? 'bg-slate-100 hover:bg-white text-slate-900' : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {isCopiedEmails ? 'Kopyalandı!' : 'Tümünü Kopyala'}
                </button>
              </div>
            </div>

            <div className={`border rounded-2xl overflow-hidden divide-y transition-colors ${
              theme === 'dark' ? 'bg-slate-900/30 border-slate-800/80 divide-slate-800/50' : 'bg-white border-slate-100 divide-slate-100 shadow-sm'
            }`}>
              {filteredNewsletterSubscribers.map((sub) => (
                <div key={sub.id} className={`p-4 flex items-center justify-between transition-colors ${
                  theme === 'dark' ? 'hover:bg-slate-900/50' : 'hover:bg-slate-50/50'
                }`}>
                  <span className={`text-sm font-medium transition-colors ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>{sub.email}</span>
                  <div className="flex items-center gap-6">
                    <span className={`text-[10px] font-bold uppercase transition-colors ${
                      theme === 'dark' ? 'text-slate-600' : 'text-slate-400'
                    }`}>{sub.subscribedAt}</span>
                    <button onClick={() => onDeleteNewsletterSubscriber(sub.id)} className="text-slate-600 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: NEWS & ARTICLES MANAGEMENT */}
        {/* ========================================================================= */}
        {activeTab === 'news' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-8">
            
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <h2 className={`text-lg font-bold transition-colors ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>Haberler & İçerikler</h2>
                <p className={`text-xs mt-0.5 transition-colors ${
                  theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
                }`}>Ekosistem haberlerini yönetin</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative w-64">
                  <Search className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${
                    theme === 'dark' ? 'text-slate-600' : 'text-slate-400'
                  }`} />
                  <input
                    type="text"
                    placeholder="Başlık ara..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-9 pr-3 py-2 rounded-xl text-xs transition-all focus:outline-none ${
                      theme === 'dark' 
                        ? 'bg-slate-900 border border-slate-800 text-white placeholder-slate-700' 
                        : 'bg-white border border-slate-200 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                </div>
                <button
                  onClick={handleOpenNewsCreate}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                    theme === 'dark' ? 'bg-slate-100 hover:bg-white text-slate-900' : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  Yeni İçerik
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredNewsArticles.map((article) => (
                <div key={article.id} className={`border rounded-2xl overflow-hidden transition-all flex flex-col group ${
                  theme === 'dark' ? 'bg-slate-900/30 border-slate-800/80 hover:border-slate-700' : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-lg'
                }`}>
                  <div className="relative aspect-video bg-slate-900">
                    <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all" />
                    {article.isFeatured && (
                      <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-blue-600 text-white text-[10px] font-bold">MANŞET</div>
                    )}
                    {article.status === 'passive' && (
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-slate-800/90 text-slate-300 text-[10px] font-bold border border-slate-700/50 backdrop-blur-sm">PASİF</div>
                    )}
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className={`text-sm font-bold line-clamp-2 leading-snug transition-colors ${
                        theme === 'dark' ? 'text-white' : 'text-slate-900'
                      }`}>{article.title}</h3>
                      <p className={`text-[10px] font-bold uppercase mt-2 transition-colors ${
                        theme === 'dark' ? 'text-slate-600' : 'text-slate-400'
                      }`}>{article.categoryName} • {article.date}</p>
                    </div>
                    <div className={`flex items-center justify-between mt-6 pt-4 border-t transition-colors ${
                      theme === 'dark' ? 'border-slate-800/50' : 'border-slate-50'
                    }`}>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => handleToggleFeaturedNews(article.id, !!article.isFeatured, article.title)}
                          className={`text-[10px] font-bold uppercase transition-colors ${
                            theme === 'dark' ? 'text-slate-500 hover:text-white' : 'text-slate-400 hover:text-blue-600'
                          }`}
                        >
                          {article.isFeatured ? 'Manşetten Kaldır' : 'Manşet Yap'}
                        </button>
                        <button 
                          onClick={() => {
                            const newStatus = article.status === 'passive' ? 'active' : 'passive';
                            onUpdateNewsArticle({ ...article, status: newStatus });
                            showNotification(`"${article.title}" ${newStatus === 'active' ? 'aktif' : 'pasif'} olarak ayarlandı.`);
                          }}
                          className={`text-[10px] font-bold uppercase transition-colors ${
                            article.status === 'passive'
                              ? 'text-emerald-500 hover:text-emerald-400'
                              : 'text-slate-500 hover:text-slate-400'
                          }`}
                        >
                          {article.status === 'passive' ? 'Aktife Al' : 'Pasife Al'}
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <button onClick={() => handleOpenNewsEdit(article)} className="text-slate-500 hover:text-blue-400"><Edit3 className="w-4 h-4" /></button>
                        <button onClick={() => handleDeleteNews(article.id, article.title)} className="text-slate-500 hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: STATS & ECOSYSTEM OVERVIEW */}
        {/* ========================================================================= */}
        {activeTab === 'stats' && (
          <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-6">
            <div className="max-w-5xl mx-auto space-y-6">
              
              {/* Header */}
              <div>
                <h2 className={`text-xl font-bold font-display transition-colors ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  Türkiye Spor Teknolojileri Ekosistem İstatistikleri
                </h2>
                <p className={`text-xs mt-1 transition-colors ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  Doğrulanmış girişim profilleri, partnerlik havuzu ve bülten abone dinamikleri
                </p>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className={`p-6 rounded-3xl border shadow-sm transition-colors ${
                  theme === 'dark' ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
                }`}>
                  <span className={`text-[11px] font-bold uppercase tracking-wider transition-colors ${
                    theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
                  }`}>Girişimler</span>
                  <div className={`text-3xl font-bold mt-2 font-display transition-colors ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>{approvedStartups.length}</div>
                </div>

                <div className={`p-6 rounded-3xl border shadow-sm transition-colors ${
                  theme === 'dark' ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
                }`}>
                  <span className={`text-[11px] font-bold uppercase tracking-wider transition-colors ${
                    theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
                  }`}>Bekleyenler</span>
                  <div className={`text-3xl font-bold mt-2 font-display transition-colors ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>{pendingSubmissions.length}</div>
                </div>

                <div className={`p-6 rounded-3xl border shadow-sm transition-colors ${
                  theme === 'dark' ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
                }`}>
                  <span className={`text-[11px] font-bold uppercase tracking-wider transition-colors ${
                    theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
                  }`}>Partnerler</span>
                  <div className={`text-3xl font-bold mt-2 font-display transition-colors ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>{approvedSupporters.length}</div>
                </div>

                <div className={`p-6 rounded-3xl border shadow-sm transition-colors ${
                  theme === 'dark' ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
                }`}>
                  <span className={`text-[11px] font-bold uppercase tracking-wider transition-colors ${
                    theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
                  }`}>İçerikler</span>
                  <div className={`text-3xl font-bold mt-2 font-display transition-colors ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>{newsArticles.length}</div>
                </div>

                <div className={`p-6 rounded-3xl border shadow-sm transition-colors ${
                  theme === 'dark' ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
                }`}>
                  <span className={`text-[11px] font-bold uppercase tracking-wider transition-colors ${
                    theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
                  }`}>Aboneler</span>
                  <div className={`text-3xl font-bold mt-2 font-display transition-colors ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>{newsletterSubscribers.length}</div>
                </div>
              </div>

              {/* Category Breakdown Table */}
              <div className={`border rounded-3xl p-6 shadow-xl transition-colors ${
                theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
              }`}>
                <h3 className={`text-sm font-bold mb-4 transition-colors ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  Dikey Kategori Dağılımı
                </h3>
                <div className="space-y-3">
                  {[
                    { name: 'Yapay Zeka & Analitik', count: approvedStartups.filter(s => s.category === 'ai_analytics').length, color: 'bg-blue-500' },
                    { name: 'Yönetim & Dijital Platform', count: approvedStartups.filter(s => s.category === 'management_platform').length, color: 'bg-indigo-500' },
                    { name: 'Giyilebilir Cihazlar & IoT', count: approvedStartups.filter(s => s.category === 'wearables_iot').length, color: 'bg-orange-500' },
                    { name: 'Akıllı Tesis & Stadyum', count: approvedStartups.filter(s => s.category === 'smart_venues').length, color: 'bg-emerald-500' },
                    { name: 'Performans & Biyomekanik', count: approvedStartups.filter(s => s.category === 'performance_recovery').length, color: 'bg-pink-500' },
                    { name: 'Taraftar & Medya Teknolojileri', count: approvedStartups.filter(s => s.category === 'fan_media').length, color: 'bg-amber-500' }
                  ].map((cat, idx) => (
                    <div key={idx} className={`flex items-center justify-between text-xs py-2 border-b transition-colors ${
                      theme === 'dark' ? 'border-slate-800/80' : 'border-slate-50'
                    }`}>
                      <div className="flex items-center gap-2.5">
                        <div className={`w-2.5 h-2.5 rounded-full ${cat.color}`} />
                        <span className={`font-semibold transition-colors ${
                          theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                        }`}>{cat.name}</span>
                      </div>
                      <span className={`font-mono font-bold px-2 py-0.5 rounded-md transition-colors ${
                        theme === 'dark' ? 'text-white bg-slate-800' : 'text-slate-900 bg-slate-100'
                      }`}>
                        {cat.count} Girişim
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* Startup Edit Modal */}
      <StartupEditModal
        isOpen={isStartupEditModalOpen}
        onClose={() => {
          setIsStartupEditModalOpen(false);
          setEditingStartup(null);
        }}
        startup={editingStartup}
        onSave={(updatedStartup) => {
          onUpdateApprovedStartup(updatedStartup);
          showNotification(`"${updatedStartup.name}" bilgileri başarıyla güncellendi!`, 'success');
        }}
        onDelete={(id) => {
          const st = approvedStartups.find(s => s.id === id);
          handleDeleteStartup(id, st?.name || 'Girişim');
        }}
        theme={theme}
      />

      {/* Partner Edit & Approval Modal */}
      <PartnerEditModal
        isOpen={isPartnerEditModalOpen}
        onClose={() => {
          setIsPartnerEditModalOpen(false);
          setEditingPartnerSubmission(null);
          setEditingLiveSupporter(null);
        }}
        partnerSubmission={editingPartnerSubmission}
        existingSupporter={editingLiveSupporter}
        isApprovalMode={isPartnerApprovalMode}
        onSaveAndApprove={(submissionId, updatedSupporter) => {
          onApprovePartner(submissionId, updatedSupporter);
          showNotification(`Partnerlik başvurusu onaylandı ve Destekleyiciler & Partnerler alanında yayına alındı!`, 'success');
        }}
        onSaveExisting={(updatedSupporter) => {
          onUpdateApprovedPartner(updatedSupporter);
          showNotification(`"${updatedSupporter.name}" partner bilgileri güncellendi!`, 'success');
        }}
        onDeleteLive={(id) => {
          const p = approvedSupporters.find(s => s.id === id);
          handleDeleteLivePartner(id, p?.name || 'Partner');
        }}
        onRejectSubmission={(id) => {
          const p = pendingPartners.find(s => s.id === id);
          handleRejectPartner(id, p?.orgName || 'Başvuru');
        }}
        theme={theme}
      />

      {/* News Edit Modal */}
      <NewsEditModal
        isOpen={isNewsEditModalOpen}
        onClose={() => {
          setIsNewsEditModalOpen(false);
          setEditingNewsArticle(null);
        }}
        article={editingNewsArticle}
        onSave={(saved) => {
          if (editingNewsArticle) {
            onUpdateNewsArticle(saved);
            showNotification(`"${saved.title}" haberi başarıyla güncellendi!`, 'success');
          } else {
            onAddNewsArticle(saved);
            showNotification(`"${saved.title}" haberi yayınlandı!`, 'success');
          }
        }}
        onDelete={(id) => {
          const article = newsArticles.find(a => a.id === id);
          handleDeleteNews(id, article?.title || 'Haber');
        }}
        theme={theme}
      />

    </motion.div>
  );
};
