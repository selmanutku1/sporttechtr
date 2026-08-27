import React, { useState, useEffect, useMemo } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  Heart, 
  Share2, 
  Bookmark, 
  Check, 
  Tag, 
  ArrowLeft,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  ArrowUpRight,
  Rocket,
  Linkedin,
  Twitter,
  MessageCircle
} from 'lucide-react';
import { NewsArticle, Startup } from '../types';
import { STARTUPS } from '../data/startups';
import { NEWS_ARTICLES } from '../data/news';
import { useSEO } from '../hooks/useSEO';
import { useLanguage } from '../context/LanguageContext';
import { translateNewsArticle, translateStartup } from '../lib/translator';

interface NewsDetailModalProps {
  article: NewsArticle | null;
  onClose: () => void;
  onSelectStartup?: (startup: Startup) => void;
  onSelectArticle?: (article: NewsArticle) => void;
  articles?: NewsArticle[];
}

export const NewsDetailModal: React.FC<NewsDetailModalProps> = ({ 
  article: rawArticle, 
  onClose,
  onSelectStartup,
  onSelectArticle,
  articles = NEWS_ARTICLES
}) => {
  const { language, t } = useLanguage();

  const article = useMemo(() => {
    if (!rawArticle) return null;
    return translateNewsArticle(rawArticle, language);
  }, [rawArticle, language]);

  const [likes, setLikes] = useState(article ? article.likesCount : 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Sync likes state when article changes
  useEffect(() => {
    if (article) {
      setLikes(article.likesCount);
      setHasLiked(false);
    }
  }, [article]);

  // Dynamically update head meta tags for Open Graph and Twitter Card
  useSEO({
    title: article ? `${article.title} | SportTech Türkiye` : undefined,
    description: article ? (article.excerpt || article.title) : undefined,
    image: article ? article.coverImage : undefined,
    type: 'article'
  });

  // Find other articles
  const otherArticles = useMemo(() => {
    if (!article) return [];
    return articles
      .filter(a => a.id !== article.id && a.status !== 'passive')
      .slice(0, 3)
      .map(other => translateNewsArticle(other, language));
  }, [articles, article, language]);

  // Find related startups
  const relatedStartups = useMemo(() => {
    if (!article) return [];
    return STARTUPS.filter(s => 
      article.title.toLowerCase().includes(s.name.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(s.name.toLowerCase()) ||
      article.tags.some(t => t.toLowerCase().includes(s.name.toLowerCase()))
    ).map(s => translateStartup(s, language));
  }, [article, language]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (article) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [article, onClose]);

  if (!article) return null;

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
    } else {
      setLikes(prev => prev - 1);
      setHasLiked(false);
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(article.title);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    setShowShareMenu(false);
  };

  const shareOnLinkedin = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    setShowShareMenu(false);
  };

  const shareOnWhatsapp = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(article.title);
    window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
    setShowShareMenu(false);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-white overflow-y-auto animate-in fade-in duration-200"
      id={`news-fullpage-${article.id}`}
    >
      <title>{article.title} | SportTech Türkiye</title>
      <meta name="description" content={article.excerpt} />
      <meta property="og:title" content={article.title} />
      <meta property="og:description" content={article.excerpt} />
      <meta property="og:image" content={`https://sporttech.com.tr/api/og-image/news/${article.id}.png`} />
      {/* Sticky Editorial Top Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Back Button & Breadcrumbs */}
          <div className="flex items-center gap-3 overflow-hidden">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold border border-slate-200/80 transition-colors shrink-0"
              title={language === 'tr' ? "Haberler Bölümüne Dön" : "Back to News Section"}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{language === 'tr' ? "Haberlere Dön" : "Back to News"}</span>
            </button>

            <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-500 truncate font-medium">
              <span className="text-slate-400">SportTech Türkiye</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              <span className="text-slate-600 truncate">{article.categoryName}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              <span className="text-slate-900 font-bold truncate">{article.title}</span>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Like Button */}
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                hasLiked 
                  ? 'bg-rose-50 text-rose-600 border-rose-300' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-rose-600 text-rose-600' : ''}`} />
              <span>{likes}</span>
            </button>

            {/* Share Button with Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1 transition-colors ${
                  showShareMenu ? 'bg-blue-50 border-blue-300 text-blue-600' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                }`}
                title={language === 'tr' ? "Haberi Paylaş" : "Share News"}
              >
                <Share2 className="w-4 h-4" />
              </button>

              {showShareMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setShowShareMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-20 animate-in zoom-in-95 duration-100 origin-top-right">
                    <button
                      onClick={shareOnLinkedin}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <Linkedin className="w-4 h-4 text-[#0077b5]" />
                      <span>{language === 'tr' ? "LinkedIn'de Paylaş" : "Share on LinkedIn"}</span>
                    </button>
                    <button
                      onClick={shareOnTwitter}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <Twitter className="w-4 h-4 text-[#1da1f2]" />
                      <span>{language === 'tr' ? "Twitter'da Paylaş" : "Share on Twitter"}</span>
                    </button>
                    <button
                      onClick={shareOnWhatsapp}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-[#25d366]" />
                      <span>{language === 'tr' ? "WhatsApp'ta Gönder" : "Share on WhatsApp"}</span>
                    </button>
                    <div className="h-px bg-slate-100 my-1" />
                    <button
                      onClick={handleShare}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span className="text-emerald-600 font-medium">{language === 'tr' ? "Kopyalandı!" : "Copied!"}</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-4 h-4 text-slate-400" />
                          <span>{language === 'tr' ? "Bağlantıyı Kopyala" : "Copy Link"}</span>
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Bookmark */}
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`p-2 rounded-xl border text-xs font-semibold transition-colors ${
                isSaved ? 'bg-amber-50 border-amber-300 text-amber-600' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
              title={language === 'tr' ? "Haberi Kaydet" : "Bookmark News"}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500 text-amber-500' : ''}`} />
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-colors ml-1"
              aria-label={language === 'tr' ? "Kapat" : "Close"}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Editorial Article Container */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        
        {/* Category Pill */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-full bg-blue-100/70 border border-blue-200 text-blue-800 text-[11px] font-bold uppercase tracking-wider">
            {article.categoryName}
          </span>
          {article.isFeatured && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-100/80 border border-orange-200 text-orange-900 text-[11px] font-bold">
              <Sparkles className="w-3 h-3 text-orange-600" />
              <span>{language === 'tr' ? "Manşet Analiz" : "Headline Analysis"}</span>
            </span>
          )}
        </div>

        {/* Big Editorial Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight leading-[1.18] mb-6">
          {article.title}
        </h1>

        {/* Author Byline & Publication Date */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-200/90 mb-8 text-xs text-slate-600">
          <div className="flex items-center gap-3">
            <img 
              src={article.author.avatar} 
              alt={article.author.name}
              referrerPolicy="no-referrer"
              className="w-11 h-11 rounded-full object-cover border-2 border-blue-500/20"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-900 text-sm">{article.author.name}</span>
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <span className="text-slate-500 text-xs">{article.author.role}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{article.date}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{article.readTime}</span>
            </span>
          </div>
        </div>

        {/* Hero Feature Cover Image */}
        <div className="rounded-3xl overflow-hidden border border-slate-200 mb-8 bg-slate-100 shadow-sm">
          <div className="relative h-72 sm:h-96 w-full">
            <img 
              src={article.coverImage} 
              alt={article.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
            <span>{language === 'tr' ? "Fotoğraf: SportTech Türkiye Editoryal Arşivi" : "Photo: SportTech Turkey Editorial Archives"}</span>
            <span className="font-semibold text-slate-700">sporttech.com.tr</span>
          </div>
        </div>

        {/* Lead Summary Excerpt */}
        <div className="p-6 rounded-2xl bg-slate-50 border-l-4 border-blue-600 text-slate-800 text-base sm:text-lg font-medium leading-relaxed mb-8">
          {article.excerpt}
        </div>

        {/* Rich Article Paragraphs */}
        <div className="space-y-6 text-slate-800 text-base sm:text-lg leading-relaxed font-normal">
          {article.content.map((paragraph, idx) => (
            <React.Fragment key={idx}>
              <p className="leading-relaxed">
                {paragraph}
              </p>

              {/* Contextual Visual Module for SportsFly / Sporsepeti */}
              {idx === 0 && article.tags.includes('SportsFly') && (
                <div className="my-8 p-4 rounded-3xl bg-slate-50 border border-slate-200 shadow-xs">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <div className="bg-white p-3 rounded-2xl border border-slate-200 flex items-center justify-center">
                      <img 
                        src="/sportsfly-wheel.svg" 
                        alt="SportsFly Hizmet Modülleri"
                        referrerPolicy="no-referrer"
                        className="w-full max-w-[260px] object-contain"
                      />
                    </div>
                    <div className="bg-white p-3 rounded-2xl border border-slate-200 flex items-center justify-center">
                      <img 
                        src="/sportsfly-tablet-app.svg" 
                        alt="SportsFly Tablet Takvimi"
                        referrerPolicy="no-referrer"
                        className="w-full max-w-[320px] object-contain"
                      />
                    </div>
                  </div>
                  <div className="mt-3 text-center text-xs text-slate-500 font-medium">
                    {language === 'tr' 
                      ? "SportsFly Bütünleşik Ekosistem Döngüsü (Pazarlama, Satış, İletişim, Kütüphane, Web) ve Tablet Randevu Arayüzü" 
                      : "SportsFly Integrated Ecosystem Loop (Marketing, Sales, Communication, Library, Web) & Tablet Booking Interface"}
                  </div>
                </div>
              )}

              {/* Contextual Visual Module for fmag.tr */}
              {idx === 1 && article.tags.includes('fmag.tr') && (
                <div className="my-8 rounded-3xl overflow-hidden border border-slate-200 shadow-sm">
                  <img 
                    src="/fmag-stadium.png" 
                    alt="fmag.tr - Türkiye'nin Profesyonel Menajerlik Dizini"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover"
                  />
                  <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 text-center italic">
                    {language === 'tr' 
                      ? "fmag.tr: Türkiye'nin Profesyonel Menajerlik Dizini ve Futbolcu Veri Ağı" 
                      : "fmag.tr: Turkey's Professional Agency Registry & Footballer Data Network"}
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Tags, Share & Source Attribution */}
        <div className="mt-10 pt-6 border-t border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Tag className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-bold text-slate-500 mr-1">{language === 'tr' ? "Etiketler:" : "Tags:"}</span>
              {article.tags.map((tag, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-slate-100 text-xs font-semibold text-slate-700 border border-slate-200"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 mr-2">{language === 'tr' ? "Bu Analizi Paylaş:" : "Share This Analysis:"}</span>
              <button 
                onClick={shareOnLinkedin}
                className="p-2 rounded-xl bg-slate-50 hover:bg-[#0077b5]/10 text-slate-600 hover:text-[#0077b5] border border-slate-200 transition-all"
                title={language === 'tr' ? "LinkedIn'de Paylaş" : "Share on LinkedIn"}
              >
                <Linkedin className="w-4 h-4" />
              </button>
              <button 
                onClick={shareOnTwitter}
                className="p-2 rounded-xl bg-slate-50 hover:bg-[#1da1f2]/10 text-slate-600 hover:text-[#1da1f2] border border-slate-200 transition-all"
                title={language === 'tr' ? "Twitter'da Paylaş" : "Share on Twitter"}
              >
                <Twitter className="w-4 h-4" />
              </button>
              <button 
                onClick={shareOnWhatsapp}
                className="p-2 rounded-xl bg-slate-50 hover:bg-[#25d366]/10 text-slate-600 hover:text-[#25d366] border border-slate-200 transition-all"
                title={language === 'tr' ? "WhatsApp'ta Paylaş" : "Share on WhatsApp"}
              >
                <MessageCircle className="w-4 h-4" />
              </button>
              <button 
                onClick={handleShare}
                className={`p-2 rounded-xl border transition-all ${
                  copied ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                }`}
                title={language === 'tr' ? "Bağlantıyı Kopyala" : "Copy Link"}
              >
                {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {article.source && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
              <span><strong>{language === 'tr' ? "Kaynak:" : "Source:"}</strong> {article.source}</span>
              <span className="text-slate-400">{language === 'tr' ? "Doğrulanmış İçerik" : "Verified Content"}</span>
            </div>
          )}
        </div>

        {/* Related Startups in this article */}
        {relatedStartups.length > 0 && (
          <div className="mt-10 pt-8 border-t border-slate-200">
            <h3 className="text-lg font-bold font-display text-slate-900 mb-4 flex items-center gap-2">
              <Rocket className="w-4 h-4 text-orange-500" />
              <span>{language === 'tr' ? "Bu Haberde Adı Geçen Girişimler" : "Startups Mentioned In This Article"}</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedStartups.map((st) => (
                <div
                  key={st.id}
                  onClick={() => {
                    onClose();
                    if (onSelectStartup) onSelectStartup(st);
                  }}
                  className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer group flex items-center gap-3.5"
                >
                  <img 
                    src={st.logo} 
                    alt={st.name} 
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200 p-0.5 bg-white shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                      {st.name}
                    </h4>
                    <p className="text-xs text-slate-500 truncate">{st.tagLine}</p>
                    <span className="text-[11px] text-blue-600 font-semibold flex items-center gap-1 mt-1">
                    <span>{language === 'tr' ? "Girişim Profilini İncele" : "View Startup Profile"}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Editorial Articles */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <h3 className="text-xl font-bold font-display text-slate-900 mb-6 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span>{language === 'tr' ? "Diğer Spor Teknolojisi Haberleri" : "Other Sports Technology News"}</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {otherArticles.map((other) => (
              <div
                key={other.id}
                onClick={() => {
                  if (onSelectArticle) {
                    onSelectArticle(other);
                  }
                }}
                className="p-4 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-blue-200 hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block mb-1">
                    {other.categoryName}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-2 mb-2">
                    {other.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    {other.excerpt}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span>{other.date}</span>
                  <span className="text-blue-600 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                    {language === 'tr' ? "Oku →" : "Read →"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Back Button Bar */}
        <div className="mt-12 pt-6 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'tr' ? "Haberler Bölümüne Geri Dön" : "Back to News Section"}</span>
          </button>

          <span className="text-xs text-slate-400 font-mono">
            SportTech Türkiye © 2026
          </span>
        </div>

      </article>
    </div>
  );
};
