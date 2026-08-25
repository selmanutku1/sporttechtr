import React, { useState, useEffect } from 'react';
import { 
  X, 
  ExternalLink, 
  MapPin, 
  Users, 
  Calendar, 
  TrendingUp, 
  Cpu, 
  Mail, 
  Sparkles, 
  CheckCircle2, 
  ArrowLeft,
  Share2,
  Check,
  Building2,
  ShieldCheck,
  Layers,
  Award,
  BookOpen,
  ArrowUpRight,
  Send,
  Clock,
  ChevronRight,
  Bookmark
} from 'lucide-react';
import { Startup, NewsArticle } from '../types';
import { NEWS_ARTICLES } from '../data/news';
import { BrandIcon } from './BrandLogo';

interface StartupDetailModalProps {
  startup: Startup | null;
  onClose: () => void;
  onSelectArticle?: (article: NewsArticle) => void;
  articles?: NewsArticle[];
}

export const StartupDetailModal: React.FC<StartupDetailModalProps> = ({ 
  startup, 
  onClose,
  onSelectArticle,
  articles = NEWS_ARTICLES
}) => {
  const [demoRequested, setDemoRequested] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderClub, setSenderClub] = useState('');
  const [senderMessage, setSenderMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (startup) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [startup, onClose]);

  if (!startup) return null;

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoRequested(true);
    setTimeout(() => {
      setDemoRequested(false);
      setSenderName('');
      setSenderEmail('');
      setSenderClub('');
      setSenderMessage('');
    }, 4000);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Find related news for this startup
  const relatedNews = articles.filter(n => 
    n.status !== 'passive' && (
      n.tags.some(tag => tag.toLowerCase().includes(startup.name.toLowerCase())) ||
      n.title.toLowerCase().includes(startup.name.toLowerCase()) ||
      n.excerpt.toLowerCase().includes(startup.name.toLowerCase())
    )
  );

  return (
    <div 
      className="fixed inset-0 z-50 bg-white overflow-y-auto animate-in fade-in duration-200"
      id={`startup-fullpage-${startup.id}`}
    >
      {/* Sticky Editorial Top Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Back Button & Breadcrumbs */}
          <div className="flex items-center gap-3 overflow-hidden">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold border border-slate-200/80 transition-colors shrink-0"
              title="Girişimler Dizinine Dön"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Dizine Dön</span>
            </button>

            <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-500 truncate font-medium">
              <span className="text-slate-400">SportTech Türkiye</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              <span className="text-slate-600 truncate">{startup.categoryName}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              <span className="text-slate-900 font-bold truncate flex items-center gap-1.5">
                <span>{startup.name}</span>
                <BrandIcon className="w-3.5 h-3.5 shrink-0" />
              </span>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={startup.website}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
            >
              <span>Resmi Web Sitesi</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-semibold flex items-center gap-1 transition-colors"
              title="Bağlantıyı Kopyala"
            >
              {copied ? <Check className="w-4 h-4 text-blue-600" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`p-2 rounded-xl border text-xs font-semibold transition-colors ${
                isSaved ? 'bg-amber-50 border-amber-300 text-amber-600' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
              title="Listeme Kaydet"
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500 text-amber-500' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-colors ml-1"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Editorial Article Container */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        
        {/* Dossier Eyebrow & Category */}
        <div className="flex flex-wrap items-center gap-2.5 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/70 border border-blue-200 text-blue-800 text-[11px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>Özel Girişim Dosyası</span>
          </span>
          <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-semibold border border-slate-200">
            {startup.categoryName}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-blue-600 text-white text-[11px] font-bold shadow-2xs">
            {startup.stage} Aşaması
          </span>
        </div>

        {/* Big Editorial Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
          {startup.name}: {startup.tagLine}
        </h1>

        {/* Byline & Verification Meta */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-200/90 mb-8 text-xs text-slate-600">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs font-display shadow-2xs">
              ST
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900">SportTech Türkiye Araştırma & Girişim Masası</span>
                <ShieldCheck className="w-4 h-4 text-blue-600" title="Doğrulanmış Profil" />
              </div>
              <span className="text-slate-500 text-[11px]">Sektörel İnceleme ve Şeffaf Girişim Profili</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Kuruluş: {startup.foundedYear}</span>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>5 dk okuma</span>
            </span>
          </div>
        </div>

        {/* Hero Feature Cover Image */}
        <div className="relative rounded-3xl overflow-hidden border border-slate-200 mb-8 bg-slate-100 shadow-sm">
          <div className="relative h-72 sm:h-96 w-full">
            <img 
              src={startup.coverImage} 
              alt={startup.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Startup Floating Identity Plate */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
              <div className="flex items-center gap-4">
                <img 
                  src={startup.logo} 
                  alt={startup.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-contain border-2 border-white bg-white p-2 shadow-xl"
                />
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display drop-shadow-xs flex items-center gap-2">
                    <span>{startup.name}</span>
                    <BrandIcon className="w-6 h-6 shrink-0" />
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-200 font-medium">
                    {startup.location} • {startup.teamSize} • {startup.categoryName}
                  </p>
                </div>
              </div>

              <a
                href={startup.website}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs flex items-center gap-2 shadow-lg transition-colors"
              >
                <span>{startup.website.replace('https://', '')}</span>
                <ArrowUpRight className="w-4 h-4 text-orange-500" />
              </a>
            </div>
          </div>
          
          <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 italic flex items-center justify-between">
            <span>Fotoğraf & İnceleme: {startup.name} dijital platform altyapısı ve spor çözümleri.</span>
            <span className="font-semibold text-slate-700">SportTech Arşivi</span>
          </div>
        </div>

        {/* Lead Summary Pull Quote */}
        <div className="p-6 rounded-2xl bg-blue-50/80 border border-blue-200/90 mb-10">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-800 mb-1">
                Yönetici Özeti & Temel Değer Önerisi
              </h3>
              <p className="text-base sm:text-lg font-medium text-slate-800 leading-relaxed">
                "{startup.featuredHighlight || startup.tagLine}"
              </p>
            </div>
          </div>
        </div>

        {/* Article Body Chapters */}
        <div className="space-y-10 text-slate-800">
          
          {/* Chapter 1: Giriş ve Çözüm */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span>Giriş & Çözülen Temel Sektörel Problem</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              {startup.description}
            </p>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              {startup.fullStory}
            </p>
          </section>

          {/* Chapter 2: Doğrulanmış Temel Metrikler */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span>Doğrulanmış Temel Performans Göstergeleri (KPIs)</span>
            </h2>
            <p className="text-sm text-slate-600">
              Girişimin ekosistemdeki operasyonel büyüklüğünü ve sağladığı etkiyi gösteren güncel rakamlar:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {startup.keyMetrics.map((metric, idx) => (
                <div 
                  key={idx} 
                  className="bg-slate-50 hover:bg-slate-100/80 p-4 rounded-2xl border border-slate-200 transition-colors"
                >
                  <span className="text-xs text-slate-500 font-medium block mb-1">
                    {metric.label}
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-blue-700 font-mono tracking-tight block">
                    {metric.value}
                  </span>
                  <span className="text-[10px] text-blue-600 font-semibold mt-1 inline-flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-orange-500" /> Doğrulandı
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Chapter 2.5: Ürün Mimarisi & Arayüz Galerisi (SportsFly & Platform Görselleri) */}
          {startup.id === 'sportsfly' && (
            <section className="space-y-6 pt-4 border-t border-slate-200">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blue-600" />
                  <span>SportsFly Bütünleşik Hizmet Mimarisi ve Ekosistem Döngüsü</span>
                </h2>
                <p className="text-sm text-slate-600">
                  Spor pazarlaması, dijital kütüphane, web çözümleri, sporda satış ve spor iletişimi ile 5 temel yönetim modülü:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
                {/* Visual 1: Circular Ecosystem Infographic */}
                <div className="rounded-3xl border border-slate-200 bg-slate-50 overflow-hidden flex flex-col justify-between shadow-xs">
                  <div className="p-4 bg-white flex items-center justify-center border-b border-slate-200 h-52">
                    <img 
                      src="/sportsfly-wheel.svg" 
                      alt="SportsFly Hizmet Mimarisi ve Ekosistem Döngüsü"
                      referrerPolicy="no-referrer"
                      className="w-full max-h-44 object-contain hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 bg-slate-50 text-xs text-slate-700 space-y-1">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      <span>5 Hizmet & 5 Modül Döngüsü</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-[11px]">
                      Pazarlama, kütüphane, web, satış ve iletişim ile antrenör, raporlama, sadakat ve veri modülleri.
                    </p>
                  </div>
                </div>

                {/* Visual 2: Tablet Schedule & Calendar UI */}
                <div className="rounded-3xl border border-slate-200 bg-slate-50 overflow-hidden flex flex-col justify-between shadow-xs">
                  <div className="p-4 bg-white flex items-center justify-center border-b border-slate-200 h-52">
                    <img 
                      src="/sportsfly-tablet-app.svg" 
                      alt="SportsFly Tablet & Mobil Randevu Yönetimi"
                      referrerPolicy="no-referrer"
                      className="w-full max-h-44 object-contain hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 bg-slate-50 text-xs text-slate-700 space-y-1">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      <span>Haftalık Ders & Kort Takvimi</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-[11px]">
                      Tenis, pilates, yüzme ve grup derslerinin mobil ve tablet üzerinden anlık rezervasyon takibi.
                    </p>
                  </div>
                </div>

                {/* Visual 3: Manager Dashboard & Member Management */}
                <div className="rounded-3xl border border-slate-200 bg-slate-50 overflow-hidden flex flex-col justify-between shadow-xs">
                  <div className="p-4 bg-white flex items-center justify-center border-b border-slate-200 h-52">
                    <img 
                      src="/sportsfly-dashboard.svg" 
                      alt="SportsFly Yönetim Paneli ve Sporcu Takibi"
                      referrerPolicy="no-referrer"
                      className="w-full max-h-44 object-contain hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 bg-slate-50 text-xs text-slate-700 space-y-1">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                      <span>Kulüp & Sporcu Veri Yönetimi</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-[11px]">
                      Üye, eğitmen, gelir raporları ve akademi yoklamalarının tek bulut panelden yönetimi.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Chapter 2.6: Sporpuan Harita & Puanlama Arayüz Galerisi */}
          {startup.id === 'sporpuan' && (
            <section className="space-y-6 pt-4 border-t border-slate-200">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blue-600" />
                  <span>Sporpuan Türkiye Haritası & Objektif Puanlama Paneli</span>
                </h2>
                <p className="text-sm text-slate-600">
                  81 ilde 1,400+ tesisin canlı harita konumu, puan rozetleri ve şeffaf kullanıcı değerlendirme arayüzü:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
                {/* Visual 1: Interactive Map of Turkey */}
                <div className="rounded-3xl border border-slate-200 bg-slate-50 overflow-hidden flex flex-col justify-between shadow-xs">
                  <div className="p-4 bg-white flex items-center justify-center border-b border-slate-200 h-56">
                    <img 
                      src="/sporpuan-map-v2.svg" 
                      alt="Sporpuan Türkiye İnteraktif Tesis Haritası"
                      referrerPolicy="no-referrer"
                      className="w-full max-h-48 object-contain hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 bg-slate-50 text-xs text-slate-700 space-y-1">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      <span>İnteraktif Türkiye Haritası & Tesis Puan Pinleri</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-[11px]">
                      İstanbul, Ankara, İzmir ve Antalya başta olmak üzere tesislerin 10 üzerinden anlık puan rozetleriyle coğrafi keşfi.
                    </p>
                  </div>
                </div>

                {/* Visual 2: Review and Score Showcase */}
                <div className="rounded-3xl border border-slate-200 bg-slate-50 overflow-hidden flex flex-col justify-between shadow-xs">
                  <div className="p-4 bg-white flex items-center justify-center border-b border-slate-200 h-56">
                    <img 
                      src="/sporpuan-cover.svg" 
                      alt="Sporpuan Değerlendirme & Tesis Arama Paneli"
                      referrerPolicy="no-referrer"
                      className="w-full max-h-48 object-contain hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 bg-slate-50 text-xs text-slate-700 space-y-1">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                      <span>Şeffaf Kriter & Puanlama Arayüzü</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-[11px]">
                      Ekipman, hijyen, eğitmen kalitesi ve lokasyon parametreleriyle doğrulanmış üye yorumları ve keşif motoru.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Chapter 2.7: Mera Metabolik AI & Sporcu Analiz Galerisi */}
          {startup.id === 'mera' && (
            <section className="space-y-6 pt-4 border-t border-slate-200">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-blue-600" />
                    <span>Mera Athlete Intelligence & Mera AI Sohbet Arayüzü</span>
                  </h2>
                  <a
                    href="https://demo.mera.fit/launch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-xs transition-colors"
                  >
                    <span>İnteraktif Public Demo'yu Aç</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <p className="text-sm text-slate-600">
                  VO₂max test verileri, sinir ağı metabolik eşik tespiti ve koçlar için yapay zeka destekli performans analizi:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
                {/* Visual 1: Mera AI & Athlete Dashboard */}
                <div className="rounded-3xl border border-slate-200 bg-slate-50 overflow-hidden flex flex-col justify-between shadow-xs">
                  <div className="p-4 bg-slate-950 flex items-center justify-center border-b border-slate-800 h-56">
                    <img 
                      src="/mera-cover.svg" 
                      alt="Mera Athlete Dashboard & Mera AI Sohbet Arayüzü"
                      referrerPolicy="no-referrer"
                      className="w-full max-h-48 object-contain hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 bg-slate-50 text-xs text-slate-700 space-y-1">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      <span>Metabolik Parmak İzi & Mera AI Arayüzü</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-[11px]">
                      7 eksenli hedef hazır oluş radarı (VO₂max, FatMax, Termal Dayanıklılık) ve koçlar için otomatik antrenman planlama diyaloğu.
                    </p>
                  </div>
                </div>

                {/* Visual 2: Team at ITU Seed / Innogate */}
                <div className="rounded-3xl border border-slate-200 bg-slate-50 overflow-hidden flex flex-col justify-between shadow-xs">
                  <div className="p-4 bg-slate-950 flex items-center justify-center border-b border-slate-800 h-56">
                    <img 
                      src="/mera-team-ituseed.svg" 
                      alt="Mera Ekibi - İTÜ Seed & Innogate Hızlandırma Programı"
                      referrerPolicy="no-referrer"
                      className="w-full max-h-48 object-contain hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 bg-slate-50 text-xs text-slate-700 space-y-1">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      <span>İTÜ Seed & Innogate Hızlandırma Programı</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-[11px]">
                      İstanbul merkezli spor bilimi ve veri ekibi; üniversitelerin spor fizyolojisi laboratuvarları ve elit kulüplerle pilot uygulamalar yürütüyor.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Chapter 3: Teknoloji Mimarisi & Kurucu Ekip */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            
            {/* Tech Stack Box */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-blue-600" />
                <span>Teknoloji Yığını & Altyapı</span>
              </h3>
              <p className="text-xs text-slate-600">
                Girişimin ölçeklenebilir bulut ve yazılım mimarisinde kullanılan teknolojiler:
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {startup.techStack.map((tech, idx) => (
                  <span 
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-white text-xs font-mono font-medium text-slate-800 border border-slate-200 shadow-2xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Founders & Leadership */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span>Kurumsal Yapı & Yönetim</span>
              </h3>
              <p className="text-xs text-slate-600">
                Girişimin liderlik ve operasyonel kadrosu:
              </p>
              <div className="space-y-2 pt-2">
                {startup.founders.map((f, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200">
                    <div className="text-xs sm:text-sm font-bold text-slate-900">{f.name}</div>
                    <div className="text-xs text-slate-500">{f.role}</div>
                  </div>
                ))}
              </div>
            </div>

          </section>

          {/* Tags */}
          <div className="pt-4 border-t border-slate-200">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Sektörel Etiketler
            </span>
            <div className="flex flex-wrap gap-2">
              {startup.tags.map((tag, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-slate-100 text-xs font-semibold text-slate-700 border border-slate-200"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Chapter 4: İlgili Ekosistem Haberleri & Analizler */}
          {relatedNews.length > 0 && (
            <section className="pt-6 border-t border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold font-display text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-orange-500" />
                  <span>{startup.name} İle İlgili Analiz ve Haberler</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedNews.map((news) => (
                  <div 
                    key={news.id}
                    onClick={() => {
                      onClose();
                      if (onSelectArticle) onSelectArticle(news);
                    }}
                    className="p-4 rounded-2xl bg-slate-50 hover:bg-blue-50/40 border border-slate-200 hover:border-blue-300 transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block mb-1">
                        {news.categoryName} • {news.date}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2 mb-2">
                        {news.title}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-2">
                        {news.excerpt}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-blue-600 flex items-center gap-1 pt-3 mt-2 border-t border-slate-200/60">
                      <span>Haberi Oku</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Chapter 5: Kurumsal Pilot, Demo & İletişim Formu */}
          <section id="startup-contact-section" className="pt-8 border-t border-slate-200">
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-4">
                  <Mail className="w-3.5 h-3.5 text-orange-400" />
                  <span>Doğrudan İletişim & Demo</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white mb-2">
                  {startup.name} ile İletişime Geçin & Demo Talep Edin
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm mb-6 leading-relaxed">
                  Spor kulübünüz, tesisiniz, akademiniz veya yatırım fonunuz için {startup.name} çözümlerini ilk elden deneyimleyin.
                </p>

                {demoRequested ? (
                  <div className="p-6 bg-blue-600/30 border border-blue-500 rounded-2xl text-center space-y-2 animate-in zoom-in-95">
                    <CheckCircle2 className="w-10 h-10 text-blue-400 mx-auto" />
                    <h4 className="text-base font-bold text-white">Talebiniz Başarıyla İletildi!</h4>
                    <p className="text-xs text-slate-200">
                      {startup.name} ekibi ve SportTech Türkiye koordinasyon birimi en kısa sürede sizinle iletişime geçecektir.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleDemoSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Adınız Soyadınız *</label>
                        <input
                          type="text"
                          required
                          value={senderName}
                          onChange={(e) => setSenderName(e.target.value)}
                          placeholder="Ad Soyad"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">E-posta Adresiniz *</label>
                        <input
                          type="email"
                          required
                          value={senderEmail}
                          onChange={(e) => setSenderEmail(e.target.value)}
                          placeholder="ornek@kulup.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Kurum / Tesis / Kulüp Adı</label>
                        <input
                          type="text"
                          value={senderClub}
                          onChange={(e) => setSenderClub(e.target.value)}
                          placeholder="Spor Salonu, Akademi, Yatırımcı vb."
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Doğrudan İletişim E-postası</label>
                        <div className="px-3.5 py-2.5 rounded-xl bg-slate-800/50 border border-slate-700/60 text-xs text-blue-400 font-mono flex items-center justify-between">
                          <span>{startup.contactEmail}</span>
                          <ShieldCheck className="w-4 h-4 text-blue-400" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Mesajınız / Talep Detayı</label>
                      <textarea
                        rows={3}
                        value={senderMessage}
                        onChange={(e) => setSenderMessage(e.target.value)}
                        placeholder="Örn: Tesisimiz için SportsFly demo sürümünü incelemek ve fiyat teklifi almak istiyoruz."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 resize-none"
                      />
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                      <div className="text-[11px] text-slate-400">
                        🔒 Bilgileriniz yalnızca {startup.name} ile paylaşılır.
                      </div>
                      <button
                        type="submit"
                        className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 active:scale-95 transition-all shadow-md"
                      >
                        <Send className="w-4 h-4 text-orange-300" />
                        <span>Demo & Pilot Talebini Gönder</span>
                      </button>
                    </div>
                  </form>
                )}

              </div>
            </div>
          </section>

        </div>

        {/* Bottom Back Button Bar */}
        <div className="mt-14 pt-6 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Girişimler Dizinine Geri Dön</span>
          </button>

          <a
            href={startup.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors shadow-xs"
          >
            <span>{startup.name} Web Sitesini Aç</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </article>
    </div>
  );
};
