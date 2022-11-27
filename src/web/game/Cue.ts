import { Canvas } from "./Graphics";
import { Sprite } from "./util/Sprite";
import { getImage } from "./util/UtilFunctions";
import { Vector } from "./util/Vector2D";
import { Input } from "./util/Input";
import EventLoop from "./util/EventLoop";
import { _listener, _key, _shotReplay } from './util/Types';
import { Keys } from "./util/Keys";
import { Ball } from "./Ball";
import { Game } from "./Game";
import { ClientSocket } from './client';
import { GameLogic } from './GameLogic';

export class Cue implements Sprite {
    visible: boolean;
    image: HTMLImageElement;
    location: Vector;
    _tipPosition: Vector;
    _radius: number;
    static _cueBallPosition: Vector = new Vector(475,475);
    _power: number = 0;
    _event: _listener;
    _relative: Vector;
    _powerUp: _key;
    _powerDown: _key;
    _angle: number;
    _lastShotPosition: Vector;
    _hasShot = false;
    _savedShot: _shotReplay;

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

    public async shoot(self: any) {
        let _this: Cue = self as Cue;
        _this._lastShotPosition = _this.location.clone();
        let _velocity = new Vector(_this._power * Math.cos(_this._angle), _this._power * Math.sin(_this._angle));

        let _shot: _shotReplay = {
            _relative: _this._relative.clone(),
            _cuePower: _this._power,
            _cueAngle: _this._angle,
            _cueBallVelocity: _velocity.clone(),
        }
        _this._savedShot = _shot;
        _this._hasShot = true;

        // reset cue position and power, set cueball velocity
        _this._power = 0;
        _this._tipPosition = new Vector(_this.location.getX() + _this._relative.getX(), _this.location.getY() + _this._relative.getY());
        _this._relative = new Vector(0,0);
        let cueBall: Ball = Game.getTable().getCueBall();
        cueBall.setVelocity(_velocity);
    }

    public async localShoot() {
        let _velocity = new Vector(this._power * Math.cos(this._angle), this._power * Math.sin(this._angle));

        this._power = 0;
        this._relative = new Vector(0,0);
        let cueBall: Ball = Game.getTable().getCueBall();
        cueBall.setVelocity(_velocity);
    }

    public resetCue() {
        this._relative = new Vector(-15,-15);
        this._power = 0;
        Cue._cueBallPosition = Game.getTable().getCueBall().location.clone();
    }

    public setShot(_shot: _shotReplay) {
        this._relative = _shot._relative;
        this._power = _shot._cuePower;
        this._angle = _shot._cueAngle;

        this.localShoot();
    }

    public increasePower(_obj: any) {
        console.log("1")
        let _this: Cue = _obj as Cue;
        if(!_this.isMaxPower()) {
        _this._power += 2.5;
        console.log(_this._power);
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

        // disable movement if it is not our turn
        if(GameLogic.isMyTurn())
            Input.enable();
        else {
            Input.disable();
            return;
        }

        if (_self._hasShot) {

            if (!GameLogic.areBallsMoving())
            {
                _self._hasShot = false;
                GameLogic.handleShot(_self._savedShot);
            }

            return;
        }

        let x = Input._mouseX;
        let y = Input._mouseY;
        let cueball_x = Cue._cueBallPosition.getX();
        let cueball_y = Cue._cueBallPosition.getY();

        this.location = new Vector(x, y);
        _self._angle = Math.atan2(y-cueball_y, x-cueball_x);

        Canvas.drawImageRotationOrigin(_self.image, cueball_x, cueball_y, 700, 700, _self._angle+Cue.cueOffset, _self._relative.getX(), _self._relative.getY());
    }
}