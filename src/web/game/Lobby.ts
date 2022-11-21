import { LobbyState, User } from 'server/util/WSValues';
import { ClientSocket } from './client';
export class Lobby implements LobbyState {
    id: string;
    host: User;
    opponent: User;
    state: 'waiting' | 'playing';
    p_turn: 'host' | 'opponent';
    h_type: 'solid' | 'stripe' | 'none';
    o_type: 'solid' | 'stripe' | 'none';

    constructor() {
        console.log('Lobby created');
    }

    public amIHost(): boolean {
        return this.host.username === ClientSocket.getUsername();
    }

    public updateLobby(lobby: LobbyState) {
        this.id = lobby.id;
        this.host = lobby.host;
        this.opponent = lobby.opponent;
        this.state = lobby.state;
        this.p_turn = lobby.p_turn;
        this.h_type = lobby.h_type;
        this.o_type = lobby.o_type;
    }

}