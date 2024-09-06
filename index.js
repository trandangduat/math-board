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

const [BEFORE_PAINTING, DURING_PAINTING, DONE_PAINTING] = [0, 1, 2];

const cursor = {
    x: 0,
    y: 0
};

const brush = {
    x: 0,
    y: 0,
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
    mainLayer.clone(offscreenLayer);
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
    if (drawingState !== BEFORE_PAINTING && mainPath.length > 0) {
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
    event.preventDefault();

    if (History.size <= 1) {
        return;
    }
    DeletedHistory.push(History.pop());
    offscreenLayer.putImageData(History.top());
    if (History.size <= 1) {
        undoButton.disabled = true;
    }
    if (DeletedHistory.size > 0) {
        redoButton.disabled = false;
    }
}

function redo(event) {
    event.preventDefault();

    if (DeletedHistory.size === 0) {
        return;
    }
    History.push(DeletedHistory.pop());
    offscreenLayer.putImageData(History.top());
    if (DeletedHistory.size === 0) {
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
    drawingState = DONE_PAINTING;
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

    History.push(offscreenLayer.getImageData());

    undoButton.addEventListener("click", undo);
    redoButton.addEventListener("click", redo);

    draw();
})()
