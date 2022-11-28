import { _graphics } from './util/Types';

export class Canvas {
    
    // canvas
        static canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("game");
        static context: CanvasRenderingContext2D = this.canvas.getContext("2d");
    
        // canvas dimensions
        static {
            this.canvas.width = 1600;
            this.canvas.height = 900;
        }

        // canvas background
        static refresh(): void {
            this.canvas = document.getElementById("game") as HTMLCanvasElement;
            this.context = this.canvas.getContext("2d");
        }
    
        // get canvas objects
        static getGraphics(): _graphics {
            return { canvas: this.canvas, context: this.context };
        }

        // get canvas context
        static getContext(): CanvasRenderingContext2D {
            return this.context;
        }

        // draw a rectangle
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

        // clear canvas
        static clear() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }

        static drawImage(image: HTMLImageElement, x: number, y: number, width: number, height: number) {
            this.context.drawImage(image, x, y, width, height);
        }

        // draw image with a angle rotation
        static drawImageWithRotation(image: HTMLImageElement, x: number, y: number, width: number, height: number, angle: number) {
           // save current context
            this.context.save();
            // translate by the center of the image
            this.context.translate(x, y);
            // rotate
            this.context.rotate(angle);
            this.context.drawImage(image, -width / 2, -height / 2, width, height);
            this.context.restore();
        }

        // draw image with a angle rotation along an origin
        static drawImageRotationOrigin(image: HTMLImageElement, x: number, y: number, width: number, height: number, angle: number, originX: number, originY: number) {
           // set transform matrix before drawing image
            this.context.transform(1, 0, 0, 1, x, y);
            this.context.rotate(angle);
            this.context.drawImage(image, -originX, -originY, width, height);
            // reset the transform matrix as it was when this function was called
            this.context.setTransform(1, 0, 0, 1, 0, 0);
        }
};