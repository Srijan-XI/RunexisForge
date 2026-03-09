# 🎮 Unreal Engine

> *"Unreal Engine: Where Imagination Meets Reality"*

---

## Table of Contents

1. [Introduction](#introduction)
2. [Key Features](#key-features)
3. [What is Unreal Engine Used For?](#what-is-unreal-engine-used-for)
4. [Advantages](#advantages)
5. [Disadvantages](#disadvantages)
6. [Unreal vs Unity vs Godot](#unreal-vs-unity-vs-godot)
7. [Who Should Use Unreal Engine?](#who-should-use-unreal-engine)
8. [Learning Resources](#learning-resources)
9. [User Guide](#user-guide)
    - [Installation](#installation)
    - [Editor Overview](#editor-overview)
    - [Actors & Components](#actors--components)
    - [Blueprints Visual Scripting](#blueprints-visual-scripting)
    - [C++ Basics in Unreal](#c-basics-in-unreal)
    - [Physics & Collision](#physics--collision)
    - [Input System](#input-system)
    - [Character & Movement](#character--movement)
    - [Materials & Shaders](#materials--shaders)
    - [UI with UMG](#ui-with-umg)
    - [Audio (MetaSounds)](#audio-metasounds)
    - [Nanite & Lumen (UE5)](#nanite--lumen-ue5)
    - [Packaging & Shipping](#packaging--shipping)
    - [Best Practices](#best-practices)

---

## Introduction

**Unreal Engine** (UE) is a high-performance real-time 3D engine developed by **Epic Games**. First released in 1998 as part of the game *Unreal*, the engine has evolved through five major versions, with **Unreal Engine 5** (released 2022) representing a landmark leap in real-time rendering quality — introducing **Nanite** (virtualized geometry) and **Lumen** (fully dynamic global illumination).

While Unity dominates mobile and indie, Unreal Engine rules the **AAA game industry** and high-fidelity **film/virtual production** pipelines. Games like Fortnite, The Matrix Awakens, and virtually every major AAA title benchmark against UE5 rendering.

### History & Context

| Attribute | Detail |
|-----------|--------|
| **Developed by** | Epic Games |
| **First Released** | 1998 (Unreal Engine 1) |
| **Current Version** | Unreal Engine 5.4+ |
| **Languages** | C++ and Blueprints (visual scripting) |
| **License** | Free until $1M gross revenue; then 5% royalty |
| **Platforms** | PC, Mac, Linux, PS5, Xbox, iOS, Android, Switch (partial), XR |

### What Makes UE5 Special
- **Nanite** — render scenes with billions of polygons at real-time speeds
- **Lumen** — fully dynamic global illumination without baking lightmaps
- **World Partition** — seamlessly stream massive open worlds
- **MetaSounds** — procedural audio synthesis engine
- **PCG (Procedural Content Generation)** — generate environments algorithmically

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Nanite** | Virtualized micropolygon geometry — import film-quality assets |
| **Lumen** | Fully dynamic GI and reflections — no lightmap baking needed |
| **World Partition** | Automatic level streaming for massive open-world maps |
| **Blueprints** | Visual, node-based scripting without writing code |
| **C++ Integration** | Full C++ access to engine internals; Blueprints call C++ |
| **Chaos Physics** | Destruction, cloth simulation, rigid body physics |
| **Niagara** | GPU-accelerated particle and VFX system |
| **MetaSounds** | Procedural audio graph for dynamic soundscapes |
| **Sequencer** | Non-linear cinematics editor (rival to DaVinci Resolve for 3D) |
| **PCG Framework** | Procedural content generation for foliage, terrain, props |
| **Metahuman Creator** | Photorealistic human character creation tool |
| **Fab Marketplace** | Asset marketplace (merged Quixel Megascans library — free for UE) |

---

## What is Unreal Engine Used For?

### 🎮 AAA Games

| Game | Studio |
|------|--------|
| **Fortnite** | Epic Games |
| **The Matrix Awakens** (demo) | Epic Games |
| **Hogwarts Legacy** | Avalanche Software |
| **Palworld** | Pocketpair |
| **Black Myth: Wukong** | Game Science |
| **Lords of the Fallen** | Hexworks |

### 🎬 Film, TV & Virtual Production
- **The Mandalorian** — LED volume + Unreal real-time rendering
- **1883**, **The Last of Us** post-production visualization
- **Pre-visualization** of action sequences and VFX

### 🏗️ Architecture & Visualization
- Real-time architectural walkthroughs (Arch Viz)
- Product configurators (automotive, consumer goods)
- Urban planning and digital twin simulations

### 🥽 XR / Simulation
- Military and aerospace training simulations
- High-fidelity VR experiences
- Medical device training (Siemens Healthineers, etc.)

---

## Advantages

| ✅ Advantage | Details |
|------------|---------|
| **Visual Fidelity** | Nanite + Lumen = unmatched real-time rendering quality |
| **Blueprints** | Non-programmers can build full games with visual scripting |
| **Free Megascans** | Billions of photorealistic 3D assets free for UE projects |
| **Full Source Code** | Access to the complete engine source on GitHub |
| **Virtual Production** | Industry-standard for film/TV LED volume workflows |
| **Sequencer Cinematics** | Film-quality cutscene creation built into the editor |
| **Chaos Destruction** | Real-time destructible environments |
| **Open World Tools** | World Partition, PCG, HLOD for massive maps |
| **Robust Networking** | Built-in multiplayer replication framework |

---

## Disadvantages

| ❌ Disadvantage | Details |
|---------------|---------|
| **Steep Learning Curve** | C++ + Blueprint duality; massive feature surface |
| **Hardware Intensive** | UE5 editor requires high-end GPU/CPU (RTX 3070+ recommended) |
| **Large Installation** | Engine + content = 20–60+ GB |
| **5% Royalty** | After $1M revenue (Epic can waive via negotiation) |
| **Shader Compilation** | First launch / material changes trigger long compile times |
| **Not Ideal for 2D** | No dedicated 2D pipeline; 3D-first engine |
| **Complex Build System** | UnrealBuildTool + Visual Studio integration can be finicky |
| **Overkill for Indie 2D** | Massive overhead for simple projects |

---

## Unreal vs Unity vs Godot

| Feature | Unreal Engine | Unity | Godot |
|---------|--------------|-------|-------|
| **Rendering** | ⚡ Industry-leading (Nanite/Lumen) | ✅ Very Good | ✅ Good |
| **2D** | ⚠️ Not primary | ✅ Good | ⚡ Best |
| **Scripting** | C++ + Blueprints | C# | GDScript / C# |
| **Beginner Curve** | ❌ Steep | ✅ Moderate | ✅ Gentle |
| **Price** | Free → 5% royalty | Free tier; paid plans | ✅ Free (MIT) |
| **Mobile** | ✅ Good | ⚡ Dominant | ✅ Good |
| **Open World** | ⚡ World Partition | ✅ Streaming | ⚠️ Limited |
| **Film/TV** | ⚡ Industry standard | ⚠️ Less common | ❌ Rare |
| **Asset Library** | ⚡ Megascans (free!) | ✅ Asset Store | ⚠️ Small |
| **Open Source** | Source-available | ❌ No | ✅ MIT |

---

## Who Should Use Unreal Engine?

### ✅ Perfect For:
- **AAA game developers** targeting console/PC with demanding visuals
- **Indie developers** building high-fidelity 3D games (willing to learn)
- **Arch Viz / Product Visualization** studios
- **Film & Virtual Production** teams
- **C++ developers** who want low-level engine control
- **Technical Artists** building complex shaders and VFX

### 💡 Consider Unity Instead If:
- Mobile is your primary target
- You need AR/VR across many devices
- Team primarily knows C#

### 💡 Consider Godot Instead If:
- You're building 2D games or lightweight 3D
- Budget is zero, open-source is mandatory

---

## Learning Resources

| Resource | Link |
|----------|------|
| **Official Docs** | [dev.epicgames.com/documentation](https://dev.epicgames.com/documentation/) |
| **Online Learning** | [dev.epicgames.com/community/learning](https://dev.epicgames.com/community/learning) |
| **Fab (Assets)** | [fab.com](https://www.fab.com) — asset marketplace |
| **GitHub (Source)** | [github.com/EpicGames/UnrealEngine](https://github.com/EpicGames/UnrealEngine) |
| **Community Forums** | [forums.unrealengine.com](https://forums.unrealengine.com) |
| **YouTube** | Unreal Sensei, William Faucher, Smart Poly, Matt Aspland |
| **Book** | *Unreal Engine 5 Game Development with C++* — Packt |

---

## User Guide

---

### Installation

#### Step 1: Install the Epic Games Launcher

1. Download from [epicgames.com/store/download](https://store.epicgames.com/download)
2. Install and sign in (free Epic Games account)

#### Step 2: Install Unreal Engine

1. Epic Games Launcher → **Unreal Engine** tab → **Library**
2. Click **+** under Engine Versions → select **5.4** (or current LTS)
3. Choose install components:
   - ✅ Core components (required)
   - ✅ Starter content
   - ✅ Target Platform Support (Android, iOS as needed)
4. Click **Install** (~20–60 GB depending on options)

> ⚠️ **Recommended specs for UE5**: GPU with 8 GB VRAM (RTX 3070+), 32 GB RAM, NVMe SSD

#### Step 3: Create a Project

1. Epic Launcher → **Launch** Unreal Engine
2. **Games** category → choose a template:
   - **Blank** — empty project
   - **First Person** — FPS starter with movement + shooting
   - **Third Person** — TPS starter with character + camera
   - **Top Down** — top-down with click-to-move
3. Choose **Blueprint** or **C++** project
4. Set quality preset (**Maximum / Scalable**)
5. Set project location → **Create**

---

### Editor Overview

| Panel | Purpose |
|-------|---------|
| **Viewport** | 3D view of the world; navigate with WASD + right-click |
| **Outliner** | List of all Actors in the level |
| **Details** | Properties of selected Actor / Component |
| **Content Browser** | Your project's assets and content |
| **World Settings** | Gravity, game mode, lighting settings |
| **Output Log** | Print statements, warnings, errors |

**Essential Viewport Shortcuts:**

| Key | Action |
|-----|--------|
| `W` | Move tool |
| `E` | Rotate tool |
| `R` | Scale tool |
| `G` | Toggle game view (hide editor gizmos) |
| `F` | Focus on selected Actor |
| `Alt+P` | Play in Viewport |
| `Ctrl+Alt+F11` | Fullscreen viewport |

---

### Actors & Components

In Unreal, **everything placed in a Level is an Actor**. Actors contain **Components** that define behavior and data.

#### Common Built-in Components

| Component | Purpose |
|-----------|---------|
| **SceneComponent** | Base; provides Transform (position/rotation/scale) |
| **StaticMeshComponent** | Renders a non-animated mesh |
| **SkeletalMeshComponent** | Renders an animated (rigged) mesh |
| **CapsuleComponent** | Collision capsule (used for characters) |
| **BoxComponent / SphereComponent** | Simple collision volumes |
| **CameraComponent** | Camera attached to an Actor |
| **PointLightComponent** | Point light source |
| **AudioComponent** | Play audio attached to an Actor |
| **CharacterMovementComponent** | Full physics-based character locomotion |

#### Creating an Actor in the Level

- **Content Browser → Right-click → Blueprint Class → Actor**
- Open the Blueprint → **Add Component** (top left of the Blueprint editor)
- Drag the Asset from Content Browser into the Viewport to place it

---

### Blueprints Visual Scripting

Blueprints are Unreal's **visual, node-based scripting system**. Every Blueprint is compiled to bytecode — it is fully functional without writing a single line of C++.

#### Blueprint Types

| Type | Purpose |
|------|---------|
| **Actor Blueprint** | Gameplay objects placed in the world |
| **Character Blueprint** | Player or AI-controlled humanoid characters |
| **Game Mode Blueprint** | Rules of the game (player class, win conditions) |
| **Widget Blueprint** | UI screens and HUD elements |
| **Animation Blueprint** | State machines for character animation |
| **Struct / Enum** | Custom data types |

#### Key Blueprint Concepts

```
Event Nodes
├── Event BeginPlay    → fires once when the game starts
├── Event Tick         → fires every frame (avoid heavy logic here)
└── Event OnOverlap    → fires when two collision volumes overlap

Flow Control Nodes
├── Branch (If/Else)
├── For Loop / For Each Loop
└── Sequence

Math & Data
├── Add / Subtract / Multiply / Divide
├── Get / Set variables
└── Make / Break Structs

Object Nodes
├── Get All Actors of Class
├── Spawn Actor from Class
├── Cast To [Class]      → type-safe access to Actor methods
└── Destroy Actor
```

#### Print to Screen (Debugging)

In the Blueprint Event Graph:
1. Right-click → Search **"Print String"**
2. Connect to **Event BeginPlay**
3. Set the string to `"Hello from Blueprints!"`
4. Press **Compile** → **Play**

---

### C++ Basics in Unreal

While Blueprints are great for prototyping, C++ offers performance and editor integration.

#### Creating a C++ Actor Class

```cpp
// MyActor.h
#pragma once
#include "CoreMinimal.h"
#include "GameFramework/Actor.h"
#include "MyActor.generated.h"

UCLASS()
class MYGAME_API AMyActor : public AActor
{
    GENERATED_BODY()

public:
    AMyActor();

    // UPROPERTY: exposed to the editor and Blueprint
    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Settings")
    float Speed = 100.f;

    UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Settings")
    FString ActorLabel = TEXT("MyActor");

    // UFUNCTION: callable from Blueprint
    UFUNCTION(BlueprintCallable, Category = "Actions")
    void PrintLabel();

protected:
    virtual void BeginPlay() override;
    virtual void Tick(float DeltaTime) override;
};
```

```cpp
// MyActor.cpp
#include "MyActor.h"

AMyActor::AMyActor()
{
    PrimaryActorTick.bCanEverTick = true;
}

void AMyActor::BeginPlay()
{
    Super::BeginPlay();
    UE_LOG(LogTemp, Warning, TEXT("MyActor BeginPlay: %s"), *ActorLabel);
}

void AMyActor::Tick(float DeltaTime)
{
    Super::Tick(DeltaTime);
    // Move forward every frame
    AddActorLocalOffset(FVector(Speed * DeltaTime, 0.f, 0.f));
}

void AMyActor::PrintLabel()
{
    GEngine->AddOnScreenDebugMessage(-1, 3.f, FColor::Green,
        FString::Printf(TEXT("Label: %s"), *ActorLabel));
}
```

#### Unreal C++ Naming Conventions

| Prefix | Meaning |
|--------|---------|
| `A` | Actor class (e.g., `AMyCharacter`) |
| `U` | UObject-derived class (e.g., `UMyComponent`) |
| `F` | Plain struct (e.g., `FVector`, `FHitResult`) |
| `E` | Enum (e.g., `EGameState`) |
| `I` | Interface (e.g., `IInteractable`) |
| `T` | Template class (e.g., `TArray`, `TMap`) |

---

### Physics & Collision

#### Collision Responses

Each component has a collision profile with responses to other collision channels:

| Response | Behavior |
|----------|---------|
| **Ignore** | Passes through, no event |
| **Overlap** | Passes through, fires overlap events |
| **Block** | Stops movement, fires hit events |

#### C++ Hit Detection

```cpp
// Override OnHit: called when this Actor is hit by something blocking
void AMyActor::OnHit(
    UPrimitiveComponent* HitComponent,
    AActor* OtherActor,
    UPrimitiveComponent* OtherComp,
    FVector NormalImpulse,
    const FHitResult& Hit)
{
    if (OtherActor && OtherActor != this)
    {
        UE_LOG(LogTemp, Log, TEXT("Hit: %s"), *OtherActor->GetName());
    }
}

// Bind in BeginPlay:
MeshComponent->OnComponentHit.AddDynamic(this, &AMyActor::OnHit);
```

#### Linetrace (Raycasting)

```cpp
void AMyCharacter::Shoot()
{
    FVector Start = GetActorLocation();
    FVector End   = Start + GetActorForwardVector() * 5000.f;

    FHitResult HitResult;
    FCollisionQueryParams Params;
    Params.AddIgnoredActor(this);

    bool bHit = GetWorld()->LineTraceSingleByChannel(
        HitResult, Start, End, ECC_Visibility, Params);

    if (bHit)
    {
        DrawDebugPoint(GetWorld(), HitResult.Location, 10.f, FColor::Red, false, 2.f);
        UE_LOG(LogTemp, Log, TEXT("Shot hit: %s"), *HitResult.GetActor()->GetName());
    }
}
```

---

### Input System

#### Enhanced Input System (UE5 — Recommended)

1. **Project Settings → Engine → Input** → set **Default Player Input Class** and **Default Input Component Class** to Enhanced variants
2. **Content Browser → Right-click → Input → Input Actions** — create `IA_Move`, `IA_Jump`, `IA_Fire`
3. **Right-click → Input → Input Mapping Context** → add actions and bind keys

```cpp
// In Character .h
#include "InputActionValue.h"

UPROPERTY(EditAnywhere, Category = "Input")
class UInputMappingContext* DefaultMappingContext;

UPROPERTY(EditAnywhere, Category = "Input")
class UInputAction* MoveAction;

UPROPERTY(EditAnywhere, Category = "Input")
class UInputAction* JumpAction;
```

```cpp
// In SetupPlayerInputComponent
void AMyCharacter::SetupPlayerInputComponent(UInputComponent* PlayerInputComponent)
{
    Super::SetupPlayerInputComponent(PlayerInputComponent);

    if (UEnhancedInputComponent* EIC = Cast<UEnhancedInputComponent>(PlayerInputComponent))
    {
        EIC->BindAction(MoveAction, ETriggerEvent::Triggered, this, &AMyCharacter::Move);
        EIC->BindAction(JumpAction, ETriggerEvent::Started,   this, &AMyCharacter::Jump);
    }
}

void AMyCharacter::Move(const FInputActionValue& Value)
{
    FVector2D Axis = Value.Get<FVector2D>();
    AddMovementInput(GetActorForwardVector(), Axis.Y);
    AddMovementInput(GetActorRightVector(),   Axis.X);
}
```

---

### Character & Movement

Unreal provides `ACharacter` — an Actor with a `CapsuleComponent`, `SkeletalMeshComponent`, and `CharacterMovementComponent` pre-wired.

```cpp
// In Character BeginPlay or a Blueprint
UCharacterMovementComponent* CMC = GetCharacterMovement();

CMC->MaxWalkSpeed   = 600.f;
CMC->JumpZVelocity  = 700.f;
CMC->GravityScale   = 1.5f;
CMC->AirControl     = 0.35f;
CMC->MaxAcceleration = 2048.f;

// Crouch
CMC->NavAgentProps.bCanCrouch = true;
Crouch();   // built-in function

// Sprint
CMC->MaxWalkSpeed = bIsSprinting ? 1000.f : 600.f;
```

---

### Materials & Shaders

In Unreal, **Materials** define how a surface looks. They are node graphs compiled to HLSL shaders.

#### Material Graph Basics

1. Content Browser → Right-click → **Material** → double-click to open
2. The output node has inputs:
   - **Base Color** — diffuse/albedo color
   - **Metallic** — 0 = dielectric, 1 = metal
   - **Roughness** — 0 = mirror, 1 = fully rough
   - **Normal** — surface detail bumps
   - **Emissive Color** — glow / self-illumination
   - **Opacity** — transparency (for Translucent blend mode)

#### Dynamic Material Instances (Runtime Color Change)

```cpp
// In BeginPlay
UMaterialInstanceDynamic* DynMat = MeshComponent->CreateDynamicMaterialInstance(0);

// Change color at runtime
DynMat->SetVectorParameterValue(TEXT("BaseColor"), FLinearColor::Red);
DynMat->SetScalarParameterValue(TEXT("Metallic"), 0.8f);
```

---

### UI with UMG

**UMG** (Unreal Motion Graphics) is Unreal's widget-based UI system.

#### Creating a Widget Blueprint

1. Content Browser → Right-click → **User Interface → Widget Blueprint**
2. Open it → **Designer** tab to drag and drop UI elements:
   - **Text Block**, **Button**, **Progress Bar**, **Image**, **Canvas Panel**
3. **Graph** tab to write Blueprint logic

#### Displaying a Widget in C++

```cpp
// In character or HUD class .h
UPROPERTY(EditAnywhere, Category = "UI")
TSubclassOf<UUserWidget> HUDWidgetClass;

private:
    UPROPERTY()
    UUserWidget* HUDWidget;
```

```cpp
// In BeginPlay
if (HUDWidgetClass)
{
    HUDWidget = CreateWidget<UUserWidget>(GetWorld(), HUDWidgetClass);
    HUDWidget->AddToViewport();
}

// Hide/Show
HUDWidget->SetVisibility(ESlateVisibility::Hidden);
HUDWidget->SetVisibility(ESlateVisibility::Visible);
```

#### Binding Widget to Data (Blueprint Binding)

In the Widget Blueprint, right-click a **Text Block → Bind → Create Binding**. This opens a function automatically called every frame that returns the display value.

---

### Audio (MetaSounds)

MetaSounds is UE5's procedural audio engine. For basic playback:

```cpp
// Attach an UAudioComponent to your Actor
UAudioComponent* AudioComp = CreateDefaultSubobject<UAudioComponent>(TEXT("Audio"));
AudioComp->SetupAttachment(RootComponent);
AudioComp->bAutoActivate = false;

// Play a sound at a world location (fire and forget)
UGameplayStatics::PlaySoundAtLocation(this, JumpSound, GetActorLocation());

// Play on the component with pitch/volume variation
AudioComp->SetSound(FootstepSound);
AudioComp->SetPitchMultiplier(FMath::RandRange(0.9f, 1.1f));
AudioComp->Play();
```

---

### Nanite & Lumen (UE5)

#### Enabling Nanite

Nanite must be enabled per Static Mesh asset:
1. Open a Static Mesh asset → **Details → Nanite Settings → Enable Nanite: ✅**
2. Or in the Content Browser: Right-click mesh → **Nanite → Enable**

Nanite automatically handles LODs and renders billions of polygons efficiently.

#### Enabling Lumen (Global Illumination)

In **Project Settings → Engine → Rendering**:
- **Dynamic Global Illumination Method** → `Lumen`
- **Reflection Method** → `Lumen`

In **Post Process Volume** (place one in the level):
- **Global Illumination → Lumen**
- **Reflections → Lumen**

> 💡 Lumen requires `r.DynamicGlobalIlluminationMethod=1` in DefaultEngine.ini or set via Project Settings.

#### Enabling World Partition (Large Open Worlds)

1. New project → select **Open World** template, OR
2. Existing level → **World Settings → Enable World Partition**
3. Actors are automatically streamed based on player proximity

---

### Packaging & Shipping

#### Build for Windows

1. **Platforms → Windows → Package Project**
2. Choose output folder
3. UE compiles all shaders and cooks content → produces a standalone `.exe`

#### Build for Android

1. Install **Android Studio** and **Android SDK**
2. **Edit → Project Settings → Platforms → Android** → configure package name
3. **Platforms → Android → Package Project**

#### Common Package Settings (Project Settings → Packaging)

| Setting | Recommendation |
|---------|---------------|
| **Build Configuration** | Shipping (for release), Development (for testing) |
| **For Distribution** | ✅ Enable for app store submissions |
| **Compress ini files in packaging** | ✅ Recommended |
| **Cook only maps and dependencies** | ✅ Reduce package size |

---

### Best Practices

#### 1. Use C++ for Core Systems, Blueprints for Iteration

```
C++:          Physics, networking, AI core, performance-critical systems
Blueprints:   Game logic, UI flow, level scripting, rapid iteration
```

#### 2. Use `UPROPERTY` and `UFUNCTION` Macros Everywhere

```cpp
// Without UPROPERTY: garbage collected, lost after BeginPlay in some cases
AActor* MyRef;

// With UPROPERTY: properly tracked by Unreal's GC
UPROPERTY()
AActor* MyRef;

// With editor exposure:
UPROPERTY(EditAnywhere, BlueprintReadWrite, Category = "Config")
float Damage = 25.f;
```

#### 3. Prefer `GetWorld()->GetTimerManager()` Over Tick for Repeated Logic

```cpp
// BAD: logic in Tick runs every frame (expensive)
void ATurret::Tick(float DeltaTime)
{
    TimeSinceLastShot += DeltaTime;
    if (TimeSinceLastShot >= FireRate) { Shoot(); TimeSinceLastShot = 0; }
}

// GOOD: timer fires at exact intervals
FTimerHandle FireTimer;
GetWorldTimerManager().SetTimer(FireTimer, this, &ATurret::Shoot, FireRate, true);
```

#### 4. Use Object Pooling for Frequently Spawned Actors

```cpp
// UE5.3+ has built-in actor pooling via UObjectPoolSubsystem
// Or use a simple TArray pool:
TArray<AProjectile*> BulletPool;

AProjectile* GetBullet()
{
    for (auto& B : BulletPool)
        if (!B->IsActive()) return B;
    return GetWorld()->SpawnActor<AProjectile>(ProjectileClass);
}
```

#### 5. Organize Content Browser Folders Strictly

```
Content/
├── Characters/
│   ├── Player/
│   └── Enemies/
├── Levels/
├── Materials/
├── Meshes/
├── Blueprints/
│   ├── Gameplay/
│   └── UI/
├── Audio/
│   ├── Music/
│   └── SFX/
└── Textures/
```

#### 6. Use DrawDebug Functions During Development

```cpp
// Visualize traces and volumes without adding debug meshes
DrawDebugLine(GetWorld(), Start, End, FColor::Red, false, 1.f, 0, 2.f);
DrawDebugSphere(GetWorld(), HitPoint, 20.f, 12, FColor::Green, false, 2.f);
DrawDebugBox(GetWorld(), Center, Extent, FColor::Blue, false, 2.f);
```

#### 7. Profile Early with Unreal Insights

```
Editor → Tools → Unreal Insights → Launch
Or: stat fps / stat unit / stat game / stat gpu  (type in viewport)
```

---

## Summary

| Use Unreal When | Consider Alternatives When |
|----------------|---------------------------|
| AAA 3D games (console/PC) | Mobile-first games → **Unity** |
| Film / virtual production | 2D games → **Godot** |
| Arch Viz / high-fidelity visualization | Zero-budget indie → **Godot** |
| Open-world games with massive scale | AR/VR multiplatform → **Unity** |
| Maximum rendering quality (Nanite/Lumen) | C# team preference → **Unity** |

---

## Next Steps

1. **"Your First Hour in Unreal Engine 5"** — [dev.epicgames.com/community/learning](https://dev.epicgames.com/community/learning)
2. **"Lyra Starter Game"** — Epic's reference project demonstrating UE5 best practices
3. **Blueprints vs C++ series** — Unreal Online Learning
4. **[Unity](../Unity/Unity.md)** — compare the cross-platform alternative
5. **[Godot](../Godot/Godot.md)** — compare the open-source alternative

---

*Last Updated: February 20, 2026*
