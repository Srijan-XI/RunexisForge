# Kotlin Multiplatform Mobile (KMM) - Share Code Across Platforms

## Table of Contents
- [Introduction](#introduction)
- [What is Kotlin Multiplatform?](#what-is-kotlin-multiplatform)
- [Key Features](#key-features)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Shared Code](#shared-code)
- [Platform-Specific Code](#platform-specific-code)
- [Networking](#networking)
- [Data Persistence](#data-persistence)
- [Dependency Injection](#dependency-injection)
- [Testing](#testing)
- [Integration with Native](#integration-with-native)
- [Best Practices](#best-practices)
- [Resources](#resources)

---

## Introduction

**Kotlin Multiplatform Mobile (KMM)** is a technology that allows you to share code between iOS and Android applications while retaining the flexibility to write platform-specific code when needed. Unlike other cross-platform solutions, KMM doesn't replace native development—it enhances it by sharing business logic while keeping native UIs.

### Why Choose KMM?

- **Native UI**: Use SwiftUI/UIKit for iOS, Jetpack Compose/Views for Android
- **Gradual Adoption**: Start small, share more over time
- **Code Sharing**: Share business logic, networking, data models
- **Performance**: Native performance on both platforms
- **Flexibility**: Write platform-specific code when needed
- **Type-Safe**: Kotlin's type system prevents errors
- **Modern Language**: Leverage Kotlin's powerful features

---

## What is Kotlin Multiplatform?

Kotlin Multiplatform is a feature of Kotlin that allows you to write code once and compile it to multiple platforms:

### Supported Platforms

- **Mobile**: iOS, Android
- **Desktop**: JVM (Windows, macOS, Linux)
- **Web**: JavaScript, WebAssembly
- **Server**: JVM, Native

### KMM Philosophy

**Share what you want, keep what you don't**

- Share: Business logic, data models, networking, caching
- Keep Native: UI, platform-specific features, animations

---

## Key Features

### 1. **Code Sharing**
Share Kotlin code between platforms while maintaining native UIs.

### 2. **expect/actual Mechanism**
Define expected API in shared code, provide platform-specific implementations.

### 3. **Native Interop**
Call platform-specific APIs from shared code.

### 4. **Gradle Integration**
Unified build system for all platforms.

### 5. **IDE Support**
Full support in Android Studio and IntelliJ IDEA.

---

## Architecture

### Typical KMM Project Structure

```
MyKMMApp/
├── shared/
│   ├── src/
│   │   ├── commonMain/         # Shared code
│   │   │   └── kotlin/
│   │   ├── androidMain/        # Android-specific
│   │   │   └── kotlin/
│   │   ├── iosMain/            # iOS-specific
│   │   │   └── kotlin/
│   │   ├── commonTest/         # Shared tests
│   │   ├── androidTest/        # Android tests
│   │   └── iosTest/            # iOS tests
│   └── build.gradle.kts
├── androidApp/                 # Android application
│   ├── src/
│   └── build.gradle.kts
├── iosApp/                     # iOS application (Xcode project)
│   ├── iosApp/
│   │   ├── ContentView.swift
│   │   └── iosApp.swift
│   └── iosApp.xcodeproj
└── build.gradle.kts
```

### Architecture Layers

```
┌─────────────────────────────────────┐
│         UI Layer (Native)           │
│   SwiftUI/UIKit  │  Jetpack Compose │
├─────────────────────────────────────┤
│      Presentation Layer (Shared)    │
│      ViewModels, State Management   │
├─────────────────────────────────────┤
│       Business Logic (Shared)       │
│    Use Cases, Domain Models         │
├─────────────────────────────────────┤
│        Data Layer (Shared)          │
│   Repository, Network, Cache        │
├─────────────────────────────────────┤
│    Platform APIs (expect/actual)    │
│     iOS Native  │  Android Native   │
└─────────────────────────────────────┘
```

---

## Getting Started

### Requirements

- **Android Studio**: Arctic Fox or later (with KMM plugin)
- **Xcode**: 13 or later (for iOS development on macOS)
- **Kotlin**: 1.9.0 or later
- **macOS**: Required for iOS development

### Install KMM Plugin

1. Open Android Studio
2. Settings → Plugins
3. Search "Kotlin Multiplatform Mobile"
4. Install and restart

### Create New KMM Project

```bash
# Using Android Studio
File → New → New Project → Kotlin Multiplatform App

# Or using KMM Wizard
# Visit: https://kmp.jetbrains.com/
```

### Shared Module Setup

```kotlin
// shared/build.gradle.kts
plugins {
    kotlin("multiplatform")
    kotlin("native.cocoapods")
    id("com.android.library")
    kotlin("plugin.serialization")
}

kotlin {
    android {
        compilations.all {
            kotlinOptions {
                jvmTarget = "1.8"
            }
        }
    }
    
    listOf(
        iosX64(),
        iosArm64(),
        iosSimulatorArm64()
    ).forEach {
        it.binaries.framework {
            baseName = "shared"
        }
    }

    sourceSets {
        val commonMain by getting {
            dependencies {
                implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.7.3")
                implementation("io.ktor:ktor-client-core:2.3.5")
                implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.6.0")
            }
        }
        val commonTest by getting {
            dependencies {
                implementation(kotlin("test"))
            }
        }
        val androidMain by getting {
            dependencies {
                implementation("io.ktor:ktor-client-android:2.3.5")
            }
        }
        val iosMain by creating {
            dependencies {
                implementation("io.ktor:ktor-client-darwin:2.3.5")
            }
        }
    }
}

android {
    namespace = "com.example.myapp.shared"
    compileSdk = 34
    defaultConfig {
        minSdk = 24
    }
}
```

---

## Shared Code

### Data Models

```kotlin
// commonMain/kotlin/models/User.kt
@Serializable
data class User(
    val id: Int,
    val name: String,
    val email: String,
    val avatarUrl: String? = null
)

@Serializable
data class Post(
    val id: Int,
    val userId: Int,
    val title: String,
    val body: String,
    val createdAt: Long
)
```

### Business Logic

```kotlin
// commonMain/kotlin/domain/UserRepository.kt
interface UserRepository {
    suspend fun getUsers(): List<User>
    suspend fun getUserById(id: Int): User?
    suspend fun createUser(user: User): User
}

class UserRepositoryImpl(
    private val api: ApiService,
    private val cache: UserCache
) : UserRepository {
    override suspend fun getUsers(): List<User> {
        return try {
            val users = api.fetchUsers()
            cache.saveUsers(users)
            users
        } catch (e: Exception) {
            cache.getUsers()
        }
    }
    
    override suspend fun getUserById(id: Int): User? {
        return cache.getUserById(id) ?: api.fetchUser(id)
    }
    
    override suspend fun createUser(user: User): User {
        return api.createUser(user)
    }
}
```

### Use Cases

```kotlin
// commonMain/kotlin/domain/usecases/GetUsersUseCase.kt
class GetUsersUseCase(private val repository: UserRepository) {
    suspend operator fun invoke(): Result<List<User>> {
        return try {
            Result.success(repository.getUsers())
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}

class GetUserByIdUseCase(private val repository: UserRepository) {
    suspend operator fun invoke(id: Int): Result<User> {
        return try {
            val user = repository.getUserById(id)
            if (user != null) {
                Result.success(user)
            } else {
                Result.failure(Exception("User not found"))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}
```

---

## Platform-Specific Code

### expect/actual Declaration

```kotlin
// commonMain/kotlin/platform/Platform.kt
expect class Platform() {
    val name: String
    val version: String
}

expect fun platformLogger(message: String)

// androidMain/kotlin/platform/Platform.kt
actual class Platform {
    actual val name: String = "Android"
    actual val version: String = android.os.Build.VERSION.SDK_INT.toString()
}

actual fun platformLogger(message: String) {
    android.util.Log.d("KMM", message)
}

// iosMain/kotlin/platform/Platform.kt
import platform.UIKit.UIDevice

actual class Platform {
    actual val name: String = UIDevice.currentDevice.systemName()
    actual val version: String = UIDevice.currentDevice.systemVersion
}

actual fun platformLogger(message: String) {
    println("[KMM] $message")
}
```

### Platform-Specific Implementations

```kotlin
// commonMain
expect class DatabaseDriver

expect class HttpClientFactory() {
    fun createClient(): HttpClient
}

// androidMain
actual class DatabaseDriver {
    // Android SQLite implementation
}

actual class HttpClientFactory {
    actual fun createClient(): HttpClient {
        return HttpClient(Android) {
            install(JsonFeature)
        }
    }
}

// iosMain
actual class DatabaseDriver {
    // iOS Core Data or SQLite implementation
}

actual class HttpClientFactory {
    actual fun createClient(): HttpClient {
        return HttpClient(Darwin) {
            install(JsonFeature)
        }
    }
}
```

---

## Networking

### Ktor Client (Multiplatform)

```kotlin
// commonMain/kotlin/network/ApiService.kt
import io.ktor.client.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import kotlinx.serialization.json.Json

class ApiService(private val httpClient: HttpClient) {
    private val json = Json { ignoreUnknownKeys = true }
    private val baseUrl = "https://api.example.com"
    
    suspend fun fetchUsers(): List<User> {
        val response: HttpResponse = httpClient.get("$baseUrl/users")
        val body = response.bodyAsText()
        return json.decodeFromString(body)
    }
    
    suspend fun fetchUser(id: Int): User {
        val response: HttpResponse = httpClient.get("$baseUrl/users/$id")
        val body = response.bodyAsText()
        return json.decodeFromString(body)
    }
    
    suspend fun createUser(user: User): User {
        val response: HttpResponse = httpClient.post("$baseUrl/users") {
            setBody(json.encodeToString(User.serializer(), user))
            headers {
                append("Content-Type", "application/json")
            }
        }
        val body = response.bodyAsText()
        return json.decodeFromString(body)
    }
}

// Setup
fun createApiService(): ApiService {
    val client = HttpClient {
        install(ContentNegotiation) {
            json(Json {
                ignoreUnknownKeys = true
                prettyPrint = true
            })
        }
        install(Logging) {
            level = LogLevel.INFO
        }
    }
    return ApiService(client)
}
```

---

## Data Persistence

### SQLDelight (Multiplatform Database)

```kotlin
// build.gradle.kts
plugins {
    id("app.cash.sqldelight") version "2.0.0"
}

sqldelight {
    databases {
        create("Database") {
            packageName.set("com.example.myapp.db")
        }
    }
}

// shared/src/commonMain/sqldelight/com/example/myapp/db/User.sq
CREATE TABLE User (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    avatarUrl TEXT
);

selectAll:
SELECT * FROM User;

selectById:
SELECT * FROM User WHERE id = ?;

insert:
INSERT OR REPLACE INTO User(id, name, email, avatarUrl)
VALUES (?, ?, ?, ?);

deleteById:
DELETE FROM User WHERE id = ?;

// Usage in Kotlin
class UserCache(private val database: Database) {
    private val queries = database.userQueries
    
    fun saveUser(user: User) {
        queries.insert(
            id = user.id.toLong(),
            name = user.name,
            email = user.email,
            avatarUrl = user.avatarUrl
        )
    }
    
    fun getUsers(): List<User> {
        return queries.selectAll().executeAsList().map { it.toUser() }
    }
    
    fun getUserById(id: Int): User? {
        return queries.selectById(id.toLong()).executeAsOneOrNull()?.toUser()
    }
}
```

### DataStore (Multiplatform Preferences)

```kotlin
// build.gradle.kts
dependencies {
    commonMain {
        implementation("androidx.datastore:datastore-preferences-core:1.0.0")
    }
}

// commonMain
expect fun createDataStore(): DataStore<Preferences>

class SettingsRepository(private val dataStore: DataStore<Preferences>) {
    companion object {
        val THEME_KEY = stringPreferencesKey("theme")
        val NOTIFICATIONS_KEY = booleanPreferencesKey("notifications")
    }
    
    val theme: Flow<String> = dataStore.data.map { preferences ->
        preferences[THEME_KEY] ?: "system"
    }
    
    suspend fun setTheme(theme: String) {
        dataStore.edit { preferences ->
            preferences[THEME_KEY] = theme
        }
    }
}
```

---

## Dependency Injection

### Koin (Multiplatform DI)

```kotlin
// build.gradle.kts
dependencies {
    commonMain {
        implementation("io.insert-koin:koin-core:3.5.0")
    }
}

// commonMain/kotlin/di/AppModule.kt
val networkModule = module {
    single { HttpClientFactory().createClient() }
    single { ApiService(get()) }
}

val repositoryModule = module {
    single<UserRepository> { UserRepositoryImpl(get(), get()) }
    single { UserCache(get()) }
}

val useCaseModule = module {
    factory { GetUsersUseCase(get()) }
    factory { GetUserByIdUseCase(get()) }
}

val appModules = listOf(networkModule, repositoryModule, useCaseModule)

// Initialize Koin
fun initKoin() {
    startKoin {
        modules(appModules)
    }
}

// Android
class MyApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        initKoin()
    }
}

// iOS
fun initKoinIos() = initKoin()
```

---

## Testing

### Common Tests

```kotlin
// commonTest/kotlin/domain/GetUsersUseCaseTest.kt
class GetUsersUseCaseTest {
    private val mockRepository = mockk<UserRepository>()
    private val useCase = GetUsersUseCase(mockRepository)
    
    @Test
    fun `test get users success`() = runTest {
        // Given
        val expectedUsers = listOf(
            User(1, "John", "john@example.com"),
            User(2, "Jane", "jane@example.com")
        )
        coEvery { mockRepository.getUsers() } returns expectedUsers
        
        // When
        val result = useCase()
        
        // Then
        assertTrue(result.isSuccess)
        assertEquals(expectedUsers, result.getOrNull())
    }
    
    @Test
    fun `test get users failure`() = runTest {
        // Given
        val exception = Exception("Network error")
        coEvery { mockRepository.getUsers() } throws exception
        
        // When
        val result = useCase()
        
        // Then
        assertTrue(result.isFailure)
    }
}
```

---

## Integration with Native

### Android Integration

```kotlin
// androidApp/src/main/java/MainActivity.kt
class MainActivity : ComponentActivity() {
    private val getUsersUseCase: GetUsersUseCase by inject()
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MyAppTheme {
                UsersScreen(getUsersUseCase)
            }
        }
    }
}

@Composable
fun UsersScreen(getUsersUseCase: GetUsersUseCase) {
    var users by remember { mutableStateOf<List<User>>(emptyList()) }
    var isLoading by remember { mutableStateOf(false) }
    
    LaunchedEffect(Unit) {
        isLoading = true
        getUsersUseCase().onSuccess {
            users = it
        }
        isLoading = false
    }
    
    if (isLoading) {
        CircularProgressIndicator()
    } else {
        LazyColumn {
            items(users) { user ->
                UserItem(user)
            }
        }
    }
}
```

### iOS Integration

```swift
// iosApp/UsersView.swift
import SwiftUI
import shared

struct UsersView: View {
    @StateObject private var viewModel = UsersViewModel()
    
    var body: some View {
        NavigationView {
            List(viewModel.users, id: \.id) { user in
                UserRow(user: user)
            }
            .navigationTitle("Users")
            .onAppear {
                viewModel.loadUsers()
            }
        }
    }
}

class UsersViewModel: ObservableObject {
    @Published var users: [User] = []
    @Published var isLoading = false
    
    private let getUsersUseCase = GetUsersUseCase(
        repository: KoinKt.getKoin().get()
    )
    
    func loadUsers() {
        isLoading = true
        Task {
            do {
                let result = try await getUsersUseCase.invoke()
                await MainActor.run {
                    self.users = result
                    self.isLoading = false
                }
            } catch {
                await MainActor.run {
                    self.isLoading = false
                }
            }
        }
    }
}
```

### Kotlin Coroutines in Swift

```swift
// Helper to use Kotlin suspend functions in Swift
extension GetUsersUseCase {
    func invokeAsync() async throws -> [User] {
        return try await withCheckedThrowingContinuation { continuation in
            self.invoke { result, error in
                if let result = result {
                    continuation.resume(returning: result)
                } else if let error = error {
                    continuation.resume(throwing: error)
                }
            }
        }
    }
}
```

---

## Best Practices

### 1. **Start Small**
Begin by sharing data models and networking code, then gradually add more.

### 2. **Keep UI Native**
Use SwiftUI/UIKit for iOS, Jetpack Compose/Views for Android.

### 3. **Use expect/actual Wisely**
Only for platform-specific APIs. Prefer dependency injection for testability.

### 4. **Share Business Logic**
ViewModels, use cases, and repositories are perfect candidates for sharing.

### 5. **Platform-Specific Features**
Don't force shared code for platform-specific features.

### 6. **Testing First**
Write tests for shared code to ensure it works on all platforms.

### 7. **Modular Architecture**
Organize code into layers: data, domain, presentation.

---

## Resources

### Official Documentation
- [Kotlin Multiplatform](https://kotlinlang.org/docs/multiplatform.html)
- [KMM Documentation](https://kotlinlang.org/docs/multiplatform-mobile-getting-started.html)
- [Kotlin Slack](https://surveys.jetbrains.com/s3/kotlin-slack-sign-up)

### Libraries
- [Ktor](https://ktor.io/) - Networking
- [SQLDelight](https://cashapp.github.io/sqldelight/) - Database
- [Koin](https://insert-koin.io/) - Dependency Injection
- [Multiplatform Settings](https://github.com/russhwolf/multiplatform-settings) - Key-value storage

### Learning Resources
- [KMM Samples](https://github.com/Kotlin/kmm-basic-sample)
- [Touchlab KMM Resources](https://touchlab.co/kotlin-multiplatform/)

### Tools
- [Android Studio](https://developer.android.com/studio)
- [KMM Plugin](https://plugins.jetbrains.com/plugin/14936-kotlin-multiplatform-mobile)
- [Xcode](https://developer.apple.com/xcode/)

---

## Conclusion

Kotlin Multiplatform Mobile offers a unique approach to cross-platform development by allowing you to share business logic while keeping native UIs. This "share what you want" philosophy makes KMM an excellent choice for teams that want code reuse without sacrificing the native experience.

Start sharing code with KMM today! 🚀
