import { Player } from './Player';
import { Ball } from './Ball';
export class GameLogic {

    private _isTableOpen: boolean = true;
    private _isGameOver: boolean = false;

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