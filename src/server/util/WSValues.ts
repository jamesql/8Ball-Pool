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
    ERROR: 20,
} as const;

export const HEARTBEAT_INTERVAL = 6e4 as const;