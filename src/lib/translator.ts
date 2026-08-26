import { Startup, NewsArticle } from '../types';
import { Language } from '../context/LanguageContext';

/**
 * Translates a Startup object into English or Arabic if selected, otherwise returns original (Turkish).
 */
export const translateStartup = (startup: Startup, language: Language): Startup => {
  if (language === 'tr') return startup;

  if (language === 'ar') {
    const translations: Record<string, Partial<Startup>> = {
      fmag: {
        tagLine: "اللينكد إن الرقمي لكرة القدم: دليل الوكلاء واللاعبين المحترفين",
        description: "منصة fmag.tr هي دليل رقمي وشبكة احترافية تجمع اللاعبين والوكلاء والوكالات في تركيا. رقمنة منظومة الانتقالات بأكثر من 380 وكالة و 120,000+ سجل لاعبين.",
        fullStory: "في عالم كرة القدم، لم تعد عمليات الانتقال تقتصر فقط على الأداء في الملعب، بل تعتمد أيضاً على البيانات الرقمية وملفات اللاعبين والشبكات الاحترافية. تبرز fmag.tr كدليل رقمي يجمع معلومات اللاعبين والوكلاء والوكالات في تركيا، لتأسيس بيئة بحثية أكثر سهولة ومنهجية للأندية ومحترفي كرة القدم.",
        location: "إسطنبول",
        categoryName: "الإدارة والمنصة الرقمية",
        stage: "Bootstrapped",
        fundingRaised: "تمويل ذاتي",
        keyMetrics: [
          { label: 'اللاعبين المسجلين', value: '123,000+' },
          { label: 'الوكالات المسجلة', value: '380+' },
          { label: 'المساهمة في الانتقالات', value: '500+' },
          { label: 'الظهور الرقمي', value: 'عالي جداً' }
        ],
        founders: [
          { name: 'فريق fmag.tr', role: 'الفريق التأسيسي' }
        ],
        featuredHighlight: "الدليل الرقمي الأكثر شمولاً لكرة القدم والوكالات في تركيا",
        tags: ['كرة القدم', 'الإدارة', 'البيانات الضخمة', 'الانتقالات', 'الكشافة', 'SaaS']
      },
      mera: {
        tagLine: "منصة ذكاء اصطناعي لتقييم مستويات الجاهزية الأيضية للرياضيين",
        description: "شركة ناشئة لتحليل الأداء الأيضي بما في ذلك اختبارات الأكسجين القصوى VO₂max باستخدام نماذج الشبكات العصبية و Mera AI التفاعلي.",
        fullStory: "مقرها إسطنبول، أطلقت Mera عرضها التجريبي العام لتحليل اختبارات الأداء الأيضي للرياضيين. المنصة مدعومة بحاضنة ITU Seed وبرنامج Innogate، وتعمل على جعل اختبارات الأداء الاحترافية متاحة في جميع النوادي الرياضية واللياقة البدنية.",
        location: "إسطنبول",
        categoryName: "الذكاء الاصطناعي وتحليلات الأداء",
        fundingRaised: "برنامج تسريع ITU Seed & Innogate",
        keyMetrics: [
          { label: 'تكامل الاختبار الأيضي', value: 'VO₂max واللاكتات' },
          { label: 'بنية التحليل', value: 'الشبكات العصبية والذكاء الاصطناعي' },
          { label: 'برامج مسرعات الأعمال', value: 'ITU Seed & Innogate' },
          { label: 'العرض التجريبي التفاعلي', value: 'demo.mera.fit/launch' }
        ],
        founders: [
          { name: 'ديمتري لاريشيف وفريق ميرا', role: 'الفريق التأسيسي والعلوم الرياضية' }
        ],
        featuredHighlight: "منصة Mera AI للمحادثة وتحليل اختبارات VO₂max والتمثيل الغذائي بالشبكات العصبية",
        tags: ['الأداء الأيضي', 'Mera AI', 'اختبار VO₂max', 'الشبكات العصبية', 'ITU Seed', 'Innogate']
      },
      sportsfly: {
        tagLine: "برنامج إدارة سحابي شامل للمؤسسات والمنشآت الرياضية",
        description: "يلبي احتياجات إدارة العضوية، الحضور والغياب، المدربين والموظفين، برامج الولاء والتقارير المالية للصالات الرياضية والأكاديميات.",
        fullStory: "برنامج SportsFly هو حل سحابي لإدارة النوادي الرياضية، الأكاديميات، واستوديوهات اللياقة البدنية واليوغا. يهدف إلى تسريع التحول الرقمي وتحسين تجربة المشتركين من خلال لوحة تحكم واحدة متكاملة.",
        location: "إسطنبول",
        categoryName: "الإدارة والمنصة الرقمية",
        fundingRaised: "بيئة عمل Sporsepeti",
        keyMetrics: [
          { label: 'المنشآت الرياضية النشطة', value: '220+' },
          { label: 'الأعضاء النشطين المدارين', value: '85,000+' },
          { label: 'توفير الوقت التشغيلي', value: '40%' },
          { label: 'سرعة بوابة الدخول', value: 'أقل من ثانية' }
        ],
        founders: [
          { name: 'فريق منتج وبرمجيات SportsFly', role: 'سبورت سيبت لتكنولوجيا الرياضة' }
        ],
        featuredHighlight: "حل متكامل لإدارة الأعضاء والحضور والتقارير للمراكز والأكاديميات الرياضية",
        tags: ['برامج الإدارة الرياضية', 'تتبع الأعضاء', 'أنظمة الحضور', 'إدارة الاستوديوهات', 'SaaS']
      },
      sporpuan: {
        tagLine: "منصة التقييم والآراء المستقلة للمرافق والفعاليات الرياضية في تركيا",
        description: "تساعد عشاق الرياضة من خلال تقييمات حقيقية للمرافق الرياضية والأكاديميات والفعاليات بناءً على النظافة، جودة الأجهزة، والموقع.",
        fullStory: "تعتبر منصة Sporpuan مرجعاً مستقلاً وشفافاً للمهتمين بالرياضة في 81 مدينة تركية لاختيار الصالات والفعاليات الأنسب لهم بناءً على معايير الجودة والتقييمات الموثقة.",
        location: "إسطنبول / 81 مدينة",
        categoryName: "الإدارة والمنصة الرقمية",
        keyMetrics: [
          { label: 'المنشآت المقيمة', value: '1,400+' },
          { label: 'التقييمات الموثقة', value: '18,500+' },
          { label: 'المدن المغطاة', value: '81 مدينة' },
          { label: 'معايير التقييم الموضوعية', value: '12+ معيار' }
        ],
        founders: [
          { name: 'فريق تقنية ومجتمع Sporpuan', role: 'الفريق التأسيسي' }
        ],
        featuredHighlight: "معيار مرجعي مستقل وموثوق لاختيار المرافق والمنشآت الرياضية",
        tags: ['تقييم المرافق', 'تقييمات المستخدمين', 'النظافة والأجهزة', 'الدليل الرياضي']
      }
    };

    const translatedData = translations[startup.id];
    if (translatedData) {
      return {
        ...startup,
        ...translatedData
      } as Startup;
    }
    return startup;
  }

  const translations: Record<string, Partial<Startup>> = {
    fmag: {
      tagLine: "Digital LinkedIn of Football: Professional Agent and Footballer Directory",
      description: "fmag.tr is a digital directory and professional networking platform in Turkey that brings together footballers, agents, and agencies. Digitizing the transfer ecosystem with over 380 agency and 120,000+ player records.",
      fullStory: "In the football world, transfer processes are no longer shaped solely by on-field performance, but also by digital data, player profiles, and professional networks. fmag.tr stands out as a digital directory that compiles footballer, agent, and agency information in Turkey. The platform offers a unified structure showing which player is represented by which agency, various player details, and data about the management ecosystem. Featuring records of over 380 agencies, the platform aims to establish a more accessible and systematic research environment for clubs and football professionals alike.",
      location: "Istanbul",
      categoryName: "Management & Digital Platform",
      stage: "Bootstrapped",
      fundingRaised: "Bootstrapped",
      keyMetrics: [
        { label: 'Registered Footballers', value: '123,000+' },
        { label: 'Registered Agencies', value: '380+' },
        { label: 'Transfer Contribution', value: '500+' },
        { label: 'Digital Visibility', value: 'High' }
      ],
      founders: [
        { name: 'fmag.tr Team', role: 'Founding Team' }
      ],
      featuredHighlight: "Turkey's most comprehensive digital football and agency directory platform",
      tags: ['Football', 'Management', 'Big Data', 'Transfer', 'Scouting', 'SaaS']
    },
    mera: {
      tagLine: "AI Platform Evaluating Athletes' Metabolic Readiness Levels",
      description: "Istanbul-based sport tech startup Mera analyzes metabolic performance data, including VO₂max tests, using neural network models and chat-based Mera AI, making it accessible in every fitness club. Supported by ITU Seed and Innogate.",
      fullStory: "Istanbul-based sport tech startup Mera has launched the public demo version of its platform that analyzes athletes' metabolic performance tests. The startup is backed by the ITU Seed and Innogate acceleration programs.\n\nThe platform integrates data from various metabolic test systems, including VO₂max tests, under a single athlete profile. Data science methods and proprietary neural network models are utilized to determine metabolic thresholds.\n\nMera AI, part of the platform, provides a chat-based conversational interface running on athlete data. Through this interface, users can compare different tests, ask questions about results, and track changes in an athlete's performance indicators over time.\n\nMera is currently being tested alongside performance centers, sports clubs, and university labs. The company aims to launch new pilot studies with elite sports teams and sports/exercise physiology laboratories of universities in the upcoming period.\n\nThe startup's mission is to make the metabolic testing level, which is currently mainly offered to professional athletes and elite teams, accessible in every fitness club.",
      location: "Istanbul",
      categoryName: "AI & Performance Analytics",
      fundingRaised: "ITU Seed & Innogate Acceleration",
      keyMetrics: [
        { label: 'Metabolic Test Integration', value: 'VO₂max & Lactate' },
        { label: 'Analysis Architecture', value: 'Neural Networks & AI' },
        { label: 'Accelerator Programs', value: 'ITU Seed & Innogate' },
        { label: 'Interactive Public Demo', value: 'demo.mera.fit/launch' }
      ],
      founders: [
        { name: 'Dmitry Larichev & Mera Team', role: 'Founding Team & Sport Science' }
      ],
      featuredHighlight: "Mera AI conversational platform analyzing VO₂max and metabolic tests with neural networks",
      tags: ['Metabolic Performance', 'Mera AI', 'VO₂max Test', 'Neural Networks', 'ITU Seed', 'Innogate', 'Exercise Physiology']
    },
    sportsfly: {
      tagLine: "Comprehensive Cloud-Based Management Software for Sports Businesses",
      description: "Meets membership management, attendance, trainer/staff management, loyalty programs, and reporting needs of gyms, academies, fitness/pilates/yoga studios, and tennis academies.",
      fullStory: "SportsFly is a comprehensive management software developed specifically for sports businesses. It fulfills all requirements for member management, check-ins, trainer/staff scheduling, loyalty rewards, and detailed financial reports for gyms, sports schools, fitness/pilates/yoga studios, tennis academies, and similar facilities in a single, unified control panel. The goal: facilitate digital transformation and elevate the member experience.",
      location: "Istanbul",
      categoryName: "Management & Digital Platform",
      fundingRaised: "Sporsepeti Ecosystem",
      keyMetrics: [
        { label: 'Active Sports Businesses', value: '220+' },
        { label: 'Active Managed Members', value: '85,000+' },
        { label: 'Operational Time Savings', value: '40%' },
        { label: 'Gate Access / Pass Speed', value: '< 1 sec' }
      ],
      founders: [
        { name: 'SportsFly Product & Software Team', role: 'Sporsepeti Sports Tech' }
      ],
      featuredHighlight: "Member, attendance, staff, and reporting solution for fitness centers, academies, and studios",
      tags: ['Sports Management Software', 'Member Tracking', 'Attendance System', 'Studio Management', 'Academy Management', 'SaaS']
    },
    sporpuan: {
      tagLine: "Turkey's Independent Rating Platform for Sports Venues and Events",
      description: "Turkey's independent sports facilities and events scoring platform. Guides sports lovers with impartial user reviews, evaluating gyms, sports schools, and events based on objective criteria such as hygiene, equipment, and location.",
      fullStory: "Sporpuan is Turkey's independent sports facilities and events grading and review platform. It ranks gyms, sports schools, and events based on objective factors like cleanliness, equipment state, and location. Guided by unbiased user feedback, the portal aims to be a transparent and reliable reference standard for gym selection.",
      location: "Istanbul / 81 Cities",
      categoryName: "Management & Digital Platform",
      keyMetrics: [
        { label: 'Rated Venues', value: '1,400+' },
        { label: 'Verified User Reviews', value: '18,500+' },
        { label: 'Cities Covered', value: '81 Cities' },
        { label: 'Objective Evaluation Criteria', value: '12+ Parameters' }
      ],
      founders: [
        { name: 'Sporpuan Community & Tech Team', role: 'Founding Team' }
      ],
      featuredHighlight: "Transparent, independent, and trusted reference standard for sports venue selection",
      tags: ['Venue Rating', 'User Reviews', 'Hygiene & Equipment', 'Sports Directory', 'Transparent References']
    }
  };

  const translatedData = translations[startup.id];
  if (translatedData) {
    return {
      ...startup,
      ...translatedData
    } as Startup;
  }

  return startup;
};

/**
 * Translates a NewsArticle object into English or Arabic if selected, otherwise returns original (Turkish).
 */
export const translateNewsArticle = (article: NewsArticle, language: Language): NewsArticle => {
  if (language === 'tr') return article;

  if (language === 'ar') {
    const translations: Record<string, Partial<NewsArticle>> = {
      'fmag-tr-dijital-stadyum-vizyonu-ve-profesyonel-aglar': {
        title: "fmag.tr: الوجه الرقمي لكرة القدم الاحترافية وشبكة البيانات المتوسعة",
        excerpt: "أكبر دليل للوكلاء واللاعبين في تركيا، fmag.tr، يوسع بنيته التحتية لربط الأندية والوكالات برؤية الملعب الرقمي.",
        content: [
          "تشهد منظومة كرة القدم التركية تحولاً رقمياً كبيراً مدعوماً بحلول تحليل البيانات العميقة والشبكات المهنية من fmag.tr. من خلال توفير خدماته لأكثر من 120,000 لاعب مسجل وأكثر من 380 وكالة وكلاء نشطة، يلعب الموقع دوراً حاسماً في زيادة الشفافية في عمليات الانتقال.",
          "تحت مظلة رؤية 'الملعب الرقمي' التي تم الإعلان عنها مؤخراً، تتطور التفاعلات بين الوكلاء والأندية من مجرد استعلامات بسيطة في قاعدة البيانات إلى تجربة تواصل اجتماعي مهنية غامرة. تعزز هذه البيئة ملفات اللاعبين ليس فقط بإحصائيات المباريات ولكن أيضاً بالانتماءات الوكالية النشطة والمستقبل المهني.",
          "تتيح البنية التكنولوجية الخلفية لمجموعات الكشافين إجراء عمليات بحث في الوقت الفعلي وفقاً لمعايير محددة. أصبحت fmag.tr أداة أساسية لاكتشاف المواهب الخفية في الدرجات الدنيا وتسريع عقود الاحتراف.",
          "يخطط الفريق التأسيسي لـ fmag.tr لدمج نماذج التنبؤ بالأداء المدعومة بالذكاء الاصطناعي في المنصة في المستقبل القريب لمساعدة اللاعبين في التخطيط لمسيرتهم المهنية ببيانات دقيقة."
        ],
        categoryName: "المنظومة والمنصة",
        author: {
          name: 'مكتب أبحاث تكنولوجيا الرياضة',
          role: 'محرر الاستراتيجية والمنظومة',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80'
        },
        readTime: 'قراءة في 6 دقائق',
        tags: ['fmag.tr', 'وكيل كرة قدم', 'بيانات الانتقالات', 'نظام الكشافين', 'التحول الرقمي', 'الذكاء الاصطناعي']
      },
      'fmag-futbolun-gelecegi-verinin-icinde-sakli': {
        title: "المفضل الجديد للوكلاء: مستقبل كرة القدم يكمن في البيانات",
        excerpt: "تتشكل عمليات الانتقال في كرة القدم من خلال السجلات الرقمية والشبكات المهنية. تبرز fmag.tr كأول دليل يجمع معلومات اللاعبين والوكلاء في تركيا.",
        content: [
          "لم تعد انتقالات كرة القدم موجهة فقط بما يحدث على أرض الملعب، بل أصبحت المقاييس الرقمية، وملفات اللاعبين، وشبكات الوكالات هي المحرك الأساسي. تستخدم الأندية والكشافة والوكلاء قواعد بيانات شاملة لاكتشاف اللاعب المثالي بسرعة وسهولة.",
          "ظهرت fmag.tr كدليل حاسم لربط اللاعبين والوكلاء وقوائم الوكالات في تركيا. تدرج المنصة تمثيل اللاعبين والبيانات الحيوية ومقاييس الوكلاء في بنية مركزية وسهلة الاستخدام.",
          "تضم الشبكة سجلات لأكثر من 380 وكالة كرة قدم، مما يعزز بيئة بحثية منهجية للأندية ومحترفي كرة القدم. يحتوي الدليل حالياً على ملفات لأكثر من 123,000 لاعب.",
          "تحليلات كرة القدم الحديثة تتجاوز بكثير إحصاءات المباريات البسيطة. يعد التاريخ الرياضي للاعب ومسيرته المهنية وقيمه السوقية وسجلات تمثيله محركات قرار حيوية. ساعدت fmag.tr بنشاط في أكثر من 500 مسار انتقال حتى الآن.",
          "وفقاً لمحللي مكتب الذكاء الاصطناعي في تركيا، تظهر منصات مثل fmag.tr إمكانات هائلة لرفع حجم استخدام البيانات الضخمة والذكاء الاصطناعي في الرياضة. شبكات الكشافين المستقبلية تتشكل عبر الخوارزميات والأدلة الرقمية."
        ],
        categoryName: "المنظومة والمنصة",
        author: {
          name: 'مكتب أبحاث تكنولوجيا الرياضة',
          role: 'محرر الاستراتيجية والمنظومة',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80'
        },
        readTime: 'قراءة في 5 دقائق',
        tags: ['fmag.tr', 'وكيل كرة قدم', 'بيانات الانتقالات', 'نظام الكشافين', 'التحول الرقمي', 'الذكاء الاصطناعي']
      },
      'mera-metabolik-hazir-olus-platformu-public-demo': {
        title: "ميرا تطلق العرض التجريبي العام لنظام تقييم الجاهزية الأيضية للرياضيين",
        excerpt: "أطلقت شركة تكنولوجيا الرياضة Mera ومقرها إسطنبول النسخة التجريبية العامة لمجموعة تحليل الأداء الأيضي الرياضي. بدعم من ITU Seed و Innogate.",
        content: [
          "أطلقت شركة تكنولوجيا الرياضة Mera ومقرها إسطنبول النسخة التجريبية العامة لمنصتها التي تحلل اختبارات الأداء الأيضي للرياضيين. الشركة مدعومة ببرامج تسريع الأعمال ITU Seed و Innogate.",
          "تدمج المنصة البيانات من أنظمة الاختبار الأيضي المختلفة، بما في ذلك اختبارات VO₂max، تحت ملف رياضي موحد. تُستخدم أساليب علم البيانات ونماذج الشبكات العصبية المملوكة للشركة لتحديد العتبات الأيضية.",
          "يوفر نظام Mera AI، وهو جزء من المنصة، واجهة محادثة قائمة على الدردشة تعمل على بيانات الرياضيين. من خلال هذه الواجهة، يمكن للمستخدمين مقارنة الاختبارات المختلفة، وطرح الأسئلة حول النتائج، وتتبع المؤشرات بمرور الوقت.",
          "يتم اختبار Mera حالياً جنباً إلى جنب مع مراكز الأداء والأندية الرياضية والمختبرات الجامعية، بهدف إطلاق دراسات تجريبية جديدة مع فرق رياضية نخبوية ومختبرات فسيولوجيا الرياضة والتمارين الرياضية.",
          "مهمة الشركة الناشئة هي جعل مستوى الاختبار الأيضي، المتاح حالياً بشكل أساسي للرياضيين المحترفين والفرق النخبوية، متاحاً في كل نادٍ رياضي ولياقة بدنية."
        ],
        categoryName: "الذكاء الاصطناعي والأداء",
        author: {
          name: 'مكتب أبحاث تكنولوجيا الرياضة',
          role: 'محرر الأداء والميكانيكا الحيوية',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
        },
        readTime: 'قراءة في 4 دقائق',
        tags: ['Mera', 'Mera AI', 'VO₂max', 'الأداء الأيضي', 'الشبكات العصبية', 'ITU Seed', 'Innogate']
      },
      'sporsepeti-dijital-spor-ekosistemi-donusumu': {
        title: "سبورت سيبت ترقمن منظومة الرياضة التركية بخدمات متكاملة",
        excerpt: "تؤسس شركة سبورت سيبت لتكنولوجيا الرياضة جسوراً رقمية متكاملة للأندية والمنشآت الرياضية وعشاق اللياقة البدنية من خلال منصتها السحابية SportsFly وموسوعتها الشاملة.",
        content: [
          "تعمل شركة سبورت سيبت لتكنولوجيا الرياضة برؤية مبتكرة في قطاع تكنولوجيا الرياضة في تركيا، وتقف في مركز المنظومة بمجموعة متكاملة تمكن الأفراد من اكتشاف الرياضة وإدارتها ونشرها.",
          "تحت هذه المظلة، يعمل برنامج إدارة SportsFly على تحسين سير العمل اليومي للأندية والأكاديميات والاستوديوهات الرياضية، بينما تغطي المكتبة الرياضية أكثر من 50 فئة رياضية لتوجيه الهواة من جميع الأعمار.",
          "بهدف تسريع رقمنة الأندية والمرافق، تدمج سبورت سيبت الرحلة الرياضية بأكملها - بدءاً من تتبع الأعضاء إلى جدولة التدريب واستكشاف المرافق - تحت مركز رقمي واحد."
        ],
        categoryName: "المنظومة والمنصة",
        author: {
          name: 'جانير أكتاس',
          role: 'محلل رئيسي لتكنولوجيا الرياضة',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
        },
        readTime: 'قراءة في 4 دقائق',
        tags: ['Sporsepeti', 'المنظومة الرياضية', 'SportsFly', 'المكتبة الرياضية', 'التحول الرقمي']
      },
      'sportsfly-spor-isletmeleri-yonetim-yazilimi-basarisi': {
        title: "ثورة الإدارة الرقمية في الصالات والأكاديميات الرياضية عبر SportsFly",
        excerpt: "تحقق الصالات الرياضية والمدارس التدريبية واستوديوهات اللياقة البدنية وأكاديميات التنس كفاءة تشغيلية بنسبة 40% من خلال نقل أعمالها إلى منصة SportsFly السحابية.",
        content: [
          "تم الآن رقمنة سجلات الأعضاء اليدوية، ودفاتر الحضور الورقية، وجدولة الموظفين المجزأة - وهي بعض من أكبر التحديات الإدارية للمؤسسات الرياضية - بالكامل بفضل واجهة SportsFly سهلة الاستخدام والبنية السحابية القوية.",
          "تم تصميم المجموعة خصيصاً لمراكز اللياقة البدنية والمدارس الرياضية واستوديوهات اليوغا والبيلاطس وأكاديميات التنس، وهي تتيح إدارة باقات العضوية وحملات الولاء وشبكات الدخول المتكاملة بالبوابات والتحليلات المالية الفورية من لوحة تحكم واحدة.",
          "تقلل SportsFly العبء الإداري وتزيد من رضا العملاء، حيث يثق بها أكثر من 220 مرفقاً رياضياً نشطاً وتدير أكثر من 85,000 عضو نشط في جميع أنحاء تركيا."
        ],
        categoryName: "برمجيات الإدارة",
        author: {
          name: 'د. سيلين بوزكورت',
          role: 'باحثة في الإدارة والمعلوماتية الرياضية',
          avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80'
        },
        readTime: 'قراءة في 5 دقائق',
        tags: ['SportsFly', 'برمجيات الإدارة الرياضية', 'تتبع الأعضاء', 'SaaS', 'إدارة الاستوديوهات']
      },
      'sporpuan-turkiyenin-bagimsiz-spor-tesisleri-puanlama-platformu': {
        title: "سبوربوان: إطلاق المنصة المستقلة لتقييم المنشآت والمرافق الرياضية في تركيا",
        excerpt: "تقييم مراكز اللياقة البدنية والمدارس والأنشطة بحسب معايير النظافة وجودة الأجهزة والموقع الجغرافي، لتوجه المنصة عشاق الرياضة في 81 مدينة بآراء وتقييمات موثقة من المجتمع.",
        content: [
          "تمت تلبية الحاجة إلى معيار مرجعي مستقل وشفاف لعشاق الرياضة الذين يبحثون عن نوادٍ أو أكاديميات أو فعاليات رياضية بالكامل من خلال منصة سبوربوان (sporpuan.com).",
          "تصنف البوابة المرافق بناءً على أكثر من 12 معياراً موضوعياً، بما في ذلك معايير النظافة، وحداثة الأجهزة، وملاءمة غرف تبديل الملابس، ومؤهلات المدربين، وموقع الوصول، مما يتيح للمستخدمين اتخاذ القرارات الأكثر استنارة.",
          "من خلال تعزيز الثقة عبر مراجعات العملاء المعتمدة، تعمل سبوربوان أيضاً كمعيار مرجعي مرموق يؤكد جودة الخدمة للمؤسسات والشركات الرياضية."
        ],
        categoryName: "تقييم المرافق ودليلها",
        author: {
          name: 'بيرك يلدريم',
          role: 'محلل الشركات الناشئة وتكنولوجيا الرياضة',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
        },
        readTime: 'قراءة في 4 دقائق',
        tags: ['Sporpuan', 'تقييم المرافق', 'النظافة والأجهزة', 'المراجع الشفافة']
      }
    };

    const translatedData = translations[article.id];
    if (translatedData) {
      return {
        ...article,
        ...translatedData
      } as NewsArticle;
    }
    return article;
  }

  const translations: Record<string, Partial<NewsArticle>> = {
    'fmag-tr-dijital-stadyum-vizyonu-ve-profesyonel-aglar': {
      title: "fmag.tr: The Digital Face of Professional Football and the Expanding Data Network",
      excerpt: "Turkey's most comprehensive agent and footballer directory, fmag.tr, is scaling its infrastructure to connect clubs and agencies with a digital stadium vision.",
      content: [
        "The Turkish football ecosystem is undergoing a major digital transformation powered by fmag.tr's deep-dive data analysis and professional networking solutions. Serving over 120,000 footballer entries and more than 380 active agent agencies, the portal plays a critical role in increasing transparency in transfer transactions.",
        "Under the newly announced 'Digital Stadium' vision, interactions between agents and clubs evolve from simple database queries into an immersive professional social networking experience. This framework enriches player profiles with not only match statistics but also active agency affiliations and career projections.",
        "The technological backend enables scout groups to perform real-time lookups according to target parameters. fmag.tr has become an essential companion for discovering hidden gems in lower tiers and accelerating professional contract flows.",
        "The fmag.tr founding team plans to embed AI-powered performance projection models into the platform in the near future. This will support footballers' career planning with data-backed foresight."
      ],
      categoryName: "Ecosystem & Platform",
      author: {
        name: 'SportTech Research Desk',
        role: 'Ecosystem & Strategy Editor',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80'
      },
      readTime: '6 min read',
      tags: ['fmag.tr', 'Football Agent', 'Transfer Data', 'Scout System', 'Digital Shift', 'AI']
    },
    'fmag-futbolun-gelecegi-verinin-icinde-sakli': {
      title: "Agents' New Favorite fmag: The Future of Football is Locked in Data",
      excerpt: "Transfer processes in football are shaped by digital records and professional networks. fmag.tr stands out as Turkey's premier index compiling footballer and agent information.",
      content: [
        "Football transfers are no longer guided purely by on-pitch activities. Digital metrics, athlete profiles, and agency networks are leading the charge. Clubs, scouts, and agents utilize comprehensive data pools to discover the perfect player quickly.",
        "fmag.tr has emerged as the definitive index for connecting players, agents, and agency listings in Turkey. The platform lists player representations, bio details, and agent metrics within a centralized, easy-to-use structure.",
        "Featuring records of over 380 football agencies, the network fosters a systematic research environment for clubs and football professionals. The index currently boasts profiles of more than 123,000 players.",
        "Modern football analytics goes far beyond basic game stats. An athlete's historic performance, career steps, market values, and representation records are crucial decision drivers. According to fmag.tr insights, the platform has actively aided over 500 transfer paths to date.",
        "According to AI Office Turkey analysts, platforms like fmag.tr showcase substantial potential for scaling big data and AI utilization in sport verticals. The scouting networks of tomorrow are taking shape via algorithms and digital directories."
      ],
      categoryName: "Ecosystem & Platform",
      author: {
        name: 'SportTech Research Desk',
        role: 'Ecosystem & Strategy Editor',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80'
      },
      readTime: '5 min read',
      tags: ['fmag.tr', 'Football Agent', 'Transfer Data', 'Scout System', 'Digital Shift', 'AI']
    },
    'mera-metabolik-hazir-olus-platformu-public-demo': {
      title: "Mera Releases Public Demo of Athlete Metabolic Readiness Assessment System",
      excerpt: "Istanbul-based sport tech startup Mera has published the public demo version of its athletic metabolic performance analysis suite. Backed by ITU Seed and Innogate.",
      content: [
        "Istanbul-based sport tech startup Mera has launched the public demo version of its platform that analyzes athletes' metabolic performance tests. The startup is backed by the ITU Seed and Innogate programs.",
        "The platform integrates data from various metabolic test systems, including VO₂max tests, under a single athlete profile. Data science methods and proprietary neural network models are utilized to determine metabolic thresholds.",
        "Mera AI, part of the platform, provides a chat-based conversational interface running on athlete data. Through this interface, users can compare different tests, ask questions about results, and track changes in an athlete's performance indicators over time.",
        "Mera is currently being tested alongside performance centers, sports clubs, and university labs. The company aims to launch new pilot studies with elite sports teams and sports/exercise physiology laboratories of universities in the upcoming period.",
        "The startup's mission is to make the metabolic testing level, which is currently mainly offered to professional athletes and elite teams, accessible in every fitness club."
      ],
      categoryName: "AI & Performance",
      author: {
        name: 'SportTech Research Desk',
        role: 'Performance & Biomechanics Editor',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
      },
      readTime: '4 min read',
      tags: ['Mera', 'Mera AI', 'VO₂max', 'Metabolic Performance', 'Neural Networks', 'ITU Seed', 'Innogate']
    },
    'sporsepeti-dijital-spor-ekosistemi-donusumu': {
      title: "Sporsepeti Digitalizes Turkish Sports Ecosystem with Integrated Services",
      excerpt: "Sporsepeti Sports Technologies establishes end-to-end digital bridges for clubs, sports businesses, and fitness lovers with its SportsFly cloud platform and a comprehensive Sports Library.",
      content: [
        "Operating with an innovative vision in Turkey's sports technology vertical, Sporsepeti Sports Technologies Ltd. stands at the center of the ecosystem with an integrated suite enabling people to discover, manage, and popularize sports.",
        "Under the corporate umbrella, SportsFly management software optimizes the daily workflows of fitness clubs, academies, and studios, while the Sports Library covers over 50 sports categories to guide enthusiasts of all ages.",
        "Aimed at accelerating the digitalization of clubs and venues, Sporsepeti merges the entire sports journey—ranging from member tracking to training scheduling, and facility exploration—under a single digital hub."
      ],
      categoryName: "Ecosystem & Platform",
      author: {
        name: 'Caner Aktas',
        role: 'Chief SportTech Analyst',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
      },
      readTime: '4 min read',
      tags: ['Sporsepeti', 'Sports Ecosystem', 'SportsFly', 'Sports Library', 'Digital Shift']
    },
    'sportsfly-spor-isletmeleri-yonetim-yazilimi-basarisi': {
      title: "Digital Management Revolution in Gyms and Academies via SportsFly",
      excerpt: "Gyms, training schools, fitness/pilates/yoga studios, and tennis academies achieve 40% operational efficiency by moving their workflows to the SportsFly cloud panel.",
      content: [
        "Manual member records, paper check-ins, and fragmented staff scheduling—some of the biggest administrative challenges for sports businesses—are now fully digitalized thanks to SportsFly's user-friendly interface and robust cloud architecture.",
        "Specially designed for fitness centers, sport schools, pilates/yoga studios, and tennis academies, the suite enables membership packages, loyalty campaigns, QR/gate-integrated check-in networks, and instant financial analytics from a single dashboard.",
        "SportsFly minimizes administrative overhead and increases customer satisfaction, trusted by more than 220 active sports venues and managing over 85,000 active members across Turkey."
      ],
      categoryName: "Management Software",
      author: {
        name: 'Dr. Selin Bozkurt',
        role: 'Sports Admin & Informatics Researcher',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80'
      },
      readTime: '5 min read',
      tags: ['SportsFly', 'Sports Management Software', 'Member Tracking', 'SaaS', 'Studio Admin']
    },
    'sporpuan-turkiyenin-bagimsiz-spor-tesisleri-puanlama-platformu': {
      title: "Sporpuan: Turkey's Independent Rating Platform for Sports Facilities Launched",
      excerpt: "Evaluating fitness centers, schools, and activities by cleanliness, equipment quality, and location standards, Sporpuan guides sports enthusiasts in 81 cities with verified community reviews.",
      content: [
        "The need for an independent, transparent reference standard for sports enthusiasts looking for sports clubs, academies, or events is fully answered by the Sporpuan (sporpuan.com) platform.",
        "The portal ranks facilities based on over 12 objective parameters, including hygiene criteria, equipment modernity, locker room convenience, trainer qualifications, and access location, enabling users to make the most informed choices.",
        "Fostering trust via verified client reviews, Sporpuan also serves as a prestigious reference standard that validates service quality for businesses."
      ],
      categoryName: "Venue Review & Guide",
      author: {
        name: 'Berk Yildirim',
        role: 'Sports Tech & Startup Analyst',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
      },
      readTime: '4 min read',
      tags: ['Sporpuan', 'Venue Review', 'Cleanliness & Equipment', 'Transparent References']
    }
  };

  const translatedData = translations[article.id];
  if (translatedData) {
    return {
      ...article,
      ...translatedData
    } as NewsArticle;
  }

  return article;
};
