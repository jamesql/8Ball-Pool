import Table from "./Table";
import { _graphics } from './util/Types';

export class Game {

    canvas: HTMLCanvasElement = <HTMLCanvasElement> Document.prototype.getElementById("game");
    context: CanvasRenderingContext2D = this.canvas.getContext("2d");

    _table: Table;

    constructor() {
        this._table = new Table({ canvas: this.canvas, context: this.context });
    }


};

new Game();