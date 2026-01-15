# React Native - Cross-Platform Mobile Development

## Table of Contents
- [Introduction](#introduction)
- [What is React Native?](#what-is-react-native)
- [Key Features](#key-features)
- [Architecture Overview](#architecture-overview)
- [Installation & Setup](#installation--setup)
- [Core Concepts](#core-concepts)
- [Components](#components)
- [Navigation](#navigation)
- [State Management](#state-management)
- [Native Modules](#native-modules)
- [Performance Optimization](#performance-optimization)
- [Testing](#testing)
- [Deployment](#deployment)
- [Best Practices](#best-practices)
- [Common Issues & Solutions](#common-issues--solutions)
- [Resources](#resources)

---

## Introduction

React Native is a popular open-source framework developed by Meta (formerly Facebook) for building native mobile applications using JavaScript and React. It allows developers to create truly native apps for iOS and Android platforms using a single codebase, significantly reducing development time and costs while maintaining native performance and user experience.

### Why Choose React Native?

- **Cross-Platform Development**: Write once, run on both iOS and Android
- **Native Performance**: Uses native components for better performance
- **Hot Reloading**: See changes instantly without recompiling
- **Large Community**: Extensive ecosystem of libraries and tools
- **JavaScript/React**: Leverage existing web development skills
- **Cost-Effective**: Single codebase reduces development and maintenance costs
- **Fast Development**: Reusable components and hot reloading speed up development

---

## What is React Native?

React Native is a JavaScript framework that enables developers to build mobile applications that are indistinguishable from apps built using Objective-C, Swift, or Java/Kotlin. It uses the same fundamental UI building blocks as regular iOS and Android apps, assembled using JavaScript and React.

### Key Differences from Web React

| Aspect | React (Web) | React Native |
|--------|------------|--------------|
| **Rendering** | DOM elements | Native components |
| **Components** | `<div>`, `<span>` | `<View>`, `<Text>` |
| **Styling** | CSS | JavaScript StyleSheet |
| **Navigation** | React Router | React Navigation |
| **Platform** | Browsers | iOS & Android |
| **Build Output** | HTML/CSS/JS | Native binaries |

---

## Key Features

### 1. **Native Components**
React Native uses actual native components instead of web views, providing genuine native performance and look-and-feel.

### 2. **Fast Refresh**
Instantly see the result of the latest change without losing component state.

### 3. **Platform-Specific Code**
Write platform-specific code when needed while sharing most of your codebase.

### 4. **Third-Party Plugin Support**
Access to native functionality through third-party libraries.

### 5. **Declarative UI**
Build UIs using declarative React components.

### 6. **Code Reusability**
Share business logic between platforms and even with web apps.

---

## Architecture Overview

### The Bridge Architecture (Legacy)

```
┌─────────────────┐         ┌─────────────────┐
│   JavaScript    │◄────────►│   Native Code   │
│     Thread      │   Bridge │      Thread     │
│   React Code    │◄────────►│  iOS/Android    │
└─────────────────┘         └─────────────────┘
```

### New Architecture (Fabric & TurboModules)

The new architecture improves performance by:
- **Fabric**: New rendering system with synchronous access to native
- **TurboModules**: Lazy loading of native modules
- **Codegen**: Static typing for native modules
- **JSI (JavaScript Interface)**: Direct communication without the bridge

---

## Installation & Setup

### Prerequisites

```bash
# Node.js (v14 or newer)
node --version

# npm or yarn
npm --version
# or
yarn --version

# Watchman (for macOS/Linux)
brew install watchman
```

### Platform-Specific Requirements

#### iOS Development
```bash
# Xcode (macOS only)
# Install from Mac App Store

# CocoaPods
sudo gem install cocoapods
```

#### Android Development
```bash
# Android Studio
# Download from https://developer.android.com/studio

# Setup Android SDK
# Configure ANDROID_HOME environment variable
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### Create a New Project

#### Using React Native CLI
```bash
# Install React Native CLI
npm install -g react-native-cli

# Create new project
npx react-native init MyAwesomeApp

# Run on iOS
cd MyAwesomeApp
npx react-native run-ios

# Run on Android
npx react-native run-android
```

#### Using Expo CLI (Recommended for Beginners)
```bash
# Install Expo CLI
npm install -g expo-cli

# Create new project
expo init MyAwesomeApp

# Choose a template (blank, tabs, etc.)

# Start development server
cd MyAwesomeApp
expo start
```

---

## Core Concepts

### 1. Components

React Native apps are built using components. There are two types:

#### Core Components
Built-in components provided by React Native:

```jsx
import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList
} from 'react-native';

function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to React Native!</Text>
      <Image 
        source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
        style={styles.logo}
      />
      <Button title="Get Started" onPress={() => console.log('Pressed!')} />
    </View>
  );
}
```

#### Custom Components
Build your own reusable components:

```jsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CustomButton = ({ title, onPress, backgroundColor = '#007AFF' }) => {
  return (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor }]} 
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CustomButton;
```

### 2. Props and State

#### Props (Properties)
Data passed from parent to child components:

```jsx
import React from 'react';
import { View, Text } from 'react-native';

const Greeting = ({ name, age }) => {
  return (
    <View>
      <Text>Hello, {name}!</Text>
      <Text>You are {age} years old.</Text>
    </View>
  );
};

// Usage
<Greeting name="John" age={25} />
```

#### State (useState Hook)
Component-level data that can change:

```jsx
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <View>
      <Text>Count: {count}</Text>
      <Button 
        title="Increment" 
        onPress={() => setCount(count + 1)} 
      />
      <Button 
        title="Decrement" 
        onPress={() => setCount(count - 1)} 
      />
    </View>
  );
};
```

### 3. Styling

React Native uses JavaScript objects for styling:

```jsx
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },
});
```

#### Flexbox Layout
React Native uses Flexbox for layouts:

```jsx
<View style={{
  flex: 1,
  flexDirection: 'row', // column (default), row, row-reverse, column-reverse
  justifyContent: 'space-between', // flex-start, flex-end, center, space-around
  alignItems: 'center', // flex-start, flex-end, center, stretch
}}>
  <View style={{ flex: 1, backgroundColor: 'red' }} />
  <View style={{ flex: 2, backgroundColor: 'blue' }} />
</View>
```

### 4. Lists and Keys

#### FlatList (Optimized for Long Lists)
```jsx
import React from 'react';
import { FlatList, Text, View } from 'react-native';

const DATA = [
  { id: '1', title: 'First Item' },
  { id: '2', title: 'Second Item' },
  { id: '3', title: 'Third Item' },
];

const ItemList = () => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={() => <Text style={styles.header}>My List</Text>}
      ListEmptyComponent={() => <Text>No items found</Text>}
      refreshing={false}
      onRefresh={() => console.log('Refreshing...')}
    />
  );
};
```

#### SectionList (Grouped Lists)
```jsx
import React from 'react';
import { SectionList, Text, View } from 'react-native';

const DATA = [
  {
    title: 'Fruits',
    data: ['Apple', 'Banana', 'Orange'],
  },
  {
    title: 'Vegetables',
    data: ['Carrot', 'Lettuce', 'Tomato'],
  },
];

const GroupedList = () => (
  <SectionList
    sections={DATA}
    keyExtractor={(item, index) => item + index}
    renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
    renderSectionHeader={({ section: { title } }) => (
      <Text style={styles.header}>{title}</Text>
    )}
  />
);
```

---

## Components

### Essential Core Components

#### View
The fundamental container component:
```jsx
<View style={styles.container}>
  {/* Other components */}
</View>
```

#### Text
Display text content:
```jsx
<Text 
  style={styles.text}
  numberOfLines={2}
  ellipsizeMode="tail"
  onPress={() => console.log('Text pressed')}
>
  This is some text
</Text>
```

#### Image
Display images from various sources:
```jsx
import { Image } from 'react-native';

// Network image
<Image 
  source={{uri: 'https://example.com/image.jpg'}}
  style={{width: 200, height: 200}}
  resizeMode="cover" // contain, cover, stretch, center
/>

// Local image
<Image 
  source={require('./assets/logo.png')}
  style={{width: 100, height: 100}}
/>
```

#### ScrollView
Scrollable container:
```jsx
<ScrollView
  horizontal={false}
  showsVerticalScrollIndicator={true}
  onScroll={(event) => console.log(event.nativeEvent.contentOffset.y)}
  scrollEventThrottle={16}
>
  <View style={{ height: 2000 }}>
    {/* Long content */}
  </View>
</ScrollView>
```

#### TextInput
User input field:
```jsx
import React, { useState } from 'react';
import { TextInput, View } from 'react-native';

const InputExample = () => {
  const [text, setText] = useState('');

  return (
    <TextInput
      style={styles.input}
      value={text}
      onChangeText={setText}
      placeholder="Enter text here"
      placeholderTextColor="#999"
      secureTextEntry={false} // true for password
      keyboardType="default" // numeric, email-address, phone-pad
      autoCapitalize="none" // none, sentences, words, characters
      autoCorrect={false}
      multiline={false}
      numberOfLines={1}
    />
  );
};
```

#### TouchableOpacity / TouchableHighlight
Touchable components:
```jsx
import { TouchableOpacity, TouchableHighlight, Text } from 'react-native';

// TouchableOpacity (reduces opacity on press)
<TouchableOpacity 
  onPress={() => console.log('Pressed')}
  activeOpacity={0.7}
>
  <Text>Press Me</Text>
</TouchableOpacity>

// TouchableHighlight (highlights on press)
<TouchableHighlight
  onPress={() => console.log('Pressed')}
  underlayColor="#DDDDDD"
>
  <Text>Press Me</Text>
</TouchableHighlight>
```

#### Modal
Display content on top of current view:
```jsx
import React, { useState } from 'react';
import { Modal, View, Text, Button } from 'react-native';

const ModalExample = () => {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <Button title="Show Modal" onPress={() => setVisible(true)} />
      
      <Modal
        visible={visible}
        animationType="slide" // fade, slide, none
        transparent={true}
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>This is a modal!</Text>
            <Button title="Close" onPress={() => setVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};
```

---

## Navigation

### React Navigation (Most Popular)

#### Installation
```bash
npm install @react-navigation/native
npm install react-native-screens react-native-safe-area-context
npm install @react-navigation/native-stack
npm install @react-navigation/bottom-tabs
npm install @react-navigation/drawer

# iOS only
cd ios && pod install && cd ..
```

#### Stack Navigator
```jsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Text, View } from 'react-native';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details', { itemId: 42 })}
      />
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  const { itemId } = route.params;
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Text>Item ID: {itemId}</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'My Home' }}
        />
        <Stack.Screen 
          name="Details" 
          component={DetailsScreen}
          options={({ route }) => ({ title: `Details #${route.params.itemId}` })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
```

#### Tab Navigator
```jsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function MyTabs() {
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
          
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
```

#### Drawer Navigator
```jsx
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#f4f4f4',
          width: 240,
        },
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}
```

---

## State Management

### Context API (Built-in)
```jsx
import React, { createContext, useContext, useState } from 'react';

// Create Context
const ThemeContext = createContext();

// Provider Component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom Hook
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

// Usage in App
function App() {
  return (
    <ThemeProvider>
      <MyApp />
    </ThemeProvider>
  );
}

// Usage in Component
function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <View style={{ backgroundColor: theme === 'light' ? '#fff' : '#000' }}>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
}
```

### Redux Toolkit
```bash
npm install @reduxjs/toolkit react-redux
```

```jsx
// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: state => { state.value += 1; },
    decrement: state => { state.value -= 1; },
    incrementByAmount: (state, action) => { state.value += action.payload; },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

// App.js
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <MyApp />
    </Provider>
  );
}

// Component
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './store';

function Counter() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();

  return (
    <View>
      <Text>Count: {count}</Text>
      <Button title="+" onPress={() => dispatch(increment())} />
      <Button title="-" onPress={() => dispatch(decrement())} />
    </View>
  );
}
```

---

## Native Modules

### Accessing Native Features

#### Camera
```bash
npm install react-native-camera
# or for newer version
npm install react-native-vision-camera
```

```jsx
import { Camera, useCameraDevices } from 'react-native-vision-camera';

function CameraScreen() {
  const devices = useCameraDevices();
  const device = devices.back;

  if (device == null) return <Text>Loading...</Text>;

  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
    />
  );
}
```

#### Geolocation
```bash
npm install @react-native-community/geolocation
```

```jsx
import Geolocation from '@react-native-community/geolocation';

Geolocation.getCurrentPosition(
  position => {
    const { latitude, longitude } = position.coords;
    console.log(`Lat: ${latitude}, Long: ${longitude}`);
  },
  error => console.log(error),
  { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
);
```

#### AsyncStorage (Local Storage)
```bash
npm install @react-native-async-storage/async-storage
```

```jsx
import AsyncStorage from '@react-native-async-storage/async-storage';

// Store data
const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('@storage_key', value);
  } catch (e) {
    console.log(e);
  }
};

// Retrieve data
const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@storage_key');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log(e);
  }
};

// Store object
const storeObject = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@storage_key', jsonValue);
  } catch (e) {
    console.log(e);
  }
};
```

#### Permissions
```bash
npm install react-native-permissions
```

```jsx
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const requestCameraPermission = async () => {
  const result = await request(
    Platform.OS === 'ios' 
      ? PERMISSIONS.IOS.CAMERA 
      : PERMISSIONS.ANDROID.CAMERA
  );

  switch (result) {
    case RESULTS.GRANTED:
      console.log('Permission granted');
      break;
    case RESULTS.DENIED:
      console.log('Permission denied');
      break;
    case RESULTS.BLOCKED:
      console.log('Permission blocked');
      break;
  }
};
```

---

## Performance Optimization

### 1. Use React.memo
```jsx
import React, { memo } from 'react';

const ExpensiveComponent = memo(({ data }) => {
  // Component only re-renders if data changes
  return <Text>{data}</Text>;
});
```

### 2. useCallback and useMemo
```jsx
import React, { useCallback, useMemo } from 'react';

function MyComponent({ items }) {
  // Memoize expensive calculations
  const expensiveValue = useMemo(() => {
    return items.reduce((sum, item) => sum + item.value, 0);
  }, [items]);

  // Memoize callback functions
  const handlePress = useCallback(() => {
    console.log('Pressed');
  }, []);

  return <Text>{expensiveValue}</Text>;
}
```

### 3. FlatList Optimization
```jsx
<FlatList
  data={data}
  renderItem={renderItem}
  keyExtractor={item => item.id}
  // Performance props
  initialNumToRender={10}
  maxToRenderPerBatch={10}
  windowSize={10}
  removeClippedSubviews={true}
  getItemLayout={(data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })}
/>
```

### 4. Image Optimization
```jsx
import FastImage from 'react-native-fast-image';

<FastImage
  style={{ width: 200, height: 200 }}
  source={{
    uri: 'https://example.com/image.jpg',
    priority: FastImage.priority.normal,
  }}
  resizeMode={FastImage.resizeMode.contain}
/>
```

### 5. Hermes JavaScript Engine
Enable Hermes in `android/app/build.gradle`:
```gradle
project.ext.react = [
    enableHermes: true  // Enable Hermes
]
```

---

## Testing

### Jest (Unit Testing)
```bash
npm install --save-dev @testing-library/react-native
```

```jsx
// Component
export const Counter = () => {
  const [count, setCount] = useState(0);
  
  return (
    <View>
      <Text testID="count">Count: {count}</Text>
      <Button testID="increment" title="+" onPress={() => setCount(count + 1)} />
    </View>
  );
};

// Test
import { render, fireEvent } from '@testing-library/react-native';

describe('Counter', () => {
  it('increments count when button pressed', () => {
    const { getByTestId } = render(<Counter />);
    const button = getByTestId('increment');
    const countText = getByTestId('count');

    expect(countText.props.children).toBe('Count: 0');
    
    fireEvent.press(button);
    
    expect(countText.props.children).toBe('Count: 1');
  });
});
```

### Detox (E2E Testing)
```bash
npm install --save-dev detox
```

```jsx
// e2e/firstTest.e2e.js
describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should have welcome screen', async () => {
    await expect(element(by.id('welcome'))).toBeVisible();
  });

  it('should tap button', async () => {
    await element(by.id('tap_me')).tap();
    await expect(element(by.text('Tapped!'))).toBeVisible();
  });
});
```

---

## Deployment

### iOS Deployment

#### 1. Configure App Information
Edit `ios/YourApp/Info.plist`:
```xml
<key>CFBundleDisplayName</key>
<string>Your App Name</string>
<key>CFBundleIdentifier</key>
<string>com.yourcompany.yourapp</string>
```

#### 2. Configure Signing
In Xcode:
- Open `ios/YourApp.xcworkspace`
- Select project → Signing & Capabilities
- Select your team
- Enable "Automatically manage signing"

#### 3. Build for Release
```bash
# Archive the app in Xcode
# Or use command line
xcodebuild -workspace ios/YourApp.xcworkspace \
  -scheme YourApp \
  -configuration Release \
  -archivePath build/YourApp.xcarchive \
  archive
```

#### 4. Upload to App Store Connect
- Use Xcode Organizer
- Or use Transporter app
- Submit for review

### Android Deployment

#### 1. Generate Signing Key
```bash
keytool -genkeypair -v -storetype PKCS12 \
  -keystore my-upload-key.keystore \
  -alias my-key-alias \
  -keyalg RSA -keysize 2048 -validity 10000
```

#### 2. Configure Gradle
Edit `android/gradle.properties`:
```properties
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=*****
MYAPP_UPLOAD_KEY_PASSWORD=*****
```

Edit `android/app/build.gradle`:
```gradle
android {
    ...
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled enableProguardInReleaseBuilds
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
        }
    }
}
```

#### 3. Build Release APK/AAB
```bash
# Generate AAB (recommended for Play Store)
cd android
./gradlew bundleRelease

# Generate APK
./gradlew assembleRelease

# Output locations:
# AAB: android/app/build/outputs/bundle/release/app-release.aab
# APK: android/app/build/outputs/apk/release/app-release.apk
```

#### 4. Upload to Google Play Console
- Create app in Play Console
- Upload AAB file
- Fill in store listing details
- Submit for review

---

## Best Practices

### 1. Project Structure
```
MyApp/
├── src/
│   ├── components/       # Reusable components
│   │   ├── common/       # Common UI components
│   │   └── features/     # Feature-specific components
│   ├── screens/          # Screen components
│   ├── navigation/       # Navigation configuration
│   ├── services/         # API calls, external services
│   ├── hooks/            # Custom hooks
│   ├── utils/            # Utility functions
│   ├── constants/        # Constants, config
│   ├── store/            # State management
│   ├── assets/           # Images, fonts
│   └── styles/           # Global styles, themes
├── __tests__/            # Tests
├── android/              # Android native code
├── ios/                  # iOS native code
├── App.js                # Entry point
└── package.json
```

### 2. Code Organization
```jsx
// Good: Separate concerns
import React from 'react';
import { View } from 'react-native';
import { useUserData } from '../hooks/useUserData';
import UserProfile from '../components/UserProfile';

const ProfileScreen = () => {
  const { user, loading } = useUserData();
  
  if (loading) return <LoadingSpinner />;
  
  return (
    <View>
      <UserProfile user={user} />
    </View>
  );
};
```

### 3. TypeScript Integration
```bash
npx react-native init MyApp --template react-native-template-typescript
```

```tsx
import React, { FC } from 'react';
import { Text, StyleSheet } from 'react-native';

interface Props {
  name: string;
  age: number;
}

const UserCard: FC<Props> = ({ name, age }) => {
  return <Text>{name} - {age} years old</Text>;
};
```

### 4. Environment Variables
```bash
npm install react-native-config
```

```bash
# .env
API_URL=https://api.example.com
API_KEY=your_api_key_here
```

```jsx
import Config from 'react-native-config';

const apiUrl = Config.API_URL;
const apiKey = Config.API_KEY;
```

### 5. Error Boundaries
```jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <Text>Something went wrong.</Text>;
    }

    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

---

## Common Issues & Solutions

### 1. Metro Bundler Issues
```bash
# Clear cache
npx react-native start --reset-cache

# Clear watchman
watchman watch-del-all

# Delete node_modules and reinstall
rm -rf node_modules && npm install
```

### 2. iOS Build Errors
```bash
# Clean build
cd ios
xcodebuild clean
rm -rf build/

# Reinstall pods
rm -rf Pods Podfile.lock
pod install

# Clear derived data
rm -rf ~/Library/Developer/Xcode/DerivedData
```

### 3. Android Build Errors
```bash
# Clean gradle
cd android
./gradlew clean

# Clear gradle cache
rm -rf ~/.gradle/caches/
```

### 4. Unable to Load Script Error
```bash
# Ensure Metro is running
npx react-native start

# In another terminal
npx react-native run-ios
# or
npx react-native run-android
```

---

## Resources

### Official Documentation
- [React Native Official Docs](https://reactnative.dev/)
- [React Native GitHub](https://github.com/facebook/react-native)
- [Expo Documentation](https://docs.expo.dev/)

### Libraries & Tools
- [React Navigation](https://reactnavigation.org/)
- [React Native Elements](https://reactnativeelements.com/)
- [NativeBase](https://nativebase.io/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons)

### Learning Resources
- [React Native Express](http://www.reactnativeexpress.com/)
- [Awesome React Native](https://github.com/jondot/awesome-react-native)
- [React Native Directory](https://reactnative.directory/)

### Community
- [React Native Community](https://github.com/react-native-community)
- [Discord Community](https://discord.gg/react-native)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/react-native)

---

## Conclusion

React Native provides a powerful platform for building cross-platform mobile applications with JavaScript and React. Its strong community support, extensive ecosystem, and continuous improvements make it an excellent choice for mobile development. Whether you're building a simple app or a complex enterprise solution, React Native offers the tools and flexibility needed to create high-quality native mobile experiences.

Happy coding! 🚀
