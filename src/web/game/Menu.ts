import { Canvas } from './Graphics';
import { getCornerPoints, getImage } from './util/UtilFunctions';
import { Buttons } from './util/Buttons';
import { Game } from './Game';
import { ClientSocket } from './client';
import { GameLogic } from './GameLogic';
import { Lobby } from './Lobby';
import { LobbyState } from 'server/util/WSValues';

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
            this.joinOrHost();
        }).bind(this));
    }

    joinOrHost(): void {
        Canvas.clear();
        Canvas.drawImage(getImage("./assets/menu_bg.jpg"), 0, 0, 1600, 900);
        Canvas.drawRect(100, 100, 300, 50, 'white');
        Canvas.drawText(150, 135, 'Create Lobby', 'black', '30px Arial');
        Canvas.drawRect(100, 200, 300, 50, 'white');
        Canvas.drawText(150, 235, 'Join Lobby', 'black', '30px Arial');


        let points = getCornerPoints(100,100,300,50);
        Buttons.createButton("createLobby", points, () => {
            GameLogic.createLobby();
            // wait 2 seconds for lobby to be created
            setTimeout(() => {
                Menu.drawLobby();
            }, 2000);
        }, true);
        let points2 = getCornerPoints(100,200,300,50);
        Buttons.createButton("joinLobby", points2, Menu.drawLobbys, true);
    }

    static alertJoin() : void {
        alert("User has joined the lobby, press start when ready!");
    }

    static drawLobby(): void {
        Buttons.clear();
        Canvas.clear();
        Canvas.drawImage(getImage("./assets/menu_bg.jpg"), 0, 0, 1600, 900);

        if (GameLogic.isHost()) {
            Canvas.drawRect(100, 100, 300, 50, 'white');
            Canvas.drawText(150, 135, 'Start Game', 'black', '30px Arial');
    
            let points = getCornerPoints(100,100,300,50);
            Buttons.createButton("startGame", points, async () => {
                Canvas.clear();
                await GameLogic.startGame();
            }, true);
        } else {
            console.log("not host");
        }
    }

    static async drawLobbys() : Promise<void> {
        Buttons.clear();
        Canvas.clear();

        let curX = 200;
        let curY = 200;
        let width = 300;
        let height = 50;

        Canvas.drawImage(getImage("./assets/menu_bg.jpg"), 0, 0, 1600, 900);

        let lobbys = await ClientSocket.getListOfLobbys();
        //console.log(lobbys);
        for (let i = 0; i < lobbys.length; i++) {
            let lobby = lobbys[i];
            Canvas.drawRect(curX, curY, width, height, 'white');
            Canvas.drawText(curX + 10, curY + 35, lobby.host.username, 'black', '30px Arial');
            let points = getCornerPoints(curX, curY, width, height);
            Buttons.createButton("joinLobby" + i, points, async () => {
                await ClientSocket.joinLobby(lobby);
                Menu.drawLobby();
            }, true);
            curY += 100;
        }
    }

    drawCanvas(): void {
        document.body.innerHTML = "<canvas id='game' width='1600' height='900'></canvas>" + document.body.innerHTML;
    }

    public startGame(): void {
        Canvas.clear();
        Game.init();
    }
}