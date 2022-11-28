import { Vector } from "./Vector2D";
import { Buttons } from './Buttons';
import { Keys } from './Keys';
import { Game } from '../Game';

export class Input {
    static _mouseX: number = 0;
    static _mouseY: number = 0;
    private static _enabled: boolean = true;

    // create window listensers for mouse and keyboard
    public static init(): void {
        window.addEventListener("keydown", this.isKeyDown.bind(this));
        window.addEventListener("mousemove", (e: MouseEvent) => {
            if (!this._enabled) return;
            this._mouseX = e.clientX;      
            this._mouseY = e.clientY;   
            //console.log(this._mouseX, this._mouseY);
        });
        window.addEventListener("mousedown", (e: MouseEvent) => {
            let v = this.getMousePosition();
            Buttons.mouseClick(v);
            // send to cue ball
            Game.getTable().getCueBall().onBallinHandClick();
        });
    }   

    public static isKeyDown(kb: KeyboardEvent) {
        if (!this._enabled) return;
        Keys.keyboardClick(kb.key);
    }

    public static getMousePosition(): Vector {
        return new Vector(this._mouseX, this._mouseY);
    }

    public static enable(): void {
        this._enabled = true;
    }

    public static disable(): void {
        this._enabled = false;
    }
        

}