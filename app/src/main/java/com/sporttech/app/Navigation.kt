package com.sporttech.app

import kotlinx.serialization.Serializable

@Serializable
object HomeRoute

@Serializable
data class StartupDetailRoute(val startupId: String)

@Serializable
data class NewsDetailRoute(val newsId: String)
