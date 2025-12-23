# iOS Usage Guide

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
