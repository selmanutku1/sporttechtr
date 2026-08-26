import React, { useState } from 'react';
import { Mail, CheckCircle2, Send, Sparkles } from 'lucide-react';

interface NewsletterSectionProps {
  onSubscribe?: (email: string) => void;
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({ onSubscribe }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

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
                <span>Haftalık SportTech Bülteni</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
                Spor İnovasyonunu <br />
                <span className="text-blue-600">
                  Her Cuma E-Postanızda
                </span> Takip Edin
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Yatırım turları, patentli Türk spor girişimleri, küresel trendler ve kulüplerin pilot uygulama sonuçları 5 dakikalık hap özetlerle gelen kutunuzda.
              </p>
            </div>

            {/* Subscription Form */}
            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="p-6 rounded-2xl bg-blue-50 border border-blue-200 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-blue-600 mx-auto" />
                  <h4 className="text-sm font-bold text-slate-900">Bültene Kaydoldunuz!</h4>
                  <p className="text-xs text-slate-600">İlk sayımız Cuma sabahı e-posta adresinize ulaşacaktır.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="ornek@kulup.com veya e-posta"
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
                    <span>Ücretsiz Abone Ol</span>
                  </button>

                  <p className="text-[10px] text-slate-500 text-center">
                    Spam göndermiyoruz. İstediğiniz zaman tek tıkla ayrılabilirsiniz.
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
