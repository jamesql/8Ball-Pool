/// <reference path="../../util/@types/global.d.ts" />

import { IncomingMessage } from "http";
import * as ws from "ws";
import { HEARTBEAT_INTERVAL, OPCodes } from "../util/WSValues";

// initial connection from client
export default (async (ws: Socket.SocketServer, skt: Socket.SocketClient, rq: IncomingMessage) => {
    console.log(`[Socket] [Client>>Server] Incoming Connection from ${rq.connection.remoteAddress}`);

    // Set props
    skt.props = {
        sequence: 0,
        lastHeartbeat: Date.now(),
        username: ""
    }

    skt.on("message", require("./message").default.bind(null, ws, skt, rq));

    skt.sendAsync({
        op: OPCodes.HELLO, 
        d: {
            heartbeatInterval: HEARTBEAT_INTERVAL
        }
    });
});