import { Color } from "./Color";

export class Layer {
    constructor (id) {
        this.id = id;
        this.canvas = document.createElement("canvas");
        this.canvas.tabIndex = 1;
        this.canvas.id = id;
        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;
        this.ctx = this.canvas.getContext("2d", { willReadFrequently: true });
    }
    drawStroke (stroke) {
        const points = stroke.getPoints();
        const brush = stroke.getBrush();
        const transform = stroke.getTransform();
        if (points.length < 1) {
            return;
        }

        this.ctx.save();
        this.ctx.translate(transform.x, transform.y);
        this.ctx.beginPath();
        this.ctx.moveTo(points[0].x, points[0].y);

        for (let i = 0; i < points.length - 1; i++) {
            // this.ctx.lineTo(points[i].x, points[i].y);
            const xc = (points[i].x + points[i + 1].x) / 2
            const yc = (points[i].y + points[i + 1].y) / 2
            this.ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc)
        }

        if (points.length === 1) {
            this.ctx.lineTo(points[0].x, points[0].y);
        }

        if (points.length > 2) {
            const last = points.length - 1;
            this.ctx.quadraticCurveTo(points[last - 1].x, points[last - 1].y, points[last].x, points[last].y)
        }

        if (stroke.getIsErased()) {
            brush.color.setAlpha(0.4);
        } else {
            brush.color.setAlpha(1);
        }
        this.ctx.strokeStyle = brush.color.getColor();
        this.ctx.lineWidth = brush.radius * 2;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.stroke();
        this.ctx.restore();
    }
    drawFigure (figure) {
        const transform = figure.getTransform();
        this.ctx.save();
        this.ctx.translate(transform.x, transform.y);
        const {x, y, w, h} = figure.getBoundingRect().getRect();
        this.ctx.drawImage(figure.getImg(), x, y);
        this.ctx.restore();
    }
    drawSelectionRect (rect) {
        const r = rect.getRect();
        this.ctx.strokeStyle = rect.color.setAlpha(1).getColor();
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(r.x, r.y, r.w, r.h);
        this.ctx.fillStyle = rect.color.setAlpha(0.2).getColor();
        this.ctx.fillRect(r.x, r.y, r.w, r.h);
    }
    drawRect (rect, color) {
        this.ctx.strokeStyle = color.getColor();
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
    }
    drawBoundingRect (action, color = new Color(49, 130, 237)) {
        if (!action.getIsSelected()) {
            return;
        }

        this.drawRect(action.getBoundingRect().getRect(), color);
    }
    rect () {
        return this.canvas.getBoundingClientRect();
    }
    clear () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    clone (otherLayer) {
        this.clear();
        this.ctx.drawImage(otherLayer.canvas, 0, 0);
    }
    joint (otherLayer) {
        this.ctx.drawImage(otherLayer.canvas, 0, 0);
    }
    drawText (text, x, y, font, color) {
        this.ctx.font = font;
        this.ctx.fillStyle = color;
        this.ctx.textBaseline = "middle";
        this.ctx.fillText(text, x, y);
    }
    getSnapshot (rect) {
        const [x, y, width, height] = [rect.x, rect.y, rect.w, rect.h];
        const offscreenCanvas = new OffscreenCanvas(width, height);
        const offscreenCtx = offscreenCanvas.getContext("2d");
        offscreenCtx.fillStyle = "white";
        offscreenCtx.fillRect(0, 0, width, height);
        offscreenCtx.drawImage(this.canvas, x, y, width, height, 0, 0, width, height);
        return offscreenCtx.getImageData(0, 0, width, height);
    }
}
