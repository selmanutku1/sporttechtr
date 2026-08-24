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

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenStartupSubmit: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenStartupSubmit, onOpenAdmin }) => {
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
              title="Yönetici Paneli Girişi"
            >
              <BrandLogo showText={true} size="md" />
              <span className="text-[11px] font-semibold text-blue-800 bg-blue-50 border border-blue-200/60 px-2.5 py-0.5 rounded-full mt-1 group-hover:bg-blue-100 transition-colors">
                Türkiye Spor Teknolojileri Platformu
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
              Türkiye'nin spor teknolojileri, biyomekanik sistemler, yapay zeka analitiği ve akıllı stadyum ekosistem platformu. Girişimleri kulüplerle, yatırımcılarla ve akademiyle buluşturuyoruz.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-slate-400" />
                <span>iletisim@sporttech.com.tr</span>
              </div>
            </div>
          </div>

          {/* Column 2: Ekosistem Bölümleri */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Ekosistem
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => onNavigate('startups')}
                  className="hover:text-emerald-700 transition-colors"
                >
                  Girişimler Dizini
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('news')}
                  className="hover:text-emerald-700 transition-colors"
                >
                  Haberler & Analizler
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('about')}
                  className="hover:text-emerald-700 transition-colors"
                >
                  Hakkımızda & Vizyon
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('supporters')}
                  className="hover:text-emerald-700 transition-colors"
                >
                  Destekleyiciler & Partnerler
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('events')}
                  className="hover:text-emerald-700 transition-colors"
                >
                  Zirveler & Hackathonlar
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Teknoloji Alanları */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Teknolojiler
            </h4>
            <ul className="space-y-2 text-xs">
              <li><span className="text-slate-600 hover:text-slate-900 transition-colors cursor-default">Yapay Zeka & Bilgisayarlı Görü</span></li>
              <li><span className="text-slate-600 hover:text-slate-900 transition-colors cursor-default">Giyilebilir IoT & Sensörler</span></li>
              <li><span className="text-slate-600 hover:text-slate-900 transition-colors cursor-default">Akıllı Tesis & 5G Stadyum</span></li>
              <li><span className="text-slate-600 hover:text-slate-900 transition-colors cursor-default">Markerless 3D Biyomekanik</span></li>
              <li><span className="text-slate-600 hover:text-slate-900 transition-colors cursor-default">Biyometrik Ter & Laktat Yaması</span></li>
              <li><span className="text-slate-600 hover:text-slate-900 transition-colors cursor-default">E-Spor & Kognitif Analiz</span></li>
            </ul>
          </div>

          {/* Column 4: Hızlı Aksiyon & Başvuru */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Katılım & İletişim
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Spor teknolojisi girişiminizi listelemek veya kulüp pilot testi başlatmak için hemen başvurun.
            </p>
            <button
              onClick={onOpenStartupSubmit}
              className="w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 font-bold text-xs transition-all text-center block"
            >
              Girişimini Dizine Ekle
            </button>
            <div className="text-[11px] text-slate-500 pt-1">
              sporttech.com.tr Resmi Portal
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
                title="Yönetim Paneli Girişi"
              >
                Sport Tech Türkiye
              </button>{' '}
              (sporttech.com.tr). Tüm hakları saklıdır.
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
              <ExternalLink className="w-3 h-3 opacity-60 text-slate-400" />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 text-xs transition-colors p-2 rounded-lg hover:bg-slate-100 border border-slate-200 bg-white shadow-2xs"
          >
            <span>Yukarı Çık</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>
    </footer>
  );
};
