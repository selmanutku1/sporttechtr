import React, { useState, useEffect } from 'react';
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
  ChevronRight
} from 'lucide-react';
import { BrandIcon } from './BrandLogo';
import { StartupCategory } from '../types';

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
    { id: 'startups', label: 'Girişimler', icon: Rocket },
    { id: 'news', label: 'Haberler', icon: Newspaper },
    { id: 'about', label: 'Hakkımızda', icon: Info },
    { id: 'supporters', label: 'Destekleyiciler', icon: ShieldCheck },
    { id: 'events', label: 'Etkinlikler', icon: Calendar },
  ];

  return (
    <header 
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm py-3.5' 
          : 'bg-white border-b border-slate-200/80 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Title */}
          <div 
            onClick={() => scrollToSection('hero')} 
            className="flex items-center gap-2.5 cursor-pointer group select-none"
            id="brand-logo-btn"
          >
            <div className="relative flex items-center justify-center w-11 h-11 group-hover:scale-105 transition-transform shrink-0">
              <BrandIcon className="w-full h-full" />
            </div>

            <div className="flex flex-col leading-none justify-center">
              <span className="font-display font-extrabold text-[15px] sm:text-base tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                SPORT TECH
              </span>
              <span className="font-display font-normal text-[10px] tracking-[0.22em] text-slate-500 uppercase mt-0.5">
                TÜRKİYE
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100 p-1 rounded-full border border-slate-200">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    isActive 
                      ? 'bg-blue-600 text-white font-bold shadow-xs' 
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-200/70'
                  }`}
                  id={`nav-link-${item.id}`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors flex items-center gap-2 text-xs"
              title="Ekosistemde Ara (Ctrl+K)"
              id="search-trigger-btn"
            >
              <Search className="w-4 h-4 text-slate-500" />
              <span className="hidden xl:inline text-slate-500 font-normal">Ara...</span>
              <kbd className="hidden xl:inline px-1.5 py-0.5 text-[9px] font-mono bg-slate-200 text-slate-600 rounded border border-slate-300">⌘K</kbd>
            </button>

            {/* Submit Startup Button */}
            <button
              onClick={onOpenStartupSubmit}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-500 transition-all active:scale-95 shadow-sm"
              id="header-submit-startup-btn"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Girişimini Ekle</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
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
        <div className="lg:hidden fixed inset-x-0 top-[73px] bottom-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200 px-4 pt-3 pb-8 space-y-4 overflow-y-auto">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.1em] px-3 pt-2">
            EKOSİSTEM MENÜSÜ
          </div>
          <div className="grid grid-cols-1 gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-slate-700 hover:bg-slate-100/80 active:bg-slate-200/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'rotate-90' : 'opacity-30'}`} />
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-200 space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenStartupSubmit();
              }}
              className="w-full py-4 rounded-2xl bg-slate-900 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform"
            >
              <PlusCircle className="w-5 h-5 text-orange-400" />
              <span>Girişimini Ekosisteme Ekle</span>
            </button>
            <div className="text-center">
              <span className="text-[11px] text-slate-400 font-medium tracking-wide">
                Sport Tech Türkiye • 2026
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
