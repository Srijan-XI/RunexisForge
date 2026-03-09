# Panda3D

## Introduction

## What is Panda3D?

**Panda3D** is an open-source, powerful 3D game engine developed originally by Disney and now maintained by Carnegie Mellon University. It's written in C++ with Python bindings, making it accessible for rapid development while maintaining high performance.

---

## Why Choose Panda3D?

- **🐍 Python-First**: Primary development in Python
- **🆓 Open Source**: MIT license, completely free
- **📚 Comprehensive**: Full-featured engine with everything included
- **🎓 Educational**: Great for learning game development
- **🔧 Flexible**: Can use C++ for performance-critical parts
- **🎮 Proven**: Used in commercial games and research

---

## Key Features

- **Cross-Platform**: Windows, macOS, Linux
- **Render Pipeline**: Modern rendering with PBR support
- **Physics**: Built-in Bullet Physics integration
- **Audio**: OpenAL and FMOD support
- **Networking**: Built-in multiplayer support
- **Scene Graph**: Efficient hierarchical scene management
- **Shaders**: GLSL shader support
- **Particle System**: Advanced particle effects

---

## Popular Projects

- **Toontown Online** - Disney MMO
- **Pirates of the Caribbean Online** - Disney MMO
- **Educational Simulations** - CMU Research
- **Indie Games** - Various independent titles

---

## Programming Language

**Primary**: Python (C++ also supported)

```python
from direct.showbase.ShowBase import ShowBase

class MyGame(ShowBase):
    def __init__(self):
        ShowBase.__init__(self)
        
        # Load a model
        self.model = self.loader.loadModel("models/panda")
        self.model.reparentTo(self.render)
        self.model.setScale(0.25)
        self.model.setPos(0, 10, 0)

app = MyGame()
app.run()
```

---

## Best For

- Python developers
- Educational projects
- Indie games
- Simulation projects
- Prototyping

---

Ready to start? Jump to the **User Guide** section below.

**Build games with Python! 🐍🎮**

---

## User Guide

## Installation

```bash
# Python 3.x required
pip install panda3d

# Verify installation
python -c "import panda3d; print(panda3d.__version__)"
```

---

## Quick Start

### Hello World

```python
from direct.showbase.ShowBase import ShowBase

class MyApp(ShowBase):
    def __init__(self):
        ShowBase.__init__(self)
        
app = MyApp()
app.run()
```

### Load and Display Model

```python
from direct.showbase.ShowBase import ShowBase

class MyApp(ShowBase):
    def __init__(self):
        ShowBase.__init__(self)
        
        # Load model
        self.scene = self.loader.loadModel("environment")
        self.scene.reparentTo(self.render)
        self.scene.setScale(0.25)
        self.scene.setPos(-8, 42, 0)
        
app = MyApp()
app.run()
```

---

## Resources

- [Official Manual](https://docs.panda3d.org/)
- [Python API](https://docs.panda3d.org/1.10/python/index)
- [Forums](https://discourse.panda3d.org/)

**Happy coding! 🐍**

