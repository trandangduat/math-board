export class Color {
    constructor (r, g, b, a = 1) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    copy (color) {
        this.r = color.r;
        this.g = color.g;
        this.b = color.b;
        this.a = color.a;
        return this;
    }
    setHex (hexString) {
        const hex = parseInt(hexString.replace(/^#/, ''), 16);
        this.r = (hex >> 16) & 0xFF;
        this.g = (hex >> 8) & 0xFF;
        this.b = hex & 0xFF;
    }
    setAlpha (value) {
        this.a = value;
    }
    getColor () {
        return `rgba(${this.r},${this.g},${this.b},${this.a})`;
    }
}
