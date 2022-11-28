/// <reference path="../../util/@types/global.d.ts" />

import { IncomingMessage } from "http";
import * as ws from "ws";
import { OPCodes, User, LobbyState } from '../util/WSValues';
import { Network } from '../util/Network';

// Control messages from client
export default (async (ws: Socket.SocketServer, skt: Socket.SocketClient, rq: IncomingMessage, payload: ws.RawData) => {
    let data;

    // make sure payload is valid
    try { data = JSON.parse(payload.toString()); }
    catch (e) { data = null; console.log(e); console.log(payload) }

    // close connection
    if (data === null) return skt.close();

    switch (data.op) {

        // inital auth (response from HELLO packet)
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

            // send active lobbies along with the READY Packet
            skt.sendAsync({
                op: OPCodes.READY,
                d: {
                    lobbies: Network.getWaitingLobbys()
                }
            });
            break;
        }

        // send active lobbies to the client
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

        // join a lobby
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

        // transfer game information to other player
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

        // start a lobbies game
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

        // send shot to other player
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

            // send shot with updated game state
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

        // create a lobby
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

            // add to the netowrk
            await Network.addLobby(_lobby);

            skt.sendAsync({
                op: OPCodes.JOIN_LOBBY_RES,
                d: {
                    lobby: _lobby
                }
            });
            break;
        }

        // set the new cueball position after a scratch
        case OPCodes.SET_CUEBALL_POS_REQ: {
            const { d } = data;
            const u = await Network.getUserByUsername(d.username);
            const lobby: LobbyState = await Network.getLobby(d.lobby.id);

            // find other player
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

        // end the game
        case OPCodes.END_OF_GAME_REQ: {
            const { d } = data;
            const u = await Network.getUserByUsername(d.username);
            const lobby: LobbyState = await Network.getLobby(d.lobby.id);
            
            // find other player
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