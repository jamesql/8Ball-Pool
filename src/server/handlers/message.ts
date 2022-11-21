/// <reference path="../../util/@types/global.d.ts" />

import { IncomingMessage } from "http";
import * as ws from "ws";
import { OPCodes, User, LobbyState } from '../util/WSValues';
import { Network } from '../util/Network';

export default (async (ws: Socket.SocketServer, skt: Socket.SocketClient, rq: IncomingMessage, payload: ws.RawData) => {
    let data;

    try { data = JSON.parse(payload.toString()); }
    catch (e) { data = null; console.log(e); console.log(payload)}

    console.log(data);

    if (data === null) return skt.close();

    switch (data.op) {

        case OPCodes.AUTH: {
            const { d } = data;
            const u = d.username;

            const n: User = {
                username: u,
                id: Math.random().toString(36),
                skt: skt
            };
            Network.addUser(n);

            skt.sendAsync({
                op: OPCodes.READY,
                d: {
                    lobbies: Network.getLobbys()
                }
            });
        }

        case OPCodes.GET_LOBBY_REQ: {
            const { d } = data;
        }

        case OPCodes.JOIN_LOBBY_REQ: {
            const { d } = data;
        }

        case OPCodes.GAME_STATE_UPDATE_REQ: {
            const { d } = data;
        }

        case OPCodes.START_GAME_REQ: {
            const { d } = data;
        }

        case OPCodes.GAME_SHOT_REQ: {
            const { d } = data;
        }

        case OPCodes.CREATE_LOBBY_REQ: {
            const { d } = data;
            const uName = d.username;
            const user: User = await Network.getUserByUsername(uName);
            const _lobby: LobbyState = {
                id: Math.random().toString(36),
                host: user,
                opponent: null,
                state: "waiting",
                p_turn: "host",
                h_type: "none",
                o_type: "none"
            }

            Network.addLobby(_lobby);

            skt.sendAsync({
                op: OPCodes.JOIN_LOBBY_RES,
                d: {
                    lobby: _lobby
                }
            });

        }

        case OPCodes.END_OF_TURN_REQ: {
            const { d } = data;
        }

        case OPCodes.END_OF_GAME_REQ: {
            const { d } = data;
        }

    }

});