export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  status: 'active' | 'unsubscribed';
  source: string;
}

const STORAGE_KEY_NEWSLETTER = 'stt_newsletter_subscribers';

const DEFAULT_NEWSLETTER_SUBSCRIBERS: NewsletterSubscriber[] = [
  {
    id: 'sub-news-1',
    email: 'mert.yilmaz@fenerbahce.org',
    subscribedAt: '24 Ağustos 2026, 15:42',
    status: 'active',
    source: 'Haftalık SportTech Bülteni'
  },
  {
    id: 'sub-news-2',
    email: 'selin.kaya@galatasaray.org',
    subscribedAt: '24 Ağustos 2026, 12:10',
    status: 'active',
    source: 'Haftalık SportTech Bülteni'
  },
  {
    id: 'sub-news-3',
    email: 'burak@earlybird.vc',
    subscribedAt: '23 Ağustos 2026, 19:24',
    status: 'active',
    source: 'Hero Bülten Formu'
  },
  {
    id: 'sub-news-4',
    email: 'arda.demir@itu.edu.tr',
    subscribedAt: '23 Ağustos 2026, 14:05',
    status: 'active',
    source: 'Haftalık SportTech Bülteni'
  },
  {
    id: 'sub-news-5',
    email: 'canan.oz@eczacibasi.com.tr',
    subscribedAt: '22 Ağustos 2026, 10:30',
    status: 'active',
    source: 'Haftalık SportTech Bülteni'
  },
  {
    id: 'sub-news-6',
    email: 'tolga@trventures.com',
    subscribedAt: '21 Ağustos 2026, 16:50',
    status: 'active',
    source: 'Etkinlikler Alanı'
  }
];

export const getNewsletterSubscribers = (): NewsletterSubscriber[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_NEWSLETTER);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error loading newsletter subscribers:', e);
  }
  try {
    localStorage.setItem(STORAGE_KEY_NEWSLETTER, JSON.stringify(DEFAULT_NEWSLETTER_SUBSCRIBERS));
  } catch (e) {}
  return DEFAULT_NEWSLETTER_SUBSCRIBERS;
};

export const saveNewsletterSubscribers = (subscribers: NewsletterSubscriber[]) => {
  try {
    localStorage.setItem(STORAGE_KEY_NEWSLETTER, JSON.stringify(subscribers));
  } catch (e) {
    console.error('Error saving newsletter subscribers:', e);
  }
};

export const addNewsletterSubscriber = (email: string, source: string = 'Haftalık SportTech Bülteni'): { subscriber: NewsletterSubscriber; isNew: boolean } => {
  const current = getNewsletterSubscribers();
  const trimmed = email.trim().toLowerCase();
  
  const existing = current.find(s => s.email.toLowerCase() === trimmed);
  if (existing) {
    return { subscriber: existing, isNew: false };
  }

  const newSub: NewsletterSubscriber = {
    id: `sub-news-${Date.now()}`,
    email: trimmed,
    subscribedAt: new Date().toLocaleDateString('tr-TR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    status: 'active',
    source
  };

  const updated = [newSub, ...current];
  saveNewsletterSubscribers(updated);
  return { subscriber: newSub, isNew: true };
};

export const deleteNewsletterSubscriber = (id: string): NewsletterSubscriber[] => {
  const current = getNewsletterSubscribers();
  const updated = current.filter(s => s.id !== id);
  saveNewsletterSubscribers(updated);
  return updated;
};
