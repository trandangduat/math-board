import { Layer } from "./Layer.js";
import { Stack } from "./Stack.js";
import { addToBuffer, clearBuffer, createStroke, getNextPoints } from "./LineAlgorithms.js";
import { BoundingRect } from "./BoundingRect.js";

const uiLayer = new Layer("ui");
const mainLayer = new Layer("main");
const offscreenLayer = new Layer("offscreen");
const drawingLayer = new Layer("drawing");
const tempLayer = new Layer("temp");
const boundingRectLayer = new Layer("bounding-rect");
const resultLayer = new Layer("result");
const History = new Stack();
const DeletedHistory = new Stack();
const predictWorker = new Worker(
    new URL("./model/worker.js", import.meta.url), {
    type: 'module'
});
const mainBoundingRects = [];
const boundingRects = [];
const resultRects = [];

const mousePosTracker = document.getElementById("mouse-pos");
const undoButton = document.getElementById("undo");
const redoButton = document.getElementById("redo");
const brushSizeSlider = document.getElementById("brush-size");
const brushColorPicker = document.getElementById("brush-color");
const eraserSizeSlider = document.getElementById("eraser-size");
const [brushButton, eraserButton] = [
    document.getElementById("brush-mode"),
    document.getElementById("eraser-mode")
];

const [BEFORE_PAINTING, DURING_PAINTING, DONE_PAINTING] = [0, 1, 2];
const [MODE_BRUSH, MODE_ERASE] = [0, 1];

const brush = {
    x: 0,
    y: 0,
    radius: 4,
    color: "black",
    draw() {
        uiLayer.ctx.beginPath();
        uiLayer.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        uiLayer.ctx.strokeStyle = this.color;
        uiLayer.ctx.stroke();
    }
}

const eraser = {
    x: 0,
    y: 0,
    radius: 2,
    draw() {
        uiLayer.ctx.beginPath();
        uiLayer.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        uiLayer.ctx.strokeStyle = "black";
        uiLayer.ctx.stroke();
    }
}

let tempPath = [];
let newPath = [];
let drawingState = BEFORE_PAINTING;
let actionType = MODE_BRUSH;

function clear() {
    uiLayer.clear();
    // boundingRectLayer.clear();
    if (drawingState === DURING_PAINTING) {
        tempLayer.clear();
    }
}

function draw() {
    clear();

    if (actionType == MODE_BRUSH) {
        brush.draw();
    } else if (actionType == MODE_ERASE) {
        eraser.draw();
    }

    if (drawingState == DURING_PAINTING) {
        switch (actionType) {
            case MODE_BRUSH: {
                drawingLayer.drawStroke(newPath, brush);
                tempLayer.drawStroke(tempPath, brush);
                break;
            }
            case MODE_ERASE: {
                mainLayer.drawStroke(newPath, eraser);
                break;
            }
        }
        newPath = [newPath[newPath.length - 1]];
    }
    // Drawing bounding boxes (for debugging)
    // for (let bdx of boundingRects) {
    //     const rect = bdx.getRect();
    //     boundingRectLayer.ctx.strokeStyle = "green";
    //     boundingRectLayer.ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
    // }
    // for (let bdx of mainBoundingRects) {
    //     const rect = bdx.getRect();
    //     boundingRectLayer.ctx.strokeStyle = "blue";
    //     boundingRectLayer.ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
    // }
    // Draw result next to matching main bounding box
    for (let res of resultRects) {
        if (res.isRendered) {
            continue;
        }
        const rect = mainBoundingRects.find((r) => r.id === res.bdrectId).getRect();
        const fontSize = rect.h * 0.9;
        const fontWeight = Math.min(900, Math.max(400, Math.round(brush.radius / 100 * 100)));
        resultLayer.drawText(
            res.value,
            rect.x + rect.w + 10,
            rect.y + rect.h / 2 + fontSize / 7,
            `${fontWeight} ${fontSize}px Shantell Sans, cursive`,
            "#FBAE56"
        );
        res.isRendered = true;
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

async function capture (bdRect) {
    const rect = bdRect.getRect();
    const id = bdRect.id;
    console.log(id);
    const imgData = mainLayer.getSnapshot(rect);
    predictWorker.postMessage({
        message: "PREDICT",
        imgData: imgData
    });
    predictWorker.onmessage = (e) => {
        // console.log(e.data);
        resultRects.push({
            bdrectId: id,
            value: e.data[0].evalResult,
            isRendered: false
        });
        predictWorker.onmessage = null;
    };
    predictWorker.onerror = (e) => {
        console.error("Worker error: ", e.message);
        predictWorker.onerror = null;
    };
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

    tempPath = [];
    newPath = [];
    clearBuffer();
    boundingRects.push(new BoundingRect());

    const cursor = getMousePos(e);
    newPath.push(cursor);
    addToBuffer(cursor);
}

function whileDrawing (e) {
    e.preventDefault();
    const cursor = getMousePos(e);
    brush.x = cursor.x;
    brush.y = cursor.y;
    eraser.x = cursor.x;
    eraser.y = cursor.y;
    mousePosTracker.textContent = `(${cursor.x}, ${cursor.y})`;

    if (drawingState == DURING_PAINTING) {
        switch (actionType) {
            case MODE_BRUSH:{
                addToBuffer(cursor);
                const nextPoints = getNextPoints();
                if (nextPoints.length > 0) {
                    // save one stable smoothed point
                    newPath.push(...createStroke(newPath[newPath.length - 1], nextPoints[0]));
                    // save the rest of average points between the stable point to the cursor
                    tempPath = [];
                    for (let i = 1; i < nextPoints.length; i++) {
                        tempPath.push(...createStroke(nextPoints[i - 1], nextPoints[i]));
                    }
                }
                if (newPath.length > 0) {
                    const lastPoint = newPath[newPath.length - 1];
                    boundingRects[boundingRects.length - 1].update(lastPoint.x, lastPoint.y, brush.radius);
                }
                break;
            }

            case MODE_ERASE: {
                newPath.push(...createStroke(newPath[newPath.length - 1], cursor));
                break;
            }
        }
    }
}

function detectEqualSign() {
    if (boundingRects.length < 2) {
        return false;
    }
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
    return (xIntersect * 2 >= Math.min(curRect.w, preRect.w) && yIntersect < 5);
}

async function finishDrawing (e) {
    e.preventDefault();

    if (drawingState === DURING_PAINTING) {
        // Joint the drawing layer to the main layer and clear the drawing layer
        mainLayer.joint(drawingLayer);
        mainLayer.joint(tempLayer);
        drawingLayer.clear();
        offscreenLayer.clone(mainLayer);
        History.push(mainLayer.getImageData());
        DeletedHistory.clear();
        redoButton.disabled = true;
        undoButton.disabled = false;

        switch (actionType) {
            case MODE_BRUSH: {
                const bestBox = boundingRects[boundingRects.length - 1].findBestNearbyBoundingBox(mainBoundingRects);
                if (bestBox.index === -1) {
                    mainBoundingRects.push(new BoundingRect());
                    mainBoundingRects[mainBoundingRects.length - 1].join(boundingRects[boundingRects.length - 1]);
                } else {
                    mainBoundingRects[bestBox.index].join(boundingRects[boundingRects.length - 1]);
                }
                if (detectEqualSign()) {
                    await capture(mainBoundingRects[bestBox.index]);
                }
                break;
            }
        }
        drawingState = BEFORE_PAINTING;
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
    document.body.appendChild(drawingLayer.canvas);
    document.body.appendChild(tempLayer.canvas);
    document.body.appendChild(resultLayer.canvas);
    document.body.appendChild(uiLayer.canvas);

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
    eraserSizeSlider.addEventListener("input", (e) => {
        eraser.radius = parseInt(e.target.value);
    });

    [brushButton, eraserButton].forEach((button) => {
        button.addEventListener("click", () => {
            [brushButton, eraserButton].forEach((btn) => {
                const controlGroup = btn.parentElement.querySelector(".control");
                if (btn !== button) {
                    btn.classList.remove("active");
                    controlGroup.style.display = "none";
                } else {
                    btn.classList.remove("active");
                    controlGroup.style.display = "flex";
                }
            });
            button.classList.add("active");
            if (button === brushButton) {
                actionType = MODE_BRUSH;
                mainLayer.setCompositeOperation("source-over");
            } else if (button === eraserButton) {
                actionType = MODE_ERASE;
                mainLayer.setCompositeOperation("destination-out");
            }
        });
    });

    draw();

})()
