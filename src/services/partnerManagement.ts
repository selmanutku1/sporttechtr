import { Supporter, SupporterType } from '../types';
import { SUPPORTERS as INITIAL_SUPPORTERS } from '../data/supporters';

export interface PendingPartnerSubmission {
  id: string;
  submittedAt: string;
  orgName: string;
  orgType: SupporterType;
  orgTypeName: string;
  contactName: string;
  contactRole: string;
  email: string;
  phone: string;
  message: string;
  website: string;
  location: string;
  logo?: string;
  status: 'pending' | 'approved' | 'rejected';
}

const STORAGE_KEY_SUPPORTERS = 'stt_approved_supporters';
const STORAGE_KEY_PENDING_PARTNERS = 'stt_pending_partners';

export const PARTNER_TYPE_NAMES: Record<SupporterType, string> = {
  all: 'Tüm Kurumlar',
  corporate: 'Ana Teknoloji & Kurumsal Destekçi',
  club: 'Spor Kulübü / Akademi',
  federation: 'Federasyon / Kamu Kurumu',
  vc_fund: 'Yatırım Fonu / VC / Melek Ağ',
  technopark: 'Teknopark / Kuluçka Merkezi',
  university: 'Üniversite / Spor Bilimleri Fakültesi'
};

const DEFAULT_PENDING_PARTNERS: PendingPartnerSubmission[] = [
  {
    id: 'part-sub-1',
    submittedAt: '24 Ağustos 2026, 13:40',
    orgName: 'Marmara Spor Kulübü İnovasyon & Performans Lab',
    orgType: 'club',
    orgTypeName: 'Spor Kulübü / Akademi',
    contactName: 'Canberk Yılmaz',
    contactRole: 'Sportif Direktör & AR-GE Sorumlusu',
    email: 'canberk@marmaraspor.org.tr',
    phone: '+90 532 444 12 34',
    message: 'Futbol ve voleybol altyapı takımlarımız için Türk spor teknolojisi girişimlerinin GPS, sakatlık önleme ve video analiz araçlarını pilot olarak test etmek ve tesislerimizi inovasyon merkezine dönüştürmek istiyoruz.',
    website: 'https://marmaraspor.org.tr',
    location: 'İstanbul (Kadıköy)',
    status: 'pending'
  },
  {
    id: 'part-sub-2',
    submittedAt: '24 Ağustos 2026, 10:15',
    orgName: 'Athletic Ventures VC',
    orgType: 'vc_fund',
    orgTypeName: 'Yatırım Fonu / VC / Melek Ağ',
    contactName: 'Ece Karaca',
    contactRole: 'Yönetici Ortak (Managing Partner)',
    email: 'ece@athleticvc.com',
    phone: '+90 212 333 45 67',
    message: 'Türkiye ve Doğu Avrupa merkezli spor teknolojileri, biyomekanik ve taraftar etkileşimi alanında tohum ve Seri A aşamasındaki girişimlere 5 milyon Euro büyüklüğünde fon yatırımı yapmayı planlıyoruz.',
    website: 'https://athleticvc.com',
    location: 'İstanbul (Levent)',
    status: 'pending'
  },
  {
    id: 'part-sub-3',
    submittedAt: '23 Ağustos 2026, 16:20',
    orgName: 'Ege Üniversitesi Spor Bilimleri & Biyomekanik Araştırma Lab',
    orgType: 'university',
    orgTypeName: 'Üniversite / Spor Bilimleri Fakültesi',
    contactName: 'Prof. Dr. Serdar Aydın',
    contactRole: 'Bölüm Başkanı',
    email: 'serdar.aydin@ege.edu.tr',
    phone: '+90 232 388 90 00',
    message: 'Giyilebilir teknolojiler, izokinetik kuvvet testleri ve metabolik analiz cihazları geliştiren yerli girişimcilere akademik doğrulama, laboratuvar test ortamı ve klinik veri desteği sağlamaya hazırız.',
    website: 'https://sporbilimleri.ege.edu.tr',
    location: 'İzmir (Bornova)',
    status: 'pending'
  }
];

export const getApprovedSupporters = (): Supporter[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_SUPPORTERS);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading approved supporters:', e);
  }
  try {
    localStorage.setItem(STORAGE_KEY_SUPPORTERS, JSON.stringify(INITIAL_SUPPORTERS));
  } catch (e) {}
  return INITIAL_SUPPORTERS;
};

export const saveApprovedSupporters = (supporters: Supporter[]) => {
  try {
    localStorage.setItem(STORAGE_KEY_SUPPORTERS, JSON.stringify(supporters));
  } catch (e) {
    console.error('Error saving approved supporters:', e);
  }
};

export const getPendingPartners = (): PendingPartnerSubmission[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_PENDING_PARTNERS);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error loading pending partners:', e);
  }
  try {
    localStorage.setItem(STORAGE_KEY_PENDING_PARTNERS, JSON.stringify(DEFAULT_PENDING_PARTNERS));
  } catch (e) {}
  return DEFAULT_PENDING_PARTNERS;
};

export const savePendingPartners = (partners: PendingPartnerSubmission[]) => {
  try {
    localStorage.setItem(STORAGE_KEY_PENDING_PARTNERS, JSON.stringify(partners));
  } catch (e) {
    console.error('Error saving pending partners:', e);
  }
};

export const addPendingPartner = (formData: any): PendingPartnerSubmission => {
  const current = getPendingPartners();
  const orgType = (formData.orgType || 'club') as SupporterType;
  
  const newPartner: PendingPartnerSubmission = {
    id: `part-sub-${Date.now()}`,
    submittedAt: new Date().toLocaleDateString('tr-TR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    orgName: formData.orgName || 'İsimsiz Kurum',
    orgType: orgType,
    orgTypeName: PARTNER_TYPE_NAMES[orgType] || 'Ekosistem Partneri',
    contactName: formData.contactName || 'Yetkili',
    contactRole: formData.contactRole || 'Temsilci',
    email: formData.email || '',
    phone: formData.phone || '',
    message: formData.message || '',
    website: formData.website || 'https://sporttech.com.tr',
    location: formData.location || 'Türkiye',
    status: 'pending'
  };

  const updated = [newPartner, ...current];
  savePendingPartners(updated);
  return newPartner;
};

export const approvePartner = (id: string, customDetails?: Partial<Supporter>): { approvedSupporter: Supporter; updatedPending: PendingPartnerSubmission[] } => {
  const pending = getPendingPartners();
  const target = pending.find(p => p.id === id);
  if (!target) throw new Error('Partner submission not found');

  const orgType = (customDetails?.type || target.orgType) as SupporterType;

  const newSupporter: Supporter = {
    id: customDetails?.id || `supporter-${target.orgName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Math.floor(Math.random() * 1000)}`,
    name: customDetails?.name || target.orgName,
    type: orgType,
    typeName: customDetails?.typeName || PARTNER_TYPE_NAMES[orgType] || 'Ekosistem Partneri',
    logo: customDetails?.logo || '/logo.svg',
    description: customDetails?.description || target.message || `${target.orgName}, Türkiye Spor Teknolojileri Platformu resmi ekosistem partneridir.`,
    website: customDetails?.website || target.website,
    role: customDetails?.role || `${PARTNER_TYPE_NAMES[orgType]} - ${target.contactRole || 'İşbirliği Partneri'}`,
    location: customDetails?.location || target.location || 'Türkiye',
    stats: customDetails?.stats || 'Resmi Ekosistem Partneri'
  };

  const allApproved = getApprovedSupporters();
  const updatedApproved = [...allApproved, newSupporter];
  saveApprovedSupporters(updatedApproved);

  const updatedPending = pending.filter(p => p.id !== id);
  savePendingPartners(updatedPending);

  return { approvedSupporter: newSupporter, updatedPending };
};

export const rejectPartner = (id: string): PendingPartnerSubmission[] => {
  const pending = getPendingPartners();
  const updated = pending.filter(p => p.id !== id);
  savePendingPartners(updated);
  return updated;
};

export const updateApprovedSupporter = (updatedSupporter: Supporter): Supporter[] => {
  const current = getApprovedSupporters();
  const updated = current.map(s => s.id === updatedSupporter.id ? updatedSupporter : s);
  saveApprovedSupporters(updated);
  return updated;
};

export const deleteApprovedSupporter = (id: string): Supporter[] => {
  const current = getApprovedSupporters();
  const updated = current.filter(s => s.id !== id);
  saveApprovedSupporters(updated);
  return updated;
};

export const updatePendingPartnerSubmission = (updated: PendingPartnerSubmission): PendingPartnerSubmission[] => {
  const current = getPendingPartners();
  const updatedList = current.map(p => p.id === updated.id ? updated : p);
  savePendingPartners(updatedList);
  return updatedList;
};
