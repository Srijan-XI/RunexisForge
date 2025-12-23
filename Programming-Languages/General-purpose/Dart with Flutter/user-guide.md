# Dart with Flutter Installation and Usage Guide

## Install Flutter SDK
- Download from https://docs.flutter.dev/get-started/install
- Add `flutter/bin` to PATH
- Run `flutter doctor` to verify dependencies (Android Studio/Xcode as needed)

## Create and Run an App
```bash
flutter create hello_flutter
cd hello_flutter
flutter run
```
- Uses the connected device/emulator; add `-d chrome` for web.

## Project Layout
```
lib/
 └── main.dart
pubspec.yaml
android/
ios/
web/
```

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
```

## Dependencies
```bash
flutter pub add http
flutter pub get
```

## Hot Reload vs. Restart
- `r` in the console for hot reload
- `R` for full restart when changing main state structure

## Build for Release
```bash
flutter build apk
flutter build ios --release
flutter build web
```

## Next Steps
- Explore state management (Provider, Riverpod, BLoC)
- Use `flutter test` for unit/widget tests
- Add CI with `flutter test` and `flutter analyze`
