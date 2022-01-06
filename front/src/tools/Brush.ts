import { Tool } from "./Tool";

export class Brush extends Tool {
    mouseDown!: boolean;

    constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string) {
        super(canvas, socket, id);
        this.listen();
    }

    listen() {
        this.canvas.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas.onmouseup = this.mouseUpHandler.bind(this);
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    }

    mouseUpHandler() {
        this.mouseDown = false;
        this.socket?.send(
            JSON.stringify({
                id: this.id,
                method: "draw",
                figure: {
                    type: "finish",
                },
            })
        );
    }
    mouseDownHandler(e: any) {
        this.mouseDown = true;
        this.ctx?.beginPath();
        this.ctx?.moveTo(
            e.pageX - e.target?.offsetLeft,
            e.pageY - e.target?.offsetTop
        );
    }
    mouseMoveHandler(e: any) {
        if (this.mouseDown) {
            this.socket?.send(
                JSON.stringify({
                    id: this.id,
                    method: "draw",
                    figure: {
                        type: "brush",
                        x: e.pageX - e.target?.offsetLeft,
                        y: e.pageY - e.target?.offsetTop,
                    },
                })
            );
        }
    }

    static draw(ctx: any, x: number, y: number) {
        ctx?.lineTo(x, y);
        ctx?.stroke();
    }
}