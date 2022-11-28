import { Ball } from "../Ball";
import { Rail } from "../Rail";
import { Vector } from "./Vector2D";

// class for physics calculations
export class Physics {
    

    // calculate the new velocity of a ball after a collision with the reil
    static getExitVelo(_b: Ball, _r: Rail): Vector {
        let t = _r.railType;
        let v = _b._velocity;

        // comes from angle of incidence = angle of reflection
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