import { Ball } from "./Ball";
import { Canvas } from "./Graphics";
import { Rectangle } from "./util/Rectangle";
import { Vector } from "./util/Vector2D";

export class Rail extends Rectangle {

    constructor(_x: number, _y: number, _width: number, _height: number) {
        super(_x, _y, _width, _height);
    }

    public isBallInside(_b: Ball) : boolean {
        return this.containsVector(_b.location);
    }

    public getContactPoint(_b: Ball) : Vector {
        return null;
    }
}