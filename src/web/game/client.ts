// @ts-ignore 

import { _shotReplay } from "./util/Types";
import { LobbyState, OPCodes } from '../../server/util/WSValues';
import { Lobby } from "./Lobby";
import { GameLogic } from "./GameLogic";

export class ClientSocket {
    static socket: WebSocket;
    static seq: number;
    static username: string = "Guest|" + Math.random().toString(36);
    static hb_int: number;
    static timeout: NodeJS.Timeout;
    static hb_start: number;
    protected static _lobbyList: LobbyState[] = [];

    static async init(username: string) {
        this.username = username;
        this.socket = new WebSocket(`ws://localhost:8080`);


        this.socket.addEventListener("message", this.msgHandler.bind(this));
        this.socket.addEventListener("open", this.handle.bind(this));
        this.socket.addEventListener("close", this.closeHandler.bind(this));
        this.socket.addEventListener("error", this.errorHandler.bind(this));
    }

    static async msgHandler(ev: MessageEvent<string>) {
        const dt = JSON.parse(ev.data);
        if (dt.s) this.seq = dt.s;
        switch (dt.op) {
            case OPCodes.HELLO: {
                this.sendMsg({
                    op: OPCodes.AUTH,
                    d: {
                        u: this.username
                    }
                });
                this.hb_int = dt.d.heartbeatInterval;
                break;
            }

            case OPCodes.HEARTBEAT_ACK: {
                console.log(`[Socket] Heartbeat acknowledged...`);
                break;
            }

            case OPCodes.READY: {
                console.log(`[Socket] Ready....`);
                // update lobby list
                this._lobbyList = dt.d.lobbies;
                this.sendMsg({
                    op: OPCodes.GET_LOBBY_REQ,
                    d: {}
                });
                break;
            }

            case OPCodes.GET_LOBBY_RES: {
                const {d} = dt;
                console.log(d.lobbies); 
                this._lobbyList = d.lobbies;
                break;
            }

            case OPCodes.JOIN_LOBBY_RES: {
                const {d} = dt;
                let _l: LobbyState = d.lobby;
                GameLogic.updateLobbyState(d.lobby);
                break;
            }

            case OPCodes.GAME_STATE_UPDATE_RES: {
                const {d} = dt;
                GameLogic.updateLobbyState(d.lobby);
                break;
            }

            case OPCodes.START_GAME_RES: {
                const {d} = dt;
                GameLogic.updateLobbyState(d.lobby);
                await GameLogic.startGame();
                break;
            }
        }
    }

    static getUsername(): string {
        return ClientSocket.username;
    }

    static async startHeartbeat(int: number) {
        this.timeout = setInterval(() => {
            this.hb_start = Date.now();
            this.sendMsg({
                op: 1,
                d: this.seq
            });
        }, int);
    }

    static async stopHeartbeat() {
        if (this.timeout) clearInterval(this.timeout);
    }

    static async sendMsg(d: any) {
        console.log(d);
        this.socket.send(JSON.stringify(d));
    }

    static async handle(ev: Event) {

    }

    static async errorHandler(ev: Event) {

    }

    static async closeHandler(ev: CloseEvent) {

    }

    static async sendShot(shot: _shotReplay) {
        await this.sendMsg({
            op: OPCodes.GAME_SHOT_REQ,
            d: shot
        });
    }

    static async refreshLobbys() {
        await this.sendMsg({
            op: OPCodes.GET_LOBBY_REQ,
            d: {}
        });
    }

    static async getListOfLobbys(): Promise<LobbyState[]> {
        return this._lobbyList;
    }

    static async createLobby() {
        await this.sendMsg({
            op: OPCodes.CREATE_LOBBY_REQ,
            d: {
                username: this.username
            }
        });
    }

    static async joinLobby(lobby: LobbyState) {
        await this.sendMsg({
            op: OPCodes.JOIN_LOBBY_REQ,
            d: {
                username: this.username,
                lobby_id: lobby.id
            }
        });
    }

    static async startGame(lobby: Lobby) {
        await this.sendMsg({
            op: OPCodes.START_GAME_REQ,
            d: {
                lobby_id: lobby.id
            }
        });
    }
}