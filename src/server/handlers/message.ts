/// <reference path="../../util/@types/global.d.ts" />

import { IncomingMessage } from "http";
import * as ws from "ws";
import { OPCodes } from "../util/WSValues";

// data: ws.RawData, isBinary: boolean
export default (async (skt: Socket.SocketClient, payload: ws.RawData, isBinary: boolean) => {
    let data;

    try { data = JSON.parse(payload.toString()); }
    catch(e) { data = null; console.log(e); }

    console.log(data);

    if (data === null) return skt.close();

    switch(data.op) {
        case OPCodes.HEARTBEAT: {
            const { d } = data;
            const s = Number(d);

            skt.props.lastHeartbeat = Date.now();

            skt.sendAsync({
                op: OPCodes.HEARTBEAT_ACK,
                s: ++skt.props.sequence
            });
        }

        case OPCodes.AUTH: {
            const { d } = data;

        }

        case OPCodes.GET_LOBBY_REQ: {
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

    }


});