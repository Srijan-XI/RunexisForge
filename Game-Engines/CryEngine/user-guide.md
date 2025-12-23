# CryEngine User Guide

Quick start guide for CryEngine game development.

---

## Installation

### 1. Download CryEngine Launcher
1. Visit [cryengine.com](https://www.cryengine.com/)
2. Create account or log in
3. Download CryEngine Launcher
4. Install launcher on Windows 10/11

### 2. Install Engine
```
1. Open CryEngine Launcher
2. Select engine version (latest recommended)
3. Click "Download & Install"
4. Wait for installation to complete (~15-20 GB)
```

### 3. Prerequisites
- Visual Studio 2019 or 2022 (Community Edition works)
- Windows SDK
- .NET Framework 4.7.2+

---

## Creating Your First Project

### New Project Setup
```
1. Launch CryEngine Launcher
2. Click "Create Project"
3. Choose template (First Person, Third Person, Empty, etc.)
4. Set project name and location
5. Click "Create"
```

### Opening in Editor
```
1. Project opens in Sandbox Editor automatically
2. Or: Right-click project → "Launch Editor"
```

---

## Editor Overview

### Main Interface Components

**Viewport** - 3D scene view
- WASD: Navigate
- Right Mouse: Look around
- Mouse Wheel: Zoom
- Shift: Speed modifier

**Rollup Bar** - Object properties and tools
**Asset Browser** - Project assets
**Console** - Command input and output
**Flow Graph** - Visual scripting
**Level Explorer** - Scene hierarchy

---

## Basic Workflows

### Creating a Level

```
1. File → New Level
2. Choose terrain size
3. Click OK
4. Level opens in editor
```

### Adding Objects

```
1. Rollup Bar → Objects → Entity
2. Select entity type
3. Click in viewport to place
4. Adjust properties in Rollup Bar
```

### Importing Assets

**3D Models (FBX)**:
```
1. Place FBX in Assets folder
2. Right-click → "Import to Engine"
3. Configure import settings
4. Click Import
```

**Textures**:
```
1. Place images in Assets/Textures
2. Auto-detected by engine
3. Use in Material Editor
```

---

## Scripting

### C++ Programming

**Create New Entity**:
```cpp
// MyEntity.h
#pragma once

#include <CryEntitySystem/IEntityComponent.h>

class CMyEntityComponent final : public IEntityComponent
{
public:
    CMyEntityComponent() = default;
    virtual ~CMyEntityComponent() = default;
    
    // IEntityComponent
    virtual void Initialize() override;
    virtual void ProcessEvent(const SEntityEvent& event) override;
    
    static void ReflectType(Schematyc::CTypeDesc<CMyEntityComponent>& desc);
    
private:
    float m_speed = 5.0f;
};
```

```cpp
// MyEntity.cpp
#include "StdAfx.h"
#include "MyEntity.h"

void CMyEntityComponent::Initialize()
{
    // Initialization code
}

void CMyEntityComponent::ProcessEvent(const SEntityEvent& event)
{
    if (event.event == ENTITY_EVENT_UPDATE)
    {
        // Update logic
    }
}

void CMyEntityComponent::ReflectType(Schematyc::CTypeDesc<CMyEntityComponent>& desc)
{
    desc.SetGUID("{12345678-1234-1234-1234-123456789012}"_cry_guid);
    desc.SetLabel("My Entity Component");
}
```

### Visual Scripting (Schematyc)

```
1. Tools → Schematyc Editor
2. Right-click → Create → Script
3. Add nodes and connections
4. Connect to entities
```

---

## Materials & Shaders

### Creating Material

```
1. Material Editor → File → New Material
2. Set shader (Illum for PBR)
3. Assign textures:
   - Diffuse
   - Normal
   - Specular
   - Height (optional)
4. Save material
```

### Material Properties
```
Shader: Illum (PBR Standard)
- Diffuse Color
- Specular Intensity
- Glossiness
- Normal Strength
- Opacity
```

---

## Lighting

### Types of Lights

**Point Light**:
```
Rollup Bar → Misc → Light → Point Light
- Radius: Light reach
- Diffuse Color: Light color
- Specular Multiplier: Shininess
```

**Spot Light**:
```
Similar to Point Light
- Cone Angle: Spread
- Attenuation Falloff
```

**Environment Probe**:
```
For global illumination
- Cubemap generation
- Affects all objects in range
```

### Time of Day

```
1. View → Open View Pane → Time of Day
2. Adjust sun position
3. Configure sky colors
4. Set atmosphere parameters
```

---

## Terrain

### Creating Terrain

```
1. Terrain → Generate Terrain
2. Set heightmap resolution
3. Set meters per texel
4. Generate
```

### Sculpting Terrain

```
Tools:
- Rise/Lower
- Smooth
- Flatten
- Holes

Brushes:
- Size
- Hardness
- Strength
```

### Terrain Textures

```
1. Terrain → Texture Layers
2. Add layer
3. Assign material
4. Paint with brush
```

---

## Physics

### Physicalize Entity

```cpp
// In entity component
SEntityPhysicalizeParams params;
params.type = PE_RIGID;
params.mass = 10.0f;
GetEntity()->Physicalize(params);
```

### Collision Meshes

```
1. In modeling software, create collision mesh
2. Name with _phys suffix
3. Import with model
4. Engine auto-detects
```

---

## Particle Effects

### Creating Particle System

```
1. Particle Editor
2. File → New Library
3. Add Emitter
4. Configure properties:
   - Particle count
   - Lifetime
   - Size
   - Color
   - Velocity
5. Save
```

### Using in Level

```
1. Place ParticleEffect entity
2. Select particle library
3. Adjust parameters
```

---

## Audio

### Adding Sounds

```
1. Place audio files in Assets/Sounds
2. Audio Controls Editor
3. Create trigger
4. Assign to entity or Flow Graph
```

### 3D Audio

```
Rollup Bar → Sound
- Position-based
- Attenuation settings
- Occlusion support
```

---

## Building Your Game

### Packaging Project

```
1. File → Export to Engine
2. Select platform
3. Configure build settings:
   - Debug/Release
   - Pak files
   - Shaders
4. Build
```

### Command Line Build

```cmd
cd YourProject
WAF configure
WAF build_win_x64_profile
```

---

## Debugging

### Console Commands

```
// Toggle debug info
r_DisplayInfo 1

// Show FPS
r_DisplayInfo 2

// Wireframe mode
r_Wireframe 1

// Physics debug
p_draw_helpers 1

// Reload scripts
#Script.ReloadScript()
```

### Performance Profiling

```
Profiling Tools:
- r_ProfileShaders
- sys_profile
- e_StatObjBufferRenderTasks
```

---

## Best Practices

1. **Organize Assets**: Use clear folder structure
2. **Use Git**: Version control your project
3. **Regular Backups**: Save often, keep backups
4. **Performance**: Profile early and often
5. **Naming Conventions**: Use consistent naming
6. **Comments**: Document complex code
7. **LODs**: Create Level of Detail models
8. **Texture Sizes**: Optimize for target platform

---

## Troubleshooting

### Common Issues

**Editor Won't Launch**:
- Update Graphics Drivers
- Run as Administrator
- Check Windows Event Viewer

**Poor Performance**:
- Lower graphics settings
- Reduce draw distance
- Optimize shaders

**Assets Not Showing**:
- Regenerate Resource Compiler
- Check file paths
- Verify import settings

---

## Resources

- [Official Documentation](https://docs.cryengine.com/)
- [CryEngine YouTube](https://www.youtube.com/user/CrytekOfficial)
- [Community Forums](https://www.cryengine.com/community)
- [CryDev Discord](https://discord.gg/cryengine)

---

**Happy developing! 🎮🚀**
