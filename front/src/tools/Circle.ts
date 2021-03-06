import { Tool } from "./Tool";

export class Circle extends Tool {
    mouseDown!: boolean;
    startX!: number;
    startY!: number;
    saved!: string;
    width!: number;
    height!: number;
    r!: number;

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
                    type: "circle",
                    x: this.startX,
                    y: this.startY,
                    r: this.r,
                    color: this.ctx?.fillStyle,
                },
            })
        );
    }
    mouseDownHandler(e: any) {
        this.mouseDown = true;
        this.ctx?.beginPath();
        this.startX = e.pageX - e.target?.offsetLeft;
        this.startY = e.pageY - e.target?.offsetTop;
        this.saved = this.canvas.toDataURL();
    }
    mouseMoveHandler(e: any) {
        if (this.mouseDown) {
            let currentX = e.pageX - e.target?.offsetLeft;
            let currentY = e.pageY - e.target?.offsetTop;
            this.width = currentX - this.startX;
            this.height = currentY - this.startY;
            this.r = Math.sqrt(this.width ** 2 + this.height ** 2);

            this.draw(this.startX, this.startY, this.r);
        }
    }

    draw(x: number, y: number, radius: number) {
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
            this.ctx?.arc(x, y, radius, 0, 2 * Math.PI);
            this.ctx?.fill();
            this.ctx?.stroke();
        };
    }

    static staticDraw(ctx: any, x: number, y: number, radius: number, color: string) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }
}
