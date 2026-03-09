# Android

## Introduction

Android is the world's most popular mobile operating system, utilizing a modified version of the Linux kernel and other open-source software. Designed primarily for touchscreen mobile devices such as smartphones and tablets, Android is developed by a consortium of developers known as the Open Handset Alliance and commercially sponsored by Google.

As of recent years, Android holds the largest share of the global mobile operating system market. Its open-source nature (via the Android Open Source Project - AOSP) allows various manufacturers (OEMs) like Samsung, Pixel, Xiaomi, and OnePlus to customize the OS for their hardware, creating a diverse ecosystem of devices.

## Overview

Android is built on top of the Linux kernel, providing the foundational hardware abstraction. Above the kernel lies the Hardware Abstraction Layer (HAL), native libraries, the Android Runtime (ART), the Java API Framework, and finally, the System Apps.

This layered architecture allows for:
-   **Flexibility**: Runs on diverse hardware configurations.
-   **Open Source**: The core source code is known as AOSP (Android Open Source Project).
-   **Customizability**: OEMs can skin the OS (e.g., One UI, MIUI, OxygenOS).

### Architecture Deep Dive
1.  **Linux Kernel**: the bottom layer. It manages hardware drivers (display, camera, audio), power management, and memory management.
2.  **Hardware Abstraction Layer (HAL)**: Provides standard interfaces that expose device hardware capabilities to the higher-level Java API framework. HAL consists of multiple library modules, each of which implements an interface for a specific type of hardware component, such as the camera or bluetooth module.
3.  **Android Runtime (ART)**: For devices running Android 5.0 (API level 21) or higher, each app runs in its own process and with its own instance of the ART. ART is written to run multiple virtual machines on low-memory devices by executing DEX files.
    *   **AOT (Ahead-of-Time) compilation**: Compiles apps during installation.
    *   **JIT (Just-In-Time) compilation**: Compiles code during execution for faster performance.
4.  **Native C/C++ Libraries**: Many core Android system components and services, such as ART and HAL, are built from native code that requires native libraries written in C and C++.
5.  **Java API Framework**: The entire feature-set of the Android OS is available to you through APIs written in the Java language. These APIs form the building blocks you need to create your apps.
6.  **System Apps**: The set of core apps that come with the device (Email, SMS, Calendar, etc.).

## Application Components
Android apps are built using four primary components:
1.  **Activities**: Represent a single screen with a user interface.
2.  **Services**: Background operations (e.g., playing music, fetching data) without a UI.
3.  **Broadcast Receivers**: Respond to system-wide broadcast announcements (e.g., battery low, screen off).
4.  **Content Providers**: Manage a shared set of app data that you can store in the file system, SQLite database, or web.

## Security Model
*   **Sandboxing**: Each app runs in its own sandbox (its own Linux user ID). Code execution is isolated.
*   **Permissions**: Apps must request permission to access sensitive user data (Contacts, SMS, Location) or system features (Camera, Microphone).
    *   **Install-time permissions**: Granted automatically.
    *   **Runtime permissions**: User must explicitly grant access while the app is running (Android 6.0+).
*   **SELinux**: All processes enforce SELinux (Security-Enhanced Linux) Mandatory Access Control (MAC) to restrict processes to the minimum privileges required.

## Naming Origins & Version History

One of the most unique cultural aspects of Android history was its version naming convention. For over a decade, major Android releases were named after sweets or desserts, following an alphabetical order.

### The Sweet History
*   **Android 1.5**: Cupcake
*   **Android 1.6**: Donut
*   **Android 2.0/2.1**: Eclair
*   **Android 2.2**: Froyo (Frozen Yogurt)
*   **Android 2.3**: Gingerbread
*   **Android 3.0**: Honeycomb (Tablet only)
*   **Android 4.0**: Ice Cream Sandwich
*   **Android 4.1-4.3**: Jelly Bean
*   **Android 4.4**: KitKat
*   **Android 5.0/5.1**: Lollipop
*   **Android 6.0**: Marshmallow
*   **Android 7.0/7.1**: Nougat
*   **Android 8.0/8.1**: Oreo
*   **Android 9**: Pie

### The Shift to Numerical Branding
With the release of **Android 10** in 2019, Google officially ended the public dessert naming tradition to make the brand more globally accessible and inclusive (as not all foods are known worldwide). However, engineers still use sweet names internally:
*   **Android 10**: Quince Tart
*   **Android 11**: Red Velvet Cake
*   **Android 12**: Snow Cone
*   **Android 13**: Tiramisu
*   **Android 14**: Upside Down Cake
*   **Android 15**: Vanilla Ice Cream

## Key Features

- Linux kernel base
- App development with Java or Kotlin
- Google Play ecosystem and OEM stores
- Material Design system and Jetpack libraries

## Resources

- Docs: <https://developer.android.com>
- Design: <https://m3.material.io>

---

## User Guide

## Development Setup

- Install Android Studio: <https://developer.android.com/studio>
- Install SDK platforms and an emulator via SDK Manager
- Enable USB debugging for device testing

## Create a Project (Android Studio)

- New Project > Empty Activity
- Language: Kotlin recommended

### Minimal Activity (Kotlin)

```
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }
}
```

## Build and Run

- Click Run ▶ to deploy to emulator/device
- Gradle tasks: `./gradlew assembleDebug`, `./gradlew test`

## Modern Android Development (MAD)
Google advocates for "Modern Android Development" practice which involves:
*   **Kotlin First**: Kotlin is the primary language, offering null safety and conciseness.
*   **Jetpack Libraries**: A suite of libraries to help developers follow best practices, reduce boilerplate code, and write code that works consistently across Android versions and devices.
*   **Jetpack Compose**: The modern toolkit for building native UI, replacing the traditional XML layouts.
*   **Coroutines**: For asynchronous programming (networking, database calls) instead of callbacks or RxJava.

## Jetpack Compose
```
@Composable
fun Hello() { Text("Hello, Android") }
```
## Testing

- Unit tests: JUnit
- Instrumented: Espresso or Compose testing

## Publishing

- Use Play Console for uploads, tracks, and staged rollouts

