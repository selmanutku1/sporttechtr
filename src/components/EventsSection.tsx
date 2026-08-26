import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  ExternalLink, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2,
  Video,
  Ticket
} from 'lucide-react';
import { UPCOMING_EVENTS } from '../data/ecosystem';
import { EcosystemEvent } from '../types';
import { useLanguage } from '../context/LanguageContext';

export const EventsSection: React.FC = () => {
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [modalEvent, setModalEvent] = useState<EcosystemEvent | null>(null);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { language, t } = useLanguage();

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalEvent) return;
    setRegisteredEvents(prev => [...prev, modalEvent.id]);
    setRegisterSuccess(true);
    setTimeout(() => {
      setModalEvent(null);
      setRegisterSuccess(false);
      setName('');
      setEmail('');
    }, 2000);
  };

  // Translate upcoming events in-memory if EN/AR is active
  const localizedEvents = useMemo(() => {
    return UPCOMING_EVENTS.map(evt => {
      if (language === 'tr') return evt;

      if (language === 'ar') {
        const eventTranslations: Record<string, Partial<EcosystemEvent>> = {
          'summit-2026': {
            title: "قمة تكنولوجيا الرياضة في تركيا 2026",
            description: "القمة الرائدة لتكنولوجيا الرياضة في تركيا، تجمع بين نخبة من مديري الأندية، وعلماء فسيولوجيا الرياضة، والشركات الناشئة المبتكرة، وشركات رأس المال الاستثماري تحت سقف واحد.",
            location: "قاعة ITU لمركز البحث والتطوير، إسطنبول",
            type: "Summit",
            organizer: "سبورت تيك تركيا و ITU ARI Teknokent"
          },
          'hackathon-2026': {
            title: "الذكاء الاصطناعي في الملعب: هكاثون الأداء الرياضي",
            description: "هكاثون تنافسي مدته 48 ساعة في مجالات الرؤية الحاسوبية وتتبع اللاعبين بصرياً لتحليل بيانات المباريات الحية واكتشاف رؤى الرياضيين.",
            location: "Innogate Hub / عبر الإنترنت",
            type: "Hackathon",
            organizer: "Sporsepeti DevTeam والشركاء"
          },
          'demoday-2026': {
            title: "يوم العرض لمنظومة تكنولوجيا الرياضة",
            description: "شركات ناشئة مختارة في مجال التكنولوجيا الرياضية المحلية تعرض حلولها أمام كبار المستثمرين الملائكيين الرياضيين، وكشافة الأندية الأوروبية.",
            location: "Levent Kolektif House، إسطنبول",
            type: "Demo Day",
            organizer: "شبكة SportTech VC"
          }
        };
        const trans = eventTranslations[evt.id];
        if (trans) {
          return {
            ...evt,
            ...trans
          } as EcosystemEvent;
        }
        return evt;
      }

      const eventTranslations: Record<string, Partial<EcosystemEvent>> = {
        'summit-2026': {
          title: "SportTech Summit Turkey 2026",
          description: "Turkey's premier sports tech summit, bringing together elite club executives, sport physiologists, innovative startups, and venture capital firms under one roof.",
          location: "ITU Ar-Ge Center Hall A, Istanbul",
          type: "Summit",
          organizer: "SportTech Turkey & ITU ARI Teknokent"
        },
        'hackathon-2026': {
          title: "AI on Field: Sports Performance Hackathon",
          description: "A 48-hour competitive computer vision and optical player tracking hackathon analyzing real match telemetry to discover athlete insights.",
          location: "Innogate Hub / Online",
          type: "Hackathon",
          organizer: "Sporsepeti DevTeam & Partners"
        },
        'demoday-2026': {
          title: "SportTech Ecosystem Demo Day",
          description: "Selected local sports technology startups pitch live to leading domestic sport angels, European club scouts, and tech investors.",
          location: "Levent Kolektif House, Istanbul",
          type: "Demo Day",
          organizer: "SportTech VC Network"
        }
      };

      const trans = eventTranslations[evt.id];
      if (trans) {
        return {
          ...evt,
          ...trans
        } as EcosystemEvent;
      }
      return evt;
    });
  }, [language]);

  return (
    <section id="events" className="py-20 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
              <Calendar className="w-3.5 h-3.5 text-orange-500" />
              <span>{language === 'tr' ? 'Etkinlikler & Zirveler' : language === 'ar' ? 'الفعاليات والقمم' : 'Events & Summits'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
              {language === 'tr' ? (
                <>
                  Spor Teknolojisi <br className="hidden sm:inline" />
                  <span className="text-blue-600">Zirveleri, Hackathonlar & Demo Day</span>
                </>
              ) : language === 'ar' ? (
                <>
                  قمم تكنولوجيا الرياضة <br className="hidden sm:inline" />
                  <span className="text-blue-600">الهكاثونات وأيام العرض</span>
                </>
              ) : (
                <>
                  Sports Technology <br className="hidden sm:inline" />
                  <span className="text-blue-600">Summits, Hackathons & Demo Days</span>
                </>
              )}
            </h2>
          </div>

          <p className="text-slate-600 text-xs sm:text-sm max-w-md">
            {language === 'tr'
              ? 'Yatırımcı panelleri, canlı teknoloji demoları ve ödüllü veri yarışmalarına katılarak ekosistemin parçası olun.'
              : language === 'ar'
              ? 'كن جزءاً من المنظومة من خلال الانضمام إلى جلسات المستثمرين، وعروض التكنولوجيا الحية، ومسابقات البيانات الرياضية الحائزة على جوائز.'
              : 'Join elite investor panels, live technology demonstrations, and high-stakes athletic data hackathons.'}
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {localizedEvents.map((evt) => {
            const isRegistered = registeredEvents.includes(evt.id);
            return (
              <div 
                key={evt.id}
                className="bg-slate-50 hover:bg-white border border-slate-200 hover:border-blue-200 rounded-2xl p-6 transition-all flex flex-col justify-between group shadow-xs hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-[10px] font-bold uppercase tracking-wider shadow-2xs">
                      {language === 'ar'
                        ? (evt.type === 'Summit' ? 'قمة' : evt.type === 'Hackathon' ? 'هكاثون' : evt.type === 'Demo Day' ? 'يوم العرض' : evt.type)
                        : language === 'tr'
                        ? (evt.type === 'Summit' ? 'Zirve' : evt.type === 'Hackathon' ? 'Hackathon' : evt.type === 'Demo Day' ? 'Demo Günü' : evt.type)
                        : evt.type}
                    </span>

                    {evt.isOnline && (
                      <span className="flex items-center gap-1 text-[10px] text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        <Video className="w-3 h-3 text-blue-600" />
                        <span>{language === 'tr' ? 'Hibrit & Canlı Yayın' : language === 'ar' ? 'هجين وبث مباشر' : 'Hybrid & Live'}</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-700 font-semibold mb-2">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>{evt.date}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {evt.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {evt.description}
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-600 mb-6 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="text-slate-800 font-medium">{evt.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{evt.attendees}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-medium">
                    {evt.organizer}
                  </span>

                  <button
                    onClick={() => !isRegistered && setModalEvent(evt)}
                    disabled={isRegistered}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isRegistered
                        ? 'bg-blue-50 text-blue-700 border border-blue-200 cursor-default'
                        : 'bg-blue-600 hover:bg-blue-500 text-white active:scale-95 shadow-sm'
                    }`}
                  >
                    {isRegistered ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                        <span>{language === 'tr' ? 'Kayıt Alındı' : language === 'ar' ? 'تم التسجيل' : 'Registered'}</span>
                      </>
                    ) : (
                      <>
                        <Ticket className="w-3.5 h-3.5 text-orange-300" />
                        <span>{language === 'tr' ? 'Ücretsiz Kaydol' : language === 'ar' ? 'سجل مجاناً' : 'Register Free'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Event Register Modal */}
      {modalEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                {modalEvent.type} {language === 'tr' ? 'Kaydı' : language === 'ar' ? 'تسجيل' : 'Registration'}
              </span>
              <button 
                onClick={() => setModalEvent(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2">{modalEvent.title}</h3>
            <p className="text-xs text-slate-500 mb-6">{modalEvent.date} • {modalEvent.location}</p>

            {registerSuccess ? (
              <div className="p-6 bg-blue-50 border border-blue-200 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-blue-600 mx-auto animate-bounce" />
                <h4 className="text-base font-bold text-slate-900">
                  {language === 'tr' ? 'Kaydınız Başarıyla Alındı!' : language === 'ar' ? 'تم التسجيل بنجاح!' : 'Registration Completed!'}
                </h4>
                <p className="text-xs text-slate-600">
                  {language === 'tr' 
                    ? 'Etkinlik katılım biletiniz ve erişim linki e-posta adresinize gönderildi.' 
                    : language === 'ar'
                    ? 'تم إرسال تذكرة حضور الفعالية ورابط البث المباشر إلى بريدك الإلكتروني.'
                    : 'Your electronic ticket and streaming link have been sent to your email.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {language === 'tr' ? 'Ad Soyad' : language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={language === 'tr' ? "Örn: Burak Kaya" : language === 'ar' ? "مثال: جون دو" : "e.g., John Doe"}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {language === 'tr' ? 'E-Posta Adresi' : language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-blue-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-sm active:scale-95"
                >
                  {language === 'tr' ? 'Kaydı Tamamla' : language === 'ar' ? 'إكمال التسجيل' : 'Complete Registration'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </section>
  );
};
