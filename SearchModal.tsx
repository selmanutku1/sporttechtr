import React, { useState, useEffect } from 'react';
import { 
  Search, 
  X, 
  Rocket, 
  Newspaper, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { STARTUPS } from '../data/startups';
import { NEWS_ARTICLES } from '../data/news';
import { SUPPORTERS } from '../data/supporters';
import { Startup, NewsArticle, Supporter } from '../types';
import { BrandIcon } from './BrandLogo';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStartup: (s: Startup) => void;
  onSelectArticle: (a: NewsArticle) => void;
  startups?: Startup[];
  articles?: NewsArticle[];
  supporters?: Supporter[];
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectStartup,
  onSelectArticle,
  startups = STARTUPS,
  articles = NEWS_ARTICLES,
  supporters = SUPPORTERS
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle or open handled by parent
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchedStartups = q ? startups.filter(s => 
    s.name.toLowerCase().includes(q) || 
    s.tagLine.toLowerCase().includes(q) || 
    s.categoryName.toLowerCase().includes(q) ||
    s.techStack.some(t => t.toLowerCase().includes(q))
  ) : [];

  const matchedNews = q ? articles.filter(n => 
    n.status !== 'passive' && (
      n.title.toLowerCase().includes(q) || 
      n.excerpt.toLowerCase().includes(q) || 
      n.tags.some(t => t.toLowerCase().includes(q))
    )
  ) : [];

  const matchedSupporters = q ? supporters.filter(sup => 
    sup.name.toLowerCase().includes(q) || 
    sup.typeName.toLowerCase().includes(q) ||
    sup.description.toLowerCase().includes(q)
  ) : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl">
        
        {/* Input Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-blue-600 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Girişim, haber, teknoloji (PyTorch, BLE, IMU) veya kurum ara..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-slate-900 text-sm sm:text-base focus:outline-none placeholder-slate-400"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-slate-700"
            >
              Temizle
            </button>
          )}
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg bg-slate-100 border border-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
          {!query ? (
            <div className="py-8 text-center text-xs text-slate-500 space-y-2">
              <p>Aramak istediğiniz anahtar kelimeyi yazın.</p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <span className="text-slate-500">Popüler:</span>
                {['Sporsepeti', 'SportsFly', 'Sporpuan', 'Yapay Zeka', 'GPS Yeleği', 'Akıllı Stadyum'].map((pop, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setQuery(pop)}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 text-[11px] border border-slate-200 transition-colors"
                  >
                    {pop}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {matchedStartups.length === 0 && matchedNews.length === 0 && matchedSupporters.length === 0 && (
                <div className="py-8 text-center text-xs text-slate-500">
                  "{query}" ile eşleşen sonuç bulunamadı.
                </div>
              )}

              {/* Startups results */}
              {matchedStartups.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-blue-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Rocket className="w-3.5 h-3.5 text-orange-500" />
                    <span>Girişimler ({matchedStartups.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedStartups.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => {
                          onSelectStartup(s);
                          onClose();
                        }}
                        className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50/50 hover:border-blue-200 border border-slate-200 cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img src={s.logo} alt={s.name} className="w-8 h-8 rounded-lg object-cover border border-slate-200" />
                          <div>
                            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                              <span>{s.name}</span>
                              <BrandIcon className="w-3.5 h-3.5 shrink-0" />
                            </h4>
                            <p className="text-[11px] text-slate-500 line-clamp-1">{s.tagLine}</p>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          {s.stage}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* News results */}
              {matchedNews.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-blue-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Newspaper className="w-3.5 h-3.5 text-orange-500" />
                    <span>Haberler & Analizler ({matchedNews.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedNews.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          onSelectArticle(n);
                          onClose();
                        }}
                        className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50/50 hover:border-blue-200 border border-slate-200 cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{n.title}</h4>
                          <p className="text-[11px] text-slate-500">{n.categoryName} • {n.date}</p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Supporters results */}
              {matchedSupporters.length > 0 && (
                <div>
                  <div className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />
                    <span>Destekleyiciler ({matchedSupporters.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedSupporters.map((sup) => (
                      <div
                        key={sup.id}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2.5">
                          <img src={sup.logo} alt={sup.name} className="w-8 h-8 rounded-lg object-cover border border-slate-200" />
                          <div>
                            <h4 className="text-xs font-bold text-slate-900">{sup.name}</h4>
                            <p className="text-[11px] text-slate-500">{sup.typeName}</p>
                          </div>
                        </div>
                        <span className="text-[10px] text-slate-500">{sup.location}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 text-center flex items-center justify-between px-5">
          <span>Kapatmak için ESC tuşuna basın</span>
          <span className="text-blue-700 font-semibold">Sport Tech Türkiye</span>
        </div>

      </div>
    </div>
  );
};
