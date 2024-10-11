import { BoundingRect } from "./BoundingRect";
import { checkSegmentCircleCollision, checkSegmentsCollision } from "./Geometry";
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
        if (this.points.length === 1) {
            const p = {
                x: this.points[0].x + this.transform.x,
                y: this.points[0].y + this.transform.y
            };
            return checkSegmentCircleCollision(line, {
                x: p.x,
                y: p.y,
                radius: this.brush.radius
            });
        }
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
    constructor (erasedActions) {
        super('erase');
        this.erasedActions = [...erasedActions];
    }
    getErasedActions () {
        return this.erasedActions;
    }
    addAction (action) {
        this.erasedActions.push(action);
    }
}

export class Transform extends Action {
    constructor (
        actionsId = [],
        translate = { x: 0, y: 0 }
    ) {
        super('transform');
        this.translate = {...translate};
        this.affectedActionsId = actionsId;
    }
    updateTranslate (dx, dy) {
        this.translate.x += dx;
        this.translate.y += dy;
    }
    getTranslate () {
        return this.translate;
    }
    setTranslate (translate) {
        this.translate = translate;
    }
    getAffectedActionsId () {
        return this.affectedActionsId;
    }
    setAffectedActionsId (actionsId) {
        this.affectedActionsId = actionsId;
    }
}

export class Figure extends Action {
    constructor (image, x, y, w = -1, h = -1) {
        super('figure');
        this.img = image;

        this.bdrect = new BoundingRect();
        if (w === -1 || h === -1) {
            w = image.width;
            h = image.height;
        }
        this.bdrect.update(x, y);
        this.bdrect.update(x + w - 1, y + h - 1);

        this.isErased = false;
        this.isSelected = false;
        this.transform = {
            x: 0,
            y: 0,
        };
    }
    getImg() {
        return this.img;
    }
    setImg(image) {
        this.img = image;
    }
    getBoundingRect() {
        return this.bdrect;
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
        this.bdrect.updateTranslate(dx, dy);
    }
}
