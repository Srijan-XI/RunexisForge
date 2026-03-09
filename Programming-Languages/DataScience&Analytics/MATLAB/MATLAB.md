# 📊 MATLAB

> *"MATLAB: The Language of Technical Computing"*

---

## Table of Contents

1. [Introduction](#introduction)
2. [Key Features](#key-features)
3. [What is MATLAB Used For?](#what-is-matlab-used-for)
4. [Advantages](#advantages)
5. [Disadvantages](#disadvantages)
6. [MATLAB vs Python vs R](#matlab-vs-python-vs-r)
7. [Who Should Use MATLAB?](#who-should-use-matlab)
8. [Learning Resources](#learning-resources)
9. [User Guide](#user-guide)
    - [Installation](#installation)
    - [MATLAB Desktop Overview](#matlab-desktop-overview)
    - [Matrices & Vectors](#matrices--vectors)
    - [Basic Operators](#basic-operators)
    - [Variables & Data Types](#variables--data-types)
    - [Control Flow](#control-flow)
    - [Functions & Scripts](#functions--scripts)
    - [Plotting (2D & 3D)](#plotting-2d--3d)
    - [String Operations](#string-operations)
    - [File I/O](#file-io)
    - [Toolboxes](#toolboxes)
    - [Live Scripts](#live-scripts)
    - [Parallel Computing](#parallel-computing)
    - [Python & C Interop](#python--c-interop)
    - [Debugging](#debugging)
    - [Best Practices](#best-practices)

---

## Introduction

**MATLAB** (MATrix LABoratory) is a high-level programming language and interactive computing environment developed by **MathWorks**. Originally designed for numerical linear algebra, MATLAB has evolved into a comprehensive platform for scientific computing, data analysis, algorithm prototyping, control system design, signal processing, machine learning, and simulation.

Unlike general-purpose languages, MATLAB's syntax is built around matrices and vectors as first-class citizens — making it uniquely concise for mathematical and engineering tasks.

### History & Context

| Attribute | Detail |
|-----------|--------|
| **Developed by** | MathWorks (Cleve Moler, 1984) |
| **First Released** | 1984 |
| **Current Version** | MATLAB R2024b |
| **License** | Commercial (academic discounts available) |
| **File Extension** | `.m` (scripts/functions), `.mlx` (live scripts) |
| **Tagline** | "The Language of Technical Computing" |

---

## Key Features

| Feature | Description |
|---------|-------------|
| **Matrix-First Syntax** | Arrays are the native data type — no declaration needed |
| **Simulink** | Block-diagram simulation environment for dynamic systems |
| **Toolboxes** | 100+ specialized toolboxes (Signal Processing, ML, Control, etc.) |
| **Live Scripts** | Notebooks blending code, output, and formatted text |
| **App Designer** | Drag-and-drop GUI builder for MATLAB apps |
| **Auto-differentiation** | Deep learning via `dlarray` and `dlgradient` |
| **Code Generation** | Generate C/C++, VHDL, CUDA from MATLAB code |
| **Profiler** | Built-in performance profiling |
| **Parallel Computing** | `parfor`, distributed arrays, GPU computing |
| **Interop** | Call Python, Java, C/C++, .NET from MATLAB |

---

## What is MATLAB Used For?

| Domain | Applications |
|--------|-------------|
| **Engineering** | Control systems, signal/image processing, DSP filter design |
| **Science** | Physics simulations, computational biology, chemistry |
| **Finance** | Quantitative modeling, risk analysis, algorithmic trading |
| **Machine Learning** | Train and deploy ML/DL models; Statistics & ML Toolbox |
| **Robotics** | ROS integration, trajectory planning, kinematics |
| **Academia** | Algorithm prototyping, teaching numerical methods |
| **Aerospace** | Flight dynamics, GNC systems (NASA, Boeing, Airbus) |
| **Automotive** | Model-Based Design with Simulink (AUTOSAR, ISO 26262) |

---

## Advantages

| ✅ Advantage | Details |
|------------|---------|
| **Matrix natives** | Vectors/matrices require no boilerplate — `A * B` is matrix multiply |
| **Rich visualization** | `plot`, `surf`, `imagesc`, `tiledlayout` — all built-in |
| **Toolboxes** | Industry-grade algorithms ready to use (no pip installs) |
| **Simulink integration** | Industry-standard model-based design for embedded systems |
| **Code generation** | MATLAB Coder generates C/C++ for embedded targets |
| **Academic adoption** | Widely used in universities; huge research library |
| **Excellent docs** | MathWorks documentation is best-in-class |
| **MATLAB Online** | Browser-based — no local install required |

---

## Disadvantages

| ❌ Disadvantage | Details |
|---------------|---------|
| **Cost** | Commercial license; expensive without academic access |
| **Not open-source** | Proprietary; Python/R/Julia are free alternatives |
| **General-purpose limits** | Not designed for web, mobile, or app development |
| **Slow loops** | Unvectorized loops are much slower than NumPy/Fortran |
| **Package sharing** | No equivalent of pip/conda for community packages |
| **1-indexed arrays** | Convention differs from Python/C — causes off-by-one bugs |
| **Steep licensing** | Enterprise multi-toolbox licenses are very expensive |

---

## MATLAB vs Python vs R

| Feature | MATLAB | Python (NumPy) | R |
|---------|--------|---------------|---|
| **Cost** | ❌ Commercial | ✅ Free | ✅ Free |
| **Matrix ops** | ⚡ Native | ✅ NumPy | ✅ Base R |
| **Visualization** | ✅ Built-in | ✅ matplotlib/Plotly | ⚡ ggplot2 |
| **ML/DL** | ✅ ML Toolbox | ⚡ PyTorch/TensorFlow | ✅ caret/tidymodels |
| **Statistics** | ✅ Stat Toolbox | ✅ scipy.stats | ⚡ Best-in-class |
| **Simulink** | ⚡ Unique | ❌ No equivalent | ❌ No equivalent |
| **Community** | ✅ Engineering | ⚡ Largest | ✅ Data science |
| **Code gen** | ✅ MATLAB Coder | ✅ Cython/Numba | ❌ Limited |
| **Learning curve** | Medium | Medium | Medium |

---

## Who Should Use MATLAB?

### ✅ Perfect For:
- **Engineers** (control, signal, image processing, RF, DSP)
- **Scientists** building data analysis pipelines with visualization
- **Aerospace/Automotive** developers using Simulink for Model-Based Design
- **Academics** prototyping algorithms — rapid math-to-code translation
- **Quantitative finance** professionals

### 💡 Consider Python Instead If:
- Budget is constrained (MATLAB licenses are expensive)
- Web integration, REST APIs, or app development is needed
- Deep learning (PyTorch/TensorFlow ecosystem preferred)

### 💡 Consider R Instead If:
- Primary focus is statistical analysis and publication-quality figures
- Working with life sciences or econometrics datasets

---

## Learning Resources

| Resource | Link |
|----------|------|
| **Docs** | [mathworks.com/help/matlab](https://www.mathworks.com/help/matlab) |
| **MATLAB Online** | [matlab.mathworks.com](https://matlab.mathworks.com) |
| **Courseware** | [mathworks.com/academia](https://www.mathworks.com/academia/) |
| **File Exchange** | [mathworks.com/matlabcentral](https://www.mathworks.com/matlabcentral/) |
| **Coursera** | *MATLAB Programming for Engineers and Scientists* |
| **Book** | *MATLAB: A Practical Introduction to Programming and Problem Solving* |

---

## User Guide

---

### Installation

#### Option 1: Installed MATLAB (Licensed)

1. Go to [mathworks.com/downloads](https://www.mathworks.com/downloads)
2. Sign in with a MathWorks account (academic or commercial license)
3. Run the installer → select products and toolboxes
4. Launch **MATLAB** from the Start Menu / Applications

#### Option 2: MATLAB Online (No Install)

- Visit [matlab.mathworks.com](https://matlab.mathworks.com) — free with a MathWorks account
- Full MATLAB environment in the browser; no GPU/local toolboxes

#### Option 3: MATLAB Trial

- 30-day free trial available at [mathworks.com/products/matlab.html](https://www.mathworks.com/products/matlab.html)

---

### MATLAB Desktop Overview

| Panel | Purpose |
|-------|---------|
| **Command Window** | Interactive REPL — type commands and see results |
| **Workspace** | Shows all variables currently in memory |
| **Current Folder** | File browser for your working directory |
| **Editor** | Write and run `.m` scripts and functions |
| **Command History** | Recall and replay previous commands |
| **Plots** | Figures appear in separate Figure windows (or docked) |

**Key shortcuts:**
- `Ctrl+Enter` — Run current section (%%  cell)
- `F5` — Run entire script
- `F9` — Run selected code
- `Ctrl+C` — Interrupt running code
- `Tab` — Autocomplete
- `help functionName` — Inline docs in Command Window

---

### Matrices & Vectors

MATLAB's fundamental data type is the **matrix** (2D array). Scalars and vectors are special cases.

```matlab
% Row vector (1×4)
v = [1 2 3 4]

% Column vector (4×1) — use semicolons
c = [1; 2; 3; 4]

% Matrix (3×3)
A = [1 2 3; 4 5 6; 7 8 9]

% Range (colon operator)
x = 1:5          % [1 2 3 4 5]
y = 0:0.5:2      % [0 0.5 1.0 1.5 2.0]
z = linspace(0, 1, 100)  % 100 evenly-spaced points

% Special matrices
I = eye(3)       % 3×3 identity matrix
Z = zeros(2, 4)  % 2×4 matrix of zeros
O = ones(3)      % 3×3 matrix of ones
R = rand(3, 3)   % 3×3 random (uniform [0,1])
N = randn(3, 3)  % 3×3 random (standard normal)

% Matrix dimensions
[rows, cols] = size(A)
n = length(v)    % length of a vector
```

#### Indexing

```matlab
A = [10 20 30; 40 50 60; 70 80 90];

% Single element (1-indexed!)
A(2, 3)          % → 60  (row 2, col 3)

% Row slice
A(1, :)          % → [10 20 30]

% Column slice
A(:, 2)          % → [20; 50; 80]

% Sub-matrix
A(1:2, 2:3)      % → [20 30; 50 60]

% Linear indexing
A(5)             % → 50 (column-major: counts DOWN columns first)

% End keyword
A(end, end)      % → 90 (last element)
A(2:end, :)      % Rows 2 to last
```

---

### Basic Operators

```matlab
A = [1 2; 3 4];
B = [5 6; 7 8];

% Matrix operations
C = A + B        % Element-wise addition
D = A * B        % Matrix multiplication (NOT element-wise)
E = A .* B       % Element-wise multiplication
F = A / B        % A * inv(B)  — matrix right-division
x = A \ b        % Solve linear system Ax = b (preferred over inv(A)*b)
T = A'           % Transpose
T2 = A.'         % Conjugate transpose (same for real matrices)

% Element-wise versions
G = A ./ B       % Element-wise division
H = A .^ 2       % Element-wise power (each element squared)

% Scalar math (auto-broadcast to all elements)
A + 10
A * 3
A .^ 2

% Comparison (returns logical matrix)
A > 2            % [0 0; 1 1] — logical
A == B           % element-wise equality

% Logical operators
A > 1 & A < 4   % AND
A < 2 | A > 3   % OR
~(A > 2)        % NOT
```

---

### Variables & Data Types

```matlab
% Numeric types
x   = 3.14;           % double (default)
n   = int32(42);      % 32-bit integer
u   = uint8(255);     % unsigned 8-bit
c   = complex(3, 4);  % 3 + 4i
f   = single(3.14);   % single precision

% Strings (MATLAB uses char arrays and string objects)
name  = 'Alice';            % char array (legacy)
name2 = "Alice";            % string object (modern, recommended)
full  = name2 + " Smith";   % → "Alice Smith"

% Logical
flag = true;
result = false;

% Cell arrays (heterogeneous containers)
c = {42, "hello", [1 2 3]};
c{2}           % → "hello"

% Structures
s.name  = "Alice";
s.age   = 30;
s.score = [95 87 92];
s.name         % → "Alice"

% Tables (for data analysis — like pandas DataFrame)
T = table([1;2;3], ["Alice";"Bob";"Carol"], ...
    'VariableNames', {'ID', 'Name'});
T.Name         % access column
T(T.ID > 1, :) % filter rows

% Type checking
class(x)       % → 'double'
isa(x, 'double') % → 1 (true)
isnumeric(x)   % → 1
ischar(name)   % → 1
```

---

### Control Flow

```matlab
%% IF / ELSEIF / ELSE
score = 85;
if score >= 90
    grade = 'A';
elseif score >= 80
    grade = 'B';
elseif score >= 70
    grade = 'C';
else
    grade = 'F';
end
disp(['Grade: ' grade])

%% FOR LOOP
total = 0;
for i = 1:10
    total = total + i;
end
disp(total)    % → 55

% Loop over a vector
fruits = ["apple", "banana", "cherry"];
for f = fruits
    disp(f)
end

%% WHILE LOOP
n = 1;
while n < 100
    n = n * 2;
end
disp(n)        % → 128

%% SWITCH
day = "Monday";
switch day
    case {"Saturday", "Sunday"}
        disp("Weekend!")
    case "Monday"
        disp("Start of work week")
    otherwise
        disp("Weekday")
end

%% BREAK / CONTINUE
for i = 1:10
    if i == 5, break; end     % exit loop
    if mod(i,2) == 0, continue; end  % skip even
    disp(i)    % prints 1, 3
end

%% TRY / CATCH
try
    result = 1 / 0;   % Inf in MATLAB, no error
    x = sqrt(-1);     % returns complex — no error
    error('Custom error: value is %d', 42);
catch ME
    fprintf('Error: %s\n', ME.message);
end
```

---

### Functions & Scripts

#### Script (`.m` file — no input/output)

```matlab
% stats_demo.m
data = randn(1, 100);
fprintf('Mean: %.4f\n', mean(data));
fprintf('Std:  %.4f\n', std(data));
histogram(data, 20);
title('Normal Distribution Sample');
```

Run with: `run('stats_demo.m')` or press **F5** in the Editor.

#### Function (`.m` file — with input/output)

```matlab
% linearFit.m
function [slope, intercept, r2] = linearFit(x, y)
    % Linear regression: y = slope*x + intercept
    % Returns slope, intercept, and R-squared
    n   = length(x);
    xm  = mean(x);
    ym  = mean(y);
    slope     = sum((x - xm) .* (y - ym)) / sum((x - xm).^2);
    intercept = ym - slope * xm;
    yhat      = slope * x + intercept;
    ss_res    = sum((y - yhat).^2);
    ss_tot    = sum((y - ym).^2);
    r2        = 1 - ss_res / ss_tot;
end
```

Call it:
```matlab
x = 1:10;
y = 2*x + randn(1,10)*0.5;
[m, b, r2] = linearFit(x, y);
fprintf('y = %.2fx + %.2f  (R²=%.4f)\n', m, b, r2);
```

#### Anonymous Functions (lambdas)

```matlab
square = @(x) x.^2;
square(5)          % → 25
square([1 2 3 4])  % → [1 4 9 16]

% Multi-arg
f = @(x, y) x.^2 + y.^2;
f(3, 4)            % → 25

% Use with built-ins
arrayfun(@(x) x^2 + 1, 1:5)   % → [2 5 10 17 26]
cellfun(@upper, {'hello','world'}) % → {'HELLO','WORLD'}
```

---

### Plotting (2D & 3D)

```matlab
%% 2D Line Plot
x = linspace(0, 2*pi, 200);
y1 = sin(x);
y2 = cos(x);

figure;
plot(x, y1, 'b-', 'LineWidth', 2, 'DisplayName', 'sin(x)');
hold on;
plot(x, y2, 'r--', 'LineWidth', 2, 'DisplayName', 'cos(x)');
hold off;
xlabel('x (radians)');
ylabel('Amplitude');
title('Sine and Cosine Waves');
legend('show');
grid on;
xlim([0 2*pi]);

%% Multiple Subplots
figure;
tiledlayout(2, 2);  % 2×2 grid

nexttile;
plot(x, sin(x)); title('sin(x)');

nexttile;
plot(x, cos(x)); title('cos(x)');

nexttile;
plot(x, sin(x).^2); title('sin²(x)');

nexttile;
plot(x, exp(-x/5).*sin(x)); title('Damped sin');

%% Bar and Histogram
data = randn(1, 500);
figure;
tiledlayout(1, 2);
nexttile; histogram(data, 30); title('Histogram');
nexttile; 
categories = {'A','B','C','D'};
values = [34 52 41 29];
bar(values);
xticklabels(categories);
title('Bar Chart');

%% Scatter Plot
x = randn(100, 1);
y = 2*x + randn(100, 1);
figure;
scatter(x, y, 50, 'filled', 'MarkerFaceAlpha', 0.6);
xlabel('x'); ylabel('y');
title('Scatter Plot');
lsline;  % add least-squares fit line

%% 3D Surface Plot
[X, Y] = meshgrid(-3:0.2:3, -3:0.2:3);
Z = sin(sqrt(X.^2 + Y.^2)) ./ sqrt(X.^2 + Y.^2 + eps);
figure;
surf(X, Y, Z, 'EdgeAlpha', 0.1);
colormap('parula');
colorbar;
xlabel('X'); ylabel('Y'); zlabel('Z');
title('sinc(r) Surface');
view(45, 30);  % azimuth, elevation

%% Save Figure
saveas(gcf, 'my_plot.png');
print(gcf, 'my_plot', '-dpdf', '-r300');  % PDF at 300 DPI
```

---

### String Operations

```matlab
% Create strings
s = "Hello, MATLAB!";

% String functions
upper(s)         % → "HELLO, MATLAB!"
lower(s)         % → "hello, matlab!"
length(s)        % → 14
strtrim("  hi  ")  % → "hi"

% Search and replace
contains(s, "MATLAB")    % → 1 (true)
startsWith(s, "Hello")   % → 1
endsWith(s, "!")          % → 1
replace(s, "MATLAB", "World")  % → "Hello, World!"

% Split and join
parts = strsplit("a,b,c", ",");   % → {"a","b","c"}
joined = strjoin(parts, "-");      % → "a-b-c"
words = strsplit(s);               % split on whitespace

% Format strings
msg = sprintf("Pi is approximately %.6f", pi);

% Pattern matching
tf = regexp(s, '\d+', 'once');    % find first digit sequence
matches = regexp(s, '[A-Z]+', 'match');  % find uppercase words

% String arrays
names = ["Alice"; "Bob"; "Carol"];
names(names == "Bob")   % filter by equality
```

---

### File I/O

```matlab
%% Save and Load MATLAB Data
data = struct('x', 1:100, 'y', rand(1,100));
save('mydata.mat', 'data', '-v7.3');  % HDF5 format
clear data;
load('mydata.mat');  % restores 'data' variable

%% CSV / Text Files
% Write CSV
T = table((1:5)', rand(5,1), 'VariableNames', {'ID','Value'});
writetable(T, 'output.csv');

% Read CSV
T2 = readtable('output.csv');
disp(T2);

%% Excel
writetable(T, 'output.xlsx', 'Sheet', 'Results');
T3 = readtable('output.xlsx', 'Sheet', 'Results');

%% Low-level Text I/O
fid = fopen('log.txt', 'w');
fprintf(fid, 'Run started at %s\n', datetime("now"));
for i = 1:5
    fprintf(fid, 'Iteration %d: value = %.4f\n', i, rand());
end
fclose(fid);

% Read it back
text = fileread('log.txt');
disp(text);
```

---

### Toolboxes

MATLAB's power comes from optional toolboxes. Install via **Add-On Explorer** (Home → Add-Ons).

| Toolbox | Purpose |
|---------|---------|
| **Statistics & Machine Learning** | Regression, classification, clustering, cross-validation |
| **Signal Processing** | Filters, FFT, spectral analysis |
| **Image Processing** | Image filtering, segmentation, morphology |
| **Control System** | PID, Bode plots, state-space models |
| **Deep Learning** | Train CNNs, RNNs, transformers |
| **Optimization** | Linear/nonlinear programming, GA, surrogate optimization |
| **Parallel Computing** | `parfor`, `gpuArray`, distributed computing |
| **Symbolic Math** | Symbolic algebra, calculus, equation solving |
| **Curve Fitting** | Fit curves/surfaces to data |

#### Quick Toolbox Examples

```matlab
%% Statistics — t-test
[h, p, ci] = ttest2(randn(30,1), randn(30,1)+0.5);
fprintf('p-value: %.4f\n', p);

%% Signal Processing — Low-pass filter
Fs = 1000;                    % Sampling frequency
t  = 0:1/Fs:1-1/Fs;
x  = sin(2*pi*50*t) + 0.5*randn(size(t));  % noisy 50 Hz signal
[b, a] = butter(4, 100/(Fs/2));             % 4th-order Butterworth
y_filt = filtfilt(b, a, x);                % zero-phase filter
figure; plot(t(1:200), x(1:200)); hold on;
plot(t(1:200), y_filt(1:200)); legend('Raw','Filtered');

%% Optimization — minimize a function
f = @(x) (x(1)-3)^2 + (x(2)+1)^2;
x0 = [0, 0];
options = optimoptions('fminunc', 'Display', 'off');
[xmin, fmin] = fminunc(f, x0, options);
fprintf('Minimum at x=[%.3f, %.3f], f=%.6f\n', xmin, fmin);
```

---

### Live Scripts

Live Scripts (`.mlx`) blend code, formatted text, equations, and figures — similar to Jupyter Notebooks.

1. **New → Live Script** in the Home tab
2. Write code in code cells (blue bar on left)
3. Write formatted text, headings, equations in text cells
4. Click **Run** or `Ctrl+Enter` for each section
5. **Export**: File → Export → PDF or HTML

```matlab
%% Section title in Live Script
% This text appears as formatted prose (not code)
x = linspace(-5, 5, 300);
y = 1 ./ (1 + exp(-x));   % Sigmoid

plot(x, y, 'LineWidth', 2);
xlabel('x'); ylabel('σ(x)');
title('Sigmoid / Logistic Function');
yline(0.5, '--', '0.5', 'LabelHorizontalAlignment','left');
```

---

### Parallel Computing

```matlab
%% parfor — parallel for loop (requires Parallel Computing Toolbox)
N = 1000;
results = zeros(1, N);

parfor i = 1:N
    % Each iteration runs on a separate worker
    results(i) = sum(rand(1, 10000));
end
mean(results)

%% GPU Computing (requires GPU + Parallel Computing Toolbox)
A = gpuArray(rand(1000, 'single'));
B = gpuArray(rand(1000, 'single'));
C = A * B;            % runs on GPU
C_cpu = gather(C);    % bring result back to CPU

%% Parallel pool control
pool = parpool(4);    % start pool with 4 workers
delete(pool);         % shut down pool

%% Batch — run job in background
j = batch('my_script');
wait(j);
diary(j);   % see output
```

---

### Python & C Interop

#### Calling Python from MATLAB

```matlab
% Call Python standard library
py_list = py.list({1, 2, 3, 4, 5});
py_sum  = py.builtins.sum(py_list);   % → Python int 15
matlab_val = double(py_sum);           % → MATLAB double

% Use a Python library
numpy = py.importlib.import_module('numpy');
arr   = numpy.array([1.0, 2.0, 3.0]);
result = numpy.mean(arr);
double(result)   % → 2.0

% Call a custom Python script
pyenv("Version", "C:\Python311\python.exe");  % set Python path if needed
output = py.my_module.my_function(3.14);
```

#### MEX — Calling C/C++ from MATLAB

```c
// double_it.c
#include "mex.h"
void mexFunction(int nlhs, mxArray *plhs[], int nrhs, const mxArray *prhs[]) {
    double *in  = mxGetDoubles(prhs[0]);
    int     n   = (int)mxGetNumberOfElements(prhs[0]);
    plhs[0]     = mxCreateDoubleMatrix(1, n, mxREAL);
    double *out = mxGetDoubles(plhs[0]);
    for (int i = 0; i < n; i++) out[i] = in[i] * 2.0;
}
```

```matlab
% Compile MEX
mex double_it.c
% Call it
result = double_it([1 2 3 4 5])  % → [2 4 6 8 10]
```

---

### Debugging

| Tool | How to Use |
|------|-----------|
| **Breakpoints** | Click the dash left of a line number in the Editor |
| **Step** | F10 — step over; F11 — step into; Shift+F11 — step out |
| **Workspace panel** | Inspect all variables while paused |
| **dbstop on error** | `dbstop if error` — auto-break on any error |
| **dbstack** | Show call stack at current breakpoint |
| **Profiler** | Home → Run and Time — identify bottlenecks |

```matlab
% Useful debugging commands in Command Window
whos              % list all workspace variables with size/type
who               % just variable names
size(A)           % dimensions of A
class(A)          % data type
isnan(A)          % find NaN values
any(isinf(A(:))) % check for Inf
dbstop if error   % break on any runtime error
dbclear all       % clear all breakpoints
profile on; my_function(); profile viewer  % performance profiler
```

---

### Best Practices

#### 1. Vectorize Instead of Looping

```matlab
% SLOW: explicit loop
n = 1e6;
result = zeros(1, n);
for i = 1:n
    result(i) = sin(i) * exp(-i/n);
end

% FAST: vectorized
i = 1:n;
result = sin(i) .* exp(-i/n);
```

#### 2. Pre-allocate Arrays

```matlab
% BAD: array grows dynamically (slow memory reallocation)
for i = 1:10000
    data(i) = rand();  % MATLAB warns about this
end

% GOOD: pre-allocate
data = zeros(1, 10000);
for i = 1:10000
    data(i) = rand();
end
```

#### 3. Use `end` Keyword for Readable Indexing

```matlab
A(end)          % last element
A(end-2:end)    % last 3 elements
A(1:2:end)      % every other element
```

#### 4. Suppress Output with Semicolons

```matlab
A = rand(1000);   % silent (no output in Command Window)
A = rand(1000)    % without ; prints the entire 1000×1000 matrix!
```

#### 5. Use `fprintf` Over `disp` for Formatted Output

```matlab
x = 3.14159;
disp(x)                      % → 3.1416  (no control)
fprintf('Pi = %.6f\n', x)   % → Pi = 3.141590  (formatted)
```

#### 6. Structure Large Projects with Packages

```
+mypackage/
    analysis.m      % function mypackage.analysis(...)
    utils/
        helper.m    % function mypackage.utils.helper(...)
main_script.m       % calls mypackage.analysis(data)
```

#### 7. Use the Profiler to Find Bottlenecks

```matlab
profile on
my_expensive_function();
profile off
profile viewer    % opens interactive call-tree breakdown
```

---

## Summary

| Use MATLAB When | Consider Alternatives When |
|----------------|---------------------------|
| Control/signal/image processing | Budget-constrained → **Python** |
| Simulink Model-Based Design | Statistics/bioinformatics → **R** |
| Algorithm prototyping for embedded systems | Web/app development → **Python** |
| Academia with institutional license | Open-source mandatory → **Julia** or **Python** |
| Need toolbox-quality algorithms out-of-the-box | Deep learning → **Python** (PyTorch/TF) |

---

## Next Steps

1. **MATLAB Onramp** — [mathworks.com/learn/tutorials/matlab-onramp.html](https://www.mathworks.com/learn/tutorials/matlab-onramp.html) — free 2-hour interactive course
2. **Simulink Onramp** — Model-based design fundamentals
3. **MATLAB File Exchange** — Community scripts and toolboxes
4. **[R](../R/Installation-and-Usage-Guide.md)** — compare for statistical analysis
5. **Python** — compare for general-purpose data science

---

*Last Updated: February 20, 2026*
