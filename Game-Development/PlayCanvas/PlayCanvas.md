# PlayCanvas

## Introduction

## What is PlayCanvas?

PlayCanvas is a cloud-based game engine and collaborative development platform that enables teams to build interactive 3D content for web browsers and mobile devices. It features a visual editor, real-time collaboration, built-in version control, and WebGL/WebGPU rendering, making it ideal for creating games, visualizations, and interactive experiences.

## Why PlayCanvas?

- Cloud-based editor (no installation)
- Real-time collaboration
- Visual scripting and coding
- WebGL/WebGPU rendering
- Built-in physics (Ammo.js)
- Asset pipeline
- Version control
- One-click publishing
- Mobile-optimized
- Free tier available

## Getting Started

### Create Account

1. Visit [playcanvas.com](https://playcanvas.com/)
2. Sign up for free account
3. Create new project

### Editor Interface

- **Viewport**: 3D scene view
- **Hierarchy**: Scene entities
- **Inspector**: Entity properties
- **Assets**: Project resources
- **Console**: Debug output

## Creating First Project

### New Project

```
1. Dashboard → New Project
2. Choose template (Blank, FPS, etc.)
3. Open Editor
```

### Basic Scene Setup

```javascript
// Create entity
const box = new pc.Entity('Box');
box.addComponent('model', { type: 'box' });
box.setPosition(0, 1, 0);
app.root.addChild(box);

// Add light
const light = new pc.Entity('Light');
light.addComponent('light', { type: 'directional' });
light.setEulerAngles(45, 45, 0);
app.root.addChild(light);

// Add camera
const camera = new pc.Entity('Camera');
camera.addComponent('camera');
camera.setPosition(0, 2, 5);
camera.lookAt(0, 0, 0);
app.root.addChild(camera);
```

## Entities and Components

### Creating Entities

```javascript
// Script component
var MyScript = pc.createScript('myScript');

MyScript.prototype.initialize = function() {
    // Create box
    this.box = new pc.Entity();
    this.box.addComponent('model', {
        type: 'box'
    });
    this.app.root.addChild(this.box);
};

MyScript.prototype.update = function(dt) {
    // Rotate box
    this.box.rotate(0, dt * 50, 0);
};
```

### Component Types

```javascript
// Model component
entity.addComponent('model', {
    type: 'box',
    material: material
});

// Rigidbody (physics)
entity.addComponent('rigidbody', {
    type: 'dynamic',
    mass: 1
});

// Collision
entity.addComponent('collision', {
    type: 'box'
});

// Script
entity.addComponent('script');
entity.script.create('playerController');

// Camera
entity.addComponent('camera', {
    clearColor: new pc.Color(0.1, 0.1, 0.1),
    fov: 60
});
```

## Scripting

### Script Structure

```javascript
var PlayerController = pc.createScript('playerController');

// Attributes (editor-exposed)
PlayerController.attributes.add('speed', {
    type: 'number',
    default: 5
});

// Initialize
PlayerController.prototype.initialize = function() {
    this.velocity = new pc.Vec3();
};

// Update (called every frame)
PlayerController.prototype.update = function(dt) {
    var input = this.app.keyboard;
    
    if (input.isPressed(pc.KEY_W)) {
        this.entity.translate(0, 0, -this.speed * dt);
    }
    if (input.isPressed(pc.KEY_S)) {
        this.entity.translate(0, 0, this.speed * dt);
    }
};

// PostUpdate
PlayerController.prototype.postUpdate = function(dt) {
    // After all updates
};

// Swap (hot-reload)
PlayerController.prototype.swap = function(old) {
    // Transfer state from old script
};
```

## Materials

### Creating Materials

```javascript
// Create material
const material = new pc.StandardMaterial();
material.diffuse = new pc.Color(1, 0, 0);
material.shininess = 50;
material.update();

// With texture
material.diffuseMap = textureAsset.resource;
material.normalMap = normalMapAsset.resource;
material.update();

// Physical material
const pbr = new pc.StandardMaterial();
pbr.metalness = 0.9;
pbr.roughness = 0.2;
pbr.useMetalness = true;
pbr.update();
```

## Physics

### Rigidbody

```javascript
// Add rigidbody
entity.addComponent('rigidbody', {
    type: 'dynamic',  // or 'static', 'kinematic'
    mass: 1,
    restitution: 0.5,
    friction: 0.5
});

// Apply force
entity.rigidbody.applyForce(new pc.Vec3(0, 10, 0));

// Apply impulse
entity.rigidbody.applyImpulse(new pc.Vec3(0, 5, 0));

// Teleport
entity.rigidbody.teleport(x, y, z);
```

### Collision

```javascript
// Collision component
entity.addComponent('collision', {
    type: 'box',
    halfExtents: new pc.Vec3(0.5, 0.5, 0.5)
});

// Collision events
entity.collision.on('collisionstart', function(result) {
    console.log('Collision with:', result.other.name);
});
```

## Input

### Keyboard

```javascript
// In update
if (this.app.keyboard.isPressed(pc.KEY_SPACE)) {
    // Jump
}

if (this.app.keyboard.wasPressed(pc.KEY_E)) {
    // Interact (once per press)
}
```

### Mouse

```javascript
// Mouse click
this.app.mouse.on('mousedown', function(event) {
    if (event.button === pc.MOUSEBUTTON_LEFT) {
        // Left click
    }
});

// Mouse move
this.app.mouse.on('mousemove', function(event) {
    var dx = event.dx;
    var dy = event.dy;
});
```

### Touch

```javascript
// Touch events
this.app.touch.on('touchstart', function(event) {
    var touch = event.touches[0];
    console.log(touch.x, touch.y);
});
```

## Audio

### Playing Sounds

```javascript
// Add sound component
entity.addComponent('sound');

// Add slot
entity.sound.addSlot('jump', {
    asset: jumpSoundAsset,
    autoPlay: false,
    volume: 0.8
});

// Play
entity.sound.play('jump');

// 3D sound
entity.sound.addSlot('ambient', {
    asset: ambientAsset,
    positional: true,
    distance: 10
});
```

## Animation

### Sprite Animation

```javascript
// Add sprite component
entity.addComponent('sprite', {
    type: 'animated',
    spriteAsset: spriteAtlas,
    clips: {
        'walk': {
            fps: 10,
            loop: true
        }
    }
});

// Play animation
entity.sprite.play('walk');
```

### Model Animation

```javascript
// Add animation component
entity.addComponent('animation', {
    assets: [animationAsset],
    speed: 1.0
});

// Play
entity.animation.play('run');

// Blend
entity.animation.play('idle', 0.2);
```

## Camera Control

```javascript
var CameraController = pc.createScript('cameraController');

CameraController.attributes.add('target', {
    type: 'entity'
});

CameraController.prototype.update = function(dt) {
    if (this.target) {
        // Follow target
        var targetPos = this.target.getPosition();
        this.entity.setPosition(
            targetPos.x,
            targetPos.y + 5,
            targetPos.z + 10
        );
        this.entity.lookAt(targetPos);
    }
};
```

## Particle Systems

```javascript
// Add particle system
entity.addComponent('particlesystem', {
    numParticles: 100,
    lifetime: 1,
    rate: 50,
    emitterShape: pc.EMITTERSHAPE_SPHERE,
    emitterRadius: 1,
    colorMap: particleTexture
});

// Start/stop
entity.particlesystem.play();
entity.particlesystem.stop();
```

## UI

### Creating UI

```javascript
// Screen
const screen = new pc.Entity();
screen.addComponent('screen', {
    screenSpace: true,
    scaleMode: 'blend'
});
app.root.addChild(screen);

// Button
const button = new pc.Entity();
button.addComponent('button');
button.addComponent('element', {
    type: 'image',
    anchor: [0.5, 0.5, 0.5, 0.5],
    pivot: [0.5, 0.5],
    width: 200,
    height: 50
});
screen.addChild(button);

// Button click
button.button.on('click', function() {
    console.log('Button clicked!');
});

// Text
const text = new pc.Entity();
text.addComponent('element', {
    type: 'text',
    text: 'Score: 0',
    fontSize: 32,
    color: new pc.Color(1, 1, 1)
});
screen.addChild(text);
```

## Loading Assets

### Asset Loading

```javascript
// Load texture
app.assets.load(textureAsset);

textureAsset.ready(function() {
    material.diffuseMap = textureAsset.resource;
    material.update();
});

// Load model
app.assets.load(modelAsset);

modelAsset.ready(function() {
    entity.addComponent('model', {
        asset: modelAsset
    });
});
```

## Publishing

### Build Settings

```
1. Click Publish
2. Choose platform (Web, iOS, Android)
3. Configure settings
4. Download build or publish to PlayCanvas
```

### Optimization

```javascript
// Optimize for mobile
- Use lower resolution textures
- Reduce polygon count
- Limit draw calls
- Use object pooling
- Compress audio
```

## Collaboration

### Version Control

- Auto-save
- Checkpoints
- Branches
- Merge changes

### Team Features

- Real-time collaboration
- Share projects
- Commenting
- Asset management

## Resources

- [PlayCanvas Docs](https://developer.playcanvas.com/)
- [API Reference](https://api.playcanvas.com/)
- [Tutorials](https://developer.playcanvas.com/tutorials/)
- [Forum](https://forum.playcanvas.com/)
- [Examples](https://playcanvas.com/explore)

## Next Steps

- Complete tutorials
- Build sample games
- Learn WebGL optimization
- Explore monetization
- Join community
- Publish projects
