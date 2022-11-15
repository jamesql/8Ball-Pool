import { Canvas } from "./Graphics";
import { Sprite } from "./util/Sprite";
import { getImage } from "./util/UtilFunctions";
import { Vector } from "./util/Vector2D";
import { Input } from "./util/Input";
import EventLoop from "./util/EventLoop";

export class Cue implements Sprite {
    visible: boolean;
    image: HTMLImageElement;
    location: Vector;
    _tipPosition: Vector;
    _radius: number;
    static _cueBallPosition: Vector = new Vector(500,500);
    _power: number;

    constructor() {
        console.log("Cue created");
        this.init();
    }

    show(): void {
        Canvas.drawImage(this.image, Input._mouseX, Input._mouseY, 700, 700);
    }
    hide(): void {
        throw new Error("Method not implemented.");
    }
    init(): void {
        this.image = getImage("./assets/cue.png");
        this.visible = true;
        this.location = new Vector(Input._mouseX, Input._mouseY);
        this.show();
        EventLoop.addListener({id: "cue", function: this.update, active: true});
    }
    update(): void {
        let x = Input._mouseX;
        let y = Input._mouseY;
        let cueball_x = Cue._cueBallPosition.getX();
        let cueball_y = Cue._cueBallPosition.getY();

        this.location = new Vector(x, y);
        let r: number = Math.atan2(y-cueball_y, x-cueball_x);

        //Canvas.drawImageWithRotation(getImage("./assets/cue.png"), cueball_x, cueball_y, 700, 700, r);
        Canvas.drawImageRotationOrigin(getImage("./assets/cue.png"), cueball_x, cueball_y, 700, 700, r, 0, 0);
    }
}