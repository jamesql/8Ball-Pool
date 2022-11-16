import { Ball } from "../Ball";
import { Rail } from "../Rail";
import { Vector } from "./Vector2D";

// class for physics calculations
export class Physics {
    

    static getExitVelo(_b: Ball, _r: Rail): Vector {
        let t = _r.railType;
        let v = _b._velocity;

        switch(t) {
            case "top":
                return new Vector(v.getX(), -v.getY());
            case "bottom":
                return new Vector(v.getX(), -v.getY());
            case "left":
                return new Vector(-v.getX(), v.getY());
            case "right":
                return new Vector(-v.getX(), v.getY());
        }
    }
}