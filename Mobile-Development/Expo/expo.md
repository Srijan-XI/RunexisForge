# Expo - React Native Development Platform

## Table of Contents
- [Introduction](#introduction)
- [What is Expo?](#what-is-expo)
- [Expo vs React Native CLI](#expo-vs-react-native-cli)
- [Installation & Setup](#installation--setup)
- [Project Structure](#project-structure)
- [Core Features](#core-features)
- [Expo APIs & SDKs](#expo-apis--sdks)
- [Navigation](#navigation)
- [Development Workflow](#development-workflow)
- [EAS (Expo Application Services)](#eas-expo-application-services)
- [Building & Deployment](#building--deployment)
- [Expo Go vs Development Builds](#expo-go-vs-development-builds)
- [Best Practices](#best-practices)
- [Resources](#resources)

---

## Introduction

**Expo** is a production-grade platform and framework for building React Native applications. It provides a set of tools and services that simplify the development, building, and deployment process, allowing developers to focus on creating great apps rather than dealing with complex native configurations.

### Why Choose Expo?

- **Zero Native Configuration**: No need for Xcode or Android Studio to get started
- **Instant Updates**: Push updates without app store approval (OTA updates)
- **Rich SDK**: Access to 50+ native modules out of the box
- **Easy Sharing**: Share apps via QR code during development
- **Managed Workflow**: Simplified build and deployment process
- **EAS Services**: Cloud-based building, updates,and submission
- **Cross-Platform**: Write once, run on iOS, Android, and Web

---

## What is Expo?

Expo consists of three main components:

### 1. **Expo SDK**
A collection of native libraries and APIs that work seamlessly across iOS and Android.

### 2. **Expo CLI**
Command-line tools for creating, developing, and building Expo projects.

### 3. **Expo Go**
A mobile app (iOS/Android) for testing your Expo projects without building them.

### 4. **EAS (Expo Application Services)**
Cloud services for building, submitting, and updating your apps.

---

## Expo vs React Native CLI

| Feature | Expo | React Native CLI |
|---------|------|------------------|
| **Setup Complexity** | Easy (no native setup) | Complex (needs Xcode/Android Studio) |
| **Native Modules** | Pre-built SDK modules | Full access to any module |
| **Custom Native Code** | Limited (with custom dev builds) | Full control |
| **OTA Updates** | Built-in (EAS Update) | Requires setup |
| **Build Process** | Cloud-based (EAS Build) | Local builds |
| **App Size** | Larger (includes Expo SDK) | Smaller |
| **Development Speed** | Faster | Slower |
| **Best For** | Rapid prototyping, most apps | Apps needing custom native code |

---

## Installation & Setup

### Prerequisites

```bash
# Node.js (LTS version recommended)
node --version  # v16.x or newer

# npm or yarn
npm --version
# or
yarn --version
```

### Install Expo CLI

```bash
# Using npm
npm install -g expo-cli

# Using yarn
yarn global add expo-cli

# Verify installation
expo --version
```

### Create a New Expo Project

```bash
# Create new project
npx create-expo-app my-awesome-app

# Navigate to project
cd my-awesome-app

# Start development server
npx expo start
```

### Choose a Template

```bash
# Blank template
npx create-expo-app my-app --template blank

# TypeScript template
npx create-expo-app my-app --template blank-typescript

# Tabs template (with navigation)
npx create-expo-app my-app --template tabs

# Bare workflow (advanced)
npx create-expo-app my-app --template bare-minimum
```

### Install Expo Go App

Download **Expo Go** from:
- **iOS**: App Store
- **Android**: Google Play Store

### Run Your App

```bash
# Start development server
npx expo start

# Scan QR code with:
# - iOS: Camera app
# - Android: Expo Go app

# Or run on specific platform
npx expo start --ios        # iOS simulator
npx expo start --android    # Android emulator
npx expo start --web        # Web browser
```

---

## Project Structure

```
my-expo-app/
├── .expo/                  # Expo configuration cache
├── assets/                 # Images, fonts, etc.
│   ├── images/
│   └── fonts/
├── node_modules/           # Dependencies
├── App.js                  # Main app component
├── app.json                # Expo configuration
├── babel.config.js         # Babel configuration
├── package.json            # Dependencies and scripts
├── eas.json               # EAS Build configuration
└── .gitignore             # Git ignore rules
```

### app.json Configuration

```json
{
  "expo": {
    "name": "My Awesome App",
    "slug": "my-awesome-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yourcompany.myapp"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      },
      "package": "com.yourcompany.myapp"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}
```

---

## Core Features

### 1. Hot Reloading & Fast Refresh

Changes appear instantly without losing state:

```javascript
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      {/* Changes here appear instantly */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

### 2. TypeScript Support

```bash
# Create TypeScript project
npx create-expo-app my-app --template blank-typescript
```

```typescript
// App.tsx
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App(): JSX.Element {
  return (
    <View style={styles.container}>
      <Text>Hello TypeScript!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

### 3. Environment Variables

```bash
# Install dotenv
npm install dotenv

# Create .env file
API_URL=https://api.example.com
API_KEY=your_api_key_here
```

```javascript
// app.config.js
import 'dotenv/config';

export default {
  expo: {
    name: 'my-app',
    extra: {
      apiUrl: process.env.API_URL,
      apiKey: process.env.API_KEY,
    },
  },
};

// Access in app
import Constants from 'expo-constants';

const apiUrl = Constants.expoConfig.extra.apiUrl;
```

---

## Expo APIs & SDKs

### Camera

```bash
expo install expo-camera
```

```javascript
import { Camera } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function CameraExample() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <Button
            title="Flip Camera"
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          />
        </View>
      </Camera>
    </View>
  );
}
```

### Location

```bash
expo install expo-location
```

```javascript
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

export default function LocationExample() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <View>
      <Text>
        {location ? 
          `Lat: ${location.coords.latitude}, Long: ${location.coords.longitude}` : 
          'Loading...'
        }
      </Text>
    </View>
  );
}
```

### AsyncStorage

```bash
expo install @react-native-async-storage/async-storage
```

```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Store data
const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('@storage_Key', value);
  } catch (e) {
    console.error(e);
  }
};

// Retrieve data
const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@storage_Key');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.error(e);
  }
};

// Store object
const storeObject = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@storage_Key', jsonValue);
  } catch (e) {
    console.error(e);
  }
};

// Retrieve object
const getObject = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@storage_Key');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(e);
  }
};
```

### Image Picker

```bash
expo install expo-image-picker
```

```javascript
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Button, Image, View } from 'react-native';

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}
```

### Notifications

```bash
expo install expo-notifications
```

```javascript
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function NotificationExample() {
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    });

    return () => subscription.remove();
  }, []);

  const sendNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: 'Here is the notification body',
        data: { data: 'goes here' },
      },
      trigger: { seconds: 2 },
    });
  };

  return (
    <View>
      <Button title="Send Notification" onPress={sendNotification} />
    </View>
  );
}
```

---

## Navigation

### React Navigation Setup

```bash
# Install React Navigation
npm install @react-navigation/native

# Install dependencies
expo install react-native-screens react-native-safe-area-context

# Install navigators
npm install @react-navigation/native-stack
npm install @react-navigation/bottom-tabs
```

```javascript
// App.js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={TabNavigator} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

---

## Development Workflow

### Development Server Commands

```bash
# Start development server
npx expo start

# Start with cache cleared
npx expo start --clear

# Run on specific platform
npx expo start --ios
npx expo start --android
npx expo start --web

# Run in tunnel mode (for remote testing)
npx expo start --tunnel

# Production mode
npx expo start --no-dev --minify
```

### Debugging

```bash
# Open developer menu
# - iOS: Cmd + D
# - Android: Cmd + M (Mac) or Ctrl + M (Windows/Linux)

# Enable Remote JS Debugging
# - Opens Chrome DevTools
# - Use console.log, breakpoints, etc.

# React DevTools
npm install -g react-devtools
react-devtools

# Expo DevTools (browser)
# Opens automatically with expo start
```

### Testing on Real Devices

1. **Same Network**: Device and computer on same Wi-Fi
2. **Scan QR Code**: Use Expo Go app to scan QR code
3. **Tunnel Mode**: For different networks
   ```bash
   npx expo start --tunnel
   ```

---

## EAS (Expo Application Services)

### EAS Build

Cloud-based build service for iOS and Android.

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo account
eas login

# Configure EAS Build
eas build:configure

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android

# Build for both platforms
eas build --platform all

# Build profiles (eas.json)
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {}
  }
}

# Build with specific profile
eas build --profile preview --platform ios
```

### EAS Update

Over-the-air (OTA) updates without app store approval.

```bash
# Configure EAS Update
eas update:configure

# Publish update
eas update --branch production --message "Bug fixes"

# Create update for specific channel
eas update --channel preview
```

```javascript
// app.json - Enable updates
{
  "expo": {
    "updates": {
      "url": "https://u.expo.dev/your-project-id"
    },
    "runtimeVersion": {
      "policy": "sdkVersion"
    }
  }
}
```

### EAS Submit

Submit builds to app stores.

```bash
# Configure submission
eas submit:configure

# Submit to iOS App Store
eas submit --platform ios

# Submit to Google Play
eas submit --platform android

# Submit specific build
eas submit --platform ios --id build-id-here
```

---

## Expo Go vs Development Builds

### Expo Go
- **Pros**: Quick start, no build needed
- **Cons**: Limited to Expo SDK modules
- **Best For**: Learning, prototyping

### Development Builds
- **Pros**: Custom native code, any library
- **Cons**: Requires building
- **Best For**: Production apps

```bash
# Create development build
eas build --profile development --platform ios
eas build --profile development --platform android

# Install on device
# - Download from EAS dashboard
# - Or use internal distribution
```

---

## Building & Deployment

### Building for Production

```bash
# iOS
eas build --platform ios --profile production

# Android
eas build --platform android --profile production

# Configure app signing
# iOS: App Store Connect → Certificates, Identifiers & Profiles
# Android: Generate keystore
keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

### App Store Metadata

Update `app.json`:
```json
{
  "expo": {
    "name": "My App",
    "description": "An amazing app built with Expo",
    "version": "1.0.0",
    "ios": {
      "bundleIdentifier": "com.mycompany.myapp",
      "buildNumber": "1"
    },
    "android": {
      "package": "com.mycompany.myapp",
      "versionCode": 1
    }
  }
}
```

### Deployment Checklist

- [ ] Update version numbers
- [ ] Test on real devices
- [ ] Optimize assets and bundle size
- [ ] Configure app icons and splash screens
- [ ] Set up crash reporting (Sentry, Bugsnag)
- [ ] Configure analytics
- [ ] Test OTA updates
- [ ] Submit for app store review

---

## Best Practices

### 1. Use TypeScript

```bash
npx create-expo-app my-app --template blank-typescript
```

### 2. Optimize Images

```bash
expo install expo-image

# Use optimized Image component
import { Image } from 'expo-image';

<Image
  source={{ uri: 'https://example.com/image.jpg' }}
  placeholder={blurhash}
  contentFit="cover"
  transition={1000}
/>
```

### 3. Environment-Based Configuration

```javascript
// app.config.js
const IS_DEV = process.env.APP_VARIANT === 'development';

export default {
  expo: {
    name: IS_DEV ? 'My App (Dev)' : 'My App',
    slug: 'my-app',
    icon: IS_DEV ? './assets/icon-dev.png' : './assets/icon.png',
    extra: {
      apiUrl: IS_DEV 
        ? 'https://dev-api.example.com' 
        : 'https://api.example.com',
    },
  },
};
```

### 4. Error Boundaries

```javascript
import React from 'react';
import { Text, View } from 'react-native';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Something went wrong.</Text>
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

### 5. Code Splitting

```javascript
import React, { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

export default function App() {
  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

---

## Resources

### Official Documentation
- [Expo Documentation](https://docs.expo.dev/)
- [Expo SDK Reference](https://docs.expo.dev/versions/latest/)
- [EAS Documentation](https://docs.expo.dev/eas/)
- [Expo GitHub](https://github.com/expo/expo)

### Community
- [Expo Forums](https://forums.expo.dev/)
- [Expo Discord](https://chat.expo.dev/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/expo)

### Tools
- [Expo Snack](https://snack.expo.dev/) - Online code editor
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/)
- [EAS CLI](https://docs.expo.dev/eas/)

### Learning
- [Expo Learn](https://docs.expo.dev/tutorial/introduction/)
- [React Native Express](http://www.reactnativeexpress.com/)
- [Expo YouTube Channel](https://www.youtube.com/c/expo)

---

## Conclusion

Expo provides a comprehensive platform for React Native development, significantly reducing the complexity of building, deploying, and maintaining mobile applications. Whether you're building a simple prototype or a complex production app, Expo's managed workflow and powerful services can help you ship faster and more reliably.

Happy building with Expo! 🚀
