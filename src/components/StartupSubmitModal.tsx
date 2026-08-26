import React, { useState } from 'react';
import { 
  X, 
  Rocket, 
  CheckCircle2, 
  Send, 
  Upload, 
  Building2, 
  Cpu, 
  Globe, 
  Mail, 
  Users,
  Sparkles
} from 'lucide-react';
import { StartupCategory, FundingStage } from '../types';
import { BrandIcon } from './BrandLogo';
import { useLanguage } from '../context/LanguageContext';

interface StartupSubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessAdd?: (newStartup: any) => void;
}

export const StartupSubmitModal: React.FC<StartupSubmitModalProps> = ({
  isOpen,
  onClose,
  onSuccessAdd
}) => {
  const [submitted, setSubmitted] = useState(false);
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    tagLine: '',
    category: 'ai_analytics' as StartupCategory,
    stage: 'Seed' as FundingStage,
    website: '',
    location: '',
    founders: '',
    teamSize: '1-5 Kişi',
    contactEmail: '',
    description: '',
    techStack: '',
    fundingRaised: '$0 - $250K'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (onSuccessAdd) {
      onSuccessAdd(formData);
    }
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2800);
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
                {language === 'tr' ? 'Girişimini Ekosistem Haritasına Ekle' : language === 'ar' ? 'أضف شركتك الناشئة إلى خريطة المنظومة' : 'Add Your Startup to the Map'}
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500">
                {language === 'tr' 
                  ? 'Sport Tech Türkiye dizininde yer alın, kulüp ve yatırımcılara ulaşın.' 
                  : language === 'ar'
                  ? 'احصل على مكان في دليل سبورت تيك تركيا وتواصل مع الأندية والمستثمرين.'
                  : 'List your startup on the SportTech Turkey directory, connect with clubs & VCs.'}
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

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto">
          {submitted ? (
            <div className="py-8 text-center space-y-4 animate-in fade-in duration-200">
              <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {language === 'tr' ? 'Başvurunuz Başarıyla Alındı!' : language === 'ar' ? 'تم استلام طلبك بنجاح!' : 'Application Successfully Received!'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                {language === 'tr'
                  ? 'Girişim profiliniz Sport Tech Türkiye İnceleme Kurulu tarafından değerlendirilecek ve kısa süre içinde dizine eklenecektir.'
                  : language === 'ar'
                  ? 'سيتم تقييم ملف شركتك الناشئة من قبل لجنة مراجعة سبورت تيك تركيا وإضافتها إلى دليلنا قريباً.'
                  : 'Your startup profile will be evaluated by the SportTech Turkey Review Board and added to our ecosystem directory shortly.'}
              </p>
              <div className="pt-2 text-xs text-emerald-700 font-semibold">
                {language === 'tr' ? 'Sport Tech Türkiye • Girişim Başvuru Takip Kodu' : language === 'ar' ? 'سبورت تيك تركيا • رمز تتبع طلب الشركة الناشئة' : 'SportTech Turkey • Application Tracking ID'}: #STT-{Math.floor(1000 + Math.random() * 9000)}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {language === 'tr' ? 'Girişim Adı *' : language === 'ar' ? 'اسم الشركة الناشئة *' : 'Startup Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={language === 'tr' ? "Örn: PulseTrack AI" : language === 'ar' ? "مثال: PulseTrack AI" : "e.g., PulseTrack AI"}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {language === 'tr' ? 'Teknoloji Kategorisi *' : language === 'ar' ? 'الفئة التكنولوجية *' : 'Technology Category *'}
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as StartupCategory })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600"
                  >
                    <option value="management_platform">{language === 'tr' ? 'Yönetim & Dijital Platform' : language === 'ar' ? 'المنصات الإدارية والرقمية' : 'Management & Digital Platform'}</option>
                    <option value="ai_analytics">{language === 'tr' ? 'Yapay Zeka & Analitik' : language === 'ar' ? 'الذكاء الاصطناعي والتحليلات' : 'AI & Analytics'}</option>
                    <option value="wearables_iot">{language === 'tr' ? 'Giyilebilir Cihazlar & IoT' : language === 'ar' ? 'الأجهزة القابلة للارتداء وإنترنت الأشياء' : 'Wearables & IoT'}</option>
                    <option value="smart_venues">{language === 'tr' ? 'Akıllı Tesis & Stadyum' : language === 'ar' ? 'المرافق الذكية والملاعب' : 'Smart Venues & Stadiums'}</option>
                    <option value="performance_recovery">{language === 'tr' ? 'Performans & Biyomekanik' : language === 'ar' ? 'الأداء والميكانيكا الحيوية' : 'Performance & Biomechanics'}</option>
                    <option value="fan_media">{language === 'tr' ? 'Taraftar & Medya Teknolojileri' : language === 'ar' ? 'تقنيات الجماهير والإعلام' : 'Fan & Media Tech'}</option>
                    <option value="esports_gaming">{language === 'tr' ? 'E-Spor & Gaming' : language === 'ar' ? 'الرياضات الإلكترونية والألعاب' : 'Esports & Gaming'}</option>
                    <option value="health_nutrition">{language === 'tr' ? 'Sağlık & Biyoteknoloji' : language === 'ar' ? 'الصحة والتكنولوجيا الحيوية' : 'Health & Biotech'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'tr' ? 'Kısa Slogan / Değer Önerisi (Tagline) *' : language === 'ar' ? 'شعار قصير / قيمة العرض (Tagline) *' : 'Short Slogan / Value Proposition (Tagline) *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={language === 'tr' ? "Örn: Saha kenarı 4K kameralarla milimetrik canlı oyuncu takip sistemi" : language === 'ar' ? "مثال: نظام تتبع اللاعبين المباشر بدقة الملليمتر باستخدام كاميرات 4K بجانب الملعب" : "e.g., Tactical live tracking using edge-AI and high-speed cameras"}
                  value={formData.tagLine}
                  onChange={(e) => setFormData({ ...formData, tagLine: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {language === 'tr' ? 'Yatırım Aşaması *' : language === 'ar' ? 'مرحلة التمويل *' : 'Funding Stage *'}
                  </label>
                  <select
                    value={formData.stage}
                    onChange={(e) => setFormData({ ...formData, stage: e.target.value as FundingStage })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600"
                  >
                    <option value="Bootstrapped">Bootstrapped</option>
                    <option value="Pre-Seed">Pre-Seed</option>
                    <option value="Seed">Seed</option>
                    <option value="Series A">Series A</option>
                    <option value="Series B+">Series B+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {language === 'tr' ? 'Lokasyon *' : language === 'ar' ? 'الموقع *' : 'Location *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={language === 'tr' ? "İstanbul (İTÜ ARI)" : language === 'ar' ? "إسطنبول (مجمع ITU ARI)" : "Istanbul (ITU ARI)"}
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {language === 'tr' ? 'Website URL *' : language === 'ar' ? 'موقع الويب *' : 'Website URL *'}
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://..."
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {language === 'tr' ? 'Kurucular & İsimler *' : language === 'ar' ? 'المؤسسون والأسماء *' : 'Founders & Names *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={language === 'tr' ? "Örn: Ahmet Yılmaz, Elif Kaya" : language === 'ar' ? "مثال: أحمد يلماز، إيليف كايا" : "e.g., Jane Doe, John Smith"}
                    value={formData.founders}
                    onChange={(e) => setFormData({ ...formData, founders: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {language === 'tr' ? 'İletişim E-Postası *' : language === 'ar' ? 'البريد الإلكتروني للتواصل *' : 'Contact Email *'}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="founder@girisim.com"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'tr' ? 'Teknoloji Yığını & Kullanılan Diller' : language === 'ar' ? 'البنية التكنولوجية واللغات المستخدمة' : 'Technology Stack & Key Languages'}
                </label>
                <input
                  type="text"
                  placeholder={language === 'tr' ? "Örn: PyTorch, Computer Vision, BLE 5.3, React" : language === 'ar' ? "مثال: PyTorch, Computer Vision, BLE 5.3, React" : "e.g., PyTorch, OpenCV, BLE 5.3, React"}
                  value={formData.techStack}
                  onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'tr' ? 'Çözülen Problem & Detaylı Açıklama *' : language === 'ar' ? 'المشكلة التي يتم حلها والوصف التفصيلي *' : 'Problem Solved & Detailed Description *'}
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder={language === 'tr' ? "Kulüpler, sporcular veya tesisler için sunduğunuz teknolojik çözüm nedir?" : language === 'ar' ? "ما هو الحل التكنولوجي الذي تقدمه للأندية أو الرياضيين أو المرافق؟" : "What is the specific technological value proposition you bring for clubs, leagues, or venues?"}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-sm active:scale-98 flex items-center justify-center gap-2"
                >
                  <Rocket className="w-4 h-4 text-orange-400 animate-pulse" />
                  <span>{language === 'tr' ? 'Girişimi Sport Tech Türkiye Dizinine Gönder' : language === 'ar' ? 'إرسال الشركة الناشئة إلى دليل سبورت تيك تركيا' : 'Submit Startup to SportTech Turkey'}</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
