import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useLanguage, Language } from '../context/LanguageContext';

export const TRFlag = () => (
  <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 rounded-full shrink-0 shadow-xs border border-slate-200/40">
    <rect width="24" height="24" rx="12" fill="#E30A17" />
    <circle cx="10" cy="12" r="4.5" fill="#FFFFFF" />
    <circle cx="11.8" cy="12" r="3.6" fill="#E30A17" />
    <polygon points="15.5,10 16.2,12.2 14.2,10.8 16.8,10.8 14.8,12.2" fill="#FFFFFF" />
  </svg>
);

export const UKFlag = () => (
  <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 rounded-full shrink-0 shadow-xs border border-slate-200/40 overflow-hidden">
    <rect width="24" height="24" rx="12" fill="#012169" />
    <path d="M0 0 L24 24 M0 24 L24 0" stroke="#FFF" strokeWidth="2.5" />
    <path d="M0 0 L24 24 M0 24 L24 0" stroke="#C8102E" strokeWidth="1.2" />
    <path d="M12 0 v24 M0 12 h24" stroke="#FFF" strokeWidth="4" />
    <path d="M12 0 v24 M0 12 h24" stroke="#C8102E" strokeWidth="2.4" />
  </svg>
);

export const USFlag = () => (
  <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 rounded-full shrink-0 shadow-xs border border-slate-200/40 overflow-hidden">
    <rect width="24" height="24" rx="12" fill="#FFF" />
    <path d="M0 1.8h24M0 5.4h24M0 9h24M0 12.6h24M0 16.2h24M0 19.8h24M0 23.4h24" stroke="#B22234" strokeWidth="1.8" />
    <rect width="11" height="11" fill="#3C3B6E" />
    <circle cx="2" cy="2" r="0.4" fill="#FFF" />
    <circle cx="5" cy="2" r="0.4" fill="#FFF" />
    <circle cx="8" cy="2" r="0.4" fill="#FFF" />
    <circle cx="3.5" cy="4.5" r="0.4" fill="#FFF" />
    <circle cx="6.5" cy="4.5" r="0.4" fill="#FFF" />
    <circle cx="2" cy="7" r="0.4" fill="#FFF" />
    <circle cx="5" cy="7" r="0.4" fill="#FFF" />
    <circle cx="8" cy="7" r="0.4" fill="#FFF" />
    <circle cx="3.5" cy="9.5" r="0.4" fill="#FFF" />
    <circle cx="6.5" cy="9.5" r="0.4" fill="#FFF" />
  </svg>
);

export const ARFlag = () => (
  <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 rounded-full shrink-0 shadow-xs border border-slate-200/40 overflow-hidden">
    <rect width="24" height="24" rx="12" fill="#165D31" />
    <path d="M5 14.5 h14 v-1 h-14 z" fill="#FFF" />
    <path d="M6 13.5 h3.5 v1 h-3.5 z" fill="#FFF" />
    <path d="M7 8 q1.5 -1.5 3 0 t3 0 t3 -1.5" stroke="#FFF" strokeWidth="0.8" fill="none" />
    <path d="M8.5 10.5 q1.5 1.5 3 -1.5 t3 0" stroke="#FFF" strokeWidth="0.8" fill="none" />
  </svg>
);

export const LANGUAGES_LIST = [
  { code: 'tr' as Language, name: 'Türkçe', flag: TRFlag, short: 'TR' },
  { code: 'en-GB' as Language, name: 'English (UK)', flag: UKFlag, short: 'UK' },
  { code: 'en-US' as Language, name: 'English (US)', flag: USFlag, short: 'US' },
  { code: 'ar' as Language, name: 'العربية', flag: ARFlag, short: 'AR' }
];

interface LanguageSwitcherProps {
  variant?: 'header' | 'footer' | 'mobile';
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  variant = 'header', 
  className = '' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES_LIST.find(l => l.code === language) || LANGUAGES_LIST[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (variant === 'mobile') {
    return (
      <div className={`relative ${className}`} ref={dropdownRef} id="mobile-lang-switcher">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 active:scale-95 text-xs font-bold transition-all"
          id="mobile-lang-switcher-trigger"
        >
          {React.createElement(currentLang.flag)}
          <span>{currentLang.short}</span>
          <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div 
            className="absolute right-0 mt-2 w-48 rounded-2xl bg-white border border-slate-200 shadow-xl p-1 z-50 space-y-1 animate-in fade-in slide-in-from-top-1 duration-150"
            id="mobile-lang-switcher-options"
          >
            {LANGUAGES_LIST.map((lang) => {
              const isSelected = language === lang.code;
              const Flag = lang.flag;
              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                  id={`mobile-lang-opt-${lang.code}`}
                >
                  <div className="flex items-center gap-2">
                    <Flag />
                    <span>{lang.name}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-blue-600 stroke-[2.5]" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef} id="language-switcher-container">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-50/80 hover:bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-sm transition-all duration-300 cursor-pointer text-xs font-bold text-slate-700 active:scale-95 select-none"
        title="Select Language / Dil Seçimi"
        id="language-switcher-trigger"
      >
        {React.createElement(currentLang.flag)}
        <span className="hidden xl:inline">{currentLang.name}</span>
        <span className="xl:hidden">{currentLang.short}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-2.5 w-60 rounded-2xl bg-white border border-slate-200 shadow-xl p-1.5 z-50 space-y-1 animate-in fade-in slide-in-from-top-2 duration-200"
          id="language-switcher-menu"
        >
          <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-3 py-2 border-b border-slate-100 mb-1">
            {language === 'tr' ? 'DİL SEÇİMİ' : 'SELECT LANGUAGE'}
          </div>
          {LANGUAGES_LIST.map((lang) => {
            const isSelected = language === lang.code;
            const Flag = lang.flag;
            return (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-blue-50 text-blue-600 border border-blue-100/50' 
                    : 'text-slate-600 hover:bg-slate-50 border border-transparent'
                }`}
                id={`lang-switcher-opt-${lang.code}`}
              >
                <div className="flex items-center gap-3">
                  <Flag />
                  <span className={isSelected ? 'text-blue-700' : 'text-slate-700'}>{lang.name}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-blue-600 stroke-[2.5]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
