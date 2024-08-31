const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

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
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

addEventListener("mousemove", (e) => {
    cursor.x = e.clientX - canvas.getBoundingClientRect().left;
    cursor.y = e.clientY - canvas.getBoundingClientRect().top;
});

const paths = [];
let temporaryPath = [];
let mainPath = [];
let isDrawing = false;

function drawStroke (start, end) {
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

function lineSimplify (path, epsilon) {
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
        resultPath = [...lineSimplify(path1, epsilon).slice(0, -1), ...lineSimplify(path2, epsilon)];
    } else {
        resultPath = [path[0], path[path.length - 1]];
    }
    return resultPath;
}

function chaikin (path, level) {
    if (!level)
        return path;

    let newPath = [path[0]];
    for (let i = 1; i < path.length; i++) {
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
        newPath.push(q1, q2);
    }
    newPath.push(path[path.length - 1]);
    return chaikin(newPath, level - 1);
}

canvas.addEventListener("mousedown", (e) => {
    paths.push(temporaryPath);
    temporaryPath.push({ x: cursor.x, y: cursor.y });
    mainPath.push({ x: cursor.x, y: cursor.y });
    isDrawing = true;
});

canvas.addEventListener("mousemove", (e) => {
    if (isDrawing && temporaryPath.length > 0) {
        let point = temporaryPath.at(-1);
        temporaryPath.push(...drawStroke(point, cursor));
        mainPath.push({ x: cursor.x, y: cursor.y });
    }
});

canvas.addEventListener("mouseup", (e) => {
    console.log("before simplify: ", mainPath);
    const simplifiedPath = lineSimplify(mainPath, 3);
    console.log("after simplify: ", simplifiedPath);
    const smoothedPath = chaikin(simplifiedPath, 2);
    console.log("after smoothing: ", smoothedPath);

    const finalPath = [];
    for (let i = 1; i < smoothedPath.length; i++) {
        finalPath.push(...drawStroke(smoothedPath[i - 1], smoothedPath[i]));
    }

    paths[paths.length - 1] = finalPath;

    mainPath = [];
    temporaryPath = [];
    isDrawing = false;
});

function drawBrushPoint (x, y) {
    ctx.beginPath();
    ctx.arc(x, y, brush.radius, 0, Math.PI * 2);
    ctx.fillStyle = brush.color;
    ctx.fill();
}

function drawPaths (paths) {
    paths.forEach(path => {
        path.forEach(point => {
            drawBrushPoint(point.x, point.y);
        })
    });
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
    clear();

    brush.x = cursor.x;
    brush.y = cursor.y;
    brush.draw();
    drawPaths(paths);

    requestAnimationFrame(draw);
}

(function main() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    draw();
})();
