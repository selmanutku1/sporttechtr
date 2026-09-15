package com.sporttech.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.sporttech.app.ui.theme.SportTechTheme
import androidx.navigation.toRoute

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            SportTechTheme {
                val navController = rememberNavController()
                AppNavigation(navController = navController)
            }
        }
    }
}

@Composable
fun AppNavigation(navController: NavHostController) {
    NavHost(navController = navController, startDestination = HomeRoute) {
        composable<HomeRoute> {
            HomeScreen(
                onStartupClick = { startup -> navController.navigate(StartupDetailRoute(startup.id)) },
                onNewsClick = { news -> navController.navigate(NewsDetailRoute(news.id)) }
            )
        }
        composable<StartupDetailRoute> { backStackEntry ->
            val route: StartupDetailRoute = backStackEntry.toRoute()
            val startup = MockData.startups.find { it.id == route.startupId }
            if (startup != null) {
                StartupDetailScreen(startup = startup, onBack = { navController.popBackStack() })
            }
        }
        composable<NewsDetailRoute> { backStackEntry ->
            val route: NewsDetailRoute = backStackEntry.toRoute()
            val news = MockData.news.find { it.id == route.newsId }
            if (news != null) {
                NewsDetailScreen(news = news, onBack = { navController.popBackStack() })
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeScreen(onStartupClick: (Startup) -> Unit, onNewsClick: (NewsArticle) -> Unit) {
    var showSearchDialog by remember { mutableStateOf(false) }
    var showSubmitDialog by remember { mutableStateOf(false) }

    if (showSubmitDialog) {
        SubmitStartupDialog(
            onDismiss = { showSubmitDialog = false },
            onSubmit = { name -> showSubmitDialog = false }
        )
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("SportTech Türkiye", fontWeight = FontWeight.Bold) },
                actions = {
                    IconButton(onClick = { showSearchDialog = true }) {
                        Icon(Icons.Default.Search, contentDescription = "Search")
                    }
                }
            )
        },
        floatingActionButton = {
            FloatingActionButton(onClick = { showSubmitDialog = true }) {
                Text("+", style = MaterialTheme.typography.titleLarge)
            }
        }
    ) { innerPadding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding),
            contentPadding = PaddingValues(bottom = 32.dp)
        ) {
            item {
                HeroSection()
            }
            item {
                Text(
                    text = "Girişimler",
                    style = MaterialTheme.typography.headlineMedium,
                    modifier = Modifier.padding(16.dp)
                )
                LazyRow(
                    contentPadding = PaddingValues(horizontal = 16.dp),
                    horizontalArrangement = Arrangement.spacedBy(16.dp)
                ) {
                    items(MockData.startups) { startup ->
                        StartupCard(startup, onClick = { onStartupClick(startup) })
                    }
                }
            }
            item {
                Text(
                    text = "Haberler",
                    style = MaterialTheme.typography.headlineMedium,
                    modifier = Modifier.padding(16.dp)
                )
                Column(modifier = Modifier.padding(horizontal = 16.dp)) {
                    MockData.news.forEach { article ->
                        NewsCard(article, onClick = { onNewsClick(article) })
                        Spacer(modifier = Modifier.height(16.dp))
                    }
                }
            }
            item {
                Text(
                    text = "Destekçiler",
                    style = MaterialTheme.typography.headlineMedium,
                    modifier = Modifier.padding(16.dp)
                )
                Column(modifier = Modifier.padding(horizontal = 16.dp)) {
                    MockData.supporters.forEach { supporter ->
                        SupporterCard(supporter)
                        Spacer(modifier = Modifier.height(8.dp))
                    }
                }
            }
        }
        
        if (showSearchDialog) {
            AlertDialog(
                onDismissRequest = { showSearchDialog = false },
                title = { Text("Arama") },
                text = { Text("Arama özelliği yapım aşamasında...") },
                confirmButton = {
                    TextButton(onClick = { showSearchDialog = false }) { Text("Kapat") }
                }
            )
        }
    }
}

@Composable
fun HeroSection() {
    Surface(
        color = MaterialTheme.colorScheme.primaryContainer,
        modifier = Modifier.fillMaxWidth()
    ) {
        Column(
            modifier = Modifier.padding(32.dp)
        ) {
            Text(
                text = "Türkiye'nin Spor Teknolojileri Topluluğu",
                style = MaterialTheme.typography.headlineLarge,
                color = MaterialTheme.colorScheme.onPrimaryContainer
            )
            Spacer(modifier = Modifier.height(16.dp))
            Text(
                text = "Spor teknolojisi alanının girişimci, akademisyen ve profesyonellerini buluşturan; şeffaflık ve bağımsızlık ilkesiyle kurulmuş Türkiye topluluğu.",
                style = MaterialTheme.typography.bodyLarge,
                color = MaterialTheme.colorScheme.onPrimaryContainer
            )
        }
    }
}

@Composable
fun StartupCard(startup: Startup, onClick: () -> Unit) {
    Card(
        modifier = Modifier
            .width(280.dp)
            .clickable(onClick = onClick),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(text = startup.name, style = MaterialTheme.typography.titleLarge)
            Text(
                text = startup.categoryName,
                style = MaterialTheme.typography.labelMedium,
                color = MaterialTheme.colorScheme.primary
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text(text = startup.tagLine, style = MaterialTheme.typography.bodyMedium)
        }
    }
}

@Composable
fun NewsCard(article: NewsArticle, onClick: () -> Unit) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick),
        elevation = CardDefaults.cardElevation(defaultElevation = 2.dp)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(text = article.title, style = MaterialTheme.typography.titleLarge)
            Spacer(modifier = Modifier.height(8.dp))
            Text(text = article.excerpt, style = MaterialTheme.typography.bodyMedium)
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = "${article.date} • ${article.readTime}",
                style = MaterialTheme.typography.labelSmall,
                color = MaterialTheme.colorScheme.outline
            )
        }
    }
}

@Composable
fun SupporterCard(supporter: Supporter) {
    Card(
        modifier = Modifier.fillMaxWidth(),
        colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(text = supporter.name, style = MaterialTheme.typography.titleMedium)
            Text(text = supporter.typeName, style = MaterialTheme.typography.labelMedium)
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun StartupDetailScreen(startup: Startup, onBack: () -> Unit) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(startup.name) },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Back")
                    }
                }
            )
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(16.dp)
        ) {
            Text(text = startup.tagLine, style = MaterialTheme.typography.titleLarge)
            Spacer(modifier = Modifier.height(16.dp))
            Text(text = startup.fullStory, style = MaterialTheme.typography.bodyLarge)
            Spacer(modifier = Modifier.height(16.dp))
            Text(text = "Kuruluş Yılı: ${startup.foundedYear}", style = MaterialTheme.typography.labelLarge)
            Text(text = "Aşama: ${startup.stage}", style = MaterialTheme.typography.labelLarge)
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun NewsDetailScreen(news: NewsArticle, onBack: () -> Unit) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Haber Detayı") },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Back")
                    }
                }
            )
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(16.dp)
        ) {
            Text(text = news.title, style = MaterialTheme.typography.headlineMedium)
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = "${news.date} • ${news.author.name}",
                style = MaterialTheme.typography.labelMedium,
                color = MaterialTheme.colorScheme.primary
            )
            Spacer(modifier = Modifier.height(16.dp))
            news.content.forEach { paragraph ->
                Text(text = paragraph, style = MaterialTheme.typography.bodyLarge)
                Spacer(modifier = Modifier.height(8.dp))
            }
        }
    }
}
