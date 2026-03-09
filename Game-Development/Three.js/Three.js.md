# Three.js

## Introduction

## What is Three.js?

Three.js is a cross-browser JavaScript library and API used to create and display animated 3D computer graphics in a web browser using WebGL. Created by Ricardo Cabello (Mr.doob), Three.js makes WebGL accessible by providing a high-level abstraction for working with 3D graphics without requiring deep knowledge of WebGL itself.

## Why Three.js?

- Easy to learn and use
- Cross-browser compatibility
- Extensive geometry library
- Rich material system
- Animation support
- Loaders for various 3D formats
- Post-processing effects
- VR/AR support
- Large community
- Well-documented
- Active development

## Prerequisites

- JavaScript fundamentals
- Basic HTML/CSS
- Understanding of 3D concepts
- Code editor
- Modern web browser

## Installation

### CDN

```html
<!DOCTYPE html>
<html>
<head>
    <title>Three.js Scene</title>
    <style>
        body { margin: 0; }
        canvas { display: block; }
    </style>
</head>
<body>
    <script src="https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js"></script>
    <script src="app.js"></script>
</body>
</html>
```

### npm

```bash
npm install three
```

```javascript
import * as THREE from 'three';
```

## Basic Scene

```javascript
// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Geometry
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    
    renderer.render(scene, camera);
}

animate();
```

## Geometries

```javascript
// Box
const box = new THREE.BoxGeometry(1, 1, 1);

// Sphere
const sphere = new THREE.SphereGeometry(1, 32, 32);

// Cylinder
const cylinder = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);

// Plane
const plane = new THREE.PlaneGeometry(5, 5);

// Torus
const torus = new THREE.TorusGeometry(1, 0.4, 16, 100);

// Custom geometry
const customGeo = new THREE.BufferGeometry();
const vertices = new Float32Array([
    -1.0, -1.0,  1.0,
     1.0, -1.0,  1.0,
     1.0,  1.0,  1.0
]);
customGeo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
```

## Materials

```javascript
// Basic
const basic = new THREE.MeshBasicMaterial({ color: 0xff0000 });

// Lambert (affected by lights)
const lambert = new THREE.MeshLambertMaterial({ color: 0x00ff00 });

// Phong (shiny)
const phong = new THREE.MeshPhongMaterial({
    color: 0x0000ff,
    shininess: 100
});

// Standard (PBR)
const standard = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.5,
    metalness: 0.5
});

// With texture
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('texture.jpg');
const texturedMaterial = new THREE.MeshBasicMaterial({ map: texture });
```

## Lighting

```javascript
// Ambient light
const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
scene.add(ambientLight);

// Directional light (sun)
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

// Point light (bulb)
const pointLight = new THREE.PointLight(0xff0000, 1, 100);
pointLight.position.set(0, 5, 0);
scene.add(pointLight);

// Spot light
const spotLight = new THREE.SpotLight(0xffffff, 1);
spotLight.position.set(0, 10, 0);
spotLight.castShadow = true;
scene.add(spotLight);
```

## Cameras

```javascript
// Perspective camera
const perspCamera = new THREE.PerspectiveCamera(
    75,                                      // FOV
    window.innerWidth / window.innerHeight,  // Aspect
    0.1,                                     // Near
    1000                                     // Far
);

// Orthographic camera
const orthoCamera = new THREE.OrthographicCamera(
    -10, 10,  // Left, right
    10, -10,  // Top, bottom
    0.1, 1000 // Near, far
);
```

## Controls

```javascript
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// In animation loop
controls.update();
```

## Loading 3D Models

```javascript
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const loader = new GLTFLoader();
loader.load('model.glb', (gltf) => {
    scene.add(gltf.scene);
});
```

## Shadows

```javascript
// Enable shadows
renderer.shadowMap.enabled = true;

// Light casts shadow
directionalLight.castShadow = true;

// Object casts shadow
cube.castShadow = true;

// Object receives shadow
ground.receiveShadow = true;
```

## Animation

```javascript
const mixer = new THREE.AnimationMixer(model);
const action = mixer.clipAction(gltf.animations[0]);
action.play();

// In animation loop
const clock = new THREE.Clock();
function animate() {
    const delta = clock.getDelta();
    mixer.update(delta);
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
```

## Post-Processing

```javascript
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(new UnrealBloomPass());

// Render with composer
composer.render();
```

## Physics Integration

```javascript
// Using Cannon.js
import CANNON from 'cannon';

const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);

const body = new CANNON.Body({
    mass: 1,
    shape: new CANNON.Box(new CANNON.Vec3(0.5, 0.5, 0.5))
});
world.addBody(body);

// Update
world.step(1/60);
mesh.position.copy(body.position);
mesh.quaternion.copy(body.quaternion);
```

## VR Support

```javascript
import { VRButton } from 'three/examples/jsm/webxr/VRButton';

renderer.xr.enabled = true;
document.body.appendChild(VRButton.createButton(renderer));

renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
});
```

## Resources

- [Three.js docs](https://threejs.org/docs/)
- [Examples](https://threejs.org/examples/)
- [GitHub](https://github.com/mrdoob/three.js)
- [Discourse](https://discourse.threejs.org/)

## Next Steps

- Complete tutorials
- Build 3D projects
- Learn shaders (GLSL)
- Explore VR/AR
- Optimize performance
- Join community
