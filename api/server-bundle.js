// api/_server.ts
import express from "express";
import path from "path";
import fs from "fs";

// src/data/startups.ts
var STARTUPS = [
  {
    id: "fmag",
    name: "fmag.tr",
    tagLine: "Futbolun Dijital LinkedIn'i: Profesyonel Menajerlik ve Futbolcu Dizini",
    description: "fmag.tr, T\xFCrkiye\u2019de futbolcu, menajer ve ajans bilgilerini bir araya getiren dijital bir dizin ve profesyonel a\u011F platformudur. 380\u2019in \xFCzerinde ajans ve 120 binden fazla futbolcu verisiyle transfer ekosistemini dijitalle\u015Ftiriyor.",
    fullStory: "Futbol d\xFCnyas\u0131nda transfer s\xFCre\xE7leri art\u0131k yaln\u0131zca saha i\xE7indeki performansla de\u011Fil, dijital veriler, oyuncu profilleri ve profesyonel a\u011Flarla da \u015Fekilleniyor. fmag.tr, T\xFCrkiye\u2019de futbolcu, menajer ve ajans bilgilerini bir araya getiren dijital bir dizin olarak \xF6ne \xE7\u0131k\u0131yor. Platformda hangi oyuncunun hangi ajans taraf\u0131ndan temsil edildi\u011Fi, oyunculara ili\u015Fkin \xE7e\u015Fitli bilgiler ve menajerlik ekosistemine dair veriler tek bir yap\u0131 i\xE7erisinde sunuluyor. 380\u2019in \xFCzerinde ajans kayd\u0131n\u0131n yer ald\u0131\u011F\u0131 platform, kul\xFCpler ve futbol profesyonelleri a\xE7\u0131s\u0131ndan daha eri\u015Filebilir ve sistematik bir ara\u015Ft\u0131rma ortam\u0131 olu\u015Fturmay\u0131 hedefliyor.",
    logo: "/fmag-logo.png",
    coverImage: "/fmag-cover.jpg",
    category: "management_platform",
    categoryName: "Y\xF6netim & Dijital Platform",
    stage: "Bootstrapped",
    foundedYear: 2022,
    location: "\u0130stanbul",
    website: "https://fmag.tr",
    teamSize: "10-15 Ki\u015Fi",
    fundingRaised: "Bootstrapped",
    techStack: ["Big Data", "Search Algorithms", "Cloud Architecture", "Digital Identity Management"],
    keyMetrics: [
      { label: "Kay\u0131tl\u0131 Futbolcu", value: "123,000+" },
      { label: "Kay\u0131tl\u0131 Ajans", value: "380+" },
      { label: "Transfer Katk\u0131s\u0131", value: "500+" },
      { label: "Dijital G\xF6r\xFCn\xFCrl\xFCk", value: "Y\xFCksek" }
    ],
    founders: [
      { name: "fmag.tr Ekibi", role: "Kurucu Ekip" }
    ],
    contactEmail: "info@fmag.tr",
    isFeatured: true,
    featuredHighlight: "T\xFCrkiye\u2019nin en kapsaml\u0131 dijital futbolcu ve menajerlik dizini platformu",
    tags: ["Futbol", "Menajerlik", "Big Data", "Transfer", "Scouting", "SaaS"]
  },
  {
    id: "mera",
    name: "Mera",
    tagLine: "Sporcular\u0131n Metabolik Haz\u0131r Olu\u015F D\xFCzeyini De\u011Ferlendiren Yapay Zeka Platformu",
    description: "\u0130stanbul merkezli sport tech giri\u015Fimi Mera, VO\u2082max testleri dahil metabolik performans verilerini sinir a\u011F\u0131 modelleri ve sohbet tabanl\u0131 Mera AI aray\xFCz\xFCyle analiz ederek her fitness kul\xFCb\xFCnde eri\u015Filebilir k\u0131l\u0131yor. \u0130T\xDC Seed ve Innogate programlar\u0131 taraf\u0131ndan destekleniyor.",
    fullStory: "\u0130stanbul merkezli sport tech giri\u015Fimi Mera, sporcular\u0131n metabolik performans testlerini analiz eden platformunun public demo s\xFCr\xFCm\xFCn\xFC kullan\u0131ma a\xE7t\u0131. Giri\u015Fim, \u0130T\xDC Seed ve Innogate programlar\u0131 taraf\u0131ndan destekleniyor.\n\nPlatform, VO\u2082max testleri de dahil olmak \xFCzere farkl\u0131 metabolik test sistemlerinden gelen verileri tek bir sporcu profili alt\u0131nda birle\u015Ftiriyor. Metabolik e\u015Fiklerin belirlenmesinde veri bilimi y\xF6ntemleri ve \u015Firkete \xF6zel geli\u015Ftirilmi\u015F sinir a\u011F\u0131 modelleri kullan\u0131l\u0131yor.\n\nPlatformun bir par\xE7as\u0131 olan Mera AI ise sporcu verileri \xFCzerinde \xE7al\u0131\u015Fan sohbet tabanl\u0131 bir aray\xFCz sunuyor. Bu aray\xFCz \xFCzerinden kullan\u0131c\u0131lar farkl\u0131 testleri kar\u015F\u0131la\u015Ft\u0131rabiliyor, sonu\xE7lara ili\u015Fkin sorular sorabiliyor ve sporcunun performans g\xF6stergelerinin zaman i\xE7indeki de\u011Fi\u015Fimini takip edebiliyor.\n\nMera \u015Fu anda performans merkezleri, spor kul\xFCpleri ve \xFCniversite laboratuvarlar\u0131yla birlikte test ediliyor. \u015Eirket, \xF6n\xFCm\xFCzdeki d\xF6nemde \xF6zellikle elit spor tak\u0131mlar\u0131 ile \xFCniversitelerin spor ve egzersiz fizyolojisi laboratuvarlar\u0131yla yeni pilot \xE7al\u0131\u015Fmalar ba\u015Flatmay\u0131 hedefliyor.\n\nGiri\u015Fimin misyonu, bug\xFCn a\u011F\u0131rl\u0131kl\u0131 olarak profesyonel sporculara ve elit tak\u0131mlara sunulan metabolik test seviyesini her fitness kul\xFCb\xFCnde eri\u015Filebilir hale getirmek.",
    logo: "/mera-logo.svg",
    coverImage: "/mera-cover.svg",
    category: "ai_analytics",
    categoryName: "Yapay Zeka & Performans Analiti\u011Fi",
    stage: "Seed",
    foundedYear: 2023,
    location: "\u0130stanbul",
    website: "https://mera.fit",
    teamSize: "8 Ki\u015Fi",
    fundingRaised: "\u0130T\xDC Seed & Innogate H\u0131zland\u0131rma",
    techStack: ["Python", "PyTorch / Neural Networks", "FastAPI", "React", "TypeScript", "Tailwind CSS", "VO\u2082max Sensors", "Mera AI LLM"],
    keyMetrics: [
      { label: "Metabolik Test Entegrasyonu", value: "VO\u2082max & Laktat" },
      { label: "Analiz Mimarisi", value: "Sinir A\u011Flar\u0131 & AI" },
      { label: "H\u0131zland\u0131r\u0131c\u0131 Programlar", value: "\u0130T\xDC Seed & Innogate" },
      { label: "\u0130nteraktif Public Demo", value: "demo.mera.fit/launch" }
    ],
    founders: [
      { name: "Dmitry Larichev & Mera Ekibi", role: "Kurucu Ekip & Spor Bilimi" }
    ],
    contactEmail: "hello@mera.fit",
    isFeatured: true,
    featuredHighlight: "VO\u2082max ve metabolik testleri sinir a\u011Flar\u0131yla analiz eden sohbet tabanl\u0131 Mera AI platformu",
    tags: ["Metabolik Performans", "Mera AI", "VO\u2082max Testi", "Sinir A\u011Flar\u0131", "\u0130T\xDC Seed", "Innogate", "Egzersiz Fizyolojisi"]
  },
  {
    id: "sportsfly",
    name: "SportsFly",
    tagLine: "Spor \u0130\u015Fletmeleri \u0130\xE7in Kapsaml\u0131 Bulut Tabanl\u0131 Y\xF6netim Yaz\u0131l\u0131m\u0131",
    description: "Spor salonlar\u0131, spor okullar\u0131, fitness/pilates/yoga st\xFCdyolar\u0131 ve tenis akademilerinin \xFCye y\xF6netimi, yoklama, e\u011Fitmen/personel y\xF6netimi, sadakat programlar\u0131 ve raporlama ihtiya\xE7lar\u0131n\u0131 tek bir panelden kar\u015F\u0131l\u0131yor. Ama\xE7: i\u015Fletmelerin dijital d\xF6n\xFC\u015F\xFCm\xFCn\xFC kolayla\u015Ft\u0131r\u0131p \xFCye deneyimini iyile\u015Ftirmek.",
    fullStory: "SportsFly, spor i\u015Fletmeleri i\xE7in geli\u015Ftirilmi\u015F kapsaml\u0131 bir y\xF6netim yaz\u0131l\u0131m\u0131d\u0131r. Spor salonlar\u0131, spor okullar\u0131, fitness/pilates/yoga st\xFCdyolar\u0131, tenis akademileri ve benzeri tesislerin \xFCye y\xF6netimi, yoklama, e\u011Fitmen/personel y\xF6netimi, sadakat programlar\u0131 ve raporlama ihtiya\xE7lar\u0131n\u0131 tek bir panelden kar\u015F\u0131l\u0131yor. Ama\xE7: i\u015Fletmelerin dijital d\xF6n\xFC\u015F\xFCm\xFCn\xFC kolayla\u015Ft\u0131r\u0131p \xFCye deneyimini iyile\u015Ftirmek.",
    logo: "/sportsfly-logo.svg",
    coverImage: "/sportsfly-tablet-app.svg",
    category: "management_platform",
    categoryName: "Y\xF6netim & Dijital Platform",
    stage: "Bootstrapped",
    foundedYear: 2022,
    location: "\u0130stanbul",
    website: "https://sporsepeti.com.tr/sportsfly",
    teamSize: "15 Ki\u015Fi",
    fundingRaised: "Sporsepeti Ekosistemi",
    techStack: ["TypeScript", "React", "NestJS", "PostgreSQL", "Redis", "Docker", "\xD6deme Entegrasyonlar\u0131"],
    keyMetrics: [
      { label: "Aktif Spor \u0130\u015Fletmesi", value: "220+" },
      { label: "Y\xF6netilen Aktif \xDCye", value: "85,000+" },
      { label: "Operasyonel Zaman Tasarrufu", value: "%40" },
      { label: "Yoklama & Ge\xE7i\u015F H\u0131z\u0131", value: "< 1 sn" }
    ],
    founders: [
      { name: "SportsFly \xDCr\xFCn & Yaz\u0131l\u0131m Ekibi", role: "Sporsepeti Spor Teknolojileri" }
    ],
    contactEmail: "sportsfly@sporsepeti.com.tr",
    isFeatured: true,
    featuredHighlight: "Spor salonlar\u0131, akademiler ve st\xFCdyolar i\xE7in \xFCye, yoklama, personel ve raporlama \xE7\xF6z\xFCm\xFC",
    tags: ["Spor Y\xF6netim Yaz\u0131l\u0131m\u0131", "\xDCye Takibi", "Yoklama Sistemi", "St\xFCdyo Y\xF6netimi", "Akademi Y\xF6netimi", "SaaS"]
  },
  {
    id: "sporpuan",
    name: "Sporpuan",
    tagLine: "T\xFCrkiye'nin Ba\u011F\u0131ms\u0131z Spor Tesisleri ve Etkinlikleri Puanlama Platformu",
    description: "T\xFCrkiye'nin ba\u011F\u0131ms\u0131z spor tesisleri ve etkinlikleri puanlama platformu. Spor salonlar\u0131n\u0131, spor okullar\u0131n\u0131 ve etkinlikleri hijyen, ekipman ve lokasyon gibi objektif kriterlere g\xF6re de\u011Ferlendirip tarafs\u0131z kullan\u0131c\u0131 yorumlar\u0131yla sporseverlere rehberlik ediyor. Hedef: tesis se\xE7iminde \u015Feffaf ve g\xFCvenilir bir referans kayna\u011F\u0131 olmak.",
    fullStory: "Sporpuan, T\xFCrkiye'nin ba\u011F\u0131ms\u0131z spor tesisleri ve etkinlikleri puanlama platformudur. Spor salonlar\u0131n\u0131, spor okullar\u0131n\u0131 ve etkinlikleri hijyen, ekipman ve lokasyon gibi objektif kriterlere g\xF6re de\u011Ferlendirip tarafs\u0131z kullan\u0131c\u0131 yorumlar\u0131yla sporseverlere rehberlik ediyor. Hedef: tesis se\xE7iminde \u015Feffaf ve g\xFCvenilir bir referans kayna\u011F\u0131 olmak.",
    logo: "/sporpuan-logo.svg",
    coverImage: "/sporpuan-map-v2.svg",
    category: "management_platform",
    categoryName: "Y\xF6netim & Dijital Platform",
    stage: "Bootstrapped",
    foundedYear: 2023,
    location: "\u0130stanbul / 81 \u0130l",
    website: "https://sporpuan.com",
    teamSize: "8 Ki\u015Fi",
    fundingRaised: "Bootstrapped",
    techStack: ["Next.js", "Tailwind CSS", "Node.js", "PostgreSQL", "Algolia Search", "Cloudflare"],
    keyMetrics: [
      { label: "Puanlanan Tesis", value: "1,400+" },
      { label: "Do\u011Frulanm\u0131\u015F Kullan\u0131c\u0131 Yorumu", value: "18,500+" },
      { label: "Kapsanan \u015Eehir", value: "81 \u0130l" },
      { label: "Objektif De\u011Ferlendirme Kriteri", value: "12+ Parametre" }
    ],
    founders: [
      { name: "Sporpuan Topluluk & Teknoloji Ekibi", role: "Kurucu Ekip" }
    ],
    contactEmail: "info@sporpuan.com",
    isFeatured: true,
    featuredHighlight: "Tesis se\xE7iminde \u015Feffaf, ba\u011F\u0131ms\u0131z ve g\xFCvenilir referans kayna\u011F\u0131",
    tags: ["Tesis Puanlama", "Kullan\u0131c\u0131 Yorumlar\u0131", "Hijyen & Ekipman", "Spor Rehberi", "\u015Eeffaf Referans"]
  }
];

// src/data/news.ts
var NEWS_ARTICLES = [
  {
    id: "fmag-tr-dijital-stadyum-vizyonu-ve-profesyonel-aglar",
    title: "fmag.tr: Profesyonel Futbolun Dijitalle\u015Fen Y\xFCz\xFC ve Geni\u015Fleyen Veri A\u011F\u0131",
    slug: "fmag-tr-dijital-stadyum-vizyonu-ve-profesyonel-aglar",
    excerpt: "T\xFCrkiye'nin en kapsaml\u0131 menajerlik ve futbolcu dizini fmag.tr, teknolojik altyap\u0131s\u0131n\u0131 g\xFC\xE7lendirerek kul\xFCpler ve ajanslar aras\u0131ndaki ba\u011F\u0131 dijital bir stadyum vizyonuyla g\xFC\xE7lendiriyor.",
    content: [
      "T\xFCrk futbol ekosistemi, fmag.tr platformunun sundu\u011Fu derinlemesine veri analizi ve profesyonel a\u011F yetenekleriyle dijital bir d\xF6n\xFC\u015F\xFCmden ge\xE7iyor. 120 binden fazla futbolcu verisi ve 380\u2019den fazla aktif ajans kayd\u0131yla platform, transfer s\xFCre\xE7lerinin \u015Feffafla\u015Fmas\u0131nda kritik bir rol \xFCstleniyor.",
      'Yeni duyurulan "Dijital Stadyum" vizyonu kapsam\u0131nda, menajerlerin ve kul\xFCplerin etkile\u015Fimi sadece bir veri giri\u015Fi olmaktan \xE7\u0131k\u0131p, profesyonel bir sosyal a\u011F deneyimine d\xF6n\xFC\u015F\xFCyor. Bu vizyon, oyuncu profillerinin sadece istatistiklerle de\u011Fil, temsil ili\u015Fkileri ve kariyer projeksiyonlar\u0131yla zenginle\u015Ftirilmesini hedefliyor.',
      "Platformun teknolojik altyap\u0131s\u0131, scout ekiplerinin arad\u0131\u011F\u0131 kriterlere g\xF6re anl\u0131k filtreleme yapabilmesine olanak tan\u0131yor. \xD6zellikle alt liglerdeki gizli yeteneklerin ke\u015Ffedilmesi ve profesyonel s\xF6zle\u015Fme s\xFCre\xE7lerinin h\u0131zland\u0131r\u0131lmas\u0131 noktas\u0131nda fmag.tr, ekosistemin vazge\xE7ilmez bir par\xE7as\u0131 haline gelmi\u015F durumda.",
      "fmag.tr kurucu ekibi, \xF6n\xFCm\xFCzdeki d\xF6nemde yapay zeka destekli performans tahmin modellerini de platforma entegre etmeyi planl\u0131yor. Bu sayede bir futbolcunun kariyer rotas\u0131ndaki bir sonraki ad\u0131m\u0131n, veri tabanl\u0131 \xF6ng\xF6r\xFClerle desteklenmesi m\xFCmk\xFCn olacak."
    ],
    category: "ecosystem",
    categoryName: "Ekosistem & Platform",
    author: {
      name: "SportTech Ara\u015Ft\u0131rma Masas\u0131",
      role: "Ekosistem & Strateji Edit\xF6rl\xFC\u011F\xFC",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80"
    },
    date: "25 A\u011Fustos 2026",
    readTime: "6 dk okuma",
    coverImage: "/fmag-cover.jpg",
    tags: ["fmag.tr", "Futbol Menajerli\u011Fi", "Transfer Verisi", "Scout Sistemi", "Dijital D\xF6n\xFC\u015F\xFCm", "Yapay Zeka"],
    source: "fmag.tr / SportTech T\xFCrkiye",
    isFeatured: true,
    status: "active",
    likesCount: 456
  },
  {
    id: "fmag-futbolun-gelecegi-verinin-icinde-sakli",
    title: "Menajerlerin Yeni G\xF6zdesi Fmag: Futbolun Gelece\u011Fi Verinin \u0130\xE7inde Sakl\u0131",
    slug: "fmag-futbolun-gelecegi-verinin-icinde-sakli",
    excerpt: "Futbol d\xFCnyas\u0131nda transfer s\xFCre\xE7leri dijital veriler ve profesyonel a\u011Flarla \u015Fekilleniyor. fmag.tr, T\xFCrkiye\u2019de futbolcu, menajer ve ajans bilgilerini bir araya getiren dijital dizin olarak \xF6ne \xE7\u0131k\u0131yor.",
    content: [
      "Futbol d\xFCnyas\u0131nda transfer s\xFCre\xE7leri art\u0131k yaln\u0131zca saha i\xE7indeki performansla de\u011Fil, dijital veriler, oyuncu profilleri ve profesyonel a\u011Flarla da \u015Fekilleniyor. Kul\xFCpler, scout ekipleri ve menajerler; do\u011Fru oyuncuya daha h\u0131zl\u0131 ula\u015Fabilmek i\xE7in geni\u015F veri havuzlar\u0131ndan yararlan\u0131yor.",
      "fmag.tr, T\xFCrkiye\u2019de futbolcu, menajer ve ajans bilgilerini bir araya getiren dijital bir dizin olarak \xF6ne \xE7\u0131k\u0131yor. Platformda hangi oyuncunun hangi ajans taraf\u0131ndan temsil edildi\u011Fi, oyunculara ili\u015Fkin \xE7e\u015Fitli bilgiler ve menajerlik ekosistemine dair veriler tek bir yap\u0131 i\xE7erisinde sunuluyor.",
      "380\u2019in \xFCzerinde ajans kayd\u0131n\u0131n yer ald\u0131\u011F\u0131 platform, kul\xFCpler ve futbol profesyonelleri a\xE7\u0131s\u0131ndan daha eri\u015Filebilir ve sistematik bir ara\u015Ft\u0131rma ortam\u0131 olu\u015Fturmay\u0131 hedefliyor. Platformda 123 binden fazla futbolcuya ili\u015Fkin kay\u0131t bulunuyor.",
      "Modern futbolda veri analizi art\u0131k yaln\u0131zca ma\xE7 istatistiklerinden ibaret de\u011Fil. Oyuncunun performans ge\xE7mi\u015Fi, kariyer rotas\u0131, piyasa de\u011Feri ve temsil ili\u015Fkileri gibi bir\xE7ok veri, karar alma s\xFCre\xE7lerinde kullan\u0131labiliyor. fmag.tr verilerine g\xF6re bug\xFCne kadar 500\u2019\xFCn \xFCzerinde transfer s\xFCrecine katk\u0131 sa\u011Fland\u0131.",
      "AI Office T\xFCrkiye ekibinin de\u011Ferlendirmesine g\xF6re bu t\xFCr platformlar, b\xFCy\xFCk veri ve yapay zek\xE2 teknolojilerinin spor sekt\xF6r\xFCndeki kullan\u0131m alanlar\u0131n\u0131n geni\u015Flemesi a\xE7\u0131s\u0131ndan \xF6nemli bir potansiyel ta\u015F\u0131yor. Gelece\u011Fin scout sistemi algoritmalarda ve dijital platformlarda \u015Fekilleniyor."
    ],
    category: "ecosystem",
    categoryName: "Ekosistem & Platform",
    author: {
      name: "SportTech Ara\u015Ft\u0131rma Masas\u0131",
      role: "Ekosistem & Strateji Edit\xF6rl\xFC\u011F\xFC",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80"
    },
    date: "25 A\u011Fustos 2026",
    readTime: "5 dk okuma",
    coverImage: "/fmag-stadium.png",
    tags: ["fmag.tr", "Futbol Menajerli\u011Fi", "Transfer Verisi", "Scout Sistemi", "Dijital D\xF6n\xFC\u015F\xFCm", "Yapay Zeka"],
    source: "fmag.tr / SportTech T\xFCrkiye",
    isFeatured: false,
    status: "active",
    likesCount: 342
  },
  {
    id: "mera-metabolik-hazir-olus-platformu-public-demo",
    title: "Mera, Sporcular\u0131n Metabolik Haz\u0131r Olu\u015F D\xFCzeyini De\u011Ferlendiren Platformunu Kullan\u0131ma Sundu",
    slug: "mera-metabolik-hazir-olus-platformu-public-demo",
    excerpt: "\u0130stanbul merkezli sport tech giri\u015Fimi Mera, sporcular\u0131n metabolik performans testlerini analiz eden platformunun public demo s\xFCr\xFCm\xFCn\xFC kullan\u0131ma a\xE7t\u0131. \u0130T\xDC Seed ve Innogate destekli giri\u015Fim, metabolik testleri her fitness kul\xFCb\xFCnde eri\u015Filebilir k\u0131lmay\u0131 hedefliyor.",
    content: [
      "\u0130stanbul merkezli sport tech giri\u015Fimi Mera, sporcular\u0131n metabolik performans testlerini analiz eden platformunun public demo s\xFCr\xFCm\xFCn\xFC kullan\u0131ma a\xE7t\u0131. Giri\u015Fim, \u0130T\xDC Seed ve Innogate programlar\u0131 taraf\u0131ndan destekleniyor.",
      "Platform, VO\u2082max testleri de dahil olmak \xFCzere farkl\u0131 metabolik test sistemlerinden gelen verileri tek bir sporcu profili alt\u0131nda birle\u015Ftiriyor. Metabolik e\u015Fiklerin belirlenmesinde veri bilimi y\xF6ntemleri ve \u015Firkete \xF6zel geli\u015Ftirilmi\u015F sinir a\u011F\u0131 modelleri kullan\u0131l\u0131yor.",
      "Platformun bir par\xE7as\u0131 olan Mera AI ise sporcu verileri \xFCzerinde \xE7al\u0131\u015Fan sohbet tabanl\u0131 bir aray\xFCz sunuyor. Bu aray\xFCz \xFCzerinden kullan\u0131c\u0131lar farkl\u0131 testleri kar\u015F\u0131la\u015Ft\u0131rabiliyor, sonu\xE7lara ili\u015Fkin sorular sorabiliyor ve sporcunun performans g\xF6stergelerinin zaman i\xE7indeki de\u011Fi\u015Fimini takip edebiliyor.",
      "Mera \u015Fu anda performans merkezleri, spor kul\xFCpleri ve \xFCniversite laboratuvarlar\u0131yla birlikte test ediliyor. \u015Eirket, \xF6n\xFCm\xFCzdeki d\xF6nemde \xF6zellikle elit spor tak\u0131mlar\u0131 ile \xFCniversitelerin spor ve egzersiz fizyolojisi laboratuvarlar\u0131yla yeni pilot \xE7al\u0131\u015Fmalar ba\u015Flatmay\u0131 hedefliyor.",
      "Giri\u015Fimin misyonu, bug\xFCn a\u011F\u0131rl\u0131kl\u0131 olarak profesyonel sporculara ve elit tak\u0131mlara sunulan metabolik test seviyesini her fitness kul\xFCb\xFCnde eri\u015Filebilir hale getirmek."
    ],
    category: "ai_data",
    categoryName: "Yapay Zeka & Performans",
    author: {
      name: "SportTech Ara\u015Ft\u0131rma Masas\u0131",
      role: "Performans & Biyomekanik Edit\xF6rl\xFC\u011F\xFC",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
    },
    date: "24 A\u011Fustos 2026",
    readTime: "4 dk okuma",
    coverImage: "/mera-cover.svg",
    tags: ["Mera", "Mera AI", "VO\u2082max", "Metabolik Performans", "Sinir A\u011Flar\u0131", "\u0130T\xDC Seed", "Innogate", "SportTech"],
    source: "Mera / SportTech T\xFCrkiye",
    isFeatured: true,
    likesCount: 512,
    status: "active"
  },
  {
    id: "sporsepeti-dijital-spor-ekosistemi-donusumu",
    title: "Sporsepeti B\xFCt\xFCnle\u015Fik \xC7\xF6z\xFCmleriyle T\xFCrkiye Spor Ekosistemini Dijitalle\u015Ftiriyor",
    slug: "sporsepeti-dijital-spor-ekosistemi-donusumu",
    excerpt: "Sporsepeti Spor Teknolojileri, b\xFCnyesindeki SportsFly spor y\xF6netim yaz\u0131l\u0131m\u0131 ve 50+ bran\u015Fta zengin i\xE7erik sunan Spor K\xFCt\xFCphanesi ile kul\xFCpler, spor i\u015Fletmeleri ve sporseverler i\xE7in u\xE7tan uca dijital k\xF6pr\xFC kuruyor.",
    content: [
      "T\xFCrkiye spor teknolojileri dikeyinde yenilik\xE7i bir vizyonla faaliyet g\xF6steren Sporsepeti Spor Teknolojileri Pazarlama Ltd. \u015Eti., sporu dijital d\xFCnyada ke\u015Ffetmeyi, y\xF6netmeyi ve yayg\u0131nla\u015Ft\u0131rmay\u0131 sa\u011Flayan b\xFCt\xFCnle\u015Fik platformuyla ekosistemin merkezinde yer al\u0131yor.",
      "\u015Eirket \xE7at\u0131s\u0131 alt\u0131nda faaliyet g\xF6steren SportsFly spor i\u015Fletmeleri y\xF6netim yaz\u0131l\u0131m\u0131 ile salonlar\u0131n, akademilerin ve st\xFCdyolar\u0131n operasyonel y\xFCk\xFCn\xFC hafifletirken; 50'den fazla spor bran\u015F\u0131n\u0131 kapsayan Spor K\xFCt\xFCphanesi ile her ya\u015Ftan sporsevere rehberlik ediyor.",
      "Kul\xFCplerin ve tesislerin dijital d\xF6n\xFC\u015F\xFCm s\xFCre\xE7lerini h\u0131zland\u0131rmay\u0131 hedefleyen Sporsepeti; \xFCye y\xF6netiminden antrenman organizasyonuna, bran\u015F rehberli\u011Finden tesis ke\u015Ffine kadar t\xFCm spor deneyimini tek bir dijital \xE7at\u0131 alt\u0131nda birle\u015Ftiriyor."
    ],
    category: "ecosystem",
    categoryName: "Ekosistem & Platform",
    author: {
      name: "Caner Akta\u015F",
      role: "SportTech Ba\u015F Analisti",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
    },
    date: "24 May\u0131s 2026",
    readTime: "4 dk okuma",
    coverImage: "/sportsfly-wheel.svg",
    tags: ["Sporsepeti", "Spor Ekosistemi", "SportsFly", "Spor K\xFCt\xFCphanesi", "Dijital D\xF6n\xFC\u015F\xFCm"],
    source: "SportTech T\xFCrkiye Ara\u015Ft\u0131rma Birimi",
    isFeatured: true,
    likesCount: 428,
    status: "active"
  },
  {
    id: "sportsfly-spor-isletmeleri-yonetim-yazilimi-basarisi",
    title: "SportsFly ile Spor Salonlar\u0131 ve Akademilerde Dijital Y\xF6netim Devrimi",
    slug: "sportsfly-spor-isletmeleri-yonetim-yazilimi-basarisi",
    excerpt: "Spor salonlar\u0131, spor okullar\u0131, fitness/pilates/yoga st\xFCdyolar\u0131 ve tenis akademileri; \xFCye y\xF6netimi, yoklama, e\u011Fitmen takibi ve raporlama s\xFCre\xE7lerini SportsFly bulut paneline ta\u015F\u0131yarak %40 operasyonel verimlilik sa\u011Fl\u0131yor.",
    content: [
      "Spor i\u015Fletmelerinin en b\xFCy\xFCk operasyonel zorluklar\u0131ndan olan manuel \xFCye takibi, ka\u011F\u0131t yoklama listeleri ve karma\u015F\u0131k personel organizasyonu, SportsFly\u2019\u0131n kullan\u0131c\u0131 dostu aray\xFCz\xFC ve bulut mimarisiyle tamamen dijitalle\u015Fti.",
      "Fitness merkezleri, spor okullar\u0131, pilates/yoga st\xFCdyolar\u0131 ve tenis akademilerine \xF6zel olarak geli\u015Ftirilen yaz\u0131l\u0131m; \xFCyelik paketleri, sadakat programlar\u0131, QR ve turnike entegre yoklama sistemleri ile anl\u0131k finansal raporlamay\u0131 tek merkezi kontrol panelinden y\xF6netme imkan\u0131 sunuyor.",
      "\u0130\u015Fletmelerin m\xFC\u015Fteri memnuniyetini art\u0131ran ve idari i\u015F y\xFCk\xFCn\xFC minimize eden SportsFly, T\xFCrkiye genelinde 220'den fazla aktif spor i\u015Fletmesinde 85.000'i a\u015Fk\u0131n aktif \xFCyenin y\xF6netimini g\xFCvenle sa\u011Fl\u0131yor."
    ],
    category: "management_platform",
    categoryName: "Y\xF6netim Yaz\u0131l\u0131mlar\u0131",
    author: {
      name: "Dr. Selin Bozkurt",
      role: "Spor Y\xF6netimi ve Bili\u015Fim Ara\u015Ft\u0131rmac\u0131s\u0131",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80"
    },
    date: "20 May\u0131s 2026",
    readTime: "5 dk okuma",
    coverImage: "/sportsfly-dashboard.svg",
    tags: ["SportsFly", "Spor Y\xF6netim Yaz\u0131l\u0131m\u0131", "\xDCye Takibi", "Yoklama Sistemi", "SaaS", "St\xFCdyo Y\xF6netimi"],
    source: "SportTech Insights",
    isFeatured: false,
    likesCount: 362,
    status: "active"
  },
  {
    id: "sporpuan-turkiyenin-bagimsiz-spor-tesisleri-puanlama-platformu",
    title: "Sporpuan: T\xFCrkiye'nin Ba\u011F\u0131ms\u0131z Spor Tesisleri ve Etkinlikleri Puanlama Platformu Yay\u0131nda",
    slug: "sporpuan-turkiyenin-bagimsiz-spor-tesisleri-puanlama-platformu",
    excerpt: "Spor salonlar\u0131n\u0131, spor okullar\u0131n\u0131 ve etkinlikleri hijyen, ekipman kalitesi ve lokasyon gibi objektif kriterlere g\xF6re de\u011Ferlendiren Sporpuan, 81 ilde tarafs\u0131z kullan\u0131c\u0131 yorumlar\u0131yla sporseverlere rehberlik ediyor.",
    content: [
      "Spor salonu, spor okulu veya etkinlik aray\u0131\u015F\u0131ndaki sporseverlerin en \xE7ok ihtiya\xE7 duydu\u011Fu \u015Feffaf ve ba\u011F\u0131ms\u0131z referans kayna\u011F\u0131 ihtiyac\u0131, Sporpuan (sporpuan.com) platformu ile kar\u015F\u0131lan\u0131yor.",
      "Platform; tesisleri hijyen standartlar\u0131, ekipman modernli\u011Fi ve bak\u0131m\u0131, soyunma odas\u0131 konforu, e\u011Fitmen yeterlili\u011Fi ve lokasyon eri\u015Filebilirli\u011Fi gibi 12'den fazla objektif parametre \xFCzerinden puanlayarak sporseverlerin en do\u011Fru tercihi yapmas\u0131n\u0131 sa\u011Fl\u0131yor.",
      "Do\u011Frulanm\u0131\u015F kullan\u0131c\u0131 yorumlar\u0131yla tesis se\xE7iminde g\xFCven in\u015Fa eden Sporpuan, ayn\u0131 zamanda i\u015Fletmeler i\xE7in de hizmet kalitesini tescilleyen prestijli bir referans standard\u0131 olu\u015Fturuyor."
    ],
    category: "community_rating",
    categoryName: "Tesis Puanlama & Rehber",
    author: {
      name: "Berk Y\u0131ld\u0131r\u0131m",
      role: "Spor Teknolojisi ve Giri\u015Fim Analisti",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
    },
    date: "18 May\u0131s 2026",
    readTime: "4 dk okuma",
    coverImage: "/sporpuan-map-v2.svg",
    tags: ["Sporpuan", "Tesis Puanlama", "Kullan\u0131c\u0131 Yorumlar\u0131", "Hijyen & Ekipman", "\u015Eeffaf Referans"],
    source: "SportTech Gazetesi",
    isFeatured: false,
    likesCount: 295,
    status: "active"
  },
  {
    id: "spor-kutuphanesi-50-brans-rehberi",
    title: "Sporsepeti'nden Spor K\xFClt\xFCr\xFCne B\xFCy\xFCk Katk\u0131: 50+ Bran\u015Fta Kapsaml\u0131 Spor K\xFCt\xFCphanesi",
    slug: "spor-kutuphanesi-50-brans-rehberi",
    excerpt: "Olimpik bran\u015Flardan geleneksel sporlara kadar 50'den fazla dalda kurallar, teknik rehberler ve antrenman prensipleri Sporsepeti Spor K\xFCt\xFCphanesi ile sporseverlerin eri\u015Fimine a\xE7\u0131ld\u0131.",
    content: [
      "Sporsepeti, yaln\u0131zca spor i\u015Fletmelerine y\xF6nelik yaz\u0131l\u0131m \xE7\xF6z\xFCmleri sunmakla kalmay\u0131p toplumda spor k\xFClt\xFCr\xFCn\xFC ve bilincini geli\u015Ftirmek amac\u0131yla hayata ge\xE7irdi\u011Fi Spor K\xFCt\xFCphanesi projesiyle dikkat \xE7ekiyor.",
      "Futboldan tenise, y\xFCzmeden ok\xE7ulu\u011Fa kadar 50'den fazla spor bran\u015F\u0131na ait kurallar, temel teknik hareketler, ekipman se\xE7im k\u0131lavuzlar\u0131 ve ba\u015Flang\u0131\xE7 seviyesi antrenman prensipleri uzman spor bilimciler taraf\u0131ndan haz\u0131rlanarak \xFCcretsiz sunuluyor.",
      "Proje, \xF6zellikle spor okullar\u0131na yeni ba\u015Flayacak \xE7ocuklar, aileler ve amat\xF6r spor tutkunlar\u0131 i\xE7in T\xFCrkiye'nin en zengin dijital spor ba\u015Fvuru k\xFCt\xFCphanesi i\u015Flevi g\xF6r\xFCyor."
    ],
    category: "ecosystem",
    categoryName: "Spor K\xFClt\xFCr\xFC & \u0130\xE7erik",
    author: {
      name: "Do\xE7. Dr. Ay\u015Fe Erdem",
      role: "Spor Bilimleri ve Biyomekanik Uzman\u0131",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
    },
    date: "14 May\u0131s 2026",
    readTime: "3 dk okuma",
    coverImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&auto=format&fit=crop&q=80",
    tags: ["Spor K\xFCt\xFCphanesi", "Sporsepeti", "50+ Bran\u015F", "Spor K\xFClt\xFCr\xFC", "Spor E\u011Fitimi"],
    source: "SportsTech Review",
    isFeatured: false,
    likesCount: 318,
    status: "active"
  },
  {
    id: "spor-okullari-ve-akademilerde-sportsfly-altyapisi",
    title: "Spor Okullar\u0131 ve Tenis Akademileri SportsFly ile Ka\u011F\u0131t-Kalem D\xF6nemini Kapat\u0131yor",
    slug: "spor-okullari-ve-akademilerde-sportsfly-altyapisi",
    excerpt: "Altyap\u0131 spor okullar\u0131 ve tenis kul\xFCpleri; veli bilgilendirmeleri, aidat takipleri ve sporcu devam durumlar\u0131n\u0131 SportsFly altyap\u0131s\u0131yla buluta ta\u015F\u0131yarak zaman tasarrufu sa\u011Fl\u0131yor.",
    content: [
      "T\xFCrkiye genelinde faaliyet g\xF6steren spor okullar\u0131 ve tenis akademileri, geleneksel defter ve karma\u015F\u0131k elektronik tablolar yerine SportsFly'\u0131n bulut tabanl\u0131 altyap\u0131s\u0131n\u0131 tercih ediyor.",
      "Antren\xF6rlerin saniyeler i\xE7inde mobil cihazlardan yoklama alabilmesi, velilerin \xF6deme ve devam durumlar\u0131n\u0131 \u015Feffaf \u015Fekilde takip edebilmesi ve y\xF6neticilerin anl\u0131k gelir-gider raporlar\u0131 alabilmesi kul\xFCp verimlili\u011Fini \xFCst seviyeye ta\u015F\u0131yor.",
      "SportsFly entegrasyonu tamamlanan spor okullar\u0131nda aidat tahsilat gecikmelerinin %35 oran\u0131nda azald\u0131\u011F\u0131 ve veli memnuniyetinin belirgin bi\xE7imde y\xFCkseldi\u011Fi bildiriliyor."
    ],
    category: "management_platform",
    categoryName: "Akademi & Kul\xFCp Y\xF6netimi",
    author: {
      name: "Deniz Alkan",
      role: "Spor Y\xF6netim Sistemleri Dan\u0131\u015Fman\u0131",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
    },
    date: "09 May\u0131s 2026",
    readTime: "4 dk okuma",
    coverImage: "/sportsfly-tablet-app.svg",
    tags: ["SportsFly", "Spor Okullar\u0131", "Tenis Akademisi", "Aidat Takibi", "Yoklama"],
    source: "TechClub Insights",
    isFeatured: false,
    likesCount: 247,
    status: "active"
  },
  {
    id: "sporpuan-tesis-hijyen-ve-kalite-standartlari-raporu",
    title: "Sporpuan Verileri: Tesis Se\xE7iminde Hijyen ve Ekipman Kalitesi \u0130lk S\u0131rada",
    slug: "sporpuan-tesis-hijyen-ve-kalite-standartlari-raporu",
    excerpt: "Sporpuan platformu \xFCzerinden yap\u0131lan 18.000'i a\u015Fk\u0131n kullan\u0131c\u0131 de\u011Ferlendirmesi; \xFCyelerin spor salonu se\xE7iminde fiyattan \xF6nce hijyen ve ekipman bak\u0131m\u0131na \xF6ncelik verdi\u011Fini ortaya koydu.",
    content: [
      "T\xFCrkiye'nin ba\u011F\u0131ms\u0131z spor tesisi puanlama platformu Sporpuan'\u0131n yay\u0131nlad\u0131\u011F\u0131 sekt\xF6rel analiz raporu, sporseverlerin tesis tercihlerindeki \xF6nceliklerini netle\u015Ftirdi.",
      `Platform kullan\u0131c\u0131lar\u0131n\u0131n %68'i spor salonu tercihinde "Hijyen ve Temizlik Standartlar\u0131"n\u0131 en kritik kriter olarak belirtirken, %62'si ise "Ekipman \xC7e\u015Fitlili\u011Fi ve Bak\u0131m Durumu"nu ikinci s\u0131raya yerle\u015Ftirdi.`,
      "Sporpuan \xFCzerinden y\xFCksek puan alan ve ba\u011F\u0131ms\u0131z kullan\u0131c\u0131 onay\u0131ndan ge\xE7en tesislerin, yeni \xFCye kazan\u0131m oranlar\u0131nda sekt\xF6r ortalamas\u0131n\u0131n %40 \xFCzerinde performans g\xF6sterdi\u011Fi kaydedildi."
    ],
    category: "community_rating",
    categoryName: "Sekt\xF6rel Analiz",
    author: {
      name: "Caner Akta\u015F",
      role: "SportTech Ba\u015F Analisti",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
    },
    date: "03 May\u0131s 2026",
    readTime: "4 dk okuma",
    coverImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&auto=format&fit=crop&q=80",
    tags: ["Sporpuan", "Tesis Raporu", "Hijyen Standartlar\u0131", "Ekipman Kalitesi", "Puanlama"],
    source: "Sporpuan Ara\u015Ft\u0131rma Masas\u0131",
    isFeatured: false,
    likesCount: 389,
    status: "active"
  }
];

// src/utils/seo.ts
function getSeoMetadata(pathname, language, startups, newsArticles, origin = "https://sporttech.com.tr", selectedStartup, selectedArticle) {
  const cleanPath = pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;
  const url = `${origin}${cleanPath}`;
  let title = "";
  let description = "";
  let image = `${origin}/og-image.png`;
  const newsMatch = cleanPath.match(/\/news\/([^/?#]+)/);
  const startupMatch = cleanPath.match(/\/startup\/([^/?#]+)/);
  if (selectedStartup || startupMatch) {
    const startup = selectedStartup || (startupMatch ? startups.find((s) => s.id === startupMatch[1]) : null);
    if (startup) {
      title = `${startup.name} | SportTech T\xFCrkiye`;
      description = startup.tagLine || startup.description.substring(0, 160);
      image = startup.logo.startsWith("http") ? startup.logo : `${origin}${startup.logo}`;
    }
  } else if (selectedArticle || newsMatch) {
    const article = selectedArticle || (newsMatch ? newsArticles.find((a) => a.id === newsMatch[1]) : null);
    if (article) {
      title = `${article.title} | SportTech T\xFCrkiye`;
      description = article.excerpt || article.content[0].substring(0, 160);
      image = article.coverImage.startsWith("http") ? article.coverImage : `${origin}${article.coverImage}`;
    }
  }
  if (!title) {
    if (cleanPath.includes("/section/startups")) {
      if (language === "tr") {
        title = "Giri\u015Fimler & Teknolojiler | SportTech T\xFCrkiye";
        description = "Spor teknolojileri ekosistemindeki ak\u0131ll\u0131 antrenman, performans analizi, giyilebilir teknoloji ve y\xF6netim yaz\u0131l\u0131mlar\u0131 sunan lider giri\u015Fimler.";
      } else if (language === "ar") {
        title = "\u0627\u0644\u0634\u0631\u0643\u0627\u062A \u0627\u0644\u0646\u0627\u0634\u0626\u0629 \u0648\u0627\u0644\u062A\u0642\u0646\u064A\u0627\u062A | \u0633\u0628\u0648\u0631\u062A \u062A\u064A\u0643 \u062A\u0631\u0643\u064A\u0627";
        description = "\u0627\u0644\u0634\u0631\u0643\u0627\u062A \u0627\u0644\u062A\u0631\u0643\u064A\u0629 \u0627\u0644\u0631\u0627\u0626\u062F\u0629 \u0627\u0644\u062A\u064A \u062A\u0642\u062F\u0645 \u062D\u0644\u0648\u0644\u0627\u064B \u0641\u064A \u0645\u062C\u0627\u0644\u0627\u062A \u0627\u0644\u062A\u062F\u0631\u064A\u0628 \u0627\u0644\u0630\u0643\u064A\u060C \u062A\u062D\u0644\u064A\u0644 \u0627\u0644\u0623\u062F\u0627\u0621\u060C \u0627\u0644\u062A\u0643\u0646\u0648\u0644\u0648\u062C\u064A\u0627 \u0627\u0644\u0642\u0627\u0628\u0644\u0629 \u0644\u0644\u0627\u0631\u062A\u062F\u0627\u0621 \u0648\u0625\u062F\u0627\u0631\u0629 \u0627\u0644\u0631\u064A\u0627\u0636\u0629.";
      } else {
        title = "Startups & Technologies | SportTech Turkey";
        description = "The database of innovative startups shaping the future of sport technologies: smart coaching, wearable devices, and sports analytics.";
      }
    } else if (cleanPath.includes("/section/news")) {
      if (language === "tr") {
        title = "Sekt\xF6rel Haberler & Analizler | SportTech T\xFCrkiye";
        description = "Spor ve teknolojinin kesi\u015Fimindeki en son geli\u015Fmeler, yeni \xFCr\xFCn lansmanlar\u0131, yat\u0131r\u0131m turlar\u0131 ve derinlemesine pazar analizleri.";
      } else if (language === "ar") {
        title = "\u0623\u062E\u0628\u0627\u0631 \u0627\u0644\u0642\u0637\u0627\u0639 \u0648\u0627\u0644\u062A\u062D\u0644\u064A\u0644\u0627\u062A | \u0633\u0628\u0648\u0631\u062A \u062A\u064A\u0643 \u062A\u0631\u0643\u064A\u0627";
        description = "\u0622\u062E\u0631 \u0627\u0644\u062A\u0637\u0648\u0631\u0627\u062A \u0648\u0627\u0644\u0627\u0628\u062A\u0643\u0627\u0631\u0627\u062A \u0648\u062C\u0648\u0644\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u062B\u0645\u0627\u0631 \u0648\u0627\u0644\u062A\u062D\u0644\u064A\u0644\u0627\u062A \u0627\u0644\u0639\u0645\u064A\u0642\u0629 \u0641\u064A \u062A\u0642\u0627\u0637\u0639 \u0627\u0644\u0631\u064A\u0627\u0636\u0629 \u0648\u0627\u0644\u062A\u0643\u0646\u0648\u0644\u0648\u062C\u064A\u0627.";
      } else {
        title = "Industry News & Market Insights | SportTech Turkey";
        description = "Latest developments, product launches, venture capital funding rounds, and in-depth market analyses in sports tech.";
      }
    } else if (cleanPath.includes("/section/about")) {
      if (language === "tr") {
        title = "Hakk\u0131m\u0131zda | SportTech T\xFCrkiye";
        description = "SportTech T\xFCrkiye, \xFClkemizdeki spor teknolojisi ekosistemini bir araya getiren, b\xFCy\xFCyen ve d\xFCnyaya a\xE7an ba\u011F\u0131ms\u0131z bir platformdur.";
      } else if (language === "ar") {
        title = "\u0645\u0646 \u0646\u062D\u0646 | \u0633\u0628\u0648\u0631\u062A \u062A\u064A\u0643 \u062A\u0631\u0643\u064A\u0627";
        description = "\u0645\u0646\u0635\u0629 \u0645\u0633\u062A\u0642\u0644\u0629 \u062A\u062C\u0645\u0639 \u0648\u062A\u0646\u0645\u064A \u0648\u062A\u0639\u0631\u0636 \u0645\u0646\u0638\u0648\u0645\u0629 \u0627\u0644\u062A\u0643\u0646\u0648\u0644\u0648\u062C\u064A\u0627 \u0627\u0644\u0631\u064A\u0627\u0636\u064A\u0629 \u0641\u064A \u062A\u0631\u0643\u064A\u0627 \u0644\u0644\u0639\u0627\u0644\u0645.";
      } else {
        title = "About Us | SportTech Turkey";
        description = "SportTech Turkey is an independent platform that unites, scales, and accelerates our nation's sports tech ecosystem globally.";
      }
    } else if (cleanPath.includes("/section/supporters")) {
      if (language === "tr") {
        title = "Ekosistem Destekleyicileri & Partnerler | SportTech T\xFCrkiye";
        description = "Platformumuzun geli\u015Fimine, giri\u015Fimlerin b\xFCy\xFCmesine ve spor k\xFClt\xFCr\xFCn\xFCn dijitalle\u015Fmesine katk\u0131 sa\u011Flayan lider kurumlar.";
      } else if (language === "ar") {
        title = "\u0627\u0644\u0634\u0631\u0643\u0627\u062A \u0627\u0644\u062F\u0627\u0639\u0645\u0629 \u0648\u0627\u0644\u0634\u0631\u0627\u0643\u0627\u062A | \u0633\u0628\u0648\u0631\u062A \u062A\u064A\u0643 \u062A\u0631\u0643\u064A\u0627";
        description = "\u0627\u0644\u0645\u0624\u0633\u0633\u0627\u062A \u0648\u0627\u0644\u0645\u0646\u0638\u0645\u0627\u062A \u0627\u0644\u062A\u064A \u062A\u0633\u0627\u0647\u0645 \u0641\u064A \u062A\u0637\u0648\u064A\u0631 \u0648\u062A\u0648\u0633\u064A\u0639 \u0627\u0644\u0634\u0631\u0643\u0627\u062A \u0627\u0644\u0646\u0627\u0634\u0626\u0629 \u0648\u0631\u0642\u0645\u0646\u0629 \u0627\u0644\u0631\u064A\u0627\u0636\u0629.";
      } else {
        title = "Ecosystem Supporters & Partners | SportTech Turkey";
        description = "Leading institutions and corporate partners contributing to the scale-up and digitalization of the sports tech ecosystem.";
      }
    } else if (cleanPath.includes("/section/events")) {
      if (language === "tr") {
        title = "Etkinlikler & Programlar | SportTech T\xFCrkiye";
        description = "Yakla\u015Fan spor teknolojisi zirveleri, hackathonlar, yat\u0131r\u0131mc\u0131 bulu\u015Fmalar\u0131 ve giri\u015Fim h\u0131zland\u0131rma programlar\u0131.";
      } else if (language === "ar") {
        title = "\u0627\u0644\u0641\u0639\u0627\u0644\u064A\u0627\u062A \u0648\u0627\u0644\u0628\u0631\u0627\u0645\u062C | \u0633\u0628\u0648\u0631\u062A \u062A\u064A\u0643 \u062A\u0631\u0643\u064A\u0627";
        description = "\u0645\u0624\u062A\u0645\u0631\u0627\u062A \u0627\u0644\u062A\u0643\u0646\u0648\u0644\u0648\u062C\u064A\u0627 \u0627\u0644\u0631\u064A\u0627\u0636\u064A\u0629 \u0627\u0644\u0642\u0627\u062F\u0645\u0629\u060C \u0648\u0627\u0644\u0647\u0627\u0643\u0627\u062B\u0648\u0646\u0627\u062A\u060C \u0648\u0644\u0642\u0627\u0621\u0627\u062A \u0627\u0644\u0645\u0633\u062A\u062B\u0645\u0631\u064A\u0646\u060C \u0648\u0628\u0631\u0627\u0645\u062C \u062A\u0633\u0631\u064A\u0639 \u0627\u0644\u0634\u0631\u0643\u0627\u062A \u0627\u0644\u0646\u0627\u0634\u0626\u0629.";
      } else {
        title = "Events, Summits & Acceleration Programs | SportTech Turkey";
        description = "Upcoming summits, hackathons, demo days, and incubator/accelerator programs in sports tech.";
      }
    } else {
      if (language === "tr") {
        title = "SportTech T\xFCrkiye | Spor Teknolojileri & Performans Sistemleri";
        description = "T\xFCrkiye'nin ilk ve lider spor teknolojileri platformu. Atletik performans analiz cihazlar\u0131, kuvvet platformlar\u0131 ve ak\u0131ll\u0131 antrenman \xE7\xF6z\xFCmleri.";
      } else if (language === "ar") {
        title = "\u0633\u0628\u0648\u0631\u062A \u062A\u064A\u0643 \u062A\u0631\u0643\u064A\u0627 | \u062A\u0643\u0646\u0648\u0644\u0648\u062C\u064A\u0627 \u0627\u0644\u0631\u064A\u0627\u0636\u0629 \u0648\u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0623\u062F\u0627\u0621 \u0627\u0644\u0630\u0643\u064A\u0629";
        description = "\u0627\u0644\u0645\u0646\u0635\u0629 \u0627\u0644\u0631\u0627\u0626\u062F\u0629 \u0641\u064A \u062A\u0643\u0646\u0648\u0644\u0648\u062C\u064A\u0627 \u0627\u0644\u0631\u064A\u0627\u0636\u0629\u060C \u0648\u0623\u0646\u0638\u0645\u0629 \u0627\u0644\u0623\u062F\u0627\u0621 \u0627\u0644\u0630\u0643\u064A\u0629\u060C \u0648\u062D\u0644\u0648\u0644 \u0627\u0644\u0631\u064A\u0627\u0636\u0629 \u0627\u0644\u0631\u0642\u0645\u064A\u0629 \u0641\u064A \u062A\u0631\u0643\u064A\u0627 \u0648\u0627\u0644\u0645\u0646\u0637\u0642\u0629.";
      } else {
        title = "SportTech Turkey | Sports Technologies & Performance Systems";
        description = "The premier independent sports technology ecosystem hub of Turkey and its region. Spotlighting elite athletic tech, analytics, and software.";
      }
    }
  }
  return { title, description, image, url };
}

// api/_server.ts
var rootDir = process.cwd();
var app = express();
app.get("*", async (req, res, next) => {
  const url = req.originalUrl || req.url;
  if (path.extname(url)) {
    return next();
  }
  try {
    const forwardedHost = req.headers["x-forwarded-host"];
    const host = (Array.isArray(forwardedHost) ? forwardedHost[0] : forwardedHost) || req.get("host") || "sporttech.com.tr";
    const forwardedProto = req.headers["x-forwarded-proto"];
    const protocol = (Array.isArray(forwardedProto) ? forwardedProto[0] : forwardedProto) || req.protocol || "https";
    const baseUrl = `${protocol}://${host}`;
    const langParam = req.query.lang;
    const language = typeof langParam === "string" && ["tr", "en-US", "en-GB", "ar"].includes(langParam) ? langParam : "tr";
    const metadata = getSeoMetadata(url, language, STARTUPS, NEWS_ARTICLES, baseUrl);
    const indexPath = path.resolve(rootDir, "dist/index.html");
    const backupIndexPath = path.resolve(rootDir, "index.html");
    const finalIndexPath = fs.existsSync(indexPath) ? indexPath : backupIndexPath;
    if (!fs.existsSync(finalIndexPath)) {
      return res.status(404).send("index.html not found");
    }
    let template = fs.readFileSync(finalIndexPath, "utf-8");
    const headContent = `
    <title>${metadata.title}</title>
    <meta name="description" content="${metadata.description}" />
    <meta property="og:title" content="${metadata.title}" />
    <meta property="og:description" content="${metadata.description}" />
    <meta property="og:image" content="${metadata.image}" />
    <meta property="og:url" content="${metadata.url}" />
    <meta property="og:type" content="website" />
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:title" content="${metadata.title}" />
    <meta property="twitter:description" content="${metadata.description}" />
    <meta property="twitter:image" content="${metadata.image}" />
    <meta property="twitter:url" content="${metadata.url}" />
`;
    let html = template.replace(/<title>.*?<\/title>/i, "").replace(/<meta[^>]+(?:property|name)=["\']og:(title|description|image|url|type)["\'][^>]*\/?>/gi, "").replace(/<meta[^>]+name=["\']description["\'][^>]*\/?>/gi, "").replace(/<meta[^>]+(?:property|name)=["\']twitter:(title|description|image|url|card)["\'][^>]*\/?>/gi, "");
    html = html.replace("<head>", `<head>${headContent}`);
    return res.status(200).set({ "Content-Type": "text/html" }).end(html);
  } catch (e) {
    console.error(e);
    res.status(500).end(e instanceof Error ? e.message : String(e));
  }
});
var server_default = app;
export {
  server_default as default
};
