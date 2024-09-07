import {
    perpendicularDistance,
    getAngleBetweenVectors,
    radianToDegree
} from "./Geometry.js";

export function createStroke (start, end) {
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

export function DouglasPeucker (path, epsilon) {
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

export function Chaikin (path, level) {
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

// source https://stackoverflow.com/questions/40324313/svg-smooth-freehand-drawing/

// Below smoothing method is called 'Moving Average':
// it calculates the average of the last mouse positions kept in a buffer,
// the buffer is updated real-time with the current mouse position.

const BUFFER_SIZE = 4;
let buffer = [];

export function addToBuffer (point) {
    buffer.push(point);
    while (buffer.length > BUFFER_SIZE) {
        buffer.shift();
    }
}

export function clearBuffer() {
    buffer = [];
}

function getAveragePoint (offset) {
    const len = buffer.length;
    // Ensures the buffer has an odd number of points, which is beneficial for symmetric averaging, leading to smoother curves.
    if (len % 2 === 1 || len == BUFFER_SIZE) {
        let sum = { x: 0, y: 0 };
        let count = 0;
        for (let i = offset; i < len; i++) {
            sum.x += buffer[i].x;
            sum.y += buffer[i].y;
            count++;
        }
        return {
            x: Math.round(sum.x / count),
            y: Math.round(sum.y / count)
        };
    }
    return null;
}

export function getNextPoints() {
    let returnPoints = [];
    let point = getAveragePoint(0);
    if (point) {
        returnPoints.push(point);
        // Skips every other point to improve smoothing and reduce jitter from rapid mouse movements.
        for (let offset = 2; offset < buffer.length; offset += 2) {
            point = getAveragePoint(offset);
            if (point) {
                returnPoints.push(point);
            }
        }
    }
    return returnPoints;
}
