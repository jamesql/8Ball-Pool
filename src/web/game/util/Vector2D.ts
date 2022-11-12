export class Vector {
    private x: number
    private y: number

    constructor(_x: number, _y: number) {
        this.x = _x;
        this.y = _y;
    }

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public clone(): Vector {
        return new Vector(this.x, this.y);
    }

    public static clone(v: Vector): Vector {
        return new Vector(v.getX(), v.getY());
    }

    public addX(change: number) {
        this.x += change;
    }

    public addY(change: number) {
        this.y += change;
    }

    public setX(n: number) {
        this.x = n;
    }

    public setY(n: number) {
        this.y = n;
    }

    public scalarMultiply(s: number) {
        this.x *= s;
        this.y *= s;
    }

}