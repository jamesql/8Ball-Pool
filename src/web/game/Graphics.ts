import { _graphics } from './util/Types';

export class Canvas {
    
        static canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("game");
        static context: CanvasRenderingContext2D = this.canvas.getContext("2d");
    
        static {
            this.canvas.width = 500;
            this.canvas.height = 500;
        }
    
        static getGraphics(): _graphics {
            return { canvas: this.canvas, context: this.context };
        }
    
    };