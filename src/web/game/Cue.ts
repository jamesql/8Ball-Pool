import { Canvas } from "./Graphics";
import { Sprite } from "./util/Sprite";
import { getImage } from "./util/UtilFunctions";
import { Vector } from "./util/Vector2D";
import { Input } from "./util/Input";
import EventLoop from "./util/EventLoop";
import { _listener, _key } from './util/Types';
import { Keys } from "./util/Keys";
import { Ball } from "./Ball";
import { Game } from "./Game";

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
    _angle: number;
    _lastShotPosition: Vector;

    private static cueOffset = 2.36;

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
        _this._lastShotPosition = _this.location.clone();
        let _velocity = new Vector(_this._power * Math.cos(_this._angle), _this._power * Math.sin(_this._angle));
        _this._power = 0;
        _this._tipPosition = new Vector(_this.location.getX() + _this._relative.getX(), _this.location.getY() + _this._relative.getY());
        _this._relative = new Vector(0,0);
        let cueBall: Ball = Game.getTable().getCueBall();
        cueBall.setVelocity(_velocity);
    }

    public resetCue() {
        this._relative = new Vector(-15,-15);
        this._power = 0;
        Cue._cueBallPosition = Game.getTable().getCueBall().location.clone();

    }

    public increasePower(_obj: any) {
        let _this: Cue = _obj as Cue;
        if(!_this.isMaxPower()) {
        _this._power += 2.5;
        _this._relative.addX(-10);
        _this._relative.addY(-10);
        }
    }

    public decreasePower(_obj: any) {
        let _this: Cue = _obj as Cue;
        if(!_this.isMinPower()) {
        _this._power -= 2.5;
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
        return this._power >= 25;
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
        _self._angle = Math.atan2(y-cueball_y, x-cueball_x);

        Canvas.drawImageRotationOrigin(_self.image, cueball_x, cueball_y, 700, 700, _self._angle+Cue.cueOffset, _self._relative.getX(), _self._relative.getY());
    }
}