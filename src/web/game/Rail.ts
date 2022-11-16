import { Ball } from "./Ball";
import { Canvas } from "./Graphics";
import { Rectangle } from "./util/Rectangle";
import { railType } from "./util/Types";
import { Vector } from "./util/Vector2D";

export class Rail extends Rectangle {
    private _r: railType;

    constructor(_x: number, _y: number, _width: number, _height: number, _type: railType) {
        super(_x, _y, _width, _height);
        this._r = _type;
    }

    public isBallInside(_b: Ball) : boolean {
        return this.containsVector(_b.location);
    }

    public getContactPoint(_b: Ball) : Vector {
        return null;
    }

    public get railType() : railType {
        return this._r;
    }
}