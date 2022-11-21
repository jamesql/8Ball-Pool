import { LobbyState, User } from './WSValues';
export class Network {
    private static _lobbys: LobbyState[] = [];
    private static _users: User[] = [];

    public static getLobby(id: string): LobbyState | undefined {
        return this._lobbys.find(l => l.id === id);
    }

    public static getLobbys(): LobbyState[] {
        return this._lobbys;
    }

    public static addLobby(l: LobbyState) {
        this._lobbys.push(l);
    }

    public static removeLobby(id: string) {
        this._lobbys.splice(this._lobbys.indexOf(this.getLobby(id)), 1);
    }

    public static getUser(id: string): User | undefined {
        return this._users.find(u => u.id === id);
    }

    public static async getUserByUsername(username: string): Promise<User> {
        return this._users.find(u => u.username === username);
    }

    public static getUsers(): User[] {
        return this._users;
    }

    public static addUser(u: User) {
        this._users.push(u);
    }

    public static removeUser(id: string) {
        this._users.splice(this._users.indexOf(this.getUser(id)), 1);
    }

    public static clear() {
        this._lobbys = [];
        this._users = [];
    }

    public static getLobbyByUser(id: string): LobbyState | undefined {
        return this._lobbys.find(l => l.host.id === id || l.opponent.id === id);
    }

    public static getLobbyByHost(id: string): LobbyState | undefined {
        return this._lobbys.find(l => l.host.id === id);
    }

}