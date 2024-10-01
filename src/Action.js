import { nanoid } from "nanoid";
import { BoundingRect } from "./BoundingRect";

export class Action {
    constructor (type) {
        this.type = type;
        this.id = nanoid();
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
        this.brush = { ...brush };
        this.bdrect = new BoundingRect();
        this.points.forEach(p => this.bdrect.update(p.x, p.y, brush.radius));
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
}
