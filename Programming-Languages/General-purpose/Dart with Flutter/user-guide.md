# Dart with Flutter Installation and Usage Guide

## Install Flutter SDK

- Download from <https://docs.flutter.dev/get-started/install>
- Add `flutter/bin` to PATH
- Run `flutter doctor` to verify dependencies (Android Studio/Xcode as needed)

## Create and Run an App

```bash
flutter create hello_flutter
cd hello_flutter
flutter run
```bash

- Uses the connected device/emulator; add `-d chrome` for web.

## Project Layout

```bash
lib/
 └── main.dart
pubspec.yaml
android/
ios/
web/
```bash

## Minimal Flutter App

```dart
import 'package:flutter/material.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: const Text('Hello Flutter')),
        body: const Center(child: Text('Hi')), 
      ),
    );
  }
}
```bash

## Dependencies

```bash
flutter pub add http
flutter pub get
```bash

## Hot Reload vs. Restart

- `r` in the console for hot reload
- `R` for full restart when changing main state structure

## Build for Release

```bash
flutter build apk
flutter build ios --release
flutter build web
```bash

## Next Steps

- Explore state management (Provider, Riverpod, BLoC)
- Use `flutter test` for unit/widget tests
- Add CI with `flutter test` and `flutter analyze`
