# Jetpack Compose - Modern Android UI Toolkit

## Table of Contents
- [Introduction](#introduction)
- [What is Jetpack Compose?](#what-is-jetpack-compose)
- [Key Features](#key-features)
- [Getting Started](#getting-started)
- [Composables & UI](#composables--ui)
- [Layout System](#layout-system)
- [State Management](#state-management)
- [Navigation](#navigation)
- [Lists & Data](#lists--data)
- [Material Design 3](#material-design-3)
- [Theming](#theming)
- [Animations](#animations)
- [Side Effects](#side-effects)
- [Interoperability](#interoperability)
- [Testing](#testing)
- [Best Practices](#best-practices)
- [Resources](#resources)

---

## Introduction

**Jetpack Compose** is Android's modern toolkit for building native UI. It simplifies and accelerates UI development on Android with less code, powerful tools, and intuitive Kotlin APIs. Introduced in 2021, Compose represents a paradigm shift from XML-based layouts to a declarative, Kotlin-first approach.

### Why Choose Jetpack Compose?

- **Less Code**: Build UIs with significantly less code than XML
- **Intuitive**: Declarative API makes UI development more natural
- **Accelerated Development**: Live previews and hot reload
- **Powerful**: Built on Kotlin, leveraging its language features
- **Material Design**: First-class Material Design 3 support
- **Interoperable**: Works with existing Views
- **Type-Safe**: Kotlin's type system prevents errors

---

## What is Jetpack Compose?

Jetpack Compose is a **declarative UI framework** where you describe what your UI should look like, and Compose handles the rest:

### Core Concepts

1. **Composables**: Functions that define UI
2. **State**: Data that drives UI changes
3. **Recomposition**: Automatic UI updates
4. **Modifiers**: Transform and style composables
5. **Layouts**: Arrange composables

### Compose vs XML Views

| Aspect | Jetpack Compose | XML Views |
|--------|----------------|-----------|
| **Paradigm** | Declarative | Imperative |
| **Language** | Kotlin | XML + Kotlin/Java |
| **Code** | Less verbose | More verbose |
| **Preview** | Live, interactive | Static |
| **Updates** | Automatic | Manual |
| **Learning Curve** | Moderate | Steep |
| **Performance** | Optimized | Good |

---

## Key Features

### 1. **Declarative Syntax**
```kotlin
@Composable
fun Greeting(name: String) {
    Text(text = "Hello $name!")
}
```

### 2. **No XML**
Everything is written in Kotlin code.

### 3. **Live Preview**
See UI changes instantly in Android Studio.

### 4. **Material Design 3**
Built-in Material You components.

### 5. **Interoperability**
Gradual migration from Views to Compose.

### 6. **Kotlin-First**
Leverages Kotlin's powerful features.

---

## Getting Started

### Requirements

- **Android Studio**: Arctic Fox or later
- **Minimum SDK**: API 21 (Android 5.0)
- **Kotlin**: 1.6.10 or later

### Setup

#### build.gradle (Project level)
```gradle
buildscript {
    ext {
        compose_version = '1.5.0'
        kotlin_version = '1.9.0'
    }
    
    dependencies {
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
    }
}
```

#### build.gradle (Module level)
```gradle
android {
    compileSdk 34
    
    defaultConfig {
        minSdk 21
        targetSdk 34
    }
    
    buildFeatures {
        compose true
    }
    
    composeOptions {
        kotlinCompilerExtensionVersion = "1.5.0"
    }
    
    kotlinOptions {
        jvmTarget = '1.8'
    }
}

dependencies {
    // Compose BOM (Bill of Materials)
    implementation platform('androidx.compose:compose-bom:2023.10.01')
    
    // Core Compose libraries
    implementation 'androidx.compose.ui:ui'
    implementation 'androidx.compose.ui:ui-tooling-preview'
    implementation 'androidx.compose.material3:material3'
    implementation 'androidx.activity:activity-compose:1.8.0'
    
    // Optional - for ViewModel
    implementation 'androidx.lifecycle:lifecycle-viewmodel-compose:2.6.2'
    
    // Optional - for Navigation
    implementation 'androidx.navigation:navigation-compose:2.7.5'
    
    // Debug
    debugImplementation 'androidx.compose.ui:ui-tooling'
    debugImplementation 'androidx.compose.ui:ui-test-manifest'
}
```

### Basic App Structure

```kotlin
package com.example.myapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import com.example.myapp.ui.theme.MyAppTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MyAppTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    Greeting("Android")
                }
            }
        }
    }
}

@Composable
fun Greeting(name: String, modifier: Modifier = Modifier) {
    Text(
        text = "Hello $name!",
        modifier = modifier
    )
}

@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    MyAppTheme {
        Greeting("Preview")
    }
}
```

---

## Composables & UI

### Text

```kotlin
@Composable
fun TextExamples() {
    Column {
        // Simple text
        Text("Hello World")
        
        // Styled text
        Text(
            text = "Styled Text",
            fontSize = 24.sp,
            fontWeight = FontWeight.Bold,
            color = Color.Blue,
            textAlign = TextAlign.Center
        )
        
        // Limited lines
        Text(
            text = "Long text that will be truncated...",
            maxLines = 1,
            overflow = TextOverflow.Ellipsis
        )
        
        // Annotated string
        Text(
            text = buildAnnotatedString {
                withStyle(style = SpanStyle(fontWeight = FontWeight.Bold)) {
                    append("Bold")
                }
                append(" and ")
                withStyle(style = SpanStyle(fontStyle = FontStyle.Italic)) {
                    append("Italic")
                }
            }
        )
    }
}
```

### Image

```kotlin
@Composable
fun ImageExamples() {
    Column {
        // Resource image
        Image(
            painter = painterResource(id = R.drawable.logo),
            contentDescription = "Logo",
            modifier = Modifier.size(100.dp)
        )
        
        // Icon
        Icon(
            imageVector = Icons.Default.Favorite,
            contentDescription = "Favorite",
            tint = Color.Red
        )
        
        // Network image (using Coil)
        AsyncImage(
            model = "https://example.com/image.jpg",
            contentDescription = "Network image",
            modifier = Modifier
                .size(200.dp)
                .clip(CircleShape)
        )
    }
}
```

### Button

```kotlin
@Composable
fun ButtonExamples() {
    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
        // Filled button
        Button(onClick = { /* Action */ }) {
            Text("Filled Button")
        }
        
        // Outlined button
        OutlinedButton(onClick = { }) {
            Text("Outlined Button")
        }
        
        // Text button
        TextButton(onClick = { }) {
            Text("Text Button")
        }
        
        // Button with icon
        Button(onClick = { }) {
            Icon(
                imageVector = Icons.Default.Add,
                contentDescription = null,
                modifier = Modifier.size(18.dp)
            )
            Spacer(Modifier.width(8.dp))
            Text("Add Item")
        }
        
        // Floating Action Button
        FloatingActionButton(onClick = { }) {
            Icon(Icons.Default.Add, contentDescription = "Add")
        }
    }
}
```

### TextField

```kotlin
@Composable
fun TextFieldExample() {
    var text by remember { mutableStateOf("") }
    var password by remember { mutableStateOf("") }
    
    Column {
        // Basic TextField
        TextField(
            value = text,
            onValueChange = { text = it },
            label = { Text("Enter text") },
            placeholder = { Text("Placeholder") }
        )
        
        // Outlined TextField
        OutlinedTextField(
            value = text,
            onValueChange = { text = it },
            label = { Text("Email") },
            singleLine = true,
            keyboardOptions = KeyboardOptions(
                keyboardType = KeyboardType.Email,
                imeAction = ImeAction.Next
            )
        )
        
        // Password field
        OutlinedTextField(
            value = password,
            onValueChange = { password = it },
            label = { Text("Password") },
            visualTransformation = PasswordVisualTransformation(),
            keyboardOptions = KeyboardOptions(
                keyboardType = KeyboardType.Password
            )
        )
    }
}
```

### Card

```kotlin
@Composable
fun CardExample() {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(
                text = "Card Title",
                style = MaterialTheme.typography.headlineSmall
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = "Card content goes here",
                style = MaterialTheme.typography.bodyMedium
            )
        }
    }
}
```

---

## Layout System

### Column (Vertical)

```kotlin
@Composable
fun VerticalLayout() {
    Column(
        modifier = Modifier.fillMaxSize(),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text("First")
        Text("Second")
        Text("Third")
    }
}
```

### Row (Horizontal)

```kotlin
@Composable
fun HorizontalLayout() {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Icon(Icons.Default.Person, contentDescription = null)
        Text("John Doe")
        Icon(Icons.Default.ArrowForward, contentDescription = null)
    }
}
```

### Box (Overlapping)

```kotlin
@Composable
fun OverlappingLayout() {
    Box(
        modifier = Modifier.size(200.dp),
        contentAlignment = Alignment.Center
    ) {
        Image(
            painter = painterResource(R.drawable.background),
            contentDescription = null,
            modifier = Modifier.fillMaxSize()
        )
        Text(
            text = "Overlay Text",
            color = Color.White,
            fontSize = 24.sp
        )
    }
}
```

### Spacer

```kotlin
@Composable
fun SpacerExample() {
    Row {
        Text("Left")
        Spacer(modifier = Modifier.weight(1f))  // Fills available space
        Text("Right")
    }
}
```

### LazyColumn (Lists)

```kotlin
@Composable
fun ScrollableList() {
    LazyColumn {
        items(100) { index ->
            Text(
                text = "Item $index",
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp)
            )
        }
    }
}

// With data
@Composable
fun ItemList(items: List<String>) {
    LazyColumn {
        items(items) { item ->
            ListItem(item)
        }
    }
}
```

### LazyRow & Grid

```kotlin
@Composable
fun HorizontalList() {
    LazyRow(
        horizontalArrangement = Arrangement.spacedBy(8.dp),
        contentPadding = PaddingValues(horizontal = 16.dp)
    ) {
        items(20) { index ->
            Card(
                modifier = Modifier.size(150.dp, 100.dp)
            ) {
                Box(contentAlignment = Alignment.Center) {
                    Text("Item $index")
                }
            }
        }
    }
}

@Composable
fun GridLayout() {
    LazyVerticalGrid(
        columns = GridCells.Fixed(2),
        contentPadding = PaddingValues(16.dp),
        horizontalArrangement = Arrangement.spacedBy(8.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        items(20) { index ->
            Card(
                modifier = Modifier
                    .aspectRatio(1f)
                    .fillMaxWidth()
            ) {
                Box(contentAlignment = Alignment.Center) {
                    Text("Item $index")
                }
            }
        }
    }
}
```

### Scaffold

```kotlin
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AppScaffold() {
    var selectedItem by remember { mutableStateOf(0) }
    
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("My App") },
                actions = {
                    IconButton(onClick = { }) {
                        Icon(Icons.Default.Search, contentDescription = "Search")
                    }
                }
            )
        },
        bottomBar = {
            NavigationBar {
                NavigationBarItem(
                    icon = { Icon(Icons.Default.Home, contentDescription = null) },
                    label = { Text("Home") },
                    selected = selectedItem == 0,
                    onClick = { selectedItem = 0 }
                )
                NavigationBarItem(
                    icon = { Icon(Icons.Default.Search, contentDescription = null) },
                    label = { Text("Search") },
                    selected = selectedItem == 1,
                    onClick = { selectedItem = 1 }
                )
                NavigationBarItem(
                    icon = { Icon(Icons.Default.Person, contentDescription = null) },
                    label = { Text("Profile") },
                    selected = selectedItem == 2,
                    onClick = { selectedItem = 2 }
                )
            }
        },
        floatingActionButton = {
            FloatingActionButton(onClick = { }) {
                Icon(Icons.Default.Add, contentDescription = "Add")
            }
        }
    ) { paddingValues ->
        // Content
        Box(modifier = Modifier.padding(paddingValues)) {
            when (selectedItem) {
                0 -> HomeScreen()
                1 -> SearchScreen()
                2 -> ProfileScreen()
            }
        }
    }
}
```

---

## State Management

### remember & mutableStateOf

```kotlin
@Composable
fun Counter() {
    var count by remember { mutableStateOf(0) }
    
    Column(horizontalAlignment = Alignment.CenterHorizontally) {
        Text("Count: $count", fontSize = 32.sp)
        Button(onClick = { count++ }) {
            Text("Increment")
        }
    }
}
```

### rememberSaveable (Survives Configuration Changes)

```kotlin
@Composable
fun SurvivableState() {
    var text by rememberSaveable { mutableStateOf("") }
    
    TextField(
        value = text,
        onValueChange = { text = it },
        label = { Text("Enter text") }
    )
}
```

### State Hoisting

```kotlin
@Composable
fun CounterApp() {
    var count by remember { mutableStateOf(0) }
    
    Column {
        CounterDisplay(count = count)
        CounterButtons(
            count = count,
            onIncrement = { count++ },
            onDecrement = { count-- }
        )
    }
}

@Composable
fun CounterDisplay(count: Int) {
    Text("Count: $count", fontSize = 32.sp)
}

@Composable
fun CounterButtons(
    count: Int,
    onIncrement: () -> Unit,
    onDecrement: () -> Unit
) {
    Row {
        Button(onClick = onDecrement) { Text("-") }
        Spacer(Modifier.width(8.dp))
        Button(onClick = onIncrement) { Text("+") }
    }
}
```

### ViewModel

```kotlin
class CounterViewModel : ViewModel() {
    private val _count = MutableStateFlow(0)
    val count: StateFlow<Int> = _count.asStateFlow()
    
    fun increment() {
        _count.value++
    }
    
    fun decrement() {
        _count.value--
    }
}

@Composable
fun CounterScreen(viewModel: CounterViewModel = viewModel()) {
    val count by viewModel.count.collectAsState()
    
    Column {
        Text("Count: $count", fontSize = 32.sp)
        Row {
            Button(onClick = { viewModel.decrement() }) { Text("-") }
            Button(onClick = { viewModel.increment() }) { Text("+") }
        }
    }
}
```

### StateFlow & LiveData

```kotlin
class UserViewModel : ViewModel() {
    private val _users = MutableStateFlow<List<User>>(emptyList())
    val users: StateFlow<List<User>> = _users.asStateFlow()
    
    fun loadUsers() {
        viewModelScope.launch {
            _users.value = repository.getUsers()
        }
    }
}

@Composable
fun UserList(viewModel: UserViewModel = viewModel()) {
    val users by viewModel.users.collectAsState()
    
    LazyColumn {
        items(users) { user ->
            UserItem(user)
        }
    }
}
```

---

## Navigation

### Navigation Component

```kotlin
// build.gradle
implementation "androidx.navigation:navigation-compose:2.7.5"

// Setup
@Composable
fun AppNavigation() {
    val navController = rememberNavController()
    
    NavHost(navController = navController, startDestination = "home") {
        composable("home") {
            HomeScreen(
                onNavigateToDetails = { id ->
                    navController.navigate("details/$id")
                }
            )
        }
        composable(
            route = "details/{itemId}",
            arguments = listOf(navArgument("itemId") { type = NavType.IntType })
        ) { backStackEntry ->
            val itemId = backStackEntry.arguments?.getInt("itemId")
            DetailsScreen(
                itemId = itemId,
                onNavigateBack = { navController.popBackStack() }
            )
        }
    }
}

@Composable
fun HomeScreen(onNavigateToDetails: (Int) -> Unit) {
    Column {
        Button(onClick = { onNavigateToDetails(123) }) {
            Text("Go to Details")
        }
    }
}

@Composable
fun DetailsScreen(itemId: Int?, onNavigateBack: () -> Unit) {
    Column {
        Text("Details for item $itemId")
        Button(onClick = onNavigateBack) {
            Text("Go Back")
        }
    }
}
```

### Bottom Navigation

```kotlin
@Composable
fun MainScreen() {
    val navController = rememberNavController()
    
    Scaffold(
        bottomBar = {
            NavigationBar {
                val items = listOf("home", "search", "profile")
                val currentRoute = navController.currentBackStackEntryAsState().value?.destination?.route
                
                items.forEach { screen ->
                    NavigationBarItem(
                        icon = { Icon(getIconFor(screen), contentDescription = null) },
                        label = { Text(screen.capitalize()) },
                        selected = currentRoute == screen,
                        onClick = {
                            navController.navigate(screen) {
                                popUpTo(navController.graph.id) { saveState = true }
                                launchSingleTop = true
                                restoreState = true
                            }
                        }
                    )
                }
            }
        }
    ) { paddingValues ->
        NavHost(
            navController = navController,
            startDestination = "home",
            modifier = Modifier.padding(paddingValues)
        ) {
            composable("home") { HomeScreen() }
            composable("search") { SearchScreen() }
            composable("profile") { ProfileScreen() }
        }
    }
}
```

---

## Lists & Data

### LazyColumn with Data

```kotlin
data class Post(
    val id: Int,
    val title: String,
    val author: String,
    val content: String
)

@Composable
fun PostsList(posts: List<Post>) {
    LazyColumn {
        items(
            items = posts,
            key = { post -> post.id }
        ) { post ->
            PostItem(post)
        }
    }
}

@Composable
fun PostItem(post: Post) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 16.dp, vertical = 8.dp)
    ) {
        Column(modifier = Modifier.padding(16.dp)) {
            Text(
                text = post.title,
                style = MaterialTheme.typography.titleMedium
            )
            Text(
                text = "by ${post.author}",
                style = MaterialTheme.typography.bodySmall,
                color = MaterialTheme.colorScheme.onSurfaceVariant
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = post.content,
                style = MaterialTheme.typography.bodyMedium
            )
        }
    }
}
```

### Pull to Refresh

```kotlin
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun RefreshableList(viewModel: PostsViewModel = viewModel()) {
    val posts by viewModel.posts.collectAsState()
    val isRefreshing by viewModel.isRefreshing.collectAsState()
    
    val pullRefreshState = rememberPullRefreshState(
        refreshing = isRefreshing,
        onRefresh = { viewModel.refresh() }
    )
    
    Box(modifier = Modifier.pullRefresh(pullRefreshState)) {
        LazyColumn {
            items(posts) { post ->
                PostItem(post)
            }
        }
        
        PullRefreshIndicator(
            refreshing = isRefreshing,
            state = pullRefreshState,
            modifier = Modifier.align(Alignment.TopCenter)
        )
    }
}
```

---

## Material Design 3

### Theme

```kotlin
// ui/theme/Color.kt
val Purple80 = Color(0xFFD0BCFF)
val PurpleGrey80 = Color(0xFFCCC2DC)
val Pink80 = Color(0xFFEFB8C8)

val Purple40 = Color(0xFF6650a4)
val PurpleGrey40 = Color(0xFF625b71)
val Pink40 = Color(0xFF7D5260)

// ui/theme/Theme.kt
private val DarkColorScheme = darkColorScheme(
    primary = Purple80,
    secondary = PurpleGrey80,
    tertiary = Pink80
)

private val LightColorScheme = lightColorScheme(
    primary = Purple40,
    secondary = PurpleGrey40,
    tertiary = Pink40
)

@Composable
fun MyAppTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    dynamicColor: Boolean = true,
    content: @Composable () -> Unit
) {
    val colorScheme = when {
        dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
            val context = LocalContext.current
            if (darkTheme) dynamicDarkColorScheme(context) else dynamicLightColorScheme(context)
        }
        darkTheme -> DarkColorScheme
        else -> LightColorScheme
    }
    
    MaterialTheme(
        colorScheme = colorScheme,
        typography = Typography,
        content = content
    )
}
```

### Typography

```kotlin
// ui/theme/Type.kt
val Typography = Typography(
    bodyLarge = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.Normal,
        fontSize = 16.sp,
        lineHeight = 24.sp,
        letterSpacing = 0.5.sp
    ),
    titleLarge = TextStyle(
        fontFamily = FontFamily.Default,
        fontWeight = FontWeight.Bold,
        fontSize = 22.sp,
        lineHeight = 28.sp,
        letterSpacing = 0.sp
    )
)
```

---

## Theming

### Custom Theme

```kotlin
@Composable
fun CustomTheme(content: @Composable () -> Unit) {
    val customColors = lightColorScheme(
        primary = Color(0xFF6200EE),
        onPrimary = Color.White,
        primaryContainer = Color(0xFF3700B3),
        secondary = Color(0xFF03DAC6),
        background = Color(0xFFF5F5F5),
        surface = Color.White,
        error = Color(0xFFB00020)
    )
    
    MaterialTheme(
        colorScheme = customColors,
        typography = Typography,
        content = content
    )
}
```

### Dynamic Colors (Material You)

```kotlin
@Composable
fun DynamicColorTheme(content: @Composable () -> Unit) {
    val context = LocalContext.current
    val darkTheme = isSystemInDarkTheme()
    
    val colorScheme = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
        if (darkTheme) dynamicDarkColorScheme(context)
        else dynamicLightColorScheme(context)
    } else {
        if (darkTheme) DarkColorScheme else LightColorScheme
    }
    
    MaterialTheme(
        colorScheme = colorScheme,
        content = content
    )
}
```

---

## Animations

### Animate*AsState

```kotlin
@Composable
fun AnimatedBox() {
    var expanded by remember { mutableStateOf(false) }
    
    val size by animateDpAsState(
        targetValue = if (expanded) 200.dp else 100.dp,
        label = "size"
    )
    
    Box(
        modifier = Modifier
            .size(size)
            .background(Color.Blue)
            .clickable { expanded = !expanded }
    )
}
```

### AnimatedVisibility

```kotlin
@Composable
fun AnimatedContent() {
    var visible by remember { mutableStateOf(true) }
    
    Column {
        Button(onClick = { visible = !visible }) {
            Text("Toggle")
        }
        
        AnimatedVisibility(
            visible = visible,
            enter = fadeIn() + slideInVertically(),
            exit = fadeOut() + slideOutVertically()
        ) {
            Card(modifier = Modifier.padding(16.dp)) {
                Text("Animated Content", modifier = Modifier.padding(16.dp))
            }
        }
    }
}
```

### Transition

```kotlin
@Composable
fun TransitionAnimation() {
    var currentState by remember { mutableStateOf(BoxState.Small) }
    val transition = updateTransition(targetState = currentState, label = "box transition")
    
    val size by transition.animateDp(label = "size") { state ->
        when (state) {
            BoxState.Small -> 64.dp
            BoxState.Large -> 128.dp
        }
    }
    
    val color by transition.animateColor(label = "color") { state ->
        when (state) {
            BoxState.Small -> Color.Blue
            BoxState.Large -> Color.Red
        }
    }
    
    Box(
        modifier = Modifier
            .size(size)
            .background(color)
            .clickable {
                currentState = if (currentState == BoxState.Small) BoxState.Large else BoxState.Small
            }
    )
}

enum class BoxState { Small, Large }
```

---

## Side Effects

### LaunchedEffect

```kotlin
@Composable
fun OneTimeEffect(key: Any?) {
    LaunchedEffect(key) {
        // Runs when key changes
        loadData()
    }
}
```

### DisposableEffect

```kotlin
@Composable
fun LifecycleEffect() {
    DisposableEffect(Unit) {
        val listener = createListener()
        registerListener(listener)
        
        onDispose {
            unregisterListener(listener)
        }
    }
}
```

### rememberCoroutineScope

```kotlin
@Composable
fun SnackbarExample() {
    val scope = rememberCoroutineScope()
    val snackbarHostState = remember { SnackbarHostState() }
    
    Scaffold(
        snackbarHost = { SnackbarHost(snackbarHostState) }
    ) {
        Button(onClick = {
            scope.launch {
                snackbarHostState.showSnackbar("Action completed")
            }
        }) {
            Text("Show Snackbar")
        }
    }
}
```

---

## Interoperability

### ComposeView (Compose in XML)

```xml
<!-- layout.xml -->
<LinearLayout>
    <androidx.compose.ui.platform.ComposeView
        android:id="@+id/compose_view"
        android:layout_width="match_parent"
        android:layout_height="wrap_content" />
</LinearLayout>
```

```kotlin
// Activity
val composeView = findViewById<ComposeView>(R.id.compose_view)
composeView.setContent {
    MyAppTheme {
        Greeting("Android")
    }
}
```

### AndroidView (XML in Compose)

```kotlin
@Composable
fun CustomWebView(url: String) {
    AndroidView(factory = { context ->
        WebView(context).apply {
            settings.javaScriptEnabled = true
            loadUrl(url)
        }
    })
}
```

---

## Testing

### Unit Tests

```kotlin
class CounterViewModelTest {
    @Test
    fun `increment increases count`() {
        val viewModel = CounterViewModel()
        viewModel.increment()
        assertEquals(1, viewModel.count.value)
    }
}
```

### UI Tests

```kotlin
class ComposeTests {
    @get:Rule
    val composeTestRule = createComposeRule()
    
    @Test
    fun myTest() {
        composeTestRule.setContent {
            MyAppTheme {
                Greeting("Test")
            }
        }
        
        composeTestRule
            .onNodeWithText("Hello Test!")
            .assertIsDisplayed()
    }
    
    @Test
    fun buttonClickTest() {
        composeTestRule.setContent {
            Counter()
        }
        
        composeTestRule.onNodeWithText("Increment").performClick()
        composeTestRule.onNodeWithText("Count: 1").assertExists()
    }
}
```

---

## Best Practices

### 1. **Extract Composables**
```kotlin
@Composable
fun Screen() {
    Column {
        Header()
        Content()
        Footer()
    }
}
```

### 2. **Use remember for Expensive Operations**
```kotlin
val expensiveObject = remember { createExpensiveObject() }
```

### 3. **Hoist State**
```kotlin
@Composable
fun StatelessComponent(value: String, onValueChange: (String) -> Unit)
```

### 4. **Use keys in Lists**
```kotlin
items(items, key = { it.id }) { item ->
    ItemRow(item)
}
```

### 5. **Preview Composables**
```kotlin
@Preview(showBackground = true)
@Preview(uiMode = UI_MODE_NIGHT_YES)
@Composable
fun MyPreview() {
    MyAppTheme {
        MyComposable()
    }
}
```

---

## Resources

### Official Documentation
- [Jetpack Compose Docs](https://developer.android.com/jetpack/compose)
- [Compose Samples](https://github.com/android/compose-samples)
- [Material 3](https://m3.material.io/)

### Learning Resources
- [Compose Pathway](https://developer.android.com/courses/pathways/compose)
- [Compose Tutorial](https://developer.android.com/jetpack/compose/tutorial)

### Tools
- [Android Studio](https://developer.android.com/studio)
- [Compose Compiler](https://developer.android.com/jetpack/androidx/releases/compose-compiler)

---

## Conclusion

Jetpack Compose is the future of Android UI development, offering a modern, declarative approach that simplifies building beautiful, performant Android apps. With its Kotlin-first design and powerful tooling, Compose makes Android development more enjoyable and productive.

Happy coding with Jetpack Compose! 🤖✨
