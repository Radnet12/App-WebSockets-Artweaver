import { Brush } from "./Brush";

export class Eraser extends Brush {
    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.listen();
    }

    draw(x: number, y: number) {
        if (this.ctx) this.ctx.strokeStyle = "white";
        this.ctx?.lineTo(x, y);
        this.ctx?.stroke();
    }
}
