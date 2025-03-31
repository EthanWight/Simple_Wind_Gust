# Wind Gust Tree Simulation

A WebGL-based interactive simulation that demonstrates the effects of wind gusts on a tree structure.

## Overview

This project creates a simple 2D tree visualization using WebGL and provides controls to simulate how the tree would respond to wind gusts of varying strengths. The tree is represented as a series of horizontal lines (branches) connected to a vertical trunk, and the animation shows how branches bend in response to wind force.

## Features

- Interactive WebGL-based tree visualization
- Adjustable wind strength using a slider control (0-3)
- Animation of wind gusts with natural easing in and out
- Realistic tree deformation based on height (upper branches move more than lower ones)

## Files

- `wind_gust_sim.html` - Main HTML file containing the WebGL canvas and controls
- `wind_gust_sim.js` - JavaScript file with the WebGL implementation and animation logic
- `webgl-utils.js` - WebGL utility functions (required)
- `initShaders.js` - Shader initialization functions (required)
- `MV.js` - Matrix/Vector utilities (required)

## Usage

1. Open `wind_gust_sim.html` in a WebGL-compatible browser
2. Use the slider to set the desired wind strength (0-3)
3. Click the "Init Wind Gust" button to start the animation
4. The tree will bend based on the selected wind strength and then return to its original position

## Technical Details

### Tree Parameters
- `numBranches`: Number of horizontal lines representing branches (default: 30)
- `treeHeight`: Total height of the tree (default: 1.8)
- `baseWidth`: Width at the base of the tree (default: 0.6)
- `trunkHeight`: Height of the trunk (default: 0.2)

### Animation Parameters
- `maxAnimationSteps`: Number of animation frames for a complete wind gust cycle (default: 30)
- Wind effect follows a sinusoidal pattern for natural easing

### Implementation Notes
- The tree is rendered using WebGL line primitives
- Branch displacement is calculated based on the branch height (higher branches move more)
- Animation uses `requestAnimationFrame` for smooth rendering

## Requirements

- A modern web browser with WebGL support
- The following supporting files:
  - webgl-utils.js
  - initShaders.js
  - MV.js

## Author

Ethan Wight  
