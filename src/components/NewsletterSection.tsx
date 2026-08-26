import React, { useState } from 'react';
import { Mail, CheckCircle2, Send, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NewsletterSectionProps {
  onSubscribe?: (email: string) => void;
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({ onSubscribe }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { language, t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    if (onSubscribe) {
      onSubscribe(email);
    }
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 3000);
  };

  return (
    <section className="py-16 bg-slate-50/70 border-b border-slate-200/80 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xs">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Text info */}
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700 text-[11px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                <span>{language === 'tr' ? 'Haftalık SportTech Bülteni' : language === 'ar' ? 'نشرة سبورت تيك الأسبوعية' : 'Weekly SportTech Digest'}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
                {language === 'tr' ? (
                  <>
                    Spor İnovasyonunu <br />
                    <span className="text-blue-600">Her Cuma E-Postanızda</span> Takip Edin
                  </>
                ) : language === 'ar' ? (
                  <>
                    تتبع الابتكار الرياضي <br />
                    <span className="text-blue-600">في بريدك الإلكتروني كل جمعة</span>
                  </>
                ) : (
                  <>
                    Track Sports Innovation <br />
                    <span className="text-blue-600">In Your Inbox Every Friday</span>
                  </>
                )}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {language === 'tr'
                  ? 'Yatırım turları, patentli Türk spor girişimleri, küresel trendler ve kulüplerin pilot uygulama sonuçları 5 dakikalık hap özetlerle gelen kutunuzda.'
                  : language === 'ar'
                  ? 'جولات الاستثمار، والشركات الرياضية الناشئة المعتمدة، والاتجاهات العالمية، ونتائج الاختبارات التجريبية للأندية تصلك في ملخصات سريعة مدتها 5 دقائق.'
                  : 'Investment rounds, patented Turkish sport startups, global trends, and club pilot test logs delivered in quick 5-minute digests.'}
              </p>
            </div>

            {/* Subscription Form */}
            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="p-6 rounded-2xl bg-blue-50 border border-blue-200 text-center space-y-2 animate-in fade-in duration-150">
                  <CheckCircle2 className="w-8 h-8 text-blue-600 mx-auto" />
                  <h4 className="text-sm font-bold text-slate-900">
                    {language === 'tr' ? 'Bültene Kaydoldunuz!' : language === 'ar' ? 'تم الاشتراك بنجاح!' : 'Subscribed Successfully!'}
                  </h4>
                  <p className="text-xs text-slate-600">
                    {language === 'tr' 
                      ? 'İlk sayımız Cuma sabahı e-posta adresinize ulaşacaktır.' 
                      : language === 'ar'
                      ? 'ستصلك أول نشرة في بريدك الإلكتروني صباح يوم الجمعة.'
                      : 'Our next issue will land in your inbox on Friday morning.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder={language === 'tr' ? "ornek@kulup.com veya e-posta" : "name@company.com"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-orange-300" />
                    <span>{language === 'tr' ? 'Ücretsiz Abone Ol' : language === 'ar' ? 'اشترك مجاناً' : 'Subscribe Free'}</span>
                  </button>

                  <p className="text-[10px] text-slate-500 text-center">
                    {language === 'tr'
                      ? 'Spam göndermiyoruz. İstediğiniz zaman tek tıkla ayrılabilirsiniz.'
                      : language === 'ar'
                      ? 'لا نرسل رسائل عشوائية. يمكنك إلغاء الاشتراك في أي وقت بنقرة واحدة.'
                      : 'Zero spam. Unsubscribe anytime with a single click.'}
                  </p>
                </form>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
