# Pygame

## Introduction

### What is Pygame?
Pygame is a set of Python modules designed for writing video games. It is built on top of the excellent SDL (Simple DirectMedia Layer) library. It allows you to create fully featured games and multimedia programs in the python language.

### Why Pygame?
- **Python**: Leverages the ease of use of Python.
- **Mature**: Decades old, very stable.
- **Portable**: Runs on nearly every OS that runs Python.
- **Simple**: Great for learning 2D game programming concepts.
- **Community**: Huge amount of tutorials and resources.

## Prerequisites
- **Python**: Installed on your system (Python 3.6+).
- **Pip**: Python package manager.

## Installation

```bash
pip install pygame
```

Check installation:
```bash
python3 -m pygame.examples.aliens
```

## Basic Game Structure

A standard Pygame template:

```python
import pygame
import sys

# Constants
WIDTH, HEIGHT = 800, 600
FPS = 60

# Initialization
pygame.init()
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("My Pygame")
clock = pygame.time.Clock()

# Main Game Loop
running = True
while running:
    # 1. Event Handling
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_ESCAPE:
                running = False

    # 2. Update
    # Update game state here

    # 3. Draw
    screen.fill((0, 0, 0)) # Clear screen (Black)
    
    # Draw things here
    # pygame.draw.rect(screen, (255, 0, 0), (100, 100, 50, 50))

    pygame.display.flip() # Double buffering flip
    
    # Limit FPS
    clock.tick(FPS)

# Quit
pygame.quit()
sys.exit()
```

## Graphics

### Drawing Shapes
```python
# Color: (R, G, B)
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)

# Rectangle
pygame.draw.rect(screen, RED, pygame.Rect(30, 30, 60, 60))

# Circle
pygame.draw.circle(screen, GREEN, (200, 200), 40)

# Line
pygame.draw.line(screen, BLUE, (0, 0), (WIDTH, HEIGHT), 5)
```

### Images (Sprites)
```python
# Load
player_img = pygame.image.load("player.png") 
# Good practice to convert() for performance
player_img = player_img.convert_alpha() 

# Draw
screen.blit(player_img, (player_x, player_y))
```

## Sprites and Groups
Pygame has a built-in Sprite class to manage objects.

```python
class Player(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.Surface((50, 50))
        self.image.fill((255, 255, 0))
        self.rect = self.image.get_rect()
        self.rect.center = (WIDTH // 2, HEIGHT // 2)

    def update(self):
        self.rect.x += 1

# Setup
all_sprites = pygame.sprite.Group()
player = Player()
all_sprites.add(player)

# Loop
all_sprites.update()
all_sprites.draw(screen)
```

## Input Handling

### Polling (Inside Loop)
```python
keys = pygame.key.get_pressed()
if keys[pygame.K_LEFT]:
    player.rect.x -= 5
if keys[pygame.K_RIGHT]:
    player.rect.x += 5
```

### Events (Inside Event Loop)
Best for single key presses (toggles, shooting).
```python
if event.type == pygame.KEYDOWN:
    if event.key == pygame.K_SPACE:
        player.jump()
```

## Audio

### Sound Effects
```python
jump_snd = pygame.mixer.Sound("jump.wav")
jump_snd.play()
```

### Music
```python
pygame.mixer.music.load("bgm.mp3")
pygame.mixer.music.play(-1) # -1 means loop indefinitely
```

## Collision Detection

```python
# Rectangle Collision
if player.rect.colliderect(enemy.rect):
    print("Hit!")

# Group Collision
hits = pygame.sprite.spritecollide(player, enemy_group, False)
if hits:
    # Handle collision
    pass
```

## Resources
- [Pygame Website](https://www.pygame.org/)
- [Documentation](https://www.pygame.org/docs/)
- [DaFluffyPotato's Tutorials](https://www.youtube.com/c/DaFluffyPotato) - Excellent Youtube tutorials.
- [ClearCode](https://www.youtube.com/c/ClearCode) - Great modern Pygame tutorials.

## Next Steps
1. Make a window appear.
2. Draw a rectangle that moves with arrow keys.
3. Add a "collectible" square that resets position when hit.
4. Try **Pygame Community Edition (`pygame-ce`)** which is a faster fork.
   `pip uninstall pygame && pip install pygame-ce`
