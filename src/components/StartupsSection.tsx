import React, { useState, useMemo } from 'react';
import { 
  Rocket, 
  Search, 
  Filter, 
  ExternalLink, 
  MapPin, 
  Users, 
  TrendingUp, 
  PlusCircle, 
  Cpu, 
  Layers, 
  ArrowUpRight,
  Sparkles,
  Award
} from 'lucide-react';
import { Startup, StartupCategory, FundingStage } from '../types';
import { STARTUPS } from '../data/startups';
import { CATEGORIES_DATA } from '../data/ecosystem';
import { BrandIcon } from './BrandLogo';

interface StartupsSectionProps {
  onSelectStartup: (startup: Startup) => void;
  onOpenStartupSubmit: () => void;
  selectedCategory: StartupCategory;
  onSelectCategory: (cat: StartupCategory) => void;
  startupsList?: Startup[];
}

export const StartupsSection: React.FC<StartupsSectionProps> = ({
  onSelectStartup,
  onOpenStartupSubmit,
  selectedCategory,
  onSelectCategory,
  startupsList
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStage, setSelectedStage] = useState<FundingStage>('all');

  const stages: FundingStage[] = ['all', 'Pre-Seed', 'Seed', 'Series A', 'Bootstrapped'];

  const allStartups = startupsList && startupsList.length > 0 ? startupsList : STARTUPS;

  const filteredStartups = useMemo(() => {
    return allStartups.filter((startup) => {
      // Category filter
      if (selectedCategory !== 'all' && startup.category !== selectedCategory) {
        return false;
      }
      // Stage filter
      if (selectedStage !== 'all' && startup.stage !== selectedStage) {
        return false;
      }
      // Search term
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchesName = startup.name.toLowerCase().includes(query);
        const matchesTagLine = startup.tagLine.toLowerCase().includes(query);
        const matchesDesc = startup.description.toLowerCase().includes(query);
        const matchesTech = startup.techStack.some(t => t.toLowerCase().includes(query));
        const matchesTags = startup.tags.some(t => t.toLowerCase().includes(query));
        return matchesName || matchesTagLine || matchesDesc || matchesTech || matchesTags;
      }
      return true;
    });
  }, [selectedCategory, selectedStage, searchTerm]);

  return (
    <section id="startups" className="py-20 bg-slate-50/70 border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
              <Rocket className="w-3.5 h-3.5 text-orange-500" />
              <span>Girişimler Dizini</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
              Türkiye'nin Öncü <br className="hidden sm:inline" />
              <span className="text-blue-600">
                Spor Teknolojisi Girişimleri
              </span>
            </h2>
            <p className="text-slate-600 text-sm mt-2 max-w-xl">
              Kulüplerin performansını artıran, taraftar deneyimini zenginleştiren ve spor sağlığını koruyan yerli girişimler.
            </p>
          </div>

          {/* Submit Startup CTA Banner */}
          <button
            onClick={onOpenStartupSubmit}
            className="self-start md:self-auto px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 active:scale-95 transition-all shadow-sm"
            id="startups-submit-cta-btn"
          >
            <PlusCircle className="w-4 h-4 text-orange-300" />
            <span>Girişimini Dizine Ekle</span>
          </button>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 mb-8 space-y-4 shadow-xs">
          
          {/* Search bar & Stage Filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Girişim adı, teknoloji (PyTorch, BLE, IMU) veya etiket ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 transition-colors"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700"
                >
                  Temizle
                </button>
              )}
            </div>

            {/* Stage filter dropdown/pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs text-slate-500 font-medium pl-1 pr-2 hidden sm:inline">Aşama:</span>
              {stages.map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStage(st)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedStage === st
                      ? 'bg-blue-600 text-white font-bold'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  {st === 'all' ? 'Tüm Aşamalar' : st}
                </button>
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide pt-2 border-t border-slate-100 no-scrollbar">
            <button
              onClick={() => onSelectCategory('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              Tümü ({STARTUPS.length})
            </button>
            {CATEGORIES_DATA.map((cat) => {
              const count = STARTUPS.filter(s => s.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id as StartupCategory)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-blue-600 text-white font-bold'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  {cat.name} {count > 0 ? `(${count})` : ''}
                </button>
              );
            })}
          </div>
        </div>

        {/* Startups Grid */}
        {filteredStartups.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-slate-500 text-sm mb-3">Aradığınız kriterlere uygun spor teknolojisi girişimi bulunamadı.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedStage('all');
                onSelectCategory('all');
              }}
              className="text-xs text-blue-600 font-semibold hover:underline"
            >
              Filtreleri Sıfırla
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStartups.map((startup) => (
              <div
                key={startup.id}
                onClick={() => onSelectStartup(startup)}
                className="bg-white hover:border-blue-300 border border-slate-200 rounded-3xl overflow-hidden transition-all cursor-pointer flex flex-col justify-between group shadow-xs hover:shadow-lg"
                id={`startup-card-${startup.id}`}
              >
                <div>
                  {/* Card Cover Image Header */}
                  <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                    <img 
                      src={startup.coverImage} 
                      alt={startup.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Stage & Verified Badges */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider border border-white/20">
                        {startup.categoryName}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-orange-500 text-white text-[10px] font-bold shadow-xs">
                        {startup.stage}
                      </span>
                    </div>

                    {/* Logo & Name on Cover */}
                    <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center gap-3">
                      <img 
                        src={startup.logo} 
                        alt={startup.name}
                        referrerPolicy="no-referrer"
                        className="w-11 h-11 rounded-xl object-cover border-2 border-white bg-white p-0.5 shadow-md shrink-0"
                      />
                      <div className="min-w-0">
                        <h3 className="text-lg font-bold text-white font-display group-hover:text-blue-300 transition-colors truncate drop-shadow-xs flex items-center gap-1.5">
                          <span>{startup.name}</span>
                          <BrandIcon className="w-4 h-4 shrink-0" />
                        </h3>
                        <p className="text-[11px] text-slate-200 truncate font-medium">{startup.location} • Kuruluş {startup.foundedYear}</p>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-3.5">
                    
                    {/* TagLine */}
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                      {startup.tagLine}
                    </h4>

                    {/* Description */}
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {startup.description}
                    </p>

                    {/* Key Metrics Snippet */}
                    <div className="grid grid-cols-2 gap-2 bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                      {startup.keyMetrics.slice(0, 2).map((m, idx) => (
                        <div key={idx} className="truncate">
                          <span className="text-[10px] text-slate-500 block truncate">{m.label}</span>
                          <span className="text-xs font-bold text-blue-700 font-mono">{m.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {startup.techStack.slice(0, 3).map((t, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] text-slate-700 font-mono border border-slate-200/60"
                        >
                          {t}
                        </span>
                      ))}
                      {startup.techStack.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded-md bg-slate-100 text-[10px] text-slate-500">
                          +{startup.techStack.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 text-[11px] font-medium">
                    Özel Girişim Dosyası
                  </span>
                  <span className="text-blue-700 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Profili & Haberi Oku</span>
                    <ArrowUpRight className="w-4 h-4 text-blue-600" />
                  </span>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
