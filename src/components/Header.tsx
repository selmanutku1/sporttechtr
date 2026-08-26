import React, { useState, useEffect, useRef } from 'react';
import { 
  Rocket, 
  Newspaper, 
  ShieldCheck, 
  Info, 
  Calendar, 
  TrendingUp, 
  Menu, 
  X, 
  PlusCircle, 
  Search,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Check
} from 'lucide-react';
import { BrandIcon } from './BrandLogo';
import { StartupCategory } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (sec: string) => void;
  onOpenStartupSubmit: () => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  setActiveSection,
  onOpenStartupSubmit,
  onOpenSearch
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, t } = useLanguage();


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    { id: 'startups', label: t('nav.startups'), icon: Rocket },
    { id: 'news', label: t('nav.news'), icon: Newspaper },
    { id: 'about', label: t('nav.about'), icon: Info },
    { id: 'supporters', label: t('nav.supporters'), icon: ShieldCheck },
    { id: 'events', label: t('nav.events'), icon: Calendar },
  ];

  return (
    <header 
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.05)] py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Title */}
          <div 
            onClick={() => scrollToSection('hero')} 
            className="flex items-center gap-3 cursor-pointer group select-none"
            id="brand-logo-btn"
          >
            <div className="relative flex items-center justify-center w-10 h-10 group-hover:scale-105 transition-all duration-500">
              <div className="absolute inset-0 bg-blue-600/5 rounded-xl rotate-6 group-hover:rotate-12 transition-transform" />
              <BrandIcon className="w-full h-full relative z-10" />
            </div>

            <div className="flex flex-col leading-none justify-center">
              <span className="font-display font-black text-base tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                SPORTTECH
              </span>
              <span className="font-display font-medium text-[9px] tracking-[0.3em] text-slate-400 uppercase mt-0.5 ml-0.5">
                TÜRKİYE
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center bg-slate-50/50 backdrop-blur-sm px-1.5 py-1.5 rounded-2xl border border-slate-200/50 shadow-sm">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-bold transition-all duration-300 ${
                    isActive 
                      ? 'text-blue-600' 
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                  id={`nav-link-${item.id}`}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-white rounded-lg shadow-sm border border-slate-100 animate-in fade-in zoom-in-95 duration-200" />
                  )}
                  <Icon className={`w-3.5 h-3.5 relative z-10 transition-colors ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="group flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-50/50 hover:bg-white border border-slate-200/60 hover:border-slate-300 hover:shadow-sm transition-all duration-300"
              title={t('btn.search')}
              id="search-trigger-btn"
            >
              <div className="flex items-center justify-center w-6 h-6 rounded-lg bg-white shadow-xs border border-slate-100 group-hover:scale-110 transition-transform">
                <Search className="w-3 h-3 text-slate-400 group-hover:text-blue-500" />
              </div>
              <span className="hidden xl:inline text-xs text-slate-400 font-medium group-hover:text-slate-600 transition-colors">{t('btn.quick_search')}</span>
              <div className="hidden xl:flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-slate-100 border border-slate-200">
                <span className="text-[9px] font-bold text-slate-400 uppercase">Cmd</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase">K</span>
              </div>
            </button>

            {/* Submit Startup Button */}
            <button
              onClick={onOpenStartupSubmit}
              className="relative group flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-[13px] text-white bg-slate-900 hover:bg-blue-600 transition-all duration-300 active:scale-95 shadow-lg shadow-slate-900/10 overflow-hidden"
              id="header-submit-startup-btn"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <PlusCircle className="w-4 h-4 text-blue-400 group-hover:text-white transition-colors" />
              <span className="relative z-10">{t('btn.add_startup')}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-1.5 lg:hidden">
            {/* Mobile Language Switcher */}
            <LanguageSwitcher variant="mobile" />

            <button
              onClick={onOpenSearch}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 border border-slate-200"
              aria-label="Arama"
            >
              <Search className="w-4 h-4 text-slate-600" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-950 hover:bg-slate-100 border border-slate-200 transition-colors"
              aria-label="Menüyü Aç"
              id="mobile-menu-toggle-btn"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-blue-600" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bottom-0 z-40 bg-white/95 backdrop-blur-2xl border-t border-slate-200/60 px-4 pt-6 pb-8 space-y-6 overflow-y-auto animate-in slide-in-from-top-4 duration-300">
          <div className="space-y-1">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4 mb-3">
              {language === 'tr' ? 'EKOSİSTEM GEZGİNİ' : 'ECOSYSTEM EXPLORER'}
            </div>
            <div className="grid grid-cols-1 gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center justify-between px-5 py-4 rounded-2xl text-sm font-bold transition-all duration-300 ${
                      isActive 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                        : 'text-slate-600 hover:bg-slate-50 active:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${isActive ? 'bg-white/20' : 'bg-slate-100 group-hover:bg-white'}`}>
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                      </div>
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'rotate-90 opacity-100' : 'opacity-20'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200/60 space-y-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenStartupSubmit();
              }}
              className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-blue-600 text-white font-bold text-sm flex items-center justify-center gap-3 shadow-xl shadow-slate-900/10 active:scale-[0.98] transition-all duration-300"
            >
              <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center">
                <PlusCircle className="w-4 h-4 text-blue-400" />
              </div>
              <span>{t('btn.add_startup')}</span>
            </button>
            <div className="flex items-center justify-center gap-2 py-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">
                Sport Tech Türkiye • 2026
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
