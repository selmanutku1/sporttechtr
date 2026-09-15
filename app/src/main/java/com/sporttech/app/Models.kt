package com.sporttech.app

import kotlinx.serialization.Serializable

@Serializable
data class Startup(
    val id: String,
    val name: String,
    val tagLine: String,
    val description: String,
    val fullStory: String,
    val logo: String,
    val coverImage: String,
    val category: String,
    val categoryName: String,
    val stage: String,
    val foundedYear: Int,
    val location: String,
    val website: String,
    val teamSize: String,
    val fundingRaised: String,
    val techStack: List<String>,
    val keyMetrics: List<Metric>,
    val founders: List<Founder>,
    val contactEmail: String,
    val isFeatured: Boolean,
    val featuredHighlight: String? = null,
    val tags: List<String>
)

@Serializable
data class Metric(val label: String, val value: String)

@Serializable
data class Founder(val name: String, val role: String)

@Serializable
data class NewsArticle(
    val id: String,
    val title: String,
    val slug: String,
    val excerpt: String,
    val content: List<String>,
    val category: String,
    val categoryName: String,
    val author: Author,
    val date: String,
    val readTime: String,
    val coverImage: String,
    val tags: List<String>,
    val source: String,
    val isFeatured: Boolean,
    val status: String,
    val likesCount: Int
)

@Serializable
data class Author(
    val name: String,
    val role: String,
    val avatar: String
)

@Serializable
data class Supporter(
    val id: String,
    val name: String,
    val type: String,
    val typeName: String,
    val logo: String,
    val description: String,
    val website: String,
    val role: String,
    val location: String,
    val stats: String
)
