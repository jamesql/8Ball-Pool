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
    _cueBallPosition: Vector;

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
        this.show();
        EventLoop.addListener({id: "cue", function: this.update, active: true});
    }
    update(): void {
        Canvas.drawImage(getImage("./assets/cue.png"), Input._mouseX, Input._mouseY, 700, 700);
    }
}