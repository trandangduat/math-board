export class BoundingRect {
    static MAX_SIZE = 99999;
    constructor() {
        this.min_x = BoundingRect.MAX_SIZE;
        this.min_y = BoundingRect.MAX_SIZE;
        this.max_x = 0;
        this.max_y = 0;
    }
    reset() {
        this.min_x = this.min_y = BoundingRect.MAX_SIZE;
        this.max_x = this.max_y = 0;
    }
    update(x, y, padding) {
        this.max_x = Math.max(this.max_x, x + padding);
        this.max_y = Math.max(this.max_y, y + padding);
        this.min_x = Math.min(this.min_x, Math.max(0, x - padding));
        this.min_y = Math.min(this.min_y, Math.max(0, y - padding));
    }
    getRect() {
        return {
            x: this.min_x,
            y: this.min_y,
            w: this.max_x - this.min_x + 1,
            h: this.max_y - this.min_y + 1
        }
    }
    join (other) {
        this.min_x = Math.min(this.min_x, other.min_x);
        this.min_y = Math.min(this.min_y, other.min_y);
        this.max_x = Math.max(this.max_x, other.max_x);
        this.max_y = Math.max(this.max_y, other.max_y);
    }
}
