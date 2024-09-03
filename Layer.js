export class Layer {
    constructor (id) {
        this.id = id;
        this.canvas = document.createElement("canvas");
        this.canvas.classList.add("layer");
        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d");
    }
    draw(x,y, color) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, 40, 0, Math.PI * 2);
        this.ctx.fillStyle = color;
        this.ctx.fill();
    }
    info() {
        console.log(`Layer ${this.id}`);
        console.log(this.canvas);
    }
}
