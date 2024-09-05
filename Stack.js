export class Stack {
    constructor() {
        this.stack = [];
    }
    push(item) {
        this.stack.push(item);
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
}
