# Panda3D User Guide

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
