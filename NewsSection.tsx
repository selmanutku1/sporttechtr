import React, { useState, useMemo } from 'react';
import { 
  Newspaper, 
  Clock, 
  Calendar, 
  ArrowRight, 
  Heart, 
  Share2, 
  Sparkles, 
  Tag, 
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { NewsArticle, NewsCategory } from '../types';
import { NEWS_ARTICLES } from '../data/news';

interface NewsSectionProps {
  onSelectArticle: (article: NewsArticle) => void;
  articles?: NewsArticle[];
}

export const NewsSection: React.FC<NewsSectionProps> = ({ onSelectArticle, articles }) => {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('all');

  const currentArticles = useMemo(() => {
    const rawArticles = articles && articles.length > 0 ? articles : NEWS_ARTICLES;
    return rawArticles.filter(a => a.status !== 'passive');
  }, [articles]);

  const categories: { id: NewsCategory; label: string }[] = [
    { id: 'all', label: 'Tüm Haberler' },
    { id: 'ecosystem', label: 'Ekosistem & Sporsepeti' },
    { id: 'ai_data', label: 'Yapay Zeka & Performans' },
    { id: 'management_platform', label: 'SportsFly & Yönetim Yazılımları' },
    { id: 'community_rating', label: 'Sporpuan & Tesis Puanlama' }
  ];

  const filteredArticles = useMemo(() => {
    if (selectedCategory === 'all') return currentArticles;
    return currentArticles.filter(a => a.category === selectedCategory);
  }, [selectedCategory, currentArticles]);

  const featuredArticle = currentArticles.find(a => a.isFeatured) || currentArticles[0];
  const listArticles = filteredArticles.filter(a => a.id !== featuredArticle?.id || selectedCategory !== 'all');

  return (
    <section id="news" className="py-20 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
              <Newspaper className="w-3.5 h-3.5 text-orange-500" />
              <span>Haberler & Analizler</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
              Spor Teknolojileri <br className="hidden sm:inline" />
              <span className="text-blue-600">
                Gündemi ve Trend Raporları
              </span>
            </h2>
          </div>

          <p className="text-slate-600 text-xs sm:text-sm max-w-md">
            Yatırım turları, kulüp-startup işbirlikleri, yapay zeka analizleri ve küresel spor inovasyonları.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Featured Big Spotlight Card */}
        {selectedCategory === 'all' && featuredArticle && (
          <div 
            onClick={() => onSelectArticle(featuredArticle)}
            className="mb-10 bg-slate-50 border border-slate-200 hover:border-blue-200 rounded-3xl overflow-hidden cursor-pointer group transition-all shadow-xs hover:shadow-md"
            id="featured-news-card"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Image with Tag */}
              <div className="lg:col-span-6 relative aspect-video lg:aspect-auto lg:h-[360px] overflow-hidden">
                <img 
                  src={featuredArticle.coverImage} 
                  alt={featuredArticle.title}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-orange-500 text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
                    Öne Çıkan Rapor
                  </span>
                </div>
              </div>

              {/* Text Info */}
              <div className="lg:col-span-6 p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="text-blue-700 font-semibold">{featuredArticle.categoryName}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    {featuredArticle.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    {featuredArticle.readTime}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                  {featuredArticle.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {featuredArticle.excerpt}
                </p>

                {/* Author & CTA */}
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img 
                      src={featuredArticle.author.avatar} 
                      alt={featuredArticle.author.name}
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-full object-cover border border-slate-300"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">{featuredArticle.author.name}</span>
                      <span className="text-[10px] text-slate-500">{featuredArticle.author.role}</span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform">
                    <span>Raporu Oku</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* Regular Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listArticles.map((article) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="bg-white hover:border-blue-200 border border-slate-200 rounded-2xl overflow-hidden cursor-pointer group transition-all flex flex-col justify-between shadow-xs hover:shadow-md"
              id={`news-card-${article.id}`}
            >
              <div>
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={article.coverImage} 
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-xs border border-slate-200 text-[10px] font-bold text-slate-800 shadow-2xs">
                    {article.categoryName}
                  </span>
                </div>

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                    {article.title}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-5 pt-0 border-t border-slate-100 mt-3 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-500">
                  {article.author.name}
                </span>
                <span className="text-blue-600 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Devamını Oku</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
