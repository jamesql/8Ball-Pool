import { Vector } from "./Vector2D";
import { Buttons } from './Buttons';
import { Keys } from './Keys';

export class Input {
    static _mouseX: number = 0;
    static _mouseY: number = 0;

    public static init(): void {
        window.addEventListener("keydown", this.isKeyDown);
        window.addEventListener("mousemove", (e: MouseEvent) => {
            this._mouseX = e.clientX;      
            this._mouseY = e.clientY;   
            console.log(this._mouseX, this._mouseY);
        });
        window.addEventListener("mousedown", (e: MouseEvent) => {
            let v = this.getMousePosition();
            Buttons.mouseClick(v);
        });
    }   

    public static isKeyDown(kb: KeyboardEvent) {
        Keys.keyboardClick(kb.key);
    }

    public static getMousePosition(): Vector {
        return new Vector(this._mouseX, this._mouseY);
    }

}