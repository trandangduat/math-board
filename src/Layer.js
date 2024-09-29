export class Layer {
    constructor (id) {
        this.id = id;
        this.canvas = document.createElement("canvas");
        this.canvas.id = id;
        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;
        this.ctx = this.canvas.getContext("2d", { willReadFrequently: true });
    }
    drawLine (start, end, brush) {
        this.ctx.beginPath();
        this.ctx.moveTo(start.x, start.y);
        this.ctx.lineTo(end.x, end.y);
        this.ctx.strokeStyle = brush.color;
        this.ctx.lineWidth = brush.radius * 2;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.stroke();
    }
    drawStroke (path, brush) {
        for (let i = 1; i < path.length; i++) {
            this.drawLine(path[i - 1], path[i], brush);
        }
    }
    rect () {
        return this.canvas.getBoundingClientRect();
    }
    clear () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    clone (otherLayer) {
        const compositeOperation = this.ctx.globalCompositeOperation;
        if (this.ctx.globalCompositeOperation !== "source-over") {
            this.ctx.globalCompositeOperation = "source-over";
        }
        this.clear();
        this.ctx.drawImage(otherLayer.canvas, 0, 0);
        if (compositeOperation !== "source-over") {
            this.ctx.globalCompositeOperation = compositeOperation;
        }
    }
    joint (otherLayer) {
        const compositeOperation = this.ctx.globalCompositeOperation;
        if (this.ctx.globalCompositeOperation !== "source-over") {
            this.ctx.globalCompositeOperation = "source-over";
        }
        this.ctx.drawImage(otherLayer.canvas, 0, 0);
        if (compositeOperation !== "source-over") {
            this.ctx.globalCompositeOperation = compositeOperation;
        }
    }
    getImageData () {
        return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    }
    putImageData (imageData) {
        this.clear();
        this.ctx.putImageData(imageData, 0, 0);
    }
    setCompositeOperation (operation) {
        this.ctx.globalCompositeOperation = operation;
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
