# MATLAB Installation and Usage Guide

## Install

- Get MATLAB from <https://www.mathworks.com/downloads>
- Use the installer to select products/toolboxes
- Launch and sign in with MathWorks account

## Basic Workflow

```matlab
% script.m
A = [1 2; 3 4];
b = [5; 6];
x = A \ b
plot(x)
```bash

Run with the Run button or `run('script.m')` in the Command Window.

## Functions

```matlab
function y = squareSum(x)
    y = sum(x.^2);
end
```bash

Save as `squareSum.m` and call `squareSum([1 2 3])`.

## Live Scripts

- Create via New > Live Script for blended code, text, and plots
- Export to PDF/HTML for sharing

## Package Management

- Add-On Explorer for toolboxes
- `matlab.addons.install('toolbox.mltbx')` for local installs

## Interop

- Call Python: `py.list({1,2,3})`
- Call C/C++ via MEX: `mex myfunc.c`

## Debugging

- Set breakpoints in the Editor
- Use Workspace panel to inspect variables
- Step through with the Debug toolbar

## Next Steps

- Explore Simulink for system modeling
- Use `parfor` and Parallel Computing Toolbox for speed
- Try MATLAB Online if you cannot install locally
