# iOS

## Introduction

iOS (formerly iPhone OS) is a mobile operating system created and developed by Apple Inc. exclusively for its hardware. It is the operating system that powers many of the company's mobile devices, including the iPhone and iPod Touch. 

It is the second most widely installed mobile operating system in the world, following Android. Known for its "walled garden" approach, iOS prioritizes a seamless user experience, privacy, security, and tight integration between hardware and software.

## Overview

Unlike Android, iOS is a proprietary (closed-source) operating system. This means only Apple can produce devices that run iOS. This exclusivity allows Apple to optimize the software specifically for their custom silicon (A-series chips), resulting in industry-leading performance and efficiency even with lower raw specs compared to some competitors.

### iOS vs. Android
While both are dominant mobile platforms, they differ significantly in philosophy:
*   **Ecosystem**: iOS is closed and controlled by Apple; Android is open and distributed.
*   **Hardware**: iOS runs only on iPhones; Android runs on thousands of different devices.
*   **Customization**: iOS is more rigid but consistent; Android offers extensive customization.
*   **Updates**: iOS updates are available to all supported devices simultaneously; Android updates depend on manufacturers and carriers.

iOS acts as the foundation for Apple's other operating systems:
*   **iPadOS**: For iPads (branched off from iOS 13).
*   **tvOS**: For Apple TV.
*   **watchOS**: For Apple Watch.

### Architecture Layers (Cocoa Touch)
iOS is architected in four distinct layers, from the highest level (closest to the user) to the lowest (closest to hardware):
1.  **Cocoa Touch Layer**: Contains the frameworks for building the app's UI and handling user interaction (UIKit, SwiftUI, MapKit, PushKit).
2.  **Media Layer**: Provides graphics, audio, and video technologies (AVFoundation, Core Audio, Core Image, Metal).
3.  **Core Services Layer**: independent of the hardware, provides fundamental system services (Core Foundation, Core Data, CloudKit, location, networking).
4.  **Core OS Layer**: The lowest level, sitting directly on top of the hardware (Kernel, Drivers, Security, Power Management).

## Application Lifecycle
Understanding the state of an app is crucial:
*   **Not Running**: The app has not been launched or was terminated by the system.
*   **Inactive**: The app is running in the foreground but receiving no events (brief state during transitions).
*   **Active**: The app is running in the foreground and receiving events.
*   **Background**: The app is executing code but is not visible to the user.
*   **Suspended**: The app is in the background but not executing code. The system may purge it from memory if resources are needed.

## Security Model
*   **Secure Boot Chain**: Ensures the low-level software has not been tampered with.
*   **Code Signing**: Ensures all apps come from a known source (Apple App Store or Enterprise certs).
*   **Sandboxing**: Restricts apps from accessing data stored by other apps or making changes to the device.
*   **Data Protection**: All user data is encrypted at rest using hardware-accelerated AES encryption.
*   **FaceID / TouchID**: Biometric authentication data is stored in the **Secure Enclave**, a dedicated hardware coprocessor completely isolated from the main processor.

## Key Features

- App Store ecosystem with code-signing
- Sandboxed apps with strong permission model
- Continuity features with macOS and iPadOS
- Frameworks: UIKit, SwiftUI, Core Data, ARKit

## Resources

- Docs: <https://developer.apple.com/documentation>
- Human Interface Guidelines: <https://developer.apple.com/design/human-interface-guidelines/>

---

## User Guide

## Development Setup

- Install Xcode from the Mac App Store
- Install Command Line Tools (`xcode-select --install`)
- Create an Apple ID for provisioning profiles

## Create a SwiftUI App

```bash
# In Xcode: File > New > Project > App (SwiftUI)
```

`ContentView.swift` example:

```swift
struct ContentView: View {
    var body: some View {
        Text("Hello, iOS")
            .padding()
    }
}
```

Run on Simulator or a connected device.

### Swift Language Highlights
Swift is the recommended language for iOS development:
*   **Safe**: Type-safe and memory-safe prevents common errors.
*   **Fast**: Built on the LLVM compiler technology.
*   **Modern**: Closures, Tuples, Generics, Structs (Value Types).
*   **Interoperable**: Can coexist with Objective-C code in the same project.

## Signing & Deployment

- Use automatic signing for development
- For App Store/TestFlight, create certificates and provisioning profiles in the Apple Developer portal

## Testing

- Unit/UI tests with XCTest
- Run via Xcode Test navigator or `xcodebuild test`

## Distribution

- TestFlight for beta
- App Store Connect for release

## Debugging

- Xcode debugger and Instruments (Time Profiler, Leaks, Allocations)

