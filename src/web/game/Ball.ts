import { Sprite } from './util/Sprite';
import { Vector } from './util/Vector2D';
import { ballType, _listener } from './util/Types';
import EventLoop from './util/EventLoop';
import { getImage } from './util/UtilFunctions';
import { Canvas } from './Graphics';
import { Cue } from './Cue';
import { Game } from './Game';
import Table from './Table';
import { Input } from './util/Input';
import { GameLogic } from './GameLogic';
import { ClientSocket } from './client';

export class Ball implements Sprite {
    visible: boolean;
    image: HTMLImageElement;
    location: Vector;
    type: ballType;
    _event: _listener;
    _velocity: Vector = new Vector(0,0);
    _moving: boolean = false;
    _protectedBall: Ball = null;
    _isFollowingMouse: boolean = false;

    private static F: number = 0.018;
    private static R: number = 18;

    constructor(_location: Vector, _type: ballType) {
        this.location = _location;
        this.type = _type;
        this.init();
    }

    public static getRadius() : number {
        return Ball.R;
    }

    public setVisible(_visible: boolean) : void {
        this.visible = _visible;
        EventLoop.setListener(this._event, _visible);
    }

    public getColorBasedOnType() : string {
        switch(this.type) {
            case "cue":
                return "white";
            case "solid":
                return "red";
            case "stripe":
                return "yellow";
            case "eight":
                return "black";
        }
    }

    public equals(_b: Ball) : boolean {
        if (!_b) return false;
        return this.type === _b.type && this.location.equals(_b.location);
    }

    public isMoving() : boolean {
        return this._moving;
    }

    public setVelocity(_velocity: Vector) : void {
        this._velocity = _velocity;
        this._moving = true;
    }

    public setFollowMouse(_follow: boolean) : void {
        this._isFollowingMouse = _follow;
    }

    public onBallinHandClick() : void {
        if (this.type !== "cue" || !this._isFollowingMouse) return;
        // set cue ball position to mouse position 
        this.location = Input.getMousePosition();
        this._isFollowingMouse = false;
        // reset the cue and re-enable it
        let _c: Cue = Game.getTable().getCue();
        _c.setVisible(true);
        _c.resetCue();
        ClientSocket.sendCueBallPositon(this.location.getX(), this.location.getY());
    }

    show(): void {
        Canvas.drawCircle(this.location.getX(), this.location.getY(), Ball.R, this.getColorBasedOnType());
    }
    init(): void {
        this.visible = true;
        this.show();
        this._event = EventLoop.addListener({id: "ball", function: this.update, active: true, self: this});
        
    }
    update(self: any): void {

        let _self: Ball = <Ball>self;
        let v: Vector = _self.location;

        // ball in hand logic
        if (_self._isFollowingMouse) {
            _self.location = Input.getMousePosition();
            Canvas.drawCircle(v.getX(), v.getY(), Ball.R, _self.getColorBasedOnType());
            return;
        }

        let _t: Table = Game.getTable();

        if (_self._moving) {
            _self._velocity.scalarMultiply(1 - Ball.F);
            v.add(_self._velocity);
            _self.location = v;

            _t.checkForCollisions(_self);

            if (_t.isBallInPocket(_self)) {
                _self._velocity = new Vector(0,0);
                _self.setVisible(false);
                console.log("pocketed");
                GameLogic.handlePocketedBall(_self);
                if (_self.type === "cue" && GameLogic.isMyTurn()) {
                    console.log("scratched");
                    _self.setFollowMouse(true);
                    _self.setVisible(true);
                    // temporarily disable the cue
                    _t.getCue().setVisible(false);
                }
            }

            if (_self._velocity.getMagnitude() < 0.1) {
                _self._moving = false;
                _self._velocity = new Vector(0,0);
                _self._protectedBall = null;
                if (!GameLogic.areBallsMoving()) _t.getCue().resetCue();
                // send to game logic
            }

        }
        if (_self.visible)
        Canvas.drawCircle(v.getX(), v.getY(), Ball.R, _self.getColorBasedOnType());
    }

    public getPosition() : Vector {
        return this.location;
    }

}