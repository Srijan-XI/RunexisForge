# Introduction to Panda3D

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
```bash

---

## Best For

- Python developers
- Educational projects
- Indie games
- Simulation projects
- Prototyping

---

Ready to start? Check the [User Guide](user-guide.md)!

**Build games with Python! 🐍🎮**
