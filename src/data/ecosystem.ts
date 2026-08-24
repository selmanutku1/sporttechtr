import { EcosystemEvent, TechTrend } from '../types';

export const ECOSYSTEM_STATS = [
  { label: 'Kayıtlı SportTech Girişimi', value: '85+', change: '+38% bu yıl', icon: 'Rocket' },
  { label: 'Toplam Yatırım Hacmi', value: '$34.5M', change: '+85% büyüme', icon: 'TrendingUp' },
  { label: 'Aktif Partner Kulüp & Federasyon', value: '42+', change: 'Tüm branşlar', icon: 'ShieldCheck' },
  { label: 'Tescilli Patent & Faydalı Model', value: '64', change: '+18 yeni patent', icon: 'Award' },
  { label: 'Spor Teknolojisi Ar-Ge Merkezi', value: '14 Lab', change: '8 Şehirde', icon: 'Cpu' }
];

export const CATEGORIES_DATA = [
  {
    id: 'management_platform',
    name: 'Yönetim & Dijital Platform',
    count: 28,
    description: 'Spor tesisi ve kulüp yönetim yazılımları, üye/yoklama takibi, sporcu pazar yerleri ve bağımsız değerlendirme platformları.',
    icon: 'LayoutDashboard'
  },
  {
    id: 'ai_analytics',
    name: 'Yapay Zeka & Analitik',
    count: 24,
    description: 'Bilgisayarlı görü, maç verisi analitiği, sakatlık tahmin algoritmaları ve otomatik video özetleri.',
    icon: 'Brain'
  },
  {
    id: 'wearables_iot',
    name: 'Giyilebilir Cihazlar & IoT',
    count: 19,
    description: 'GPS takip yelekleri, akıllı toplar, kalp ritmi ve kas yorgunluğu ölçen mikro sensörler.',
    icon: 'Activity'
  },
  {
    id: 'smart_venues',
    name: 'Akıllı Tesis & Stadyum',
    count: 15,
    description: 'Stadyum IoT altyapısı, turnike erişim teknolojileri, AR taraftar deneyimi ve akıllı saha zeminleri.',
    icon: 'Building2'
  },
  {
    id: 'performance_recovery',
    name: 'Performans & Biyomekanik',
    count: 14,
    description: 'Markerless hareket yakalama, kuvvet platformları, kriyoterapi ve rehabilitasyon sistemleri.',
    icon: 'Zap'
  },
  {
    id: 'fan_media',
    name: 'Taraftar & Medya Teknolojileri',
    count: 11,
    description: 'Çoklu kamera yayınları, dikey video otomasyonu, dijital biletleme ve interaktif etkileşim.',
    icon: 'Radio'
  },
  {
    id: 'esports_gaming',
    name: 'E-Spor & Gaming',
    count: 8,
    description: 'E-spor reaksiyon koçluğu, nörolojik odaklanma analizi ve sanal antrenman simülatörleri.',
    icon: 'Gamepad2'
  },
  {
    id: 'health_nutrition',
    name: 'Sağlık & Biyoteknoloji',
    count: 6,
    description: 'Cilt üstü ter biyosensörleri, genetik atletik yatkınlık taramaları ve kişiye özel beslenme yazılımları.',
    icon: 'HeartPulse'
  }
];

export const UPCOMING_EVENTS: EcosystemEvent[] = [
  {
    id: 'sporttech-turkiye-summit-2026',
    title: 'SportTech Türkiye İnovasyon Zirvesi 2026',
    type: 'Summit',
    date: '18-19 Ekim 2026',
    location: 'İstanbul Kongre Merkezi & Hibrit',
    isOnline: true,
    description: 'Türkiye\'nin ve bölgenin en büyük spor teknolojileri zirvesi. 50+ konuşmacı, 40+ startup standı, yatırımcı panelleri ve canlı teknoloji demoları.',
    organizer: 'SportTech Türkiye & TFF & SporSepeti',
    attendees: '1,500+ Katılımcı',
    registrationOpen: true
  },
  {
    id: 'sport-hackathon-2026',
    title: 'Süper Lig AI & Big Data Hackathon',
    type: 'Hackathon',
    date: '12-14 Kasım 2026',
    location: 'Bilişim Vadisi, Gebze / Kocaeli',
    isOnline: false,
    description: '48 saatlik maratonda canlı maç telemetrisi ve optik kamera verileriyle en iyi sakatlık tahmini ve taktik modeli geliştiren ekiplere 500.000 TL ödül.',
    organizer: 'SportTech Türkiye & Kulüpler Birliği',
    attendees: '300+ Yazılımcı & Veri Bilimci',
    registrationOpen: true
  },
  {
    id: 'sporttech-demo-day-q4',
    title: 'SportTech Girişimleri Demo Day (Q4 2026)',
    type: 'Demo Day',
    date: '05 Aralık 2026',
    location: 'İTÜ ARI Teknokent / Canlı Yayın',
    isOnline: true,
    description: 'Tohum ve Seri A aşamasındaki seçilmiş 10 spor teknolojisi girişimi, 40+ yerli ve uluslararası spor yatırımcısının karşısına çıkıyor.',
    organizer: 'SportTech Girişim Sermayesi Ağı',
    attendees: '80+ Yatırımcı Fonu',
    registrationOpen: true
  }
];

export const TECH_TRENDS: TechTrend[] = [
  {
    id: 'computer-vision-tactics',
    title: 'Saha Kenarı Optik Bilgisayarlı Görü',
    category: 'Yapay Zeka',
    growth: '+120% Talep Artışı',
    description: 'Ek sensör takmadan sadece 4K kameralarla saniyede 60 FPS hızında oyuncu ve top kinematiği çıkarımı.',
    impact: 'Kritik',
    tags: ['Computer Vision', 'PyTorch', 'Süper Lig']
  },
  {
    id: 'microfluidic-lactate',
    title: 'Mikroakışkan Ter Biyosensörleri',
    category: 'Giyilebilir & Sağlık',
    growth: '+95% Ar-Ge Yatırımı',
    description: 'Kansız, deriden anlık laktat, glikoz ve elektrolit ölçümüyle antrenman yükü optimizasyonu.',
    impact: 'Yüksek',
    tags: ['Biyosensör', 'Laktat', 'Olimpiyat']
  },
  {
    id: 'markerless-biomechanics',
    title: 'İşaretçisiz (Markerless) 3D Biyomekanik',
    category: 'Performans',
    growth: '+80% Klinik Kullanım',
    description: 'Özel işaretçi kıyafeti giymeden akıllı telefonla 33 eklem noktasının açısal hız ve kuvvet hesabı.',
    impact: 'Yüksek',
    tags: ['Biyomekanik', 'ACL Risk', 'Rehabilitasyon']
  },
  {
    id: 'ar-instant-replay',
    title: 'Stadyum İçi 5G & AR Anlık Pozisyon Tekrarı',
    category: 'Fan Engagement',
    growth: '+140% Taraftar Etkileşimi',
    description: 'Taraftarın kendi telefonundan istediği kamera açısını seçip anında pozisyonu 3D inceleyebilmesi.',
    impact: 'Yükselen',
    tags: ['5G', 'AR', 'Smart Stadium']
  }
];
