import { _graphics } from './util/Types';

export class Canvas {
    
        static canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("game");
        static context: CanvasRenderingContext2D = this.canvas.getContext("2d");
    
        static {
            this.canvas.width = 1600;
            this.canvas.height = 900;
        }
    
        static getGraphics(): _graphics {
            return { canvas: this.canvas, context: this.context };
        }

        static drawRect(x: number, y: number, width: number, height: number, color: string) {
            this.context.fillStyle = color;
            this.context.fillRect(x, y, width, height);
        }

        static drawText(x: number, y: number, text: string, color: string, font: string) {
            this.context.fillStyle = color;
            this.context.font = font;
            this.context.fillText(text, x, y);
        }

        static drawCircle(x: number, y: number, radius: number, color: string) {
            this.context.fillStyle = color;
            this.context.beginPath();
            this.context.arc(x, y, radius, 0, Math.PI * 2, false);
            this.context.closePath();
            this.context.fill();
        }

        static drawLine(x1: number, y1: number, x2: number, y2: number, color: string) {
            this.context.strokeStyle = color;
            this.context.beginPath();
            this.context.moveTo(x1, y1);
            this.context.lineTo(x2, y2);
            this.context.closePath();
            this.context.stroke();
        }

        static clear() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }

        static drawImage(image: HTMLImageElement, x: number, y: number, width: number, height: number) {
            this.context.drawImage(image, x, y, width, height);
        }
};