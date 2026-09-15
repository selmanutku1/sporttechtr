package com.sporttech.app

object MockData {
    val startups = listOf(
        Startup(
            id = "fmag",
            name = "fmag.tr",
            tagLine = "Futbolun Dijital LinkedIn'i: Profesyonel Menajerlik ve Futbolcu Dizini",
            description = "fmag.tr, Türkiye’de futbolcu, menajer ve ajans bilgilerini bir araya getiren dijital bir dizin ve profesyonel ağ platformudur.",
            fullStory = "Futbol dünyasında transfer süreçleri artık yalnızca saha içindeki performansla değil, dijital veriler, oyuncu profilleri ve profesyonel ağlarla da şekilleniyor.",
            logo = "/fmag-logo.png",
            coverImage = "/fmag-cover.jpg",
            category = "management_platform",
            categoryName = "Yönetim & Dijital Platform",
            stage = "Bootstrapped",
            foundedYear = 2022,
            location = "İstanbul",
            website = "https://fmag.tr",
            teamSize = "10-15 Kişi",
            fundingRaised = "Bootstrapped",
            techStack = listOf("Big Data", "Search Algorithms"),
            keyMetrics = listOf(Metric("Kayıtlı Futbolcu", "123,000+")),
            founders = listOf(Founder("fmag.tr Ekibi", "Kurucu Ekip")),
            contactEmail = "info@fmag.tr",
            isFeatured = true,
            tags = listOf("Futbol", "Menajerlik")
        ),
        Startup(
            id = "mera",
            name = "Mera",
            tagLine = "Sporcuların Metabolik Hazır Oluş Düzeyini Değerlendiren Yapay Zeka Platformu",
            description = "İstanbul merkezli sport tech girişimi Mera, VO₂max testleri dahil metabolik performans verilerini analiz eder.",
            fullStory = "İstanbul merkezli sport tech girişimi Mera, sporcuların metabolik performans testlerini analiz eden platformunun public demo sürümünü kullanıma açtı.",
            logo = "/mera-logo.svg",
            coverImage = "/mera-cover.svg",
            category = "ai_analytics",
            categoryName = "Yapay Zeka & Performans Analitiği",
            stage = "Seed",
            foundedYear = 2023,
            location = "İstanbul",
            website = "https://mera.fit",
            teamSize = "8 Kişi",
            fundingRaised = "İTÜ Seed & Innogate Hızlandırma",
            techStack = listOf("Python", "PyTorch"),
            keyMetrics = listOf(Metric("Metabolik Test", "VO₂max & Laktat")),
            founders = listOf(Founder("Mera Ekibi", "Kurucu Ekip")),
            contactEmail = "hello@mera.fit",
            isFeatured = true,
            tags = listOf("AI", "Performance")
        )
    )

    val news = listOf(
        NewsArticle(
            id = "fmag-tr-dijital",
            title = "fmag.tr: Profesyonel Futbolun Dijitalleşen Yüzü",
            slug = "fmag-tr-dijital",
            excerpt = "Türkiye'nin en kapsamlı menajerlik ve futbolcu dizini fmag.tr teknolojik altyapısını güçlendiriyor.",
            content = listOf("Türk futbol ekosistemi dijital dönüşümden geçiyor."),
            category = "ecosystem",
            categoryName = "Ekosistem",
            author = Author("SportTech Masası", "Editör", ""),
            date = "25 Ağustos 2026",
            readTime = "6 dk okuma",
            coverImage = "/fmag-cover.jpg",
            tags = listOf("fmag.tr", "Futbol"),
            source = "fmag.tr",
            isFeatured = true,
            status = "active",
            likesCount = 456
        )
    )

    val supporters = listOf(
        Supporter(
            id = "sporsepeti",
            name = "Sporsepeti Spor Teknolojileri Ltd. Şti.",
            type = "corporate",
            typeName = "Ana Teknoloji Destekçisi",
            logo = "/sporsepeti-logo.svg",
            description = "Spor işletmeleri yönetim yazılımı.",
            website = "https://sporsepeti.com.tr",
            role = "Ana Ekosistem Sağlayıcı",
            location = "İstanbul",
            stats = "Platform Destekçisi"
        )
    )
}
