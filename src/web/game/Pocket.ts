import { Ball } from "./Ball";
import { Vector } from "./util/Vector2D";
import { Circle } from './util/Circle';
import { Canvas } from "./Graphics";
import EventLoop from "./util/EventLoop";

// this could extend circle instead
export class Pocket {
    private _circle: Circle;
    private static _MIDDLE_RADIUS = 60;
    private static _CORNER_RADIUS = 60;

    constructor(_x: number, _y: number, _type: "middle" | "corner") {
        this._circle = new Circle(_x, _y, _type==="middle" ? Pocket._MIDDLE_RADIUS : Pocket._CORNER_RADIUS);
        
        // debug code
        /*EventLoop.addListener({
            id: "draw",
            function: this.draw.bind(this),
            self: null,
            active: true
        });*/ 
    }

    public getCircle(): Circle {
        return this._circle;
    }

    public isBallInPocket(ball: Ball): boolean {
        return this._circle.isInside(ball.getPosition());
    }

    public draw() {
        Canvas.drawCircle(this._circle.getX(), this._circle.getY(), this._circle.getRadius(), "white");
    }
    
}