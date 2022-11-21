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
    ERROR: 20,
} as const;

export const HEARTBEAT_INTERVAL = 6e4 as const;

export interface User {
    id: string;
    username: string;
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