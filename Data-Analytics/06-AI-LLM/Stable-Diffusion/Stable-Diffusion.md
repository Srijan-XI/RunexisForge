# Stable Diffusion

## Introduction

Stable Diffusion is a state-of-the-art text-to-image diffusion model that generates high-quality images from text descriptions. Released in 2022, it has revolutionized AI-generated art by being open-source, efficient enough to run on consumer hardware, and producing photorealistic results.

### What is Stable Diffusion?

Stable Diffusion is a latent diffusion model that can generate detailed images from text prompts. Unlike previous models like DALL-E that required massive compute resources, Stable Diffusion can run on GPUs with as little as 4GB VRAM, democratizing AI image generation.

### Key Features

- **Text-to-Image Generation**: Create images from text descriptions
- **Image-to-Image**: Transform existing images based on prompts
- **Inpainting**: Fill in missing parts of images
- **Outpainting**: Extend images beyond their boundaries
- **ControlNet**: Precise control over composition
- **LoRA Support**: Fine-tuned models for specific styles
- **Open Source**: Free to use and modify
- **Consumer Hardware**: Runs on standard GPUs
- **Fast Generation**: Seconds per image
- **High Quality**: Photorealistic results
- **Community Models**: Thousands of custom models

### Use Cases

- **Digital Art**: Create original artwork
- **Concept Art**: Game and film concept design
- **Product Design**: Visualize product ideas
- **Marketing**: Generate marketing visuals
- **Content Creation**: Social media content
- **Photo Editing**: Advanced image manipulation
- **Architecture**: Architectural visualization
- **Fashion Design**: Clothing and style concepts
- **Education**: Visual learning aids
- **Prototyping**: Quick visual prototypes

### Model Versions

| Version | Release | Key Features |
|---------|---------|--------------|
| **SD 1.4** | Aug 2022 | Initial release, 512×512 |
| **SD 1.5** | Oct 2022 | Improved quality, most popular |
| **SD 2.0** | Nov 2022 | 768×768, new encoder |
| **SD 2.1** | Dec 2022 | Quality improvements |
| **SDXL 1.0** | Jul 2023 | 1024×1024, best quality |
| **SD 3** | 2024 | Latest, multi-modal |

---

## Installation & Setup

### System Requirements

- **GPU**: NVIDIA GPU with 4GB+ VRAM (8GB+ recommended)
- **RAM**: 8GB minimum, 16GB+ recommended
- **Storage**: 10GB+ for models
- **OS**: Windows, Linux, macOS (limited)
- **Python**: 3.10 or higher

### Installation Methods

#### Option 1: Automatic1111 WebUI (Recommended for Beginners)

```bash
# Clone repository
git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git
cd stable-diffusion-webui

# Windows
webui-user.bat

# Linux/Mac
./webui.sh

# Access at http://127.0.0.1:7860
```

#### Option 2: ComfyUI (Advanced Workflows)

```bash
# Clone repository
git clone https://github.com/comfyanonymous/ComfyUI.git
cd ComfyUI

# Install dependencies
pip install -r requirements.txt

# Run
python main.py

# Access at http://127.0.0.1:8188
```

#### Option 3: Diffusers Library (Python Integration)

```bash
# Install
pip install diffusers transformers accelerate torch torchvision

# Optional: xformers for optimization
pip install xformers
```

### Download Models

```bash
# Hugging Face models location
# Windows: C:\Users\<username>\.cache\huggingface\hub
# Linux: ~/.cache/huggingface/hub

# Popular models:
# - runwayml/stable-diffusion-v1-5
# - stabilityai/stable-diffusion-2-1
# - stabilityai/stable-diffusion-xl-base-1.0
```

### Quick Test

```python
from diffusers import StableDiffusionPipeline
import torch

# Load model
model_id = "runwayml/stable-diffusion-v1-5"
pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16)
pipe = pipe.to("cuda")

# Generate image
prompt = "a serene landscape with mountains and a lake at sunset"
image = pipe(prompt).images[0]

# Save
image.save("output.png")
```

---

## Basic Text-to-Image Generation

### Using Diffusers

```python
from diffusers import StableDiffusionPipeline
import torch

# Load pipeline
pipe = StableDiffusionPipeline.from_pretrained(
    "runwayml/stable-diffusion-v1-5",
    torch_dtype=torch.float16
)
pipe = pipe.to("cuda")

# Generate
prompt = "a beautiful garden with colorful flowers, digital art, trending on artstation"
negative_prompt = "blurry, low quality, distorted"

image = pipe(
    prompt=prompt,
    negative_prompt=negative_prompt,
    num_inference_steps=50,
    guidance_scale=7.5,
    width=512,
    height=512
).images[0]

image.save("garden.png")
```

### Key Parameters

```python
# Comprehensive parameter usage
image = pipe(
    prompt="your prompt here",
    negative_prompt="what to avoid",
    num_inference_steps=50,      # More steps = better quality (20-150)
    guidance_scale=7.5,           # How closely to follow prompt (1-20)
    width=512,                    # Image width
    height=512,                   # Image height
    num_images_per_prompt=4,     # Generate multiple images
    generator=torch.manual_seed(42),  # For reproducibility
).images[0]

# Parameter guidelines:
# - num_inference_steps: 20-30 (fast), 50 (balanced), 100+ (quality)
# - guidance_scale: 7-8 (realistic), 10-15 (artistic), 20+ (very strict)
```

---

## Advanced Techniques

### Image-to-Image Generation

```python
from diffusers import StableDiffusionImg2ImgPipeline
from PIL import Image

# Load pipeline
pipe = StableDiffusionImg2ImgPipeline.from_pretrained(
    "runwayml/stable-diffusion-v1-5",
    torch_dtype=torch.float16
)
pipe = pipe.to("cuda")

# Load input image
init_image = Image.open("input.jpg").convert("RGB")
init_image = init_image.resize((512, 512))

# Generate
prompt = "a painting of the same scene in Van Gogh style"
image = pipe(
    prompt=prompt,
    image=init_image,
    strength=0.75,  # How much to change (0.0-1.0)
    guidance_scale=7.5
).images[0]

image.save("output.png")
```

### Inpainting

```python
from diffusers import StableDiffusionInpaintPipeline
from PIL import Image

# Load pipeline
pipe = StableDiffusionInpaintPipeline.from_pretrained(
    "runwayml/stable-diffusion-inpainting",
    torch_dtype=torch.float16
)
pipe = pipe.to("cuda")

# Load image and mask
image = Image.open("photo.jpg").resize((512, 512))
mask = Image.open("mask.jpg").resize((512, 512))  # White = inpaint area

# Inpaint
prompt = "a cat sitting on the chair"
result = pipe(
    prompt=prompt,
    image=image,
    mask_image=mask,
    num_inference_steps=50
).images[0]

result.save("inpainted.png")
```

### ControlNet (Precise Control)

```python
from diffusers import StableDiffusionControlNetPipeline, ControlNetModel
import torch
from PIL import Image
import cv2
import numpy as np

# Load ControlNet (Canny edge detection)
controlnet = ControlNetModel.from_pretrained(
    "lllyasviel/sd-controlnet-canny",
    torch_dtype=torch.float16
)

pipe = StableDiffusionControlNetPipeline.from_pretrained(
    "runwayml/stable-diffusion-v1-5",
    controlnet=controlnet,
    torch_dtype=torch.float16
)
pipe = pipe.to("cuda")

# Prepare control image (edge detection)
image = Image.open("input.jpg")
image = np.array(image)
edges = cv2.Canny(image, 100, 200)
edges = Image.fromarray(edges)

# Generate
prompt = "a beautiful house, professional photo"
result = pipe(
    prompt=prompt,
    image=edges,
    num_inference_steps=50
).images[0]

result.save("controlled_output.png")
```

### LoRA (Low-Rank Adaptation)

```python
from diffusers import StableDiffusionPipeline
import torch

# Load base model
pipe = StableDiffusionPipeline.from_pretrained(
    "runwayml/stable-diffusion-v1-5",
    torch_dtype=torch.float16
)
pipe = pipe.to("cuda")

# Load LoRA weights (example: anime style)
pipe.load_lora_weights("path/to/lora_weights.safetensors")

# Generate with LoRA style
prompt = "a girl in anime style"
image = pipe(prompt, num_inference_steps=50).images[0]
image.save("anime_style.png")

# Unload LoRA
pipe.unload_lora_weights()
```

---

## SDXL (Stable Diffusion XL)

### SDXL Basic Usage

```python
from diffusers import DiffusionPipeline
import torch

# Load SDXL
pipe = DiffusionPipeline.from_pretrained(
    "stabilityai/stable-diffusion-xl-base-1.0",
    torch_dtype=torch.float16,
    use_safetensors=True,
    variant="fp16"
)
pipe = pipe.to("cuda")

# Enable optimizations
pipe.enable_model_cpu_offload()
pipe.enable_vae_slicing()

# Generate (1024x1024)
prompt = "a majestic mountain landscape at golden hour, professional photography"
image = pipe(
    prompt=prompt,
    num_inference_steps=40,
    guidance_scale=7.5
).images[0]

image.save("sdxl_output.png")
```

### SDXL with Refiner

```python
from diffusers import DiffusionPipeline
import torch

# Base model
base = DiffusionPipeline.from_pretrained(
    "stabilityai/stable-diffusion-xl-base-1.0",
    torch_dtype=torch.float16,
    variant="fp16",
    use_safetensors=True
)
base = base.to("cuda")

# Refiner model
refiner = DiffusionPipeline.from_pretrained(
    "stabilityai/stable-diffusion-xl-refiner-1.0",
    torch_dtype=torch.float16,
    variant="fp16",
    use_safetensors=True
)
refiner = refiner.to("cuda")

# Generate with base
prompt = "a futuristic cityscape at night"
image = base(
    prompt=prompt,
    num_inference_steps=40,
    denoising_end=0.8,  # Stop at 80%
    output_type="latent"
).images[0]

# Refine
image = refiner(
    prompt=prompt,
    num_inference_steps=40,
    denoising_start=0.8,  # Start at 80%
    image=image
).images[0]

image.save("refined_output.png")
```

---

## Prompt Engineering

### Effective Prompt Structure

```python
# Good prompt structure:
# [Subject] [Style] [Quality tags] [Camera/lighting]

# Examples:
prompts = [
    # Portrait
    "portrait of a young woman, oil painting, by Rembrandt, dramatic lighting, highly detailed, masterpiece",
    
    # Landscape
    "majestic mountain landscape, sunset, golden hour, cinematic lighting, 4k, trending on artstation",
    
    # Concept art
    "futuristic city, cyberpunk style, neon lights, rain, concept art, digital painting, highly detailed",
    
    # Product photo
    "product photography of a coffee mug, white background, studio lighting, professional, 8k, sharp focus",
    
    # Fantasy
    "dragon flying over castle, fantasy art, epic scale, magical atmosphere, by Greg Rutkowski, artstation"
]

# Negative prompts (what to avoid):
negative_prompts = [
    "blurry, low quality, distorted, deformed",
    "ugly, bad anatomy, extra limbs, text, watermark",
    "low resolution, pixelated, jpeg artifacts",
    "bad art, amateur, poorly drawn"
]
```

### Prompt Weighting

```python
# Emphasize specific parts (Automatic1111 syntax)
weighted_prompts = [
    "(masterpiece:1.4), beautiful landscape",  # Emphasize masterpiece
    "a cat, (fluffy:1.3), cute",               # Emphasize fluffy
    "cityscape, (neon lights:0.8)",            # De-emphasize neon lights
    "[trending on artstation]",                # Alternate syntax
]

# Multiple concepts
prompt = """
a portrait of a woman,
(elegant dress:1.2),
(ocean background:1.1),
sunset lighting,
professional photography,
high detail
"""
```

---

## Optimization Techniques

### Memory Optimization

```python
from diffusers import StableDiffusionPipeline
import torch

pipe = StableDiffusionPipeline.from_pretrained(
    "runwayml/stable-diffusion-v1-5",
    torch_dtype=torch.float16
)

# Enable optimizations
pipe.enable_attention_slicing()           # Reduce memory usage
pipe.enable_vae_slicing()                 # VAE memory optimization
pipe.enable_model_cpu_offload()           # Offload to CPU when not needed

# For very low VRAM (4GB)
pipe.enable_sequential_cpu_offload()      # Aggressive CPU offloading

pipe = pipe.to("cuda")

# Generate
image = pipe("a beautiful sunset").images[0]
```

### Speed Optimization

```python
# Use xformers (faster attention)
pip install xformers

pipe.enable_xformers_memory_efficient_attention()

# Reduce inference steps
image = pipe(prompt, num_inference_steps=20).images[0]  # Faster but lower quality

# Use different scheduler (faster)
from diffusers import DPMSolverMultistepScheduler

pipe.scheduler = DPMSolverMultistepScheduler.from_config(pipe.scheduler.config)
image = pipe(prompt, num_inference_steps=20).images[0]  # Same quality, fewer steps
```

### Batch Generation

```python
# Generate multiple images at once
prompts = [
    "a cat",
    "a dog",
    "a bird",
    "a fish"
]

images = pipe(prompts, num_inference_steps=50).images

for i, image in enumerate(images):
    image.save(f"output_{i}.png")
```

---

## Real-World Applications

### Batch Product Mockups

```python
from diffusers import StableDiffusionPipeline
import torch

pipe = StableDiffusionPipeline.from_pretrained(
    "runwayml/stable-diffusion-v1-5",
    torch_dtype=torch.float16
).to("cuda")

# Generate product variations
base_prompt = "product photography of {}, white background, studio lighting, professional, 8k"

products = ["coffee mug", "water bottle", "backpack", "smartphone case"]
colors = ["red", "blue", "green", "black"]

for product in products:
    for color in colors:
        prompt = base_prompt.format(f"{color} {product}")
        image = pipe(prompt, num_inference_steps=50).images[0]
        image.save(f"{color}_{product.replace(' ', '_')}.png")
        print(f"Generated: {color} {product}")
```

### Social Media Content Generator

```python
import torch
from diffusers import StableDiffusionPipeline
from PIL import Image, ImageDraw, ImageFont

pipe = StableDiffusionPipeline.from_pretrained(
    "runwayml/stable-diffusion-v1-5",
    torch_dtype=torch.float16
).to("cuda")

def create_social_post(topic, aspect_ratio="square"):
    """Generate social media post"""
    # Size presets
    sizes = {
        "square": (1080, 1080),      # Instagram square
        "portrait": (1080, 1350),    # Instagram portrait
        "story": (1080, 1920),       # Instagram story
        "landscape": (1200, 630)     # Facebook landscape
    }
    
    width, height = sizes.get(aspect_ratio, sizes["square"])
    
    # Generate base image
    prompt = f"{topic}, vibrant colors, eye-catching, professional photography, trending"
    negative_prompt = "text, watermark, blurry, low quality"
    
    image = pipe(
        prompt=prompt,
        negative_prompt=negative_prompt,
        width=width,
        height=height,
        num_inference_steps=50
    ).images[0]
    
    return image

# Generate post
post = create_social_post("motivational workspace with laptop and coffee", "square")
post.save("social_post.png")
```

### Style Transfer Service

```python
from diffusers import StableDiffusionImg2ImgPipeline
from PIL import Image
import torch

pipe = StableDiffusionImg2ImgPipeline.from_pretrained(
    "runwayml/stable-diffusion-v1-5",
    torch_dtype=torch.float16
).to("cuda")

def apply_art_style(input_image_path, style, strength=0.75):
    """Apply artistic style to image"""
    styles = {
        "vangogh": "in the style of Van Gogh, starry night, impressionist painting",
        "anime": "anime style, Studio Ghibli, detailed, vibrant colors",
        "watercolor": "watercolor painting, soft colors, artistic",
        "cyberpunk": "cyberpunk style, neon lights, futuristic, digital art",
        "oil": "oil painting, classical art, by old masters, highly detailed"
    }
    
    image = Image.open(input_image_path).convert("RGB")
    image = image.resize((512, 512))
    
    prompt = styles.get(style, style)
    
    result = pipe(
        prompt=prompt,
        image=image,
        strength=strength,
        guidance_scale=7.5,
        num_inference_steps=50
    ).images[0]
    
    return result

# Use
styled_image = apply_art_style("photo.jpg", "vangogh", strength=0.8)
styled_image.save("vangogh_style.png")
```

---

## Troubleshooting

### Common Issues

```python
# Out of memory error
# Solution: Use optimizations
pipe.enable_attention_slicing()
pipe.enable_vae_slicing()
pipe.enable_model_cpu_offload()

# Or reduce image size
image = pipe(prompt, width=384, height=384).images[0]

# Poor quality results
# Solution: Increase inference steps, adjust guidance scale
image = pipe(
    prompt,
    num_inference_steps=100,  # More steps
    guidance_scale=9.0         # Higher guidance
).images[0]

# Not following prompt
# Solution: Use negative prompts, adjust guidance
image = pipe(
    prompt="detailed prompt",
    negative_prompt="what to avoid",
    guidance_scale=12.0
).images[0]

# Slow generation
# Solution: Use xformers, reduce steps, use faster scheduler
pipe.enable_xformers_memory_efficient_attention()
from diffusers import DPMSolverMultistepScheduler
pipe.scheduler = DPMSolverMultistepScheduler.from_config(pipe.scheduler.config)
```

---

## Resources

### Official Resources
- [Stability AI](https://stability.ai/)
- [Hugging Face Diffusers](https://huggingface.co/docs/diffusers)
- [SDXL Paper](https://arxiv.org/abs/2307.01952)

### WebUIs
- [Automatic1111](https://github.com/AUTOMATIC1111/stable-diffusion-webui)
- [ComfyUI](https://github.com/comfyanonymous/ComfyUI)
- [InvokeAI](https://github.com/invoke-ai/InvokeAI)

### Model Resources
- [Civitai](https://civitai.com/) - Custom models & LoRAs
- [Hugging Face Hub](https://huggingface.co/models?pipeline_tag=text-to-image)
- [ControlNet Models](https://huggingface.co/lllyasviel)

### Learning
- [Prompt Engineering Guide](https://stable-diffusion-art.com/prompt-guide/)
- [ControlNet Guide](https://stable-diffusion-art.com/controlnet/)
- [/r/StableDiffusion](https://reddit.com/r/StableDiffusion)

### Community
- [Stable Diffusion Discord](https://discord.gg/stablediffusion)
- [Civitai Community](https://civitai.com/)
- [Hugging Face Forums](https://discuss.huggingface.co/)

---

**Last Updated:** February 2026
