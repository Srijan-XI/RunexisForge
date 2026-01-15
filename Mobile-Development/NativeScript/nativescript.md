# NativeScript - Build Truly Native Apps with JavaScript/TypeScript

## Table of Contents
- [Introduction](#introduction)
- [What is NativeScript?](#what-is-nativescript)
- [Key Features](#key-features)
- [Installation & Setup](#installation--setup)
- [Project Structure](#project-structure)
- [UI Components](#ui-components)
- [Layouts](#layouts)
- [Navigation](#navigation)
- [Data Binding](#data-binding)
- [Native APIs](#native-apis)
- [Plugins](#plugins)
- [Frameworks Integration](#frameworks-integration)
- [Styling](#styling)
- [Performance](#performance)
- [Deployment](#deployment)
- [Best Practices](#best-practices)
- [Resources](#resources)

---

## Introduction

**NativeScript** is an open-source framework for building truly native mobile applications using JavaScript, TypeScript, or Angular/Vue/Svelte. Unlike hybrid frameworks, NativeScript provides direct access to native APIs, resulting in fully native applications with native UI components and performance.

### Why Choose NativeScript?

- **Truly Native**: Real native UI components, not web views
- **JavaScript/TypeScript**: Use familiar web technologies
- **Direct API Access**: Full access to native iOS and Android APIs
- **Code Sharing**: Share 60-90% of code between platforms
- **Framework Agnostic**: Works with Angular, Vue, Svelte, or vanilla JS
- **Hot Reload**: Instant updates during development
- **Native Performance**: Same performance as native apps

---

## What is NativeScript?

NativeScript is a framework that compiles JavaScript/TypeScript to native code and uses native UI components:

### How It Works

```
┌──────────────────────────────────┐
│   Your Code (JS/TS/Angular/Vue)  │
├──────────────────────────────────┤
│    NativeScript Runtime          │
│  (JavaScript → Native Bridge)    │
├──────────────────────────────────┤
│      Native Platform APIs        │
│    (iOS/Android Components)      │
└──────────────────────────────────┘
```

### NativeScript vs Other Frameworks

| Feature | NativeScript | React Native | Ionic |
|---------|--------------|--------------|-------|
| **UI** | Native components | Native components | Web components |
| **Access to APIs** | Direct | Through bridges | Through Capacitor/Cordova |
| **Performance** | Native | Native | Good |
| **Language** | JS/TS/Angular/Vue | JS/TS | HTML/CSS/JS |
| **Learning Curve** | Moderate | Moderate | Easy |
| **Code Reuse** | 60-90% | 80-95% | 100% (web) |

---

## Key Features

### 1. **100% Native UI**
Uses platform-specific native UI components (UIKit for iOS, Android widgets).

### 2. **Direct API Access**
Access any iOS or Android API directly from JavaScript.

### 3. **Framework Flexibility**
Use vanilla JavaScript, TypeScript, Angular, Vue, or Svelte.

### 4. **Code Sharing**
Share business logic, with platform-specific UI when needed.

### 5. **Hot Module Replacement**
See changes instantly without full app reload.

### 6. **Rich Plugin Ecosystem**
Thousands of plugins for native functionality.

---

## Installation & Setup

### Prerequisites

```bash
# Node.js (LTS version)
node --version  # v16.x or newer

# For iOS (macOS only)
xcode-select --install
ruby --version
sudo gem install cocoapods

# For Android
# Install Android Studio and Android SDK
```

### Install NativeScript CLI

```bash
# Install global CLI
npm install -g nativescript

# Verify installation
ns --version

# Check environment
ns doctor
```

### Create New Project

```bash
# Vanilla JavaScript/TypeScript
ns create my-app --ts

# With Angular
ns create my-app --ng

# With Vue
ns create my-app --vue

# With Svelte
ns create my-app --svelte

# With React
ns create my-app --react
```

### Run Your App

```bash
# Navigate to project
cd my-app

# Run on iOS (macOS only)
ns run ios

# Run on Android
ns run android

# Run with hot reload
ns run android --hmr

# Run on device
ns run ios --device
ns run android --device
```

---

## Project Structure

```
my-app/
├── app/
│   ├── App_Resources/        # Platform-specific resources
│   │   ├── Android/
│   │   └── iOS/
│   ├── components/           # Reusable components
│   ├── views/                # App screens
│   ├── models/               # Data models
│   ├── services/             # Business logic
│   ├── app.ts                # App entry point
│   ├── app.css               # Global styles
│   └── main-page.xml         # Main page markup
├── node_modules/
├── platforms/                # Generated native projects
│   ├── android/
│   └── ios/
├── package.json
├── tsconfig.json
└── webpack.config.js
```

---

## UI Components

### Markup (XML)

```xml
<!-- main-page.xml -->
<Page xmlns="http://schemas.nativescript.org/tns.xsd" 
      loaded="onPageLoaded">
    <ActionBar title="My App" />
    
    <StackLayout>
        <Label text="Hello NativeScript!" class="title" />
        <Button text="Tap me!" tap="onButtonTap" class="btn btn-primary" />
        <Image src="~/images/logo.png" width="100" height="100" />
    </StackLayout>
</Page>
```

```typescript
// main-page.ts
import { EventData, Page } from '@nativescript/core';

let page: Page;

export function onPageLoaded(args: EventData) {
    page = args.object as Page;
    page.bindingContext = {
        message: 'Hello NativeScript!'
    };
}

export function onButtonTap() {
    console.log('Button tapped!');
    alert('Hello from NativeScript!');
}
```

### Common Components

#### Label & Button

```xml
<StackLayout>
    <Label text="Welcome!" fontSize="24" color="#333" textAlignment="center" />
    <Button text="Click Me" tap="{{ onTap }}" class="btn btn-primary" />
</StackLayout>
```

#### TextField & TextView

```xml
<StackLayout>
    <TextField hint="Enter your name" text="{{ username }}" />
    <TextView hint="Enter description" text="{{ description }}" height="100" />
    <Label text="{{ username }}" />
</StackLayout>
```

#### Image

```xml
<StackLayout>
    <!-- Local image -->
    <Image src="~/images/logo.png" width="200" height="200" />
    
    <!-- Network image -->
    <Image src="https://example.com/image.jpg" 
           loadMode="async"
           stretch="aspectFill" />
</StackLayout>
```

#### ListView

```xml
<ListView items="{{ items }}" itemTap="onItemTap">
    <ListView.itemTemplate>
        <StackLayout>
            <Label text="{{ title }}" class="list-item-title" />
            <Label text="{{ description }}" class="list-item-description" />
        </StackLayout>
    </ListView.itemTemplate>
</ListView>
```

```typescript
import { ObservableArray } from '@nativescript/core';

const items = new ObservableArray([
    { title: 'Item 1', description: 'Description 1' },
    { title: 'Item 2', description: 'Description 2' },
    { title: 'Item 3', description: 'Description 3' }
]);

export function onItemTap(args) {
    const index = args.index;
    console.log('Tapped item:', items.getItem(index));
}
```

#### Switch & Slider

```xml
<StackLayout>
    <Switch checked="{{ isEnabled }}" />
    <Label text="{{ isEnabled ? 'Enabled' : 'Disabled' }}" />
    
    <Slider value="{{ volume }}" minValue="0" maxValue="100" />
    <Label text="{{ 'Volume: ' + volume }}" />
</StackLayout>
```

---

## Layouts

### StackLayout (Vertical/Horizontal)

```xml
<!-- Vertical -->
<StackLayout orientation="vertical">
    <Label text="First" />
    <Label text="Second" />
    <Label text="Third" />
</StackLayout>

<!-- Horizontal -->
<StackLayout orientation="horizontal">
    <Button text="Left" />
    <Button text="Middle" />
    <Button text="Right" />
</StackLayout>
```

### GridLayout

```xml
<GridLayout rows="auto, auto, *" columns="*, 2*" backgroundColor="#f0f0f0">
    <Label row="0" col="0" text="Row 0, Col 0" backgroundColor="#ff0000" />
    <Label row="0" col="1" text="Row 0, Col 1" backgroundColor="#00ff00" />
    <Label row="1" col="0" colSpan="2" text="Spans both columns" backgroundColor="#0000ff" />
    <Label row="2" col="0" colSpan="2" text="Fills remaining space" backgroundColor="#ffff00" />
</GridLayout>
```

### FlexboxLayout

```xml
<FlexboxLayout flexDirection="row" justifyContent="space-between" alignItems="center">
    <Label text="Left" />
    <Label text="Center" />
    <Label text="Right" />
</FlexboxLayout>
```

### AbsoluteLayout

```xml
<AbsoluteLayout width="300" height="300" backgroundColor="#f0f0f0">
    <Label text="Top Left" left="0" top="0" />
    <Label text="Top Right" right="0" top="0" />
    <Label text="Bottom Left" left="0" bottom="0" />
    <Label text="Bottom Right" right="0" bottom="0" />
    <Label text="Center" left="100" top="100" />
</AbsoluteLayout>
```

### WrapLayout

```xml
<WrapLayout orientation="horizontal" width="300">
    <Label text="Item 1" width="100" height="100" backgroundColor="#ff0000" />
    <Label text="Item 2" width="100" height="100" backgroundColor="#00ff00" />
    <Label text="Item 3" width="100" height="100" backgroundColor="#0000ff" />
    <Label text="Item 4" width="100" height="100" backgroundColor="#ffff00" />
</WrapLayout>
```

---

## Navigation

### Frame Navigation

```typescript
// Navigate to another page
import { Frame } from '@nativescript/core';

export function navigateToDetails() {
    Frame.topmost().navigate({
        moduleName: 'views/details/details-page',
        context: { id: 123 },
        animated: true,
        transition: {
            name: 'slide',
            duration: 300,
            curve: 'easeIn'
        }
    });
}

// Go back
export function goBack() {
    Frame.topmost().goBack();
}
```

### Angular Navigation

```typescript
// app-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';

import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'details/:id', component: DetailsComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}

// Navigate in component
import { RouterExtensions } from '@nativescript/angular';

constructor(private router: RouterExtensions) {}

navigateToDetails(id: number) {
    this.router.navigate(['/details', id]);
}

goBack() {
    this.router.back();
}
```

### Tab Navigation

```xml
<TabView selectedIndex="{{ selectedIndex }}">
    <TabView.items>
        <TabViewItem title="Home" iconSource="~/images/home.png">
            <StackLayout>
                <Label text="Home Content" />
            </StackLayout>
        </TabViewItem>
        
        <TabViewItem title="Search" iconSource="~/images/search.png">
            <StackLayout>
                <Label text="Search Content" />
            </StackLayout>
        </TabViewItem>
        
        <TabViewItem title="Profile" iconSource="~/images/profile.png">
            <StackLayout>
                <Label text="Profile Content" />
            </StackLayout>
        </TabViewItem>
    </TabView.items>
</TabView>
```

---

## Data Binding

### Two-Way Binding

```xml
<Page xmlns="http://schemas.nativescript.org/tns.xsd">
    <StackLayout>
        <TextField text="{{ username }}" hint="Enter username" />
        <Label text="{{ 'Hello, ' + username + '!' }}" />
    </StackLayout>
</Page>
```

```typescript
import { Observable } from '@nativescript/core';

export function onPageLoaded(args) {
    const page = args.object;
    const viewModel = new Observable();
    viewModel.set('username', '');
    page.bindingContext = viewModel;
}
```

### Observable

```typescript
import { Observable, PropertyChangeData } from '@nativescript/core';

class MyViewModel extends Observable {
    private _counter: number = 0;
    
    get counter(): number {
        return this._counter;
    }
    
    set counter(value: number) {
        if (this._counter !== value) {
            this._counter = value;
            this.notifyPropertyChange('counter', value);
        }
    }
    
    increment() {
        this.counter++;
    }
}
```

---

## Native APIs

### Access iOS APIs

```typescript
// Call iOS API directly
if (global.isIOS) {
    const alertController = UIAlertController.alertControllerWithTitleMessagePreferredStyle(
        'Title',
        'Message',
        UIAlertControllerStyle.Alert
    );
    
    const okAction = UIAlertAction.actionWithTitleStyleHandler(
        'OK',
        UIAlertActionStyle.Default,
        () => console.log('OK tapped')
    );
    
    alertController.addAction(okAction);
    
    // Present alert
    const app = UIApplication.sharedApplication;
    const keyWindow = app.keyWindow;
    const rootViewController = keyWindow.rootViewController;
    rootViewController.presentViewControllerAnimatedCompletion(alertController, true, null);
}
```

### Access Android APIs

```typescript
// Call Android API directly
if (global.isAndroid) {
    const context = Utils.ad.getApplicationContext();
    const builder = new android.app.AlertDialog.Builder(context);
    
    builder.setTitle('Title');
    builder.setMessage('Message');
    builder.setPositiveButton('OK', new android.content.DialogInterface.OnClickListener({
        onClick: (dialog, which) => {
            console.log('OK tapped');
        }
    }));
    
    const dialog = builder.create();
    dialog.show();
}
```

### Platform-Specific Code

```typescript
import { Device } from '@nativescript/core';

if (Device.os === 'iOS') {
    // iOS-specific code
    console.log('Running on iOS', Device.osVersion);
} else if (Device.os === 'Android') {
    // Android-specific code
    console.log('Running on Android', Device.sdkVersion);
}
```

---

## Plugins

### Using Plugins

```bash
# Install plugin
ns plugin add @nativescript/camera

# Install from npm
npm install @nativescript/geolocation
```

### Camera Plugin

```typescript
import { Camera } from '@nativescript/camera';
import { ImageAsset } from '@nativescript/core';

export async function takePicture() {
    const permissions = await Camera.requestPermissions();
    
    if (permissions) {
        const imageAsset: ImageAsset = await Camera.takePicture({
            width: 300,
            height: 300,
            keepAspectRatio: true,
            saveToGallery: true
        });
        
        console.log('Picture taken:', imageAsset);
        return imageAsset;
    }
}
```

### Geolocation Plugin

```typescript
import { getCurrentLocation, enableLocationRequest } from '@nativescript/geolocation';
import { Accuracy } from '@nativescript/core';

export async function getLocation() {
    await enableLocationRequest();
    
    const location = await getCurrentLocation({
        desiredAccuracy: Accuracy.high,
        maximumAge: 5000,
        timeout: 20000
    });
    
    console.log('Latitude:', location.latitude);
    console.log('Longitude:', location.longitude);
    return location;
}
```

---

## Frameworks Integration

### Angular

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
    selector: 'ns-app',
    template: `
        <GridLayout>
            <page-router-outlet></page-router-outlet>
        </GridLayout>
    `
})
export class AppComponent {}

// home.component.ts
import { Component } from '@angular/core';

@Component({
    selector: 'Home',
    template: `        <ActionBar title="Home"></ActionBar>
        <StackLayout>
            <Label text="Welcome to NativeScript with Angular!" class="h2"></Label>
            <Button text="Navigate" (tap)="onTap()" class="btn btn-primary"></Button>
        </StackLayout>
    `
})
export class HomeComponent {
    onTap() {
        console.log('Button tapped');
    }
}
```

### Vue

```vue
<!-- Home.vue -->
<template>
    <Page>
        <ActionBar title="Home" />
        <StackLayout>
            <Label text="Welcome to NativeScript with Vue!" class="h2" />
            <Button text="Increment" @tap="increment" class="btn btn-primary" />
            <Label :text="`Count: ${count}`" class="h3" />
        </StackLayout>
    </Page>
</template>

<script>
export default {
    data() {
        return {
            count: 0
        };
    },
    methods: {
        increment() {
            this.count++;
        }
    }
};
</script>
```

---

## Styling

### CSS Styling

```css
/* app.css */
.title {
    font-size: 24;
    font-weight: bold;
    color: #333;
    text-align: center;
    margin: 20;
}

.btn-primary {
    background-color: #3880ff;
    color: white;
    border-radius: 5;
    padding: 10;
    margin: 10;
}

ActionBar {
    background-color: #3880ff;
    color: white;
}

/* Platform-specific */
.ios .btn {
    border-radius: 10;
}

.android .btn {
    border-radius: 2;
}
```

### Inline Styles

```xml
<Label text="Styled Text" 
       style="color: #ff0000; font-size: 20; font-weight: bold;" />
```

---

## Performance

### Optimization Tips

1. **Use ListView for Long Lists**
```xml
<ListView items="{{ items }}" separatorColor="transparent">
    <ListView.itemTemplate>
        <StackLayout>
            <Label text="{{ title }}" />
        </StackLayout>
    </ListView.itemTemplate>
</ListView>
```

2. **Optimize Images**
```typescript
import { ImageCache } from '@nativescript/core';

const cache = new ImageCache();
cache.placeholder = placeholdImage;
cache.maxRequests = 5;
```

3. **Use Virtual Scrolling**
```bash
ns plugin add @nativescript-community/ui-collectionview
```

4. **Enable ProGuard (Android)**
```gradle
// app.gradle
android {
    buildTypes {
        release {
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

---

## Deployment

### Build for iOS

```bash
# Debug build
ns build ios

# Release build
ns build ios --release --for-device

# Create IPA
ns build ios --release --for-device --provision <UUID>
```

### Build for Android

```bash
# Debug APK
ns build android

# Release APK
ns build android --release --key-store-path <path> --key-store-password <password>

# Release AAB (for Play Store)
ns build android --release --aab --key-store-path <path>
```

---

## Best Practices

1. **Use TypeScript** for type safety
2. **Modularize code** into components and services
3. **Optimize images** and assets
4. **Use ListView** for long lists
5. **Cache network requests**
6. **Test on real devices**
7. **Follow platform guidelines**

---

## Resources

### Official Documentation
- [NativeScript Docs](https://docs.nativescript.org/)
- [NativeScript GitHub](https://github.com/NativeScript/NativeScript)
- [NativeScript Marketplace](https://market.nativescript.org/)

### Community
- [NativeScript Forum](https://discourse.nativescript.org/)
- [NativeScript Discord](https://nativescript.org/discord)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/nativescript)

### Learning
- [NativeScript Tutorials](https://docs.nativescript.org/tutorials/)
- [NativeScript Blog](https://blog.nativescript.org/)

---

## Conclusion

NativeScript provides a unique approach to mobile development, allowing developers to build truly native applications using JavaScript/TypeScript while maintaining direct access to native APIs. Whether you're coming from web development or looking for a flexible cross-platform solution, NativeScript offers the perfect balance of code sharing and native performance.

Happy coding with NativeScript! 📱✨
