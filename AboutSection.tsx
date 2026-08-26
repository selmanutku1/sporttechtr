import React from 'react';
import { 
  ShieldCheck, 
  Target, 
  Eye, 
  Cpu, 
  Activity, 
  Zap, 
  Building2, 
  Award, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Globe2
} from 'lucide-react';
import { ECOSYSTEM_STATS } from '../data/ecosystem';

interface AboutSectionProps {
  onExploreStartups: () => void;
  onOpenStartupSubmit: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onExploreStartups,
  onOpenStartupSubmit
}) => {
  const pillars = [
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
      desc: 'İşaretçisiz (markerless) 3D hareket yakalama, eklem açısı taramaları, kuvvet platformları ve kriyoterapi sistemleri ile sakatlıkları önleyip performansı zirveye taşıyoruz.'
    },
    {
      icon: Building2,
      title: 'Akıllı Stadyum & Taraftar',
      desc: 'Yüksek hızlı 5G bağlantısı, anlık AR pozisyon tekrarları, koltuktan mobil sipariş ve dijital sadakat sistemleriyle modern stadyumları yaşayan birer teknoloji üssüne çeviriyoruz.'
    }
  ];

  const stakeholders = [
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

  return (
    <section id="about" className="py-20 bg-slate-50/70 border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Eyebrow & Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4 shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />
            <span>Hakkımızda & Ekosistem</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight mb-4">
            Türkiye'nin Spor Teknolojisi Vizyonunu <br />
            <span className="text-blue-600">
              Birlikte Geleceğe Taşıyoruz
            </span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            <strong className="text-slate-900 font-semibold">Sport Tech Türkiye (sporttech.com.tr)</strong>, ülkemizin spor bilimleri, yazılım mühendisliği, donanım tasarımı ve veri analitiği potansiyelini bir araya getirerek bölgesel ve küresel ölçekte bir spor inovasyon merkezi oluşturmak amacıyla kurulmuştur.
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
              <span>Misyonumuz</span>
              <span className="text-xs px-2 py-0.5 rounded bg-orange-50 text-orange-700 font-mono font-bold">ODAK</span>
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Sporcu sağlığını koruyan, antrenman verimliliğini maksimize eden ve taraftar deneyimini dönüştüren yerli spor teknolojisi girişimlerini desteklemek; spor kulüpleri ile teknoloji geliştiricileri arasında köprü kurarak sürdürülebilir bir inovasyon ekosistemi yaratmak.
            </p>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />
                <span>Yerli donanım ve yazılım girişimlerinin ticarileşmesini hızlandırmak</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0" />
                <span>Kulüplerde veri odaklı karar kültürünü ve sakatlık önleme protokollerini yaygınlaştırmak</span>
              </li>
            </ul>
          </div>

          {/* Vizyon */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 relative overflow-hidden group hover:border-slate-300 transition-all shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-5">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span>Vizyonumuz</span>
              <span className="text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono font-bold">2030 HEDEFİ</span>
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Türkiye'yi Doğu Avrupa, Akdeniz ve Orta Doğu havzasının en büyük Spor Teknolojileri (SportTech) Ar-Ge ve ihracat üssü haline getirmek; milli sporcularımızın uluslararası başarılarını bilim ve teknolojiyle taçlandırmak.
            </p>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Küresel lige 10+ yerli spor teknolojisi unicorn/scale-up girişimi kazandırmak</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Tüm spor federasyonlarında dijital performans standartları oluşturmak</span>
              </li>
            </ul>
          </div>

        </div>

        {/* 4 Pillars Grid */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">4 Temel Teknolojik Odak Direğimiz</h3>
            <p className="text-xs sm:text-sm text-slate-500">SportTech Türkiye ekosisteminin üzerinde yükseldiği ana branşlar</p>
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
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Değer Ağı</span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Ekosistemde Kim, Ne Kazanıyor?
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
                Siz de bir spor teknolojisi girişimi, kulüp veya yatırımcı mısınız?
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenStartupSubmit}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <span>Ekosisteme Katıl</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onExploreStartups}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs border border-slate-200 transition-colors"
              >
                Girişimleri Gör
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
