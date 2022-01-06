import { Tool } from "./Tool";

export class Line extends Tool {
    mouseDown!: boolean;
    currentX!: number;
    currentY!: number;
    saved!: string;

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
                    type: "line",
                    x: this.currentX,
                    y: this.currentY,
                    color: this.ctx?.fillStyle,
                },
            })
        );
    }
    mouseDownHandler(e: any) {
        this.mouseDown = true;
        this.currentX = e.pageX - e.target.offsetLeft;
        this.currentY = e.pageY - e.target.offsetTop;
        this.ctx?.beginPath();
        this.ctx?.moveTo(this.currentX, this.currentY);
        this.saved = this.canvas.toDataURL();
    }
    mouseMoveHandler(e: any) {
        if (this.mouseDown) {
            this?.draw(
                e.pageX - e.target.offsetLeft,
                e.pageY - e.target.offsetTop
            );
        }
    }

    draw(x: number, y: number) {
        const img = new Image();
        img.src = this.saved;
        img.onload = () => {
            this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx?.drawImage(
                img,
                0,
                0,
                this.canvas.width,
                this.canvas.height
            );
            this.ctx?.beginPath();
            this.ctx?.moveTo(this.currentX, this.currentY);
            this.ctx?.lineTo(x, y);
            this.ctx?.stroke();
        };
    }

    static staticDraw(ctx: any, x: number, y: number, color: string) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y);
        ctx.stroke();
    };
}
