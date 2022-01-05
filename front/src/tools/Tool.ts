export class Tool {
    canvas;
    ctx;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.removeEventListeners();
    }

    set fillColor(color: string) {
        if (this.ctx) this.ctx.fillStyle = color;
    }

    set strokeColor(color: string) {
        if (this.ctx) this.ctx.strokeStyle = color;
    }

    set lineWidth(width: number) {
        if (this.ctx) this.ctx.lineWidth = width;
    }

    removeEventListeners() {
        this.canvas.onmousedown = null;
        this.canvas.onmouseup = null;
        this.canvas.onmousemove = null;
    }
}
