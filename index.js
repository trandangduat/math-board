import { Layer } from "./Layer.js";
import { Stack } from "./Stack.js";
import {
    createStroke,
    DouglasPeucker,
    Chaikin
} from "./LineAlgorithms.js";

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
    radius: 3,
    color: "black",
    draw() {
        uiLayer.ctx.beginPath();
        uiLayer.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        uiLayer.ctx.strokeStyle = this.color;
        uiLayer.ctx.stroke();
    }
}

const paths = [];
let temporaryPath = [];
let mainPath = [];
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
    if (paths.length > 0 && drawingState !== BEFORE_PAINTING) {
        drawStroke(paths[paths.length - 1]);
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

(function main() {
    document.body.appendChild(mainLayer.canvas);
    document.body.appendChild(uiLayer.canvas);

    addEventListener("mousemove", (e) => {
        cursor.x = e.clientX - mainLayer.getBoudingBox().left;
        cursor.y = e.clientY - mainLayer.getBoudingBox().top;
    });

    uiLayer.canvas.addEventListener("mousedown", (e) => {
        drawingState = DURING_PAINTING;

        paths.push(temporaryPath);
        temporaryPath.push({ x: cursor.x, y: cursor.y });
        mainPath.push({ x: cursor.x, y: cursor.y });
    });

    uiLayer.canvas.addEventListener("mousemove", (e) => {
        if (drawingState == DURING_PAINTING && temporaryPath.length > 0) {
            let point = temporaryPath.at(-1);
            temporaryPath.push(...createStroke(point, cursor));
            mainPath.push({ x: cursor.x, y: cursor.y });
        }
    });

    uiLayer.canvas.addEventListener("mouseup", (e) => {
        drawingState = DONE_PAINTING;

        const simplifiedPath = DouglasPeucker(mainPath, 3);
        const smoothedPath = Chaikin(simplifiedPath, 1);
        const finalPath = [smoothedPath[0]];
        for (let i = 1; i < smoothedPath.length; i++) {
            finalPath.push(...createStroke(smoothedPath[i - 1], smoothedPath[i]));
        }
        paths[paths.length - 1] = finalPath;
        mainPath = [];
        temporaryPath = [];
    });

    History.push(offscreenLayer.getImageData());

    undoButton.addEventListener("click", undo);
    redoButton.addEventListener("click", redo);

    draw();
})()
