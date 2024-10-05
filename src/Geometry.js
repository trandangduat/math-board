export function perpendicularDistance (point, line) {
    let x0 = point.x;
    let y0 = point.y;
    let x1 = line[0].x;
    let y1 = line[0].y;
    let x2 = line[1].x;
    let y2 = line[1].y;
    return Math.abs((y2 - y1) * x0 - (x2 - x1) * y0 + x2 * y1 - y2 * x1) / Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));
}

export function checkSegmentsCollision (line1, line2) {
    let x1 = line1[0].x;
    let y1 = line1[0].y;
    let x2 = line1[1].x;
    let y2 = line1[1].y;
    let x3 = line2[0].x;
    let y3 = line2[0].y;
    let x4 = line2[1].x;
    let y4 = line2[1].y;
    let d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (!d) {
        return false;
    }
    let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / d;
    let u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / d;
    return t >= 0 && t <= 1 && u >= 0 && u <= 1;
}

export function checkPointInsideCircle (point, circle) {
    let x = point.x;
    let y = point.y;
    let r = circle.radius;
    let dx = x - circle.x;
    let dy = y - circle.y;
    return dx * dx + dy * dy <= r * r;
}

export function checkSegmentCircleCollision(line, circle, includeSegmentInsideCircle = true) {
    if (includeSegmentInsideCircle) {
        if (checkPointInsideCircle(line[0], circle) || checkPointInsideCircle(line[1], circle)) {
            return true;
        }
    }

    let { x: x1, y: y1 } = line[0];
    let { x: x2, y: y2 } = line[1];
    let { x: cx, y: cy, radius } = circle;

    let dx = x2 - x1;
    let dy = y2 - y1;

    let fx = x1 - cx;
    let fy = y1 - cy;

    let a = dx * dx + dy * dy;
    let b = 2 * (fx * dx + fy * dy);
    let c = fx * fx + fy * fy - radius * radius;

    let delta = b * b - 4 * a * c;

    if (delta < 0) {
        return false;
    }

    let t1 = (-b - Math.sqrt(delta)) / (2 * a);
    let t2 = (-b + Math.sqrt(delta)) / (2 * a);

    if (t1 >= 0 && t1 <= 1) return true;
    if (t2 >= 0 && t2 <= 1) return true;

    return false;
}

export function getAngleBetweenVectors (v1, v2) {
    let dot = v1.x * v2.x + v1.y * v2.y;
    let d1 = Math.sqrt(v1.x ** 2 + v1.y ** 2);
    let d2 = Math.sqrt(v2.x ** 2 + v2.y ** 2);
    if (!d1 || !d2) {
        console.log("Division by zero");
        return 0;
    }
    return Math.acos(dot / (d1 * d2));
}

export function radianToDegree (radian) {
    return radian * 180 / Math.PI;
}
