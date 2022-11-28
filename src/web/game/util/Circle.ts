import { Vector } from './Vector2D';

// basic circle class used for pockets and balls
export class Circle {
    private x: number
    private y: number
    private radius: number

    constructor(_x: number, _y: number, _radius: number) {
        this.x = _x;
        this.y = _y;
        this.radius = _radius;
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public getRadius(): number {
        return this.radius;
    }

    public setX(n: number) {
        this.x = n;
    }

    public setY(n: number) {
        this.y = n;
    }

    public setRadius(n: number) {
        this.radius = n;
    }

    // check if a vector is sinde the circle
    public isInside(v: Vector): boolean {
        let x = v.getX();
        let y = v.getY();

        // check if distance between vector and circle center is less than radius
        let distance = Math.sqrt((x - this.x) * (x - this.x) + (y - this.y) * (y - this.y));

        return distance < this.radius;
    }
    
}