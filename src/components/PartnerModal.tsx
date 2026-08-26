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
import { useLanguage } from '../context/LanguageContext';

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessSubmit?: (formData: any) => void;
}

export const PartnerModal: React.FC<PartnerModalProps> = ({ isOpen, onClose, onSuccessSubmit }) => {
  const [submitted, setSubmitted] = useState(false);
  const { language } = useLanguage();
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
                {language === 'tr' ? 'Ekosistem Partnerlik Başvurusu' : language === 'ar' ? 'طلب شراكة المنظومة الرياضية' : 'Ecosystem Partnership Application'}
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500">
                {language === 'tr' 
                  ? 'Sport Tech Türkiye ile ortaklık, pilot projeler og yatırım işbirlikleri' 
                  : language === 'ar'
                  ? 'الشراكات والمشاريع التجريبية والتعاون الاستثماري مع سبورت تيك تركيا'
                  : 'Partnerships, pilot projects, and venture collaborations with SportTech Turkey'}
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
            <div className="py-8 text-center space-y-3 animate-in fade-in duration-200">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-xl font-bold text-slate-900">
                {language === 'tr' ? 'Partnerlik Talebiniz Alındı!' : language === 'ar' ? 'تم استلام طلب الشراكة بنجاح!' : 'Partnership Request Received!'}
              </h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                {language === 'tr'
                  ? 'Sport Tech Türkiye Kurumsal İlişkiler Masası en geç 1 iş günü içinde sizinle iletişime geçecektir.'
                  : language === 'ar'
                  ? 'سيتواصل معك مكتب العلاقات المؤسسية في سبورت تيك تركيا خلال يوم عمل واحد كحد أقصى.'
                  : 'The SportTech Turkey Corporate Relations Desk will reach back to you within 1 business day.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'tr' ? 'Kurum / Kulüp / Fon Adı *' : language === 'ar' ? 'اسم المؤسسة / النادي / الصندوق *' : 'Organization / Club / Fund Name *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={language === 'tr' ? "Örn: Anadolu Spor Kulübü veya XYZ Ventures" : language === 'ar' ? "مثال: نادي الأناضول الرياضي أو ريادة الأعمال XYZ" : "e.g., Anadolu Sports Club or XYZ Ventures"}
                  value={form.orgName}
                  onChange={(e) => setForm({ ...form, orgName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {language === 'tr' ? 'Kurum Türü *' : language === 'ar' ? 'نوع المؤسسة *' : 'Organization Type *'}
                  </label>
                  <select
                    value={form.orgType}
                    onChange={(e) => setForm({ ...form, orgType: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600"
                  >
                    <option value="club">{language === 'tr' ? 'Spor Kulübü / Akademi' : language === 'ar' ? 'نادي رياضي / أكاديمية' : 'Sports Club / Academy'}</option>
                    <option value="federation">{language === 'tr' ? 'Federasyon / Kamu' : language === 'ar' ? 'اتحاد رياضي / قطاع حكومي' : 'Federation / Public Sector'}</option>
                    <option value="vc_fund">{language === 'tr' ? 'Yatırım Fonu / Melek Yatırımcı' : language === 'ar' ? 'صندوق استثماري / مستثمر ملاك' : 'VC Fund / Angel Investor'}</option>
                    <option value="technopark">{language === 'tr' ? 'Teknopark / Kuluçka' : language === 'ar' ? 'مجمع تكنولوجي / حاضنة أعمال' : 'Technopark / Incubator'}</option>
                    <option value="university">{language === 'tr' ? 'Üniversite / Araştırma Lab' : language === 'ar' ? 'جامعة / مختبر أبحاث' : 'University / Research Lab'}</option>
                    <option value="brand">{language === 'tr' ? 'Sponsor / Teknoloji Şirketi' : language === 'ar' ? 'راعٍ / شركة تكنولوجيا' : 'Sponsor / Tech Corporation'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {language === 'tr' ? 'Yetkili Adı Soyadı *' : language === 'ar' ? 'الاسم الكامل للممثل المسؤول *' : 'Representative Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={language === 'tr' ? "Adınız Soyadınız" : language === 'ar' ? "الاسم واللقب" : "Your name and surname"}
                    value={form.contactName}
                    onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {language === 'tr' ? 'Kurumsal E-Posta *' : language === 'ar' ? 'البريد الإلكتروني للمؤسسة *' : 'Corporate Email *'}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="rep@organization.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {language === 'tr' ? 'Telefon Numarası' : language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                  </label>
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
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {language === 'tr' ? 'İşbirliği Beklentiniz / Notunuz' : language === 'ar' ? 'تطلعات الشراكة / ملاحظاتك' : 'Partnership Expectations / Message'}
                </label>
                <textarea
                  rows={2.5}
                  placeholder={language === 'tr' ? "Pilot test, girişim yatırımı veya etkinlik sponsorluğu hakkında detay verebilirsiniz..." : language === 'ar' ? "يمكنك تقديم تفاصيل حول المشاريع التجريبية، الاستثمار في الشركات الناشئة، أو رعاية الفعاليات..." : "You can provide details about pilot testing, startup investment, or event sponsorships..."}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-sm active:scale-98"
              >
                {language === 'tr' ? 'Partnerlik Başvurusunu Gönder' : language === 'ar' ? 'إرسال طلب الشراكة' : 'Submit Partnership Application'}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
