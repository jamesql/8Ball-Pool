/// <reference path="../../util/@types/global.d.ts" />

import { IncomingMessage } from "http";
import * as ws from "ws";
import { OPCodes, User, LobbyState } from '../util/WSValues';
import { Network } from '../util/Network';

export default (async (ws: Socket.SocketServer, skt: Socket.SocketClient, rq: IncomingMessage, payload: ws.RawData) => {
    let data;

    try { data = JSON.parse(payload.toString()); }
    catch (e) { data = null; console.log(e); console.log(payload) }

    if (data === null) return skt.close();

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

            skt.props.username = u;

            skt.sendAsync({
                op: OPCodes.READY,
                d: {
                    lobbies: Network.getWaitingLobbys()
                }
            });
            break;
        }

        case OPCodes.GET_LOBBY_REQ: {
            const { d } = data;
            skt.sendAsync({
                op: OPCodes.GET_LOBBY_RES,
                d: {
                    lobbies: Network.getWaitingLobbys()
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

            await lobby.host.skt.sendAsync({
                op: OPCodes.JOIN_LOBBY_RES,
                d: {
                    lobby: lobby
                }
            });

            await skt.sendAsync({
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

            // rewrite so we only send to the other user in the lobby
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

            const u = await Network.getUserByUsername(d.username);
            const lobby: LobbyState = await Network.getLobby(d.lobby.id);

            const other = lobby.host.id === u.id ? lobby.opponent : lobby.host;

            // update the lobby
            const _l: LobbyState = d.lobby;
            lobby.p_turn = _l.p_turn;
            lobby.o_type = _l.o_type;
            lobby.h_type = _l.h_type;

            const shot = d.shot;
            await other.skt.sendAsync({
                op: OPCodes.GAME_SHOT_RES,
                d: {
                    shot: {
                        _relative: shot._relative,
                        _cueAngle: shot._cueAngle,
                        _cuePower: shot._cuePower,
                        _cueBallVelocity: shot._cueBallVelocity,
                    },
                    lobby: lobby
                }
            });

            break;
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

            await Network.addLobby(_lobby);

            skt.sendAsync({
                op: OPCodes.JOIN_LOBBY_RES,
                d: {
                    lobby: _lobby
                }
            });
            break;
        }

        case OPCodes.SET_CUEBALL_POS_REQ: {
            const { d } = data;
            const u = await Network.getUserByUsername(d.username);
            const lobby: LobbyState = await Network.getLobby(d.lobby.id);

            const other = lobby.host.id === u.id ? lobby.opponent : lobby.host;

            // send new cue ball position to other player
            await other.skt.sendAsync({
                op: OPCodes.SET_CUEBALL_POS_RES,
                d: {
                    x: d.x,
                    y: d.y,
                    lobby: lobby
                }
            });

            break;
        }

        case OPCodes.END_OF_GAME_REQ: {
            const { d } = data;
            const u = await Network.getUserByUsername(d.username);
            const lobby: LobbyState = await Network.getLobby(d.lobby.id);
            
            const other = lobby.host.id === u.id ? lobby.opponent : lobby.host;

            // send END_OF_GAME_RES to other player
            await other.skt.sendAsync({
                op: OPCodes.END_OF_GAME_RES,
                d: {
                    lobby: lobby
                }
            });
            break;
        }

    }

});