import { Canvas } from "./Graphics";
import { Sprite } from "./util/Sprite";
import { getImage } from "./util/UtilFunctions";
import { Vector } from "./util/Vector2D";
import { Input } from "./util/Input";
import EventLoop from "./util/EventLoop";
import { _listener, _key } from './util/Types';
import { Keys } from "./util/Keys";

export class Cue implements Sprite {
    visible: boolean;
    image: HTMLImageElement;
    location: Vector;
    _tipPosition: Vector;
    _radius: number;
    static _cueBallPosition: Vector = new Vector(500,500);
    _power: number = 0;
    _event: _listener;
    _relative: Vector;
    _powerUp: _key;
    _powerDown: _key;

    constructor() {
        console.log("Cue created");
        this._relative = new Vector(-15,-15);
        this.init();
    }

    public setVisible(_visible: boolean) : void {
        this.visible = _visible;
        EventLoop.setListener(this._event, _visible);
    }

    public shoot(self: any) {
        let _this: Cue = self as Cue;
        _this._power = 0;
        _this._tipPosition = new Vector(_this.location.getX() + _this._relative.getX(), _this.location.getY() + _this._relative.getY());
        _this._relative = new Vector(0,0);

    }

    public resetCue() {
        this._relative = new Vector(-15,-15);
        this._power = 0;

    }

    public increasePower(_obj: any) {
        let _this: Cue = _obj as Cue;
        if(!_this.isMaxPower()) {
        _this._power += 0.1;
        _this._relative.addX(-10);
        _this._relative.addY(-10);
        }
    }

    public decreasePower(_obj: any) {
        let _this: Cue = _obj as Cue;
        if(!_this.isMinPower()) {
        _this._power -= 0.1;
        console.log(_this._power);
        _this._relative.addY(10);
        _this._relative.addX(10);
        }
    }

    public getPower() {
        return this._power;
    }

    public getTipPosition() {
        return this._tipPosition;
    }

    public isMinPower() {
        return this._power <= 1e-10;
    }

    public isMaxPower() {
        return this._power >= .9;
    }

    show(): void {
        Canvas.drawImage(this.image, Input._mouseX, Input._mouseY, 700, 700);
    }
    init(): void {
        this.image = getImage("./assets/cue.png");
        this.visible = true;
        this.location = new Vector(Input._mouseX, Input._mouseY);
        this.show();
        this._event = EventLoop.addListener({id: "cue", function: this.update, active: true, self: this});
        Keys.addKey({key: "w", onDown: this.increasePower, active: true, obj: this});
        Keys.addKey({key: "s", onDown: this.decreasePower, active: true, obj: this});
        Keys.addKey({key: "Enter", onDown: this.shoot, active: true, obj: this});
    }
    update(self: any): void {
        let _self: Cue = self as Cue;
        let x = Input._mouseX;
        let y = Input._mouseY;
        let cueball_x = Cue._cueBallPosition.getX();
        let cueball_y = Cue._cueBallPosition.getY();

        this.location = new Vector(x, y);
        let r: number = Math.atan2(y-cueball_y, x-cueball_x);

        Canvas.drawImageRotationOrigin(_self.image, cueball_x, cueball_y, 700, 700, r, _self._relative.getX(), _self._relative.getY());
    }
}