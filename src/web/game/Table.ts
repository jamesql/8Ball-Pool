import { Ball } from './Ball';
import { Canvas } from './Graphics';
import { getImage } from './util/UtilFunctions';
import { Pocket } from './Pocket';
import { Player } from './Player';
import { Cue } from './Cue';
import { Sprite } from './util/Sprite';
import { Vector } from './util/Vector2D';
import EventLoop from './util/EventLoop';
import { _listener } from './util/Types';

export default class Table implements Sprite {
    visible: boolean;
    image: HTMLImageElement;
    location: Vector;

    private _balls: Ball[] = [];
    private _pockets: Pocket[] = [];
    private _players: Player[] = [];
    private _currentPlayer: Player;
    private _cue: Cue;
    private _event: _listener;


    constructor() {
        console.log("Table created");
        this.init();
        this.rackBalls();
        this._cue = new Cue();
    }

    public rackBalls() {
        this._balls.push(new Ball(new Vector(500, 500), "cue"));
        this._balls.push(new Ball(new Vector(800,500), "solid"));
        this._balls.push(new Ball(new Vector(800, 300), "stripe"));
        this._balls.push(new Ball(new Vector(800, 700), "eight"));
    }

    public getCue() : Cue {
        return this._cue;
    }

    public getCueBall() : Ball {
        return this._balls[0]; // should change this to be more dynamic
    }

    setVisible(_visible: boolean): void {
        this.visible = _visible;
        EventLoop.setListener(this._event, _visible);
    }

    show(): void {
        Canvas.drawImage(this.image, 0, 0, 1600, 900);
    }
    init(): void {
        this.image = getImage("./assets/pool_table.jpg");
        this.visible = true;
        this.show();
        this._event = EventLoop.addListener({id: "table", function: this.update, active: true, self: this});
    }
    update(self: any): void {
        Canvas.clear();
        Canvas.drawImage(getImage("./assets/pool_table.jpg"), 0, 0, 1600, 900);
    }


}