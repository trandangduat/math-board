import { Layer } from "./Layer.js";
import { Stack } from "./Stack.js";
import { addToBuffer, clearBuffer, createStroke, getNextPoints } from "./LineAlgorithms.js";
import { BoundingRect } from "./BoundingRect.js";

const uiLayer = new Layer("ui");
const mainLayer = new Layer("main");
const offscreenLayer = new Layer("offscreen");
const boundingRectLayer = new Layer("bounding-rect");
const History = new Stack();
const DeletedHistory = new Stack();
const predictWorker = new Worker(
    new URL("./model/worker.js", import.meta.url), {
    type: 'module'
});
const mainBoundingRects = [new BoundingRect()];
const boundingRects = [];

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
    boundingRectLayer.clear();
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
    for (let bdx of boundingRects) {
        const rect = bdx.getRect();
        boundingRectLayer.ctx.strokeStyle = "green";
        boundingRectLayer.ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
    }
    for (let bdx of mainBoundingRects) {
        const rect = bdx.getRect();
        boundingRectLayer.ctx.strokeStyle = "blue";
        boundingRectLayer.ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
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

async function capture (rect) {
    const imgData = mainLayer.getSnapshot(rect);
    predictWorker.postMessage({
        message: "PREDICT",
        imgData: imgData
    });
    predictWorker.onmessage = (e) => {
        console.log(e.data);
        predictWorker.onmessage = null;
    };
    predictWorker.onerror = (e) => {
        console.error(e.message);
        predictWorker.onerror = null;
    };
}

function closestMainBoundingRect() {
    let minDist = Number.MAX_VALUE;
    let minIndex = -1;
    for (let i = 0; i < mainBoundingRects.length; i++) {
        const rect = mainBoundingRects[i].getRect();
        const dx = Math.max(0, Math.max(rect.x - cursor.x, cursor.x - (rect.x + rect.w)));
        const dy = Math.max(0, Math.max(rect.y - cursor.y, cursor.y - (rect.y + rect.h)));
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDist) {
            minDist = dist;
            minIndex = i;
        }
    }
    return minIndex;
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

    boundingRects.push(new BoundingRect());

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
        if (mainPath.length > 0) {
            const lastPoint = mainPath[mainPath.length - 1];
            boundingRects[boundingRects.length - 1].update(lastPoint.x, lastPoint.y, brush.radius);
        }
    }
}

async function finishDrawing (e) {
    e.preventDefault();

    if (drawingState === DURING_PAINTING) {
        const {x, y, w, h} = boundingRects[boundingRects.length - 1].getRect();
        let bestBox = {
            dx: 999999,
            index: -1
        };
        for (let i = 0; i < mainBoundingRects.length; i++) {
            const rect = mainBoundingRects[i];
            if (y > rect.max_y || y + h < rect.min_y) {
                continue;
            }
            if (x > rect.max_x) {
                const dx = x - rect.max_x;
                if (dx < bestBox.dx) {
                    bestBox.dx = dx;
                    bestBox.index = i;
                }
            } else if (x + w < rect.min_x) {
                const dx = rect.min_x - (x + w);
                if (dx < bestBox.dx) {
                    bestBox.dx = dx;
                    bestBox.index = i;
                }
            } else {
                bestBox.dx = 0;
                bestBox.index = i;
            }
        }
        if (bestBox.index === -1 || bestBox.dx > w * 2) {
            mainBoundingRects.push(new BoundingRect());
            mainBoundingRects[mainBoundingRects.length - 1].join(boundingRects[boundingRects.length - 1]);
        } else {
            mainBoundingRects[bestBox.index].join(boundingRects[boundingRects.length - 1]);
        }

        if (boundingRects.length > 1) {
            let curRect = boundingRects[boundingRects.length - 1].getRect();
            let preRect = boundingRects[boundingRects.length - 2].getRect();
            if (curRect.x < preRect.x) {
                [curRect, preRect] = [preRect, curRect];
            }
            const xIntersect = (preRect.x + preRect.w) - curRect.x;
            if (curRect.y < preRect.y) {
                [curRect, preRect] = [preRect, curRect];
            }
            const yIntersect = (preRect.y + preRect.h) - curRect.y;
            if (xIntersect * 2 >= Math.min(curRect.w, preRect.w) && yIntersect < 5) {
                const index = closestMainBoundingRect();
                await capture(mainBoundingRects[index].getRect());
            }
        }
        drawingState = DONE_PAINTING;
    }
}

(async function main() {
    predictWorker.postMessage({
        message: "LOAD",
    });
    predictWorker.onmessage = (e) => {
        console.log(e.data);
        predictWorker.onmessage = null;
    };

    document.body.appendChild(mainLayer.canvas);
    document.body.appendChild(boundingRectLayer.canvas);
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
        brush.radius = parseInt(e.target.value);
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
    document.getElementById("capture").addEventListener("click", capture);

    draw();

})()
