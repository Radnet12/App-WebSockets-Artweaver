import { Tool } from "./Tool";

export class Brush extends Tool {
    mouseDown!: boolean;

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.listen();
    }

    listen() {
        this.canvas.onmousedown = this.mouseDownHandler.bind(this);
        this.canvas.onmouseup = this.mouseUpHandler.bind(this);
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    }

    mouseUpHandler(e: any) {
        this.mouseDown = false;
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
            this.draw(
                e.pageX - e.target?.offsetLeft,
                e.pageY - e.target?.offsetTop
            );
        }
    }

    draw(x: number, y: number) {
        this.ctx?.lineTo(x, y);
        this.ctx?.stroke();
    }
}