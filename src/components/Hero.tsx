import React from 'react';
import { 
  Rocket, 
  TrendingUp, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2,
  Globe,
  Radio,
  Building2,
  Users
} from 'lucide-react';
import { ECOSYSTEM_STATS } from '../data/ecosystem';
import { SportTechBackground } from './SportTechBackground';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onExploreStartups: () => void;
  onOpenStartupSubmit: () => void;
  onExploreNews: () => void;
  onSelectStartupCategory: (cat: any) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreStartups,
  onOpenStartupSubmit,
  onExploreNews
}) => {
  const { language, t } = useLanguage();

  // Standard static-ish translation map for ECOSYSTEM_STATS labels & change text
  const translateStat = (label: string, change: string) => {
    if (language === 'tr') {
      return { label, change };
    }
    
    if (language === 'ar') {
      const labelMap: Record<string, string> = {
        'Kayıtlı SportTech Girişimi': 'شركة تكنولوجيا رياضية مسجلة',
        'Toplam Yatırım Hacmi': 'إجمالي حجم الاستثمار',
        'Aktif Partner Kulüp & Federasyon': 'الأندية والاتحادات الشريكة النشطة',
        'Tescilli Patent & Faydalı Model': 'براءات الاختراع والنماذج المسجلة',
        'Spor Teknolojisi Ar-Ge Merkezi': 'مراكز البحث والتطوير لتكنولوجيا الرياضة',
      };
      const changeMap: Record<string, string> = {
        '+38% bu yıl': '+38% هذا العام',
        '+85% büyüme': '+85% نمو',
        'Tüm branşlar': 'جميع التخصصات',
        '+18 yeni patent': '+18 براءة اختراع جديدة',
        '8 Şehirde': 'في 8 مدن',
      };
      return {
        label: labelMap[label] || label,
        change: changeMap[change] || change
      };
    }

    const labelMap: Record<string, string> = {
      'Kayıtlı SportTech Girişimi': 'Registered SportsTech Startups',
      'Toplam Yatırım Hacmi': 'Total Funding Volume',
      'Aktif Partner Kulüp & Federasyon': 'Active Partner Clubs & Federations',
      'Tescilli Patent & Faydalı Model': 'Registered Patents & Utility Models',
      'Spor Teknolojisi Ar-Ge Merkezi': 'Sports Tech R&D Centers',
    };
    const changeMap: Record<string, string> = {
      '+38% bu yıl': '+38% this year',
      '+85% büyüme': '+85% growth',
      'Tüm branşlar': 'All disciplines',
      '+18 yeni patent': '+18 new patents',
      '8 Şehirde': 'In 8 Cities',
    };
    return {
      label: labelMap[label] || label,
      change: changeMap[change] || change
    };
  };

  return (
    <section id="hero" className="relative pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden bg-white border-b border-slate-200/80">
      {/* Animated Interactive SportTech Background */}
      <SportTechBackground />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Top Floating Badge */}
        <div className="flex items-center justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 shadow-xs">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span className="text-xs font-semibold text-slate-700">
              {language === 'tr' 
                ? "Türkiye'nin Spor Teknolojisi & İnovasyon Merkezi" 
                : language === 'ar'
                ? "مركز تكنولوجيا الرياضة والابتكار في تركيا"
                : "Turkey's Sports Tech & Innovation Hub"}
            </span>
          </div>
        </div>

        {/* Main Title & Value Proposition */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6">
            {language === 'tr' ? (
              <>
                Sporun Geleceğini <br className="hidden sm:inline" />
                <span className="text-blue-600">Teknoloji</span> & <span className="text-orange-500">İnovasyonla</span> İnşa Ediyoruz
              </>
            ) : language === 'ar' ? (
              <>
                نبني مستقبل الرياضة <br className="hidden sm:inline" />
                بـ <span className="text-blue-600">التكنولوجيا</span> و <span className="text-orange-500">الابتكار</span>
              </>
            ) : (
              <>
                Building the Future of Sports <br className="hidden sm:inline" />
                with <span className="text-blue-600">Technology</span> & <span className="text-orange-500">Innovation</span>
              </>
            )}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-3xl mx-auto">
            {language === 'tr' ? (
              <>
                <strong className="text-slate-900 font-semibold">Sport Tech Türkiye</strong>; yapay zeka, giyilebilir sensörler, biyomekanik ve akıllı stadyum girişimlerini spor kulüpleri, federasyonlar, akademisyenler ve yatırım fonlarıyla buluşturan bağımsız ekosistem platformudur.
              </>
            ) : language === 'ar' ? (
              <>
                إن <strong className="text-slate-900 font-semibold">سبورت تيك تركيا</strong> هي منصة بيئية مستقلة تجمع بين شركات الذكاء الاصطناعي، والمستشعرات القابلة للارتداء، والميكانيكا الحيوية، والملاعب الذكية مع الأندية الرياضية، والاتحادات، والأكاديميين، وصناديق الاستثمار.
              </>
            ) : (
              <>
                <strong className="text-slate-900 font-semibold">Sport Tech Türkiye</strong> is an independent ecosystem platform that connects artificial intelligence, wearable sensors, biomechanics, and smart stadium startups with sports clubs, federations, academics, and investment funds.
              </>
            )}
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onExploreStartups}
              className="px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-500 transition-all active:scale-95 flex items-center gap-2 group shadow-sm"
              id="hero-explore-startups-btn"
            >
              <Rocket className="w-4 h-4 text-orange-300" />
              <span>{t('btn.explore_startups')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={onOpenStartupSubmit}
              className="px-5 py-3.5 rounded-xl font-semibold text-sm text-slate-800 bg-slate-100 hover:bg-slate-200 hover:text-slate-950 border border-slate-200 transition-all flex items-center gap-2 active:scale-95"
              id="hero-submit-startup-btn"
            >
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span>{t('btn.add_startup')}</span>
            </button>

            <button
              onClick={onExploreNews}
              className="px-5 py-3.5 rounded-xl font-semibold text-sm text-slate-700 hover:text-blue-600 bg-white hover:bg-slate-50 border border-slate-200 transition-all flex items-center gap-2 shadow-2xs"
              id="hero-news-btn"
            >
              <Radio className="w-4 h-4 text-blue-600" />
              <span>{t('btn.read_news')}</span>
            </button>
          </div>
        </div>

        {/* Live Ecosystem Metric Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto mb-10">
          {ECOSYSTEM_STATS.slice(0, 4).map((stat, idx) => {
            const { label, change } = translateStat(stat.label, stat.change);
            return (
              <div 
                key={idx}
                className="bg-slate-50/80 border border-slate-200 rounded-2xl p-4 sm:p-5 hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    {label}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                </div>
                <div className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight mb-1 group-hover:text-blue-600 transition-colors">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-blue-700 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-orange-500" />
                  <span>{change}</span>
                </div>
              </div>
            );
          })}
        </div>


      </div>
    </section>
  );
};
