import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  Newspaper, 
  Sparkles, 
  Image as ImageIcon, 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  Check, 
  Link2,
  FileText,
  Trash2
} from 'lucide-react';
import { NewsArticle, NewsCategory } from '../types';
import { NEWS_CATEGORIES } from '../services/newsManagement';

interface NewsEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: NewsArticle | null;
  onSave: (savedArticle: NewsArticle) => void;
  onDelete?: (id: string) => void;
  theme?: 'dark' | 'light';
}

export const NewsEditModal: React.FC<NewsEditModalProps> = ({
  isOpen,
  onClose,
  article,
  onSave,
  onDelete,
  theme = 'dark'
}) => {
  const [formData, setFormData] = useState<{
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string; // newline separated paragraphs for editing
    category: NewsCategory;
    categoryName: string;
    authorName: string;
    authorRole: string;
    authorAvatar: string;
    date: string;
    readTime: string;
    coverImage: string;
    tags: string;
    source: string;
    isFeatured: boolean;
    likesCount: number;
    status: 'active' | 'passive';
  }>({
    id: '',
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'ecosystem',
    categoryName: 'Ekosistem & Platform',
    authorName: 'SportTech Editör Masası',
    authorRole: 'Ekosistem Editörü',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    date: '',
    readTime: '4 dk okuma',
    coverImage: '',
    tags: '',
    source: 'SportTech Türkiye',
    isFeatured: false,
    likesCount: 0,
    status: 'active'
  });

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (article) {
      setFormData({
        id: article.id,
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        content: Array.isArray(article.content) ? article.content.join('\n\n') : (article.content || ''),
        category: article.category,
        categoryName: article.categoryName,
        authorName: article.author?.name || 'SportTech Editör Masası',
        authorRole: article.author?.role || 'Ekosistem Editörü',
        authorAvatar: article.author?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        date: article.date,
        readTime: article.readTime || '4 dk okuma',
        coverImage: article.coverImage || '',
        tags: article.tags?.join(', ') || '',
        source: article.source || 'SportTech Türkiye',
        isFeatured: !!article.isFeatured,
        likesCount: article.likesCount || 0,
        status: article.status || 'active'
      });
      setIsSaved(false);
    } else {
      const todayFormatted = new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
      setFormData({
        id: `news-${Date.now()}`,
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        category: 'ecosystem',
        categoryName: 'Ekosistem & Platform',
        authorName: 'SportTech Editör Masası',
        authorRole: 'Ekosistem Editörü',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        date: todayFormatted,
        readTime: '4 dk okuma',
        coverImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&auto=format&fit=crop&q=80',
        tags: 'SportTech, Türkiye, İnovasyon',
        source: 'SportTech Türkiye',
        isFeatured: false,
        likesCount: 0,
        status: 'active'
      });
      setIsSaved(false);
    }
  }, [article, isOpen]);

  if (!isOpen) return null;

  const handleCategoryChange = (catId: NewsCategory) => {
    const found = NEWS_CATEGORIES.find(c => c.id === catId);
    setFormData(prev => ({
      ...prev,
      category: catId,
      categoryName: found ? found.label : 'Ekosistem & Platform'
    }));
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleTitleChange = (val: string) => {
    setFormData(prev => ({
      ...prev,
      title: val,
      slug: prev.slug && prev.slug !== generateSlug(prev.title) ? prev.slug : generateSlug(val)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Parse paragraphs from multiline string
    const paragraphs = formData.content
      .split('\n')
      .map(p => p.trim())
      .filter(p => p.length > 0);

    const tagsArray = formData.tags
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const savedArticle: NewsArticle = {
      id: formData.id || `news-${Date.now()}`,
      title: formData.title.trim(),
      slug: formData.slug.trim() || generateSlug(formData.title),
      excerpt: formData.excerpt.trim(),
      content: paragraphs.length > 0 ? paragraphs : [formData.excerpt],
      category: formData.category,
      categoryName: formData.categoryName,
      author: {
        name: formData.authorName.trim() || 'SportTech Editör Masası',
        role: formData.authorRole.trim() || 'Ekosistem Editörü',
        avatar: formData.authorAvatar.trim() || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
      },
      date: formData.date.trim() || new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
      readTime: formData.readTime.trim() || '4 dk okuma',
      coverImage: formData.coverImage.trim() || 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&auto=format&fit=crop&q=80',
      tags: tagsArray.length > 0 ? tagsArray : ['SportTech'],
      source: formData.source.trim() || 'SportTech Türkiye',
      isFeatured: formData.isFeatured,
      likesCount: formData.likesCount || 0,
      status: formData.status
    };

    onSave(savedArticle);
    setIsSaved(true);
    setTimeout(() => {
      onClose();
    }, 400);
  };

  return (
    <div className={`fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-5 backdrop-blur-sm overflow-y-auto animate-in fade-in ${
      theme === 'dark' ? 'bg-slate-950/80' : 'bg-slate-900/40'
    }`}>
      <div className={`border rounded-3xl max-w-3xl w-full my-auto max-h-[92vh] flex flex-col overflow-hidden shadow-2xl relative transition-colors ${
        theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        
        {/* Top Header */}
        <div className={`px-6 py-4 border-b flex items-center justify-between shrink-0 transition-colors ${
          theme === 'dark' ? 'bg-slate-950 text-white border-slate-800' : 'bg-slate-50 text-slate-900 border-slate-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center font-bold transition-colors ${
              theme === 'dark' ? 'bg-blue-600/20 border-blue-500/30 text-blue-400' : 'bg-blue-50 border-blue-100 text-blue-600'
            }`}>
              <Newspaper className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`text-base font-bold font-display transition-colors ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                {article ? 'Haberi / Analizi Düzenle' : 'Yeni Haber & Analiz Raporu Ekle'}
              </h3>
              <p className={`text-xs transition-colors ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Gündem maddesi, analiz metni, kapak görseli ve yazar detaylarını yapılandırın
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition-colors ${
              theme === 'dark' ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-500'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
          
          {/* Row 1: Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className={`block text-xs font-bold mb-1 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-700'
              }`}>
                Haber Başlığı *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Örn: Sporsepeti ve Kulüplerden Yeni Dijital İnovasyon Hamlesi"
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-bold focus:outline-none focus:border-blue-600 shadow-2xs transition-all ${
                  theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-700' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-bold mb-1 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-700'
              }`}>
                Kategori *
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleCategoryChange(e.target.value as NewsCategory)}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-semibold focus:outline-none focus:border-blue-600 shadow-2xs transition-all ${
                  theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                {NEWS_CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
                  <option key={cat.id} value={cat.id} className={theme === 'dark' ? 'bg-slate-900' : 'bg-white'}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: Excerpt (Özet) */}
          <div>
            <label className={`block text-xs font-bold mb-1 ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-700'
            }`}>
              Kısa Özet / Spot Cümle (Kartlarda Gözükecek Metin) *
            </label>
            <textarea
              rows={2}
              required
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="Haberin ana fikrini özetleyen 1-2 cümlelik spot metin..."
              className={`w-full px-3.5 py-2 rounded-xl border text-xs focus:outline-none focus:border-blue-600 shadow-2xs transition-all ${
                theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-700' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
              }`}
            />
          </div>

          {/* Row 3: Full Content / Paragraphs */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className={`text-xs font-bold flex items-center gap-1.5 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-700'
              }`}>
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>Haber & Analiz Detay Metni (Her Paragraf Arasına Boşluk Bırakın) *</span>
              </label>
              <span className="text-[10px] text-slate-500">
                Paragraflar arası çift Enter
              </span>
            </div>
            <textarea
              rows={6}
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Haberin veya araştırma raporunun geniş kapsamlı metnini buraya girin..."
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-600 shadow-2xs leading-relaxed transition-all ${
                theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-700' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
              }`}
            />
          </div>

          {/* Row 4: Cover Image & Source */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={`block text-xs font-bold mb-1 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-700'
              }`}>
                Kapak Görseli URL veya Yerel Yol
              </label>
              <div className="relative">
                <ImageIcon className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  placeholder="/mera-cover.svg veya https://images.unsplash.com/..."
                  className={`w-full pl-9 pr-3.5 py-2 rounded-xl border text-xs focus:outline-none focus:border-blue-600 shadow-2xs transition-all ${
                    theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-700' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-xs font-bold mb-1 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-700'
              }`}>
                Haber Kaynağı
              </label>
              <div className="relative">
                <Link2 className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={formData.source}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                  placeholder="SportTech Türkiye / İlgili Girişim"
                  className={`w-full pl-9 pr-3.5 py-2 rounded-xl border text-xs focus:outline-none focus:border-blue-600 shadow-2xs transition-all ${
                    theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-700' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Row 5: Author Info Grid */}
          <div className={`p-3.5 rounded-2xl border space-y-3 transition-colors ${
            theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <span className={`text-[11px] font-bold block uppercase tracking-wider ${
              theme === 'dark' ? 'text-slate-200' : 'text-slate-900'
            }`}>
              Yazar & Yayın Bilgileri
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className={`block text-[11px] font-semibold mb-1 ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Yazar Adı
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.authorName}
                    onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                    className={`w-full pl-8.5 pr-2.5 py-1.5 rounded-lg border text-xs focus:outline-none focus:border-blue-600 transition-all ${
                      theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-[11px] font-semibold mb-1 ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Yazar Rolü / Unvanı
                </label>
                <input
                  type="text"
                  value={formData.authorRole}
                  onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                  className={`w-full px-2.5 py-1.5 rounded-lg border text-xs focus:outline-none focus:border-blue-600 transition-all ${
                    theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-[11px] font-semibold mb-1 ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Yazar Avatar URL
                </label>
                <input
                  type="text"
                  value={formData.authorAvatar}
                  onChange={(e) => setFormData({ ...formData, authorAvatar: e.target.value })}
                  className={`w-full px-2.5 py-1.5 rounded-lg border text-xs focus:outline-none focus:border-blue-600 transition-all ${
                    theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                />
              </div>
            </div>

            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t transition-colors ${
              theme === 'dark' ? 'border-slate-800' : 'border-slate-200'
            }`}>
              <div>
                <label className={`block text-[11px] font-semibold mb-1 ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Yayın Tarihi
                </label>
                <div className="relative">
                  <Calendar className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="24 Ağustos 2026"
                    className={`w-full pl-8.5 pr-2.5 py-1.5 rounded-lg border text-xs focus:outline-none focus:border-blue-600 transition-all ${
                      theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-[11px] font-semibold mb-1 ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Okuma Süresi
                </label>
                <div className="relative">
                  <Clock className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    placeholder="4 dk okuma"
                    className={`w-full pl-8.5 pr-2.5 py-1.5 rounded-lg border text-xs focus:outline-none focus:border-blue-600 transition-all ${
                      theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Row 6: Tags & Featured Toggle */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            <div className="sm:col-span-2">
              <label className={`block text-xs font-bold mb-1 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-700'
              }`}>
                Etiketler (Virgülle Ayırın)
              </label>
              <div className="relative">
                <Tag className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="SportTech, AI, Sporsepeti, Girişim"
                  className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-blue-600 shadow-2xs transition-all ${
                    theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-700' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>
            </div>

            <div className="pt-5 flex flex-wrap items-center gap-4">
              <label className={`flex items-center gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all ${
                theme === 'dark' ? 'bg-slate-950 border-slate-800 hover:bg-slate-900' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}>
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="w-4 h-4 rounded text-orange-500 focus:ring-orange-400 border-slate-300"
                />
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                  <span className={`text-xs font-bold transition-colors ${
                    theme === 'dark' ? 'text-slate-200' : 'text-slate-900'
                  }`}>Manşet Yap</span>
                </div>
              </label>

              <label className={`flex items-center gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all ${
                formData.status === 'active'
                  ? theme === 'dark' ? 'bg-emerald-950/20 border-emerald-900/30' : 'bg-emerald-50 border-emerald-100'
                  : theme === 'dark' ? 'bg-slate-950 border-slate-800 hover:bg-slate-900' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}>
                <input
                  type="checkbox"
                  checked={formData.status === 'active'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.checked ? 'active' : 'passive' })}
                  className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400 border-slate-300"
                />
                <div className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${formData.status === 'active' ? 'bg-emerald-500' : 'bg-slate-500'}`} />
                  <span className={`text-xs font-bold transition-colors ${
                    theme === 'dark' ? 'text-slate-200' : 'text-slate-900'
                  }`}>
                    {formData.status === 'active' ? 'Yayında (Aktif)' : 'Yayında Değil (Pasif)'}
                  </span>
                </div>
              </label>
            </div>
          </div>

        </form>

        {/* Modal Footer Actions */}
        <div className={`px-6 py-4 border-t flex items-center justify-between shrink-0 transition-colors ${
          theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
                theme === 'dark' ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700' : 'bg-white hover:bg-slate-100 text-slate-600 border-slate-200'
              }`}
            >
              İptal
            </button>

            {article && onDelete && (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm(`"${article.title}" haberini silmek istediğinize emin misiniz?`)) {
                    onDelete(article.id);
                    onClose();
                  }
                }}
                className={`px-4 py-2 rounded-xl border text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  theme === 'dark' ? 'bg-slate-950 hover:bg-red-950 text-red-500 border-red-900/50' : 'bg-white hover:bg-red-50 text-red-600 border-red-100'
                }`}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Haberi Sil</span>
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className={`px-5 py-2.5 rounded-xl text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer ${
              isSaved 
                ? 'bg-emerald-600' 
                : 'bg-blue-600 hover:bg-blue-500'
            }`}
          >
            {isSaved ? (
              <>
                <Check className="w-4 h-4" />
                <span>Kaydedildi & Yayında!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{article ? 'Değişiklikleri Kaydet & Yayınla' : 'Haberi Yayına Al'}</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
