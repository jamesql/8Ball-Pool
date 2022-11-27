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
import { Vector } from './util/Vector2D';
export class GameLogic {

    private static _isTableOpen: boolean = true;
    private static _isGameOver: boolean = false;
    private static _game: Game;
    private static _table: Table;
    private static _lobbyState: Lobby = new Lobby();
    private static _pocketedBalls: Ball[] = [];
    private static _firstContact: Ball = null;

    static async startGame() : Promise<void> {
        GameLogic._isTableOpen = true;
        GameLogic._isGameOver = false;

        if (this.isHost()) await ClientSocket.startGame(this._lobbyState);
        Buttons.clear();

        Game.init();
        this._table = Game.getTable();
    }

    static setFirstContact(ball: Ball) : void {
        if (this._firstContact === null) this._firstContact = ball;
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

    static restart(): void {
        window.location.reload();
    }

    static async handleShot(shot: _shotReplay) : Promise<void> {
        if (this._pocketedBalls.length === 0 || this.pocketedBallIncludeCueBall()) this._lobbyState.p_turn = this._lobbyState.p_turn === 'host' ? 'opponent' : 'host';

        await ClientSocket.sendShot(shot);

        // end game
        if (this.pocketedBallsIncludeEightBall()) {
            console.log("GAME OVER");
            this._isGameOver = true;
            await ClientSocket.endGame(this._lobbyState);
            this.restart();
            return;
        }

        // if open table
        if (this._isTableOpen) {
            if (this._pocketedBalls.length > 0) {
                this._isTableOpen = false;
                // update lobby state
                if (this.isHost()) {
                    this._lobbyState.h_type = <"solid"|"stripe"|"none">this._pocketedBalls[0].type;
                    this._lobbyState.o_type = this.getOpposite(this._lobbyState.h_type);
                } else {
                    this._lobbyState.o_type = <"solid"|"stripe"|"none">this._pocketedBalls[0].type;
                    this._lobbyState.h_type = this.getOpposite(this._lobbyState.o_type);
                }
                await ClientSocket.updateGameState(this._lobbyState);
            }
        }

        this.clearPocketedBalls();
        this._firstContact = null;
    }

    static getOpposite(type: "solid"|"stripe"|"none"): "solid"|"stripe"|"none" {
        switch (type) {
            case "solid":
                return "stripe";
            case "stripe":
                return "solid";
            case "none":
                return "none";
        }
    }

    static pocketedBallIncludeCueBall(): boolean {
        return this._pocketedBalls.includes(this._table.getCueBall());
    }

    static pocketedBallsIncludeEightBall(): boolean {
        // loop through pocketed balls
        // if any ball is an eight ball, return true
        for(let i = 0; i < this._pocketedBalls.length; i++) {
            if (this._pocketedBalls[i].type === "eight") return true;
        }

        return false;
    }

    static clearPocketedBalls() : void {
        this._pocketedBalls = [];
    }

    static sendShot(shot: _shotReplay) : void {
        let cue: Cue = this._table.getCue();
        cue.setShot(shot);
    }

    static isLegalShot(): boolean {
        return true;
    }

    static handlePocketedBall(ball: Ball) : void {
        this._pocketedBalls.push(ball);

        if (ball.type !== "cue") {
            this._table.removeBall(ball);
        }
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

    static setCueBallPosition(x: number, y: number) : void {
        let cueBall: Ball = this._table.getCueBall();
        cueBall.location = new Vector(x, y);
        cueBall.setFollowMouse(false);
        cueBall.setVisible(true);
    }
    
}