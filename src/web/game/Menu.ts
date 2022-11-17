import { Canvas } from './Graphics';
import { getCornerPoints, getImage } from './util/UtilFunctions';
import { Buttons } from './util/Buttons';
import { Game } from './Game';
import { ClientSocket } from './client';

export class Menu {

    constructor() {
        // add input field for player name
        document.body.innerHTML = "<input type='text' id='playerName' placeholder='Enter your name' style='position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 300px; height: 50px; font-size: 20px; text-align: center;'>";
        document.body.innerHTML = "<button id='startButton' style='position: absolute; top: 60%; left: 50%; transform: translate(-50%, -50%); width: 300px; height: 50px; font-size: 20px;'>Start Game</button>" + document.body.innerHTML;

        // add event listener to start button
        document.getElementById("startButton").addEventListener("click", (async() => {
            // get player name
            let playerName = document.getElementById("playerName") as HTMLInputElement;
            await ClientSocket.init(playerName.value);
            document.body.innerHTML = "";
            this.drawCanvas();
            Canvas.refresh();
            this.initMenu();
        }).bind(this));
    }

    initMenu(): void {
        Canvas.drawImage(getImage("./assets/menu_bg.jpg"), 0, 0, 1600, 900);
        Canvas.drawRect(100, 100, 300, 50, 'white');
        Canvas.drawText(150, 135, 'Start Game', 'black', '30px Arial');

        let points = getCornerPoints(100,100,300,50);
        Buttons.createButton("startGame", points, this.startGame, true);
    }

    drawCanvas(): void {
        document.body.innerHTML = "<canvas id='game' width='1600' height='900'></canvas>" + document.body.innerHTML;
    }

    startGame(): void {
        Canvas.clear();
        Game.init();
    }
}