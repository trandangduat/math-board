import { Layer } from "./Layer.js";
import { Stack } from "./Stack.js";
import { addToBuffer, clearBuffer, createStroke, getNextPoints } from "./LineAlgorithms.js";
import { BoundingRect } from "./BoundingRect.js";
import { Stroke } from "./Action.js";

const uiLayer = new Layer("ui");
const mainLayer = new Layer("main");
const drawingLayer = new Layer("drawing");
const tempLayer = new Layer("temp");
const boundingRectLayer = new Layer("bounding-rect");
const resultLayer = new Layer("result");
const predictWorker = new Worker(
    new URL("./model/worker.js", import.meta.url), {
    type: 'module'
});
let mainBoundingRects = [];
let boundingRects = [];
let resultRects = [];

let actions = new Stack();
let removedActions = new Stack();

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

let tempPath = [];
let newPath = [];
let drawingState = BEFORE_PAINTING;
let actionType = MODE_BRUSH;

const brush = {
    x: 0,
    y: 0,
    radius: 4,
    color: "black",
}

const eraser = {
    x: 0,
    y: 0,
    radius: 2,
}

function clear() {
    mainLayer.clear();
    boundingRectLayer.clear();

    if (drawingState === DURING_PAINTING) {
        tempLayer.clear();
    }
}

function renderExpressionsResults() {
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
        // draw text animation
        mainLayer.joint(resultLayer);
        resultLayer.clear();
        res.isRendered = true;
    }
}

function draw() {
    clear();

    if (drawingState == DURING_PAINTING) {
        switch (actionType) {
            case MODE_BRUSH: {
                drawingLayer.drawStroke(new Stroke(newPath, brush));
                tempLayer.drawStroke(new Stroke(tempPath, brush));
                break;
            }

            case MODE_ERASE: {
                mainLayer.drawStroke(new Stroke(newPath, eraser));
                break;
            }
        }
        newPath = [newPath[newPath.length - 1]];
    }

    for (let stroke of actions.getStack()) {
        if (stroke.getType() === "stroke") {
            mainLayer.drawStroke(stroke);
        }
    }
    for (let stroke of actions.getStack()) {
        if (stroke.getType() === "stroke") {
            const { x, y, w, h } = stroke.getBoundingRect().getRect();
            boundingRectLayer.ctx.strokeStyle = "blue";
            boundingRectLayer.ctx.lineWidth = 1;
            boundingRectLayer.ctx.strokeRect(x, y, w, h);
        }
    }

    undoButton.disabled = actions.size < 1;
    redoButton.disabled = removedActions.empty();

    // Draw result next to matching main bounding box
    renderExpressionsResults();
}

function undo(e) {
    e.preventDefault();
    if (actions.empty()) {
        return;
    }

    const action = actions.pop();
    removedActions.push(action);
    draw();
}

function redo(e) {
    e.preventDefault();
    if (removedActions.empty()) {
        return;
    }

    const action = removedActions.pop();
    actions.push(action);
    draw();
}

async function capture (bdRect) {
    const rect = bdRect.getRect();
    const id = bdRect.id;
    const imgData = mainLayer.getSnapshot(rect);
    predictWorker.postMessage({
        message: "PREDICT",
        imgData: imgData
    });
    predictWorker.onmessage = (e) => {
        // console.log(e.data);
        resultRects = resultRects.filter(r => r.bdrectId !== id);
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
    const cursor = getMousePos(e);

    if (drawingState === BEFORE_PAINTING) {
        switch (actionType) {
            case MODE_BRUSH: {
                tempPath = [];
                newPath = [];
                clearBuffer();

                boundingRects.push(new BoundingRect());
                newPath.push(cursor);
                addToBuffer(cursor);

                actions.push(new Stroke([cursor], brush));
                removedActions.clear();

                break;
            }

            case MODE_ERASE: {
                newPath = [];
                newPath.push(cursor);
                break;
            }
        }
        drawingState = DURING_PAINTING;
        draw();
    }
}

function whileDrawing (e) {
    const cursor = getMousePos(e);
    brush.x = cursor.x;
    brush.y = cursor.y;
    eraser.x = cursor.x;
    eraser.y = cursor.y;
    mousePosTracker.textContent = `(${cursor.x}, ${cursor.y})`;

    if (drawingState == DURING_PAINTING) {
        switch (actionType) {

            case MODE_BRUSH: {
                addToBuffer(cursor);
                const nextPoints = getNextPoints();
                if (nextPoints.length > 0) {
                    // save one stable smoothed point
                    newPath.push(nextPoints[0]);
                    actions.top().addPoint(nextPoints[0]);

                    // save the rest of average points between the stable point to the cursor
                    tempPath = [];
                    for (let i = 1; i < nextPoints.length; i++) {
                        tempPath.push(nextPoints[i]);
                    }
                }
                if (newPath.length > 0) {
                    const lastPoint = newPath[newPath.length - 1];
                    boundingRects[boundingRects.length - 1].update(lastPoint.x, lastPoint.y, brush.radius);
                }
                break;
            }

            case MODE_ERASE: {
                newPath.push(cursor);
                break;
            }
        }
        draw();
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
    if (drawingState === DURING_PAINTING) {
        switch (actionType) {
            case MODE_BRUSH: {
                // mainLayer.joint(drawingLayer);
                // mainLayer.joint(tempLayer);
                newPath = [];
                tempPath = [];
                drawingLayer.clear();
                tempLayer.clear();

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

            case MODE_ERASE: {
                break;
            }
        }
        drawingState = BEFORE_PAINTING;
        draw();
    }
}

(async function main() {
    // predictWorker.postMessage({
    //     message: "LOAD",
    // });
    predictWorker.onmessage = (e) => {
        console.log(e.data);
        predictWorker.onmessage = null;
    };

    document.body.appendChild(mainLayer.canvas);
    document.body.appendChild(boundingRectLayer.canvas);
    document.body.appendChild(drawingLayer.canvas);
    document.body.appendChild(tempLayer.canvas);
    // document.body.appendChild(resultLayer.canvas);
    document.body.appendChild(uiLayer.canvas);

    uiLayer.canvas.addEventListener("mousedown", startDrawing);
    uiLayer.canvas.addEventListener("mousemove", whileDrawing);
    uiLayer.canvas.addEventListener("mouseup", finishDrawing);
    uiLayer.canvas.addEventListener("mouseout", finishDrawing);

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
