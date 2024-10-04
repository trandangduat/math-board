import { BoundingRect } from "./BoundingRect";
import { checkSegmentsCollision } from "./Geometry";
import { Color } from "./Color";

export class Action {
    constructor (type) {
        this.type = type;
        this.id = Date.now();
    }
    getType () {
        return this.type;
    }
    getId () {
        return this.id;
    }
}

export class Stroke extends Action {
    constructor (points, brush) {
        super('stroke');
        this.points = [...points];
        this.brush = {
            ...brush,
            color: (new Color()).copy(brush.color)
        };
        this.bdrect = new BoundingRect();
        this.points.forEach(p => this.bdrect.update(p.x, p.y, brush.radius));
        this.isErased = false;
        this.isSelected = false;
        this.transform = {
            x: 0,
            y: 0,
        };
    }
    getPoints () {
        return this.points;
    }
    getBrush () {
        return this.brush;
    }
    getBoundingRect () {
        return this.bdrect;
    }
    addPoint (point) {
        this.points.push(point);
        this.bdrect.update(point.x, point.y, this.brush.radius);
    }
    getIsErased () {
        return this.isErased;
    }
    setIsErased (value) {
        this.isErased = value;
    }
    getIsSelected () {
        return this.isSelected;
    }
    setIsSelected (value) {
        this.isSelected = value;
    }
    getTransform() {
        return this.transform;
    }
    updateTranslate (dx, dy) {
        this.transform.x += dx;
        this.transform.y += dy;
        this.bdrect.updateTranslate(dx, dy);
    }
    collideWith (line) {
        for (let i = 1; i < this.points.length; i++) {
            const p1 = {
                x: this.points[i - 1].x + this.transform.x,
                y: this.points[i - 1].y + this.transform.y
            };
            const p2 = {
                x: this.points[i].x + this.transform.x,
                y: this.points[i].y + this.transform.y
            };
            if (checkSegmentsCollision([p1, p2], line)) {
                return true;
            }
        }
        return false;
    }
}

export class Erase extends Action {
    constructor (strokeActions) {
        super('erase');
        this.strokeActions = [...strokeActions];
    }
    getStrokeActions () {
        return this.strokeActions;
    }
    addStroke (action) {
        this.strokeActions.push(action);
    }
}
