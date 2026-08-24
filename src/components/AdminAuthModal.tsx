import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  ArrowRight, 
  X, 
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { BrandIcon } from './BrandLogo';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessAuth: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccessAuth
}) => {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(false);

    // Required passcode: 2026
    if (passcode.trim() === '2026') {
      setTimeout(() => {
        setIsSubmitting(false);
        setPasscode('');
        onSuccessAuth();
      }, 300);
    } else {
      setTimeout(() => {
        setIsSubmitting(false);
        setError(true);
      }, 300);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4 text-blue-600 shadow-sm relative">
            <BrandIcon className="w-8 h-8" />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
              <Lock className="w-2.5 h-2.5" />
            </div>
          </div>

          <h3 className="text-xl font-bold font-display text-slate-900">
            Sport Tech Türkiye Yönetim Paneli
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-xs">
            Girişim onayları ve ekosistem içerik kontrolü için lütfen yönetici geçiş kodunu girin.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center justify-between">
              <span>Yönetici Geçiş Kodu</span>
              <span className="text-[10px] text-slate-400 font-mono">Yetkili Girişi</span>
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type="password"
                autoFocus
                required
                maxLength={10}
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  if (error) setError(false);
                }}
                placeholder="Geçiş Kodunu Girin (örn. 2026)"
                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border text-sm text-slate-900 placeholder-slate-400 font-mono tracking-widest text-center focus:bg-white focus:outline-none transition-colors ${
                  error ? 'border-red-500 bg-red-50/50' : 'border-slate-300 focus:border-blue-600'
                }`}
              />
            </div>

            {error && (
              <div className="flex items-center gap-1.5 text-xs text-red-600 mt-2">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Hatalı geçiş kodu! Lütfen tekrar deneyin.</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !passcode}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            <span>Yönetim Paneline Giriş Yap</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer info */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
            <span>Güvenli Admin Portalı</span>
          </span>
          <span className="font-mono">SportTech v2.4</span>
        </div>

      </div>
    </div>
  );
};
