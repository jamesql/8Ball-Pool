import { Sprite } from './util/Sprite';
import { Vector } from './util/Vector2D';
import { ballType, _listener } from './util/Types';
import EventLoop from './util/EventLoop';
import { getImage } from './util/UtilFunctions';
import { Canvas } from './Graphics';

export class Ball implements Sprite {
    visible: boolean;
    image: HTMLImageElement;
    location: Vector;
    type: ballType;
    _event: _listener;
    _velocity: Vector = new Vector(0,0);
    _moving: boolean = false;

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
                return "blue";
            case "eight":
                return "black";
        }
    }

    public setVelocity(_velocity: Vector) : void {
        this._velocity = _velocity;
        this._moving = true;
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

        if (_self._moving) {
            v.add(_self._velocity);
            _self.location = v;
        }

        Canvas.drawCircle(v.getX(), v.getY(), Ball.R, _self.getColorBasedOnType());
    }

    public getPosition() : Vector {
        return this.location;
    }

}