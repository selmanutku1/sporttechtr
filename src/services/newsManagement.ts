import { NewsArticle, NewsCategory } from '../types';
import { NEWS_ARTICLES as INITIAL_NEWS } from '../data/news';

const STORAGE_KEY_NEWS = 'stt_news_articles_v2';

export const NEWS_CATEGORIES: { id: NewsCategory; label: string }[] = [
  { id: 'all', label: 'Tüm Haberler' },
  { id: 'ecosystem', label: 'Ekosistem & Platform' },
  { id: 'ai_data', label: 'Yapay Zeka & Performans' },
  { id: 'management_platform', label: 'Yönetim Yazılımları (SaaS)' },
  { id: 'community_rating', label: 'Tesis Puanlama & Rehber' },
  { id: 'investments', label: 'Yatırımlar & Fonlama' },
  { id: 'wearables', label: 'Giyilebilir Teknolojiler' },
  { id: 'smart_stadium', label: 'Akıllı Tesisler' },
  { id: 'esports', label: 'Espor & Oyun' },
  { id: 'global_trends', label: 'Küresel Trendler' }
];

export const getNewsArticles = (): NewsArticle[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_NEWS);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading news articles:', e);
  }
  try {
    localStorage.setItem(STORAGE_KEY_NEWS, JSON.stringify(INITIAL_NEWS));
  } catch (e) {}
  return INITIAL_NEWS;
};

export const saveNewsArticles = (articles: NewsArticle[]) => {
  try {
    localStorage.setItem(STORAGE_KEY_NEWS, JSON.stringify(articles));
  } catch (e) {
    console.error('Error saving news articles:', e);
  }
};

export const addNewsArticle = (articleData: Partial<NewsArticle>): NewsArticle => {
  const current = getNewsArticles();
  const id = articleData.id || `news-${Date.now()}`;
  const title = articleData.title || 'Yeni Spor Teknolojisi Haberi';
  const category = articleData.category || 'ecosystem';
  const catObj = NEWS_CATEGORIES.find(c => c.id === category);

  const newArticle: NewsArticle = {
    id,
    title,
    slug: articleData.slug || id,
    excerpt: articleData.excerpt || 'Haber özeti girilmedi.',
    content: articleData.content && articleData.content.length > 0 
      ? articleData.content 
      : ['Bu haberin detay içeriği yakında eklenecektir.'],
    category,
    categoryName: articleData.categoryName || catObj?.label || 'Ekosistem',
    author: {
      name: articleData.author?.name || 'SportTech Editör Masası',
      role: articleData.author?.role || 'Ekosistem Editörü',
      avatar: articleData.author?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
    },
    date: articleData.date || new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
    readTime: articleData.readTime || '3 dk okuma',
    coverImage: articleData.coverImage || 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&auto=format&fit=crop&q=80',
    tags: articleData.tags && articleData.tags.length > 0 ? articleData.tags : ['SportTech', 'Türkiye', 'Girişim'],
    source: articleData.source || 'SportTech Türkiye',
    isFeatured: articleData.isFeatured || false,
    likesCount: articleData.likesCount || 0,
    status: articleData.status || 'active'
  };

  // If newly created article is featured, unset others if needed or keep it as top
  let updatedList = [newArticle, ...current];
  if (newArticle.isFeatured) {
    updatedList = updatedList.map(a => a.id === newArticle.id ? a : { ...a, isFeatured: false });
  }

  saveNewsArticles(updatedList);
  return newArticle;
};

export const updateNewsArticle = (updatedArticle: NewsArticle): NewsArticle[] => {
  const current = getNewsArticles();
  let updatedList = current.map(a => a.id === updatedArticle.id ? updatedArticle : a);
  
  // If this article was set to featured, unset other articles
  if (updatedArticle.isFeatured) {
    updatedList = updatedList.map(a => a.id === updatedArticle.id ? a : { ...a, isFeatured: false });
  }

  saveNewsArticles(updatedList);
  return updatedList;
};

export const deleteNewsArticle = (id: string): NewsArticle[] => {
  const current = getNewsArticles();
  const updated = current.filter(a => a.id !== id);
  saveNewsArticles(updated);
  return updated;
};

export const toggleFeaturedArticle = (id: string): NewsArticle[] => {
  const current = getNewsArticles();
  const target = current.find(a => a.id === id);
  if (!target) return current;

  const willBeFeatured = !target.isFeatured;
  const updated = current.map(a => {
    if (a.id === id) {
      return { ...a, isFeatured: willBeFeatured };
    }
    // If setting a new featured, unset others
    if (willBeFeatured) {
      return { ...a, isFeatured: false };
    }
    return a;
  });

  saveNewsArticles(updated);
  return updated;
};
