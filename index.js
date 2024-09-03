import { Layer } from "./Layer.js";
const uiLayer = new Layer("ui");
const mainLayer = new Layer("main");
const offscreenLayer = new Layer("offscreen");
const mousePosTracker = document.getElementById("mouse-pos");

const cursor = {
    x: 0,
    y: 0
};

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

const paths = [];
let temporaryPath = [];
let mainPath = [];
let isDrawing = false;

function createStroke (start, end) {
    let dx = end.x - start.x;
    let dy = end.y - start.y;
    let additionalPoints = [];

    if (!dx) {
        while (start.y !== end.y) {
            start.y += (dy > 0) ? 1 : -1;
            additionalPoints.push({
                x: start.x,
                y: start.y
            });
        }
    }
    else if (!dy) {
        while (start.x !== end.x) {
            start.x += (dx > 0) ? 1 : -1;
            additionalPoints.push({
                x: start.x,
                y: start.y
            });
        }
    }
    else {
        let step = (Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy));
        let sx = dx / step;
        let sy = dy / step;
        while (start.x !== end.x && start.y !== end.y) {
            start.x += sx;
            start.y += sy;
            additionalPoints.push({
                x: Math.round(start.x),
                y: Math.round(start.y)
            });
        }
    }

    return additionalPoints;
}

function perpendicularDistance (point, line) {
    let x0 = point.x;
    let y0 = point.y;
    let x1 = line[0].x;
    let y1 = line[0].y;
    let x2 = line[1].x;
    let y2 = line[1].y;
    return Math.abs((y2 - y1) * x0 - (x2 - x1) * y0 + x2 * y1 - y2 * x1) / Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));
}

function DouglasPeucker (path, epsilon) {
    let maxDistance = 0;
    let index = 0;
    for (let i = 1; i < path.length - 1; i++) {
        let d = perpendicularDistance(path[i], [path[0], path[path.length - 1]]);
        if (d > maxDistance) {
            maxDistance = d;
            index = i;
        }
    }
    let resultPath = [];
    if (maxDistance > epsilon) {
        let path1 = path.slice(0, index + 1);
        let path2 = path.slice(index);
        resultPath = [...DouglasPeucker(path1, epsilon).slice(0, -1), ...DouglasPeucker(path2, epsilon)];
    } else {
        resultPath = [path[0], path[path.length - 1]];
    }
    return resultPath;
}

function getAngleBetweenVectors (v1, v2) {
    let dot = v1.x * v2.x + v1.y * v2.y;
    let d1 = Math.sqrt(v1.x ** 2 + v1.y ** 2);
    let d2 = Math.sqrt(v2.x ** 2 + v2.y ** 2);
    if (!d1 || !d2) {
        console.log("Division by zero");
        return 0;
    }
    return Math.acos(dot / (d1 * d2));
}

function radianToDegree (radian) {
    return radian * 180 / Math.PI;
}

function Chaikin (path, level) {
    if (!level)
        return path;

    let newPath = [path[0]];
    let len = path.length;
    for (let i = 1; i < len; i++) {
        let p0 = (i > 1 ? path[i - 2] : null);
        let p1 = path[i - 1];
        let p2 = path[i];
        let q1 = {
            x: Math.round(0.75 * p1.x + 0.25 * p2.x),
            y: Math.round(0.75 * p1.y + 0.25 * p2.y)
        };
        let q2 = {
            x: Math.round(0.25 * p1.x + 0.75 * p2.x),
            y: Math.round(0.25 * p1.y + 0.75 * p2.y)
        };
        if (p0) {
            let v10 = { x: p0.x - p1.x, y: p0.y - p1.y };
            let v12 = { x: p2.x - p1.x, y: p2.y - p1.y };
            let angle = radianToDegree(getAngleBetweenVectors(v10, v12));
            if (angle <= 90) {
                newPath.pop();
                newPath.push(p1);
            }
        }

        let lastPoint = newPath[newPath.length - 1];
        if (lastPoint.x !== q1.x || lastPoint.y !== q1.y) {
            newPath.push(q1);
        }
        if (q1.x !== q2.x || q1.y !== q2.y) {
            newPath.push(q2);
        }
    }
    newPath.push(path[path.length - 1]);
    return Chaikin(newPath, level - 1);
}

function drawBrushPoint (x, y) {
    mainLayer.ctx.beginPath();
    mainLayer.ctx.arc(x, y, brush.radius, 0, Math.PI * 2);
    mainLayer.ctx.fillStyle = brush.color;
    mainLayer.ctx.fill();
}

function drawStrokes (paths) {
    paths.forEach(path => {
        path.forEach(point => {
            drawBrushPoint(point.x, point.y);
        })
    });
}

function clear() {
    uiLayer.clear();
    mainLayer.clear();
}

function draw() {
    clear();

    brush.x = cursor.x;
    brush.y = cursor.y;
    brush.draw();

    drawStrokes(paths);
    mousePosTracker.innerHTML = `(x: ${cursor.x}, y: ${cursor.y})`;

    requestAnimationFrame(draw);
}

(function main() {
    document.body.appendChild(mainLayer.canvas);
    document.body.appendChild(uiLayer.canvas);

    addEventListener("mousemove", (e) => {
        cursor.x = e.clientX - mainLayer.getBoudingBox().left;
        cursor.y = e.clientY - mainLayer.getBoudingBox().top;
    });

    uiLayer.canvas.addEventListener("mousedown", (e) => {
        paths.push(temporaryPath);
        temporaryPath.push({ x: cursor.x, y: cursor.y });
        mainPath.push({ x: cursor.x, y: cursor.y });
        isDrawing = true;
    });

    uiLayer.canvas.addEventListener("mousemove", (e) => {
        if (isDrawing && temporaryPath.length > 0) {
            let point = temporaryPath.at(-1);
            temporaryPath.push(...createStroke(point, cursor));
            mainPath.push({ x: cursor.x, y: cursor.y });
        }
    });

    uiLayer.canvas.addEventListener("mouseup", (e) => {
        const simplifiedPath = DouglasPeucker(mainPath, 3);
        const smoothedPath = Chaikin(simplifiedPath, 1);
        const finalPath = [smoothedPath[0]];

        for (let i = 1; i < smoothedPath.length; i++) {
            finalPath.push(...createStroke(smoothedPath[i - 1], smoothedPath[i]));
        }

        paths[paths.length - 1] = finalPath;

        mainPath = [];
        temporaryPath = [];
        isDrawing = false;
    });

    draw();
})()
