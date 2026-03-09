# Babylon.js

## Introduction

## What is Babylon.js?

Babylon.js is a powerful, open-source 3D engine built with JavaScript and TypeScript, designed to display 3D graphics in web browsers using WebGL and WebGPU. Created by Microsoft and the open-source community, Babylon.js provides a complete framework for creating interactive 3D experiences, games, and visualizations directly in the browser without plugins.

## Why Babylon.js?

- Powerful 3D rendering engine
- WebGL and WebGPU support
- Physics engines integration (Cannon.js, Ammo.js, Havok)
- Advanced material system (PBR materials)
- Built-in collision detection
- Particle systems
- Animation system
- Audio engine
- VR/AR/XR support
- TypeScript-first design
- Excellent documentation
- Active community

## Learning Path

1. Learn JavaScript/TypeScript
2. Understand 3D graphics concepts
3. Study WebGL basics
4. Install and setup Babylon.js
5. Create basic 3D scenes
6. Master materials and lighting
7. Implement physics and interactions

## User Guide

## Prerequisites

- JavaScript or TypeScript knowledge
- Basic understanding of 3D concepts
- Modern web browser with WebGL support
- Code editor (VS Code recommended)
- Node.js and npm (for development)

Check WebGL support:

```javascript
// Visit: https://get.webgl.org/
```

## Installation

### Using CDN

```html
<!DOCTYPE html>
<html>
<head>
    <title>Babylon.js Scene</title>
    <script src="https://cdn.babylonjs.com/babylon.js"></script>
</head>
<body>
    <canvas id="renderCanvas"></canvas>
    <script src="scene.js"></script>
</body>
</html>
```

### Using npm

```bash
# Create project
mkdir babylon-project
cd babylon-project
npm init -y

# Install Babylon.js
npm install @babylonjs/core

# Install additional packages
npm install @babylonjs/loaders
npm install @babylonjs/materials
npm install @babylonjs/gui
```

### TypeScript setup

```bash
# Install TypeScript
npm install --save-dev typescript webpack webpack-cli ts-loader

# Create tsconfig.json
npx tsc --init
```

## Basic Scene Setup

### Simple scene

```javascript
// scene.js
const canvas = document.getElementById('renderCanvas');
const engine = new BABYLON.Engine(canvas, true);

const createScene = function() {
    const scene = new BABYLON.Scene(engine);
    
    // Camera
    const camera = new BABYLON.ArcRotateCamera(
        "camera",
        Math.PI / 2,
        Math.PI / 2,
        10,
        BABYLON.Vector3.Zero(),
        scene
    );
    camera.attachControl(canvas, true);
    
    // Light
    const light = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(0, 1, 0),
        scene
    );
    
    // Sphere
    const sphere = BABYLON.MeshBuilder.CreateSphere(
        "sphere",
        { diameter: 2 },
        scene
    );
    
    return scene;
};

const scene = createScene();

engine.runRenderLoop(function() {
    scene.render();
});

window.addEventListener('resize', function() {
    engine.resize();
});
```

### TypeScript version

```typescript
import {
    Engine,
    Scene,
    ArcRotateCamera,
    HemisphericLight,
    Vector3,
    MeshBuilder
} from '@babylonjs/core';

class Game {
    private canvas: HTMLCanvasElement;
    private engine: Engine;
    private scene: Scene;

    constructor() {
        this.canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;
        this.engine = new Engine(this.canvas, true);
        this.scene = this.createScene();
        
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
        
        window.addEventListener('resize', () => {
            this.engine.resize();
        });
    }

    createScene(): Scene {
        const scene = new Scene(this.engine);
        
        const camera = new ArcRotateCamera(
            "camera",
            Math.PI / 2,
            Math.PI / 2,
            10,
            Vector3.Zero(),
            scene
        );
        camera.attachControl(this.canvas, true);
        
        const light = new HemisphericLight(
            "light",
            new Vector3(0, 1, 0),
            scene
        );
        
        const sphere = MeshBuilder.CreateSphere(
            "sphere",
            { diameter: 2 },
            scene
        );
        
        return scene;
    }
}

new Game();
```

## Meshes and Geometry

### Basic shapes

```javascript
// Box
const box = BABYLON.MeshBuilder.CreateBox("box", { size: 2 }, scene);

// Sphere
const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {
    diameter: 2,
    segments: 32
}, scene);

// Cylinder
const cylinder = BABYLON.MeshBuilder.CreateCylinder("cylinder", {
    height: 3,
    diameter: 2
}, scene);

// Plane
const plane = BABYLON.MeshBuilder.CreatePlane("plane", { size: 5 }, scene);

// Ground
const ground = BABYLON.MeshBuilder.CreateGround("ground", {
    width: 10,
    height: 10
}, scene);

// Torus
const torus = BABYLON.MeshBuilder.CreateTorus("torus", {
    diameter: 2,
    thickness: 0.5
}, scene);
```

### Custom meshes

```javascript
// Custom mesh from vertices
const customMesh = new BABYLON.Mesh("custom", scene);

const positions = [-5, 2, -3, -7, -2, -3, -3, -2, -3, 5, 2, 3, 7, -2, 3, 3, -2, 3];
const indices = [0, 1, 2, 3, 4, 5];

const vertexData = new BABYLON.VertexData();
vertexData.positions = positions;
vertexData.indices = indices;
vertexData.applyToMesh(customMesh);
```

### Mesh transformations

```javascript
// Position
mesh.position = new BABYLON.Vector3(0, 5, 0);
mesh.position.x = 2;

// Rotation (radians)
mesh.rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);
mesh.rotation.y = Math.PI / 4;

// Scaling
mesh.scaling = new BABYLON.Vector3(2, 1, 2);
mesh.scaling.x = 2;

// Look at target
mesh.lookAt(new BABYLON.Vector3(10, 0, 10));
```

## Materials

### Standard materials

```javascript
// Basic material
const material = new BABYLON.StandardMaterial("material", scene);
material.diffuseColor = new BABYLON.Color3(1, 0, 0);  // Red
material.specularColor = new BABYLON.Color3(0.5, 0.5, 0.5);
material.emissiveColor = new BABYLON.Color3(0, 0, 0);
material.ambientColor = new BABYLON.Color3(0.2, 0.2, 0.2);

mesh.material = material;
```

### Textures

```javascript
const material = new BABYLON.StandardMaterial("material", scene);

// Diffuse texture
material.diffuseTexture = new BABYLON.Texture("textures/diffuse.png", scene);

// Bump map
material.bumpTexture = new BABYLON.Texture("textures/normal.png", scene);

// Opacity texture
material.opacityTexture = new BABYLON.Texture("textures/opacity.png", scene);

// Specular texture
material.specularTexture = new BABYLON.Texture("textures/specular.png", scene);
```

### PBR Materials

```javascript
const pbr = new BABYLON.PBRMaterial("pbr", scene);

// Albedo (base color)
pbr.albedoColor = new BABYLON.Color3(1, 0, 0);
pbr.albedoTexture = new BABYLON.Texture("textures/albedo.png", scene);

// Metallic and roughness
pbr.metallic = 1.0;
pbr.roughness = 0.5;
pbr.metallicTexture = new BABYLON.Texture("textures/metallic.png", scene);

// Normal map
pbr.bumpTexture = new BABYLON.Texture("textures/normal.png", scene);

// Environment
pbr.environmentTexture = new BABYLON.CubeTexture("textures/environment.env", scene);

mesh.material = pbr;
```

## Lighting

### Light types

```javascript
// Hemispheric light (ambient)
const hemiLight = new BABYLON.HemisphericLight(
    "hemiLight",
    new BABYLON.Vector3(0, 1, 0),
    scene
);
hemiLight.intensity = 0.7;

// Directional light (sun)
const dirLight = new BABYLON.DirectionalLight(
    "dirLight",
    new BABYLON.Vector3(-1, -2, -1),
    scene
);
dirLight.position = new BABYLON.Vector3(20, 40, 20);
dirLight.intensity = 0.5;

// Point light (bulb)
const pointLight = new BABYLON.PointLight(
    "pointLight",
    new BABYLON.Vector3(0, 10, 0),
    scene
);
pointLight.intensity = 0.5;

// Spot light
const spotLight = new BABYLON.SpotLight(
    "spotLight",
    new BABYLON.Vector3(0, 30, 0),
    new BABYLON.Vector3(0, -1, 0),
    Math.PI / 3,
    2,
    scene
);
```

### Shadows

```javascript
// Create shadow generator
const shadowGenerator = new BABYLON.ShadowGenerator(1024, dirLight);

// Add shadow casters
shadowGenerator.addShadowCaster(sphere);
shadowGenerator.addShadowCaster(box);

// Enable shadows on mesh
ground.receiveShadows = true;

// Shadow quality
shadowGenerator.useBlurExponentialShadowMap = true;
shadowGenerator.blurScale = 2;
```

## Cameras

### Camera types

```javascript
// Arc Rotate Camera (orbital)
const arcCamera = new BABYLON.ArcRotateCamera(
    "arcCamera",
    Math.PI / 2,     // Alpha (horizontal rotation)
    Math.PI / 2,     // Beta (vertical rotation)
    10,              // Radius (distance)
    BABYLON.Vector3.Zero(),
    scene
);
arcCamera.attachControl(canvas, true);

// Free Camera (FPS-style)
const freeCamera = new BABYLON.FreeCamera(
    "freeCamera",
    new BABYLON.Vector3(0, 5, -10),
    scene
);
freeCamera.setTarget(BABYLON.Vector3.Zero());
freeCamera.attachControl(canvas, true);

// Follow Camera
const followCamera = new BABYLON.FollowCamera(
    "followCamera",
    new BABYLON.Vector3(0, 10, -10),
    scene
);
followCamera.lockedTarget = mesh;
followCamera.radius = 10;
followCamera.heightOffset = 5;
```

### Camera controls

```javascript
// Speed and sensitivity
camera.speed = 0.5;
camera.angularSensibility = 1000;

// Limits
camera.lowerRadiusLimit = 5;
camera.upperRadiusLimit = 50;
camera.lowerBetaLimit = 0.1;
camera.upperBetaLimit = Math.PI / 2;

// Inertia
camera.inertia = 0.9;
```

## Animations

### Basic animations

```javascript
// Create animation
const animation = new BABYLON.Animation(
    "rotation",
    "rotation.y",
    30,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
);

// Define keyframes
const keys = [
    { frame: 0, value: 0 },
    { frame: 60, value: Math.PI },
    { frame: 120, value: 2 * Math.PI }
];

animation.setKeys(keys);

// Attach animation to mesh
mesh.animations.push(animation);

// Play animation
scene.beginAnimation(mesh, 0, 120, true);
```

### Animation groups

```javascript
// Create animation group
const animationGroup = new BABYLON.AnimationGroup("group");

// Add animations
animationGroup.addTargetedAnimation(animation1, box);
animationGroup.addTargetedAnimation(animation2, sphere);

// Control playback
animationGroup.play();
animationGroup.pause();
animationGroup.stop();
animationGroup.speedRatio = 0.5;
```

## Physics

### Enable physics

```javascript
// Enable Cannon.js physics
scene.enablePhysics(
    new BABYLON.Vector3(0, -9.81, 0),
    new BABYLON.CannonJSPlugin()
);

// Or Ammo.js
const ammo = await Ammo();
scene.enablePhysics(
    new BABYLON.Vector3(0, -9.81, 0),
    new BABYLON.AmmoJSPlugin(true, ammo)
);
```

### Physics impostors

```javascript
// Ground (static)
ground.physicsImpostor = new BABYLON.PhysicsImpostor(
    ground,
    BABYLON.PhysicsImpostor.BoxImpostor,
    { mass: 0, restitution: 0.9 },
    scene
);

// Sphere (dynamic)
sphere.physicsImpostor = new BABYLON.PhysicsImpostor(
    sphere,
    BABYLON.PhysicsImpostor.SphereImpostor,
    { mass: 1, restitution: 0.7 },
    scene
);

// Apply forces
sphere.physicsImpostor.applyImpulse(
    new BABYLON.Vector3(10, 0, 0),
    sphere.getAbsolutePosition()
);
```

## Particle Systems

### Basic particles

```javascript
// Create particle system
const particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);

// Texture
particleSystem.particleTexture = new BABYLON.Texture("textures/particle.png", scene);

// Emitter
particleSystem.emitter = mesh;

// Properties
particleSystem.minSize = 0.1;
particleSystem.maxSize = 0.5;
particleSystem.minLifeTime = 0.3;
particleSystem.maxLifeTime = 1.5;
particleSystem.emitRate = 500;

// Direction and speed
particleSystem.direction1 = new BABYLON.Vector3(-1, 8, 1);
particleSystem.direction2 = new BABYLON.Vector3(1, 8, -1);
particleSystem.minEmitPower = 1;
particleSystem.maxEmitPower = 3;

// Colors
particleSystem.color1 = new BABYLON.Color4(1, 0, 0, 1);
particleSystem.color2 = new BABYLON.Color4(0, 1, 0, 1);
particleSystem.colorDead = new BABYLON.Color4(0, 0, 0, 0);

// Start
particleSystem.start();
```

## Collision Detection

### Mesh collisions

```javascript
// Enable collisions
scene.collisionsEnabled = true;
camera.checkCollisions = true;
mesh.checkCollisions = true;

// Collision callback
mesh.actionManager = new BABYLON.ActionManager(scene);
mesh.actionManager.registerAction(
    new BABYLON.ExecuteCodeAction(
        {
            trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
            parameter: otherMesh
        },
        function() {
            console.log("Collision detected!");
        }
    )
);
```

### Ray casting

```javascript
// Create ray
const ray = new BABYLON.Ray(
    new BABYLON.Vector3(0, 0, 0),
    new BABYLON.Vector3(0, 0, 1),
    100
);

// Cast ray
const hit = scene.pickWithRay(ray);

if (hit.hit) {
    console.log("Hit:", hit.pickedMesh.name);
    console.log("Distance:", hit.distance);
    console.log("Point:", hit.pickedPoint);
}
```

## GUI

### 2D GUI

```javascript
import { AdvancedDynamicTexture, Button } from '@babylonjs/gui';

// Create fullscreen UI
const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

// Button
const button = BABYLON.GUI.Button.CreateSimpleButton("button", "Click Me");
button.width = "150px";
button.height = "40px";
button.color = "white";
button.background = "green";
button.onPointerClickObservable.add(() => {
    console.log("Button clicked!");
});

advancedTexture.addControl(button);

// Text
const text = new BABYLON.GUI.TextBlock();
text.text = "Score: 0";
text.color = "white";
text.fontSize = 24;
advancedTexture.addControl(text);
```

### 3D GUI

```javascript
// Create 3D UI manager
const manager = new BABYLON.GUI.GUI3DManager(scene);

// Holographic button
const button3D = new BABYLON.GUI.HolographicButton("button");
manager.addControl(button3D);
button3D.position = new BABYLON.Vector3(0, 2, 0);
button3D.text = "Press Me";
```

## Loading Models

### glTF/GLB models

```javascript
BABYLON.SceneLoader.ImportMesh(
    "",
    "models/",
    "character.glb",
    scene,
    function(meshes) {
        const character = meshes[0];
        character.position = new BABYLON.Vector3(0, 0, 0);
        character.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
    }
);
```

### Async loading

```javascript
const loadModel = async () => {
    const result = await BABYLON.SceneLoader.ImportMeshAsync(
        "",
        "models/",
        "car.glb",
        scene
    );
    
    const car = result.meshes[0];
    car.position.y = 1;
};

loadModel();
```

## Audio

### Background music

```javascript
const music = new BABYLON.Sound(
    "music",
    "sounds/background.mp3",
    scene,
    null,
    {
        loop: true,
        autoplay: true,
        volume: 0.5
    }
);
```

### 3D spatial audio

```javascript
const sound = new BABYLON.Sound(
    "sound",
    "sounds/effect.wav",
    scene,
    null,
    {
        spatialSound: true,
        maxDistance: 100
    }
);

sound.attachToMesh(mesh);
sound.play();
```

## VR/XR Support

### WebXR

```javascript
const createXRExperience = async () => {
    const xr = await scene.createDefaultXRExperienceAsync({
        floorMeshes: [ground]
    });
    
    return xr;
};

createXRExperience();
```

## Optimization

### Performance tips

```javascript
// Octree for large scenes
scene.createOrUpdateSelectionOctree();

// LOD (Level of Detail)
const sphereHigh = BABYLON.MeshBuilder.CreateSphere("high", { segments: 64 }, scene);
const sphereMed = BABYLON.MeshBuilder.CreateSphere("med", { segments: 32 }, scene);
const sphereLow = BABYLON.MeshBuilder.CreateSphere("low", { segments: 16 }, scene);

sphereHigh.addLODLevel(20, sphereMed);
sphereHigh.addLODLevel(50, sphereLow);
sphereHigh.addLODLevel(100, null);

// Frustum culling
camera.minZ = 0.1;
camera.maxZ = 1000;

// Freeze inactive meshes
mesh.freezeWorldMatrix();

// Merge meshes
const merged = BABYLON.Mesh.MergeMeshes([mesh1, mesh2, mesh3]);
```

## Debugging

### Inspector

```javascript
// Show inspector
scene.debugLayer.show();

// Hide inspector
scene.debugLayer.hide();
```

### Performance monitoring

```javascript
// Show FPS
scene.debugLayer.show({
    embedMode: true
});

// Console logging
console.log("FPS:", engine.getFps());
console.log("Active meshes:", scene.getActiveMeshes().length);
```

## Real-World Examples

### Simple game loop

```typescript
class SimpleGame {
    private score: number = 0;
    
    createScene(): Scene {
        const scene = new Scene(this.engine);
        
        // Setup scene
        this.setupCamera(scene);
        this.setupLights(scene);
        this.setupPlayer(scene);
        this.setupEnemies(scene);
        
        // Game loop
        scene.onBeforeRenderObservable.add(() => {
            this.update();
        });
        
        return scene;
    }
    
    update(): void {
        // Update game logic
        this.checkCollisions();
        this.updateScore();
    }
}
```

## Resources

- [Babylon.js official site](https://www.babylonjs.com/)
- [Documentation](https://doc.babylonjs.com/)
- [Playground](https://playground.babylonjs.com/)
- [Forum](https://forum.babylonjs.com/)
- [GitHub](https://github.com/BabylonJS/Babylon.js)
- [YouTube channel](https://www.youtube.com/c/BabylonJS)

## Next Steps

- Complete Babylon.js tutorials
- Build 3D projects
- Learn advanced materials
- Study physics simulation
- Explore XR development
- Join community
- Contribute to Babylon.js
- Create portfolio projects
