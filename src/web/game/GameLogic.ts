import { Player } from './Player';
import { Ball } from './Ball';
import { Game } from './Game';
import Table from './Table';
export class GameLogic {

    private static _isTableOpen: boolean = true;
    private static _isGameOver: boolean = false;
    private static _game: Game;
    private static _table: Table;

    static startGame() : void {
        GameLogic._isTableOpen = true;
        GameLogic._isGameOver = false;


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