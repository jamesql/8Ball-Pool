import { Ball } from "./Ball";
import { Vector } from "./util/Vector2D";
import { Circle } from './util/Circle';

export class Pocket {
    private _circle: Circle;
    private static _MIDDLE_RADIUS = 30;
    private static _CORNER_RADIUS = 50;

    constructor(_x: number, _y: number, _type: "middle" | "corner") {
        this._circle = new Circle(_x, _y, _type==="middle" ? Pocket._MIDDLE_RADIUS : Pocket._CORNER_RADIUS);
    }

    public getCircle(): Circle {
        return this._circle;
    }

    public isBallInPocket(ball: Ball): boolean {
        return this._circle.isInside(ball.getPosition());
    }
    
}