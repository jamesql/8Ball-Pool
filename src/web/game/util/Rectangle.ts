import { Vector } from "./Vector2D";

export class Rectangle {
    private _x: number;
    private _y: number;
    private _width: number;
    private _height: number;

    constructor(_x: number, _y: number, _width: number, _height: number) {
        this._x = _x;
        this._y = _y;
        this._width = _width;
        this._height = _height;
    }

    public get x(): number {
        return this._x;
    }

    public get y(): number {
        return this._y;
    }

    public get location(): Vector {
        return new Vector(this._x, this._y);
    }

    public get width(): number {
        return this._width;
    }

    public get height(): number {
        return this._height;
    }

    public get left(): number {
        return this._x;
    }

    public get right(): number {
        return this._x + this._width;
    }

    public get top(): number {
        return this._y;
    }

    public get bottom(): number {
        return this._y + this._height;
    }

    public contains(_x: number, _y: number): boolean {
        return _x >= this.left && _x <= this.right && _y >= this.top && _y <= this.bottom;
    }

    public containsVector(_v: Vector): boolean {
        return this.contains(_v.getX(), _v.getY());
    }

    public containsRectangle(_r: Rectangle): boolean {
        return this.contains(_r.left, _r.top) && this.contains(_r.right, _r.bottom);
    }

    public intersects(_r: Rectangle): boolean {
        return this.contains(_r.left, _r.top) || this.contains(_r.right, _r.bottom);
    }
}