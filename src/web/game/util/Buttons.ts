import { _button } from './Types';
import { Vector } from './Vector2D';
export class Buttons {
    private static _buttons: _button[] = [];

    constructor() {
        Buttons._buttons = [];
    }

    public static addButton(b: _button) {
        this._buttons.push(b);
    }

    public static getButtons(): _button[] {
        return this._buttons;
    }

    public static getButton(id: string): _button {
        return this._buttons.find(b => b.id === id);
    }

    public static removeButton(id: string) {
        this._buttons.splice(this._buttons.indexOf(this.getButton(id)), 1);
    }

    public static clear() {
        this._buttons = [];
    }

    public static getActiveButtons(): _button[] {
        return this._buttons.filter(b => b.active);
    }

    public static getActiveButton(id: string): _button {
        return this.getActiveButtons().find(b => b.id === id);
    }

    public static getInactiveButtons(): _button[] {
        return this._buttons.filter(b => !b.active);
    }

    public static createButton(id: string, points: Vector[], onClick: () => void, active: boolean = true) : void {
        let _b: _button = {
            id: id,
            points: points,
            onClick: onClick,
            active: active
        }
        this.addButton(_b);
    }

    public static mouseClick(v: Vector) {
        this.getActiveButtons().forEach(b => {
            console.log(b);
            if (Buttons.isInside(v, b.points)) {
                b.onClick();
            }
        });
    }

    public static isInside(v: Vector, points: Vector[]): boolean {
        let x = v.getX();
        let y = v.getY();
        let inside = false;
        for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
            let xi = points[i].getX(), yi = points[i].getY();
            let xj = points[j].getX(), yj = points[j].getY();
            let intersect = ((yi > y) != (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
        return inside;
    }
}