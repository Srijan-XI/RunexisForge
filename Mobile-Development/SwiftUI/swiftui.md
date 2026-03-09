# SwiftUI - Modern iOS/macOS Development

## Table of Contents
- [Introduction](#introduction)
- [What is SwiftUI?](#what-is-swiftui)
- [Key Features](#key-features)
- [Getting Started](#getting-started)
- [Views & Modifiers](#views--modifiers)
- [Layout System](#layout-system)
- [State Management](#state-management)
- [Navigation](#navigation)
- [Lists & Collections](#lists--collections)
- [Forms & Input](#forms--input)
- [Animations](#animations)
- [Networking & Data](#networking--data)
- [Combine Framework](#combine-framework)
- [Platform Integration](#platform-integration)
- [Testing](#testing)
- [Best Practices](#best-practices)
- [Resources](#resources)

---

## Introduction

**SwiftUI** is Apple's modern declarative framework for building user interfaces across all Apple platforms: iOS, macOS, watchOS, and tvOS. Introduced at WWDC 2019, SwiftUI represents a paradigm shift from UIKit's imperative approach to a declarative, state-driven UI framework.

### Why Choose SwiftUI?

- **Declarative Syntax**: Describe what the UI should look like
- **Cross-Platform**: Single codebase for iOS, macOS, watchOS, tvOS
- **Live Preview**: See changes instantly in Xcode
- **Native Performance**: Compiles to native code
- **Modern Swift**: Leverages latest Swift features
- **Less Code**: Build UIs with significantly less code
- **Type-Safe**: Compile-time checking prevents errors

---

## What is SwiftUI?

SwiftUI is a **declarative framework** where you describe what your UI should look like, and SwiftUI handles the rest:

### Key Concepts

1. **Views**: Building blocks of your UI
2. **Modifiers**: Transform and style views
3. **State**: Data that drives your UI
4. **Binding**: Two-way data flow
5. **Combine**: Reactive programming framework

### SwiftUI vs UIKit

| Aspect | SwiftUI | UIKit |
|--------|---------|-------|
| **Paradigm** | Declarative | Imperative |
| **Code Style** | Functional | Object-Oriented |
| **UI Updates** | Automatic | Manual |
| **Preview** | Live previews | Compile & run |
| **Platform Support** | iOS 13+, macOS 10.15+ | All iOS versions |
| **Learning Curve** | Moderate | Steep |
| **Adoption** | Growing | Mature |

---

## Key Features

### 1. **Declarative Syntax**
```swift
Text("Hello, SwiftUI!")
    .font(.title)
    .foregroundColor(.blue)
```

### 2. **Live Previews**
See your UI update in real-time as you code.

### 3. **Cross-Platform**
Write once, deploy on iOS, macOS, watchOS, tvOS.

### 4. **Composition**
Build complex UIs from simple, reusable components.

### 5. **Data Flow**
Automatic UI updates when data changes.

### 6. **Modifiers**
Chain modifiers to customize views.

---

## Getting Started

### Requirements

- **Xcode 11** or later
- **macOS 10.15** (Catalina) or later
- **iOS 13** or later for deployment

### Create New Project

1. Open Xcode
2. File → New → Project
3. Choose "App"
4. Select "SwiftUI" as interface
5. Select "Swift" as language

### Basic App Structure

```swift
import SwiftUI

@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}

struct ContentView: View {
    var body: some View {
        Text("Hello, World!")
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
```

---

## Views & Modifiers

### Text Views

```swift
// Basic text
Text("Hello, SwiftUI!")

// Styled text
Text("Styled Text")
    .font(.title)
    .fontWeight(.bold)
    .foregroundColor(.blue)
    .italic()
    .underline()

// Multi-line text
Text("This is a long text that will wrap to multiple lines")
    .lineLimit(3)
    .multilineTextAlignment(.center)

// Markdown support (iOS 15+)
Text("**Bold** and *italic* text")
```

### Image Views

```swift
// System image (SF Symbols)
Image(systemName: "heart.fill")
    .foregroundColor(.red)
    .font(.largeTitle)

// Asset image
Image("logo")
    .resizable()
    .scaledToFit()
    .frame(width: 100, height: 100)
    .clipShape(Circle())
    .overlay(Circle().stroke(Color.white, lineWidth: 4))
    .shadow(radius: 10)

// Network image (requires AsyncImage - iOS 15+)
AsyncImage(url: URL(string: "https://example.com/image.jpg")) { image in
    image
        .resizable()
        .scaledToFill()
} placeholder: {
    ProgressView()
}
.frame(width: 200, height: 200)
```

### Buttons

```swift
// Simple button
Button("Click Me") {
    print("Button tapped")
}

// Styled button
Button(action: {
    // Action
}) {
    Text("Custom Button")
        .font(.headline)
        .foregroundColor(.white)
        .padding()
        .background(Color.blue)
        .cornerRadius(10)
}

// Button with icon
Button(action: {}) {
    Label("Add Item", systemImage: "plus")
}
.buttonStyle(.borderedProminent)

// Button styles (iOS 15+)
Button("Primary") {}.buttonStyle(.borderedProminent)
Button("Secondary") {}.buttonStyle(.bordered)
Button("Plain") {}.buttonStyle(.plain)
```

### Shapes

```swift
// Circle
Circle()
    .fill(Color.blue)
    .frame(width: 100, height: 100)

// Rectangle
Rectangle()
    .fill(Color.red)
    .frame(width: 200, height: 100)

// Rounded Rectangle
RoundedRectangle(cornerRadius: 20)
    .stroke(Color.green, lineWidth: 5)
    .frame(width: 200, height: 100)

// Capsule
Capsule()
    .fill(Color.purple)
    .frame(width: 200, height: 50)

// Custom shape
Path { path in
    path.move(to: CGPoint(x: 100, y: 0))
    path.addLine(to: CGPoint(x: 0, y: 100))
    path.addLine(to: CGPoint(x: 200, y: 100))
    path.closeSubpath()
}
.fill(Color.orange)
```

---

## Layout System

### Stack Layouts

#### VStack (Vertical)
```swift
VStack(alignment: .leading, spacing: 20) {
    Text("First")
    Text("Second")
    Text("Third")
}
```

#### HStack (Horizontal)
```swift
HStack(alignment: .top, spacing: 10) {
    Image(systemName: "star.fill")
    Text("Favorite")
    Spacer()
    Text("100")
}
.padding()
```

#### ZStack (Overlapping)
```swift
ZStack {
    Color.blue
    Text("Overlay Text")
        .foregroundColor(.white)
        .font(.largeTitle)
}
```

### Spacer & Divider

```swift
HStack {
    Text("Left")
    Spacer()  // Pushes content apart
    Text("Right")
}

VStack {
    Text("Top")
    Divider()  // Horizontal line
    Text("Bottom")
}
```

### Grid Layout (iOS 14+)

```swift
LazyVGrid(columns: [
    GridItem(.flexible()),
    GridItem(.flexible()),
    GridItem(.flexible())
], spacing: 20) {
    ForEach(0..<9) { index in
        Rectangle()
            .fill(Color.blue)
            .frame(height: 100)
    }
}
```

### Frames & Padding

```swift
Text("Hello")
    .frame(width: 200, height: 100)
    .padding()
    .background(Color.gray)
    .cornerRadius(10)

Text("Aligned")
    .frame(maxWidth: .infinity, alignment: .leading)
    .padding(.horizontal, 20)
```

### ScrollView

```swift
ScrollView {
    VStack(spacing: 20) {
        ForEach(0..<50) { index in
            Text("Row \(index)")
                .frame(maxWidth: .infinity)
                .padding()
                .background(Color.gray.opacity(0.2))
        }
    }
}

// Horizontal scroll
ScrollView(.horizontal, showsIndicators: false) {
    HStack(spacing: 20) {
        ForEach(0..<10) { _ in
            RoundedRectangle(cornerRadius: 10)
                .fill(Color.blue)
                .frame(width: 150, height: 100)
        }
    }
    .padding()
}
```

---

## State Management

### @State (View-Local State)

```swift
struct CounterView: View {
    @State private var count = 0
    
    var body: some View {
        VStack {
            Text("Count: \(count)")
                .font(.largeTitle)
            
            Button("Increment") {
                count += 1
            }
            .buttonStyle(.borderedProminent)
        }
    }
}
```

### @Binding (Two-Way Binding)

```swift
struct ToggleView: View {
    @Binding var isOn: Bool
    
    var body: some View {
        Toggle("Switch", isOn: $isOn)
    }
}

struct ParentView: View {
    @State private var isEnabled = false
    
    var body: some View {
        VStack {
            ToggleView(isOn: $isEnabled)
            Text("Status: \(isEnabled ? "On" : "Off")")
        }
    }
}
```

### @StateObject & @ObservedObject

```swift
// ViewModel
class UserViewModel: ObservableObject {
    @Published var name = ""
    @Published var age = 18
    
    func updateUser() {
        // Update logic
    }
}

// View
struct UserView: View {
    @StateObject private var viewModel = UserViewModel()
    
    var body: some View {
        VStack {
            TextField("Name", text: $viewModel.name)
            Stepper("Age: \(viewModel.age)", value: $viewModel.age, in: 0...120)
            Button("Save") {
                viewModel.updateUser()
            }
        }
        .padding()
    }
}
```

### @EnvironmentObject

```swift
// App-wide data
class AppSettings: ObservableObject {
    @Published var isDarkMode = false
    @Published var fontSize: CGFloat = 16
}

// App entry point
@main
struct MyApp: App {
    @StateObject private var settings = AppSettings()
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(settings)
        }
    }
}

// Access in any view
struct SettingsView: View {
    @EnvironmentObject var settings: AppSettings
    
    var body: some View {
        Toggle("Dark Mode", isOn: $settings.isDarkMode)
    }
}
```

### @AppStorage (UserDefaults)

```swift
struct PreferencesView: View {
    @AppStorage("username") private var username = ""
    @AppStorage("notifications") private var notificationsEnabled = true
    
    var body: some View {
        Form {
            TextField("Username", text: $username)
            Toggle("Notifications", isOn: $notificationsEnabled)
        }
    }
}
```

---

## Navigation

### NavigationView & NavigationLink

```swift
struct ContentView: View {
    var body: some View {
        NavigationView {
            List {
                NavigationLink("Go to Detail") {
                    DetailView()
                }
                
                NavigationLink("Go to Settings") {
                    SettingsView()
                }
            }
            .navigationTitle("Home")
            .navigationBarTitleDisplayMode(.large)
        }
    }
}

struct DetailView: View {
    @Environment(\.dismiss) var dismiss
    
    var body: some View {
        VStack {
            Text("Detail View")
            Button("Go Back") {
                dismiss()
            }
        }
        .navigationTitle("Details")
        .toolbar {
            ToolbarItem(placement: .navigationBarTrailing) {
                Button("Action") {
                    // Action
                }
            }
        }
    }
}
```

### NavigationStack (iOS 16+)

```swift
struct ModernNavigation: View {
    @State private var path = NavigationPath()
    
    var body: some View {
        NavigationStack(path: $path) {
            List(0..<10) { index in
                NavigationLink("Item \(index)", value: index)
            }
            .navigationDestination(for: Int.self) { index in
                DetailView(item: index)
            }
            .navigationTitle("Items")
        }
    }
}
```

### TabView

```swift
struct MainTabView: View {
    @State private var selectedTab = 0
    
    var body: some View {
        TabView(selection: $selectedTab) {
            HomeView()
                .tabItem {
                    Label("Home", systemImage: "house")
                }
                .tag(0)
            
            SearchView()
                .tabItem {
                    Label("Search", systemImage: "magnifyingglass")
                }
                .tag(1)
            
            ProfileView()
                .tabItem {
                    Label("Profile", systemImage: "person")
                }
                .tag(2)
        }
    }
}
```

### Sheet & FullScreenCover

```swift
struct ModalExample: View {
    @State private var showSheet = false
    @State private var showFullScreen = false
    
    var body: some View {
        VStack(spacing: 20) {
            Button("Show Sheet") {
                showSheet = true
            }
            .sheet(isPresented: $showSheet) {
                SheetView()
            }
            
            Button("Show Full Screen") {
                showFullScreen = true
            }
            .fullScreenCover(isPresented: $showFullScreen) {
                FullScreenView()
            }
        }
    }
}

struct SheetView: View {
    @Environment(\.dismiss) var dismiss
    
    var body: some View {
        NavigationView {
            Text("Sheet Content")
                .navigationTitle("Sheet")
                .toolbar {
                    ToolbarItem(placement: .navigationBarTrailing) {
                        Button("Done") {
                            dismiss()
                        }
                    }
                }
        }
    }
}
```

---

## Lists & Collections

### List

```swift
struct TodoList: View {
    let items = ["Buy groceries", "Walk the dog", "Read book"]
    
    var body: some View {
        List(items, id: \.self) { item in
            Text(item)
        }
    }
}

// With custom row
struct CustomList: View {
    struct Item: Identifiable {
        let id = UUID()
        let title: String
        let icon: String
    }
    
    let items = [
        Item(title: "Home", icon: "house"),
        Item(title: "Search", icon: "magnifyingglass"),
        Item(title: "Settings", icon: "gear")
    ]
    
    var body: some View {
        List(items) { item in
            HStack {
                Image(systemName: item.icon)
                Text(item.title)
            }
        }
    }
}
```

### ForEach

```swift
struct DynamicList: View {
    @State private var items = ["Item 1", "Item 2", "Item 3"]
    
    var body: some View {
        List {
            ForEach(items, id: \.self) { item in
                Text(item)
            }
            .onDelete(perform: deleteItems)
            .onMove(perform: moveItems)
        }
        .toolbar {
            EditButton()
        }
    }
    
    func deleteItems(at offsets: IndexSet) {
        items.remove(atOffsets: offsets)
    }
    
    func moveItems(from source: IndexSet, to destination: Int) {
        items.move(fromOffsets: source, toOffset: destination)
    }
}
```

### LazyVStack & LazyHStack

```swift
ScrollView {
    LazyVStack(spacing: 20) {
        ForEach(0..<1000) { index in
            Text("Row \(index)")
                .frame(maxWidth: .infinity)
                .padding()
                .background(Color.gray.opacity(0.2))
        }
    }
}
```

---

## Forms & Input

### TextField

```swift
struct LoginForm: View {
    @State private var username = ""
    @State private var password = ""
    
    var body: some View {
        Form {
            Section("Credentials") {
                TextField("Username", text: $username)
                    .textInputAutocapitalization(.never)
                    .autocorrectionDisabled()
                
                SecureField("Password", text: $password)
            }
            
            Section {
                Button("Login") {
                    // Login action
                }
            }
        }
    }
}
```

### Picker

```swift
struct PickerExample: View {
    @State private var selectedColor = "Red"
    let colors = ["Red", "Green", "Blue"]
    
    var body: some View {
        Form {
            Picker("Color", selection: $selectedColor) {
                ForEach(colors, id: \.self) { color in
                    Text(color)
                }
            }
            .pickerStyle(.menu)  // .automatic, .inline, .menu, .wheel, .segmented
        }
    }
}
```

### Toggle & Slider

```swift
struct ControlsExample: View {
    @State private var isEnabled = false
    @State private var volume: Double = 50
    
    var body: some View {
        Form {
            Toggle("Enable Feature", isOn: $isEnabled)
            
            VStack {
                Text("Volume: \(Int(volume))")
                Slider(value: $volume, in: 0...100, step: 1)
            }
        }
    }
}
```

### DatePicker

```swift
struct DatePickerExample: View {
    @State private var selectedDate = Date()
    
    var body: some View {
        Form {
            DatePicker("Select Date", 
                       selection: $selectedDate,
                       displayedComponents: .date)
            
            DatePicker("Select Time",
                       selection: $selectedDate,
                       displayedComponents: .hourAndMinute)
        }
    }
}
```

---

## Animations

### Implicit Animations

```swift
struct AnimatedButton: View {
    @State private var scale: CGFloat = 1.0
    
    var body: some View {
        Button("Tap Me") {
            scale = scale == 1.0 ? 1.5 : 1.0
        }
        .scaleEffect(scale)
        .animation(.spring(response: 0.3, dampingFraction: 0.6), value: scale)
    }
}
```

### Explicit Animations

```swift
struct ExplicitAnimation: View {
    @State private var rotation = 0.0
    
    var body: some View {
        Image(systemName: "arrow.right.circle.fill")
            .font(.system(size: 60))
            .rotationEffect(.degrees(rotation))
            .onTapGesture {
                withAnimation(.easeInOut(duration: 1.0)) {
                    rotation += 360
                }
            }
    }
}
```

### Transitions

```swift
struct TransitionExample: View {
    @State private var isShowing = false
    
    var body: some View {
        VStack {
            Button("Toggle") {
                withAnimation {
                    isShowing.toggle()
                }
            }
            
            if isShowing {
                Rectangle()
                    .fill(Color.blue)
                    .frame(width: 200, height: 200)
                    .transition(.scale.combined(with: .opacity))
            }
        }
    }
}
```

### Custom Animation

```swift
struct PulseAnimation: View {
    @State private var animate = false
    
    var body: some View {
        Circle()
            .fill(Color.red)
            .frame(width: 100, height: 100)
            .scaleEffect(animate ? 1.5 : 1.0)
            .opacity(animate ? 0.0 : 1.0)
            .animation(
                .easeInOut(duration: 1.0)
                .repeatForever(autoreverses: false),
                value: animate
            )
            .onAppear {
                animate = true
            }
    }
}
```

---

## Networking & Data

### URLSession

```swift
class NetworkManager: ObservableObject {
    @Published var data: [Item] = []
    @Published var isLoading = false
    @Published var error: Error?
    
    func fetchData() async {
        isLoading = true
        
        guard let url = URL(string: "https://api.example.com/data") else {
            return
        }
        
        do {
            let (data, _) = try await URLSession.shared.data(from: url)
            let decoded = try JSONDecoder().decode([Item].self, from: data)
            
            await MainActor.run {
                self.data = decoded
                self.isLoading = false
            }
        } catch {
            await MainActor.run {
                self.error = error
                self.isLoading = false
            }
        }
    }
}

// View
struct NetworkView: View {
    @StateObject private var network = NetworkManager()
    
    var body: some View {
        Group {
            if network.isLoading {
                ProgressView()
            } else {
                List(network.data) { item in
                    Text(item.name)
                }
            }
        }
        .task {
            await network.fetchData()
        }
    }
}
```

### Codable

```swift
struct User: Codable, Identifiable {
    let id: Int
    let name: String
    let email: String
}

// Decode
let jsonData = """
{
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
}
""".data(using: .utf8)!

let user = try JSONDecoder().decode(User.self, from: jsonData)
```

---

## Combine Framework

### Publishers & Subscribers

```swift
import Combine

class SearchViewModel: ObservableObject {
    @Published var searchText = ""
    @Published var results: [String] = []
    
    private var cancellables = Set<AnyCancellable>()
    
    init() {
        $searchText
            .debounce(for: .milliseconds(500), scheduler: RunLoop.main)
            .removeDuplicates()
            .sink { [weak self] text in
                self?.performSearch(text)
            }
            .store(in: &cancellables)
    }
    
    func performSearch(_ query: String) {
        // Perform search
    }
}
```

---

## Platform Integration

### iOS-Specific Features

```swift
// Camera
import AVFoundation

struct CameraView: UIViewControllerRepresentable {
    func makeUIViewController(context: Context) -> UIImagePickerController {
        let picker = UIImagePickerController()
        picker.sourceType = .camera
        picker.delegate = context.coordinator
        return picker
    }
    
    func updateUIViewController(_ uiViewController: UIImagePickerController, context: Context) {}
    
    func makeCoordinator() -> Coordinator {
        Coordinator()
    }
    
    class Coordinator: NSObject, UIImagePickerControllerDelegate, UINavigationControllerDelegate {
        func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey : Any]) {
            // Handle image
        }
    }
}
```

### macOS-Specific

```swift
#if os(macOS)
    .frame(minWidth: 400, minHeight: 300)
#endif
```

---

## Testing

### Unit Tests

```swift
import XCTest
@testable import MyApp

class ViewModelTests: XCTestCase {
    func testIncrement() {
        let viewModel = CounterViewModel()
        viewModel.increment()
        XCTAssertEqual(viewModel.count, 1)
    }
}
```

### UI Tests

```swift
import XCTest

class MyAppUITests: XCTestCase {
    func testButtonTap() throws {
        let app = XCUIApplication()
        app.launch()
        
        let button = app.buttons["incrementButton"]
        button.tap()
        
        let label = app.staticTexts["countLabel"]
        XCTAssertEqual(label.label, "1")
    }
}
```

---

## Best Practices

### 1. **Extract Subviews**
```swift
struct ContentView: View {
    var body: some View {
        VStack {
            HeaderView()
            BodyView()
            FooterView()
        }
    }
}
```

### 2. **Use ViewModels**
```swift
class ContentViewModel: ObservableObject {
    @Published var items: [Item] = []
    
    func loadData() {
        // Load data
    }
}
```

### 3. **Prefer@State over @StateObject for Simple Cases**
```swift
@State private var isShowing = false  // Simple boolean
@StateObject private var viewModel = ViewModel()  // Complex object
```

### 4. **Use PreviewProvider**
```swift
struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        Group {
            ContentView()
            ContentView()
                .preferredColorScheme(.dark)
        }
    }
}
```

---

## Resources

### Official Documentation
- [SwiftUI Documentation](https://developer.apple.com/documentation/swiftui)
- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Swift.org](https://swift.org/)

### Learning Resources
- [100 Days of SwiftUI](https://www.hackingwithswift.com/100/swiftui)
- [SwiftUI by Example](https://www.hackingwithswift.com/quick-start/swiftui)
- [Apple Tutorials](https://developer.apple.com/tutorials/swiftui)

### Tools
- [SF Symbols](https://developer.apple.com/sf-symbols/)
- [Xcode](https://developer.apple.com/xcode/)

---

## Conclusion

SwiftUI is the future of Apple platform development, offering a modern, declarative approach to building user interfaces. While UIKit will remain relevant for years to come, SwiftUI provides a more intuitive and efficient way to create beautiful, responsive apps across all Apple platforms.

Happy coding with SwiftUI! 🍎✨
