import { _graphics } from './util/Types';
import { Canvas } from './Graphics';
export class Menu {

    _g: _graphics = Canvas.getGraphics();

    constructor() {
        this._g.context.fillStyle = "black";
        this._g.context.fillRect(0, 0, 500, 500);

        // inside the canvas create a button with the text "Start Game"
        this._g.context.fillStyle = "white";
        this._g.context.fillRect(200, 200, 100, 50);
        this._g.context.fillStyle = "black";
        this._g.context.font = "20px Arial";
        this._g.context.fillText("Start Game", 210, 230);

        
    }
}