// @ts-ignore 

import { _lobby, _shotReplay } from "./util/Types";

export class ClientSocket {
    static socket: WebSocket;
    static seq: number;
    static username: string = "Guest|" + Math.random().toString(36);
    static hb_int: number;
    static timeout: NodeJS.Timeout;
    static hb_start: number;

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
        switch (dt.op)
        {
            // HELLO > Respond With Auth
            case 0: {
                this.sendMsg({
                    op: 3,
                    d: {
                        u: this.username
                    }
                });
                this.hb_int = dt.d.heartbeatInterval;
                break;
            }

            // HEARTBEAT_ACK
            case 2: {
                console.log(`[Socket] Heartbeat acknowledged...`);
            }

            // READY > Start Heartbeat
            case 4: {
                if(!this.timeout) this.startHeartbeat(this.hb_int);
            }
        }
    }

    static async startHeartbeat(int: number) {
        this.timeout = setInterval(() => {
            this.hb_start = Date.now();
            this.sendMsg({
                op:1,
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

    }

    static async getListOfLobbys(): Promise<_lobby[]> {
        return [];
    }

    static async joinLobby(lobby: _lobby) {
        
    }
}