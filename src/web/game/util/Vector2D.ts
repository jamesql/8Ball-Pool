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

    public add(v: Vector) : void {
        this.x += v.getX();
        this.y += v.getY();
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

    public getMagnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public equals(v: Vector): boolean {
        return this.x === v.getX() && this.y === v.getY();
    }

    public distance(v: Vector): number {
        return Math.sqrt((this.x - v.getX()) * (this.x - v.getX()) + (this.y - v.getY()) * (this.y - v.getY()));
    }

    public subtract(v: Vector): Vector {
        return new Vector(this.x - v.getX(), this.y - v.getY());
    }

    public dot(v: Vector): number {
        return this.x * v.getX() + this.y * v.getY();
    }

    public multiplyClone(n: number) : Vector {
        return new Vector(this.x * n, this.y * n);
    }

    public scale(s: number): void {
        this.x *= s;
        this.y *= s;
    }

    public normalize(): void {
        let m: number = this.getMagnitude();
        this.x /= m;
        this.y /= m;
    }

    public angle(v: Vector): number {
        return Math.acos(this.dot(v) / (this.getMagnitude() * v.getMagnitude()));
    }

    public rotate(angle: number): void {
        let x: number = this.x;
        let y: number = this.y;
        this.x = x * Math.cos(angle) - y * Math.sin(angle);
        this.y = x * Math.sin(angle) + y * Math.cos(angle);
    }

    public getUnitVector(): Vector {
        let v: Vector = this.clone();
        v.normalize();
        return v;
    }

}