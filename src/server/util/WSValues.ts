// Client and server OPCodes
export const OPCodes = {
    HELLO: 0,
    HEARTBEAT: 1,
    HEARTBEAT_ACK: 2,
    AUTH: 3,
    READY: 4,
    GET_LOBBY_REQ: 5,
    GET_LOBBY_RES: 6,
    JOIN_LOBBY_REQ: 7,
    JOIN_LOBBY_RES: 8,
    START_GAME_REQ: 9,
    START_GAME_RES: 10,
    GAME_STATE_UPDATE_REQ: 11,
    GAME_STATE_UPDATE_RES: 12,
    GAME_SHOT_REQ: 13,
    GAME_SHOT_RES: 14,
    SET_CUEBALL_POS_REQ: 15,
    SET_CUEBALL_POS_RES: 16,
    END_OF_GAME_REQ: 17,
    END_OF_GAME_RES: 18,
    CREATE_LOBBY_REQ: 19, // responds with JOIN_LOBBY_RES
    ERROR: 20,
} as const;

// not used
export const HEARTBEAT_INTERVAL = 6e4 as const;

export interface User {
    id: string;
    username: string;
    skt: Socket.SocketClient;
}

export interface LobbyState {
    id: string;
    host: User;
    opponent: User;
    state: "waiting" | "playing";
    p_turn: "host" | "opponent";
    h_type: "solid" | "stripe" | "none";
    o_type: "solid" | "stripe" | "none";
}