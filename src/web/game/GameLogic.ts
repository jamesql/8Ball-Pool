import { Player } from './Player';
import { Ball } from './Ball';
import { Game } from './Game';
import Table from './Table';
import { Lobby } from './Lobby';
import { ClientSocket } from './client';
import { LobbyState } from 'server/util/WSValues';
import { _shotReplay } from './util/Types';
import { Buttons } from './util/Buttons';
import { Cue } from './Cue';
export class GameLogic {

    private static _isTableOpen: boolean = true;
    private static _isGameOver: boolean = false;
    private static _game: Game;
    private static _table: Table;
    private static _lobbyState: Lobby = new Lobby();
    private static _pocketedBalls: Ball[] = [];

    static async startGame() : Promise<void> {
        GameLogic._isTableOpen = true;
        GameLogic._isGameOver = false;

        if (this.isHost()) await ClientSocket.startGame(this._lobbyState);
        Buttons.clear();

        Game.init();
        this._table = Game.getTable();
    }

    static updateLobbyState(_l: Lobby) : void {
        this._lobbyState.updateLobby(_l);
    }

    static createLobby() : void {
        ClientSocket.createLobby();
    }
        
    static areBallsMoving(): boolean {
        return this._table.areBallsMoving();
    }

    static async handleShot(shot: _shotReplay) : Promise<void> {
        if (this._pocketedBalls.length === 0) this._lobbyState.p_turn = this._lobbyState.p_turn === 'host' ? 'opponent' : 'host';
        
        await ClientSocket.sendShot(shot);
        this.clearPocketedBalls();
    }

    static clearPocketedBalls() : void {
        this._pocketedBalls = [];
    }

    static sendShot(shot: _shotReplay) : void {
        console.log(shot);
        let cue: Cue = this._table.getCue();
        cue.setShot(shot);
    }

    static isLegalShot(): boolean {
        return true;
    }

    static handlePocketedBall(ball: Ball) : void {
        this._pocketedBalls.push(ball);
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
    
    static isHost(): boolean {
        return this._lobbyState.amIHost();
    }

    static isMyTurn(): boolean {
        return this._lobbyState.p_turn === 'host' ? this.isHost() : !this.isHost();
    }

    static getLobbyId(): string {
        return this._lobbyState.id;
    }

    static getLobby(): LobbyState {
        return this._lobbyState;
    }
    
}