const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const cursor = {
    x: 0,
    y: 0
};

const ball = {
    x: 0,
    y: 0,
    radius: 5,
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
let currentPath = [];
let isDrawing = false;

canvas.addEventListener("mousedown", (e) => {
    paths.push(currentPath);
    currentPath.push({ x: cursor.x, y: cursor.y });
    isDrawing = true;
});

canvas.addEventListener("mousemove", (e) => {
    if (isDrawing && currentPath.length > 0) {
        let point = currentPath.at(-1);
        let dx = cursor.x - point.x;
        let dy = cursor.y - point.y;
        if (!dx) {
            while (point.y !== cursor.y) {
                point.y += (dy > 0) ? 1 : -1;
                currentPath.push({
                    x: point.x,
                    y: point.y
                });
            }
        }
        else if (!dy) {
            while (point.x !== cursor.x) {
                point.x += (dx > 0) ? 1 : -1;
                currentPath.push({
                    x: point.x,
                    y: point.y
                });
            }
        }
        else {
            let step = (Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy));
            let sx = dx / step;
            let sy = dy / step;
            while (point.x !== cursor.x && point.y !== cursor.y) {
                point.x += sx;
                point.y += sy;
                currentPath.push({
                    x: Math.round(point.x),
                    y: Math.round(point.y)
                });
            }
            currentPath.push({
                x: cursor.x,
                y: cursor.y
            });
        }
    }
});

canvas.addEventListener("mouseup", (e) => {
    currentPath = [];
    isDrawing = false;
});

function drawPaths (paths) {
    paths.forEach(path => {
        path.forEach(point => {
            ctx.beginPath();
            ctx.arc(Math.floor(point.x), Math.floor(point.y), ball.radius, 0, Math.PI * 2);
            ctx.fillStyle = ball.color;
            ctx.fill();
        })
    });
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
    clear();

    ball.x = cursor.x;
    ball.y = cursor.y;
    ball.draw();
    drawPaths(paths);

    requestAnimationFrame(draw);
}

(function main() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    draw();
})();
