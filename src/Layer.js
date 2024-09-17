export class Layer {
    constructor (id) {
        this.id = id;
        this.canvas = document.createElement("canvas");
        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;
        this.ctx = this.canvas.getContext("2d", { willReadFrequently: true });
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
