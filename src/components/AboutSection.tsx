import React, { useMemo } from 'react';
import { 
  ShieldCheck, 
  Target, 
  Eye, 
  Cpu, 
  Activity, 
  Zap, 
  Building2, 
  CheckCircle2, 
  ArrowRight,
  Globe2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AboutSectionProps {
  onExploreStartups: () => void;
  onOpenStartupSubmit: () => void;
}

export const AboutSection: React.FC<{
  onExploreStartups: () => void;
  onOpenStartupSubmit: () => void;
}> = ({
  onExploreStartups,
  onOpenStartupSubmit
}) => {
  const { language, t } = useLanguage();

  const pillars = useMemo(() => {
    if (language === 'tr') {
      return [
        {
          icon: Cpu,
          title: 'Yapay Zeka & Taktiksel Veri',
          desc: 'Bilgisayarlı görü, optik oyuncu takibi, maç verisi simülasyonları ve yapay zeka destekli sakatlık tahmin modelleriyle karar alma süreçlerini veriyle güçlendiriyoruz.'
        },
        {
          icon: Activity,
          title: 'Giyilebilir Cihazlar & IoT',
          desc: 'Mikro sensörlü GPS yelekleri, akıllı toplar, ter biyosensörleri ve 100Hz IMU modülleri ile sporcuların fizyolojik yükünü mikrosaniye hassasiyetinde ölçümlüyoruz.'
        },
        {
          icon: Zap,
          title: 'Biyomekanik & Atletik Sağlık',
          desc: 'İşaretçisiz (markerless) 3D movement yakalama, eklem açısı taramaları, kuvvet platformları ve kriyoterapi sistemleri ile sakatlıkları önleyip performansı zirveye taşıyoruz.'
        },
        {
          icon: Building2,
          title: 'Akıllı Stadyum & Taraftar',
          desc: 'Yüksek hızlı 5G bağlantısı, anlık AR pozisyon tekrarları, koltuktan mobil sipariş ve dijital sadakat sistemleriyle modern stadyumları yaşayan birer teknoloji üssüne çeviriyoruz.'
        }
      ];
    } else if (language === 'ar') {
      return [
        {
          icon: Cpu,
          title: 'الذكاء الاصطناعي والتحليلات التكتيكية',
          desc: 'تمكين اتخاذ القرار التكتيكي باستخدام الرؤية الحاسوبية، والتتبع البصري للرياضيين، ومحاكاة المباريات، ونماذج التنبؤ بالإصابات المدعومة بالذكاء الاصطناعي.'
        },
        {
          icon: Activity,
          title: 'الأجهزة القابلة للارتداء وإنترنت الأشياء',
          desc: 'قياس الحمل الفسيولوجي للرياضيين بدقة متناهية باستخدام سترات نظام تحديد المواقع (GPS) ذات الاستشعار الدقيق، وكرات التدريب الذكية، والمستشعرات الحيوية للعرق.'
        },
        {
          icon: Zap,
          title: 'الميكانيكا الحيوية والصحة الرياضية',
          desc: 'الوقاية من الإصابات وزيادة الأداء إلى الحد الأقصى من خلال التقاط الحركة ثلاثية الأبعاد بدون علامات، وفحص زوايا المفاصل، ومنصات القوة.'
        },
        {
          icon: Building2,
          title: 'المرافق الذكية وتجربة الجماهير',
          desc: 'تحويل الملاعب الحديثة إلى مراكز تكنولوجية تفاعلية مع اتصال 5G عالي السرعة، وإعادة اللقطات الفورية بتقنية الواقع المعزز، والطلبات عبر الهاتف المحمول.'
        }
      ];
    } else {
      return [
        {
          icon: Cpu,
          title: 'AI & Tactical Analytics',
          desc: 'Empowering tactical decision-making with computer vision, optical athlete tracking, match simulations, and AI-powered injury prediction models.'
        },
        {
          icon: Activity,
          title: 'Wearables & IoT Devices',
          desc: 'Measuring athletes\' physiological load with microsecond precision using micro-sensory GPS vests, smart training balls, sweat biosensors, and 100Hz IMU modules.'
        },
        {
          icon: Zap,
          title: 'Biomechanics & Athletic Health',
          desc: 'Preventing injuries and maximizing performance with markerless 3D motion capture, joint angle scans, force plates, and cryotherapy systems.'
        },
        {
          icon: Building2,
          title: 'Smart Venues & Fan Experience',
          desc: 'Transforming modern stadiums into interactive technology hubs with high-speed 5G, instant AR replays, mobile seat orders, and digital loyalty rewards.'
        }
      ];
    }
  }, [language]);

  const stakeholders = useMemo(() => {
    if (language === 'tr') {
      return [
        {
          title: 'Girişimciler & Startuplar',
          desc: 'Kulüplerle pilot projeler, Ar-Ge hibe destekleri, küresel hızlandırıcılar ve yatırım fonlarıyla doğrudan buluşma imkanı.'
        },
        {
          title: 'Spor Kulüpleri & Federasyonlar',
          desc: 'Dünya standartlarında doğrulanmış yerli teknolojileri uygun maliyetle kadrolarına entegre etme ve altyapı oyuncularını veriyle yetiştirme avantajı.'
        },
        {
          title: 'Yatırımcılar & VC Fonları',
          desc: 'Büyüme potansiyeli yüksek, patentli ve ticarileşmiş spor teknolojisi girişimlerine erken aşamada erişim sağlayan deal-flow havuzu.'
        },
        {
          title: 'Akademi & Ar-Ge Merkezleri',
          desc: 'Biyomekanik, yapay zeka ve biyomedikal laboratuvarlarında üretilen bilimsel çıktıların sahada test edilip ürüne dönüşme köprüsü.'
        }
      ];
    } else if (language === 'ar') {
      return [
        {
          title: 'رواد الأعمال والشركات الناشئة',
          desc: 'فرص للمشاريع التجريبية مع الأندية الرياضية، ومنح البحث والتطوير، والمسرعات العالمية، والوصول المباشر إلى الصناديق الاستثمارية.'
        },
        {
          title: 'الأندية والاتحادات',
          desc: 'دمج الحلول التكنولوجية المحلية والمثبتة عالمياً بتكاليف أقل وتربية لاعبي الأكاديمية باستخدام تحليلات البيانات العميقة.'
        },
        {
          title: 'المستثمرون وصناديق رأس المال',
          desc: 'تدفق صفقات يركز على شركات تكنولوجيا الرياضة عالية النمو، والحاصلة على براءات اختراع للوصول المبكر للاستثمارات.'
        },
        {
          title: 'الأكاديميا ومختبرات البحث والتطوير',
          desc: 'جسور لاختبار الاكتشافات العلمية من مختبرات الميكانيكا الحيوية والطب الحيوي مباشرة على الملاعب الحية وتحويلها إلى منتجات تجارية.'
        }
      ];
    } else {
      return [
        {
          title: 'Entrepreneurs & Startups',
          desc: 'Opportunities for pilot projects with sports clubs, R&D grants, global accelerators, and direct access to venture funds.'
        },
        {
          title: 'Clubs & Federations',
          desc: 'Integrating world-class, validated local tech solutions at lower costs and breeding academy players with deep data analytics.'
        },
        {
          title: 'Investors & VC Funds',
          desc: 'High-growth potential, patented and commercialized sports tech deal-flow pool for early-stage access.'
        },
        {
          title: 'Academia & R&D Labs',
          desc: 'Bridges for testing scientific discoveries from biomechanics and biomedical labs directly on live fields into commercial products.'
        }
      ];
    }
  }, [language]);

  return (
    <section id="about" className="py-20 bg-slate-50/70 border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Eyebrow & Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />
            <span>{t('nav.about')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight mb-4">
            {language === 'tr' ? (
              <>
                Türkiye'nin Spor Teknolojisi Vizyonunu <br />
                <span className="text-blue-600">Birlikte Geleceğe Taşıyoruz</span>
              </>
            ) : language === 'ar' ? (
              <>
                نحمل رؤية تكنولوجيا الرياضة في تركيا <br />
                <span className="text-blue-600">نحو المستقبل معاً</span>
              </>
            ) : (
              <>
                Carrying Turkey's Sports Tech Vision <br />
                <span className="text-blue-600">Into the Future Together</span>
              </>
            )}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {language === 'tr' ? (
              <>
                <strong className="text-slate-900 font-semibold">Sport Tech Türkiye (sporttech.com.tr)</strong>, ülkemizin spor bilimleri, yazılım mühendisliği, donanım tasarımı ve veri analitiği potansiyelini bir araya getirerek bölgesel ve küresel ölçekte bir spor inovasyon merkezi oluşturmak amacıyla kurulmuştur.
              </>
            ) : language === 'ar' ? (
              <>
                تم إنشاء <strong className="text-slate-900 font-semibold">Sport Tech Türkiye (sporttech.com.tr)</strong> لدمج العلوم الرياضية، وهندسة البرمجيات، وتصميم الأجهزة، وقدرات تحليل البيانات لبناء مركز ابتكار رياضي إقليمي وعالمي.
              </>
            ) : (
              <>
                <strong className="text-slate-900 font-semibold">Sport Tech Türkiye (sporttech.com.tr)</strong> was established to consolidate Turkey's sports science, software engineering, hardware design, and data analytics capabilities to build a regional and global sports innovation hub.
              </>
            )}
          </p>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          
          {/* Misyon */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 relative overflow-hidden group hover:border-slate-300 transition-all shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 mb-5">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span>{language === 'tr' ? 'Misyonumuz' : language === 'ar' ? 'رسالتنا' : 'Our Mission'}</span>
              <span className="text-xs px-2 py-0.5 rounded bg-orange-50 text-orange-700 font-mono font-bold">
                {language === 'tr' ? 'ODAK' : language === 'ar' ? 'تركيز' : 'FOCUS'}
              </span>
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              {language === 'tr' 
                ? 'Sporcu sağlığını koruyan, antrenman verimliliğini maksimize eden ve taraftar deneyimini dönüştüren yerli spor teknolojisi girişimlerini desteklemek; spor kulüpleri ile teknoloji geliştiricileri arasında köprü kurarak sürdürülebilir bir inovasyon ekosistemi yaratmak.'
                : language === 'ar'
                ? 'دعم الشركات الناشئة المحلية في مجال التكنولوجيا الرياضية التي تحمي صحة الرياضيين، وترفع كفاءة التدريب إلى أقصى حد، وتحول تجربة الجماهير؛ وتأسيس جسور بين الأندية الرياضية ومطوري التكنولوجيا لبناء بيئة ابتكار مستدامة.'
                : 'Supporting local sports technology startups that protect athlete health, maximize training efficiency, and transform the fan experience; establishing bridges between sports clubs and tech developers to build a sustainable innovation ecosystem.'}
            </p>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />
                <span>
                  {language === 'tr' 
                    ? 'Yerli donanım ve yazılım girişimlerinin ticarileşmesini hızlandırmak' 
                    : language === 'ar'
                    ? 'تسريع تسويق الأجهزة والبرمجيات للشركات الناشئة المحلية'
                    : 'Accelerating the commercialization of local hardware and software startups'}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />
                <span>
                  {language === 'tr' 
                    ? 'Kulüplerde veri odaklı karar kültürünü ve sakatlık önleme protokollerini yaygınlaştırmak' 
                    : language === 'ar'
                    ? 'تعزيز ثقافة اتخاذ القرارات القائمة على البيانات وبروتوكولات الوقاية من الإصابات في الأندية'
                    : 'Promoting data-driven decision-making culture and injury prevention protocols in clubs'}
                </span>
              </li>
            </ul>
          </div>

          {/* Vizyon */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 relative overflow-hidden group hover:border-slate-300 transition-all shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-5">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span>{language === 'tr' ? 'Vizyonumuz' : language === 'ar' ? 'رؤيتنا' : 'Our Vision'}</span>
              <span className="text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono font-bold">
                {language === 'tr' ? '2030 HEDEFİ' : language === 'ar' ? 'هدف 2030' : '2030 TARGET'}
              </span>
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              {language === 'tr' 
                ? "Türkiye'yi Doğu Avrupa, Akdeniz ve Orta Doğu havzasının en büyük Spor Teknolojileri (SportTech) Ar-Ge ve ihracat üssü haline getirmek; milli sporcularımızın uluslararası başarılarını bilim ve teknolojiyle taçlandırmak."
                : language === 'ar'
                ? "تحويل تركيا إلى أكبر مركز للبحث والتطوير وتصدير تكنولوجيا الرياضة في شرق أوروبا، وحوض البحر الأبيض المتوسط، والشرق الأوسط؛ وتتويج النجاح العالمي للرياضيين الوطنيين بالعلم والتكنولوجيا."
                : "Transforming Turkey into the largest Sports Tech (SportTech) R&D and export hub of Eastern Europe, the Mediterranean, and the Middle East; crowning our national athletes' global success with science and technology."}
            </p>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  {language === 'tr' 
                    ? 'Küresel lige 10+ yerli spor teknolojisi unicorn/scale-up girişimi kazandırmak' 
                    : language === 'ar'
                    ? 'جلب أكثر من 10 شركات ناشئة محلية إلى مستويات اليونيكورن والنمو العالمي'
                    : 'Bringing 10+ local sports tech startups to the global unicorn/scale-up leagues'}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  {language === 'tr' 
                    ? 'Tüm spor federasyonlarında dijital performans standartları oluşturmak' 
                    : language === 'ar'
                    ? 'تأسيس معايير الأداء الرقمي عبر جميع الاتحادات الرياضية'
                    : 'Establishing digital performance standards across all sports federations'}
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* 4 Pillars Grid */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              {language === 'tr' ? '4 Temel Teknolojik Odak Direğimiz' : language === 'ar' ? 'الركائز التكنولوجية الأربعة الأساسية' : 'Our 4 Core Technological Pillars'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              {language === 'tr' ? 'SportTech Türkiye ekosisteminin üzerinde yükseldiği ana branşlar' : language === 'ar' ? 'القطاعات الرئيسية التي تعمل من خلالها منظومة تكنولوجيا الرياضة في تركيا' : 'Primary verticals on which the SportTech Turkey ecosystem operates'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white border border-slate-200 hover:border-slate-300 rounded-2xl p-5 transition-all group shadow-xs hover:shadow-md"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {p.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stakeholder Value Chain */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 mb-12 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              {language === 'tr' ? 'Değer Ağı' : language === 'ar' ? 'شبكة القيمة' : 'Value Chain'}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              {language === 'tr' ? 'Ekosistemde Kim, Ne Kazanıyor?' : language === 'ar' ? 'من يربح ماذا في المنظومة؟' : 'Who Wins What in the Ecosystem?'}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stakeholders.map((s, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                  <h4 className="text-sm font-bold text-slate-900">{s.title}</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Globe2 className="w-5 h-5 text-blue-600" />
              <span className="text-xs text-slate-600">
                {language === 'tr' 
                  ? 'Siz de bir spor teknolojisi girişimi, kulüp veya yatırımcı mısınız?' 
                  : language === 'ar'
                  ? 'هل أنت أيضاً شركة ناشئة في تكنولوجيا الرياضة، أو نادٍ رياضي، أو مستثمر؟'
                  : 'Are you also a sports tech startup, a sports club, or an investor?'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenStartupSubmit}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <span>{language === 'tr' ? 'Ekosisteme Katıl' : language === 'ar' ? 'انضم إلى المنظومة' : 'Join the Ecosystem'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onExploreStartups}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs border border-slate-200 transition-colors"
              >
                {language === 'tr' ? 'Girişimleri Gör' : language === 'ar' ? 'عرض الشركات الناشئة' : 'View Startups'}
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
