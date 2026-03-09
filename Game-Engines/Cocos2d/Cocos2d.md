# Cocos2d

## Introduction

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

Jump to the **User Guide** section below to get started.

**Create amazing 2D games! 🎮✨**

---

## User Guide

## Installation (Cocos2d-x)

### Download

1. Visit [cocos2d-x.org](https://www.cocos.com/en/cocos2d-x)
2. Download latest stable version
3. Extract to your development folder

### Prerequisites

- Python 2.7 or 3.x
- CMake 3.6+
- Visual Studio (Windows) or Xcode (macOS)
- Android SDK/NDK (for Android)

### Setup

```bash
cd cocos2d-x
python setup.py
```bash

---

## Create Project

```bash
cocos new MyGame -p com.company.mygame -l cpp -d ~/Projects
cd MyGame
```bash

---

## Build and Run

```bash
# iOS
cocos run -p ios

# Android
cocos run -p android

# Windows
cocos run -p win32

# Web
cocos run -p web
```bash

---

## Basic Scene

```cpp
// HelloWorldScene.h
#ifndef __HELLOWORLD_SCENE_H__
#define __HELLOWORLD_SCENE_H__

#include "cocos2d.h"

class HelloWorld : public cocos2d::Scene
{
public:
    static cocos2d::Scene* createScene();
    virtual bool init();
    CREATE_FUNC(HelloWorld);
};

#endif // __HELLOWORLD_SCENE_H__
```bash

```cpp
// HelloWorldScene.cpp
#include "HelloWorldScene.h"

USING_NS_CC;

Scene* HelloWorld::createScene()
{
    return HelloWorld::create();
}

bool HelloWorld::init()
{
    if (!Scene::init())
        return false;
    
    auto visibleSize = Director::getInstance()->getVisibleSize();
    Vec2 origin = Director::getInstance()->getVisibleOrigin();
    
    // Create a sprite
    auto sprite = Sprite::create("HelloWorld.png");
    sprite->setPosition(Vec2(visibleSize.width/2 + origin.x,
                            visibleSize.height/2 + origin.y));
    this->addChild(sprite, 0);
    
    return true;
}
```bash

---

## Resources

- [Documentation](https://docs.cocos.com/cocos2d-x/manual/en/)
- [API Reference](https://docs.cocos.com/cocos2d-x/api-ref/)
- [Forums](https://discuss.cocos2d-x.org/)

**Happy game development! 🎮**

