# Introduction to Cocos2d

## What is Cocos2d?

**Cocos2d** is a family of open-source game development frameworks designed for building 2D games, demos, and graphical applications. Originally created for Python, it now has variants for multiple platforms and languages.

---

## Cocos2d Variants

- **Cocos2d-x**: C++ (most popular, cross-platform)
- **Cocos2d-js**: JavaScript/HTML5
- **Cocos Creator**: Visual editor + JavaScript/TypeScript
- **Cocos2d-Python**: Python (original)
- **Cocos2d-Swift**: Swift/Objective-C (iOS/macOS)

---

## Why Choose Cocos2d?

- **🆓 Open Source**: MIT License
- **📱 Mobile-First**: Excellent for iOS/Android
- **🎨 2D Focused**: Optimized for 2D games
- **⚡ Performance**: C++ core for speed
- **🌐 Cross-Platform**: Write once, deploy everywhere
- **👥 Community**: Large, active community

---

## Key Features (Cocos2d-x)

- **Sprite Management**: Efficient sprite rendering
- **Animation**: Built-in animation system
- **Particle System**: 2D particle effects
- **Physics**: Box2D and Chipmunk integration
- **Audio**: Sound and music playback
- **Tile Maps**: TMX tile map support
- **Scene Management**: Easy scene transitions
- **UI Components**: Buttons, labels, menus

---

## Popular Games

- **Angry Birds** - Rovio
- **Clash of Clans** (early versions) - Supercell
- **Badland** - Frogmind
- **Many mobile indie games**

---

## Programming

**C++ Example**:

```cpp
#include "cocos2d.h"

class HelloWorld : public cocos2d::Scene
{
public:
    static cocos2d::Scene* createScene();
    virtual bool init();
    CREATE_FUNC(HelloWorld);
};
```bash

**JavaScript Example**:

```javascript
var HelloWorldLayer = cc.Layer.extend({
    sprite: null,
    init: function () {
        this._super();
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.setPosition(cc.winSize.width / 2, cc.winSize.height / 2);
        this.addChild(this.sprite);
        return true;
    }
});
```bash

---

## Best For

- 2D mobile games
- Casual games
- Indie developers
- Cross-platform development

---

Check the [User Guide](user-guide.md) to get started!

**Create amazing 2D games! 🎮✨**
