import { Color } from "./Color";

export class BoundingRect {
    static MAX_SIZE = 99999;
    constructor() {
        this.min_x = BoundingRect.MAX_SIZE;
        this.min_y = BoundingRect.MAX_SIZE;
        this.max_x = 0;
        this.max_y = 0;
        this.id = Date.now();
    }
    reset() {
        this.min_x = this.min_y = BoundingRect.MAX_SIZE;
        this.max_x = this.max_y = 0;
    }
    update(x, y, padding = 0) {
        this.max_x = Math.max(this.max_x, x + padding);
        this.max_y = Math.max(this.max_y, y + padding);
        this.min_x = Math.min(this.min_x, Math.max(0, x - padding));
        this.min_y = Math.min(this.min_y, Math.max(0, y - padding));
    }
    updateTranslate (dx, dy) {
        this.min_x += dx;
        this.max_x += dx;
        this.min_y += dy;
        this.max_y += dy;
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
    cover (point) {
        return point.x >= this.min_x
            && point.x <= this.max_x
            && point.y >= this.min_y
            && point.y <= this.max_y;
    }
    intersect (other) {
        return this.min_x <= other.max_x
            && this.max_x >= other.min_x
            && this.min_y <= other.max_y
            && this.max_y >= other.min_y;
    }
    /**
     * Find the best nearby bounding box to join with
     * @param {Array} boundingBoxes - array of bounding boxes
     * @returns {Object} - {dx: distance, index: index of the best bounding box}
     */
    findBestNearbyBoundingBox (boundingBoxes) {
        let bestBox = {
            dx: BoundingRect.MAX_SIZE,
            index: -1
        };
        const {x, y, w, h} = this.getRect();
        for (let i = 0; i < boundingBoxes.length; i++) {
            const rect = boundingBoxes[i];
            if (y > rect.max_y || y + h < rect.min_y) {
                continue;
            }
            if (x > rect.max_x) {
                const dx = x - rect.max_x;
                if (dx < bestBox.dx && dx <= w * 2) {
                    bestBox.dx = dx;
                    bestBox.index = i;
                }
            } else if (x + w < rect.min_x) {
                const dx = rect.min_x - (x + w);
                if (dx < bestBox.dx && dx <= w * 2) {
                    bestBox.dx = dx;
                    bestBox.index = i;
                }
            } else {
                bestBox.dx = 0;
                bestBox.index = i;
            }
        }
        return bestBox;
    }
}

export class SelectionRect extends BoundingRect {
    constructor() {
        super();
        this.render = false;
        this.color = new Color(49, 130, 237);
        this.origin = {
            x: 0,
            y: 0
        }
    }
    setOrigin (x, y) {
        this.origin.x = x;
        this.origin.y = y;
        this.update(x, y);
    }
    update (x, y) {
        this.min_x = Math.min(x, this.origin.x);
        this.max_x = Math.max(x, this.origin.x);
        this.min_y = Math.min(y, this.origin.y);
        this.max_y = Math.max(y, this.origin.y);
    }
    getRender() {
        return this.render;
    }
    setRender(value) {
        this.render = value;
    }
}
