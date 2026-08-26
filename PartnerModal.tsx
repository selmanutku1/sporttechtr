import React, { useState } from 'react';
import { 
  X, 
  Handshake, 
  CheckCircle2, 
  Building2, 
  ShieldCheck, 
  Mail, 
  Phone, 
  Send 
} from 'lucide-react';
import { BrandIcon } from './BrandLogo';

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessSubmit?: (formData: any) => void;
}

export const PartnerModal: React.FC<PartnerModalProps> = ({ isOpen, onClose, onSuccessSubmit }) => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    orgName: '',
    orgType: 'club',
    contactName: '',
    contactRole: '',
    email: '',
    phone: '',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSuccessSubmit) {
      onSuccessSubmit(form);
    }
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl max-w-lg sm:max-w-xl w-full my-4 max-h-[92vh] flex flex-col overflow-hidden shadow-2xl relative">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center shrink-0">
              <BrandIcon className="w-full h-full" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 font-display">
                Ekosistem Partnerlik Başvurusu
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500">
                Sport Tech Türkiye ile ortaklık, pilot projeler ve yatırım işbirlikleri
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg bg-white border border-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto">
          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-xl font-bold text-slate-900">Partnerlik Talebiniz Alındı!</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Sport Tech Türkiye Kurumsal İlişkiler Masası en geç 1 iş günü içinde sizinle iletişime geçecektir.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Kurum / Kulüp / Fon Adı *</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Anadolu Spor Kulübü veya XYZ Ventures"
                  value={form.orgName}
                  onChange={(e) => setForm({ ...form, orgName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Kurum Türü *</label>
                  <select
                    value={form.orgType}
                    onChange={(e) => setForm({ ...form, orgType: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600"
                  >
                    <option value="club">Spor Kulübü / Akademi</option>
                    <option value="federation">Federasyon / Kamu</option>
                    <option value="vc_fund">Yatırım Fonu / Melek Yatırımcı</option>
                    <option value="technopark">Teknopark / Kuluçka</option>
                    <option value="university">Üniversite / Araştırma Lab</option>
                    <option value="brand">Sponsor / Teknoloji Şirketi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Yetkili Adı Soyadı *</label>
                  <input
                    type="text"
                    required
                    placeholder="Adınız Soyadınız"
                    value={form.contactName}
                    onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Kurumsal E-Posta *</label>
                  <input
                    type="email"
                    required
                    placeholder="yetkili@kurum.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Telefon Numarası</label>
                  <input
                    type="tel"
                    placeholder="+90 5XX XXX XX XX"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">İşbirliği Beklentiniz / Notunuz</label>
                <textarea
                  rows={2.5}
                  placeholder="Pilot test, girişim yatırımı veya etkinlik sponsorluğu hakkında detay verebilirsiniz..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-sm active:scale-98"
              >
                Partnerlik Başvurusunu Gönder
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
