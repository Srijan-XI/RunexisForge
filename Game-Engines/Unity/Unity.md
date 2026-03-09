# 🎮 Unity Game Engine

> *"Unity: Create Anything, Deploy Everywhere"*

---

## Table of Contents

1. [Introduction](#introduction)
2. [Key Features](#key-features)
3. [What is Unity Used For?](#what-is-unity-used-for)
4. [Advantages](#advantages)
5. [Disadvantages](#disadvantages)
6. [Unity vs Unreal vs Godot](#unity-vs-unreal-vs-godot)
7. [Who Should Use Unity?](#who-should-use-unity)
8. [Learning Resources](#learning-resources)
9. [User Guide](#user-guide)
    - [Installation](#installation)
    - [Editor Overview](#editor-overview)
    - [GameObjects & Components](#gameobjects--components)
    - [MonoBehaviour Lifecycle](#monobehaviour-lifecycle)
    - [C# Scripting Basics](#c-scripting-basics)
    - [Physics](#physics)
    - [Input System](#input-system)
    - [UI with Canvas](#ui-with-canvas)
    - [Prefabs](#prefabs)
    - [Scene Management](#scene-management)
    - [Audio](#audio)
    - [Coroutines & Async](#coroutines--async)
    - [Build & Deploy](#build--deploy)
    - [Best Practices](#best-practices)

---

## Introduction

**Unity** is a real-time 3D (and 2D) game engine developed by Unity Technologies. First released in 2005 at Apple's Worldwide Developers Conference, Unity has become the world's most widely-used game engine — powering everything from mobile puzzle games to VR training simulators, AR apps, and indie masterpieces.

All Unity gameplay code is written in **C#**, attached to GameObjects as scriptable components. Unity uses a **component-based architecture**: you build behavior by combining components rather than inheriting from base classes.

### History & Context

| Attribute | Detail |
|-----------|--------|
| **Developed by** | Unity Technologies (Copenhagen, Denmark) |
| **First Released** | June 2005 (Mac-only originally) |
| **Current Version** | Unity 6 (2024 LTS) |
| **Scripting Language** | C# (.NET) |
| **License** | Personal (free) / Pro / Enterprise / Industry |
| **Platforms** | 20+ platforms including PC, mobile, console, XR |

### Why Unity Dominates
- **~50% of all mobile games** are made with Unity
- The largest community and the most learning resources
- **Asset Store** with 60,000+ assets — accelerate any project
- First-class support for **AR/VR/XR** development
- Trusted by studios from 2-person indie teams to EA, Ubisoft, and Niantic

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Component System** | Build behavior by composing GameObjects with Components |
| **Physics** | NVIDIA PhysX (3D), Box2D (2D), built-in character controller |
| **Rendering** | URP (Universal Render Pipeline), HDRP (High Definition RP) |
| **Shader Graph** | Visual, node-based shader creation |
| **Timeline** | Cinematic sequencing — cameras, animations, audio |
| **Animator** | State-machine-based animation system |
| **Asset Store** | Marketplace with 60,000+ assets, tools, scripts |
| **Unity Netcode** | Built-in multiplayer networking |
| **XR Plugin Framework** | AR Foundation, OpenXR, Meta Quest, ARKit, ARCore |
| **Addressables** | Asset streaming and memory management |
| **Package Manager** | Modular feature installation via Unity Package Manager |
| **Unity Analytics** | Built-in game telemetry and A/B testing |
| **Profiler** | Deep performance profiling with CPU/GPU frame breakdown |

---

## What is Unity Used For?

### 🎮 Games — All Scales

| Scale | Examples |
|-------|---------|
| **Mobile** | Pokémon GO, Monument Valley, Subway Surfers |
| **PC Indie** | Hollow Knight, Cuphead (ported), Among Us, Ori series |
| **Console** | Escape from Tarkov, Subnautica, Rust |
| **Hyper-casual** | Most of the top App Store/Google Play free games |

### 🥽 AR / VR / XR
- Medical training simulations (VR surgery)
- Architecture visualization walkthrough
- Industrial maintenance AR (HoloLens)
- Fitness apps (Beat Saber, VR workout)
- Military and aerospace training

### 🏗️ Industry & Enterprise
- **Architecture / Real Estate** — walkthroughs, virtual staging
- **Automotive** — BMW, Volvo use Unity for interactive configurators
- **Film & Broadcast** — virtual production (LED volumes)
- **AEC** — construction visualization with BIM data

### 📱 Mobile Apps
- Interactive product catalogues
- Educational apps with 3D elements
- Location-based AR experiences

---

## Advantages

| ✅ Advantage | Details |
|------------|---------|
| **Massive Community** | Largest game dev community; answers to every problem exist |
| **Asset Store** | 60,000+ assets, plugins, and tools to accelerate development |
| **Cross-Platform** | Build to 20+ platforms from a single project |
| **AR/VR Leader** | Best-supported engine for AR/VR across all headsets |
| **Free Personal Tier** | Free for individuals / studios under $200K revenue |
| **C# Ecosystem** | Full .NET Standard; use any NuGet-compatible library |
| **Excellent Tooling** | Profiler, Frame Debugger, Memory Profiler, Timeline |
| **2D & 3D in One** | Dedicated 2D workflow alongside full 3D |
| **Learn Unity** | Official learning platform with structured courses |
| **Job Market** | Most in-demand game engine in job postings |

---

## Disadvantages

| ❌ Disadvantage | Details |
|---------------|---------|
| **Runtime Fee Controversy** | 2023 pricing change damaged community trust |
| **Heavy Editor** | 5–15 GB install; slow for large projects |
| **Not Open Source** | Black box — can't fix engine bugs yourself |
| **HDRP Complexity** | High Definition Render Pipeline steep learning curve |
| **Overdependence on Asset Store** | Easy to ship bloated, unoptimized projects |
| **Build Times** | Large projects can have slow compilation/build times |
| **Script Compilation Lag** | Every script change triggers a recompile pause |
| **Legacy Systems** | Old APIs (Input, UI) coexist with new systems — confusing |

---

## Unity vs Unreal vs Godot

| Feature | Unity | Unreal Engine | Godot |
|---------|-------|--------------|-------|
| **Price** | Free / Pro paid | Free to threshold | ✅ Free (MIT) |
| **Language** | C# | C++ / Blueprints | GDScript / C# |
| **2D** | ✅ Good | ⚠️ Limited | ⚡ Best |
| **3D Quality** | ✅ Very Good | ⚡ Industry-leading | ✅ Good (Godot 4) |
| **AR/VR** | ⚡ Best support | ✅ Good | ⚠️ Limited |
| **Learning Curve** | ✅ Moderate | ❌ Steep | ✅ Gentle |
| **Asset Store** | ⚡ 60,000+ | ✅ Good | ⚠️ Small |
| **Mobile** | ⚡ Dominant (~50% games) | ✅ Good | ✅ Good |
| **Open Source** | ❌ No | ❌ Source-available | ✅ MIT |
| **Community** | ⚡ Largest | ✅ Large | ✅ Growing fast |

---

## Who Should Use Unity?

### ✅ Perfect For:
- **Mobile game developers** — Unity dominates app stores
- **AR/VR developers** — best XR tooling and platform support
- **C# developers** transitioning into games
- **Indie developers** who want a large ecosystem
- **Teams** that leverage the Asset Store for speed

### 💡 Consider Unreal Instead If:
- You need the highest-fidelity 3D visuals (Nanite/Lumen)
- You are building for PC/console AAA productions

### 💡 Consider Godot Instead If:
- Budget is zero and you need a 100% free, open-source engine
- 2D is your primary focus
- You prefer no licensing concerns

---

## Learning Resources

| Resource | Link |
|----------|------|
| **Unity Learn** | [learn.unity.com](https://learn.unity.com) |
| **Manual** | [docs.unity3d.com/Manual](https://docs.unity3d.com/Manual/) |
| **Script API** | [docs.unity3d.com/ScriptReference](https://docs.unity3d.com/ScriptReference/) |
| **Asset Store** | [assetstore.unity.com](https://assetstore.unity.com) |
| **YouTube** | Brackeys, Code Monkey, Game Dev Guide, Unity official channel |
| **Book** | *Unity in Action* — Joseph Hocking |

---

## User Guide

---

### Installation

#### Step 1: Install Unity Hub

[Unity Hub](https://unity.com/download) is the launcher that manages editor versions and projects.

1. Download Unity Hub from [unity.com/download](https://unity.com/download)
2. Install and open Unity Hub
3. Sign in with a free Unity ID at [id.unity.com](https://id.unity.com)

#### Step 2: Install a Unity Editor Version

- In Unity Hub → **Installs** tab → **Install Editor**
- Choose a **LTS (Long Term Support)** version for stability (e.g., Unity 6000.x LTS)
- Select modules to install:
  - ✅ **Microsoft Visual Studio Community** (IDE, includes C# IntelliSense)
  - ✅ **Android Build Support** (if targeting Android)
  - ✅ **iOS Build Support** (macOS only)

#### Step 3: Create a Project

1. Unity Hub → **Projects** → **New project**
2. Choose a template:
   - **2D** — orthographic camera, Tilemap, 2D physics
   - **3D** — perspective camera, 3D physics, URP or HDRP
   - **3D (URP)** — Universal Render Pipeline (recommended for most projects)
3. Set project name and location → **Create project**

---

### Editor Overview

The Unity editor has these main areas:

| Panel | Purpose |
|-------|---------|
| **Scene View** | Edit your game world visually |
| **Game View** | Preview what the player sees |
| **Hierarchy** | List of all GameObjects in the current scene |
| **Inspector** | Properties of the selected GameObject / asset |
| **Project** | Your project's file system |
| **Console** | Debug logs, warnings, and errors |

**Key shortcuts:**
- `W` — Move tool
- `E` — Rotate tool
- `R` — Scale tool
- `Ctrl+P` — Play/Stop
- `Ctrl+S` — Save scene
- `Ctrl+D` — Duplicate selected object

---

### GameObjects & Components

In Unity, **everything in a Scene is a GameObject**. GameObjects are empty containers — behavior and data come from **Components** attached to them.

#### Creating GameObjects

- Hierarchy panel → **Right-click → 3D Object → Cube** (or 2D Object, etc.)
- Or menu: **GameObject → Create Empty** → then add components via the Inspector

#### Common Built-in Components

| Component | Purpose |
|-----------|---------|
| **Transform** | Position, rotation, scale — every GameObject has one |
| **Rigidbody** | Physics simulation (gravity, forces) |
| **Collider** | Defines the collision shape (Box, Sphere, Mesh, etc.) |
| **MeshRenderer** | Renders a 3D mesh with a material |
| **SpriteRenderer** | Renders a 2D sprite |
| **Camera** | Renders the scene to the screen |
| **Light** | Directional, Point, Spot, Area lights |
| **AudioSource** | Plays audio clips |
| **Animator** | State-machine animation controller |
| **Canvas** | Root of all UI elements |

#### Adding a Component

Select a GameObject → Inspector → **Add Component** → search for component name.

---

### MonoBehaviour Lifecycle

Every C# script that inherits from `MonoBehaviour` has access to Unity's event functions:

```csharp
using UnityEngine;

public class MyScript : MonoBehaviour
{
    // Called once before anything when the object is created/enabled
    void Awake()
    {
        Debug.Log("Awake — earliest initialization");
    }

    // Called once after Awake, when the object becomes active
    void Start()
    {
        Debug.Log("Start — object is ready");
    }

    // Called every rendered frame (~60/s at 60 FPS)
    void Update()
    {
        // Input, non-physics movement, game logic
    }

    // Called at a fixed timestep (~50/s by default) — use for physics
    void FixedUpdate()
    {
        // Rigidbody forces, physics calculations
    }

    // Called every frame AFTER all Update() calls
    void LateUpdate()
    {
        // Camera follow logic (after player moves in Update)
    }

    // Called when this collider hits another (requires Rigidbody)
    void OnCollisionEnter(Collision collision)
    {
        Debug.Log("Hit: " + collision.gameObject.name);
    }

    // Called while inside a Trigger collider
    void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Coin"))
            CollectCoin();
    }

    // Called when the object is destroyed or the scene unloads
    void OnDestroy()
    {
        Debug.Log("Cleaned up.");
    }
}
```

---

### C# Scripting Basics

#### Variables, Properties & Serialization

```csharp
using UnityEngine;

public class PlayerStats : MonoBehaviour
{
    // [SerializeField] makes private fields visible in Inspector
    [SerializeField] private int maxHealth = 100;
    [SerializeField] private float moveSpeed = 5f;

    // Public fields are Inspector-visible by default (but avoid this)
    public string playerName = "Hero";

    // Header and Tooltip for Inspector organization
    [Header("Combat Settings")]
    [Tooltip("Damage dealt per hit")]
    [SerializeField] private int attackDamage = 25;

    [Range(0f, 1f)]
    [SerializeField] private float critChance = 0.15f;

    // Runtime property (read-only from outside)
    public int CurrentHealth { get; private set; }

    void Start()
    {
        CurrentHealth = maxHealth;
    }
}
```

#### Common Unity API

```csharp
// Find GameObjects
GameObject enemy = GameObject.Find("Enemy");
GameObject[] allEnemies = GameObject.FindGameObjectsWithTag("Enemy");

// Get Components
Rigidbody rb = GetComponent<Rigidbody>();
Renderer rend = GetComponentInChildren<Renderer>();

// Instantiate and Destroy
GameObject bullet = Instantiate(bulletPrefab, firePoint.position, firePoint.rotation);
Destroy(bullet, 3f);   // destroy after 3 seconds

// Transform operations
transform.position = new Vector3(0, 1, 0);
transform.Translate(Vector3.forward * speed * Time.deltaTime);
transform.Rotate(0, 90f, 0);
transform.LookAt(target.transform);

// Time
float dt = Time.deltaTime;          // seconds since last frame
float elapsed = Time.time;          // seconds since game started
float fixedDt = Time.fixedDeltaTime; // fixed physics timestep

// Debug
Debug.Log("Value: " + someValue);
Debug.LogWarning("Warning!");
Debug.LogError("Critical error!");
Debug.DrawRay(transform.position, Vector3.forward * 5f, Color.red);
```

---

### Physics

#### Rigidbody (3D Physics)

```csharp
using UnityEngine;

[RequireComponent(typeof(Rigidbody))]
public class PlayerMovement : MonoBehaviour
{
    [SerializeField] private float speed = 5f;
    [SerializeField] private float jumpForce = 6f;

    private Rigidbody rb;
    private bool isGrounded;

    void Awake()
    {
        rb = GetComponent<Rigidbody>();
    }

    void FixedUpdate()
    {
        // Read input
        float h = Input.GetAxis("Horizontal");    // -1 to 1
        float v = Input.GetAxis("Vertical");

        // Apply movement force
        Vector3 move = new Vector3(h, 0, v) * speed;
        rb.MovePosition(rb.position + move * Time.fixedDeltaTime);
    }

    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space) && isGrounded)
        {
            rb.AddForce(Vector3.up * jumpForce, ForceMode.Impulse);
        }
    }

    void OnCollisionStay(Collision collision)
    {
        if (collision.gameObject.CompareTag("Ground"))
            isGrounded = true;
    }

    void OnCollisionExit(Collision collision)
    {
        if (collision.gameObject.CompareTag("Ground"))
            isGrounded = false;
    }
}
```

#### Physics Raycasting

```csharp
void Update()
{
    // Cast a ray from center of screen into the world
    Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
    RaycastHit hitInfo;

    if (Physics.Raycast(ray, out hitInfo, 100f))
    {
        Debug.Log("Hit: " + hitInfo.collider.name);
        Debug.Log("Point: " + hitInfo.point);

        if (hitInfo.collider.CompareTag("Enemy"))
        {
            hitInfo.collider.GetComponent<Enemy>().TakeDamage(25);
        }
    }
}
```

---

### Input System

Unity has two input systems. The **New Input System** (Package) is recommended for new projects.

#### New Input System Setup

1. **Window → Package Manager → Unity Registry → Input System → Install**
2. Edit → Project Settings → Player → Active Input Handling → **Input System Package**
3. Create an **Input Actions Asset**: Assets → Create → Input Actions
4. Define action maps (e.g., "Player") and actions (e.g., "Move", "Jump", "Fire")

```csharp
using UnityEngine;
using UnityEngine.InputSystem;

public class PlayerController : MonoBehaviour
{
    private PlayerInputActions inputActions;
    private Vector2 moveInput;

    void Awake()
    {
        inputActions = new PlayerInputActions();
    }

    void OnEnable()
    {
        inputActions.Player.Enable();
        inputActions.Player.Jump.performed += OnJump;
        inputActions.Player.Fire.performed  += OnFire;
    }

    void OnDisable()
    {
        inputActions.Player.Jump.performed -= OnJump;
        inputActions.Player.Fire.performed  -= OnFire;
        inputActions.Player.Disable();
    }

    void Update()
    {
        // Read continuous movement input
        moveInput = inputActions.Player.Move.ReadValue<Vector2>();
        transform.Translate(new Vector3(moveInput.x, 0, moveInput.y)
                            * 5f * Time.deltaTime);
    }

    private void OnJump(InputAction.CallbackContext ctx)
    {
        Debug.Log("Jump!");
    }

    private void OnFire(InputAction.CallbackContext ctx)
    {
        Debug.Log("Fire!");
    }
}
```

#### Legacy Input (Quick Reference)

```csharp
// Legacy Input — still works, fine for prototyping
float h = Input.GetAxis("Horizontal");
float v = Input.GetAxis("Vertical");

if (Input.GetKeyDown(KeyCode.Space))  Debug.Log("Space pressed");
if (Input.GetMouseButtonDown(0))       Debug.Log("Left click");
Vector3 mousePos = Input.mousePosition;
```

---

### UI with Canvas

Unity UI is built on a **Canvas** that renders UI elements above the game world.

#### Canvas Setup

1. Hierarchy → Right-click → **UI → Canvas**
2. A **Canvas** + **EventSystem** appear automatically
3. Canvas Render Mode:
   - **Screen Space - Overlay** — always on top of everything (HUD)
   - **Screen Space - Camera** — rendered by a specific camera
   - **World Space** — UI exists in 3D world space (VR, diegetic UI)

#### Common UI Elements

```csharp
using UnityEngine;
using UnityEngine.UI;
using TMPro;  // TextMeshPro (recommended over legacy Text)

public class HUDManager : MonoBehaviour
{
    [SerializeField] private Slider healthBar;
    [SerializeField] private TMP_Text scoreText;
    [SerializeField] private Button restartButton;
    [SerializeField] private Image fadePanel;

    private int score = 0;

    void Start()
    {
        healthBar.maxValue = 100;
        healthBar.value    = 100;
        scoreText.text     = "Score: 0";

        // Wire up button click
        restartButton.onClick.AddListener(OnRestartClicked);
    }

    public void UpdateHealth(float current, float max)
    {
        healthBar.value = current / max * 100f;
    }

    public void AddScore(int points)
    {
        score += points;
        scoreText.text = "Score: " + score;
    }

    private void OnRestartClicked()
    {
        UnityEngine.SceneManagement.SceneManager.LoadScene(
            UnityEngine.SceneManagement.SceneManager.GetActiveScene().buildIndex);
    }
}
```

---

### Prefabs

A **Prefab** is a saved GameObject template that can be instantiated multiple times.

```csharp
public class EnemySpawner : MonoBehaviour
{
    [SerializeField] private GameObject enemyPrefab;
    [SerializeField] private Transform[] spawnPoints;
    [SerializeField] private float spawnInterval = 3f;

    void Start()
    {
        InvokeRepeating(nameof(SpawnEnemy), 1f, spawnInterval);
    }

    void SpawnEnemy()
    {
        if (spawnPoints.Length == 0) return;

        Transform spawnPoint = spawnPoints[Random.Range(0, spawnPoints.Length)];
        Instantiate(enemyPrefab, spawnPoint.position, spawnPoint.rotation);
    }
}
```

---

### Scene Management

```csharp
using UnityEngine.SceneManagement;

// Load a scene by name (must be added to Build Settings first)
SceneManager.LoadScene("MainMenu");

// Load additively (both scenes active simultaneously)
SceneManager.LoadSceneAsync("UI_Overlay", LoadSceneMode.Additive);

// Get the active scene name
string current = SceneManager.GetActiveScene().name;

// Reload current scene
SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);

// Use DontDestroyOnLoad for persistent objects (GameManager, AudioManager)
void Awake()
{
    DontDestroyOnLoad(gameObject);
}
```

---

### Audio

```csharp
using UnityEngine;

public class AudioManager : MonoBehaviour
{
    [SerializeField] private AudioSource musicSource;
    [SerializeField] private AudioSource sfxSource;

    [SerializeField] private AudioClip backgroundMusic;
    [SerializeField] private AudioClip jumpSound;
    [SerializeField] private AudioClip coinPickup;

    void Start()
    {
        musicSource.clip = backgroundMusic;
        musicSource.loop = true;
        musicSource.volume = 0.5f;
        musicSource.Play();
    }

    public void PlayJump()  => sfxSource.PlayOneShot(jumpSound);
    public void PlayCoin()  => sfxSource.PlayOneShot(coinPickup, 0.8f);

    public void SetMusicVolume(float volume) => musicSource.volume = volume;

    public void ToggleMusic()
    {
        if (musicSource.isPlaying) musicSource.Pause();
        else                       musicSource.UnPause();
    }
}
```

---

### Coroutines & Async

```csharp
using System.Collections;
using UnityEngine;

public class FadeEffect : MonoBehaviour
{
    [SerializeField] private CanvasGroup canvasGroup;

    // Fade out over 'duration' seconds
    public IEnumerator FadeOut(float duration)
    {
        float elapsed = 0f;
        while (elapsed < duration)
        {
            elapsed += Time.deltaTime;
            canvasGroup.alpha = 1f - (elapsed / duration);
            yield return null;  // wait one frame
        }
        canvasGroup.alpha = 0f;
    }

    // Start an animation with a delay
    public IEnumerator DelayedAction(float delay, System.Action action)
    {
        yield return new WaitForSeconds(delay);
        action?.Invoke();
    }

    void Start()
    {
        // Start a coroutine
        StartCoroutine(FadeOut(2f));
        StartCoroutine(DelayedAction(3f, () => Debug.Log("Delayed!")));

        // Stop all coroutines on this MonoBehaviour
        // StopAllCoroutines();
    }
}
```

---

### Build & Deploy

#### Build Settings

1. **File → Build Settings**
2. Click **Add Open Scenes** to include your scenes
3. Select **Target Platform** (Windows, Android, iOS, WebGL, etc.)
4. Click **Build** (or **Build And Run**)

#### Platform-Specific Notes

| Platform | Requirements |
|----------|-------------|
| **Windows** | No extra setup on Windows |
| **macOS** | Build on macOS; sign with Apple Developer certificate for distribution |
| **Android** | Android SDK, JDK installed; set package name in Player Settings |
| **iOS** | Requires macOS + Xcode; Apple Developer account for device testing |
| **WebGL** | Hosted via HTTPS; set compression in Player Settings |

#### Player Settings (Key Options)

- **Company Name / Product Name** — appears in app stores
- **Version** — semantic version of your build
- **Default Orientation** — Portrait, Landscape, Auto
- **Scripting Backend** — IL2CPP (recommended for release), Mono (faster builds)
- **API Compatibility** — .NET Standard 2.1

---

### Best Practices

#### 1. Use `[SerializeField]` Over `public` Fields

```csharp
// BAD: unnecessarily exposes field to all other scripts
public float speed = 5f;

// GOOD: visible in Inspector, hidden from other scripts
[SerializeField] private float speed = 5f;
```

#### 2. Cache Component References in `Awake`

```csharp
// BAD: GetComponent is expensive; don't call in Update
void Update()
{
    GetComponent<Rigidbody>().AddForce(...);
}

// GOOD: cache once
private Rigidbody rb;
void Awake() { rb = GetComponent<Rigidbody>(); }
void FixedUpdate() { rb.AddForce(...); }
```

#### 3. Use `CompareTag` Instead of String Equality

```csharp
// BAD: generates garbage / slower
if (collision.gameObject.tag == "Enemy")

// GOOD: optimized
if (collision.gameObject.CompareTag("Enemy"))
```

#### 4. Never Use `Find` in `Update`

```csharp
// BAD: searches entire scene every frame
void Update() { GameObject.Find("Player").whatever; }

// GOOD: find/assign once
private Transform playerTransform;
void Start() { playerTransform = GameObject.FindWithTag("Player").transform; }
```

#### 5. Use Object Pooling for Frequently Spawned Objects

```csharp
// Instead of Instantiate + Destroy (causes GC spikes):
// Use Unity's built-in ObjectPool<T> (Unity 2021+)
using UnityEngine.Pool;

private ObjectPool<GameObject> bulletPool;

void Awake()
{
    bulletPool = new ObjectPool<GameObject>(
        createFunc:    () => Instantiate(bulletPrefab),
        actionOnGet:   obj => obj.SetActive(true),
        actionOnRelease: obj => obj.SetActive(false),
        actionOnDestroy: Destroy,
        maxSize:       50
    );
}

void Shoot() => bulletPool.Get();
public void ReturnBullet(GameObject b) => bulletPool.Release(b);
```

#### 6. Use `Time.deltaTime` for Frame-Rate Independent Movement

```csharp
// BAD: speed depends on frame rate
transform.Translate(Vector3.forward * speed);

// GOOD: consistent across all frame rates
transform.Translate(Vector3.forward * speed * Time.deltaTime);
```

#### 7. Organize Using Folders and Naming Conventions

```
Assets/
├── Scripts/
│   ├── Player/
│   ├── Enemies/
│   ├── UI/
│   └── Managers/
├── Prefabs/
├── Scenes/
├── Materials/
├── Textures/
├── Audio/
│   ├── Music/
│   └── SFX/
└── Animations/
```

---

## Summary

| Use Unity When | Consider Alternatives When |
|----------------|---------------------------|
| Mobile game development | Best 3D visuals → **Unreal Engine** |
| AR / VR / XR development | Zero-cost open-source → **Godot** |
| Large C# team / .NET ecosystem | 2D focus on a budget → **Godot** |
| Need massive Asset Store | Oracle ERP dev → *not a game engine question* |
| Cross-platform (20+ targets) | Console-first AAA → **Unreal** |

---

## Next Steps

1. **Unity Learn** — [learn.unity.com](https://learn.unity.com) — free structured courses
2. **"Ruby's Adventure"** — official Unity 2D beginner project
3. **"John Lemon's Haunted Jaunt"** — official Unity 3D beginner project
4. **[Unreal Engine](../Unreal%20Engine/Unreal%20Engine.md)** — compare the AAA alternative
5. **[Godot](../Godot/Godot.md)** — compare the open-source alternative

---

*Last Updated: February 20, 2026*
