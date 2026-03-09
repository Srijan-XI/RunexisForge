# Phaser

## Introduction

## What is Phaser?

Phaser is a fast, free, and open-source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Created by Richard Davey (Photon Storm), Phaser provides a complete set of tools for building 2D games, including sprite management, physics engines, animations, audio, input handling, and much more.

## Why Phaser?

- Fast and performant 2D rendering
- WebGL and Canvas support
- Built-in physics engines (Arcade, Matter.js)
- Comprehensive sprite and animation system
- Tilemap support
- Audio management
- Input handling (keyboard, mouse, touch, gamepad)
- Active community and ecosystem
- Extensive plugin system
- TypeScript support
- Mobile-friendly

## Learning Path

1. Learn JavaScript/TypeScript fundamentals
2. Understand HTML5 Canvas basics
3. Study game development concepts
4. Install and setup Phaser
5. Build simple games
6. Master physics and animations
7. Deploy and optimize games

## User Guide

## Prerequisites

- Basic JavaScript or TypeScript knowledge
- Understanding of HTML/CSS
- Code editor (VS Code recommended)
- Modern web browser
- Node.js and npm (for development)

Verify Node.js installation:

```bash
node --version
npm --version
```

## Installation

### Using npm

```bash
# Create project directory
mkdir my-phaser-game
cd my-phaser-game

# Initialize npm project
npm init -y

# Install Phaser
npm install phaser

# Install TypeScript (optional)
npm install --save-dev typescript
```

### Using CDN

```html
<!DOCTYPE html>
<html>
<head>
    <title>Phaser Game</title>
    <script src="https://cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser.js"></script>
</head>
<body>
    <script src="game.js"></script>
</body>
</html>
```

### Project template

```bash
# Using create-phaser-app
npx create-phaser-app my-game

# Or clone Phaser 3 template
git clone https://github.com/photonstorm/phaser3-typescript-project-template.git my-game
cd my-game
npm install
```

## Basic Game Setup

### Simple Phaser game

```javascript
// game.js
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload() {
    // Load assets
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
}

function create() {
    // Create game objects
    this.add.image(400, 300, 'sky');
}

function update() {
    // Game loop logic
}
```

### TypeScript version

```typescript
// game.ts
import Phaser from 'phaser';

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    preload(): void {
        this.load.image('sky', 'assets/sky.png');
    }

    create(): void {
        this.add.image(400, 300, 'sky');
    }

    update(): void {
        // Game loop
    }
}

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: GameScene
};

const game = new Phaser.Game(config);
```

## Game Configuration

### Config options

```javascript
const config = {
    type: Phaser.AUTO,              // WebGL or Canvas
    width: 800,                      // Game width
    height: 600,                     // Game height
    backgroundColor: '#2d2d2d',      // Background color
    parent: 'game-container',        // DOM element ID
    pixelArt: false,                 // Pixel art mode
    antialias: true,                 // Anti-aliasing
    roundPixels: false,              // Round pixel positions
    
    physics: {
        default: 'arcade',           // Physics system
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    
    scale: {
        mode: Phaser.Scale.FIT,      // Scale mode
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    
    scene: [BootScene, MenuScene, GameScene]
};
```

## Scenes

### Scene structure

```typescript
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    init(data: any): void {
        // Initialize scene with data
    }

    preload(): void {
        // Load assets
    }

    create(): void {
        // Create game objects
    }

    update(time: number, delta: number): void {
        // Game loop (60 FPS)
    }
}
```

### Multiple scenes

```typescript
// Boot scene
class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload(): void {
        // Load initial assets
        this.load.image('logo', 'assets/logo.png');
    }

    create(): void {
        // Switch to menu
        this.scene.start('MenuScene');
    }
}

// Menu scene
class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create(): void {
        const startButton = this.add.text(400, 300, 'Start Game', {
            fontSize: '32px',
            color: '#fff'
        }).setInteractive();

        startButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });
    }
}

// Game config
const config = {
    scene: [BootScene, MenuScene, GameScene]
};
```

## Sprites and Images

### Adding images

```javascript
create() {
    // Static image
    this.add.image(400, 300, 'sky');
    
    // Image with origin
    this.add.image(0, 0, 'logo').setOrigin(0, 0);
    
    // Tiled sprite
    this.add.tileSprite(400, 300, 800, 600, 'stars');
}
```

### Creating sprites

```javascript
preload() {
    this.load.image('player', 'assets/player.png');
}

create() {
    // Create sprite
    const player = this.physics.add.sprite(100, 450, 'player');
    
    // Set properties
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    
    // Scale
    player.setScale(2);
    
    // Tint
    player.setTint(0xff0000);
}
```

### Sprite sheets

```javascript
preload() {
    this.load.spritesheet('dude', 'assets/dude.png', {
        frameWidth: 32,
        frameHeight: 48
    });
}

create() {
    const player = this.physics.add.sprite(100, 450, 'dude');
    
    // Create animations
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });
    
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
    
    // Play animation
    player.anims.play('left', true);
}
```

## Physics

### Arcade Physics

```javascript
const config = {
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    }
};

create() {
    // Create physics sprite
    const player = this.physics.add.sprite(100, 450, 'player');
    
    // Set properties
    player.setVelocityX(100);
    player.setVelocityY(-200);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    
    // Create static group
    const platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    
    // Add collision
    this.physics.add.collider(player, platforms);
}
```

### Matter.js Physics

```javascript
const config = {
    physics: {
        default: 'matter',
        matter: {
            gravity: { y: 1 },
            debug: true
        }
    }
};

create() {
    // Create Matter sprite
    const rect = this.matter.add.rectangle(400, 200, 80, 80);
    
    // Create compound bodies
    const circle = this.matter.add.circle(300, 200, 40);
    
    // Set properties
    this.matter.body.setVelocity(rect, { x: 2, y: 0 });
    this.matter.body.setAngularVelocity(rect, 0.1);
}
```

## Input Handling

### Keyboard input

```javascript
create() {
    // Create cursor keys
    this.cursors = this.input.keyboard.createCursorKeys();
    
    // Custom keys
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
}

update() {
    if (this.cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    }
    else if (this.cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
    }
    else {
        player.setVelocityX(0);
        player.anims.play('turn');
    }
    
    if (this.cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }
    
    if (this.spaceKey.isDown) {
        // Fire weapon
    }
}
```

### Mouse/Touch input

```javascript
create() {
    // Click anywhere
    this.input.on('pointerdown', (pointer) => {
        console.log(pointer.x, pointer.y);
    });
    
    // Interactive object
    const button = this.add.sprite(400, 300, 'button').setInteractive();
    
    button.on('pointerdown', () => {
        console.log('Button clicked!');
    });
    
    button.on('pointerover', () => {
        button.setTint(0x44ff44);
    });
    
    button.on('pointerout', () => {
        button.clearTint();
    });
}
```

### Gamepad support

```javascript
create() {
    this.input.gamepad.once('connected', (pad) => {
        this.gamepad = pad;
    });
}

update() {
    if (this.gamepad) {
        const leftStick = this.gamepad.leftStick;
        
        if (leftStick.x < -0.5) {
            player.setVelocityX(-160);
        }
        else if (leftStick.x > 0.5) {
            player.setVelocityX(160);
        }
    }
}
```

## Audio

### Loading and playing sounds

```javascript
preload() {
    this.load.audio('music', 'assets/music.mp3');
    this.load.audio('jump', 'assets/jump.wav');
    this.load.audio('coin', 'assets/coin.wav');
}

create() {
    // Background music
    this.music = this.sound.add('music', { loop: true, volume: 0.5 });
    this.music.play();
    
    // Sound effects
    this.jumpSound = this.sound.add('jump');
    this.coinSound = this.sound.add('coin');
}

collectCoin(player, coin) {
    coin.disableBody(true, true);
    this.coinSound.play();
}
```

### Audio sprites

```javascript
preload() {
    this.load.audio('sfx', 'assets/sound-effects.mp3');
    this.load.json('sfx-data', 'assets/sound-effects.json');
}

create() {
    const sfxData = this.cache.json.get('sfx-data');
    this.sfx = this.sound.addAudioSprite('sfx', sfxData);
    
    // Play specific sound
    this.sfx.play('jump');
    this.sfx.play('coin');
}
```

## Tilemaps

### Creating tilemaps

```javascript
preload() {
    this.load.image('tiles', 'assets/tileset.png');
    this.load.tilemapTiledJSON('map', 'assets/level1.json');
}

create() {
    // Create tilemap
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('tileset', 'tiles');
    
    // Create layers
    const groundLayer = map.createLayer('Ground', tileset, 0, 0);
    const platformsLayer = map.createLayer('Platforms', tileset, 0, 0);
    
    // Set collisions
    groundLayer.setCollisionByProperty({ collides: true });
    this.physics.add.collider(player, groundLayer);
}
```

## Groups and Object Pools

### Creating groups

```javascript
create() {
    // Create group
    this.stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });
    
    // Set properties for all
    this.stars.children.iterate((child) => {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
    
    // Collision
    this.physics.add.collider(this.stars, platforms);
    this.physics.add.overlap(player, this.stars, collectStar, null, this);
}

function collectStar(player, star) {
    star.disableBody(true, true);
    score += 10;
}
```

## Text and UI

### Adding text

```javascript
create() {
    // Simple text
    this.add.text(16, 16, 'Score: 0', {
        fontSize: '32px',
        color: '#fff'
    });
    
    // Styled text
    const scoreText = this.add.text(400, 50, 'Score: 0', {
        fontFamily: 'Arial',
        fontSize: 48,
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 6,
        align: 'center'
    }).setOrigin(0.5);
    
    // Dynamic text
    this.scoreText = this.add.text(16, 16, '', { fontSize: '32px', color: '#fff' });
    this.updateScore(0);
}

updateScore(score) {
    this.scoreText.setText('Score: ' + score);
}
```

### Bitmap text

```javascript
preload() {
    this.load.bitmapFont('arcade', 'assets/arcade.png', 'assets/arcade.xml');
}

create() {
    this.add.bitmapText(100, 100, 'arcade', 'GAME OVER', 64);
}
```

## Particles

### Particle emitters

```javascript
preload() {
    this.load.image('particle', 'assets/particle.png');
}

create() {
    // Create emitter
    const particles = this.add.particles('particle');
    
    const emitter = particles.createEmitter({
        speed: 100,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD'
    });
    
    // Attach to sprite
    emitter.startFollow(player);
}
```

## Tweens and Animations

### Tweens

```javascript
create() {
    const sprite = this.add.sprite(400, 300, 'logo');
    
    // Simple tween
    this.tweens.add({
        targets: sprite,
        y: 450,
        duration: 2000,
        ease: 'Power2',
        yoyo: true,
        repeat: -1
    });
    
    // Complex tween
    this.tweens.add({
        targets: sprite,
        props: {
            x: { value: 600, duration: 3000, ease: 'Power2' },
            y: { value: 500, duration: 1500, ease: 'Bounce.easeOut' }
        },
        delay: 1000,
        onComplete: () => {
            console.log('Tween complete!');
        }
    });
}
```

## Camera

### Camera controls

```javascript
create() {
    // Set camera bounds
    this.cameras.main.setBounds(0, 0, 1920, 1080);
    
    // Follow player
    this.cameras.main.startFollow(player);
    
    // Smooth follow
    this.cameras.main.startFollow(player, true, 0.05, 0.05);
    
    // Camera shake
    this.cameras.main.shake(500);
    
    // Camera flash
    this.cameras.main.flash(250);
    
    // Camera fade
    this.cameras.main.fade(1000);
    
    // Zoom
    this.cameras.main.setZoom(2);
}
```

## Plugin System

### Using plugins

```javascript
// Install plugin
npm install phaser3-rex-plugins

// Import
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';

const config = {
    plugins: {
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

// Use in scene
create() {
    const dialog = this.rexUI.add.dialog({
        x: 400,
        y: 300,
        width: 500,
        height: 300
    });
}
```

## Build and Deployment

### Webpack setup

```javascript
// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ],
    devServer: {
        static: './dist',
        hot: true
    }
};
```

### Build commands

```json
{
  "scripts": {
    "start": "webpack serve --mode development",
    "build": "webpack --mode production"
  }
}
```

## Performance Optimization

### Best practices

```javascript
// Use object pooling
create() {
    this.bullets = this.physics.add.group({
        defaultKey: 'bullet',
        maxSize: 30
    });
}

fireBullet() {
    const bullet = this.bullets.get(player.x, player.y);
    if (bullet) {
        bullet.setActive(true);
        bullet.setVisible(true);
        bullet.setVelocityY(-300);
    }
}

// Disable unnecessary objects
enemy.disableBody(true, true);

// Use containers
const container = this.add.container(x, y);
container.add([sprite1, sprite2, sprite3]);

// Limit update logic
update() {
    if (player.active) {
        // Player logic only when active
    }
}
```

## Mobile Development

### Responsive scaling

```javascript
const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'game',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    }
};
```

### Touch controls

```javascript
create() {
    // Virtual joystick
    this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
        x: 100,
        y: 500,
        radius: 50,
        base: this.add.circle(0, 0, 50, 0x888888),
        thumb: this.add.circle(0, 0, 25, 0xcccccc)
    });
}

update() {
    const cursorKeys = this.joyStick.createCursorKeys();
    
    if (cursorKeys.left.isDown) {
        player.setVelocityX(-160);
    }
}
```

## Debugging

### Debug mode

```javascript
const config = {
    physics: {
        arcade: {
            debug: true  // Show physics bodies
        }
    }
};

// Debug draw
this.physics.world.createDebugGraphic();

// Console logging
create() {
    console.log('Scene created');
    console.log(this.sys.game.config);
}
```

## Common Use Cases

### Platformer game

```javascript
class PlatformerScene extends Phaser.Scene {
    create() {
        // Create platforms
        const platforms = this.physics.add.staticGroup();
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');
        
        // Create player
        this.player = this.physics.add.sprite(100, 450, 'dude');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        
        // Animations
        this.createAnimations();
        
        // Collisions
        this.physics.add.collider(this.player, platforms);
        
        // Input
        this.cursors = this.input.keyboard.createCursorKeys();
    }
    
    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }
        
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }
}
```

## Troubleshooting

### Common issues

```javascript
// Assets not loading
preload() {
    // Check path is correct
    this.load.image('player', 'assets/player.png');
    
    // Use load events
    this.load.on('complete', () => {
        console.log('All assets loaded');
    });
}

// Physics not working
// Ensure physics is enabled
const config = {
    physics: {
        default: 'arcade'
    }
};

// Sprites not visible
create() {
    // Check z-index / depth
    sprite.setDepth(10);
    
    // Check if in bounds
    console.log(sprite.x, sprite.y);
}
```

## Resources

- [Phaser official site](https://phaser.io/)
- [Phaser 3 documentation](https://photonstorm.github.io/phaser3-docs/)
- [Phaser examples](https://phaser.io/examples)
- [Phaser Discord](https://discord.gg/phaser)
- [Phaser forum](https://phaser.discourse.group/)
- [Phaser GitHub](https://github.com/photonstorm/phaser)

## Next Steps

- Complete Phaser tutorials
- Build small games (Flappy Bird, Snake, etc.)
- Learn advanced physics
- Study game design patterns
- Explore Phaser plugins
- Join game jams
- Publish games online
- Contribute to Phaser community
