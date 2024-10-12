import { Layer } from "./Layer.js";
import { Stack } from "./Stack.js";
import { addToBuffer, clearBuffer, getNextPoints } from "./LineAlgorithms.js";
import { BoundingRect, SelectionRect } from "./BoundingRect.js";
import { Erase, Figure, Stroke, Transform } from "./Action.js";
import { Color } from "./Color.js";
import { getFontWeightFromStrokeRadius } from "./Utils.js";

const uiLayer = new Layer("ui");
const mainLayer = new Layer("main");
const predictWorker = new Worker(
    new URL("./model/worker.js", import.meta.url), {
    type: 'module'
});

let expressionGroups = [];
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

    for (let i = 0; i < expressionGroups.length; i++) {
        const bdRect = new BoundingRect();
        for (let action of expressionGroups[i]) {
            bdRect.join(action.getBoundingRect());
        }
        mainLayer.drawRect(bdRect.getRect(), new Color(130, 30, 237));
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
            const erasedActions = lastAction.getErasedActions();
            for (let action of erasedActions) {
                action.setIsErased(false);
            }
            actions.push(...erasedActions);
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
            const erasedActions = lastRemovedAction.getErasedActions();
            for (let action of erasedActions) {
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

async function solveMathExpressions (expressionGroup, groupIndex) {
    const tempLayer = new Layer("temporary");
    const bdRect = new BoundingRect();

    for (let action of expressionGroup) {
        tempLayer.drawStroke(action);
        bdRect.join(action.getBoundingRect());
    }

    const rect = bdRect.getRect();
    const imgData = tempLayer.getSnapshot(rect);

    predictWorker.postMessage({
        message: "PREDICT",
        imgData: imgData
    });

    predictWorker.onmessage = async(e) => {
        addEvalResultToScreen(e.data, groupIndex);
        predictWorker.onmessage = null;
    };
}

async function addEvalResultToScreen (result, groupIndex) {
    const bdRect = new BoundingRect();
    for (let action of expressionGroups[groupIndex]) {
        bdRect.join(action.getBoundingRect());
    }
    const rect = bdRect.getRect();

    const tempLayer = new Layer("temporary");
    const resultRect = tempLayer.drawText(
        result[0].evalResult,
        0,
        0,
        getFontWeightFromStrokeRadius(brush.radius),
        rect.h * 0.9,
        "Playpen Sans, cursive",
        new Color(200, 0, 0)
    );
    console.log(result);
    const image = await createImageBitmap(tempLayer.getSnapshot(resultRect, true));

    actions.push(new Figure(
        image,
        bdRect.max_x + 10,
        (bdRect.max_y + bdRect.min_y - resultRect.h) / 2,
        resultRect.w,
        resultRect.h
    ));

    draw();
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
                for (let i = actions.size - 1; i >= 0; i--) {
                    const action = actions.get(i);

                    switch (action.getType()) {
                        case "stroke": {
                            if (!action.getIsErased() && action.collideWith([prevCursor, cursor])) {
                                actions.top().addAction(action);
                                action.setIsErased(true);
                            }
                            break;
                        }

                        case "figure": {
                            if (!action.getIsErased() && action.getBoundingRect().cover(cursor)) {
                                actions.top().addAction(action);
                                action.setIsErased(true);
                            }
                            break;
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
    let curRect = actions.top().getBoundingRect().getRect();
    let preRect = null;

    for (let i = actions.size - 2; i >= 0; i--) {
        let action = actions.get(i);
        if (action.getType() === "stroke") {
            preRect = action.getBoundingRect().getRect();
            break;
        }
    }

    if (preRect === null) {
        return false;
    }

    const xIntersect = Math.min(preRect.x + preRect.w, curRect.x + curRect.w) - Math.max(preRect.x, curRect.x);
    const yIntersect = Math.min(preRect.y + preRect.h, curRect.y + curRect.h) - Math.max(preRect.y, curRect.y);

    return (xIntersect * 2 >= Math.min(curRect.w, preRect.w) && yIntersect < 5);
}

async function finishDrawing (e) {
    if (drawingState === DURING_PAINTING) {

        switch (actionType) {

            case MODE_BRUSH: {
                while (tempPath.length > 0) {
                    actions.top().addPoint(tempPath.pop());
                }

                const mainBoundingRects = [];

                for (let i = 0; i < expressionGroups.length; i++) {
                    expressionGroups[i] = expressionGroups[i].filter(a => !a.getIsErased());

                    const bdRect = new BoundingRect();
                    for (let action of expressionGroups[i]) {
                        bdRect.join(action.getBoundingRect());
                    }
                    mainBoundingRects.push(bdRect);
                }

                const lastActionBdRect = actions.top().getBoundingRect();
                const bestBox = lastActionBdRect.findBestNearbyBoundingBox(mainBoundingRects);

                /*
                    Find the main bounding rect which latest action bounding rect belongs to
                */
                if (bestBox.index === -1) {
                    expressionGroups.push([]);
                    bestBox.index = expressionGroups.length - 1;
                }
                expressionGroups[bestBox.index].push(actions.top());

                /*
                    If there is an equal sign detected, solve its group math expressions
                */
                if (detectEqualSign()) {
                   await solveMathExpressions(expressionGroups[bestBox.index], bestBox.index);
                }

                break;
            }

            case MODE_ERASE: {
                for (let i = actions.size - 1; i >= 0; i--) {
                    let action = actions.get(i);
                    switch (action.getType()) {
                        case "stroke":
                        case "figure": {
                            if (action.getIsErased()) {
                                actions.remove(i);
                            }
                            break;
                        }
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
    predictWorker.postMessage({
        message: "LOAD",
    });
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

})()
