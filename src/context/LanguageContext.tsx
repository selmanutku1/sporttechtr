import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'tr' | 'en-GB' | 'en-US' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const TR_TRANSLATIONS: Record<string, string> = {
  // Nav & General
  'nav.startups': 'Girişimler',
  'nav.news': 'Haberler',
  'nav.about': 'Hakkımızda',
  'nav.supporters': 'Destekleyiciler',
  'nav.events': 'Etkinlikler',
  'btn.add_startup': 'Girişim Ekle',
  'btn.search': 'Ekosistemde Ara...',
  'btn.quick_search': 'Hızlı Ara...',
  'btn.back_home': 'Ana Sayfaya Dön',
  'btn.become_partner': 'Destekçi Ol',
  'btn.submit': 'Gönder',
  'btn.close': 'Kapat',
  'btn.explore_startups': 'Girişimleri Keşfet',
  'btn.read_news': 'Haberleri Oku',
  'btn.details': 'Detayları İncele',
  'btn.request_demo': 'Demo / Bilgi Talebi',
  'btn.sending': 'Gönderiliyor...',

  // Hero Section
  'hero.title_part1': 'Türkiye Spor Teknolojileri',
  'hero.title_part2': 'Ekosistem Haritası',
  'hero.subtitle': 'Türkiye ve bölgesindeki en yenilikçi spor teknolojileri girişimlerini, akıllı antrenman çözümlerini, performans analizi sistemlerini ve sektörel haberleri keşfedin.',
  'hero.stats.active_startups': 'Aktif Girişim',
  'hero.stats.news': 'Sektörel Haber',
  'hero.stats.categories': 'Farklı Kategori',
  'hero.stats.supporters': 'Ekosistem Destekçisi',

  // Startups Section
  'startups.title': 'Spor Teknolojisi Girişimleri',
  'startups.subtitle': 'Farklı kategorilerde faaliyet gösteren, performanstan sağlığa geniş bir yelpazedeki yenilikçi girişimleri filtreleyin ve inceleyin.',
  'startups.search_placeholder': 'Girişim adı, kurucu veya teknoloji ara...',
  'startups.no_results': 'Arama kriterlerinize uygun girişim bulunamadı.',
  'startups.category.all': 'Tümü',
  'startups.category.ai_analytics': 'Yapay Zeka & Performans',
  'startups.category.management_platform': 'Yönetim & Dijital Platform',
  'startups.category.community_rating': 'Tesis Puanlama & Rehber',
  'startups.category.iot_wearables': 'IoT & Giyilebilir',
  'startups.category.fan_engagement': 'Taraftar Etkileşimi',
  'startups.category.fitness_wellness': 'Fitness & Sağlık',

  // News Section
  'news.title': 'Haberler & Analizler',
  'news.subtitle': 'Spor teknolojileri dünyasındaki son gelişmeler, ürün lansmanları, yatırım turları ve derinlemesine pazar analizleri.',
  'news.read_time': 'dk okuma',
  'news.featured': 'ÖNE ÇIKAN HABER',
  'news.by': 'Yazar:',

  // About Section
  'about.title': 'Hakkımızda',
  'about.subtitle': 'SportTech Türkiye, ülkemizdeki spor teknolojisi ekosistemini bir araya getiren, büyüten ve dünyaya açan bağımsız bir platformdur.',
  'about.pillar1.title': 'Girişim Kataloğu',
  'about.pillar1.desc': 'Türkiye merkezli tüm spor teknolojisi girişimlerini tek bir çatı altında listeleyerek görünürlüklerini artırıyoruz.',
  'about.pillar2.title': 'Haber ve Analizler',
  'about.pillar2.desc': 'Sektörel röportajlar, pazar raporları ve küresel trendlerin yerel ekosisteme etkilerini inceliyoruz.',
  'about.pillar3.title': 'İş Birlikleri',
  'about.pillar3.desc': 'Kulüpler, federasyonlar, yatırımcılar ve girişimler arasında köprü kurarak iş birliği fırsatları yaratıyoruz.',

  // Supporters Section
  'supporters.title': 'Ekosistem Paydaşları & Destekleyiciler',
  'supporters.subtitle': 'SportTech Türkiye platformunun gelişimine, girişimlerin büyümesine ve spor kültürünün dijitalleşmesine katkı sağlayan kurumlar.',
  'supporters.no_supporters': 'Henüz onaylanmış destekleyici bulunmuyor.',

  // Events Section
  'events.title': 'Etkinlikler & Programlar',
  'events.subtitle': 'Yaklaşan spor teknolojisi zirveleri, hackathonlar, yatırımcı buluşmaları ve girişim hızlandırma programları.',
  'events.no_events': 'Şu anda aktif bir etkinlik bulunmamaktadır. Yakında yeni programlar açıklanacaktır.',

  // Newsletter Section
  'newsletter.title': 'Haftalık Bültene Abone Olun',
  'newsletter.subtitle': 'Spor teknolojisi dünyasından haftalık özetler, özel analizler, yeni girişimler ve etkinlik duyuruları e-posta kutunuzda.',
  'newsletter.placeholder': 'E-posta adresinizi girin',
  'newsletter.success': 'Haftalık bültene başarıyla abone oldunuz!',

  // Footer
  'footer.desc': "Türkiye'nin spor teknolojileri, akıllı performans sistemleri ve dijital spor çözümleri platformu.",
  'footer.links.quick': 'Hızlı Menü',
  'footer.links.legal': 'Yasal',
  'footer.links.contact': 'İletişim',
  'footer.copyright': 'Tüm hakları saklıdır.',
  'footer.provided_by': 'tarafından sağlanmaktadır',

  // Modals & Forms
  'modal.founded': 'Kuruluş Yılı',
  'modal.location': 'Lokasyon',
  'modal.website': 'Web Sitesi',
  'modal.team_size': 'Çalışan Sayısı',
  'modal.tech_stack': 'Teknoloji Yığını',
  'modal.key_metrics': 'Öne Çıkan Metrikler',
  'modal.founders': 'Kurucular',
  'modal.tags': 'Etiketler',
  'modal.demo_title': 'Demo veya Bilgi Talebi Gönderin',
  'modal.demo_desc': "Girişim ekibiyle doğrudan iletişime geçmek için formu doldurun. Talebiniz anında kendilerine iletilecektir.",
  'modal.form.name': 'Ad Soyad',
  'modal.form.email': 'E-posta Adresi',
  'modal.form.phone': 'Telefon Numarası',
  'modal.form.company': 'Kurum / Kulüp Adı',
  'modal.form.message': 'Mesajınız',
  'modal.form.success': 'Talebiniz başarıyla iletildi! Girişim ekibi sizinle en kısa sürede iletişime geçecektir.',

  // Startup Submit Modal
  'submit.title': 'Girişiminizi Ekosisteme Ekleyin',
  'submit.desc': 'SportTech Türkiye haritasında yerinizi alarak kulüplere, yatırımcılara ve destekçilere daha kolay ulaşın.',
  'submit.form.logo': 'Logo URL / Görsel Linki',
  'submit.form.cover': 'Kapak Görseli URL',
  'submit.form.tagline': 'Kısa Slogan (Tek Cümle)',
  'submit.form.description': 'Kısa Açıklama',
  'submit.form.story': 'Detaylı Girişim Hikayesi',
  'submit.form.category': 'Kategori Seçin',
  'submit.form.stage': 'Yatırım Aşaması (Örn: Seed, Pre-Seed, Bootstrapped)',
  'submit.form.founded': 'Kuruluş Yılı',
  'submit.form.location': 'Merkez Ofis Lokasyonu',
  'submit.form.website': 'Web Sitesi URL',
  'submit.form.teamsize': 'Ekip Büyüklüğü (Örn: 5-10 Kişi)',
  'submit.form.techstack': 'Kullanılan Teknolojiler (Virgülle ayırın)',
  'submit.form.success': 'Girişim başvurunuz başarıyla alındı! Moderatör onayından sonra haritada yayınlanacaktır.',

  // Partner Modal
  'partner.title': 'Ekosistem Destekçisi Olun',
  'partner.form.name': 'Kurum / Şirket Adı',
  'partner.form.logo': 'Logo URL / Görsel Linki',
  'partner.form.type': 'Destekçi Türü',
  'partner.form.type.investor': 'Yatırımcı / VC',
  'partner.form.type.club': 'Spor Kulübü / Federasyon',
  'partner.form.type.tech': 'Teknoloji İş Ortağı',
  'partner.form.type.brand': 'Sponsor / Marka',
  'partner.form.success': 'Destekçi başvurunuz başarıyla alındı! Moderatör onayından sonra listelenecektir.',

  // Search Modal
  'search.title': 'Ecosystem Arama Motoru',
  'search.desc': 'Girişimler, haberler, kategoriler ve analizler arasında akıllı arama yapın.',
  'search.placeholder': 'Aramak istediğiniz kelimeyi yazın...',
  'search.results': 'Sonuçlar',
  'search.no_results': 'Aramanızla eşleşen hiçbir sonuç bulunamadı.',
  'search.type.startup': 'Girişim',
  'search.type.news': 'Haber',

  // Admin Portal
  'admin.title': 'Yönetici Girişi',
  'admin.placeholder.password': 'Yönetici şifresini girin',
  'admin.btn.login': 'Giriş Yap',
  'admin.error': 'Hatalı şifre girdiniz!',
  'admin.dashboard.title': 'Yönetim Paneli',
  'admin.dashboard.sub': 'Girişim başvuruları, destekçi talepleri, haberler ve abone listesi.',
  'admin.dashboard.tab.pending': 'Onay Bekleyenler',
  'admin.dashboard.tab.approved': 'Onaylanan Girişimler',
  'admin.dashboard.tab.partners': 'Destekçiler',
  'admin.dashboard.tab.news': 'Haber Yönetimi',
  'admin.dashboard.tab.subscribers': 'Bülten Aboneleri',
  'admin.dashboard.approve': 'Onayla',
  'admin.dashboard.reject': 'Reddet',
  'admin.dashboard.delete': 'Sil',
  'admin.dashboard.edit': 'Düzenle',
  'admin.dashboard.add_news': 'Haber Ekle',
  'admin.dashboard.logout': 'Çıkış Yap',
};

const EN_TRANSLATIONS: Record<string, string> = {
  // Nav & General
  'nav.startups': 'Startups',
  'nav.news': 'News',
  'nav.about': 'About Us',
  'nav.supporters': 'Supporters',
  'nav.events': 'Events',
  'btn.add_startup': 'Add Startup',
  'btn.search': 'Search Ecosystem...',
  'btn.quick_search': 'Quick Search...',
  'btn.back_home': 'Back to Home',
  'btn.become_partner': 'Become Supporter',
  'btn.submit': 'Submit',
  'btn.close': 'Close',
  'btn.explore_startups': 'Explore Startups',
  'btn.read_news': 'Read News',
  'btn.details': 'View Details',
  'btn.request_demo': 'Request Demo / Info',
  'btn.sending': 'Sending...',

  // Hero Section
  'hero.title_part1': 'Turkey Sports Tech',
  'hero.title_part2': 'Ecosystem Map',
  'hero.subtitle': 'Explore the most innovative sports technology startups, smart training solutions, athletic performance analysis systems, and sector news in Turkey and its region.',
  'hero.stats.active_startups': 'Active Startups',
  'hero.stats.news': 'Industry News',
  'hero.stats.categories': 'Categories',
  'hero.stats.supporters': 'Supporters',

  // Startups Section
  'startups.title': 'Sports Tech Startups',
  'startups.subtitle': 'Filter and explore innovative startups operating across various categories from athletic performance to wellness.',
  'startups.search_placeholder': 'Search startup, founder or technology...',
  'startups.no_results': 'No startups found matching your criteria.',
  'startups.category.all': 'All',
  'startups.category.all.tr': 'Tümü',
  'startups.category.ai_analytics': 'AI & Performance',
  'startups.category.management_platform': 'Management & Digital Platform',
  'startups.category.community_rating': 'Venue Review & Guide',
  'startups.category.iot_wearables': 'IoT & Wearables',
  'startups.category.fan_engagement': 'Fan Engagement',
  'startups.category.fitness_wellness': 'Fitness & Wellness',

  // News Section
  'news.title': 'News & Analysis',
  'news.subtitle': 'Latest developments in the sports tech world, product launches, funding rounds, and in-depth market analyses.',
  'news.read_time': 'min read',
  'news.featured': 'FEATURED NEWS',
  'news.by': 'Author:',

  // About Section
  'about.title': 'About Us',
  'about.subtitle': 'SportTech Türkiye is an independent platform that gathers, grows, and showcases our nation\'s sports tech ecosystem to the world.',
  'about.pillar1.title': 'Startup Catalog',
  'about.pillar1.desc': 'We list all Turkey-based sports tech startups under a single roof to boost their global visibility.',
  'about.pillar2.title': 'News & Insights',
  'about.pillar2.desc': 'We analyze industry interviews, market reports, and the impact of global trends on the local ecosystem.',
  'about.pillar3.title': 'Synergies & Partnerships',
  'about.pillar3.desc': 'We build active bridges between clubs, federations, investors, and startups to drive growth opportunities.',

  // Supporters Section
  'supporters.title': 'Ecosystem Stakeholders & Supporters',
  'supporters.subtitle': 'Institutions and organizations contributing to the development of SportTech Türkiye, startup scaling, and sports digitalization.',
  'supporters.no_supporters': 'No approved supporters found.',

  // Events Section
  'events.title': 'Events & Programs',
  'events.subtitle': 'Upcoming sports technology summits, hackathons, investor matchmakings, and startup acceleration programs.',
  'events.no_events': 'There are no active events at the moment. New programs will be announced soon.',

  // Newsletter Section
  'newsletter.title': 'Subscribe to Our Weekly Newsletter',
  'newsletter.subtitle': 'Weekly sports technology digests, exclusive analyses, brand new startups, and event announcements directly in your inbox.',
  'newsletter.placeholder': 'Enter your email address',
  'newsletter.success': 'You have successfully subscribed to our weekly newsletter!',

  // Footer
  'footer.desc': "Turkey's premium sports technologies, smart performance systems, and digital sports solutions platform.",
  'footer.links.quick': 'Quick Menu',
  'footer.links.legal': 'Legal',
  'footer.links.contact': 'Contact',
  'footer.copyright': 'All rights reserved.',
  'footer.provided_by': 'provided by',

  // Modals & Forms
  'modal.founded': 'Founded',
  'modal.location': 'Location',
  'modal.website': 'Website',
  'modal.team_size': 'Team Size',
  'modal.tech_stack': 'Tech Stack',
  'modal.key_metrics': 'Key Metrics',
  'modal.founders': 'Founders',
  'modal.tags': 'Tags',
  'modal.demo_title': 'Request Demo or Information',
  'modal.demo_desc': "Fill out the form to contact the startup team directly. Your request will be instantly forwarded to them.",
  'modal.form.name': 'Full Name',
  'modal.form.email': 'Email Address',
  'modal.form.phone': 'Phone Number',
  'modal.form.company': 'Company / Club Name',
  'modal.form.message': 'Your Message',
  'modal.form.success': 'Your request was successfully sent! The startup team will contact you as soon as possible.',

  // Startup Submit Modal
  'submit.title': 'Submit Your Startup',
  'submit.desc': 'Take your place in the SportTech Türkiye map to easily reach sports clubs, venture capital firms, and ecosystem supporters.',
  'submit.form.logo': 'Logo URL / Image Link',
  'submit.form.cover': 'Cover Image URL',
  'submit.form.tagline': 'One-Liner Tagline',
  'submit.form.description': 'Brief Description',
  'submit.form.story': 'Detailed Startup Story',
  'submit.form.category': 'Choose Category',
  'submit.form.stage': 'Investment Stage (e.g. Seed, Pre-Seed, Bootstrapped)',
  'submit.form.founded': 'Founded Year',
  'submit.form.location': 'Headquarters Location',
  'submit.form.website': 'Website URL',
  'submit.form.teamsize': 'Team Size (e.g. 5-10 people)',
  'submit.form.techstack': 'Technologies Used (comma separated)',
  'submit.form.success': 'Your startup application was received! It will be listed after moderator approval.',

  // Partner Modal
  'partner.title': 'Become an Ecosystem Supporter',
  'partner.form.name': 'Institution / Company Name',
  'partner.form.logo': 'Logo URL / Image Link',
  'partner.form.type': 'Supporter Type',
  'partner.form.type.investor': 'Investor / VC',
  'partner.form.type.club': 'Sports Club / Federation',
  'partner.form.type.tech': 'Technology Partner',
  'partner.form.type.brand': 'Sponsor / Brand',
  'partner.form.success': 'Your supporter request was received! It will be listed after moderator approval.',

  // Search Modal
  'search.title': 'Ecosystem Search Engine',
  'search.desc': 'Search dynamically across startups, news, categories, and analyses.',
  'search.placeholder': 'Type search keywords...',
  'search.results': 'Results',
  'search.no_results': 'No results matched your search criteria.',
  'search.type.startup': 'Startup',
  'search.type.news': 'News',

  // Admin Portal
  'admin.title': 'Admin Login',
  'admin.placeholder.password': 'Enter admin security password',
  'admin.btn.login': 'Log In',
  'admin.error': 'Invalid credentials!',
  'admin.dashboard.title': 'Admin Control Panel',
  'admin.dashboard.sub': 'Manage startup submissions, supporter requests, news, and subscriber lists.',
  'admin.dashboard.tab.pending': 'Pending Approvals',
  'admin.dashboard.tab.approved': 'Approved Startups',
  'admin.dashboard.tab.partners': 'Supporters',
  'admin.dashboard.tab.news': 'Manage News',
  'admin.dashboard.tab.subscribers': 'Subscribers',
  'admin.dashboard.approve': 'Approve',
  'admin.dashboard.reject': 'Reject',
  'admin.dashboard.delete': 'Delete',
  'admin.dashboard.edit': 'Edit',
  'admin.dashboard.add_news': 'Add News Article',
  'admin.dashboard.logout': 'Sign Out',
};

const AR_TRANSLATIONS: Record<string, string> = {
  // Nav & General
  'nav.startups': 'الشركات الناشئة',
  'nav.news': 'الأخبار',
  'nav.about': 'من نحن',
  'nav.supporters': 'الداعمون',
  'nav.events': 'الفعاليات',
  'btn.add_startup': 'إضافة شركة ناشئة',
  'btn.search': 'البحث في المنظومة...',
  'btn.quick_search': 'بحث سريع...',
  'btn.back_home': 'العودة للرئيسية',
  'btn.become_partner': 'كن داعماً',
  'btn.submit': 'إرسال',
  'btn.close': 'إغلاق',
  'btn.explore_startups': 'اكتشف الشركات الناشئة',
  'btn.read_news': 'اقرأ الأخبار',
  'btn.details': 'عرض التفاصيل',
  'btn.request_demo': 'طلب تجريبي / معلومات',
  'btn.sending': 'جاري الإرسال...',

  // Hero Section
  'hero.title_part1': 'تكنولوجيا الرياضة التركية',
  'hero.title_part2': 'خريطة المنظومة',
  'hero.subtitle': 'اكتشف الشركات الناشئة الأكثر ابتكاراً في مجال التكنولوجيا الرياضية، وحلول التدريب الذكية، وأنظمة تحليل الأداء الرياضي، وأخبار القطاع في تركيا والمنطقة.',
  'hero.stats.active_startups': 'الشركات النشطة',
  'hero.stats.news': 'أخبار الصناعة',
  'hero.stats.categories': 'فئات مختلفة',
  'hero.stats.supporters': 'داعمو المنظومة',

  // Startups Section
  'startups.title': 'الشركات الناشئة في التكنولوجيا الرياضية',
  'startups.subtitle': 'قم بتصفية واستكشاف الشركات الناشئة المبتكرة التي تعمل في فئات مختلفة من الأداء الرياضي إلى الصحة العامة.',
  'startups.search_placeholder': 'ابحث عن شركة، مؤسس، أو تكنولوجيا...',
  'startups.no_results': 'لم يتم العثور على شركات تطابق معايير البحث.',
  'startups.category.all': 'الكل',
  'startups.category.all.tr': 'Tümü',
  'startups.category.ai_analytics': 'الذكاء الاصطناعي والأداء',
  'startups.category.management_platform': 'الإدارة والمنصة الرقمية',
  'startups.category.community_rating': 'تقييم المرافق ودليلها',
  'startups.category.iot_wearables': 'إنترنت الأشياء والأجهزة القابلة للارتداء',
  'startups.category.fan_engagement': 'تفاعل الجماهير',
  'startups.category.fitness_wellness': 'اللياقة البدنية والصحة',

  // News Section
  'news.title': 'الأخبار والتحليلات',
  'news.subtitle': 'آخر التطورات في عالم التكنولوجيا الرياضية، وإطلاق المنتجات، وجولات الاستثمار، وتحليلات السوق العميقة.',
  'news.read_time': 'دقائق للقراءة',
  'news.featured': 'الأخبار المميزة',
  'news.by': 'الكاتب:',

  // About Section
  'about.title': 'من نحن',
  'about.subtitle': 'منصة "SportTech Türkiye" هي منصة مستقلة تجمع وتنمي وتعرض منظومة التكنولوجيا الرياضية في بلدنا للعالم.',
  'about.pillar1.title': 'دليل الشركات الناشئة',
  'about.pillar1.desc': 'ندرج جميع الشركات الناشئة في مجال التكنولوجيا الرياضية التي تتخذ من تركيا مقراً لها تحت سقف واحد لزيادة ظهورها عالمياً.',
  'about.pillar2.title': 'الأخبار والرؤى',
  'about.pillar2.desc': 'نحلل المقابلات الصناعية، وتقارير السوق، وتأثير الاتجاهات العالمية على المنظومة المحلية.',
  'about.pillar3.title': 'التعاون والشراكات',
  'about.pillar3.desc': 'نبني جسوراً فعالة بين الأندية والاتحادات والمستثمرين والشركات الناشئة لتحفيز فرص النمو.',

  // Supporters Section
  'supporters.title': 'أطراف المنظومة والداعمون',
  'supporters.subtitle': 'المؤسسات والمنظمات التي تساهم في تطوير SportTech Türkiye وتوسيع الشركات الناشئة ورقمنة الرياضة.',
  'supporters.no_supporters': 'لا يوجد داعمون معتمدون حالياً.',

  // Events Section
  'events.title': 'الفعاليات والبرامج',
  'events.subtitle': 'مؤتمرات التكنولوجيا الرياضية القادمة، والهاكاثونات، ولقاءات المستثمرين، وبرامج تسريع الشركات الناشئة.',
  'events.no_events': 'لا توجد فعاليات نشطة حالياً. سيتم الإعلان عن برامج جديدة قريباً.',

  // Newsletter Section
  'newsletter.title': 'اشترك في نشرتنا الأسبوعية',
  'newsletter.subtitle': 'ملخصات أسبوعية للتكنولوجيا الرياضية، وتحليلات حصرية، وشركات ناشئة جديدة، وإعلانات الفعاليات مباشرة في بريدك الوارد.',
  'newsletter.placeholder': 'أدخل عنوان بريدك الإلكتروني',
  'newsletter.success': 'لقد اشتركت بنجاح في نشرتنا الإخبارية الأسبوعية!',

  // Footer
  'footer.desc': 'المنصة الرائدة في تكنولوجيا الرياضة، وأنظمة الأداء الذكية، وحلول الرياضة الرقمية في تركيا.',
  'footer.links.quick': 'القائمة السريعة',
  'footer.links.legal': 'قانوني',
  'footer.links.contact': 'الاتصال',
  'footer.copyright': 'جميع الحقوق محفوظة.',
  'footer.provided_by': 'مقدم بواسطة',

  // Modals & Forms
  'modal.founded': 'تاريخ التأسيس',
  'modal.location': 'الموقع',
  'modal.website': 'الموقع الإلكتروني',
  'modal.team_size': 'حجم الفريق',
  'modal.tech_stack': 'التقنيات المستخدمة',
  'modal.key_metrics': 'أبرز المؤشرات',
  'modal.founders': 'المؤسسون',
  'modal.tags': 'العلامات',
  'modal.demo_title': 'طلب عرض تجريبي أو معلومات',
  'modal.demo_desc': 'املاً النموذج للتواصل مع فريق الشركة الناشئة مباشرة. سيتم إرسال طلبك إليهم على الفور.',
  'modal.form.name': 'الاسم الكامل',
  'modal.form.email': 'البريد الإلكتروني',
  'modal.form.phone': 'رقم الهاتف',
  'modal.form.company': 'اسم الشركة / النادي',
  'modal.form.message': 'رسالتك',
  'modal.form.success': 'تم إرسال طلبك بنجاح! سيتصل بك فريق العمل في أقرب وقت ممكن.',

  // Startup Submit Modal
  'submit.title': 'أضف شركتك الناشئة',
  'submit.desc': 'احجز مكانك في خريطة SportTech Türkiye للوصول بسهولة للأندية، وصناديق الاستثمار، وداعمي المنظومة.',
  'submit.form.logo': 'رابط الشعار / الصورة',
  'submit.form.cover': 'رابط غلاف الصورة',
  'submit.form.tagline': 'شعار قصير (سطر واحد)',
  'submit.form.description': 'وصف قصير',
  'submit.form.story': 'قصة الشركة بالتفصيل',
  'submit.form.category': 'اختر الفئة',
  'submit.form.stage': 'مرحلة الاستثمار (مثال: Seed, Pre-Seed, Bootstrapped)',
  'submit.form.founded': 'سنة التأسيس',
  'submit.form.location': 'مقر الشركة',
  'submit.form.website': 'رابط الموقع الإلكتروني',
  'submit.form.teamsize': 'حجم الفريق (مثال: 5-10 أشخاص)',
  'submit.form.techstack': 'التقنيات المستخدمة (مفصولة بفاصلة)',
  'submit.form.success': 'تم استلام طلب إضافة شركتك الناشئة! ستظهر على الخريطة بعد موافقة المشرف.',

  // Partner Modal
  'partner.title': 'كن داعماً للمنظومة',
  'partner.form.name': 'اسم المؤسسة / الشركة',
  'partner.form.logo': 'رابط الشعار / الصورة',
  'partner.form.type': 'نوع الداعم',
  'partner.form.type.investor': 'مستثمر / رأس مال مخاطر',
  'partner.form.type.club': 'نادي رياضي / اتحاد',
  'partner.form.type.tech': 'شريك تكنولوجي',
  'partner.form.type.brand': 'راعٍ / علامة تجارية',
  'partner.form.success': 'تم استلام طلب الدعم الخاص بك! سيتم إدراجه بعد موافقة المشرف.',

  // Search Modal
  'search.title': 'محرك بحث المنظومة',
  'search.desc': 'ابحث ديناميكياً عبر الشركات الناشئة، الأخبار، الفئات، والتحليلات.',
  'search.placeholder': 'اكتب كلمات البحث...',
  'search.results': 'النتائج',
  'search.no_results': 'لم تطابق أي نتائج معايير البحث الخاصة بك.',
  'search.type.startup': 'شركة ناشئة',
  'search.type.news': 'أخبار',

  // Admin Portal
  'admin.title': 'تسجيل دخول المشرف',
  'admin.placeholder.password': 'أدخل كلمة مرور الأمان للمشرف',
  'admin.btn.login': 'تسجيل الدخول',
  'admin.error': 'بيانات الاعتماد غير صالحة!',
  'admin.dashboard.title': 'لوحة تحكم المشرف',
  'admin.dashboard.sub': 'إدارة طلبات الشركات الناشئة، وطلبات الداعمين، والأخبار، وقوائم المشتركين.',
  'admin.dashboard.tab.pending': 'الموافقات المعلقة',
  'admin.dashboard.tab.approved': 'الشركات الناشئة المعتمدة',
  'admin.dashboard.tab.partners': 'الداعمون',
  'admin.dashboard.tab.news': 'إدارة الأخبار',
  'admin.dashboard.tab.subscribers': 'المشتركون',
  'admin.dashboard.approve': 'موافقة',
  'admin.dashboard.reject': 'رفض',
  'admin.dashboard.delete': 'حذف',
  'admin.dashboard.edit': 'تعديل',
  'admin.dashboard.add_news': 'إضافة مقال إخباري',
  'admin.dashboard.logout': 'تسجيل الخروج',
};

const TRANSLATIONS: Record<Language, Record<string, string>> = {
  tr: TR_TRANSLATIONS,
  'en-GB': EN_TRANSLATIONS,
  'en-US': EN_TRANSLATIONS,
  ar: AR_TRANSLATIONS,
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('sporttech_lang');
    return (saved === 'en-GB' || saved === 'en-US' || saved === 'ar' || saved === 'tr') ? saved as Language : 'tr';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('sporttech_lang', lang);
  };

  const t = (key: string): string => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS['tr']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
