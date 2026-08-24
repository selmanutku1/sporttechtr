import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  Handshake, 
  Globe, 
  MapPin, 
  Mail, 
  Phone, 
  Building2, 
  CheckCircle2, 
  Check,
  Trash2
} from 'lucide-react';
import { Supporter, SupporterType } from '../types';
import { PendingPartnerSubmission, PARTNER_TYPE_NAMES } from '../services/partnerManagement';

interface PartnerEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  partnerSubmission: PendingPartnerSubmission | null;
  existingSupporter: Supporter | null;
  onSaveAndApprove?: (submissionId: string, updatedSupporter: Partial<Supporter>) => void;
  onSaveExisting?: (updatedSupporter: Supporter) => void;
  onDeleteLive?: (id: string) => void;
  onRejectSubmission?: (id: string) => void;
  isApprovalMode?: boolean;
  theme?: 'dark' | 'light';
}

export const PartnerEditModal: React.FC<PartnerEditModalProps> = ({
  isOpen,
  onClose,
  partnerSubmission,
  existingSupporter,
  onSaveAndApprove,
  onSaveExisting,
  onDeleteLive,
  onRejectSubmission,
  isApprovalMode = false,
  theme = 'dark'
}) => {
  const [formData, setFormData] = useState<{
    name: string;
    type: SupporterType;
    typeName: string;
    role: string;
    description: string;
    website: string;
    location: string;
    stats: string;
    logo: string;
    contactName?: string;
    email?: string;
    phone?: string;
  }>({
    name: '',
    type: 'club',
    typeName: 'Spor Kulübü / Akademi',
    role: '',
    description: '',
    website: '',
    location: '',
    stats: 'Resmi Ekosistem Partneri',
    logo: '/logo.svg'
  });

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (existingSupporter) {
      setFormData({
        name: existingSupporter.name,
        type: existingSupporter.type,
        typeName: existingSupporter.typeName,
        role: existingSupporter.role,
        description: existingSupporter.description,
        website: existingSupporter.website,
        location: existingSupporter.location,
        stats: existingSupporter.stats || 'Resmi Ekosistem Partneri',
        logo: existingSupporter.logo || '/logo.svg'
      });
      setIsSaved(false);
    } else if (partnerSubmission) {
      setFormData({
        name: partnerSubmission.orgName,
        type: partnerSubmission.orgType,
        typeName: partnerSubmission.orgTypeName,
        role: `${partnerSubmission.orgTypeName} - ${partnerSubmission.contactRole || 'Ekosistem İşbirliği'}`,
        description: partnerSubmission.message || `${partnerSubmission.orgName}, Türkiye Spor Teknolojileri Platformu resmi destekçisidir.`,
        website: partnerSubmission.website || 'https://sporttech.com.tr',
        location: partnerSubmission.location || 'İstanbul, Türkiye',
        stats: 'Resmi Ekosistem Partneri',
        logo: '/logo.svg',
        contactName: partnerSubmission.contactName,
        email: partnerSubmission.email,
        phone: partnerSubmission.phone
      });
      setIsSaved(false);
    }
  }, [partnerSubmission, existingSupporter, isOpen]);

  if (!isOpen) return null;

  const partnerTypes: { id: SupporterType; label: string }[] = [
    { id: 'club', label: 'Spor Kulübü / Akademi' },
    { id: 'federation', label: 'Federasyon / Kamu Kurumu' },
    { id: 'vc_fund', label: 'Yatırım Fonu / VC / Melek Ağ' },
    { id: 'technopark', label: 'Teknopark / Kuluçka Merkezi' },
    { id: 'university', label: 'Üniversite / Spor Bilimleri Fakültesi' },
    { id: 'corporate', label: 'Ana Teknoloji & Kurumsal Destekçi' }
  ];

  const handleTypeChange = (newType: SupporterType) => {
    setFormData({
      ...formData,
      type: newType,
      typeName: PARTNER_TYPE_NAMES[newType] || 'Ekosistem Partneri'
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isApprovalMode && partnerSubmission && onSaveAndApprove) {
      onSaveAndApprove(partnerSubmission.id, {
        name: formData.name,
        type: formData.type,
        typeName: formData.typeName,
        role: formData.role,
        description: formData.description,
        website: formData.website,
        location: formData.location,
        stats: formData.stats,
        logo: formData.logo
      });
      setIsSaved(true);
      setTimeout(() => {
        onClose();
      }, 500);
    } else if (existingSupporter && onSaveExisting) {
      onSaveExisting({
        ...existingSupporter,
        name: formData.name,
        type: formData.type,
        typeName: formData.typeName,
        role: formData.role,
        description: formData.description,
        website: formData.website,
        location: formData.location,
        stats: formData.stats,
        logo: formData.logo
      });
      setIsSaved(true);
      setTimeout(() => {
        onClose();
      }, 500);
    }
  };

  return (
    <div className={`fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-5 backdrop-blur-sm overflow-y-auto animate-in fade-in ${
      theme === 'dark' ? 'bg-slate-950/80' : 'bg-slate-900/40'
    }`}>
      <div className={`border rounded-3xl max-w-2xl w-full my-auto max-h-[92vh] flex flex-col overflow-hidden shadow-2xl relative transition-colors ${
        theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        
        {/* Top Header */}
        <div className={`px-6 py-4 border-b flex items-center justify-between shrink-0 transition-colors ${
          theme === 'dark' ? 'bg-slate-950 text-white border-slate-800' : 'bg-slate-50 text-slate-900 border-slate-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center font-bold transition-colors ${
              theme === 'dark' ? 'bg-emerald-600/20 border-emerald-500/30 text-emerald-400' : 'bg-emerald-50 border-emerald-100 text-emerald-600'
            }`}>
              <Handshake className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`text-base font-bold font-display transition-colors ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                {isApprovalMode ? 'Partnerlik Başvurusunu İncele, Düzenle & Onayla' : 'Partner Bilgilerini Düzenle'}
              </h3>
              <p className={`text-xs transition-colors ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Yayında görüntülenecek kurum kartı ve detaylarını yapılandırın
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition-colors ${
              theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-500'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          
          {/* Row 1: Org Name & Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={`block text-xs font-bold mb-1 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-700'
              }`}>
                Kurum / Kulüp Adı *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none focus:border-emerald-600 shadow-2xs transition-all ${
                  theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-700' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-bold mb-1 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-700'
              }`}>
                Partner Kurum Türü *
              </label>
              <select
                value={formData.type}
                onChange={(e) => handleTypeChange(e.target.value as SupporterType)}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none focus:border-emerald-600 shadow-2xs transition-all ${
                  theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                {partnerTypes.map((pt) => (
                  <option key={pt.id} value={pt.id} className={theme === 'dark' ? 'bg-slate-900' : 'bg-white'}>
                    {pt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: Role / Unvan */}
          <div>
            <label className={`block text-xs font-bold mb-1 ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-700'
            }`}>
              Ekosistem Rolü / Partnerlik Tanımı *
            </label>
            <input
              type="text"
              required
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-emerald-600 shadow-2xs transition-all ${
                theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-700' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
              }`}
              placeholder="Örn: Spor Kulübü / Akademi - Pilot Proje ve Test Partneri"
            />
          </div>

          {/* Row 3: Website, Location & Badge */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className={`block text-xs font-bold mb-1 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-700'
              }`}>
                Web Sitesi
              </label>
              <div className="relative">
                <Globe className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className={`w-full pl-9 pr-3.5 py-2 rounded-xl border text-xs focus:outline-none focus:border-emerald-600 shadow-2xs transition-all ${
                    theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-700' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
                  placeholder="https://kurum.org.tr"
                />
              </div>
            </div>

            <div>
              <label className={`block text-xs font-bold mb-1 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-700'
              }`}>
                Lokasyon / Şehir
              </label>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className={`w-full pl-9 pr-3.5 py-2 rounded-xl border text-xs focus:outline-none focus:border-emerald-600 shadow-2xs transition-all ${
                    theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-700' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
                  placeholder="İstanbul (Kadıköy)"
                />
              </div>
            </div>

            <div>
              <label className={`block text-xs font-bold mb-1 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-700'
              }`}>
                Rozet / Etiket Metni
              </label>
              <input
                type="text"
                value={formData.stats}
                onChange={(e) => setFormData({ ...formData, stats: e.target.value })}
                className={`w-full px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-emerald-600 shadow-2xs transition-all ${
                  theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-700' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                }`}
                placeholder="Resmi Ekosistem Partneri"
              />
            </div>
          </div>

          {/* Row 4: Description */}
          <div>
            <label className={`block text-xs font-bold mb-1 ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-700'
            }`}>
              Partnerlik Açıklaması & İşbirliği Kapsamı *
            </label>
            <textarea
              rows={4}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-emerald-600 shadow-2xs transition-all ${
                theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-700' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
              }`}
              placeholder="Kurumun spor teknolojileri ekosistemine sağladığı destek, tesis kullanımı veya yatırım işbirliği..."
            />
          </div>

          {/* Contact Details Info Box (for Admin reference) */}
          {(partnerSubmission?.contactName || partnerSubmission?.email || partnerSubmission?.phone) && (
            <div className={`p-3.5 rounded-2xl border space-y-1 text-xs transition-colors ${
              theme === 'dark' ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}>
              <span className={`font-bold block mb-1 text-[11px] uppercase tracking-wider ${
                theme === 'dark' ? 'text-slate-200' : 'text-slate-900'
              }`}>
                Başvuran Temsilci İletişim Bilgileri:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                <div><strong>Yetkili:</strong> {partnerSubmission.contactName} ({partnerSubmission.contactRole})</div>
                <div><strong>E-Posta:</strong> {partnerSubmission.email}</div>
                <div><strong>Telefon:</strong> {partnerSubmission.phone}</div>
              </div>
            </div>
          )}

        </form>

        {/* Modal Footer Actions */}
        <div className={`px-6 py-4 border-t flex items-center justify-between shrink-0 transition-colors ${
          theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-xl border text-xs font-bold transition-colors ${
                theme === 'dark' ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700' : 'bg-white hover:bg-slate-100 text-slate-600 border-slate-200'
              }`}
            >
              İptal
            </button>

            {isApprovalMode && partnerSubmission && onRejectSubmission && (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm(`"${partnerSubmission.orgName}" başvurusunu reddetmek istediğinize emin misiniz?`)) {
                    onRejectSubmission(partnerSubmission.id);
                    onClose();
                  }
                }}
                className={`px-4 py-2 rounded-xl border text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  theme === 'dark' ? 'bg-slate-950 hover:bg-red-950 text-red-500 border-red-900/50' : 'bg-white hover:bg-red-50 text-red-600 border-red-100'
                }`}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Başvuruyu Reddet & Sil</span>
              </button>
            )}

            {!isApprovalMode && existingSupporter && onDeleteLive && (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm(`"${existingSupporter.name}" partnerini silmek istediğinize emin misiniz?`)) {
                    onDeleteLive(existingSupporter.id);
                    onClose();
                  }
                }}
                className={`px-4 py-2 rounded-xl border text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  theme === 'dark' ? 'bg-slate-950 hover:bg-red-950 text-red-500 border-red-900/50' : 'bg-white hover:bg-red-50 text-red-600 border-red-100'
                }`}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Partneri Sil</span>
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className={`px-5 py-2.5 rounded-xl text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all active:scale-95 ${
              isSaved 
                ? 'bg-emerald-700' 
                : isApprovalMode 
                ? 'bg-emerald-600 hover:bg-emerald-500' 
                : 'bg-blue-600 hover:bg-blue-500'
            }`}
          >
            {isSaved ? (
              <>
                <Check className="w-4 h-4" />
                <span>{isApprovalMode ? 'Onaylandı & Yayına Alındı!' : 'Kaydedildi!'}</span>
              </>
            ) : isApprovalMode ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Düzenle, Onayla ve Destekçilerde Yayınla</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Değişiklikleri Kaydet</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
