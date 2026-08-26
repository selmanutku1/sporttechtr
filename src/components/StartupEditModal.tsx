import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  Building2, 
  Globe, 
  MapPin, 
  Users, 
  Coins, 
  Code, 
  Layers, 
  Sparkles,
  Mail,
  FileText,
  CheckCircle2,
  Trash2,
  Image,
  UploadCloud
} from 'lucide-react';
import { Startup, StartupCategory, FundingStage } from '../types';
import { CATEGORY_NAMES_MAP } from '../services/startupManagement';

interface StartupEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  startup: Startup | null;
  onSave: (updatedStartup: Startup) => void;
  onDelete?: (id: string) => void;
  theme?: 'dark' | 'light';
}

export const StartupEditModal: React.FC<StartupEditModalProps> = ({
  isOpen,
  onClose,
  startup,
  onSave,
  onDelete,
  theme = 'dark'
}) => {
  const [formData, setFormData] = useState<Partial<Startup>>({});
  const [techStackInput, setTechStackInput] = useState('');
  const [foundersInput, setFoundersInput] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (startup) {
      setFormData({ ...startup });
      setTechStackInput(startup.techStack ? startup.techStack.join(', ') : '');
      setFoundersInput(
        startup.founders ? startup.founders.map(f => `${f.name} (${f.role})`).join(', ') : ''
      );
      setIsSaved(false);
    }
  }, [startup, isOpen]);

  if (!isOpen || !startup) return null;

  const categories: { id: StartupCategory; label: string }[] = [
    { id: 'ai_analytics', label: 'Yapay Zeka & Analitik' },
    { id: 'management_platform', label: 'Yönetim & Dijital Platform' },
    { id: 'wearables_iot', label: 'Giyilebilir Cihazlar & IoT' },
    { id: 'smart_venues', label: 'Akıllı Tesis & Stadyum' },
    { id: 'performance_recovery', label: 'Performans & Biyomekanik' },
    { id: 'fan_media', label: 'Taraftar & Medya Teknolojileri' },
    { id: 'esports_gaming', label: 'E-Spor & Gaming' },
    { id: 'health_nutrition', label: 'Sağlık & Biyoteknoloji' },
  ];

  const stages: FundingStage[] = ['Pre-Seed', 'Seed', 'Series A', 'Bootstrapped'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parse tech stack
    const parsedTechStack = techStackInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    // Parse founders
    const parsedFounders = foundersInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)
      .map(fStr => {
        const match = fStr.match(/(.*?)\((.*?)\)/);
        if (match) {
          return { name: match[1].trim(), role: match[2].trim() };
        }
        return { name: fStr, role: 'Kurucu' };
      });

    const category = (formData.category || startup.category) as StartupCategory;

    const updated: Startup = {
      ...startup,
      name: formData.name || startup.name,
      tagLine: formData.tagLine || startup.tagLine,
      description: formData.description || startup.description,
      fullStory: formData.fullStory || startup.fullStory || formData.description || startup.description,
      logo: formData.logo || startup.logo,
      coverImage: formData.coverImage || startup.coverImage,
      category: category,
      categoryName: CATEGORY_NAMES_MAP[category] || startup.categoryName,
      stage: (formData.stage || startup.stage) as FundingStage,
      website: formData.website || startup.website,
      location: formData.location || startup.location,
      teamSize: formData.teamSize || startup.teamSize,
      fundingRaised: formData.fundingRaised || startup.fundingRaised,
      contactEmail: formData.contactEmail || startup.contactEmail,
      techStack: parsedTechStack.length > 0 ? parsedTechStack : startup.techStack,
      founders: parsedFounders.length > 0 ? parsedFounders : startup.founders,
      isFeatured: !!formData.isFeatured,
      tags: [CATEGORY_NAMES_MAP[category] || startup.categoryName, formData.stage || startup.stage, formData.location || startup.location]
    };

    onSave(updated);
    setIsSaved(true);
    setTimeout(() => {
      onClose();
    }, 600);
  };

  return (
    <div className={`fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-5 backdrop-blur-sm overflow-y-auto animate-in fade-in ${
      theme === 'dark' ? 'bg-slate-950/80' : 'bg-slate-900/40'
    }`}>
      <div className={`border rounded-3xl max-w-3xl w-full my-auto max-h-[92vh] flex flex-col overflow-hidden shadow-2xl relative transition-colors ${
        theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        
        {/* Modal Top Bar */}
        <div className={`px-6 py-4 border-b flex items-center justify-between shrink-0 transition-colors ${
          theme === 'dark' ? 'bg-slate-950 text-white border-slate-800' : 'bg-slate-50 text-slate-900 border-slate-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center font-bold transition-colors ${
              theme === 'dark' ? 'bg-blue-600/20 border-blue-500/30 text-blue-400' : 'bg-blue-50 border-blue-100 text-blue-600'
            }`}>
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`text-base font-bold font-display transition-colors ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                Girişim Bilgilerini Düzenle
              </h3>
              <p className={`text-xs transition-colors ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
              }`}>
                "{startup.name}" profilini ve dizin detaylarını güncelleyin
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

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          
          {/* Row 1: Name & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={`block text-xs font-bold mb-1 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-700'
              }`}>
                Girişim Adı *
              </label>
              <input
                type="text"
                required
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none focus:border-blue-600 shadow-2xs transition-all ${
                  theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-700' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-bold mb-1 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-700'
              }`}>
                Kategori Alanı *
              </label>
              <select
                value={formData.category || 'ai_analytics'}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as StartupCategory })}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none focus:border-blue-600 shadow-2xs transition-all ${
                  theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id} className={theme === 'dark' ? 'bg-slate-900' : 'bg-white'}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: Tagline */}
          <div>
            <label className={`block text-xs font-bold mb-1 ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-700'
            }`}>
              Slogan / Tek Cümlelik Değer Önerisi *
            </label>
            <input
              type="text"
              required
              value={formData.tagLine || ''}
              onChange={(e) => setFormData({ ...formData, tagLine: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-600 shadow-2xs transition-all ${
                theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-700' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
              }`}
              placeholder="Örn: Yapay Zekâ Destekli Profesyonel Futbol ve Basketbol Maç Analiz Platformu"
            />
          </div>

          {/* Row 3: Stage, Location & Team */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className={`block text-xs font-bold mb-1 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-700'
              }`}>
                Yatırım Aşaması
              </label>
              <select
                value={formData.stage || 'Seed'}
                onChange={(e) => setFormData({ ...formData, stage: e.target.value as FundingStage })}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none focus:border-blue-600 shadow-2xs transition-all ${
                  theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                {stages.map((st) => (
                  <option key={st} value={st} className={theme === 'dark' ? 'bg-slate-900' : 'bg-white'}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={`block text-xs font-bold mb-1 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-700'
              }`}>
                Lokasyon / Teknokent
              </label>
              <input
                type="text"
                value={formData.location || ''}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-600 shadow-2xs transition-all ${
                  theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-700' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                }`}
                placeholder="İstanbul (İTÜ Çekirdek)"
              />
            </div>

            <div>
              <label className={`block text-xs font-bold mb-1 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-700'
              }`}>
                Ekip Büyüklüğü
              </label>
              <input
                type="text"
                value={formData.teamSize || ''}
                onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-600 shadow-2xs transition-all ${
                  theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-700' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                }`}
                placeholder="8 Kişi"
              />
            </div>
          </div>

          {/* Row 4: Website & Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={`block text-xs font-bold mb-1 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-700'
              }`}>
                Web Sitesi Adresi
              </label>
              <div className="relative">
                <Globe className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  value={formData.website || ''}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-600 shadow-2xs transition-all ${
                    theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-700' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
                  placeholder="https://girişim.com"
                />
              </div>
            </div>

            <div>
              <label className={`block text-xs font-bold mb-1 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-700'
              }`}>
                İletişim E-Postası
              </label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={formData.contactEmail || ''}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-600 shadow-2xs transition-all ${
                    theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-700' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
                  placeholder="contact@girişim.com"
                />
              </div>
            </div>
          </div>

          {/* Row 5: Founders & Tech Stack */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={`block text-xs font-bold mb-1 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-700'
              }`}>
                Kurucular (Virgülle ayırın, Örn: Burak Demir (CEO), Ozan Güven (CTO))
              </label>
              <input
                type="text"
                value={foundersInput}
                onChange={(e) => setFoundersInput(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-600 shadow-2xs transition-all ${
                  theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-700' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                }`}
                placeholder="Ahmet Yılmaz (Kurucu), Mehmet Öz (CTO)"
              />
            </div>

            <div>
              <label className={`block text-xs font-bold mb-1 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-700'
              }`}>
                Teknoloji Yığını (Virgülle ayırın)
              </label>
              <input
                type="text"
                value={techStackInput}
                onChange={(e) => setTechStackInput(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-600 shadow-2xs transition-all ${
                  theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-700' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                }`}
                placeholder="Python, Computer Vision, React, PyTorch, AWS"
              />
            </div>
          </div>

          {/* Row 6: Funding Raised */}
          <div>
            <label className={`block text-xs font-bold mb-1 ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-700'
            }`}>
              Alınan Yatırım / Hibe Durumu
            </label>
            <input
              type="text"
              value={formData.fundingRaised || ''}
              onChange={(e) => setFormData({ ...formData, fundingRaised: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-600 shadow-2xs transition-all ${
                theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-700' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
              }`}
              placeholder="$450,000 Tohum Yatırım (VC + Angel)"
            />
          </div>

          {/* Row 7: Short & Full Description */}
          <div>
            <label className={`block text-xs font-bold mb-1 ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-700'
            }`}>
              Kısa Açıklama (Kart Metni)
            </label>
            <textarea
              rows={2}
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-600 shadow-2xs resize-none transition-all ${
                theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-700' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
              }`}
            />
          </div>

          <div>
            <label className={`block text-xs font-bold mb-1 ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-700'
            }`}>
              Detaylı Hikaye ve Çözüm Detayları
            </label>
            <textarea
              rows={4}
              value={formData.fullStory || ''}
              onChange={(e) => setFormData({ ...formData, fullStory: e.target.value })}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-600 shadow-2xs transition-all ${
                theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-700' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
              }`}
            />
          </div>

          {/* Görsel ve Medya Yönetimi (Logo, Cover Image & File Upload) */}
          <div className={`p-5 rounded-2xl border ${
            theme === 'dark' ? 'bg-slate-950/40 border-slate-800' : 'bg-slate-50 border-slate-200'
          } space-y-6`}>
            <h4 className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
            }`}>
              <Image className="w-4 h-4" />
              <span>Görsel ve Marka Kimliği Yönetimi</span>
            </h4>

            {/* Logo Settings Stack (Inline layout) */}
            <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-slate-900/40 border-slate-800/80' : 'bg-white border-slate-100'} space-y-3`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                <div className="space-y-3">
                  <div>
                    <label className={`block text-xs font-bold mb-1 ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Girişim Logosu (Görsel Yolu / URL)
                    </label>
                    <input
                      type="text"
                      value={formData.logo || ''}
                      onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                      className={`w-full px-3.5 py-2 rounded-xl border text-xs font-mono focus:outline-none focus:border-blue-600 shadow-2xs transition-all ${
                        theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-700' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                      }`}
                      placeholder="/logo.svg"
                    />
                  </div>

                  {/* Logo Presets */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Hızlı Logo Şablonları</span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { name: 'Varsayılan', path: '/logo.svg' },
                        { name: 'Sporpuan', path: '/sporpuan-logo.svg' },
                        { name: 'Mera', path: '/mera-logo.svg' },
                        { name: 'SportsFly', path: '/sportsfly-logo.svg' }
                      ].map((preset) => (
                        <button
                          key={preset.path}
                          type="button"
                          onClick={() => setFormData({ ...formData, logo: preset.path })}
                          className={`px-2 py-1 rounded-lg text-[10px] font-semibold border transition-all ${
                            formData.logo === preset.path
                              ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                              : theme === 'dark'
                                ? 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                                : 'bg-white border-slate-200 hover:border-slate-300 text-slate-600'
                          }`}
                        >
                          {preset.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Logo Live Preview */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Canlı Logo Önizleme</span>
                  <div className={`flex items-center gap-3 p-3 rounded-xl border ${theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="w-12 h-12 rounded-lg border border-slate-800 bg-slate-900 flex items-center justify-center p-1.5 shrink-0 overflow-hidden">
                      {formData.logo ? (
                        <img
                          src={formData.logo}
                          alt="Logo Önizleme"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/logo.svg';
                          }}
                        />
                      ) : (
                        <Building2 className="w-6 h-6 text-slate-600" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold text-slate-500 block uppercase">Canlı Logo Durumu</span>
                      <span className="text-xs font-semibold text-slate-300 font-mono truncate block max-w-[200px]">
                        {formData.logo || 'Atanmadı'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cover Image Settings Stack - REAL-TIME SIDE-BY-SIDE PREVIEW AREA */}
            <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-slate-900/40 border-slate-800/80' : 'bg-white border-slate-100'} space-y-3`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                
                {/* Sol taraf: Giriş Alanı ve Şablonlar */}
                <div className="space-y-3">
                  <div>
                    <label className={`block text-xs font-bold mb-1 ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      Kapak Görseli (Görsel Yolu / URL)
                    </label>
                    <input
                      type="text"
                      value={formData.coverImage || ''}
                      onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                      className={`w-full px-3.5 py-2 rounded-xl border text-xs font-mono focus:outline-none focus:border-blue-600 shadow-2xs transition-all ${
                        theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-700' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                      }`}
                      placeholder="/og-image.png"
                    />
                  </div>

                  {/* Cover Image Presets */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Kapak Görsel Şablonları</span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { name: 'Mera Kapak (SVG)', path: '/mera-cover.svg' },
                        { name: 'SportsFly Panel', path: '/sportsfly-dashboard.svg' },
                        { name: 'SportsFly Tablet', path: '/sportsfly-tablet-app.svg' },
                        { name: 'Sporpuan Kapak', path: '/sporpuan-cover.svg' },
                        { name: 'Sporpuan Harita', path: '/sporpuan-map-v2.svg' },
                        { name: 'Genel STT', path: '/og-image.png' }
                      ].map((preset) => (
                        <button
                          key={preset.path}
                          type="button"
                          onClick={() => setFormData({ ...formData, coverImage: preset.path })}
                          className={`px-2 py-1 rounded-lg text-[10px] font-semibold border transition-all ${
                            formData.coverImage === preset.path
                              ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                              : theme === 'dark'
                                ? 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                                : 'bg-white border-slate-200 hover:border-slate-300 text-slate-600'
                          }`}
                        >
                          {preset.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sağ taraf: REAL-TIME CANLI ÖNİZLEME ALANI (Side-by-side) */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Canlı Kapak Önizleme</span>
                  <div className={`w-full h-28 rounded-xl border flex items-center justify-center overflow-hidden relative shadow-inner group ${
                    theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
                  }`}>
                    {formData.coverImage ? (
                      <>
                        <img
                          src={formData.coverImage}
                          alt="Kapak Önizleme"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/og-image.png';
                          }}
                        />
                        <div className="absolute bottom-2 left-2 right-2 bg-slate-950/85 backdrop-blur-xs py-1 px-2 rounded-lg border border-slate-800/50 text-[10px] font-mono text-slate-300 truncate">
                          {formData.coverImage}
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-slate-500 gap-1 p-4">
                        <Image className="w-6 h-6 animate-pulse" />
                        <span className="text-[10px] font-semibold">Görsel URL'si yapıştırın veya şablon seçin</span>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>

            {/* Drag & Drop File Upload Simulator Component */}
            <div className="space-y-2">
              <label className={`block text-xs font-bold ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Dosya Yükleme Paneli (Sürükle & Bırak veya Seç)
              </label>
              
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.add('border-blue-500', 'bg-blue-500/10');
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove('border-blue-500', 'bg-blue-500/10');
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove('border-blue-500', 'bg-blue-500/10');
                  
                  const files = e.dataTransfer.files;
                  if (files && files.length > 0) {
                    const file = files[0];
                    const extension = file.name.split('.').pop()?.toLowerCase();
                    
                    const lowerName = file.name.toLowerCase();
                    if (lowerName.includes('sporttech-sppn') || lowerName.includes('sppn')) {
                      setFormData({ ...formData, coverImage: '/sporpuan-cover.svg' });
                    } else if (lowerName.includes('sportsfly') || lowerName.includes('sportfly')) {
                      setFormData({ ...formData, coverImage: '/sportsfly-dashboard.svg' });
                    } else if (lowerName.includes('mera')) {
                      setFormData({ ...formData, coverImage: '/mera-cover.svg' });
                    } else if (['png', 'jpg', 'jpeg', 'svg'].includes(extension || '')) {
                      setFormData({ ...formData, coverImage: `/${file.name}` });
                    }
                  }
                }}
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'image/*';
                  input.onchange = (e) => {
                    const files = (e.target as HTMLInputElement).files;
                    if (files && files.length > 0) {
                      const file = files[0];
                      const extension = file.name.split('.').pop()?.toLowerCase();
                      
                      const lowerName = file.name.toLowerCase();
                      if (lowerName.includes('sporttech-sppn') || lowerName.includes('sppn')) {
                        setFormData({ ...formData, coverImage: '/sporpuan-cover.svg' });
                      } else if (lowerName.includes('sportsfly') || lowerName.includes('sportfly')) {
                        setFormData({ ...formData, coverImage: '/sportsfly-dashboard.svg' });
                      } else if (lowerName.includes('mera')) {
                        setFormData({ ...formData, coverImage: '/mera-cover.svg' });
                      } else if (['png', 'jpg', 'jpeg', 'svg'].includes(extension || '')) {
                        setFormData({ ...formData, coverImage: `/${file.name}` });
                      }
                    }
                  };
                  input.click();
                }}
                className={`border-2 border-dashed rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                  theme === 'dark'
                    ? 'border-slate-800 bg-slate-950/20 hover:border-slate-700 hover:bg-slate-900/40 text-slate-300'
                    : 'border-slate-300 bg-white hover:border-blue-500 hover:bg-blue-50/20 text-slate-600'
                }`}
              >
                <UploadCloud className={`w-8 h-8 mb-2 ${
                  theme === 'dark' ? 'text-blue-500/80' : 'text-blue-500'
                }`} />
                <p className="text-xs font-bold">Kapak veya Logo Görseli Seçin / Sürükleyin</p>
                <p className="text-[10px] text-slate-500 mt-1">PNG, JPG, JPEG veya SVG (Sınırsız Boyut)</p>
                <p className="text-[10px] text-emerald-500 font-bold mt-2 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  İpucu: Yüklediğiniz "sppn", "sportsfly" veya "mera" görselleri ilgili yeni SVG kapakları ile eşleştirilerek kusursuzca atanacaktır!
                </p>
              </div>
            </div>
          </div>

          {/* Row 8: Featured toggle */}
          <div className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${
            theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <input
              type="checkbox"
              id="isFeatured"
              checked={!!formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded-sm border-slate-300 focus:ring-blue-500"
            />
            <label htmlFor="isFeatured" className={`text-xs font-semibold cursor-pointer ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-800'
            }`}>
              Öne Çıkan Girişim (Dizinde vitrinde ve ilk sıralarda gösterilsin)
            </label>
          </div>

        </form>

        {/* Modal Bottom Actions */}
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

            {startup && onDelete && (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm(`"${startup.name}" girişimini silmek istediğinize emin misiniz?`)) {
                    onDelete(startup.id);
                    onClose();
                  }
                }}
                className={`px-4 py-2 rounded-xl border text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  theme === 'dark' ? 'bg-slate-950 hover:bg-red-950 text-red-500 border-red-900/50' : 'bg-white hover:bg-red-50 text-red-600 border-red-100'
                }`}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Girişimi Sil</span>
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className={`px-5 py-2.5 rounded-xl text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all active:scale-95 ${
              isSaved ? 'bg-emerald-600' : 'bg-blue-600 hover:bg-blue-500'
            }`}
          >
            {isSaved ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Kaydedildi!</span>
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
