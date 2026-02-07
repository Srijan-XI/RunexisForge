# OpenCV (Open Source Computer Vision Library)

## Introduction

OpenCV is the most popular open-source computer vision and machine learning software library. It contains over 2500 optimized algorithms for real-time computer vision applications, image processing, video analysis, and machine learning.

### What is OpenCV?

OpenCV (Open Source Computer Vision Library) is a library of programming functions mainly for real-time computer vision. Originally developed by Intel,

 it is now supported by Willow Garage and Itseez. The library is cross-platform and free for use under the open-source Apache 2 License.

### Key Features

- **2500+ Algorithms**: Comprehensive computer vision algorithms
- **Real-Time Processing**: Optimized for real-time applications
- **Multi-Language**: C++, Python, Java, MATLAB interfaces
- **Cross-Platform**: Windows, Linux, macOS, Android, iOS
- **GPU Acceleration**: CUDA and OpenCL support
- **Deep Learning**: DNN module for neural network inference
- **Video I/O**: Camera capture and video file processing
- **GUI Tools**: Image display, trackbars, mouse events
- **Image Processing**: Filtering, transforms, feature detection
- **Object Detection**: Face, eye, pedestrian detection

### Use Cases

- **Image Processing**: Filtering, enhancement, transformations
- **Object Detection**: Face detection, vehicle detection
- **Object Tracking**: Track objects across video frames
- **Facial Recognition**: Identity verification systems
- **Augmented Reality**: AR applications and filters
- **Medical Imaging**: X-ray, MRI, CT scan analysis
- **Robotics**: Robot vision and navigation
- **Autonomous Vehicles**: Lane detection, obstacle detection
- **OCR**: Optical character recognition
- **Video Surveillance**: Motion detection, activity recognition

### OpenCV Modules

| Module | Description |
|--------|-------------|
| **core** | Core functionality, basic structures |
| **imgproc** | Image processing (filtering, transforms) |
| **highgui** | GUI, image/video I/O |
| **video** | Video analysis (motion, tracking) |
| **calib3d** | Camera calibration, 3D reconstruction |
| **features2d** | Feature detection and description |
| **objdetect** | Object detection (Haar, HOG) |
| **dnn** | Deep neural networks module |
| **ml** | Machine learning algorithms |
| **photo** | Computational photography |
| **stitching** | Image stitching (panoramas) |
| **videoio** | Video capture and encoding |

---

## Installation & Setup

### Python Installation

**Using pip:**
```bash
# Install OpenCV
pip install opencv-python

# Install with extra modules (contrib)
pip install opencv-contrib-python

# Verify installation
python -c "import cv2; print(cv2.__version__)"
```

**Using conda:**
```bash
# Install from conda-forge
conda install -c conda-forge opencv

# Verify
python -c "import cv2; print(cv2.__version__)"
```

### C++ Installation

**Ubuntu/Debian:**
```bash
# Install dependencies
sudo apt update
sudo apt install build-essential cmake git pkg-config
sudo apt install libgtk-3-dev libavcodec-dev libavformat-dev libswscale-dev

# Clone and build
git clone https://github.com/opencv/opencv.git
cd opencv
mkdir build && cd build
cmake -D CMAKE_BUILD_TYPE=RELEASE -D CMAKE_INSTALL_PREFIX=/usr/local ..
make -j8
sudo make install
```

**macOS:**
```bash
# Using Homebrew
brew install opencv

# Or build from source
brew install cmake pkg-config
brew install jpeg libpng libtiff openexr
brew install eigen tbb
```

**Windows:**
```bash
# Download pre-built binaries from opencv.org
# Or use vcpkg
vcpkg install opencv4
```

### GPU Support (CUDA)

```bash
# Build with CUDA support
cmake -D CMAKE_BUILD_TYPE=RELEASE \
      -D CMAKE_INSTALL_PREFIX=/usr/local \
      -D WITH_CUDA=ON \
      -D CUDA_ARCH_BIN=7.5 \
      -D WITH_CUDNN=ON \
      -D OPENCV_DNN_CUDA=ON \
      ..
make -j8
sudo make install
```

---

## Image Basics

### Reading and Displaying Images

```python
import cv2
import numpy as np

# Read image
img = cv2.imread('image.jpg')  # BGR format
img_rgb = cv2.imread('image.jpg', cv2.IMREAD_COLOR)  # Color
img_gray = cv2.imread('image.jpg', cv2.IMREAD_GRAYSCALE)  # Grayscale

# Display image
cv2.imshow('Image', img)
cv2.waitKey(0)  # Wait for key press
cv2.destroyAllWindows()

# Image properties
print(f"Shape: {img.shape}")  # (height, width, channels)
print(f"Size: {img.size}")    # Total pixels
print(f"Dtype: {img.dtype}")  # Data type

# Save image
cv2.imwrite('output.jpg', img)
```

### Color Space Conversions

```python
# BGR to RGB
img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

# BGR to Grayscale
img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# BGR to HSV (Hue, Saturation, Value)
img_hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

# BGR to LAB
img_lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)

# Common color spaces
# cv2.COLOR_BGR2RGB, cv2.COLOR_BGR2GRAY, cv2.COLOR_BGR2HSV
# cv2.COLOR_RGB2BGR, cv2.COLOR_GRAY2BGR, cv2.COLOR_HSV2BGR
```

### Image Manipulation

```python
# Accessing pixels
pixel = img[100, 100]  # BGR value at (y=100, x=100)
blue = img[100, 100, 0]
green = img[100, 100, 1]
red = img[100, 100, 2]

# Modifying pixels
img[100, 100] = [255, 255, 255]  # Set to white

# Region of Interest (ROI)
roi = img[100:200, 150:250]  # Crop region

# Splitting channels
b, g, r = cv2.split(img)

# Merging channels
img_merged = cv2.merge([b, g, r])

# Resizing
resized = cv2.resize(img, (640, 480))  # Fixed size
resized = cv2.resize(img, None, fx=0.5, fy=0.5)  # Scale factor

# Rotation
height, width = img.shape[:2]
center = (width // 2, height // 2)
matrix = cv2.getRotationMatrix2D(center, 45, 1.0)  # 45 degrees
rotated = cv2.warpAffine(img, matrix, (width, height))

# Flipping
flipped_h = cv2.flip(img, 1)  # Horizontal flip
flipped_v = cv2.flip(img, 0)  # Vertical flip
flipped_both = cv2.flip(img, -1)  # Both axes
```

---

## Image Processing

### Filtering and Blurring

```python
import cv2
import numpy as np

# Gaussian Blur (reduce noise)
blurred = cv2.GaussianBlur(img, (5, 5), 0)

# Median Blur (remove salt-and-pepper noise)
median = cv2.medianBlur(img, 5)

# Bilateral Filter (edge-preserving smoothing)
bilateral = cv2.bilateralFilter(img, 9, 75, 75)

# Average Blur
avg_blur = cv2.blur(img, (5, 5))

# Custom kernel filtering
kernel = np.ones((5, 5), np.float32) / 25
custom_filter = cv2.filter2D(img, -1, kernel)
```

### Edge Detection

```python
# Canny Edge Detection
edges = cv2.Canny(img_gray, threshold1=100, threshold2=200)

# Sobel Edge Detection
sobelx = cv2.Sobel(img_gray, cv2.CV_64F, 1, 0, ksize=5)  # X direction
sobely = cv2.Sobel(img_gray, cv2.CV_64F, 0, 1, ksize=5)  # Y direction
sobel = cv2.magnitude(sobelx, sobely)

# Laplacian Edge Detection
laplacian = cv2.Laplacian(img_gray, cv2.CV_64F)

# Scharr Edge Detection
scharrx = cv2.Scharr(img_gray, cv2.CV_64F, 1, 0)
scharry = cv2.Scharr(img_gray, cv2.CV_64F, 0, 1)
```

### Thresholding

```python
# Simple threshold
ret, thresh = cv2.threshold(img_gray, 127, 255, cv2.THRESH_BINARY)

# Inverted threshold
ret, thresh_inv = cv2.threshold(img_gray, 127, 255, cv2.THRESH_BINARY_INV)

# Adaptive threshold (better for varying lighting)
adaptive_thresh = cv2.adaptiveThreshold(
    img_gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, 
    cv2.THRESH_BINARY, 11, 2
)

# Otsu's threshold (automatic threshold value)
ret, otsu = cv2.threshold(
    img_gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU
)
```

### Morphological Operations

```python
# Create kernel
kernel = np.ones((5, 5), np.uint8)

# Erosion (shrink white regions)
erosion = cv2.erode(img, kernel, iterations=1)

# Dilation (expand white regions)
dilation = cv2.dilate(img, kernel, iterations=1)

# Opening (erosion followed by dilation - remove noise)
opening = cv2.morphologyEx(img, cv2.MORPH_OPEN, kernel)

# Closing (dilation followed by erosion - fill holes)
closing = cv2.morphologyEx(img, cv2.MORPH_CLOSE, kernel)

# Morphological Gradient (outline)
gradient = cv2.morphologyEx(img, cv2.MORPH_GRADIENT, kernel)

# Top Hat (difference between input and opening)
tophat = cv2.morphologyEx(img, cv2.MORPH_TOPHAT, kernel)

# Black Hat (difference between closing and input)
blackhat = cv2.morphologyEx(img, cv2.MORPH_BLACKHAT, kernel)
```

### Image Transformations

```python
# Affine transformation
pts1 = np.float32([[50,50], [200,50], [50,200]])
pts2 = np.float32([[10,100], [200,50], [100,250]])
matrix = cv2.getAffineTransform(pts1, pts2)
affine = cv2.warpAffine(img, matrix, (width, height))

# Perspective transformation
pts1 = np.float32([[56,65], [368,52], [28,387], [389,390]])
pts2 = np.float32([[0,0], [300,0], [0,300], [300,300]])
matrix = cv2.getPerspectiveTransform(pts1, pts2)
perspective = cv2.warpPerspective(img, matrix, (300, 300))
```

---

## Feature Detection

### Corner Detection

```python
# Harris Corner Detection
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
gray = np.float32(gray)
dst = cv2.cornerHarris(gray, blockSize=2, ksize=3, k=0.04)

# Dilate for marking corners
dst = cv2.dilate(dst, None)
img[dst > 0.01 * dst.max()] = [0, 0, 255]  # Mark corners in red

# Shi-Tomasi Corner Detection (Good Features to Track)
corners = cv2.goodFeaturesToTrack(
    gray, maxCorners=100, qualityLevel=0.01, minDistance=10
)

for corner in corners:
    x, y = corner.ravel()
    cv2.circle(img, (int(x), int(y)), 3, (0, 255, 0), -1)
```

### SIFT (Scale-Invariant Feature Transform)

```python
# Create SIFT detector
sift = cv2.SIFT_create()

# Detect keypoints and compute descriptors
keypoints, descriptors = sift.detectAndCompute(gray, None)

# Draw keypoints
img_sift = cv2.drawKeypoints(
    img, keypoints, None, 
    flags=cv2.DRAW_MATCHES_FLAGS_DRAW_RICH_KEYPOINTS
)

print(f"Found {len(keypoints)} keypoints")
```

### ORB (Oriented FAST and Rotated BRIEF)

```python
# Create ORB detector
orb = cv2.ORB_create(nfeatures=1000)

# Detect and compute
keypoints, descriptors = orb.detectAndCompute(gray, None)

# Draw keypoints
img_orb = cv2.drawKeypoints(img, keypoints, None, color=(0, 255, 0))
```

### Feature Matching

```python
# Load two images
img1 = cv2.imread('image1.jpg', 0)
img2 = cv2.imread('image2.jpg', 0)

# Detect features
orb = cv2.ORB_create()
kp1, des1 = orb.detectAndCompute(img1, None)
kp2, des2 = orb.detectAndCompute(img2, None)

# BFMatcher (Brute Force Matcher)
bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
matches = bf.match(des1, des2)
matches = sorted(matches, key=lambda x: x.distance)

# Draw matches
img_matches = cv2.drawMatches(
    img1, kp1, img2, kp2, matches[:10], None, 
    flags=cv2.DrawMatchesFlags_NOT_DRAW_SINGLE_POINTS
)

# FLANN Matcher (faster for large datasets)
FLANN_INDEX_LSH = 6
index_params = dict(algorithm=FLANN_INDEX_LSH, table_number=6, 
                   key_size=12, multi_probe_level=1)
search_params = dict(checks=50)

flann = cv2.FlannBasedMatcher(index_params, search_params)
matches = flann.knnMatch(des1, des2, k=2)

# Ratio test
good_matches = []
for m, n in matches:
    if m.distance < 0.7 * n.distance:
        good_matches.append(m)
```

---

## Object Detection

### Haar Cascade Classifiers

```python
# Load pre-trained cascade
face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
)
eye_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + 'haarcascade_eye.xml'
)

# Detect faces
img = cv2.imread('people.jpg')
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

faces = face_cascade.detectMultiScale(
    gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30)
)

# Draw rectangles around faces
for (x, y, w, h) in faces:
    cv2.rectangle(img, (x, y), (x+w, y+h), (255, 0, 0), 2)
    
    # Detect eyes within face ROI
    roi_gray = gray[y:y+h, x:x+w]
    roi_color = img[y:y+h, x:x+w]
    
    eyes = eye_cascade.detectMultiScale(roi_gray)
    for (ex, ey, ew, eh) in eyes:
        cv2.rectangle(roi_color, (ex, ey), (ex+ew, ey+eh), (0, 255, 0), 2)

cv2.imshow('Faces', img)
cv2.waitKey(0)
```

### HOG (Histogram of Oriented Gradients) Pedestrian Detection

```python
# Initialize HOG descriptor for person detection
hog = cv2.HOGDescriptor()
hog.setSVMDetector(cv2.HOGDescriptor_getDefaultPeopleDetector())

# Detect people
boxes, weights = hog.detectMultiScale(
    img, winStride=(8, 8), padding=(4, 4), scale=1.05
)

# Draw bounding boxes
for (x, y, w, h) in boxes:
    cv2.rectangle(img, (x, y), (x+w, y+h), (0, 255, 0), 2)
```

### DNN Module - Deep Learning

```python
# Load pre-trained deep learning model
# Example: MobileNet SSD for object detection

# Load model
net = cv2.dnn.readNetFromCaffe('deploy.prototxt', 'mobilenet.caffemodel')

# Or TensorFlow model
# net = cv2.dnn.readNetFromTensorflow('frozen_inference_graph.pb', 'graph.pbtxt')

# Prepare image
blob = cv2.dnn.blobFromImage(
    img, scalefactor=0.007843, size=(300, 300), mean=(127.5, 127.5, 127.5)
)

# Set input and forward pass
net.setInput(blob)
detections = net.forward()

# Process detections
for i in range(detections.shape[2]):
    confidence = detections[0, 0, i, 2]
    
    if confidence > 0.5:
        box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
        (x1, y1, x2, y2) = box.astype("int")
        cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
```

### YOLO Integration

```python
# Load YOLO
net = cv2.dnn.readNet('yolov3.weights', 'yolov3.cfg')
layer_names = net.getLayerNames()
output_layers = [layer_names[i - 1] for i in net.getUnconnectedOutLayers()]

# Load class names
with open('coco.names', 'r') as f:
    classes = [line.strip() for line in f.readlines()]

# Detect objects
blob = cv2.dnn.blobFromImage(img, 0.00392, (416, 416), (0, 0, 0), True, crop=False)
net.setInput(blob)
outputs = net.forward(output_layers)

# Process outputs
boxes, confidences, class_ids = [], [], []

for output in outputs:
    for detection in output:
        scores = detection[5:]
        class_id = np.argmax(scores)
        confidence = scores[class_id]
        
        if confidence > 0.5:
            center_x = int(detection[0] * width)
            center_y = int(detection[1] * height)
            w = int(detection[2] * width)
            h = int(detection[3] * height)
            
            x = int(center_x - w / 2)
            y = int(center_y - h / 2)
            
            boxes.append([x, y, w, h])
            confidences.append(float(confidence))
            class_ids.append(class_id)

# Non-maximum suppression
indexes = cv2.dnn.NMSBoxes(boxes, confidences, 0.5, 0.4)

# Draw bounding boxes
for i in range(len(boxes)):
    if i in indexes:
        x, y, w, h = boxes[i]
        label = str(classes[class_ids[i]])
        cv2.rectangle(img, (x, y), (x+w, y+h), (0, 255, 0), 2)
        cv2.putText(img, label, (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
```

---

## Video Processing

### Video Capture

```python
# Capture from webcam
cap = cv2.VideoCapture(0)

# Capture from video file
cap = cv2.VideoCapture('video.mp4')

# Check if opened
if not cap.isOpened():
    print("Cannot open camera")
    exit()

while True:
    # Read frame
    ret, frame = cap.read()
    
    if not ret:
        print("Can't receive frame")
        break
    
    # Process frame
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    
    # Display
    cv2.imshow('Frame', gray)
    
    # Exit on 'q' key
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
```

### Video Writing

```python
# Define codec and create VideoWriter
fourcc = cv2.VideoWriter_fourcc(*'XVID')
out = cv2.VideoWriter('output.avi', fourcc, 20.0, (640, 480))

cap = cv2.VideoCapture(0)

while cap.isOpened():
    ret, frame = cap.read()
    
    if ret:
        # Process frame
        frame = cv2.flip(frame, 0)
        
        # Write frame
        out.write(frame)
        
        cv2.imshow('Frame', frame)
        
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    else:
        break

cap.release()
out.release()
cv2.destroyAllWindows()
```

### Object Tracking

```python
# Initialize tracker
tracker = cv2.TrackerKCF_create()  # KCF tracker
# Other options: TrackerMIL, TrackerBoosting, TrackerTLD, TrackerMedianFlow

cap = cv2.VideoCapture('video.mp4')
ret, frame = cap.read()

# Select ROI for tracking
bbox = cv2.selectROI('Frame', frame, False)
tracker.init(frame, bbox)

while True:
    ret, frame = cap.read()
    if not ret:
        break
    
    # Update tracker
    success, bbox = tracker.update(frame)
    
    if success:
        # Draw bounding box
        x, y, w, h = [int(v) for v in bbox]
        cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)
    else:
        cv2.putText(frame, "Lost", (100, 80), cv2.FONT_HERSHEY_SIMPLEX, 0.75, (0, 0, 255), 2)
    
    cv2.imshow('Tracking', frame)
    
    if cv2.waitKey(30) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
```

### Background Subtraction

```python
# Create background subtractor
back_sub = cv2.createBackgroundSubtractorMOG2(detectShadows=True)
# Or: cv2.createBackgroundSubtractorKNN()

cap = cv2.VideoCapture('video.mp4')

while True:
    ret, frame = cap.read()
    if not ret:
        break
    
    # Apply background subtraction
    fg_mask = back_sub.apply(frame)
    
    # Display
    cv2.imshow('Frame', frame)
    cv2.imshow('Foreground Mask', fg_mask)
    
    if cv2.waitKey(30) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
```

---

## Advanced Topics

### Camera Calibration

```python
import numpy as np
import cv2
import glob

# Prepare object points
objp = np.zeros((6*7, 3), np.float32)
objp[:,:2] = np.mgrid[0:7, 0:6].T.reshape(-1, 2)

objpoints = []  # 3D points in real world
imgpoints = []  # 2D points in image plane

# Find chessboard corners in calibration images
images = glob.glob('calibration/*.jpg')

for fname in images:
    img = cv2.imread(fname)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    ret, corners = cv2.findChessboardCorners(gray, (7, 6), None)
    
    if ret:
        objpoints.append(objp)
        imgpoints.append(corners)
        
        # Draw corners
        cv2.drawChessboardCorners(img, (7, 6), corners, ret)

# Calibrate camera
ret, mtx, dist, rvecs, tvecs = cv2.calibrateCamera(
    objpoints, imgpoints, gray.shape[::-1], None, None
)

# Undistort image
img = cv2.imread('distorted.jpg')
h, w = img.shape[:2]
newcameramtx, roi = cv2.getOptimalNewCameraMatrix(mtx, dist, (w, h), 1, (w, h))
undist = cv2.undistort(img, mtx, dist, None, newcameramtx)
```

### Panorama Stitching

```python
# Load images
images = []
for i in range(1, 4):
    img = cv2.imread(f'pano{i}.jpg')
    images.append(img)

# Create stitcher
stitcher = cv2.Stitcher_create()

# Stitch images
status, pano = stitcher.stitch(images)

if status == cv2.Stitcher_OK:
    cv2.imwrite('panorama.jpg', pano)
else:
    print("Stitching failed")
```

### Optical Flow

```python
# Lucas-Kanade Optical Flow
cap = cv2.VideoCapture('video.mp4')
ret, old_frame = cap.read()
old_gray = cv2.cvtColor(old_frame, cv2.COLOR_BGR2GRAY)

# Detect good features to track
p0 = cv2.goodFeaturesToTrack(old_gray, mask=None, maxCorners=100, 
                              qualityLevel=0.3, minDistance=7, blockSize=7)

# Create mask for drawing
mask = np.zeros_like(old_frame)

while True:
    ret, frame = cap.read()
    if not ret:
        break
    
    frame_gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    
    # Calculate optical flow
    p1, st, err = cv2.calcOpticalFlowPyrLK(old_gray, frame_gray, p0, None)
    
    # Select good points
    good_new = p1[st==1]
    good_old = p0[st==1]
    
    # Draw tracks
    for i, (new, old) in enumerate(zip(good_new, good_old)):
        a, b = new.ravel()
        c, d = old.ravel()
        mask = cv2.line(mask, (int(a), int(b)), (int(c), int(d)), (0, 255, 0), 2)
        frame = cv2.circle(frame, (int(a), int(b)), 5, (0, 0, 255), -1)
    
    img = cv2.add(frame, mask)
    cv2.imshow('Optical Flow', img)
    
    # Update
    old_gray = frame_gray.copy()
    p0 = good_new.reshape(-1, 1, 2)
    
    if cv2.waitKey(30) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
```

---

## Real-World Examples

### Example 1: Document Scanner

```python
import cv2
import numpy as np

def order_points(pts):
    """Order points in top-left, top-right, bottom-right, bottom-left"""
    rect = np.zeros((4, 2), dtype="float32")
    s = pts.sum(axis=1)
    rect[0] = pts[np.argmin(s)]
    rect[2] = pts[np.argmax(s)]
    diff = np.diff(pts, axis=1)
    rect[1] = pts[np.argmin(diff)]
    rect[3] = pts[np.argmax(diff)]
    return rect

def scan_document(image):
    # Resize for processing
    ratio = image.shape[0] / 500.0
    orig = image.copy()
    image = cv2.resize(image, (int(image.shape[1] / ratio), 500))
    
    # Convert to grayscale and blur
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    edged = cv2.Canny(blurred, 75, 200)
    
    # Find contours
    contours, _ = cv2.findContours(edged.copy(), cv2.RETR_LIST, cv2.CHAIN_APPROX_SIMPLE)
    contours = sorted(contours, key=cv2.contourArea, reverse=True)[:5]
    
    # Find document contour
    for c in contours:
        peri = cv2.arcLength(c, True)
        approx = cv2.approxPolyDP(c, 0.02 * peri, True)
        
        if len(approx) == 4:
            screen_cnt = approx
            break
    
    # Apply perspective transform
    pts = screen_cnt.reshape(4, 2) * ratio
    rect = order_points(pts)
    
    (tl, tr, br, bl) = rect
    widthA = np.sqrt(((br[0] - bl[0]) ** 2) + ((br[1] - bl[1]) ** 2))
    widthB = np.sqrt(((tr[0] - tl[0]) ** 2) + ((tr[1] - tl[1]) ** 2))
    maxWidth = max(int(widthA), int(widthB))
    
    heightA = np.sqrt(((tr[0] - br[0]) ** 2) + ((tr[1] - br[1]) ** 2))
    heightB = np.sqrt(((tl[0] - bl[0]) ** 2) + ((tl[1] - bl[1]) ** 2))
    maxHeight = max(int(heightA), int(heightB))
    
    dst = np.array([
        [0, 0],
        [maxWidth - 1, 0],
        [maxWidth - 1, maxHeight - 1],
        [0, maxHeight - 1]], dtype="float32")
    
    M = cv2.getPerspectiveTransform(rect, dst)
    warped = cv2.warpPerspective(orig, M, (maxWidth, maxHeight))
    
    return warped

# Use the scanner
image = cv2.imread('document.jpg')
scanned = scan_document(image)
cv2.imwrite('scanned.jpg', scanned)
```

### Example 2: License Plate Detection

```python
def detect_license_plate(img):
    # Convert to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Apply bilateral filter for noise reduction
    filtered = cv2.bilateralFilter(gray, 11, 17, 17)
    
    # Edge detection
    edged = cv2.Canny(filtered, 30, 200)
    
    # Find contours
    contours, _ = cv2.findContours(edged.copy(), cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    contours = sorted(contours, key=cv2.contourArea, reverse=True)[:10]
    
    # Find rectangular contour
    plate_contour = None
    for contour in contours:
        perimeter = cv2.arcLength(contour, True)
        approx = cv2.approxPolyDP(contour, 0.018 * perimeter, True)
        
        if len(approx) == 4:
            plate_contour = approx
            break
    
    if plate_contour is not None:
        # Draw contour
        cv2.drawContours(img, [plate_contour], -1, (0, 255, 0), 3)
        
        # Extract ROI
        mask = np.zeros(gray.shape, np.uint8)
        cv2.drawContours(mask, [plate_contour], 0, 255, -1)
        plate_region = cv2.bitwise_and(img, img, mask=mask)
        
        return img, plate_region
    
    return img, None

# Use the detector
img = cv2.imread('car.jpg')
result, plate = detect_license_plate(img)
cv2.imshow('Result', result)
if plate is not None:
    cv2.imshow('Plate', plate)
cv2.waitKey(0)
```

---

## Performance Optimization

### Using GPU (CUDA)

```python
# Upload image to GPU
gpu_img = cv2.cuda_GpuMat()
gpu_img.upload(img)

# GPU operations
gpu_gray = cv2.cuda.cvtColor(gpu_img, cv2.COLOR_BGR2GRAY)
gpu_blurred = cv2.cuda.createGaussianFilter(
    cv2.CV_8UC1, cv2.CV_8UC1, (5, 5), 0
).apply(gpu_gray)

# Download result
result = gpu_blurred.download()
```

### Parallel Processing

```python
import multiprocessing as mp
from functools import partial

def process_frame(frame_data, function):
    idx, frame = frame_data
    return idx, function(frame)

def parallel_video_processing(video_path, process_func, num_workers=4):
    cap = cv2.VideoCapture(video_path)
    frames = []
    
    # Read all frames
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        frames.append(frame)
    
    cap.release()
    
    # Process in parallel
    with mp.Pool(num_workers) as pool:
        results = pool.map(
            partial(process_frame, function=process_func),
            enumerate(frames)
        )
    
    # Sort by index
    results = sorted(results, key=lambda x: x[0])
    processed_frames = [frame for _, frame in results]
    
    return processed_frames
```

---

## Resources

### Official Documentation
- [OpenCV Documentation](https://docs.opencv.org/)
- [OpenCV Python Tutorials](https://docs.opencv.org/4.x/d6/d00/tutorial_py_root.html)
- [OpenCV C++ Tutorials](https://docs.opencv.org/4.x/d9/df8/tutorial_root.html)

### Learning Resources
- [PyImageSearch](https://pyimagesearch.com/) - Computer vision tutorials
- [LearnOpenCV](https://learnopencv.com/) - OpenCV tutorials and courses
- [OpenCV GitHub](https://github.com/opencv/opencv)

### Pre-trained Models
- [OpenCV Zoo](https://github.com/opencv/opencv_zoo) - Model zoo
- [OpenCV DNN Models](https://github.com/opencv/opencv/wiki/TensorFlow-Object-Detection-API)

### Community
- [OpenCV Forum](https://forum.opencv.org/)
- [Stack Overflow - OpenCV](https://stackoverflow.com/questions/tagged/opencv)

---

**Last Updated:** February 2026
