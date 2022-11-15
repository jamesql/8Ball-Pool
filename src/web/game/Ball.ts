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

    constructor(_location: Vector, _type: ballType) {
        this.location = _location;
        this.type = _type;
        this.image = this.getImageBasedOnType();
        this.init();
    }

    public setVisible(_visible: boolean) : void {
        this.visible = _visible;
        EventLoop.setListener(this._event, _visible);
    }

    public getImageBasedOnType(): HTMLImageElement {
        switch (this.type) {
            case "solid":
                return new Image();
            case "stripe":
                return new Image();
            case "cue":
                return getImage("./assets/cue_ball.png");
            case "eight":
                return new Image();
            default:
                return new Image();
        }
    }

    show(): void {
        Canvas.drawCircle(this.location.getX(), this.location.getY(), 15, "white");
    }
    hide(): void {
        throw new Error('Method not implemented.');
    }
    init(): void {
        this.visible = true;
        this.show();
        this._event = EventLoop.addListener({id: "ball", function: this.update, active: true, self: this});
        
    }
    update(self: any): void {
        let _self: Ball = <Ball>self;
        let v: Vector = _self.location;
        //Canvas.drawImage(_self.image, v.getX(), v.getY(), 50, 50);
        Canvas.drawCircle(v.getX(), v.getY(), 18, "white");
    }

    public getPosition() : Vector {
        return this.location;
    }

}