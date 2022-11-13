import { Canvas } from './Graphics';
import { getCornerPoints } from './util/UtilFunctions';
import { Buttons } from './util/Buttons';
import { Game } from './Game';

export class Menu {

    constructor() {
        Canvas.drawRect(0, 0, 500, 500, 'red');
        // create three clickable buttons
        Canvas.drawRect(100, 100, 300, 50, 'white');
        Canvas.drawText(150, 135, 'Start Game', 'black', '30px Arial');

        let points = getCornerPoints(100,100,300,50);
        Buttons.createButton("startGame", points, this.startGame, true);
    }

    startGame(): void {
        Canvas.clear();
        Game.init();
    }
}