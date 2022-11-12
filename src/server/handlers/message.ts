import { IncomingMessage } from "http";
import * as ws from "ws";
import { OPCodes } from "../util/WSValues";

export default (async (ws: Socket.SocketServer, skt: Socket.SocketClient, rq: IncomingMessage, payload: ws.Data) => {
    let data;

    try { data = JSON.parse(payload.toString()); }
    catch { data = null }

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
    }


});