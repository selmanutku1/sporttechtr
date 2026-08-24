import { Startup, StartupCategory, FundingStage } from '../types';
import { STARTUPS as INITIAL_STARTUPS } from '../data/startups';

export interface PendingStartupSubmission {
  id: string;
  submittedAt: string;
  name: string;
  tagLine: string;
  category: StartupCategory;
  categoryName: string;
  stage: FundingStage;
  website: string;
  location: string;
  founders: string;
  teamSize: string;
  contactEmail: string;
  description: string;
  techStack: string;
  fundingRaised: string;
  status: 'pending' | 'approved' | 'rejected';
}

const STORAGE_KEY_APPROVED = 'stt_approved_startups';
const STORAGE_KEY_PENDING = 'stt_pending_submissions';

// Category map helper
export const CATEGORY_NAMES_MAP: Record<StartupCategory, string> = {
  all: 'Tüm Alanlar',
  management_platform: 'Yönetim & Dijital Platform',
  ai_analytics: 'Yapay Zeka & Analitik',
  wearables_iot: 'Giyilebilir Cihazlar & IoT',
  smart_venues: 'Akıllı Tesis & Stadyum',
  performance_recovery: 'Performans & Biyomekanik',
  fan_media: 'Taraftar & Medya Teknolojileri',
  esports_gaming: 'E-Spor & Gaming',
  health_nutrition: 'Sağlık & Biyoteknoloji'
};

// Initial pending mock submissions for admin panel demonstration
const DEFAULT_PENDING_SUBMISSIONS: PendingStartupSubmission[] = [
  {
    id: 'sub-101',
    submittedAt: '24 Ağustos 2026, 14:30',
    name: 'KineScan 3D',
    tagLine: 'Kamera Tabanlı Markerless Biyomekanik Sakatlık Risk Analiz Yazılımı',
    category: 'performance_recovery',
    categoryName: 'Performans & Biyomekanik',
    stage: 'Pre-Seed',
    website: 'https://kinescan3d.tech',
    location: 'Ankara (ODTÜ Teknokent)',
    founders: 'Dr. Burak Demir, Ozan Güven',
    teamSize: '4 Kişi',
    contactEmail: 'burak@kinescan3d.tech',
    description: 'Sporcuların koşu ve sıçrama mekaniğini telefon kamerasından gerçek zamanlı 3D iskelet çıkarımıyla analiz edip ön çapraz bağ (ACL) sakatlık riskini raporlayan AI yazılımı.',
    techStack: 'Python, OpenCV, MediaPipe, WebAssembly, React Native',
    fundingRaised: 'TÜBİTAK 1512 BİGG Hibe',
    status: 'pending'
  },
  {
    id: 'sub-102',
    submittedAt: '24 Ağustos 2026, 11:15',
    name: 'ArenaPulse IoT',
    tagLine: 'Stadyum ve Tesisler İçin Akıllı Turnike & IoT Enerji Optimizasyonu',
    category: 'smart_venues',
    categoryName: 'Akıllı Tesis & Stadyum',
    stage: 'Seed',
    website: 'https://arenapulse.io',
    location: 'İzmir (Ege Teknopark)',
    founders: 'Cem Yıldırım, Selin Aksoy',
    teamSize: '6 Kişi',
    contactEmail: 'contact@arenapulse.io',
    description: 'Spor salonları ve stadyum girişlerinde NFC/QR ile anlık geçiş takibi ve seyirci yoğunluğuna göre dinamik LED/klima otomasyonu sağlayan donanım ve bulut platformu.',
    techStack: 'Node.js, MQTT, ESP32, React, Go, InfluxDB',
    fundingRaised: '$150,000 Melek Yatırım',
    status: 'pending'
  },
  {
    id: 'sub-103',
    submittedAt: '23 Ağustos 2026, 18:45',
    name: 'TactixVR',
    tagLine: 'Futbol & Basketbol İçin VR Tabanlı Bilişsel Karar Alma Antrenman Simülasyonu',
    category: 'performance_recovery',
    categoryName: 'Performans & Biyomekanik',
    stage: 'Pre-Seed',
    website: 'https://tactixvr.com',
    location: 'İstanbul (İTÜ Çekirdek)',
    founders: 'Mert Aktaş, Canan Karahan',
    teamSize: '5 Kişi',
    contactEmail: 'hello@tactixvr.com',
    description: 'Profesyonel sporcuların maç esnasındaki görsel algı ve hızlı reaksiyon hızını VR gözlükler ve göz takip sensörleriyle ölçen ve geliştiren simülasyon platformu.',
    techStack: 'Unity 3D, C#, Python, Meta Quest SDK, WebSockets',
    fundingRaised: '350.000 TL Hibe',
    status: 'pending'
  }
];

export const getApprovedStartups = (): Startup[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_APPROVED);
    if (saved) {
      const parsed = JSON.parse(saved);
      const existingIds = new Set(INITIAL_STARTUPS.map(s => s.id));
      const customOnes = parsed.filter((s: Startup) => !existingIds.has(s.id));
      return [...INITIAL_STARTUPS, ...customOnes];
    }
  } catch (e) {
    console.error('Error loading approved startups:', e);
  }
  return INITIAL_STARTUPS;
};

export const saveApprovedStartups = (startups: Startup[]) => {
  try {
    localStorage.setItem(STORAGE_KEY_APPROVED, JSON.stringify(startups));
  } catch (e) {
    console.error('Error saving approved startups:', e);
  }
};

export const getPendingSubmissions = (): PendingStartupSubmission[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_PENDING);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error loading pending submissions:', e);
  }
  try {
    localStorage.setItem(STORAGE_KEY_PENDING, JSON.stringify(DEFAULT_PENDING_SUBMISSIONS));
  } catch (e) {}
  return DEFAULT_PENDING_SUBMISSIONS;
};

export const savePendingSubmissions = (submissions: PendingStartupSubmission[]) => {
  try {
    localStorage.setItem(STORAGE_KEY_PENDING, JSON.stringify(submissions));
  } catch (e) {
    console.error('Error saving pending submissions:', e);
  }
};

export const addPendingSubmission = (submissionData: any): PendingStartupSubmission => {
  const pending = getPendingSubmissions();
  
  const newSub: PendingStartupSubmission = {
    id: `sub-${Date.now()}`,
    submittedAt: new Date().toLocaleDateString('tr-TR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    name: submissionData.name || 'İsimsiz Girişim',
    tagLine: submissionData.tagLine || '',
    category: submissionData.category || 'ai_analytics',
    categoryName: CATEGORY_NAMES_MAP[submissionData.category as StartupCategory] || 'Spor Teknolojisi',
    stage: submissionData.stage || 'Seed',
    website: submissionData.website || 'https://sporttech.com.tr',
    location: submissionData.location || 'Türkiye',
    founders: submissionData.founders || 'Kurucu Ekip',
    teamSize: submissionData.teamSize || '1-5 Kişi',
    contactEmail: submissionData.contactEmail || '',
    description: submissionData.description || '',
    techStack: submissionData.techStack || 'Python, React, AI',
    fundingRaised: submissionData.fundingRaised || 'Bootstrapped',
    status: 'pending'
  };

  const updated = [newSub, ...pending];
  savePendingSubmissions(updated);
  return newSub;
};

export const approveSubmission = (id: string): { approvedStartup: Startup; updatedPending: PendingStartupSubmission[] } => {
  const pending = getPendingSubmissions();
  const target = pending.find(p => p.id === id);
  if (!target) throw new Error('Submission not found');

  const newStartup: Startup = {
    id: target.name.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Math.floor(Math.random() * 1000),
    name: target.name,
    tagLine: target.tagLine,
    description: target.description,
    fullStory: `${target.name}, ${target.tagLine}. \n\n${target.description}\n\nSport Tech Türkiye onaylı girişim profilidir.`,
    logo: '/logo.svg',
    coverImage: '/sportsfly-tablet-app.svg',
    category: target.category,
    categoryName: target.categoryName,
    stage: target.stage,
    foundedYear: 2026,
    location: target.location,
    website: target.website,
    teamSize: target.teamSize,
    fundingRaised: target.fundingRaised,
    techStack: target.techStack ? target.techStack.split(',').map(s => s.trim()).filter(Boolean) : ['SportTech AI', 'Cloud'],
    keyMetrics: [
      { label: 'Yatırım Durumu', value: target.stage },
      { label: 'Ekip Büyüklüğü', value: target.teamSize },
      { label: 'Lokasyon', value: target.location },
      { label: 'Onay Durumu', value: 'Doğrulandı' }
    ],
    founders: [
      { name: target.founders, role: 'Kurucu Ekip' }
    ],
    contactEmail: target.contactEmail,
    isFeatured: false,
    tags: [target.categoryName, target.stage, target.location]
  };

  const allApproved = getApprovedStartups();
  const updatedApproved = [newStartup, ...allApproved];
  saveApprovedStartups(updatedApproved);

  const updatedPending = pending.filter(p => p.id !== id);
  savePendingSubmissions(updatedPending);

  return { approvedStartup: newStartup, updatedPending };
};

export const rejectSubmission = (id: string): PendingStartupSubmission[] => {
  const pending = getPendingSubmissions();
  const updatedPending = pending.filter(p => p.id !== id);
  savePendingSubmissions(updatedPending);
  return updatedPending;
};

export const updateApprovedStartup = (updatedStartup: Startup): Startup[] => {
  const current = getApprovedStartups();
  const updated = current.map(s => s.id === updatedStartup.id ? updatedStartup : s);
  saveApprovedStartups(updated);
  return updated;
};

export const createDirectStartup = (startupData: Partial<Startup>): Startup => {
  const current = getApprovedStartups();
  const category = (startupData.category || 'ai_analytics') as StartupCategory;
  
  const newStartup: Startup = {
    id: (startupData.name || 'startup').toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Math.floor(Math.random() * 1000),
    name: startupData.name || 'Yeni Girişim',
    tagLine: startupData.tagLine || '',
    description: startupData.description || '',
    fullStory: startupData.fullStory || `${startupData.name}, ${startupData.tagLine}.\n\n${startupData.description}`,
    logo: startupData.logo || '/logo.svg',
    coverImage: startupData.coverImage || '/sportsfly-tablet-app.svg',
    category: category,
    categoryName: CATEGORY_NAMES_MAP[category] || 'Spor Teknolojisi',
    stage: startupData.stage || 'Seed',
    foundedYear: startupData.foundedYear || 2026,
    location: startupData.location || 'İstanbul, Türkiye',
    website: startupData.website || 'https://sporttech.com.tr',
    teamSize: startupData.teamSize || '1-5 Kişi',
    fundingRaised: startupData.fundingRaised || 'Bootstrapped',
    techStack: Array.isArray(startupData.techStack) ? startupData.techStack : ['AI', 'React', 'Cloud'],
    keyMetrics: startupData.keyMetrics || [
      { label: 'Yatırım Durumu', value: startupData.stage || 'Seed' },
      { label: 'Lokasyon', value: startupData.location || 'Türkiye' },
      { label: 'Doğrulama', value: 'Admin Onaylı' }
    ],
    founders: startupData.founders || [{ name: 'Kurucu Ekip', role: 'Kurucu' }],
    contactEmail: startupData.contactEmail || '',
    isFeatured: !!startupData.isFeatured,
    tags: [CATEGORY_NAMES_MAP[category] || 'Spor Teknolojisi', startupData.stage || 'Seed', startupData.location || 'Türkiye']
  };

  const updated = [newStartup, ...current];
  saveApprovedStartups(updated);
  return newStartup;
};

export const deleteApprovedStartup = (id: string): Startup[] => {
  const current = getApprovedStartups();
  const updated = current.filter(s => s.id !== id);
  saveApprovedStartups(updated);
  return updated;
};
