# YOLO (You Only Look Once)

## Introduction

YOLO (You Only Look Once) is a state-of-the-art, real-time object detection algorithm that revolutionized computer vision by treating object detection as a single regression problem. Unlike traditional methods that apply classifiers to multiple regions, YOLO predicts bounding boxes and class probabilities directly from full images in one evaluation.

### What is YOLO?

YOLO is a family of object detection models that achieve unprecedented speed while maintaining high accuracy. The algorithm divides images into a grid and simultaneously predicts bounding boxes and class probabilities for each grid cell, making it extremely fast for real-time applications.

### Key Features

- **Real-Time Detection**: 30-155 FPS depending on model version
- **Single Network**: End-to-end detection in one forward pass
- **Global Context**: Sees entire image during inference
- **High Accuracy**: Competitive mAP (mean Average Precision)
- **Multi-Object Detection**: Detects multiple objects simultaneously
- **Easy Deployment**: Works on edge devices (Jetson, Raspberry Pi)
- **Active Development**: Regular improvements and new versions
- **Open Source**: MIT license (YOLOv8) or GPL (earlier versions)
- **Pre-trained Models**: Models trained on COCO, ImageNet
- **Framework Support**: PyTorch, TensorFlow, ONNX, TensorRT

### YOLO Versions Evolution

| Version | Year | Author | Key Innovation | FPS | mAP |
|---------|------|--------|----------------|-----|-----|
| **YOLOv1** | 2015 | Joseph Redmon | Single-shot detection | 45 | 63.4% |
| **YOLOv2/YOLO9000** | 2016 | Joseph Redmon | Batch normalization, anchor boxes | 67 | 76.8% |
| **YOLOv3** | 2018 | Joseph Redmon | FPN, 3 scales, better small objects | 35 | 57.9% (COCO) |
| **YOLOv4** | 2020 | Alexey Bochkovskiy | CSPDarknet53, Mosaic, SAM | 65 | 43.5% (COCO) |
| **YOLOv5** | 2020 | Ultralytics | PyTorch, easy training, 5 models | 140 | 50.7% |
| **YOLOv6** | 2022 | Meituan | RepVGG, SimOTA | 155 | 52.8% |
| **YOLOv7** | 2022 | WongKinYiu | E-ELAN, more efficient | 161 | 56.8% |
| **YOLOv8** | 2023 | Ultralytics | Anchor-free, new backbone | 130 | 53.9% |
| **YOLOv9** | 2024 | - | GELAN, PGI | 150+ | 55.6% |
| **YOLOv10** | 2024 | - | NMS-free, dual assignments | 160+ | 56.0% |

### Use Cases

- **Autonomous Vehicles**: Pedestrian, vehicle, sign detection
- **Surveillance**: Real-time monitoring, suspicious activity
- **Retail**: Inventory management, shelf monitoring
- **Manufacturing**: Quality control, defect detection
- **Agriculture**: Crop monitoring, disease detection
- **Sports Analytics**: Player tracking, ball tracking
- **Healthcare**: Medical imaging, anomaly detection
- **Robotics**: Object recognition, navigation
- **Wildlife Monitoring**: Animal detection and counting
- **AR/VR**: Real-time object interaction

---

## Installation & Setup

### YOLOv8 (Ultralytics - Recommended)

**Installation:**
```bash
# Install ultralytics package
pip install ultralytics

# Install with extra dependencies
pip install ultralytics[export]

# Verify installation
yolo predict model=yolov8n.pt source='https://ultralytics.com/images/bus.jpg'
```

**Quick Start:**
```python
from ultralytics import YOLO

# Load model
model = YOLO('yolov8n.pt')  # nano
# model = YOLO('yolov8s.pt')  # small
# model = YOLO('yolov8m.pt')  # medium
# model = YOLO('yolov8l.pt')  # large
# model = YOLO('yolov8x.pt')  # extra large

# Predict
results = model('image.jpg')

# Display results
results[0].show()
```

### YOLOv5 (Ultralytics)

**Installation:**
```bash
# Clone repository
git clone https://github.com/ultralytics/yolov5
cd yolov5

# Install requirements
pip install -r requirements.txt

# Download pre-trained weights (automatic on first use)
python detect.py --weights yolov5s.pt --source data/images
```

### YOLOv4 (Darknet)

**Installation (Linux):**
```bash
# Clone Darknet
git clone https://github.com/AlexeyAB/darknet.git
cd darknet

# Build
make

# Download weights
wget https://github.com/AlexeyAB/darknet/releases/download/darknet_yolo_v3_optimal/yolov4.weights

# Test
./darknet detector test cfg/coco.data cfg/yolov4.cfg yolov4.weights data/dog.jpg
```

**Python OpenCV DNN:**
```python
import cv2

# Load YOLO
net = cv2.dnn.readNet('yolov4.weights', 'yolov4.cfg')

# Use CUDA if available
net.setPreferableBackend(cv2.dnn.DNN_BACKEND_CUDA)
net.setPreferableTarget(cv2.dnn.DNN_TARGET_CUDA)
```

---

## YOLOv8 - Comprehensive Guide

### Basic Detection

```python
from ultralytics import YOLO
import cv2

# Load model
model = YOLO('yolov8n.pt')

# Single image prediction
results = model('image.jpg')

# Batch prediction
results = model(['image1.jpg', 'image2.jpg', 'image3.jpg'])

# From numpy array
img = cv2.imread('image.jpg')
results = model(img)

# From PIL Image
from PIL import Image
img = Image.open('image.jpg')
results = model(img)

# From URL
results = model('https://ultralytics.com/images/zidane.jpg')

# Video prediction
results = model('video.mp4')

# Webcam (stream=True for generator)
results = model(source=0, stream=True)
for result in results:
    result.show()
```

### Processing Results

```python
# Get results
results = model('image.jpg')

# Single result
result = results[0]

# Boxes
boxes = result.boxes  # Boxes object
xyxy = boxes.xyxy  # Box coordinates (x1, y1, x2, y2)
conf = boxes.conf  # Confidence scores
cls = boxes.cls  # Class labels

# Get class names
names = result.names

# Iterate through detections
for box in result.boxes:
    class_id = int(box.cls[0])
    confidence = float(box.conf[0])
    bbox = box.xyxy[0].tolist()
    
    print(f"Class: {names[class_id]}")
    print(f"Confidence: {confidence:.2f}")
    print(f"BBox: {bbox}")

# Visualize
annotated = result.plot()  # OpenCV image with annotations
cv2.imshow('YOLOv8', annotated)
cv2.waitKey(0)

# Save results
result.save('output.jpg')
result.save_txt('output.txt')  # Save labels
result.save_crop('crops/')  # Save cropped objects
```

### Custom Inference Parameters

```python
# Confidence threshold
results = model('image.jpg', conf=0.5)

# IOU threshold for NMS
results = model('image.jpg', iou=0.7)

# Image size
results = model('image.jpg', imgsz=640)

# Show labels
results = model('image.jpg', show_labels=False)

# Show confidence
results = model('image.jpg', show_conf=False)

# Specific classes only
results = model('image.jpg', classes=[0, 2])  # person, car

# Max detections
results = model('image.jpg', max_det=100)

# Device selection
results = model('image.jpg', device='cpu')  # or '0' for GPU
results = model('image.jpg', device='cuda:0')

# Half precision (FP16)
results = model('image.jpg', half=True)

# Augmentation during inference
results = model('image.jpg', augment=True)
```

### Real-Time Video Detection

```python
import cv2
from ultralytics import YOLO

# Load model
model = YOLO('yolov8n.pt')

# Open video
cap = cv2.VideoCapture(0)  # Webcam
# cap = cv2.VideoCapture('video.mp4')  # Video file

while True:
    ret, frame = cap.read()
    if not ret:
        break
    
    # Inference
    results = model(frame, stream=True)
    
    # Process results
    for result in results:
        # Get annotated frame
        annotated = result.plot()
        
        # Display
        cv2.imshow('YOLOv8', annotated)
    
    # Exit on 'q'
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
```

### Object Tracking

```python
from ultralytics import YOLO

# Load model
model = YOLO('yolov8n.pt')

# Track objects in video
results = model.track(source='video.mp4', show=True)

# Track with specific tracker
results = model.track(source='video.mp4', tracker='bytetrack.yaml')
# Or 'botsort.yaml'

# Save tracked video
results = model.track(source='video.mp4', save=True)

# Access track IDs
for result in results:
    if result.boxes.id is not None:
        track_ids = result.boxes.id.cpu().numpy()
        for track_id, box in zip(track_ids, result.boxes):
            print(f"Object {track_id}: {box}")
```

---

## Training Custom Models

### Prepare Dataset (YOLO Format)

**Directory Structure:**
```
dataset/
├── images/
│   ├── train/
│   │   ├── img1.jpg
│   │   ├── img2.jpg
│   └── val/
│       ├── img3.jpg
│       ├── img4.jpg
└── labels/
    ├── train/
    │   ├── img1.txt
    │   ├── img2.txt
    └── val/
        ├── img3.txt
        ├── img4.txt
```

**Label Format (YOLO txt):**
```
# class_id center_x center_y width height (normalized 0-1)
0 0.5 0.5 0.3 0.4
1 0.3 0.7 0.2 0.3
```

**Dataset YAML (data.yaml):**
```yaml
# Train/val sets
path: ../dataset  # dataset root dir
train: images/train
val: images/val

# Classes
names:
  0: person
  1: bicycle
  2: car
  3: motorcycle
  # ... add all your classes
```

### Training YOLOv8

```python
from ultralytics import YOLO

# Load pretrained model for transfer learning
model = YOLO('yolov8n.pt')

# Train the model
results = model.train(
    data='data.yaml',
    epochs=100,
    imgsz=640,
    batch=16,
    name='custom_yolov8',
    device=0,  # GPU device
    patience=50,  # Early stopping
    save=True,
    save_period=10,  # Save checkpoint every 10 epochs
    cache=True,  # Cache images for faster training
    pretrained=True,
    optimizer='Adam',  # or 'SGD', 'AdamW'
    lr0=0.01,  # Initial learning rate
    lrf=0.01,  # Final learning rate
    momentum=0.937,
    weight_decay=0.0005,
    warmup_epochs=3,
    warmup_momentum=0.8,
    box=7.5,  # Box loss gain
    cls=0.5,  # Class loss gain
    dfl=1.5,  # DFL loss gain
    hsv_h=0.015,  # HSV-Hue augmentation
    hsv_s=0.7,  # HSV-Saturation augmentation
    hsv_v=0.4,  # HSV-Value augmentation
    degrees=0.0,  # Rotation augmentation
    translate=0.1,  # Translation augmentation
    scale=0.5,  # Scale augmentation
    shear=0.0,  # Shear augmentation
    perspective=0.0,  # Perspective augmentation
    flipud=0.0,  # Flip up-down augmentation
    fliplr=0.5,  # Flip left-right augmentation
    mosaic=1.0,  # Mosaic augmentation
    mixup=0.0  # Mixup augmentation
)

# Evaluate model
metrics = model.val()

# Export model
model.export(format='onnx')  # or 'torchscript', 'tflite', 'coreml', etc.
```

### Training YOLOv5

```bash
# Clone YOLOv5
git clone https://github.com/ultralytics/yolov5
cd yolov5

# Install requirements
pip install -r requirements.txt

# Train
python train.py --img 640 --batch 16 --epochs 100 --data data.yaml --weights yolov5s.pt --cache

# Resume training
python train.py --resume runs/train/exp/weights/last.pt

# Multi-GPU training
python -m torch.distributed.run --nproc_per_node 2 train.py --batch 32 --data data.yaml --weights yolov5s.pt --device 0,1
```

### Fine-tuning Hyperparameters

```python
# Hyperparameter tuning with Optuna
from ultralytics import YOLO

model = YOLO('yolov8n.pt')

# Tune hyperparameters
model.tune(
    data='data.yaml',
    epochs=30,
    iterations=100,
    optimizer='AdamW',
    plots=True,
    save=True
)
```

---

## Advanced Features

### Segmentation (YOLOv8-seg)

```python
from ultralytics import YOLO

# Load segmentation model
model = YOLO('yolov8n-seg.pt')

# Predict
results = model('image.jpg')

# Access masks
for result in results:
    masks = result.masks  # Masks object
    if masks is not None:
        # Get mask data
        mask_data = masks.data  # Binary masks
        
        # Visualize
        annotated = result.plot()
        cv2.imshow('Segmentation', annotated)
        cv2.waitKey(0)
```

### Pose Estimation (YOLOv8-pose)

```python
# Load pose model
model = YOLO('yolov8n-pose.pt')

# Detect keypoints
results = model('person.jpg')

# Access keypoints
for result in results:
    keypoints = result.keypoints  # Keypoints object
    if keypoints is not None:
        # Get keypoint coordinates
        kpts = keypoints.xy  # x, y coordinates
        conf = keypoints.conf  # Confidence scores
        
        # COCO keypoints (17 points)
        # 0: nose, 1-2: eyes, 3-4: ears, 5-6: shoulders,
        # 7-8: elbows, 9-10: wrists, 11-12: hips,
        # 13-14: knees, 15-16: ankles
        
        # Visualize
        annotated = result.plot()
        cv2.imshow('Pose', annotated)
        cv2.waitKey(0)
```

### Classification (YOLOv8-cls)

```python
# Load classification model
model = YOLO('yolov8n-cls.pt')

# Classify image
results = model('image.jpg')

# Get top predictions
for result in results:
    probs = result.probs  # Classification probabilities
    top5 = probs.top5  # Top 5 class indices
    top5conf = probs.top5conf  # Top 5 confidences
    
    print(f"Top prediction: {result.names[probs.top1]}")
    print(f"Confidence: {probs.top1conf:.2f}")
```

### Oriented Bounding Boxes (OBB)

```python
# For rotated object detection
model = YOLO('yolov8n-obb.pt')

# Detect with oriented boxes
results = model('aerial_image.jpg')

# Access OBB
for result in results:
    obb = result.obb  # Oriented bounding boxes
    if obb is not None:
        # Get rotated box coordinates
        xyxyxyxy = obb.xyxyxyxy  # 4 corner points
        conf = obb.conf
        cls = obb.cls
```

---

## Model Export & Deployment

### Export Formats

```python
from ultralytics import YOLO

model = YOLO('yolov8n.pt')

# ONNX (recommended for production)
model.export(format='onnx', dynamic=True, simplify=True)

# TensorRT (fastest on NVIDIA GPUs)
model.export(format='engine', device=0, half=True)

# TorchScript
model.export(format='torchscript')

# CoreML (iOS/macOS)
model.export(format='coreml')

# TFLite (Android/Edge devices)
model.export(format='tflite')

# TensorFlow SavedModel
model.export(format='saved_model')

# OpenVINO (Intel)
model.export(format='openvino')

# PaddlePaddle
model.export(format='paddle')
```

### ONNX Inference

```python
import onnxruntime as ort
import numpy as np
import cv2

# Load ONNX model
session = ort.InferenceSession('yolov8n.onnx')

# Prepare input
img = cv2.imread('image.jpg')
img = cv2.resize(img, (640, 640))
img = img.transpose(2, 0, 1)  # HWC to CHW
img = np.expand_dims(img, axis=0)  # Add batch dimension
img = img.astype(np.float32) / 255.0

# Run inference
outputs = session.run(None, {'images': img})

# Process outputs
predictions = outputs[0]
```

### TensorRT Inference

```python
# Export to TensorRT
model = YOLO('yolov8n.pt')
model.export(format='engine', half=True)  # FP16 for speed

# Load and run TensorRT model
trt_model = YOLO('yolov8n.engine')
results = trt_model('image.jpg')
```

### Edge Deployment (Raspberry Pi)

```bash
# Install lighter dependencies
pip install ultralytics-lite

# Use smaller model
from ultralytics import YOLO
model = YOLO('yolov8n.pt')

# Optimize for CPU
results = model('image.jpg', device='cpu', half=False, imgsz=320)
```

---

## Optimization & Performance

### Speed Optimization

```python
# Use smaller model
model = YOLO('yolov8n.pt')  # Fastest

# Reduce image size
results = model('image.jpg', imgsz=320)  # vs 640

# Half precision (FP16)
results = model('image.jpg', half=True, device=0)

# Batch processing
images = ['img1.jpg', 'img2.jpg', 'img3.jpg']
results = model(images)  # Batch inference

# TensorRT for maximum speed
model.export(format='engine', half=True)
trt_model = YOLO('yolov8n.engine')
```

### Accuracy Optimization

```python
# Use larger model
model = YOLO('yolov8x.pt')  # Most accurate

# Increase image size
results = model('image.jpg', imgsz=1280)

# Test-time augmentation
results = model('image.jpg', augment=True)

# Lower confidence threshold
results = model('image.jpg', conf=0.25)

# Ensemble multiple models
models = [YOLO('yolov8l.pt'), YOLO('yolov8x.pt')]
all_results = [m('image.jpg') for m in models]
```

### Benchmarking

```python
from ultralytics import YOLO
import time

model = YOLO('yolov8n.pt')

# Warmup
for _ in range(10):
    model('image.jpg')

# Benchmark
times = []
for _ in range(100):
    start = time.time()
    results = model('image.jpg')
    times.append(time.time() - start)

avg_time = sum(times) / len(times)
fps = 1 / avg_time

print(f"Average inference time: {avg_time*1000:.2f} ms")
print(f"FPS: {fps:.1f}")
```

---

## Real-World Applications

### People Counter

```python
from ultralytics import YOLO
import cv2

model = YOLO('yolov8n.pt')
cap = cv2.VideoCapture('video.mp4')

# Counting line
line_y = 300

people_count = 0
tracked_ids = set()

while True:
    ret, frame = cap.read()
    if not ret:
        break
    
    # Track people
    results = model.track(frame, classes=[0], persist=True)  # class 0 = person
    
    if results[0].boxes.id is not None:
        boxes = results[0].boxes.xyxy.cpu().numpy()
        track_ids = results[0].boxes.id.cpu().numpy()
        
        for box, track_id in zip(boxes, track_ids):
            x1, y1, x2, y2 = box
            center_y = (y1 + y2) / 2
            
            # Check if crossed line
            if center_y > line_y and track_id not in tracked_ids:
                people_count += 1
                tracked_ids.add(track_id)
    
    # Draw counting line
    cv2.line(frame, (0, line_y), (frame.shape[1], line_y), (0, 255, 0), 2)
    cv2.putText(frame, f'Count: {people_count}', (10, 50), 
                cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
    
    cv2.imshow('People Counter', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
```

### Social Distancing Monitor

```python
from ultralytics import YOLO
import cv2
import numpy as np

def calculate_distance(box1, box2):
    """Calculate Euclidean distance between box centers"""
    center1 = ((box1[0] + box1[2]) / 2, (box1[1] + box1[3]) / 2)
    center2 = ((box2[0] + box2[2]) / 2, (box2[1] + box2[3]) / 2)
    return np.sqrt((center1[0] - center2[0])**2 + (center1[1] - center2[1])**2)

model = YOLO('yolov8n.pt')
cap = cv2.VideoCapture(0)

MIN_DISTANCE = 150  # pixels (adjust based on camera)

while True:
    ret, frame = cap.read()
    if not ret:
        break
    
    results = model(frame, classes=[0])  # Detect only people
    
    if len(results[0].boxes) > 0:
        boxes = results[0].boxes.xyxy.cpu().numpy()
        
        violations = []
        for i in range(len(boxes)):
            for j in range(i + 1, len(boxes)):
                dist = calculate_distance(boxes[i], boxes[j])
                if dist < MIN_DISTANCE:
                    violations.append((i, j))
        
        # Draw boxes
        for idx, box in enumerate(boxes):
            x1, y1, x2, y2 = map(int, box)
            
            # Red if violating, green otherwise
            color = (0, 0, 255)  # Red
            for v in violations:
                if idx in v:
                    color = (0, 0, 255)
                    break
            else:
                color = (0, 255, 0)  # Green
            
            cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)
        
        cv2.putText(frame, f'Violations: {len(violations)}', (10, 30),
                   cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)
    
    cv2.imshow('Social Distancing', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
```

---

## Troubleshooting

### Common Issues

**Out of Memory:**
```python
# Reduce batch size
model.train(data='data.yaml', batch=8)  # instead of 16

# Reduce image size
model.train(data='data.yaml', imgsz=416)  # instead of 640

# Use smaller model
model = YOLO('yolov8n.pt')  # instead of yolov8x.pt
```

**Slow Inference:**
```python
# Use GPU
results = model('image.jpg', device=0)

# Use TensorRT
model.export(format='engine')

# Reduce image size
results = model('image.jpg', imgsz=320)
```

**Poor Detection:**
```python
# Lower confidence threshold
results = model('image.jpg', conf=0.25)

# Use larger model
model = YOLO('yolov8x.pt')

# Increase image size
results = model('image.jpg', imgsz=1280)

# Train on custom data
model.train(data='data.yaml', epochs=100)
```

---

## Resources

### Official Documentation
- [YOLOv8 Docs](https://docs.ultralytics.com/)
- [YOLOv5 Docs](https://docs.ultralytics.com/yolov5/)
- [Darknet](https://github.com/AlexeyAB/darknet)

### Papers
- [YOLOv1 Paper](https://arxiv.org/abs/1506.02640)
- [YOLOv3 Paper](https://arxiv.org/abs/1804.02767)
- [YOLOv4 Paper](https://arxiv.org/abs/2004.10934)
- [YOLOv7 Paper](https://arxiv.org/abs/2207.02696)

### Community & Support
- [Ultralytics GitHub](https://github.com/ultralytics/ultralytics)
- [Ultralytics Discord](https://discord.com/invite/ultralytics)
- [Roboflow Universe](https://universe.roboflow.com/) - Pre-trained models

### Datasets
- [COCO Dataset](https://cocodataset.org/)
- [Open Images](https://storage.googleapis.com/openimages/web/index.html)
- [Roboflow](https://roboflow.com/) - Custom dataset tools

---

**Last Updated:** February 2026
