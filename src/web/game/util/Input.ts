import { Vector } from "./Vector2D";

export class Input {
    static _mouseX: number = 0;
    static _mouseY: number = 0;

    public static init(): void {
        window.addEventListener("keydown", this.isKeyDown);
        window.addEventListener("mousemove", (e: MouseEvent) => {
            this._mouseX = e.clientX;   // get mouse x position relative to the window      
            this._mouseY = e.clientY;   // get mouse y position relative to the window
        });
    }   

    // todo when game input is implemented
    public static isKeyDown(kb: KeyboardEvent) {

    }

    public static getMousePosition(): Vector {
        return new Vector(this._mouseX, this._mouseY);
    }

}