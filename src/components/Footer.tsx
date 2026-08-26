import React from 'react';
import { 
  Globe, 
  Mail, 
  MapPin, 
  ArrowUp, 
  ExternalLink
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { SporsepetiIcon } from './SporsepetiIcon';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenStartupSubmit: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenStartupSubmit, onOpenAdmin }) => {
  const { language, t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-slate-50 text-slate-600 border-t border-slate-200 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200">
          
          {/* Column 1: Brand & Domain */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={onOpenAdmin}
              className="flex flex-col items-start gap-1.5 cursor-pointer group select-none"
              title={language === 'tr' ? 'Yönetici Paneli Girişi' : language === 'ar' ? 'تسجيل دخول لوحة المسؤول' : 'Admin Console Login'}
            >
              <BrandLogo showText={true} size="md" />
              <span className="text-[11px] font-semibold text-blue-800 bg-blue-50 border border-blue-200/60 px-2.5 py-0.5 rounded-full mt-1 group-hover:bg-blue-100 transition-colors">
                {language === 'tr' ? 'Türkiye Spor Teknolojileri Platformu' : language === 'ar' ? 'منصة تكنولوجيا الرياضة التركية' : 'Turkey Sports Technology Platform'}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
              {language === 'tr' 
                ? "Türkiye'nin spor teknolojileri, biyomekanik sistemler, yapay zeka analitiği ve akıllı stadyum ekosistem platformu. Girişimleri kulüplerle, yatırımcılarla ve akademiyle buluşturuyoruz."
                : language === 'ar'
                ? "المنصة التركية الرائدة لمنظومة تكنولوجيا الرياضة، الميكانيكا الحيوية، تحليلات الذكاء الاصطناعي، والملاعب الذكية. نربط الشركات الناشئة بالأندية والمستثمرين والأكاديميات."
                : "Turkey's leading sports tech ecosystem. Connecting biomechanical, IoT, and AI startups with elite clubs, professional investors, and academic hubs."}
            </p>

            <div className="pt-2 flex flex-col gap-2 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-slate-400" />
                <span>iletisim@sporttech.com.tr</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ExternalLink className="w-4 h-4 text-slate-400" />
                <a 
                  href="https://tr.linkedin.com/company/sport-tech-turkiye" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors flex items-center gap-1"
                >
                  {language === 'tr' ? "LinkedIn'de Takip Et" : language === 'ar' ? "تابعنا على LinkedIn" : "Follow on LinkedIn"}
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Ekosistem Bölümleri */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {language === 'tr' ? 'Ekosistem' : language === 'ar' ? 'المنظومة' : 'Ecosystem'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => onNavigate('startups')}
                  className="hover:text-emerald-700 transition-colors"
                >
                  {language === 'tr' ? 'Girişimler Dizini' : language === 'ar' ? 'دليل الشركات الناشئة' : 'Startups Index'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('news')}
                  className="hover:text-emerald-700 transition-colors"
                >
                  {language === 'tr' ? 'Haberler & Analizler' : language === 'ar' ? 'الأخبار والتحليلات' : 'News & Analysis'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('about')}
                  className="hover:text-emerald-700 transition-colors"
                >
                  {language === 'tr' ? 'Hakkımızda & Vizyon' : language === 'ar' ? 'من نحن والرؤية' : 'About & Vision'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('supporters')}
                  className="hover:text-emerald-700 transition-colors"
                >
                  {language === 'tr' ? 'Destekleyiciler & Partnerler' : language === 'ar' ? 'الداعمون والشركاء' : 'Supporters & Partners'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('events')}
                  className="hover:text-emerald-700 transition-colors"
                >
                  {language === 'tr' ? 'Zirveler & Hackathonlar' : language === 'ar' ? 'القمم والهكاثونات' : 'Summits & Hackathons'}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Teknoloji Alanları */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {language === 'tr' ? 'Teknolojiler' : language === 'ar' ? 'التقنيات' : 'Technologies'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li><span className="text-slate-600 hover:text-slate-900 transition-colors cursor-default">{language === 'tr' ? 'Yapay Zeka & Bilgisayarlı Görü' : language === 'ar' ? 'الذكاء الاصطناعي والرؤية الحاسوبية' : 'AI & Computer Vision'}</span></li>
              <li><span className="text-slate-600 hover:text-slate-900 transition-colors cursor-default">{language === 'tr' ? 'Giyilebilir IoT & Sensörler' : language === 'ar' ? 'الأجهزة القابلة للارتداء وحساسات إنترنت الأشياء' : 'Wearables & IoT Sensors'}</span></li>
              <li><span className="text-slate-600 hover:text-slate-900 transition-colors cursor-default">{language === 'tr' ? 'Akıllı Tesis & 5G Stadyum' : language === 'ar' ? 'المرافق الذكية وملاعب 5G' : 'Smart Venues & 5G Stadiums'}</span></li>
              <li><span className="text-slate-600 hover:text-slate-900 transition-colors cursor-default">{language === 'tr' ? 'Markerless 3D Biyomekanik' : language === 'ar' ? 'الميكانيكا الحيوية ثلاثية الأبعاد بدون علامات' : 'Markerless 3D Biomechanics'}</span></li>
              <li><span className="text-slate-600 hover:text-slate-900 transition-colors cursor-default">{language === 'tr' ? 'Biyometrik Ter & Laktat Yaması' : language === 'ar' ? 'المؤشرات الحيوية للعرق واللاكتات' : 'Biometric Sweat & Lactate'}</span></li>
              <li><span className="text-slate-600 hover:text-slate-900 transition-colors cursor-default">{language === 'tr' ? 'E-Spor & Kognitif Analiz' : language === 'ar' ? 'الرياضات الإلكترونية والتتبع المعرفي' : 'Esports & Cognitive Tracking'}</span></li>
            </ul>
          </div>

          {/* Column 4: Hızlı Aksiyon & Başvuru */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {language === 'tr' ? 'Katılım & İletişim' : language === 'ar' ? 'الانضمام والتواصل' : 'Join & Contact'}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'tr' 
                ? 'Spor teknolojisi girişiminizi listelemek veya kulüp pilot testi başlatmak için hemen başvurun.'
                : language === 'ar'
                ? 'قدم طلبك اليوم لإدراج شركتك الناشئة في تكنولوجيا الرياضة أو بدء اختبارات تجريبية مع الأندية.'
                : 'Apply today to list your sports technology startup or kickstart club pilot tests.'}
            </p>
            <button
              onClick={onOpenStartupSubmit}
              className="w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 font-bold text-xs transition-all text-center block"
            >
              {t('btn.add_startup')}
            </button>
            <div className="text-[11px] text-slate-500 pt-1">
              {language === 'tr' ? 'sporttech.com.tr Resmi Portal' : language === 'ar' ? 'sporttech.com.tr البوابة الرسمية' : 'sporttech.com.tr Official Portal'}
            </div>
          </div>

        </div>

        {/* Bottom Section with 'provided by sporsepeti' */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          
          <div className="flex items-center gap-2 text-slate-500">
            <span>
              © 2026{' '}
              <button 
                onClick={onOpenAdmin} 
                className="font-bold text-slate-700 hover:text-blue-600 transition-colors focus:outline-none cursor-pointer"
                title={language === 'tr' ? 'Yönetici Paneli Girişi' : language === 'ar' ? 'تسجيل دخول لوحة المسؤول' : 'Admin Console Login'}
              >
                Sport Tech Türkiye
              </button>{' '}
              (sporttech.com.tr). {language === 'tr' ? 'Tüm hakları saklıdır.' : language === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
            </span>
          </div>

          {/* Explicit requirement: provided by sporsepeti */}
          <div className="flex items-center gap-2 bg-white border border-slate-200 px-3.5 py-1.5 rounded-xl text-slate-700 shadow-2xs hover:border-slate-300 transition-colors" id="footer-provided-by-sporsepeti">
            <span className="text-slate-500 text-xs font-medium">provided by</span>
            <a 
              href="https://sporsepeti.com.tr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-900 font-bold hover:text-blue-600 transition-colors inline-flex items-center gap-1.5"
            >
              <SporsepetiIcon className="w-4 h-4 shrink-0" />
              <span className="font-semibold text-xs tracking-tight">sporsepeti</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60 text-slate-400" />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 text-xs transition-colors p-2 rounded-lg hover:bg-slate-100 border border-slate-200 bg-white shadow-2xs"
          >
            <span>{language === 'tr' ? 'Yukarı Çık' : language === 'ar' ? 'العودة للأعلى' : 'Scroll Up'}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>
    </footer>
  );
};
