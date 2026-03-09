# Kivy - Python Framework for Mobile & Multi-Touch Applications

## Table of Contents
- [Introduction](#introduction)
- [What is Kivy?](#what-is-kivy)
- [Key Features](#key-features)
- [Installation & Setup](#installation--setup)
- [Basic Application](#basic-application)
- [Widgets & Layouts](#widgets--layouts)
- [KV Language](#kv-language)
- [Properties & Events](#properties--events)
- [Graphics & Animation](#graphics--animation)
- [Touch & Gestures](#touch--gestures)
- [Storage & Data](#storage--data)
- [Networking](#networking)
- [Platform-Specific Features](#platform-specific-features)
- [Packaging & Deployment](#packaging--deployment)
- [Best Practices](#best-practices)
- [Resources](#resources)

---

## Introduction

**Kivy** is an open-source Python framework for developing multi-touch applications that run on Windows, macOS, Linux, Android, and iOS. It provides a natural user interface (NUI) toolkit with custom widgets and supports multi-touch events, making it perfect for innovative, modern applications.

### Why Choose Kivy?

- **Python**: Write mobile apps in Python
- **Cross-Platform**: Single codebase for all platforms
- **Multi-Touch**: Built-in multi-touch support
- **OpenGL ES 2**: Hardware-accelerated graphics
- **Free & Open Source**: MIT licensed
- **Rapid Development**: Build UIs quickly
- **Custom Widgets**: Create unique interface elements
- **Large Community**: Active community and plugins

---

## What is Kivy?

Kivy is a Python framework that provides:

###Components

1. **Kivy Core**: Main application loop and event system
2. **Widgets**: Pre-built UI components
3. **Graphics**: OpenGL-based rendering
4. **Input**: Multi-touch and gesture recognition
5. **KV Language**: Declarative UI description language
6. **Garden**: Community-contributed widgets and tools

### Kivy vs Other Frameworks

| Feature | Kivy | React Native | Flutter |
|---------|------|--------------|---------|
| **Language** | Python | JavaScript | Dart |
| **Multi-Touch** | Excellent | Good | Good |
| **Learning Curve** | Easy (Python) | Moderate | Moderate |
| **Performance** | Good | Excellent | Excellent |
| **Community** | Medium | Large | Large |
| **UI** | Custom | Native | Custom |

---

## Key Features

### 1. **Multi-Touch**
Native support for multi-touch gestures on all platforms.

### 2. **Custom Widgets**
Create completely custom UI elements with Python and OpenGL.

### 3. **GPU Acceleration**
Hardware-accelerated graphics using OpenGL ES 2.

### 4. **Cross-Platform**
Write once, deploy everywhere (mobile, desktop, web).

### 5. **KV Language**
Declarative language for designing UIs.

### 6. **Properties**
Observable properties that automatically update UI.

---

## Installation & Setup

### Install Kivy

```bash
# Install Kivy (Windows/macOS/Linux)
pip install kivy

# With examples and demos
pip install kivy[full]

# Specific version
pip install kivy==2.2.1

# Development dependencies
pip install buildozer  # For Android
pip install kivy-ios   # For iOS
```

### Verify Installation

```python
python -c "import kivy; print(kivy.__version__)"
```

### Development Environment

```bash
# Recommended IDE: VSCode or PyCharm
# Install Python extension
# Configure linting and formatting

# For Android development
pip install buildozer python-for-android

# For iOS development (macOS only)
pip install kivy-ios
```

---

## Basic Application

### Hello World

```python
# main.py
from kivy.app import App
from kivy.uix.label import Label

class HelloApp(App):
    def build(self):
        return Label(text='Hello, Kivy!')

if __name__ == '__main__':
    HelloApp().run()
```

### Simple Button App

```python
from kivy.app import App
from kivy.uix.button import Button
from kivy.uix.boxlayout import BoxLayout

class MyApp(App):
    def build(self):
        layout = BoxLayout(orientation='vertical', padding=10, spacing=10)
        
        # Create button
        btn = Button(
            text='Click Me!',
            size_hint=(1, 0.5),
            background_color=(0.3, 0.6, 0.9, 1)
        )
        btn.bind(on_press=self.on_button_press)
        
        layout.add_widget(btn)
        return layout
    
    def on_button_press(self, instance):
        instance.text = 'Clicked!'

if __name__ == '__main__':
    MyApp().run()
```

### Counter App

```python
from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.label import Label
from kivy.uix.button import Button

class CounterApp(App):
    def build(self):
        self.count = 0
        
        layout = BoxLayout(orientation='vertical', padding=20, spacing=20)
        
        self.label = Label(
            text=f'Count: {self.count}',
            font_size='32sp',
            size_hint=(1, 0.5)
        )
        
        btn_layout = BoxLayout(size_hint=(1, 0.5), spacing=10)
        
        btn_minus = Button(text='-', font_size='24sp')
        btn_minus.bind(on_press=self.decrement)
        
        btn_plus = Button(text='+', font_size='24sp')
        btn_plus.bind(on_press=self.increment)
        
        btn_layout.add_widget(btn_minus)
        btn_layout.add_widget(btn_plus)
        
        layout.add_widget(self.label)
        layout.add_widget(btn_layout)
        
        return layout
    
    def increment(self, instance):
        self.count += 1
        self.label.text = f'Count: {self.count}'
    
    def decrement(self, instance):
        self.count -= 1
        self.label.text = f'Count: {self.count}'

if __name__ == '__main__':
    CounterApp().run()
```

---

## Widgets & Layouts

### Common Widgets

#### Label

```python
from kivy.uix.label import Label

label = Label(
    text='Hello World',
    font_size='24sp',
    color=(1, 0, 0, 1),  # Red (RGBA)
    bold=True,
    italic=False,
    markup=True
)

# With markup
label = Label(
    text='[b]Bold[/b] and [i]Italic[/i]',
    markup=True
)
```

#### Button

```python
from kivy.uix.button import Button

button = Button(
    text='Press Me',
    size_hint=(0.5, 0.2),
    background_color=(0.2, 0.6, 1, 1),
    font_size='18sp'
)

def on_press(instance):
    print('Button pressed!')

button.bind(on_press=on_press)
```

#### TextInput

```python
from kivy.uix.textinput import TextInput

text_input = TextInput(
    text='Default text',
    multiline=False,
    font_size='18sp',
    size_hint=(1, 0.1)
)

def on_text_change(instance, value):
    print(f'Text changed to: {value}')

text_input.bind(text=on_text_change)
```

#### Image

```python
from kivy.uix.image import Image

# Local image
img = Image(source='logo.png')

# Network image
img = Image(source='https://example.com/image.jpg')

# Async loading
img = AsyncImage(source='https://example.com/image.jpg')
```

#### Spinner (Dropdown)

```python
from kivy.uix.spinner import Spinner

spinner = Spinner(
    text='Select',
    values=('Option 1', 'Option 2', 'Option 3'),
    size_hint=(1, 0.1)
)

def on_select(instance, value):
    print(f'Selected: {value}')

spinner.bind(text=on_select)
```

#### Checkbox & Switch

```python
from kivy.uix.checkbox import CheckBox
from kivy.uix.switch import Switch

checkbox = CheckBox(active=True)
switch = Switch(active=False)

def on_checkbox_active(instance, value):
    print(f'Checkbox is: {value}')

checkbox.bind(active=on_checkbox_active)
```

### Layouts

#### BoxLayout

```python
from kivy.uix.boxlayout import BoxLayout

# Vertical
layout = BoxLayout(
    orientation='vertical',
    padding=10,
    spacing=10
)

layout.add_widget(Button(text='Top'))
layout.add_widget(Button(text='Middle'))
layout.add_widget(Button(text='Bottom'))

# Horizontal
layout = BoxLayout(orientation='horizontal')
layout.add_widget(Button(text='Left'))
layout.add_widget(Button(text='Center'))
layout.add_widget(Button(text='Right'))
```

#### GridLayout

```python
from kivy.uix.gridlayout import GridLayout

layout = GridLayout(cols=3, spacing=10, padding=10)

for i in range(9):
    layout.add_widget(Button(text=f'Btn {i+1}'))
```

#### FloatLayout

```python
from kivy.uix.floatlayout import FloatLayout

layout = FloatLayout()

btn1 = Button(
    text='Top Left',
    size_hint=(0.3, 0.2),
    pos_hint={'x': 0, 'top': 1}
)

btn2 = Button(
    text='Center',
    size_hint=(0.3, 0.2),
    pos_hint={'center_x': 0.5, 'center_y': 0.5}
)

layout.add_widget(btn1)
layout.add_widget(btn2)
```

#### AnchorLayout

```python
from kivy.uix.anchorlayout import AnchorLayout

layout = AnchorLayout(
    anchor_x='center',
    anchor_y='center'
)

btn = Button(text='Centered', size_hint=(0.3, 0.2))
layout.add_widget(btn)
```

#### StackLayout

```python
from kivy.uix.stacklayout import StackLayout

layout = StackLayout(orientation='lr-tb', spacing=10)

for i in range(20):
    layout.add_widget(Button(
        text=f'{i+1}',
        size_hint=(None, None),
        size=(100, 50)
    ))
```

---

## KV Language

### What is KV Language?

KV is a declarative language for describing UIs in Kivy, similar to QML or XAML.

### Basic KV File

```python
# my.kv
<MyWidget>:
    BoxLayout:
        orientation: 'vertical'
        padding: 10
        spacing: 10
        
        Label:
            text: 'Hello from KV!'
            font_size: '32sp'
        
        Button:
            text: 'Click Me'
            size_hint_y: 0.3
            on_press: root.on_button_press()
```

```python
# main.py
from kivy.app import App
from kivy.uix.boxlayout import BoxLayout

class MyWidget(BoxLayout):
    def on_button_press(self):
        print('Button pressed!')

class MyApp(App):
    def build(self):
        return MyWidget()

if __name__ == '__main__':
    MyApp().run()
```

### Advanced KV Example

```python
# counter.kv
<CounterWidget>:
    count: 0
    
    BoxLayout:
        orientation: 'vertical'
        padding: 20
        spacing: 20
        
        Label:
            text: f'Count: {root.count}'
            font_size: '48sp'
            
        BoxLayout:
            size_hint_y: 0.3
            spacing: 10
            
            Button:
                text: '-'
                font_size: '32sp'
                on_press: root.count -= 1
            
            Button:
                text: '+'
                font_size: '32sp'
                on_press: root.count += 1
```

```python
# main.py
from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.properties import NumericProperty

class CounterWidget(BoxLayout):
    count = NumericProperty(0)

class CounterApp(App):
    def build(self):
        return CounterWidget()

if __name__ == '__main__':
    CounterApp().run()
```

---

## Properties & Events

### Kivy Properties

```python
from kivy.properties import (
    StringProperty,
    NumericProperty,
    ListProperty,
    BooleanProperty,
    ObjectProperty
)
from kivy.uix.widget import Widget

class MyWidget(Widget):
    name = StringProperty('Default')
    age = NumericProperty(0)
    items = ListProperty([])
    is_active = BooleanProperty(False)
    user = ObjectProperty(None)
    
    def on_name(self, instance, value):
        print(f'Name changed to: {value}')
    
    def on_age(self, instance, value):
        print(f'Age changed to: {value}')
```

### Event Binding

```python
from kivy.uix.button import Button

button = Button(text='Click')

# Bind to event
def callback(instance):
    print('Button clicked!')

button.bind(on_press=callback)

# Unbind
button.unbind(on_press=callback)

# Custom events
button.register_event_type('on_custom')

def on_custom(instance):
    print('Custom event triggered!')

button.bind(on_custom=on_custom)
button.dispatch('on_custom')
```

---

## Graphics & Animation

### Canvas Drawing

```python
from kivy.uix.widget import Widget
from kivy.graphics import Color, Rectangle, Line, Ellipse

class DrawingWidget(Widget):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        
        with self.canvas:
            # Red rectangle
            Color(1, 0, 0, 1)
            Rectangle(pos=(50, 50), size=(200, 100))
            
            # Blue circle
            Color(0, 0, 1, 1)
            Ellipse(pos=(300, 50), size=(100, 100))
            
            # Green line
            Color(0, 1, 0, 1)
            Line(points=[50, 200, 450, 200], width=2)
```

### Animations

```python
from kivy.animation import Animation
from kivy.uix.button import Button

button = Button(text='Animate Me', size_hint=(0.3, 0.2))

# Create animation
anim = Animation(
    x=400,
    y=300,
    size=(300, 200),
    duration=1,
    transition='in_out_cubic'
)

# Start animation
anim.start(button)

# Sequence animations
anim1 = Animation(x=100, duration=1)
anim2 = Animation(y=100, duration=1)
anim_seq = anim1 + anim2  # Sequential
anim_seq.start(button)

# Parallel animations
anim_par = anim1 & anim2  # Parallel
anim_par.start(button)

# Repeat animation
anim = Animation(x=400, duration=1)
anim.repeat = True
anim.start(button)
```

---

## Touch & Gestures

### Touch Events

```python
from kivy.uix.widget import Widget

class TouchWidget(Widget):
    def on_touch_down(self, touch):
        print(f'Touch down at: {touch.pos}')
        return True
    
    def on_touch_move(self, touch):
        print(f'Touch move to: {touch.pos}')
        return True
    
    def on_touch_up(self, touch):
        print(f'Touch up at: {touch.pos}')
        return True
```

### Multi-Touch

```python
from kivy.uix.widget import Widget
from kivy.graphics import Color, Ellipse

class MultiTouchWidget(Widget):
    def on_touch_down(self, touch):
        with self.canvas:
            Color(1, 0, 0, 1)
            touch.ud['circle'] = Ellipse(
                pos=(touch.x - 30, touch.y - 30),
                size=(60, 60)
            )
        return True
    
    def on_touch_move(self, touch):
        touch.ud['circle'].pos = (touch.x - 30, touch.y - 30)
        return True
    
    def on_touch_up(self, touch):
        self.canvas.remove(touch.ud['circle'])
        return True
```

---

## Storage & Data

### App Storage

```python
from kivy.app import App
from kivy.storage.jsonstore import JsonStore

class DataApp(App):
    def build(self):
        # Create store
        self.store = JsonStore('mydata.json')
        
        # Save data
        self.store.put('user', name='John', age=30)
        
        # Get data
        if self.store.exists('user'):
            user = self.store.get('user')
            print(user['name'], user['age'])
        
        # Delete data
        self.store.delete('user')
        
        return Label(text='Data App')
```

### Settings

```python
from kivy.app import App
from kivy.uix.settings import SettingsWithSidebar

class MyApp(App):
    def build(self):
        # Use built-in settings
        self.use_kivy_settings = False
        return Label(text='App with Settings')
    
    def build_config(self, config):
        config.setdefaults('general', {
            'username': 'Guest',
            'theme': 'dark'
        })
    
    def build_settings(self, settings):
        settings_json = '''
        [
            {
                "type": "string",
                "title": "Username",
                "desc": "Enter your username",
                "section": "general",
                "key": "username"
            },
            {
                "type": "options",
                "title": "Theme",
                "desc": "Select theme",
                "section": "general",
                "key": "theme",
                "options": ["light", "dark"]
            }
        ]
        '''
        settings.add_json_panel('My Settings', self.config, data=settings_json)
```

---

## Networking

### HTTP Requests

```python
from kivy.network.urlrequest import UrlRequest
import json

def on_success(request, result):
    print('Success:', result)

def on_failure(request, error):
    print('Error:', error)

def on_progress(request, current_size, total_size):
    print(f'Progress: {current_size}/{total_size}')

# GET request
UrlRequest(
    'https://api.example.com/data',
    on_success=on_success,
    on_failure=on_failure,
    on_progress=on_progress
)

# POST request
UrlRequest(
    'https://api.example.com/users',
    req_body=json.dumps({'name': 'John', 'email': 'john@example.com'}),
    req_headers={'Content-Type': 'application/json'},
    on_success=on_success,
    on_failure=on_failure
)
```

---

## Platform-Specific Features

### Platform Detection

```python
from kivy.utils import platform

if platform == 'android':
    print('Running on Android')
elif platform == 'ios':
    print('Running on iOS')
elif platform == 'win':
    print('Running on Windows')
elif platform == 'macosx':
    print('Running on macOS')
elif platform == 'linux':
    print('Running on Linux')
```

### Android Features

```python
from jnius import autoclass

# Access Android API
PythonActivity = autoclass('org.kivy.android.PythonActivity')
activity = PythonActivity.mActivity

# Show Android Toast
Toast = autoclass('android.widget.Toast')
toast = Toast.makeText(activity, 'Hello Android!', Toast.LENGTH_SHORT)
toast.show()

# Request permissions
from android.permissions import request_permissions, Permission
request_permissions([Permission.CAMERA, Permission.WRITE_EXTERNAL_STORAGE])
```

---

## Packaging & Deployment

### Android (Buildozer)

```bash
# Install buildozer
pip install buildozer

# Initialize
buildozer init

# Edit buildozer.spec
# - Set title, package.name, package.domain
# - Set requirements (python3,kivy)
# - Set permissions if needed

# Build APK
buildozer android debug

# Build and deploy to device
buildozer android debug deploy run

# Build release APK
buildozer android release
```

#### buildozer.spec Example

```ini
[app]
title = My Kivy App
package.name = mykivyapp
package.domain = com.example

version = 1.0

requirements = python3,kivy

orientation = portrait
fullscreen = 0

# Android permissions
android.permissions = INTERNET,WRITE_EXTERNAL_STORAGE

# Icons
icon.filename = %(source.dir)s/icon.png
presplash.filename = %(source.dir)s/presplash.png

[buildozer]
log_level = 2
warn_on_root = 1
```

### iOS

```bash
# Install kivy-ios
pip install kivy-ios

# Download dependencies
toolchain build kivy

# Create Xcode project
toolchain create MyApp /path/to/your/app

# Open Xcode and build
open MyApp-ios/MyApp.xcodeproj
```

### Desktop (PyInstaller)

```bash
# Install PyInstaller
pip install pyinstaller

# Create executable
pyinstaller --onefile --windowed main.py

# With icon
pyinstaller --onefile --windowed --icon=icon.ico main.py
```

---

## Best Practices

### 1. **Use KV Language**
Separate UI from logic for cleaner code.

### 2. **Properties for Data**
Use Kivy properties for automatic UI updates.

### 3. **Optimize Graphics**
Cache graphics instructions when possible.

### 4. **Memory Management**
Remove widgets when not needed.

### 5. **Threading**
Use Clock or threading for long operations.

```python
from kivy.clock import Clock

def callback(dt):
    # This runs on main thread
    print('Callback executed')

Clock.schedule_once(callback, 2)  # After 2 seconds
Clock.schedule_interval(callback, 1)  # Every 1 second
```

### 6. **Error Handling**
Always handle exceptions, especially in events.

---

## Resources

### Official Documentation
- [Kivy Documentation](https://kivy.org/doc/stable/)
- [Kivy GitHub](https://github.com/kivy/kivy)
- [Kivy Garden](https://kivy-garden.github.io/)

### Community
- [Kivy Discord](https://chat.kivy.org/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/kivy)
- [Kivy Forum](https://groups.google.com/g/kivy-users)

### Tools
- [Buildozer](https://buildozer.readthedocs.io/)
- [Python-for-Android](https://python-for-android.readthedocs.io/)
- [Kivy-iOS](https://kivy-ios.readthedocs.io/)

### Learning
- [Kivy Tutorial](https://kivy.org/doc/stable/tutorials/index.html)
- [Kivy Crash Course](https://www.youtube.com/results?search_query=kivy+tutorial)

---

## Conclusion

Kivy is a powerful Python framework that enables developers to create cross-platform applications with multi-touch support and beautiful custom UIs. While it may not have the same performance as native or compiled frameworks, its simplicity and Python ecosystem make it an excellent choice for rapid prototyping and Python developers entering mobile development.

Happy coding with Kivy! 🐍📱✨
