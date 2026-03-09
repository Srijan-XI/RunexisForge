# LibGDX

## Introduction

## What is LibGDX?

LibGDX is a free, open-source, cross-platform Java game development framework that allows developers to write code once and deploy to Windows, Linux, macOS, Android, iOS, and web browsers. It provides a comprehensive API for graphics, audio, input handling, and more, with a focus on performance and flexibility.

## Why LibGDX?

- Cross-platform (Desktop, Android, iOS, Web)
- Written in Java (also works with Kotlin, Scala)
- High performance
- OpenGL/WebGL rendering
- Extensive tooling
- Active community
- Well-documented
- Battle-tested (used in many commercial games)
- Free and open-source
- Scene2D UI framework

## Prerequisites

- Java Development Kit (JDK) 8+
- Basic Java knowledge
- IDE (IntelliJ IDEA, Eclipse, or Android Studio)
- Gradle (included in setup)

## Installation

### Using gdx-setup

```bash
# Download gdx-setup.jar
wget https://libgdx.com/assets/downloads/legacy_setup/gdx-setup_latest.jar

# Run setup
java -jar gdx-setup.jar

# Fill in:
# - Name: MyGame
# - Package: com.mygame
# - Game class: MyGame
# - Destination: /path/to/project
# - Android SDK: /path/to/android/sdk

# Select platforms:
# ☑ Desktop
# ☑ Android
# ☑ iOS
# ☑ HTML

# Click "Generate"
```

### Project Structure

```
MyGame/
├── core/                 # Game logic (shared)
│   └── src/
│       └── com/mygame/
│           └── MyGame.java
├── desktop/             # Desktop launcher
├── android/             # Android launcher
├── ios/                 # iOS launcher (RoboVM)
├── html/                # GWT web launcher
└── build.gradle         # Gradle build file
```

## Basic Game Structure

### Main Game Class

```java
package com.mygame;

import com.badlogic.gdx.ApplicationAdapter;
import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.graphics.GL20;
import com.badlogic.gdx.graphics.Texture;
import com.badlogic.gdx.graphics.g2d.SpriteBatch;

public class MyGame extends ApplicationAdapter {
    SpriteBatch batch;
    Texture img;
    
    @Override
    public void create() {
        // Initialize
        batch = new SpriteBatch();
        img = new Texture("badlogic.jpg");
    }
    
    @Override
    public void render() {
        // Clear screen
        Gdx.gl.glClearColor(0, 0, 0, 1);
        Gdx.gl.glClear(GL20.GL_COLOR_BUFFER_BIT);
        
        // Draw
        batch.begin();
        batch.draw(img, 0, 0);
        batch.end();
    }
    
    @Override
    public void dispose() {
        // Cleanup
        batch.dispose();
        img.dispose();
    }
}
```

### Using Game Screens

```java
import com.badlogic.gdx.Game;
import com.badlogic.gdx.Screen;

public class MyGame extends Game {
    @Override
    public void create() {
        setScreen(new MenuScreen(this));
    }
}

public class MenuScreen implements Screen {
    private MyGame game;
    
    public MenuScreen(MyGame game) {
        this.game = game;
    }
    
    @Override
    public void show() {
        // Initialize screen
    }
    
    @Override
    public void render(float delta) {
        // Render screen
    }
    
    @Override
    public void dispose() {
        // Cleanup
    }
    
    // Other Screen methods...
    @Override public void resize(int width, int height) {}
    @Override public void pause() {}
    @Override public void resume() {}
    @Override public void hide() {}
}
```

## Graphics

### Sprite Batch

```java
SpriteBatch batch = new SpriteBatch();
Texture texture = new Texture("sprite.png");
Sprite sprite = new Sprite(texture);

sprite.setPosition(100, 100);
sprite.setSize(64, 64);
sprite.setRotation(45);

batch.begin();
sprite.draw(batch);
batch.end();
```

### Shape Rendering

```java
ShapeRenderer shapeRenderer = new ShapeRenderer();

shapeRenderer.begin(ShapeType.Filled);
shapeRenderer.setColor(Color.RED);
shapeRenderer.circle(100, 100, 50);
shapeRenderer.rect(200, 200, 100, 100);
shapeRenderer.end();
```

### Camera

```java
OrthographicCamera camera = new OrthographicCamera();
camera.setToOrtho(false, 800, 600);

batch.setProjectionMatrix(camera.combined);

// Update camera
camera.position.set(player.x, player.y, 0);
camera.update();
```

## Input Handling

### Keyboard

```java
@Override
public void render() {
    if (Gdx.input.isKeyPressed(Input.Keys.LEFT)) {
        player.x -= 5;
    }
    if (Gdx.input.isKeyPressed(Input.Keys.RIGHT)) {
        player.x += 5
;
    }
    if (Gdx.input.isKeyJustPressed(Input.Keys.SPACE)) {
        player.jump();
    }
}
```

### Mouse/Touch

```java
if (Gdx.input.isTouched()) {
    int x = Gdx.input.getX();
    int y = Gdx.input.getY();
    
    // Convert screen to world coordinates
    Vector3 touchPos = new Vector3(x, y, 0);
    camera.unproject(touchPos);
}

// Input processor
Gdx.input.setInputProcessor(new InputAdapter() {
    @Override
    public boolean touchDown(int screenX, int screenY, int pointer, int button) {
        System.out.println("Touch at: " + screenX + ", " + screenY);
        return true;
    }
});
```

## Audio

### Sound Effects

```java
Sound sound = Gdx.audio.newSound(Gdx.files.internal("jump.wav"));
long id = sound.play(1.0f);  // Volume
sound.setLooping(id, false);
sound.setPitch(id, 1.0f);
```

### Music

```java
Music music = Gdx.audio.newMusic(Gdx.files.internal("music.mp3"));
music.setLooping(true);
music.setVolume(0.5f);
music.play();
```

## Physics (Box2D)

### Setup

```java
World world = new World(new Vector2(0, -10), true);

// Create body
BodyDef bodyDef = new BodyDef();
bodyDef.type = BodyDef.BodyType.DynamicBody;
bodyDef.position.set(100, 300);

Body body = world.createBody(bodyDef);

// Create fixture
PolygonShape box = new PolygonShape();
box.setAsBox(50, 50);

FixtureDef fixtureDef = new FixtureDef();
fixtureDef.shape = box;
fixtureDef.density = 1.0f;
fixtureDef.friction = 0.3f;
fixtureDef.restitution = 0.6f;

body.createFixture(fixtureDef);
box.dispose();

// Update world
world.step(1/60f, 6, 2);
```

## Scene2D UI

### Creating UI

```java
Stage stage = new Stage(new ScreenViewport());
Gdx.input.setInputProcessor(stage);

// Table layout
Table table = new Table();
table.setFillParent(true);
stage.addActor(table);

// Button
TextButton button = new TextButton("Start Game", skin);
button.addListener(new ClickListener() {
    @Override
    public void clicked(InputEvent event, float x, float y) {
        System.out.println("Button clicked!");
    }
});

table.add(button).width(200).height(50).pad(10);

// Render stage
stage.act(delta);
stage.draw();
```

### Skins

```java
Skin skin = new Skin(Gdx.files.internal("uiskin.json"));

Label label = new Label("Score: 0", skin);
TextField textField = new TextField("", skin);
CheckBox checkBox = new CheckBox("Sound", skin);
```

## Animations

### Texture Atlas

```java
TextureAtlas atlas = new TextureAtlas("sprites.atlas");
Animation<TextureRegion> animation = new Animation<>(0.1f, 
    atlas.findRegions("walk"), Animation.PlayMode.LOOP);

float stateTime = 0;

@Override
public void render(float delta) {
    stateTime += delta;
    TextureRegion currentFrame = animation.getKeyFrame(stateTime);
    batch.draw(currentFrame, x, y);
}
```

## Asset Management

```java
AssetManager assets = new AssetManager();

// Load assets
assets.load("badlogic.jpg", Texture.class);
assets.load("music.mp3", Music.class);
assets.finishLoading();

// Get assets
Texture texture = assets.get("badlogic.jpg", Texture.class);

// Dispose
assets.dispose();
```

## Tiled Maps

```java
TiledMap map = new TmxMapLoader().load("level1.tmx");
OrthogonalTiledMapRenderer renderer = new OrthogonalTiledMapRenderer(map);

@Override
public void render(float delta) {
    camera.update();
    renderer.setView(camera);
    renderer.render();
}
```

## Particle Effects

```java
ParticleEffect effect = new ParticleEffect();
effect.load(Gdx.files.internal("explosion.p"), Gdx.files.internal(""));
effect.setPosition(x, y);
effect.start();

@Override
public void render(float delta) {
    effect.draw(batch, delta);
    
    if (effect.isComplete()) {
        effect.reset();
    }
}
```

## Building for Platforms

### Desktop

```bash
./gradlew desktop:run
./gradlew desktop:dist
```

### Android

```bash
./gradlew android:assembleDebug
./gradlew android:installDebug
```

### iOS

```bash
./gradlew ios:launchIPhoneSimulator
./gradlew ios:createIPA
```

### HTML

```bash
./gradlew html:superDev
# Open http://localhost:8080/html
```

## Best Practices

### Dispose Pattern

```java
@Override
public void dispose() {
    batch.dispose();
    texture.dispose();
    sound.dispose();
    music.dispose();
    stage.dispose();
}
```

### Object Pooling

```java
Array<Bullet> bullets = new Array<>();
Pool<Bullet> bulletPool = new Pool<Bullet>() {
    @Override
    protected Bullet newObject() {
        return new Bullet();
    }
};

Bullet bullet = bulletPool.obtain();
// Use bullet
bulletPool.free(bullet);
```

## Resources

- [LibGDX Website](https://libgdx.com/)
- [Wiki](https://libgdx.com/wiki/)
- [JavaDoc](https://libgdx.com/dev/api/)
- [Discord](https://discord.gg/6pgDK9F)
- [GitHub](https://github.com/libgdx/libgdx)
- [Examples](https://github.com/libgdx/libgdx-demo-superjumper)

## Next Steps

- Complete tutorials
- Study Java/Kotlin
- Build 2D games
- Learn Box2D physics
- Explore 3D rendering
- Publish to stores
- Join community
