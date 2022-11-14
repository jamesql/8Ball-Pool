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
    }

    show(): void {
        Canvas.drawImage(this.image, 0, 0, 1600, 900);
    }
    hide(): void {
        this.visible = false;
    }
    init(): void {
        this.image = getImage("./assets/pool_table.jpg");
        this.visible = true;
        this.show();
        EventLoop.addListener({id: "table", function: this.update, active: true});
    }
    update(): void {
        Canvas.clear();
        Canvas.drawImage(getImage("./assets/pool_table.jpg"), 0, 0, 1600, 900);
        console.log("test");
    }


}