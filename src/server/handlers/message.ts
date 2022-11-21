/// <reference path="../../util/@types/global.d.ts" />

import { IncomingMessage } from "http";
import * as ws from "ws";
import { OPCodes, User, LobbyState } from '../util/WSValues';
import { Network } from '../util/Network';

export default (async (ws: Socket.SocketServer, skt: Socket.SocketClient, rq: IncomingMessage, payload: ws.RawData) => {
    let data;

    try { data = JSON.parse(payload.toString()); }
    catch (e) { data = null; console.log(e); console.log(payload)}

    if (data === null) return skt.close();

    console.log(data.op)
    switch (data.op) {

        case OPCodes.AUTH: {
            const { d } = data;
            const u = d.u;

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
            break;
        }

        case OPCodes.GET_LOBBY_REQ: {
            const { d } = data;
            skt.sendAsync({
                op: OPCodes.GET_LOBBY_RES,
                d: {
                    lobbies: Network.getLobbys()
                }
            });
            break;
        }

        case OPCodes.JOIN_LOBBY_REQ: {
            const { d } = data;
            const l = d.lobby_id;
            const lobby = await Network.getLobby(l);
            const u = await Network.getUserByUsername(d.username);

            lobby.opponent = u;

            skt.sendAsync({
                op: OPCodes.JOIN_LOBBY_RES,
                d: {
                    lobby: lobby
                }
            });
            break;
        }

        case OPCodes.GAME_STATE_UPDATE_REQ: {
            const { d } = data;
            const _l = d.lobby;
            const lobby = await Network.getLobby(_l.id);

            await lobby.host.skt.sendAsync({
                op: OPCodes.GAME_STATE_UPDATE_RES,
                d: {
                    lobby: lobby
            }
            });

            if (lobby.opponent !== null) {
                await lobby.opponent.skt.sendAsync({
                    op: OPCodes.GAME_STATE_UPDATE_RES,
                    d: {
                        lobby: lobby
                    }
                });
            }
            break;
        }

        case OPCodes.START_GAME_REQ: {
            const { d } = data;
            const _l = d.lobby_id;

            const lobby = await Network.getLobby(_l);
            lobby.state = "playing";

            if (lobby.opponent !== null) {
                await lobby.opponent.skt.sendAsync({
                    op: OPCodes.START_GAME_RES,
                    d: {
                        lobby: lobby
                    }
                });
            }

            break;
        }

        case OPCodes.GAME_SHOT_REQ: {
            const { d } = data;
            break;
        }

        case OPCodes.CREATE_LOBBY_REQ: {
            const { d } = data;
            const uName = d.username;
            const user: User = await Network.getUserByUsername(uName);
            console.log(user);
            const _lobby: LobbyState = {
                id: Math.random().toString(36),
                host: user,
                opponent: null,
                state: "waiting",
                p_turn: "host",
                h_type: "none",
                o_type: "none"
            }

            await Network.addLobby(_lobby);

            skt.sendAsync({
                op: OPCodes.JOIN_LOBBY_RES,
                d: {
                    lobby: _lobby
                }
            });
            break;
        }

        case OPCodes.END_OF_TURN_REQ: {
            const { d } = data;
            break;
        }

        case OPCodes.END_OF_GAME_REQ: {
            const { d } = data;
            break;
        }

    }

});