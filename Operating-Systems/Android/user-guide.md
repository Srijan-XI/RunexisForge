# Android Usage Guide

## Development Setup

- Install Android Studio: <https://developer.android.com/studio>
- Install SDK platforms and an emulator via SDK Manager
- Enable USB debugging for device testing

## Create a Project (Android Studio)

- New Project > Empty Activity
- Language: Kotlin recommended

### Minimal Activity (Kotlin)

```kotlin
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }
}
```bash

## Build and Run

- Click Run ▶ to deploy to emulator/device
- Gradle tasks: `./gradlew assembleDebug`, `./gradlew test`

## Jetpack Compose

- Add Compose template; use composables for UI

```kotlin
@Composable
fun Hello() { Text("Hello, Android") }
```bash

## Packaging

- Debug builds are signed with debug keys
- Release signing via `app/signingConfigs` in `build.gradle`
- Generate bundle/APK: `./gradlew bundleRelease` or `assembleRelease`

## Testing

- Unit tests: JUnit
- Instrumented: Espresso or Compose testing

## Publishing

- Use Play Console for uploads, tracks, and staged rollouts
