import { Startup } from '../types';

export const STARTUPS: Startup[] = [
  {
    id: 'mera',
    name: 'Mera',
    tagLine: 'Sporcuların Metabolik Hazır Oluş Düzeyini Değerlendiren Yapay Zeka Platformu',
    description: 'İstanbul merkezli sport tech girişimi Mera, VO₂max testleri dahil metabolik performans verilerini sinir ağı modelleri ve sohbet tabanlı Mera AI arayüzüyle analiz ederek her fitness kulübünde erişilebilir kılıyor. İTÜ Seed ve Innogate programları tarafından destekleniyor.',
    fullStory: 'İstanbul merkezli sport tech girişimi Mera, sporcuların metabolik performans testlerini analiz eden platformunun public demo sürümünü kullanıma açtı. Girişim, İTÜ Seed ve Innogate programları tarafından destekleniyor.\n\nPlatform, VO₂max testleri de dahil olmak üzere farklı metabolik test sistemlerinden gelen verileri tek bir sporcu profili altında birleştiriyor. Metabolik eşiklerin belirlenmesinde veri bilimi yöntemleri ve şirkete özel geliştirilmiş sinir ağı modelleri kullanılıyor.\n\nPlatformun bir parçası olan Mera AI ise sporcu verileri üzerinde çalışan sohbet tabanlı bir arayüz sunuyor. Bu arayüz üzerinden kullanıcılar farklı testleri karşılaştırabiliyor, sonuçlara ilişkin sorular sorabiliyor ve sporcunun performans göstergelerinin zaman içindeki değişimini takip edebiliyor.\n\nMera şu anda performans merkezleri, spor kulüpleri ve üniversite laboratuvarlarıyla birlikte test ediliyor. Şirket, önümüzdeki dönemde özellikle elit spor takımları ile üniversitelerin spor ve egzersiz fizyolojisi laboratuvarlarıyla yeni pilot çalışmalar başlatmayı hedefliyor.\n\nGirişimin misyonu, bugün ağırlıklı olarak profesyonel sporculara ve elit takımlara sunulan metabolik test seviyesini her fitness kulübünde erişilebilir hale getirmek.',
    logo: '/mera-logo.svg',
    coverImage: '/mera-cover.svg',
    category: 'ai_analytics',
    categoryName: 'Yapay Zeka & Performans Analitiği',
    stage: 'Seed',
    foundedYear: 2023,
    location: 'İstanbul',
    website: 'https://mera.fit',
    teamSize: '8 Kişi',
    fundingRaised: 'İTÜ Seed & Innogate Hızlandırma',
    techStack: ['Python', 'PyTorch / Neural Networks', 'FastAPI', 'React', 'TypeScript', 'Tailwind CSS', 'VO₂max Sensors', 'Mera AI LLM'],
    keyMetrics: [
      { label: 'Metabolik Test Entegrasyonu', value: 'VO₂max & Laktat' },
      { label: 'Analiz Mimarisi', value: 'Sinir Ağları & AI' },
      { label: 'Hızlandırıcı Programlar', value: 'İTÜ Seed & Innogate' },
      { label: 'İnteraktif Public Demo', value: 'demo.mera.fit/launch' }
    ],
    founders: [
      { name: 'Dmitry Larichev & Mera Ekibi', role: 'Kurucu Ekip & Spor Bilimi' }
    ],
    contactEmail: 'hello@mera.fit',
    isFeatured: true,
    featuredHighlight: 'VO₂max ve metabolik testleri sinir ağlarıyla analiz eden sohbet tabanlı Mera AI platformu',
    tags: ['Metabolik Performans', 'Mera AI', 'VO₂max Testi', 'Sinir Ağları', 'İTÜ Seed', 'Innogate', 'Egzersiz Fizyolojisi']
  },
  {
    id: 'sportsfly',
    name: 'SportsFly',
    tagLine: 'Spor İşletmeleri İçin Kapsamlı Bulut Tabanlı Yönetim Yazılımı',
    description: 'Spor salonları, spor okulları, fitness/pilates/yoga stüdyoları ve tenis akademilerinin üye yönetimi, yoklama, eğitmen/personel yönetimi, sadakat programları ve raporlama ihtiyaçlarını tek bir panelden karşılıyor. Amaç: işletmelerin dijital dönüşümünü kolaylaştırıp üye deneyimini iyileştirmek.',
    fullStory: 'SportsFly, spor işletmeleri için geliştirilmiş kapsamlı bir yönetim yazılımıdır. Spor salonları, spor okulları, fitness/pilates/yoga stüdyoları, tenis akademileri ve benzeri tesislerin üye yönetimi, yoklama, eğitmen/personel yönetimi, sadakat programları ve raporlama ihtiyaçlarını tek bir panelden karşılıyor. Amaç: işletmelerin dijital dönüşümünü kolaylaştırıp üye deneyimini iyileştirmek.',
    logo: '/sportsfly-logo.svg',
    coverImage: '/sportsfly-tablet-app.svg',
    category: 'management_platform',
    categoryName: 'Yönetim & Dijital Platform',
    stage: 'Bootstrapped',
    foundedYear: 2022,
    location: 'İstanbul',
    website: 'https://sporsepeti.com.tr/sportsfly',
    teamSize: '15 Kişi',
    fundingRaised: 'Sporsepeti Ekosistemi',
    techStack: ['TypeScript', 'React', 'NestJS', 'PostgreSQL', 'Redis', 'Docker', 'Ödeme Entegrasyonları'],
    keyMetrics: [
      { label: 'Aktif Spor İşletmesi', value: '220+' },
      { label: 'Yönetilen Aktif Üye', value: '85,000+' },
      { label: 'Operasyonel Zaman Tasarrufu', value: '%40' },
      { label: 'Yoklama & Geçiş Hızı', value: '< 1 sn' }
    ],
    founders: [
      { name: 'SportsFly Ürün & Yazılım Ekibi', role: 'Sporsepeti Spor Teknolojileri' }
    ],
    contactEmail: 'sportsfly@sporsepeti.com.tr',
    isFeatured: true,
    featuredHighlight: 'Spor salonları, akademiler ve stüdyolar için üye, yoklama, personel ve raporlama çözümü',
    tags: ['Spor Yönetim Yazılımı', 'Üye Takibi', 'Yoklama Sistemi', 'Stüdyo Yönetimi', 'Akademi Yönetimi', 'SaaS']
  },
  {
    id: 'sporpuan',
    name: 'Sporpuan',
    tagLine: "Türkiye'nin Bağımsız Spor Tesisleri ve Etkinlikleri Puanlama Platformu",
    description: "Türkiye'nin bağımsız spor tesisleri ve etkinlikleri puanlama platformu. Spor salonlarını, spor okullarını ve etkinlikleri hijyen, ekipman ve lokasyon gibi objektif kriterlere göre değerlendirip tarafsız kullanıcı yorumlarıyla sporseverlere rehberlik ediyor. Hedef: tesis seçiminde şeffaf ve güvenilir bir referans kaynağı olmak.",
    fullStory: "Sporpuan, Türkiye'nin bağımsız spor tesisleri ve etkinlikleri puanlama platformudur. Spor salonlarını, spor okullarını ve etkinlikleri hijyen, ekipman ve lokasyon gibi objektif kriterlere göre değerlendirip tarafsız kullanıcı yorumlarıyla sporseverlere rehberlik ediyor. Hedef: tesis seçiminde şeffaf ve güvenilir bir referans kaynağı olmak.",
    logo: '/sporpuan-logo.svg',
    coverImage: '/sporpuan-map-cover.svg',
    category: 'management_platform',
    categoryName: 'Yönetim & Dijital Platform',
    stage: 'Bootstrapped',
    foundedYear: 2023,
    location: 'İstanbul / 81 İl',
    website: 'https://sporpuan.com',
    teamSize: '8 Kişi',
    fundingRaised: 'Bootstrapped',
    techStack: ['Next.js', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Algolia Search', 'Cloudflare'],
    keyMetrics: [
      { label: 'Puanlanan Tesis', value: '1,400+' },
      { label: 'Doğrulanmış Kullanıcı Yorumu', value: '18,500+' },
      { label: 'Kapsanan Şehir', value: '81 İl' },
      { label: 'Objektif Değerlendirme Kriteri', value: '12+ Parametre' }
    ],
    founders: [
      { name: 'Sporpuan Topluluk & Teknoloji Ekibi', role: 'Kurucu Ekip' }
    ],
    contactEmail: 'info@sporpuan.com',
    isFeatured: true,
    featuredHighlight: 'Tesis seçiminde şeffaf, bağımsız ve güvenilir referans kaynağı',
    tags: ['Tesis Puanlama', 'Kullanıcı Yorumları', 'Hijyen & Ekipman', 'Spor Rehberi', 'Şeffaf Referans']
  }
];
