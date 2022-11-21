import { Player } from './Player';
import { Ball } from './Ball';
import { Game } from './Game';
import Table from './Table';
import { Lobby } from './Lobby';
import { ClientSocket } from './client';
export class GameLogic {

    private static _isTableOpen: boolean = true;
    private static _isGameOver: boolean = false;
    private static _game: Game;
    private static _table: Table;
    private static _lobbyState: Lobby;

    static startGame() : void {
        GameLogic._isTableOpen = true;
        GameLogic._isGameOver = false;


    }

    static updateLobbyState(_l: Lobby) : void {
        GameLogic._lobbyState = _l;
    }

    static createLobby() : void {
        ClientSocket.createLobby();
    }
        

    static handleShot() : void {

    }

    static isLegalShot(): boolean {
        return true;
    }

    static handlePocketedBall(ball: Ball) : void {

    }

    static handleScratch() : void {

    }

    static handleGameOver() : void {

    }

    static switchTurns() : void {
        this._table.switchTurns();
    }

    static waitForNextTurn() : void {

    }

    static replayShot() : void {

    }

    static isGameOver(): Player {
        return null;
    }

    static resetGame() : void {

    }   
    
}