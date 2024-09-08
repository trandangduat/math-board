import { Layer } from "./Layer.js";
import { Stack } from "./Stack.js";
import { addToBuffer, clearBuffer, createStroke, getNextPoints } from "./LineAlgorithms.js";

const uiLayer = new Layer("ui");
const mainLayer = new Layer("main");
const offscreenLayer = new Layer("offscreen");
const History = new Stack();
const DeletedHistory = new Stack();

const mousePosTracker = document.getElementById("mouse-pos");
const undoButton = document.getElementById("undo");
const redoButton = document.getElementById("redo");
const brushSizeSlider = document.getElementById("brush-size");
const brushColorPicker = document.getElementById("brush-color");
const brushModeToggle = document.getElementById("toggle-brush-mode");

const [BEFORE_PAINTING, DURING_PAINTING, DONE_PAINTING] = [0, 1, 2];
const [MODE_DRAW, MODE_ERASER] = [0, 1];

const cursor = {
    x: 0,
    y: 0
};

const brush = {
    x: 0,
    y: 0,
    mode: MODE_DRAW,
    radius: 2,
    color: "black",
    draw() {
        uiLayer.ctx.beginPath();
        uiLayer.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        uiLayer.ctx.strokeStyle = this.color;
        uiLayer.ctx.stroke();
    }
}

let mainPath = [];
let tempPath = [];
let drawingState = false;

function drawBrushPoint (x, y) {
    mainLayer.ctx.beginPath();
    mainLayer.ctx.arc(x, y, brush.radius, 0, Math.PI * 2);
    mainLayer.ctx.fillStyle = brush.color;
    mainLayer.ctx.fill();
}

function drawStroke (path) {
    path.forEach(point => {
        drawBrushPoint(point.x, point.y);
    })
}

function clear() {
    uiLayer.clear();
    if (brush.mode == MODE_DRAW) {
        mainLayer.clone(offscreenLayer);
    }
}

function update() {
    mousePosTracker.innerHTML = `(x: ${cursor.x}, y: ${cursor.y})`;
    brush.x = cursor.x;
    brush.y = cursor.y;
}

function draw() {
    clear();
    update();

    brush.draw();
    if (drawingState !== BEFORE_PAINTING) {
        drawStroke([...mainPath, ...tempPath]);
    }
    if (drawingState == DONE_PAINTING) {
        drawingState = BEFORE_PAINTING;
        offscreenLayer.clone(mainLayer);
        History.push(mainLayer.getImageData());
        DeletedHistory.clear();
        redoButton.disabled = true;
        undoButton.disabled = false;
    }

    requestAnimationFrame(draw);
}

function undo(event) {
    event.preventDefault()
    if (History.size <= 1) {
        return;
    }
    DeletedHistory.push(History.pop());
    offscreenLayer.putImageData(History.top());
    mainLayer.clone(offscreenLayer);
    if (History.size <= 1) {
        undoButton.disabled = true;
    }
    if (!DeletedHistory.empty()) {
        redoButton.disabled = false;
    }
}

function redo(event) {
    event.preventDefault()
    if (DeletedHistory.empty()) {
        return;
    }
    History.push(DeletedHistory.pop());
    offscreenLayer.putImageData(History.top());
    mainLayer.clone(offscreenLayer);
    if (DeletedHistory.empty()) {
        redoButton.disabled = true;
    }
    if (History.size > 1) {
        undoButton.disabled = false;
    }
}

function getMousePos (e) {
    return {
        x: e.clientX - mainLayer.rect().left,
        y: e.clientY - mainLayer.rect().top
    };
}

function startDrawing (e) {
    e.preventDefault();
    drawingState = DURING_PAINTING;

    const cursor = getMousePos(e);
    mainPath = [];
    tempPath = [];
    clearBuffer();

    mainPath.push(cursor);
    addToBuffer(cursor);
}

function whileDrawing (e) {
    e.preventDefault();

    if (drawingState == DURING_PAINTING) {
        const cursor = getMousePos(e);
        addToBuffer(cursor);
        const nextPoints = getNextPoints();
        if (nextPoints.length > 0) {
            // save one stable smoothed point
            mainPath.push(...createStroke(mainPath[mainPath.length - 1], nextPoints[0]));
            // save the rest of average points between the stable point to the cursor
            tempPath = [];
            for (let i = 1; i < nextPoints.length; i++) {
                tempPath.push(...createStroke(nextPoints[i - 1], nextPoints[i]));
            }
        }
    }
}

function finishDrawing (e) {
    e.preventDefault();

    if (drawingState === DURING_PAINTING) {
        drawingState = DONE_PAINTING;
    }
}


(function main() {
    document.body.appendChild(mainLayer.canvas);
    document.body.appendChild(uiLayer.canvas);

    addEventListener("mousemove", (e) => {
        cursor.x = e.clientX - mainLayer.rect().left;
        cursor.y = e.clientY - mainLayer.rect().top;
    });

    uiLayer.canvas.addEventListener("mousedown", startDrawing);
    uiLayer.canvas.addEventListener("mousemove", whileDrawing);
    uiLayer.canvas.addEventListener("mouseup", finishDrawing);
    uiLayer.canvas.addEventListener("mouseout", finishDrawing);

    History.push(offscreenLayer.getImageData());

    undoButton.addEventListener("click", undo);
    redoButton.addEventListener("click", redo);
    brushSizeSlider.addEventListener("input", (e) => {
        brush.radius = e.target.value;
    });
    brushColorPicker.addEventListener("input", (e) => {
        brush.color = e.target.value;
    });
    brushModeToggle.addEventListener("click", (e) => {
        brush.mode = (brush.mode === MODE_DRAW ? MODE_ERASER : MODE_DRAW);
        brushModeToggle.innerHTML = (brush.mode === MODE_DRAW ? "Draw" : "Erase");
        mainLayer.setCompositeOperation(brush.mode === MODE_ERASER ? "destination-out" : "source-over");
        brushColorPicker.disabled = (brush.mode === MODE_ERASER);
    });

    draw();
})()
