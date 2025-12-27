# Cocos2d User Guide

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
