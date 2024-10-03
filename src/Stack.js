export class Stack {
    constructor() {
        this.stack = [];
    }
    getStack() {
        return this.stack;
    }
    push(...items) {
        this.stack.push(...items);
    }
    pop() {
        return this.stack.pop();
    }
    top() {
        return this.stack[this.stack.length - 1];
    }
    get size() {
        return this.stack.length;
    }
    empty() {
        return this.size === 0;
    }
    clear() {
        this.stack = [];
    }
    get (index) {
        return this.stack[index];
    }
    remove (index) {
        this.stack.splice(index, 1);
    }
    sort (cmp) {
        this.stack.sort(cmp);
    }
}
