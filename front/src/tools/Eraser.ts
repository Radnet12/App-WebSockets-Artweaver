import { Brush } from "./Brush";

export class Eraser extends Brush {
    constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
        super(canvas, socket, id);
        this.listen();
    }
    mouseMoveHandler(e: any) {
        if (this.mouseDown) {
            this.socket?.send(
                JSON.stringify({
                    id: this.id,
                    method: "draw",
                    figure: {
                        type: "eraser",
                        x: e.pageX - e.target?.offsetLeft,
                        y: e.pageY - e.target?.offsetTop,
                    },
                })
            );
        }
    }

    static staticDraw(ctx: any, x: number, y: number) {
        ctx.fillStyle = "white";
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}
