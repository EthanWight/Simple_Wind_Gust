/*
Ethan Wight
March 30, 2025
CMSC 410
Project 2
*/

var gl;
var program;
var bufferId;
var cBuffer;
var vPosition;
var vColor;

// Tree parameters
var numBranches = 30;  // Number of horizontal lines
var treeHeight = 1.8;  // Total height of tree
var baseWidth = 0.6;   // Width at base of tree
var trunkHeight = 0.2; // Height of trunk

// Animation parameters
var isAnimating = false;
var currentWind = 0;
var animationStep = 0;
var maxAnimationSteps = 30;

window.onload = function init() {
    var canvas = document.getElementById("gl-canvas");
    
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    // Configure WebGL
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.9, 0.9, 0.9, 1.0);

    // Load shaders and initialize attribute buffers
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // Create buffers
    bufferId = gl.createBuffer();
    cBuffer = gl.createBuffer();

    // Get attribute locations
    vPosition = gl.getAttribLocation(program, "vPosition");
    vColor = gl.getAttribLocation(program, "vColor");

    // Setup event listeners
    document.getElementById('wind-btn').addEventListener('click', startWindGust);
    document.getElementById('wind-slider').addEventListener('input', updateWindStrength);

    // Initial render
    render();
};

function updateWindStrength() {
    currentWind = parseInt(document.getElementById('wind-slider').value);
}

function startWindGust() {
    if (!isAnimating) {
        isAnimating = true;
        animationStep = 0;
        animateWindGust();
    }
}

function animateWindGust() {
    if (animationStep >= maxAnimationSteps) {
        isAnimating = false;
        render(); // Reset to original position
        return;
    }

    render();
    animationStep++;
    requestAnimationFrame(animateWindGust);
}

function generateTree() {
    var vertices = [];
    var colors = [];
    
    // Add trunk (vertical line)
    vertices.push(0, -0.9);  // Bottom of trunk
    vertices.push(0, -0.9 + trunkHeight);  // Top of trunk
    colors.push(0.5, 0.3, 0.2, 1.0);  // Brown color
    colors.push(0.5, 0.3, 0.2, 1.0);

    // Calculate wind effect
    var windEffect = 0;
    if (isAnimating) {
        var progress = animationStep / maxAnimationSteps;
        windEffect = Math.sin(progress * Math.PI) * (currentWind * 0.1);
    }

    // Add horizontal lines
    for (var i = 0; i < numBranches; i++) {
        var y = -0.9 + trunkHeight + (i * ((treeHeight - trunkHeight) / numBranches));
        var width = baseWidth * (1 - (i / numBranches));
        
        // Calculate displacement based on height
        var heightFactor = i / numBranches;
        var xOffset = windEffect * heightFactor;

        vertices.push(-width/2 + xOffset, y);
        vertices.push(width/2 + xOffset, y);
        
        // Dark green color
        colors.push(0.0, 0.5, 0.0, 1.0);
        colors.push(0.0, 0.5, 0.0, 1.0);
    }

    return {
        vertices: new Float32Array(vertices),
        colors: new Float32Array(colors)
    };
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    var treeData = generateTree();
    
    // Load vertices
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, treeData.vertices, gl.STATIC_DRAW);
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
    
    // Load colors
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, treeData.colors, gl.STATIC_DRAW);
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);
    
    // Draw trunk
    gl.drawArrays(gl.LINES, 0, 2);
    
    // Draw branches
    gl.drawArrays(gl.LINES, 2, numBranches * 2);
}
