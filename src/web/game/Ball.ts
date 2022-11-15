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
    private static R: number = 18;

    constructor(_location: Vector, _type: ballType) {
        this.location = _location;
        this.type = _type;
        this.init();
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
        Canvas.drawCircle(v.getX(), v.getY(), Ball.R, "white");
    }

    public getPosition() : Vector {
        return this.location;
    }

}