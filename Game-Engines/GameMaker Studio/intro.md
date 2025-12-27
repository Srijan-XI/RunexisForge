# Introduction to GameMaker Studio

## What is GameMaker Studio?

**GameMaker Studio** (now called **GameMaker**) is a user-friendly game development platform perfect for 2D game creation. It features a drag-and-drop visual interface combined with its own scripting language (GML), making it accessible to beginners while powerful enough for professional developers.

---

## Why Choose GameMaker?

- **👶 Beginner-Friendly**: Visual programming with drag-and-drop
- **📱 Multi-Platform**: Deploy to desktop, mobile, consoles, web
- **⚡ Rapid Development**: Quick prototyping and iteration
- **💰 Successful Games**: Many indie hits made with GameMaker
- **🎨 2D Focused**: Optimized for 2D game development
- **📚 Extensive Resources**: Tutorials, documentation, community

---

## Key Features

- **Visual IDE**: Intuitive drag-and-drop interface
- **GML (GameMaker Language)**: Powerful scripting language
- **Sprite Editor**: Built-in image editor
- **Animation Tools**: Sprite animation timeline
- **Room Editor**: Level design tool
- **Physics**: Box2D integration
- **Particle System**: Visual effects
- **Audio System**: Sound and music management
- **Tile System**: Tile-based level creation

---

## Popular Games Made with GameMaker

1. **Undertale** (2015) - Toby Fox
2. **Hotline Miami** (2012) - Dennaton Games
3. **Hyper Light Drifter** (2016) - Heart Machine
4. **Katana ZERO** (2019) - Askiisoft
5. **Nuclear Throne** (2015) - Vlambeer
6. **Spelunky** (2008) - Derek Yu
7. **Gunpoint** (2013) - Suspicious Developments

---

## GameMaker Language (GML)

**Hello World**:

```gml
// Draw Event
draw_text(x, y, "Hello, World!");
```bash

**Movement**:

```gml
// Step Event
if (keyboard_check(vk_right)) {
    x += 4;
}
if (keyboard_check(vk_left)) {
    x -= 4;
}
if (keyboard_check(vk_up)) {
    y -= 4;
}
if (keyboard_check(vk_down)) {
    y += 4;
}
```bash

**Collision**:

```gml
// Collision with obj_enemy
if (place_meeting(x, y, obj_enemy)) {
    instance_destroy();
}
```bash

---

## Supported Platforms

### Export Targets

- **Windows**: Desktop
- **macOS**: Desktop
- **Linux**: Ubuntu
- **iOS**: Mobile
- **Android**: Mobile
- **PlayStation**: PS4, PS5
- **Xbox**: One, Series X|S
- **Nintendo Switch**
- **HTML5**: Web browsers

---

## Pricing

### GameMaker Studio 2

**Free Tier**:

- Windows & macOS export
- Full IDE features
- Limited to GMS2 branding

**Creator** ($39/year):

- Windows, macOS export
- Remove GMS2 branding

**Developer** ($79/year):

- - iOS, Android, HTML5

**Console** (Contact):

- - PlayStation, Xbox, Switch

---

## Pros & Cons

### Strengths

- ✅ Very beginner-friendly
- ✅ Fast development cycle
- ✅ Great for 2D games
- ✅ Active community
- ✅ Lots of tutorials
- ✅ Proven track record

### Limitations

- ❌ Primarily 2D (limited 3D)
- ❌ Less flexible than code-first engines
- ❌ Paid export for some platforms
- ❌ GML only (no other languages)
- ❌ Less suitable for complex systems

---

## Who Should Use GameMaker?

### Ideal For

- Beginners learning game development
- 2D game developers
- Rapid prototyping
- Indie developers
- Game jams
- Educational purposes

### Not Ideal For

- 3D games
- Projects requiring advanced graphics
- Developers preferring C++/C#
- Open-source requirements

---

## Learning Resources

### Official

- [GameMaker Manual](https://manual.yoyogames.com/)
- [GameMaker YouTube](https://www.youtube.com/c/yoyogames)
- [Official Tutorials](https://gamemaker.io/en/tutorials)

### Community

- [r/gamemaker](https://www.reddit.com/r/gamemaker/)
- [GameMaker Community](https://forum.yoyogames.com/)
- Shaun Spalding YouTube tutorials
- HeartBeast tutorials

---

Ready to create your first game? Check the [User Guide](user-guide.md)!

**Make games, not excuses! 🎮✨**
