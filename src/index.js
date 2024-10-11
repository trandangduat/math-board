import { Layer } from "./Layer.js";
import { Stack } from "./Stack.js";
import { addToBuffer, clearBuffer, getNextPoints } from "./LineAlgorithms.js";
import { BoundingRect, SelectionRect } from "./BoundingRect.js";
import { Erase, Figure, Stroke, Transform } from "./Action.js";
import { Color } from "./Color.js";

const uiLayer = new Layer("ui");
const mainLayer = new Layer("main");
const resultLayer = new Layer("result");
const predictWorker = new Worker(
    new URL("./model/worker.js", import.meta.url), {
    type: 'module'
});
let mainBoundingRects = [];
let boundingRects = [];
let resultRects = [];
let prevCursor = null;
let selectedActions = [];
let selectRect = new SelectionRect();
let currentGroupBoundingRect = new BoundingRect();

let actions = new Stack();
let removedActions = new Stack();

const mousePosTracker = document.getElementById("mouse-pos");
const undoButton = document.getElementById("undo");
const redoButton = document.getElementById("redo");
const brushSizeSlider = document.getElementById("brush-size");
const brushColorPicker = document.getElementById("brush-color");
const [brushButton, eraserButton, selectButton] = [
    document.getElementById("brush-mode"),
    document.getElementById("eraser-mode"),
    document.getElementById("select-mode")
];

const [BEFORE_PAINTING, DURING_PAINTING, DONE_PAINTING] = [0, 1, 2];
const [MODE_BRUSH, MODE_ERASE, MODE_SELECT, MODE_TRANSLATE] = [0, 1, 2, 3];

let tempPath = [];
let drawingState = BEFORE_PAINTING;
let actionType = MODE_BRUSH;

const brush = {
    radius: 2,
    color: new Color(0, 0, 0, 1),
}

function clear() {
    mainLayer.clear();

    if (actionType === MODE_SELECT) {
        uiLayer.clear();
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
                mainLayer.drawStroke(new Stroke(tempPath, brush));
                break;
            }

            case MODE_ERASE: {
                break;
            }

            case MODE_SELECT: {
                if (selectRect.getRender()) {
                    uiLayer.drawSelectionRect(selectRect);
                }
                break;
            }
        }
    }


    for (let action of actions.getStack()) {
        switch (action.getType()) {
            case "stroke": {
                mainLayer.drawStroke(action);
                break;
            }

            case "figure": {
                mainLayer.drawFigure(action);
                break;
            }
        }
    }

    currentGroupBoundingRect.reset();
    if (selectedActions.length > 0) {
        for (let action of selectedActions) {
            currentGroupBoundingRect.join(action.getBoundingRect());
        }
        mainLayer.drawRect(currentGroupBoundingRect.getRect(), new Color(49, 130, 237));
    }

    undoButton.disabled = actions.size < 1;
    redoButton.disabled = removedActions.empty();
}

function undo(e) {
    e.preventDefault();
    if (actions.empty()) {
        return;
    }

    const lastAction = actions.pop();
    removedActions.push(lastAction);

    switch (lastAction.getType()) {
        case "erase": {
            const deletedStrokes = lastAction.getStrokeActions();
            for (let stroke of deletedStrokes) {
                stroke.setIsErased(false);
            }
            actions.push(...deletedStrokes);
            actions.sort((a, b) => a.getId() - b.getId());
            break;
        }

        case "transform": {
            const affectedActionsId = lastAction.getAffectedActionsId();
            const {x: dx, y: dy} = lastAction.getTranslate();

            affectedActionsId.sort((a, b) => a - b);

            let j = 0;
            for (let actionId of affectedActionsId) {
                for (; j < actions.size; j++) {
                    if (actions.get(j).getId() === actionId) {
                        actions.get(j).updateTranslate(-dx, -dy);
                        break;
                    }
                }
            }

            break;
        }
    }

    draw();
}

function redo(e) {
    e.preventDefault();
    if (removedActions.empty()) {
        return;
    }

    const lastRemovedAction = removedActions.pop();
    actions.push(lastRemovedAction);

    switch (lastRemovedAction.getType()) {
        case "erase": {
            const deletedStrokes = lastRemovedAction.getStrokeActions();
            for (let stroke of deletedStrokes) {
                let i = -1;
                for (let j = 0; j < actions.size; j++) {
                    if (actions.get(j).getId() === stroke.getId()) {
                        i = j;
                        break;
                    }
                }
                if (i !== -1) {
                    actions.get(i).setIsErased(true);
                    actions.remove(i);
                }
            }

            break;
        }

        case "transform": {
            const affectedActionsId = lastRemovedAction.getAffectedActionsId();
            const {x: dx, y: dy} = lastRemovedAction.getTranslate();

            affectedActionsId.sort((a, b) => a - b);

            let j = 0;
            for (let actionId of affectedActionsId) {
                for (; j < actions.size; j++) {
                    if (actions.get(j).getId() === actionId) {
                        actions.get(j).updateTranslate(dx, dy);
                        break;
                    }
                }
            }

            break;
        }
    }
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
                clearBuffer();

                boundingRects.push(new BoundingRect());
                addToBuffer(cursor);

                actions.push(new Stroke([cursor], brush));
                removedActions.clear();

                break;
            }

            case MODE_ERASE: {
                actions.push(new Erase([]))
                removedActions.clear();

                break;
            }

            case MODE_SELECT: {
                if (selectedActions.length > 0) {
                    if (currentGroupBoundingRect.cover(cursor)) {
                        actionType = MODE_TRANSLATE;
                        actions.push(new Transform([]));
                    }
                }

                if (actionType !== MODE_SELECT) {
                    break;
                }

                selectRect.setRender(true);
                selectRect.setOrigin(cursor.x, cursor.y);

                while (selectedActions.length > 0) {
                    selectedActions.pop().setIsSelected(false);
                }

                for (let i = actions.size - 1; i >= 0; i--) {
                    if (actionType !== MODE_SELECT) {
                        break;
                    }
                    const action = actions.get(i);
                    switch (action.getType()) {
                        case "stroke":
                        case "figure": {
                            if (action.getBoundingRect().cover(cursor)) {
                                action.setIsSelected(true);
                                selectedActions.push(action);

                                actionType = MODE_TRANSLATE;
                                actions.push(new Transform([]));
                                selectRect.setRender(false);
                            }
                            break;
                        }

                    }
                }
                break;
            }
        }
        drawingState = DURING_PAINTING;
        draw();
    }

    prevCursor = cursor;
}

function whileDrawing (e) {
    const cursor = getMousePos(e);
    mousePosTracker.textContent = `(${cursor.x}, ${cursor.y})`;

    if (drawingState == DURING_PAINTING) {
        switch (actionType) {

            case MODE_BRUSH: {
                addToBuffer(cursor);

                const nextPoints = getNextPoints();
                if (nextPoints.length > 0) {
                    actions.top().addPoint(nextPoints[0]);
                    tempPath = [...nextPoints];
                }

                break;
            }

            case MODE_ERASE: {
                for (let action of actions.getStack()) {
                    if (action.getType() === "stroke") {
                        if (!action.getIsErased() && action.collideWith([prevCursor, cursor])) {
                            actions.top().addStroke(action);
                            action.setIsErased(true);
                        }
                    }
                }
                break;
            }

            case MODE_SELECT: {
                if (selectRect.getRender()) {
                    selectRect.update(cursor.x, cursor.y);

                    selectedActions = [];
                    for (let action of actions.getStack()) {
                        switch (action.getType()) {
                            case "stroke":
                            case "figure": {
                                if (selectRect.intersect(action.getBoundingRect())) {
                                    selectedActions.push(action);
                                    if (!action.getIsSelected()) {
                                        action.setIsSelected(true);
                                    }
                                } else if (action.getIsSelected()) {
                                    action.setIsSelected(false);
                                }

                                break;
                            }
                        }
                    }
                }
                break;
            }

            case MODE_TRANSLATE: {
                let dx = cursor.x - prevCursor.x;
                let dy = cursor.y - prevCursor.y;
                for (let action of selectedActions) {
                    action.updateTranslate(dx, dy);
                }
                if (actions.top().getType() === "transform") {
                    actions.top().updateTranslate(dx, dy);
                }
                break;
            }
        }
        draw();
    }

    prevCursor = cursor;
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
                while (tempPath.length > 0) {
                    actions.top().addPoint(tempPath.pop());
                }
                // tempPath = [];

                // const bestBox = boundingRects[boundingRects.length - 1].findBestNearbyBoundingBox(mainBoundingRects);
                // if (bestBox.index === -1) {
                //     mainBoundingRects.push(new BoundingRect());
                //     mainBoundingRects[mainBoundingRects.length - 1].join(boundingRects[boundingRects.length - 1]);
                // } else {
                //     mainBoundingRects[bestBox.index].join(boundingRects[boundingRects.length - 1]);
                // }
                // if (detectEqualSign()) {
                //     await capture(mainBoundingRects[bestBox.index]);
                // }
                break;
            }

            case MODE_ERASE: {
                for (let i = actions.size - 1; i >= 0; i--) {
                    let action = actions.get(i);
                    if (action.getType() === "stroke" && action.getIsErased()) {
                        actions.remove(i);
                    }
                }
                break;
            }

            case MODE_SELECT: {
                if (selectRect.getRender()) {
                    selectRect.setRender(false);
                }

                break;
            }

            case MODE_TRANSLATE: {
                if (actions.top().getType() === "transform") {
                    if (actions.top().getTranslate().x === 0 && actions.top().getTranslate().y === 0) {
                        actions.pop();
                    } else {
                        actions.top().setAffectedActionsId(selectedActions.map(a => a.getId()));
                        removedActions.clear();
                    }
                }

                actionType = MODE_SELECT;
                break;
            }
        }
        drawingState = BEFORE_PAINTING;
        draw();
        console.log([...actions.getStack()]);
    }

    prevCursor = null;
}

function handleKeyDown (e) {
    console.log(e.key);

    switch (e.key) {

        case "Delete": {
            if (actionType === MODE_SELECT && selectedActions.length > 0) {
                actions.push(new Erase(selectedActions));
                removedActions.clear();

                for (let action of selectedActions) {
                    let i = -1;
                    for (let j = 0; j < actions.size; j++) {
                        if (actions.get(j).getId() === action.getId()) {
                            i = j;
                            break;
                        }
                    }
                    if (i !== -1) {
                        actions.get(i).setIsErased(true);
                        actions.remove(i);
                    }
                }
                selectedActions = [];
                draw();
            }

            break;
        }

        case "z": {
            if (e.ctrlKey) {
                undo(e);
            }
            break;
        }

        case "y": {
            if (e.ctrlKey) {
                redo(e);
            }
            break;
        }

        case "b": {
            brushButton.click();
            break;
        }

        case "e": {
            eraserButton.click();
            break;
        }

        case "s": {
            selectButton.click();
            break;
        }

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
    document.body.appendChild(uiLayer.canvas);

    uiLayer.canvas.addEventListener("mousedown", startDrawing);
    uiLayer.canvas.addEventListener("mousemove", whileDrawing);
    uiLayer.canvas.addEventListener("mouseup", finishDrawing);
    uiLayer.canvas.addEventListener("mouseout", finishDrawing);

    uiLayer.canvas.addEventListener("keydown", handleKeyDown);

    undoButton.addEventListener("click", undo);
    redoButton.addEventListener("click", redo);

    brushSizeSlider.addEventListener("input", (e) => {
        brush.radius = parseInt(e.target.value);
    });
    brushColorPicker.addEventListener("input", (e) => {
        brush.color.setHex(e.target.value);
    });

    [brushButton, eraserButton, selectButton].forEach((button) => {
        button.addEventListener("click", () => {
            [brushButton, eraserButton, selectButton].forEach((btn) => {
                if (btn !== button) {
                    btn.classList.remove("active");
                } else {
                    btn.classList.remove("active");
                }
            });
            button.classList.add("active");
            if (button === brushButton) {
                actionType = MODE_BRUSH;
            } else if (button === eraserButton) {
                actionType = MODE_ERASE;
            } else if (button === selectButton) {
                actionType = MODE_SELECT;
            }

            if (button !== selectButton) {
                while (selectedActions.length > 0) {
                    selectedActions.pop().setIsSelected(false);
                    draw();
                }
            }
        });
    });


    const img = new Image();
    img.src = "https://mdn.github.io/shared-assets/images/examples/rhino.jpg";

    actions.push(new Figure(img, 50, 50));

    draw();

})()
