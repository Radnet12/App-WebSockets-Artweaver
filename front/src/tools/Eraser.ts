import { Brush } from "./Brush";

export class Eraser extends Brush {
    constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
        super(canvas, socket, id);
        this.listen();
    }

    draw(x: number, y: number) {
        if (this.ctx) this.ctx.strokeStyle = "white";
        this.ctx?.lineTo(x, y);
        this.ctx?.stroke();
    }
}
