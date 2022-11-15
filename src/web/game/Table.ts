import { Ball } from './Ball';
import { Canvas } from './Graphics';
import { getImage } from './util/UtilFunctions';
import { Pocket } from './Pocket';
import { Player } from './Player';
import { Cue } from './Cue';
import { Sprite } from './util/Sprite';
import { Vector } from './util/Vector2D';
import EventLoop from './util/EventLoop';

export default class Table implements Sprite {
    visible: boolean;
    image: HTMLImageElement;
    location: Vector;

    private _balls: Ball[] = [];
    private _pockets: Pocket[] = [];
    private _players: Player[] = [];
    private _currentPlayer: Player;
    private _cue: Cue;


    constructor() {
        console.log("Table created");
        this.init();
        this._cue = new Cue();
        this._balls.push(new Ball(new Vector(500, 500), "cue"));
    }

    setVisible(_visible: boolean): void {
        throw new Error('Method not implemented.');
    }

    show(): void {
        Canvas.drawImage(this.image, 0, 0, 1600, 900);
    }
    init(): void {
        this.image = getImage("./assets/pool_table.jpg");
        this.visible = true;
        this.show();
        EventLoop.addListener({id: "table", function: this.update, active: true, self: this});
    }
    update(self: any): void {
        Canvas.clear();
        Canvas.drawImage(getImage("./assets/pool_table.jpg"), 0, 0, 1600, 900);
        console.log("test");
    }


}