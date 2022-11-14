import { Ball } from "./Ball";
import { Vector } from "./util/Vector2D";

export class Pocket {
    private cornerPoints: Vector[] = [];

    constructor() {
        console.log("Pocket created");
    }

    public isInside(_ball: Ball) : boolean {
        let _position: Vector = _ball.getPosition();


        return false;
    }
}